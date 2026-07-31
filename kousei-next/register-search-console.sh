#!/usr/bin/env bash
# Search Console 自動登録スクリプト
# 使い方: bash register-search-console.sh "<verification_token_string>"
# token = HTMLタグの content="..." の中身 (40文字程度のランダム英数字)

set -e

TOKEN="${1:-}"
if [ -z "$TOKEN" ]; then
  echo "ERROR: verification token を引数で渡してください"
  echo "例: bash register-search-console.sh AbCdEfGh1234567890..."
  exit 1
fi

cd "$(dirname "$0")"

echo "[1/4] Vercel env に NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION 追加 (production)"
printf "%s" "$TOKEN" | vercel env add NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION production --force 2>&1 || true

echo "[2/4] Vercel env preview/development にも追加"
printf "%s" "$TOKEN" | vercel env add NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION preview --force 2>&1 || true
printf "%s" "$TOKEN" | vercel env add NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION development --force 2>&1 || true

echo "[3/4] git commit + push"
git -C /c/Users/timbe add kousei-next/app/layout.tsx kousei-next/register-search-console.sh
git -C /c/Users/timbe commit -m "feat(kousei-next): Google Search Console verification meta tag対応 (env経由)" || echo "no changes"

echo "[4/4] Vercel production デプロイ"
vercel --prod --yes 2>&1 | tail -20

echo ""
echo "完了！次のステップ:"
echo "1. Search Console画面に戻って「確認」ボタンをクリック"
echo "2. 確認成功後、サイトマップ提出: https://kouseishoji.vercel.app/sitemap.xml"
