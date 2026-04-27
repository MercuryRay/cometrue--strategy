#!/usr/bin/env node
/**
 * Puppeteer + 永続Chromeプロファイルで Meta 広告マネージャー UI を自動操作。
 * Marketing API トークンが無い時のフォールバック。
 *
 * 重要: API版（swap-ad-creative-api.mjs）が使えるならそちらを優先。
 *       UI スクレイピングは Meta の DOM 変更で頻繁に壊れる。
 *
 * 使い方:
 *   # 1) 既存のChromeを全部閉じる（プロファイルロックを避けるため）
 *   # 2) このスクリプトを実行
 *   node scripts/swap-banner-v16-puppeteer.mjs --variant=feed-cat --dry-run
 *   node scripts/swap-banner-v16-puppeteer.mjs --variant=all
 *
 * 前提:
 *   - C:\Users\timbe\.cache\chrome-devtools-mcp\chrome-profile に
 *     FBログイン済みプロファイルが存在
 *   - puppeteer ^24.40.0 (kokopelli-ec/package.json devDependencies)
 */

import puppeteer from 'puppeteer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const CHROME_PROFILE = 'C:\\Users\\timbe\\.cache\\chrome-devtools-mcp\\chrome-profile';
const AD_ACCOUNT = '518379218762642';
const AD_MANAGER_URL = `https://adsmanager.facebook.com/adsmanager/manage/ads?act=${AD_ACCOUNT}`;

const VARIANTS = {
  'feed-cat': path.join(ROOT, 'public/ads-v16/banner-v16-feed-cat-1080x1080.png'),
  'feed-dog': path.join(ROOT, 'public/ads-v16/banner-v16-feed-dog-1080x1080.png'),
  'story-cat': path.join(ROOT, 'public/ads-v16/banner-v16-story-cat-1080x1920.png'),
  'story-dog': path.join(ROOT, 'public/ads-v16/banner-v16-story-dog-1080x1920.png'),
};

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);
const VARIANT = args.variant ?? 'feed-cat';
const DRY_RUN = !!args['dry-run'];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function processVariant(page, variantKey, bannerPath) {
  console.log(`\n🎯 Processing variant: ${variantKey}`);
  console.log(`   Banner: ${bannerPath}`);

  if (DRY_RUN) {
    console.log(`   [dry-run] would navigate to ${AD_MANAGER_URL}`);
    console.log(
      `   [dry-run] would open existing ad → click 編集 → upload ${path.basename(bannerPath)} → 公開`
    );
    return;
  }

  await page
    .goto(AD_MANAGER_URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
    .catch(() => {});
  await sleep(12000);

  const url = page.url();
  if (url.includes('login') || url.includes('checkpoint')) {
    throw new Error(`Not logged in or 2FA required. Current URL: ${url}`);
  }

  await page.screenshot({ path: path.join(ROOT, `ss-v16-${variantKey}-1-list.jpg`), quality: 60 });
  console.log(`   📸 Saved ad list screenshot`);

  console.log('   ⚠️  This UI flow needs interactive verification.');
  console.log('   ⚠️  Recommend using API version instead (swap-ad-creative-api.mjs)');
  console.log('   ⚠️  Stopping here for safety. Manual takeover required.');
}

async function main() {
  console.log('🚀 Puppeteer-based ad banner swap (v16)');
  console.log(`   Mode: ${DRY_RUN ? 'DRY-RUN' : 'LIVE'}`);
  console.log(`   Variant: ${VARIANT}`);

  if (DRY_RUN) {
    const targets = VARIANT === 'all' ? Object.entries(VARIANTS) : [[VARIANT, VARIANTS[VARIANT]]];
    for (const [k, p] of targets) await processVariant(null, k, p);
    console.log('\n✅ Dry-run complete.');
    return;
  }

  console.log('\n⚠️  CHECKLIST BEFORE PROCEEDING:');
  console.log('   1. すべてのChromeウィンドウを閉じてください（プロファイルロック回避）');
  console.log('   2. ブラウザ認証中のセッションが無いことを確認');
  console.log('   3. 広告アカウント act_518379218762642 へのアクセス権限あり\n');
  console.log('   待機中... 5秒後に開始 (Ctrl+Cで中断)');
  await sleep(5000);

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: CHROME_PROFILE,
    args: ['--no-sandbox', '--window-size=1400,1000'],
    defaultViewport: { width: 1400, height: 1000 },
    timeout: 60000,
  });
  const page = await browser.newPage();
  page.setDefaultTimeout(60000);

  try {
    const targets = VARIANT === 'all' ? Object.entries(VARIANTS) : [[VARIANT, VARIANTS[VARIANT]]];
    for (const [k, p] of targets) {
      await processVariant(page, k, p);
      await sleep(3000);
    }
  } catch (e) {
    console.error('❌', e.message);
    await page
      .screenshot({ path: path.join(ROOT, 'ss-v16-error.jpg'), quality: 60 })
      .catch(() => {});
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error('💥 Fatal:', e);
  process.exit(1);
});
