# Divine — 信じる人の、居場所。

カトリック信者のための日々の祈りと信仰生活を支える Web アプリ。今日のミサ典礼、聖書の御言葉、ロザリオ、守護聖人診断、糾明（良心の振り返り）、教会検索を 1 つのインターフェイスに集約。スマホ・PC 両対応の落ち着いたゴールド&ネイビーの聖堂風 UI。

## 主な機能（タブ単位）

- **今日のミサ**: 典礼暦・典礼色・第一朗読 / 答唱詩編 / 福音朗読をカード表示
- **神のメッセージ**: 悩みを入力 → 聖書 20 箇所から該当する御言葉と解説を返す（キーワードマッチで「仕事」「人間関係」「孤独」「罪」など 10 カテゴリ対応）
- **ロザリオ**: 曜日ごとの神秘（栄えの神秘 5 連黙想）+ ステップガイド + アヴェ・マリア 10 連カウンタ
- **守護聖人診断**: 生年月日から守護聖人 8 名（聖フランチェスコ / 聖テレーズ / 大天使ミカエル / 聖母マリア / 聖ヨセフ / 聖マグダラのマリア / 使徒パウロ / 聖トマス・アクィナス）を割り当て
- **糾明**: 十戒 + 教会の掟に基づく 20 問のチェックリスト + ゆるしの秘跡（告解）の手順ガイド
- **教会検索**: Coming Soon。当面はカトリック中央協議会の教会案内へ誘導
- **シェア**: Web Share API + クリップボードフォールバック（SNS 拡散導線）
- **マネタイズ**: Google AdSense + A8.net / もしも / Amazon アソシエイトの環境変数経由連携

## 技術スタック

- **Framework**: Next.js 16 (App Router) + React 19
- **言語**: TypeScript 5
- **スタイリング**: Tailwind CSS v4（インライン style + radial-gradient で聖堂風 UI を表現）
- **DB / Auth**: `@supabase/supabase-js` ^2.102（将来的な祈りログ・ユーザー管理向け）
- **アフィリエイト**: AdSense / A8.net / もしもアフィリエイト / Amazon アソシエイト
- **Lint**: ESLint 9 + eslint-config-next

## セットアップ手順

```bash
# 1. 依存関係インストール
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
```

## 環境変数

`.env.local`（テンプレート: `.env.example`）。Vercel デプロイ時は Project Settings > Environment Variables に同名で登録。

| 変数名                                                  | 必須 | 用途                                                                                  |
| ------------------------------------------------------- | ---- | ------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID`                         | 任意 | Google AdSense クライアント ID（例: `ca-pub-XXXXXXXXXXXXXXXX`）。未設定時は広告非表示 |
| `NEXT_PUBLIC_ADSENSE_SLOT_TOP` / `_SIDEBAR` / `_FOOTER` | 任意 | AdSense 広告ユニット ID（配置場所別）                                                 |
| `NEXT_PUBLIC_A8_MEDIA_ID`                               | 任意 | A8.net メディア ID（[a8.net](https://www.a8.net/)）                                   |
| `NEXT_PUBLIC_MOSHIMO_AFFILIATE_ID`                      | 任意 | もしもアフィリエイト ID                                                               |
| `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG`                      | 任意 | Amazon アソシエイト ID（例: `mercurycs-22`）                                          |

> Supabase 連携は package に含まれているが現状の UI では未配線。クライアント実装時は `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` を別途追加する。

## 主要ページ

| ルート     | 役割                                                                                                  |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| `/`        | 6 タブ（今日のミサ / 神のメッセージ / ロザリオ / 守護聖人 / 糾明 / 教会検索）を切り替えるメインアプリ |
| `/privacy` | プライバシーポリシー                                                                                  |

すべての機能は `/` のタブ切り替えで完結する単一ページアプリ構成。

## ディレクトリ構成（抜粋）

```
src/
  app/
    page.tsx          # 6タブのメインアプリ（聖書・典礼・ロザリオ・診断データを内包）
    layout.tsx        # 共通レイアウト + AdSense / Affiliate スクリプト
    privacy/          # プライバシーポリシー
  components/
    GoogleAdsense.tsx # AdSense ロード・広告ユニット表示
  lib/
    affiliate-programs.ts  # アフィリエイト ID 集約と各種 URL ビルダ
```

## 注意事項

- 典礼日付・聖人記念日は静的データ。日付ベースの動的取得は今後の課題
- 聖書テキストは新共同訳ベースの抜粋（学術・私的祈り用途）
- 教会検索は未実装。Google Places API などの導入で拡張予定
