# ココペリ EC（kokopelli-ec）

ペット向けシリカ高濃度ミネラルウォーター「**ココペリ**」の D2C 通販サイト（[kokopelli.kamuturu.jp](https://kokopelli.kamuturu.jp)）。Stripe Checkout による単発購入 / 定期便（月 1 回 2 本セット）の決済、マジックリンク方式の会員ログイン、紹介コードによる紹介報酬、Meta 広告 CAPI 連携、Google Analytics 4 連携、CRON によるフォローアップメール配信、特商法ページ、ブログ（記事 CMS）、ペット診断 LP まで一気通貫で実装した EC アプリ。

## 主な機能

- **決済**: Stripe Checkout で単発 / 定期便（subscription mode）両対応
- **会員機能**: メール → マジックリンク（JWT）でログイン、`/account` でサブスク管理（Customer Portal 連携）
- **紹介プログラム**: 紹介コードを Stripe Customer metadata に紐付けて報酬付与
- **広告計測**: Meta Pixel + Conversions API（CAPI）でサーバーサイド CV 送信、GA4 タグ
- **Webhook**: `checkout.session.completed` / 定期購入更新を受けて Supabase 注文記録 + サンクス / 出荷通知メール送信
- **CRON**: フォローアップメール定期送信（Vercel Cron 経由 / `CRON_SECRET` で保護）
- **管理**: `/api/admin/send-shipping-notification`（管理者シークレット保護）で出荷通知一斉送信
- **メール**: Gmail SMTP（App Password）+ nodemailer で送信
- **コンテンツ**: ブログ記事（`/blog/[slug]`）、特定商取引法表記、プライバシーポリシー
- **SEO**: 動的 sitemap.xml / robots.txt、構造化データ
- **マーケ素材**: バナー（Puppeteer + canvas で自動生成）、Meta 広告クリエイティブ（フィード / ストーリー）

## 技術スタック

- **Framework**: Next.js 16 (App Router) + React 19
- **言語**: TypeScript 5
- **スタイリング**: Tailwind CSS v4 + Framer Motion 12（演出）
- **決済**: Stripe SDK 21（`stripe`） + `@stripe/stripe-js` 9
- **DB / Auth**: `@supabase/ssr` + `@supabase/supabase-js`（注文・会員ストア）
- **認証**: `jsonwebtoken`（マジックリンク発行 / 検証）
- **メール**: `nodemailer` 8 (Gmail SMTP)
- **広告計測**: Meta Pixel + Conversions API（`src/lib/meta-capi.ts`）
- **アナリティクス**: GA4 (`@google-analytics/data` ^5)
- **画像生成**: `canvas` 3 + `puppeteer` 24（バナー / OG 自動生成）
- **Lint**: ESLint 9 + eslint-config-next

## セットアップ手順

```bash
# 1. 依存関係インストール（canvas / puppeteer のネイティブビルドあり）
npm install

# 2. 環境変数を設定（後述）
cp .env.example .env.local
# .env.local を編集

# 3. 開発サーバー起動 (http://localhost:3000)
npm run dev

# 4. 本番ビルド
npm run build

# 5. 本番起動
npm run start

# Lint
npm run lint

# Stripe Webhook ローカル受け取り（別ターミナル）
stripe listen --forward-to localhost:3000/api/webhook
```

## 環境変数

`.env.local` に設定。Vercel デプロイ時は Project Settings > Environment Variables に同名で登録（`NEXT_PUBLIC_*` のみクライアント露出）。

| 変数名                      | 必須 | 用途                                                                      |
| --------------------------- | ---- | ------------------------------------------------------------------------- |
| `STRIPE_SECRET_KEY`         | ✅   | Stripe シークレットキー（`sk_live_...` / `sk_test_...`）                  |
| `STRIPE_WEBHOOK_SECRET`     | ✅   | `/api/webhook` の署名検証用（`whsec_...`）                                |
| `MAGIC_LINK_SECRET`         | ✅   | マジックリンク JWT 署名鍵                                                 |
| `GMAIL_USER`                | ✅   | 送信元 Gmail アドレス（nodemailer SMTP）                                  |
| `GMAIL_APP_PASSWORD`        | ✅   | Gmail アプリパスワード                                                    |
| `OWNER_EMAIL`               | 任意 | 注文通知の管理者宛先（未設定時は `GMAIL_USER`）                           |
| `SENDER_NAME`               | 任意 | メール差出人表示名（既定: `ココペリ シリカウォーター`）                   |
| `NEXT_PUBLIC_SITE_URL`      | 任意 | サイト URL（既定: `https://kokopelli.kamuturu.jp`）                       |
| `NEXT_PUBLIC_GA4_ID`        | 任意 | GA4 measurement ID（`G-XXXX`）。設定で gtag 自動注入                      |
| `NEXT_PUBLIC_META_PIXEL_ID` | 任意 | Meta Pixel ID（クライアント側 fbq 用）                                    |
| `META_PIXEL_ID`             | 任意 | Meta Pixel ID（サーバー CAPI 用。未設定時は `NEXT_PUBLIC_META_PIXEL_ID`） |
| `META_CAPI_ACCESS_TOKEN`    | 任意 | Meta Conversions API アクセストークン                                     |
| `META_CAPI_TEST_EVENT_CODE` | 任意 | CAPI テストイベントコード（検証時のみ）                                   |
| `CRON_SECRET`               | 任意 | `/api/cron/*` 認証用ベアラトークン                                        |
| `ADMIN_SECRET`              | 任意 | 管理 API 認証用ベアラトークン                                             |

## 主要ページ・API ルート

| ルート                                     | 役割                                                               |
| ------------------------------------------ | ------------------------------------------------------------------ |
| `/`                                        | LP（ペット診断 + 特長 + 価格比較 + FAQ + 会員登録 + モバイル CTA） |
| `/checkout`                                | 単発購入用 Stripe Checkout 開始                                    |
| `/success` / `/cancel`                     | 決済完了 / キャンセル後リダイレクト先                              |
| `/account`                                 | 会員マイページ（サブスク確認・Stripe Customer Portal 起動）        |
| `/login`                                   | マジックリンク送信フォーム                                         |
| `/blog` / `/blog/[slug]`                   | 記事一覧 / 記事詳細（`src/app/blog/articles.ts` 管理）             |
| `/tokushoho`                               | 特定商取引法に基づく表記                                           |
| `/privacy`                                 | プライバシーポリシー                                               |
| `/api/checkout`                            | 単発購入セッション生成（POST）                                     |
| `/api/subscribe`                           | 定期便サブスクセッション生成（紹介コード対応）                     |
| `/api/webhook`                             | Stripe Webhook 受信（注文記録 + メール送信）                       |
| `/api/auth/send-link` / `/api/auth/verify` | マジックリンク発行 / 検証                                          |
| `/api/account/portal`                      | Stripe Customer Portal セッション生成                              |
| `/api/member/register`                     | 会員登録（Stripe Customer 作成）                                   |
| `/api/referral-reward`                     | 紹介報酬処理                                                       |
| `/api/cron/follow-up-emails`               | CRON 経由のフォローアップメール（要 `CRON_SECRET`）                |
| `/api/admin/send-shipping-notification`    | 出荷通知一斉送信（要 `ADMIN_SECRET`）                              |

## ディレクトリ構成（抜粋）

```
src/
  app/
    page.tsx              # LP（ペット診断 + CV 導線）
    layout.tsx            # GA4 / Meta Pixel タグ注入
    api/
      checkout/           # 単発購入 Stripe セッション
      subscribe/          # 定期便 Stripe セッション
      webhook/            # Stripe Webhook
      auth/               # マジックリンク認証
      account/            # Customer Portal
      cron/               # Vercel Cron 用エンドポイント
      admin/              # 管理者向け送信 API
    components/           # PetDiagnosis / MobileCTABar / MemberRegistration 等
    blog/                 # 記事 CMS（articles.ts ベース）
  lib/
    stripe.ts             # Stripe クライアント
    meta-capi.ts          # Meta Conversions API
    email.ts              # nodemailer ラッパ
    auth.ts               # JWT 発行 / 検証
    prices.ts             # 商品価格定数
content/                  # ブログ下書き・営業メールテンプレ
docs/setup-guide.md       # 詳細セットアップガイド
```

詳細な初回セットアップ・運用手順は `docs/setup-guide.md` を参照。

## 注意事項

- Stripe / Meta CAPI / Gmail はすべてシークレット必須。本番では Vercel に登録、ローカルでは `.env.local`
- `STRIPE_SECRET_KEY` は `.trim()` してから利用（コピペ時の末尾改行対策。`/api/checkout` で実装済み）
- `puppeteer` / `canvas` はネイティブ依存あり。CI / Docker では追加のシステムライブラリが必要になる場合あり
- `ga4-service-account.json` などの認証情報ファイルは絶対にコミットしない（`.gitignore` 厳守）
