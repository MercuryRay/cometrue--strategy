#!/usr/bin/env node
/**
 * kokopelli-ec 本番Stripe 売上サマリ
 *
 * 環境変数 KOKOPELLI_STRIPE_LIVE_KEY (sk_live_ / rk_live_) を読み、
 * 直近の charges / subscriptions を集計して「件数と金額のみ」を出力する。
 * シークレットキーは一切標準出力に出さない設計。
 *
 * 使い方:
 *   node scripts/check-live-sales.mjs [日数]   // 既定 7日
 */

import { execFileSync } from 'node:child_process';

function readUserEnvFromRegistry(name) {
  if (process.platform !== 'win32') return null;
  try {
    const out = execFileSync('reg.exe', ['query', 'HKCU\\Environment', '/v', name], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
    // 出力末尾の "<name>    REG_SZ    <value>" を抽出
    const m = out.match(/REG_SZ\s+(.+)\s*$/m);
    return m ? m[1].trim() : null;
  } catch {
    return null;
  }
}

let KEY = process.env.KOKOPELLI_STRIPE_LIVE_KEY;
if (!KEY) KEY = readUserEnvFromRegistry('KOKOPELLI_STRIPE_LIVE_KEY');
if (!KEY) {
  console.error('❌ KOKOPELLI_STRIPE_LIVE_KEY が未設定です（User env / HKCU\\Environment 両方）。');
  console.error(
    '   先に: powershell -ExecutionPolicy Bypass -File scripts\\register-stripe-live-key.ps1'
  );
  process.exit(1);
}
if (!/^(sk|rk)_live_/.test(KEY)) {
  console.error(
    '❌ 本番キー (sk_live_ / rk_live_) ではありません。テストキーでは実売上は見えません。'
  );
  process.exit(1);
}

const days = Number(process.argv[2]) > 0 ? Number(process.argv[2]) : 7;
const sinceSec = Math.floor(Date.now() / 1000) - days * 86400;
const yen = (n) => '¥' + n.toLocaleString('ja-JP');

async function stripeGet(path, params = {}) {
  const url = new URL('https://api.stripe.com/v1/' + path);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, {
    headers: { Authorization: 'Bearer ' + KEY },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Stripe ${path} ${res.status}: ${body.slice(0, 300)}`);
  }
  return res.json();
}

async function pageAll(path, params) {
  const out = [];
  let starting_after;
  for (let i = 0; i < 20; i++) {
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
    // アカウント識別 (キー値は出さない)
    const acct = await stripeGet('account');
    console.log(`\n=== kokopelli-ec 本番Stripe 売上サマリ (直近${days}日) ===`);
    console.log(`口座: ${acct.settings?.dashboard?.display_name || acct.id} / mode=LIVE\n`);

    // Charges
    const charges = await pageAll('charges', { 'created[gte]': String(sinceSec) });
    const ok = charges.filter((c) => c.paid && c.status === 'succeeded' && !c.refunded);
    const refunded = charges.filter((c) => c.refunded);
    const failed = charges.filter((c) => c.status === 'failed');
    const sum = ok.reduce((s, c) => s + c.amount, 0);
    const refundSum = refunded.reduce((s, c) => s + (c.amount_refunded || 0), 0);

    console.log('【決済 charges】');
    console.log(`  成功 : ${ok.length}件 / 合計 ${yen(sum)}`);
    console.log(`  返金 : ${refunded.length}件 / ${yen(refundSum)}`);
    console.log(`  失敗 : ${failed.length}件`);
    const total = ok.length + failed.length;
    if (total > 0) {
      console.log(
        `  決済成功率: ${((ok.length / total) * 100).toFixed(1)}%  (${ok.length}/${total})`
      );
    }

    // 直近の成功決済 5件 (日付・金額・カードブランドのみ。個人情報は出さない)
    if (ok.length) {
      console.log('  直近の成功決済:');
      ok.slice(0, 5).forEach((c) => {
        const d = new Date(c.created * 1000).toISOString().slice(0, 16).replace('T', ' ');
        const brand =
          c.payment_method_details?.card?.brand || c.payment_method_details?.type || '?';
        console.log(`    ${d}UTC  ${yen(c.amount)}  ${brand}`);
      });
    }

    // Subscriptions (定期便 = LTV指標)
    const subsActive = await pageAll('subscriptions', { status: 'active' });
    const subsTrial = await pageAll('subscriptions', { status: 'trialing' });
    const subsPastDue = await pageAll('subscriptions', { status: 'past_due' });
    const mrr = [...subsActive, ...subsTrial].reduce((s, sub) => {
      const it = sub.items?.data?.[0]?.price;
      if (!it || !it.unit_amount) return s;
      const perMonth = it.recurring?.interval === 'year' ? it.unit_amount / 12 : it.unit_amount;
      return s + perMonth * (sub.items.data[0].quantity || 1);
    }, 0);

    console.log('\n【定期便 subscriptions】');
    console.log(`  稼働中(active)  : ${subsActive.length}件`);
    console.log(`  トライアル中    : ${subsTrial.length}件`);
    console.log(`  支払い遅延      : ${subsPastDue.length}件`);
    console.log(`  推定MRR(月額)   : ${yen(Math.round(mrr))}`);

    console.log('\n=== ここまで（数値のみ／secret非出力） ===\n');
  } catch (e) {
    console.error('❌ 照会失敗:', e.message);
    process.exit(2);
  }
})();
