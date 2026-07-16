#!/usr/bin/env node
/**
 * kokopelli-ec 再接客 ワンコマンド送信支援
 *
 * 「登録済み・未購入の暖かいリード」を本番Stripeから抽出し、
 * 各人ぶんの Gmail 作成画面（宛先・件名・本文プリフィル）を自動で開く。
 * → あとは各ウィンドウで「送信」ボタンを押すだけ。
 *
 * ※ Gmail の OAuth スコープに send/compose が無いため「送信」自体は自動化不可。
 *    本スクリプトは作成画面を全員ぶん開くところまでを全自動化する。
 *
 * シークレットキーは一切標準出力に出さない設計。
 *
 * 使い方:
 *   cd C:\Users\timbe\kokopelli-ec
 *   node scripts/send-reengagement.mjs            // 全期間の未購入会員
 *   node scripts/send-reengagement.mjs 90         // 直近90日に登録した会員に限定
 *   node scripts/send-reengagement.mjs 0 --dry    // 開かず一覧だけ確認（--dry）
 *   KOKO_KEY_VAR=<別名> node scripts/send-reengagement.mjs
 */

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';

// ---- キー読み込み（check-live-sales.mjs と同じ安全パターン） ----
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

const VAR_NAME = process.env.KOKO_KEY_VAR || 'KOKOPELLI_STRIPE_LIVE_KEY';
const KEY = process.env[VAR_NAME] || readUserEnvFromRegistry(VAR_NAME);
if (!KEY) {
  console.error(`❌ ${VAR_NAME} が未設定です（User env / HKCU\\Environment 両方）。`);
  console.error('   別名で登録済みなら: KOKO_KEY_VAR=<変数名> node scripts/send-reengagement.mjs');
  process.exit(1);
}
if (!/^(sk|rk)_live_/.test(KEY)) {
  console.error(`❌ ${VAR_NAME} は本番キー (sk_live_ / rk_live_) ではありません。`);
  process.exit(1);
}
console.log(`🔑 使用キー変数: ${VAR_NAME}（値は非表示）`);

const args = process.argv.slice(2);
const dryRun = args.includes('--dry');
const days = Number(args[0]) > 0 ? Number(args[0]) : 0;
const sinceSec = days > 0 ? Math.floor(Date.now() / 1000) - days * 86400 : 0;
const MAX_OPEN = 25; // 一度に開きすぎ防止の安全上限
const OPEN_DELAY_MS = 1200; // ウィンドウ連続起動の間隔

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

// ---- メール文面（薬機法準拠・COMEBACK500 は本番Stripeで active/¥500OFF/無期限を確認済み） ----
function buildSubject() {
  return '【ココペリ】ご注文ページURL変更のお知らせ — お詫びに¥500OFFクーポン';
}
function buildBody(name) {
  const namePart = name ? `${name}様` : 'ご登録者様';
  const tail = name || '';
  return `${namePart}

このたびはココペリにご登録いただき、誠にありがとうございます。

大切なお詫びとご案内です。サーバー移転に伴いサイトのURLが変わり、これまでのご案内メールに記載していたご注文ページのリンクが開けない状態になっておりました。ご不便をおかけしており、誠に申し訳ございませんでした。

新しいご注文ページはこちらです。現在は問題なくお手続きいただけます。

▼ 新しいご注文ページ（数分でお手続きが完了します）
https://kokopelli-ec.vercel.app/checkout?plan=set

■ お詫びの気持ちを込めて — ¥500OFFクーポン
お支払い画面でクーポンコード「COMEBACK500」をご入力いただくと、¥500引きでご購入いただけます（お一人様1回）。

■ ココペリとは
犬・猫のための動物用栄養補助食品です。
・水溶性ケイ素を濃縮した国産のシンプル処方（水＋ケイ素・無添加）
・毎日の水分・ミネラル補給のサポートに、1日1回を目安に与えるだけ
・シリンジ（針なし）で量を計りやすく、お水やごはんに混ぜてお使いいただけます

■ はじめての方も、安心してお試しいただけます
・2本セット ¥5,980（税込・送料無料）でスタートできます
・1本（30ml）¥3,480 からのご購入も承っております
・30日間全額返金保証：合わないと感じられたら、開封後でも全額ご返金します

ご不明な点は、本メールへのご返信、またはLINE公式（@636yyubo）からお気軽にどうぞ。
${tail}さまと、大切なご家族の毎日に寄り添えましたら幸いです。

────────────────
ココペリ｜Come true（カムトゥル）
https://kokopelli-ec.vercel.app
お問い合わせ: timberfrost321@gmail.com
※本メールは、ココペリにご登録いただいた方へお送りしています。今後の配信を希望されない場合は、お手数ですが本メールにご返信ください。
────────────────`;
}

function findChrome() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ];
  return candidates.find((p) => existsSync(p));
}

function openCompose(chrome, to, name) {
  const url =
    'https://mail.google.com/mail/?view=cm&fs=1' +
    '&to=' +
    encodeURIComponent(to) +
    '&su=' +
    encodeURIComponent(buildSubject()) +
    '&body=' +
    encodeURIComponent(buildBody(name));
  execFileSync(chrome, ['--new-window', url], { stdio: 'ignore' });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  try {
    console.log('\n=== kokopelli-ec 再接客 ワンコマンド送信支援 ===');
    console.log(days > 0 ? `対象: 直近${days}日に登録した会員` : '対象: 全期間の登録会員');
    console.log(dryRun ? 'モード: --dry（一覧確認のみ・compose は開かない）\n' : '');

    const charges = await pageAll('charges', {});
    const paidCustomerIds = new Set(
      charges
        .filter((c) => c.paid && c.status === 'succeeded' && !c.refunded && c.customer)
        .map((c) => c.customer)
    );
    const subs = await pageAll('subscriptions', { status: 'all' });
    const subCustomerIds = new Set(subs.map((s) => s.customer).filter(Boolean));
    const customers = await pageAll('customers', {});

    const warmLeads = customers
      .filter((cust) => {
        if (cust.metadata?.source !== 'kokopelli-ec') return false;
        if (days > 0 && cust.created < sinceSec) return false;
        if (paidCustomerIds.has(cust.id)) return false;
        if (subCustomerIds.has(cust.id)) return false;
        if (!cust.email) return false; // メール無しは送れない
        if (/@example\.(com|net|org)$/i.test(cust.email)) return false; // 動作検証用ダミーは除外
        return true;
      })
      .sort((a, b) => b.created - a.created);

    console.log(`★ 登録済み・未購入の暖かいリード（メールあり）: ${warmLeads.length}件\n`);
    warmLeads.forEach((c, i) => {
      const d = new Date(c.created * 1000).toISOString().slice(0, 10);
      console.log(`  ${String(i + 1).padStart(2)}. ${d}  ${c.email}  ${c.name || ''}`);
    });
    console.log('');

    if (warmLeads.length === 0) {
      console.log('（該当なし — 送るべき暖かいリードはいません）\n');
      return;
    }
    if (dryRun) {
      console.log(
        '--dry のため compose は開きませんでした。本番は --dry を外して再実行してください。\n'
      );
      return;
    }

    const chrome = findChrome();
    if (!chrome) {
      console.error('❌ Chrome が見つかりません。');
      process.exit(1);
    }

    const targets = warmLeads.slice(0, MAX_OPEN);
    if (warmLeads.length > MAX_OPEN) {
      console.log(
        `⚠ 安全上限 ${MAX_OPEN}件まで開きます（残り ${warmLeads.length - MAX_OPEN}件は次回）。\n`
      );
    }
    console.log(`📨 ${targets.length}件の Gmail 作成画面を順に開きます…`);
    for (let i = 0; i < targets.length; i++) {
      const c = targets[i];
      openCompose(chrome, c.email, c.name || '');
      console.log(`   [${i + 1}/${targets.length}] opened: ${c.email}`);
      if (i < targets.length - 1) await sleep(OPEN_DELAY_MS);
    }
    console.log('\n✅ 全ウィンドウを開きました。各画面で「送信」ボタンを押してください。');
    console.log('   （Gmail の権限上、送信ボタンの自動クリックはできません）\n');
  } catch (e) {
    console.error('❌ 失敗:', e.message);
    process.exit(2);
  }
})();
