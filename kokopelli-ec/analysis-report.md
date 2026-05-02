# ココペリEC サイト現状分析レポート

**分析日:** 2026-04-07
**対象URL:** https://kokopelli.kamuturu.jp
**ステータス:** HTTP 200（稼働中）

---

## 1. サイト構成

| 項目 | 内容 |
|------|------|
| フレームワーク | Next.js 16.2.2 / React 19.2.4 |
| スタイリング | Tailwind CSS v4 |
| ホスティング | Vercel（hnd1リージョン・東京） |
| 決済 | Stripe（Checkout Session方式） |
| アニメーション | framer-motion |
| アイコン | lucide-react + カスタムSVG |
| 分析 | GA4 + Meta Pixel（ID: 2143634039807091） |

### ページ構成
- `/` — LP（メイン販売ページ・約1,100行の大型コンポーネント）
- `/checkout` — プラン選択 + 決済開始
- `/success` — 購入完了ページ
- `/api/checkout` — 単品決済API
- `/api/subscribe` — 定期便決済API（Stripe Subscription）
- `/api/webhook` — Stripe Webhook（注文通知）

---

## 2. 商品ラインナップと価格

| プラン | checkout API価格 | checkout UI表示 | LP表示 |
|--------|-----------------|----------------|--------|
| お試し1本 | ¥3,480 | ¥3,480 | ¥3,500 |
| 2本セット | ¥5,980 | ¥5,980 | — |
| 5+1セット（6本） | ¥15,000 | ¥15,000 | ¥15,000 |
| 定期便 2本/月 | ¥5,480（checkout API） / ¥6,000（subscribe API） | ¥5,480 | ¥6,000/月 |

---

## 3. 発見された問題点

### 重大（売上に直結）

#### P1: 定期便の価格不整合
- **checkout/page.tsx（UI表示）:** ¥5,480/月
- **api/subscribe/route.ts（実決済）:** ¥6,000/月
- **LP（page.tsx）:** ¥6,000/月、¥3,000/本
- **checkout UI内の説明文:** 「月額¥6,000で2本届く」
- ユーザーは¥5,480だと思って購入ボタンを押すが、Stripeで¥6,000が請求される。景品表示法リスクあり。

#### P2: お試し1本の価格不整合
- **checkout API:** ¥3,480
- **LP:** ¥3,500
- ページによって価格が異なる。

#### P3: subscriptionプランのcheckout APIが未使用
- checkout/route.tsにsubscriptionプランの処理（¥5,480）があるが、実際のUIではsubscription選択時にapi/subscribeを呼ぶため使われていない。デッドコード。

### 中程度（UX・SEO）

#### P4: page.tsxが巨大すぎる（約1,100行）
- LP全体が1ファイル。保守性が低い。セクション単位でコンポーネント分割すべき。

#### P5: next.configが空
- images.remotePatterns、headers（セキュリティヘッダー）、redirectsなどの設定がない。

#### P6: 特定商取引法ページが存在しない
- ECサイトとして必須の特定商取引法に基づく表記ページ（/tokushoho）がない。法令違反の可能性。

#### P7: プライバシーポリシーページが存在しない
- Meta Pixel・GA4を使用しているが、プライバシーポリシーページがない。

#### P8: 2本セットの価格表記がLP上にない
- 人気No.1の2本セット（¥5,980）がLPに表示されていない。checkoutページに行って初めて知る。

### 軽度（改善推奨）

#### P9: OGP画像が商品写真1枚のみ
- /images/image-4.webpを使用。SNSシェア時の訴求力が弱い。専用OGP画像を作成すべき。

#### P10: Webhookのシグネチャ検証がオプショナル
- STRIPE_WEBHOOK_SECRETがない場合、JSONパースで通す実装。本番ではシグネチャ検証必須。

#### P11: エラーハンドリングの不足
- checkout/page.tsxでres.okチェックなし。APIがエラーを返してもユーザーに適切なフィードバックがない。

#### P12: canonicalタグ未設定
- SEO上、canonical URLの明示的設定がない。

#### P13: 構造化データ（JSON-LD）未実装
- Product型のschema.orgマークアップがない。検索結果でのリッチスニペット表示機会を逃している。

---

## 4. Stripe API設定の評価

### 良い点
- 環境変数からキーを取得（ハードコードなし）
- runtime: "nodejs" + dynamic: "force-dynamic" 正しく設定
- FetchHttpClient使用（Vercel互換）
- 配送先住所の収集あり（shipping_address_collection）
- 日本円（JPY）で整数金額を使用（正しい）

### 改善点
- 定期便がSubscription mode、それ以外がPayment modeで正しく分離されている
- ただし定期便の金額不一致（上記P1）は即修正が必要
- Webhook Secretの必須化が必要（P10）
- 税金設定（automatic_tax）が未設定

---

## 5. 改善提案（優先順）

### 即時対応（今週中）

1. **価格の統一** — 全ページ・全APIで価格を1つの定数ファイル（lib/pricing.ts）に集約
   - お試し1本: ¥3,480 or ¥3,500 どちらかに統一
   - 定期便: ¥5,480 or ¥6,000 どちらかに統一
2. **特定商取引法ページの作成** — /tokushoho ページを追加
3. **プライバシーポリシーページの作成** — /privacy ページを追加
4. **Webhook Secret必須化** — STRIPE_WEBHOOK_SECRETがない場合はエラーを返す

### 短期（1-2週間）

5. **LP上に全プランの価格を明示** — 2本セット¥5,980をLPにも掲載
6. **構造化データ（JSON-LD）追加** — Product + FAQ schema
7. **OGP画像の専用作成** — 1200x630pxで商品+キャッチコピー
8. **セキュリティヘッダー追加** — next.config.tsにX-Frame-Options等
9. **エラーハンドリング強化** — API応答のstatusチェック追加

### 中期（1ヶ月）

10. **コンポーネント分割** — page.tsxをセクション単位に分割
11. **在庫管理の仕組み** — 現状は数量制限のみ。Stripe Productsとの連携検討
12. **メール自動送信** — 購入確認メール（現在はWebhookでの通知のみ）
13. **LINE連携** — LINE公式との購入通知連携
14. **A/Bテスト基盤** — CTAボタンの色・文言テスト

---

## 6. 総合評価

**デザイン・LP構成:** 優（説得力のあるストーリー構成、エビデンス訴求、不安解消セクションが充実）
**技術基盤:** 良（Next.js + Stripe + Vercelは適切な選択）
**決済機能:** 要改善（価格不整合が最大の問題）
**法令対応:** 不足（特商法・プライバシーポリシー未対応）
**SEO:** 良（メタデータ・sitemap・robots.txt設定済み。JSON-LDが未対応）

LPのコンテンツ品質は高い。最優先は価格統一と法令対応ページの追加。
