#!/usr/bin/env node
/**
 * kokopelli-ec 「登録済み・未購入」の暖かいリード抽出
 *
 * 会員登録(Stripe customer 作成・metadata.source='kokopelli-ec')だけして
 * **一度も決済が成功していない・定期便も無い**顧客のメール一覧を出力する。
 * → konbini 400 バグ(2026-05-27 修正済 commit 01cf3c7)で買えなかった層の回収用。
 *
 * 環境変数 KOKOPELLI_STRIPE_LIVE_KEY (sk_live_ / rk_live_) を読む。
 * シークレットキーは一切標準出力に出さない設計。
 *
 * 使い方:
 *   node scripts/list-unordered-members.mjs            // 全期間の登録会員
 *   node scripts/list-unordered-members.mjs 90         // 直近90日に登録した会員に限定
 *   KOKO_KEY_VAR=STRIPE_LIVE_SECRET_KEY node scripts/list-unordered-members.mjs
 */

import { execFileSync } from 'node:child_process';

function readUserEnvFromRegistry(name) {
  if (process.platform !== 'win32') return null;
  try {
    const out = execFileSync('reg.exe', ['query', 'HKCU\\Environment', '/v', name], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    const m = out.match(/REG_(?:EXPAND_)?SZ\s+(.+?)\s*$/m);
    return m ? m[1].trim() : null;
  } catch {
    return null;
  }
}

// 既定は KOKOPELLI_STRIPE_LIVE_KEY。別名で登録済みなら KOKO_KEY_VAR で上書き可。
const VAR_NAME = process.env.KOKO_KEY_VAR || 'KOKOPELLI_STRIPE_LIVE_KEY';
const KEY = process.env[VAR_NAME] || readUserEnvFromRegistry(VAR_NAME);
if (!KEY) {
  console.error(`❌ ${VAR_NAME} が未設定です（User env / HKCU\\Environment 両方）。`);
  console.error(
    '   別名で登録済みなら: KOKO_KEY_VAR=<変数名> node scripts/list-unordered-members.mjs'
  );
  process.exit(1);
}
if (!/^(sk|rk)_live_/.test(KEY)) {
  console.error(
    `❌ ${VAR_NAME} は本番キー (sk_live_ / rk_live_) ではありません。テストキーでは実顧客は見えません。`
  );
  process.exit(1);
}
console.log(`🔑 使用キー変数: ${VAR_NAME}（値は非表示）`);

// 任意: 直近N日に登録した会員に限定（未指定なら全期間）
const days = Number(process.argv[2]) > 0 ? Number(process.argv[2]) : 0;
const sinceSec = days > 0 ? Math.floor(Date.now() / 1000) - days * 86400 : 0;

async function stripeGet(path, params = {}) {
  const url = new URL('https://api.stripe.com/v1/' + path);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, { headers: { Authorization: 'Bearer ' + KEY } });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Stripe ${path} ${res.status}: ${body.slice(0, 300)}`);
  }
  return res.json();
}

async function pageAll(path, params) {
  const out = [];
  let starting_after;
  for (let i = 0; i < 50; i++) {
    const q = { limit: '100', ...params };
    if (starting_after) q.starting_after = starting_after;
    const j = await stripeGet(path, q);
    out.push(...j.data);
    if (!j.has_more || j.data.length === 0) break;
    starting_after = j.data[j.data.length - 1].id;
  }
  return out;
}

(async () => {
  try {
    console.log('\n=== kokopelli-ec 登録済み・未購入の暖かいリード抽出 ===');
    console.log(days > 0 ? `対象: 直近${days}日に登録した会員\n` : '対象: 全期間の登録会員\n');

    // 1) 決済が成功した顧客ID集合（charges 全期間）
    const charges = await pageAll('charges', {});
    const paidCustomerIds = new Set(
      charges
        .filter((c) => c.paid && c.status === 'succeeded' && !c.refunded && c.customer)
        .map((c) => c.customer)
    );

    // 2) 定期便を持つ顧客ID集合（全status — 過去解約も「購入経験あり」として除外）
    const subs = await pageAll('subscriptions', { status: 'all' });
    const subCustomerIds = new Set(subs.map((s) => s.customer).filter(Boolean));

    // 3) 全顧客を取得し、source='kokopelli-ec' かつ 上記いずれにも属さない＝未購入を抽出
    const customers = await pageAll('customers', {});
    const warmLeads = customers.filter((cust) => {
      if (cust.metadata?.source !== 'kokopelli-ec') return false; // 自社EC登録のみ
      if (days > 0 && cust.created < sinceSec) return false; // 期間フィルタ
      if (paidCustomerIds.has(cust.id)) return false; // 購入済みは除外
      if (subCustomerIds.has(cust.id)) return false; // 定期便ありは除外
      if (cust.email && /@example\.(com|net|org)$/i.test(cust.email)) return false; // 動作検証用ダミーは除外
      return true;
    });

    // 登録が新しい順
    warmLeads.sort((a, b) => b.created - a.created);

    console.log(`【全customer数】 ${customers.length}件`);
    console.log(`【決済成功した顧客】 ${paidCustomerIds.size}件`);
    console.log(`【定期便を持つ顧客】 ${subCustomerIds.size}件`);
    console.log(`\n★ 登録済み・未購入の暖かいリード: ${warmLeads.length}件\n`);

    if (warmLeads.length === 0) {
      console.log('（該当なし）\n');
    } else {
      console.log('登録日(UTC)        メールアドレス                       お名前');
      console.log('-----------------------------------------------------------------------');
      warmLeads.forEach((c) => {
        const d = new Date(c.created * 1000).toISOString().slice(0, 16).replace('T', ' ');
        const email = (c.email || '(メール無)').padEnd(34);
        const name = c.name || '';
        console.log(`${d}  ${email}  ${name}`);
      });
      console.log('');

      // 再接客メールにそのまま貼れるよう、メールだけのカンマ区切りも出力
      const emails = warmLeads.map((c) => c.email).filter(Boolean);
      if (emails.length) {
        console.log('--- メールのみ（BCC/差し込み用・カンマ区切り） ---');
        console.log(emails.join(', '));
        console.log('');
      }
    }

    console.log('=== ここまで（メール一覧のみ／secret非出力） ===\n');
  } catch (e) {
    console.error('❌ 照会失敗:', e.message);
    process.exit(2);
  }
})();
