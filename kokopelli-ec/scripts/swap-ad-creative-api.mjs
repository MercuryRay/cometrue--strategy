#!/usr/bin/env node
/**
 * Meta Marketing API でバナー差し替えを行うスクリプト。
 *
 * 必要な環境変数:
 *   META_ACCESS_TOKEN     — システムユーザートークン（無期限）
 *   META_AD_ACCOUNT_ID    — 例: act_518379218762642
 *
 * 使い方:
 *   node scripts/swap-ad-creative-api.mjs --variant=feed-cat --dry-run
 *   node scripts/swap-ad-creative-api.mjs --variant=all
 *
 * フロー:
 *   1. v16バナー画像を Ad Image としてアップロード（hash取得）
 *   2. 対象広告のクリエイティブを複製＋hash差し替えで新規作成
 *   3. 広告のクリエイティブIDを新クリエイティブに更新
 *
 * 注意:
 *   既存広告のクリエイティブを直接編集はできない（Meta API仕様）。
 *   既存広告に紐付くクリエイティブを新規作成→広告に再アサインする方式。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const API_VERSION = 'v21.0';
const API_BASE = `https://graph.facebook.com/${API_VERSION}`;

const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;
const AD_ACCOUNT_ID = process.env.META_AD_ACCOUNT_ID; // act_xxxxx

if (!ACCESS_TOKEN || !AD_ACCOUNT_ID) {
  console.error('❌ META_ACCESS_TOKEN と META_AD_ACCOUNT_ID を設定してください');
  console.error('   詳細: docs/ads-v16-handoff/02-marketing-api-token-setup.md');
  process.exit(1);
}

const VARIANTS = {
  'feed-cat': {
    file: 'public/ads-v16/banner-v16-feed-cat-1080x1080.png',
    name: 'v16 Feed Cat 1080x1080',
    placement: 'feed',
    audience: 'cat_owner',
    utmContent: 'feed_cat',
  },
  'feed-dog': {
    file: 'public/ads-v16/banner-v16-feed-dog-1080x1080.png',
    name: 'v16 Feed Dog 1080x1080',
    placement: 'feed',
    audience: 'dog_owner',
    utmContent: 'feed_dog',
  },
  'story-cat': {
    file: 'public/ads-v16/banner-v16-story-cat-1080x1920.png',
    name: 'v16 Story Cat 1080x1920',
    placement: 'story',
    audience: 'cat_owner',
    utmContent: 'story_cat',
  },
  'story-dog': {
    file: 'public/ads-v16/banner-v16-story-dog-1080x1920.png',
    name: 'v16 Story Dog 1080x1920',
    placement: 'story',
    audience: 'dog_owner',
    utmContent: 'story_dog',
  },
};

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);
const DRY_RUN = !!args['dry-run'];
const VARIANT = args.variant ?? 'all';
const TARGET_AD_ID = args.adId; // 既存広告にアサインしたい場合

async function fbFetch(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE}${endpoint}`;
  const sep = url.includes('?') ? '&' : '?';
  const fullUrl = `${url}${sep}access_token=${encodeURIComponent(ACCESS_TOKEN)}`;
  const res = await fetch(fullUrl, options);
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Non-JSON response (${res.status}): ${text.slice(0, 300)}`);
  }
  if (!res.ok || json.error) {
    throw new Error(`Meta API error (${res.status}): ${JSON.stringify(json.error ?? json)}`);
  }
  return json;
}

async function uploadAdImage(filePath, name) {
  const abs = path.resolve(ROOT, filePath);
  if (!fs.existsSync(abs)) throw new Error(`File not found: ${abs}`);
  const buf = fs.readFileSync(abs);
  const sizeMB = (buf.length / 1024 / 1024).toFixed(2);
  console.log(`   📤 Uploading ${path.basename(abs)} (${sizeMB}MB)...`);

  if (DRY_RUN) {
    console.log(
      `   [dry-run] would POST /${AD_ACCOUNT_ID}/adimages with bytes=base64(${buf.length}B)`
    );
    return { hash: 'DRY_RUN_HASH_' + Date.now(), url: 'dry-run-url' };
  }

  const formData = new FormData();
  const blob = new Blob([buf], { type: 'image/png' });
  formData.append('filename', blob, path.basename(abs));

  const json = await fbFetch(`/${AD_ACCOUNT_ID}/adimages`, {
    method: 'POST',
    body: formData,
  });
  const hash = json.images?.[path.basename(abs)]?.hash;
  if (!hash) throw new Error(`No hash returned: ${JSON.stringify(json)}`);
  console.log(`   ✅ Image uploaded: hash=${hash}`);
  return { hash, url: json.images[path.basename(abs)].url };
}

async function listAds() {
  console.log(`📋 Fetching ads in ${AD_ACCOUNT_ID}...`);
  const json = await fbFetch(
    `/${AD_ACCOUNT_ID}/ads?fields=id,name,status,creative{id,name,image_hash},adset_id&limit=50`
  );
  return json.data ?? [];
}

async function createCreative(variant, imageHash) {
  const utmUrl = `https://kokopelli.kamuturu.jp/?utm_source=meta&utm_medium=paid_social&utm_campaign=v16_product_real_photo_20260427&utm_content=${variant.utmContent}&utm_term=${variant.audience}`;

  const creativePayload = {
    name: variant.name,
    object_story_spec: {
      page_id: process.env.META_PAGE_ID || '<SET_META_PAGE_ID>',
      link_data: {
        image_hash: imageHash,
        link: utmUrl,
        message:
          variant.audience === 'cat_owner'
            ? 'うちの猫の毎日に、シリカミネラル。\n\n水とケイ素だけ。無添加・MADE IN JAPAN。\n食事に数滴混ぜるだけで、健康習慣のサポートに。\n\nココペリ｜1本¥3,480／30日間返金保証／2本以上で送料無料'
            : 'うちの犬の毎日に、シリカミネラル。\n\n水とケイ素だけ。無添加・MADE IN JAPAN。\n食事に数滴混ぜるだけで、健康習慣のサポートに。\n\nココペリ｜1本¥3,480／30日間返金保証／2本以上で送料無料',
        name: 'ココペリ｜ペットのための高濃度シリカミネラル',
        description: '原材料は水とケイ素のみ。無添加・国内製造',
        call_to_action: { type: 'LEARN_MORE', value: { link: utmUrl } },
      },
    },
  };

  if (DRY_RUN) {
    console.log(`   [dry-run] would POST /${AD_ACCOUNT_ID}/adcreatives:`);
    console.log(JSON.stringify(creativePayload, null, 2));
    return { id: 'DRY_RUN_CREATIVE_' + Date.now() };
  }

  const json = await fbFetch(`/${AD_ACCOUNT_ID}/adcreatives`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(creativePayload),
  });
  console.log(`   ✅ Creative created: id=${json.id}`);
  return json;
}

async function assignCreativeToAd(adId, creativeId) {
  if (DRY_RUN) {
    console.log(`   [dry-run] would POST /${adId} { creative: { creative_id: ${creativeId} } }`);
    return;
  }
  await fbFetch(`/${adId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ creative: { creative_id: creativeId } }),
  });
  console.log(`   ✅ Ad ${adId} now uses creative ${creativeId}`);
}

async function processVariant(key, variant) {
  console.log(`\n🎯 Variant: ${key}`);
  const { hash } = await uploadAdImage(variant.file, variant.name);
  const creative = await createCreative(variant, hash);

  if (TARGET_AD_ID) {
    await assignCreativeToAd(TARGET_AD_ID, creative.id);
  } else {
    console.log(`   ℹ️  No --adId specified. Creative ${creative.id} created but not assigned.`);
    console.log(`   ℹ️  Use Ads Manager UI or run with --adId=<existing_ad_id> to assign.`);
  }
}

async function main() {
  console.log('🚀 Meta Ad Creative Swap (v16)');
  console.log(`   Account: ${AD_ACCOUNT_ID}`);
  console.log(`   Mode: ${DRY_RUN ? 'DRY-RUN' : 'LIVE'}`);
  console.log(`   Variant: ${VARIANT}`);
  if (TARGET_AD_ID) console.log(`   Target Ad: ${TARGET_AD_ID}`);

  if (VARIANT === 'list') {
    const ads = await listAds();
    console.log(`\nFound ${ads.length} ads:`);
    for (const ad of ads) {
      console.log(
        `  - ${ad.id} [${ad.status}] "${ad.name}" creative=${ad.creative?.id} (img_hash=${ad.creative?.image_hash})`
      );
    }
    return;
  }

  const targets = VARIANT === 'all' ? Object.entries(VARIANTS) : [[VARIANT, VARIANTS[VARIANT]]];
  if (!targets[0][1]) {
    console.error(`❌ Unknown variant: ${VARIANT}`);
    console.error(`   Available: ${Object.keys(VARIANTS).join(', ')}, all, list`);
    process.exit(1);
  }

  for (const [key, variant] of targets) {
    try {
      await processVariant(key, variant);
    } catch (e) {
      console.error(`❌ ${key} failed:`, e.message);
    }
  }

  console.log('\n🎉 Done.');
}

main().catch((e) => {
  console.error('💥 Fatal:', e);
  process.exit(1);
});
