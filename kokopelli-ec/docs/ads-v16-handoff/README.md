# Meta広告 v16 差し替えハンドオフ

最終更新: 2026-04-27

新しい製品実写バナー（v16・4枚）をMeta広告マネージャーに反映するための一式。

## 📂 ファイル一覧

| ファイル                                                             | 用途                                                       |
| -------------------------------------------------------------------- | ---------------------------------------------------------- |
| [01-utm-urls-and-copy.md](./01-utm-urls-and-copy.md)                 | UTM付き遷移先URL + 広告コピー候補3パターン + A/Bテスト設計 |
| [02-marketing-api-token-setup.md](./02-marketing-api-token-setup.md) | Meta Marketing APIトークン取得手順（永続化・自動化基盤）   |
| `../../scripts/swap-ad-creative-api.mjs`                             | API経由のバナー差し替えスクリプト（推奨）                  |
| `../../scripts/swap-banner-v16-puppeteer.mjs`                        | Puppeteer版フォールバック（API使えない時のみ）             |

## 🚀 推奨フロー

### A. 即時手動差し替え（30〜60分・確実）

1. https://adsmanager.facebook.com/adsmanager/manage/ads?act=518379218762642 を開く
2. 既存のv13広告セットを **複製**（効果データ引き継ぎ）
3. 複製した広告のクリエイティブを編集
4. 画像をアップロード（フルパス）：
   - `C:\Users\timbe\kokopelli-ec\public\ads-v16\banner-v16-feed-cat-1080x1080.png`
   - `C:\Users\timbe\kokopelli-ec\public\ads-v16\banner-v16-feed-dog-1080x1080.png`
   - `C:\Users\timbe\kokopelli-ec\public\ads-v16\banner-v16-story-cat-1080x1920.png`
   - `C:\Users\timbe\kokopelli-ec\public\ads-v16\banner-v16-story-dog-1080x1920.png`
5. 遷移先URLを `01-utm-urls-and-copy.md` のUTM付きURLに変更
6. プライマリーテキスト・見出し・説明文を `01-utm-urls-and-copy.md` の Pattern A に
7. 新v16セットを公開 → 旧v13セットを「オフ」（削除はせず1週間並走）

### B. API自動化セットアップ（初回30〜45分・以降1コマンド）

1. `02-marketing-api-token-setup.md` の手順でトークン発行
2. `META_ACCESS_TOKEN` / `META_AD_ACCOUNT_ID` / `META_PAGE_ID` を環境変数登録
3. 動作確認:
   ```bash
   cd ~/kokopelli-ec
   node scripts/swap-ad-creative-api.mjs --variant=list  # 既存広告一覧
   node scripts/swap-ad-creative-api.mjs --variant=feed-cat --dry-run  # ペイロード確認
   ```
4. 既存広告ID特定後、本番実行:
   ```bash
   node scripts/swap-ad-creative-api.mjs --variant=feed-cat --adId=<EXISTING_AD_ID>
   ```

### C. Puppeteer UI操作（非推奨・API不可時のみ）

- Meta DOM変更で頻繁に壊れる
- すべてのChromeを閉じる必要あり（プロファイルロック）
- 2FA要求時は手動介入必要
- API版が使えない緊急時のみ：
  ```bash
  cd ~/kokopelli-ec
  node scripts/swap-banner-v16-puppeteer.mjs --variant=feed-cat --dry-run
  ```

## ⚠️ 安全ガイドライン

- API トークンは絶対gitコミットしない（`.env*` で除外済）
- 既存v13広告は即削除せず最低7日並走（CTR比較データ取得のため）
- v16切替後24時間はGA4とMeta Ads Manager両方で異常監視
- 広告承認NG出たらコピーのPattern B / C に差し替え
- 薬機法NG語: 治療・治癒・効果・効能・改善・予防・回復 → 絶対使用禁止

## 📊 KPI監視

- CTR（目標 ≥ 1.5%）
- CPC（目標 ≤ ¥120）
- 購入転換率（目標 ≥ 1.0%）
- 7日後にv13/v16比較レポート作成
