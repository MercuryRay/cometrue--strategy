# Meta広告 v16 — UTM URL + 広告コピー候補

最終更新: 2026-04-27
配信予定: v16（製品実写バナー4枚）
本番LP: https://kokopelli.kamuturu.jp

---

## 1. UTM付き遷移先URL（コピペ用）

Meta広告マネージャーの「ウェブサイトURL」欄にそのまま貼り付け。
GA4 / GSCで配置別効果測定が可能になる。

### Feed配置

**Feed猫オーナー向け** (`banner-v16-feed-cat-1080x1080.png`)

```
https://kokopelli.kamuturu.jp/?utm_source=meta&utm_medium=paid_social&utm_campaign=v16_product_real_photo_20260427&utm_content=feed_cat&utm_term=cat_owner
```

**Feed犬オーナー向け** (`banner-v16-feed-dog-1080x1080.png`)

```
https://kokopelli.kamuturu.jp/?utm_source=meta&utm_medium=paid_social&utm_campaign=v16_product_real_photo_20260427&utm_content=feed_dog&utm_term=dog_owner
```

### Story / Reels配置

**Story猫オーナー向け** (`banner-v16-story-cat-1080x1920.png`)

```
https://kokopelli.kamuturu.jp/?utm_source=meta&utm_medium=paid_social&utm_campaign=v16_product_real_photo_20260427&utm_content=story_cat&utm_term=cat_owner
```

**Story犬オーナー向け** (`banner-v16-story-dog-1080x1920.png`)

```
https://kokopelli.kamuturu.jp/?utm_source=meta&utm_medium=paid_social&utm_campaign=v16_product_real_photo_20260427&utm_content=story_dog&utm_term=dog_owner
```

---

## 2. 広告コピー候補（薬機法NG排除済）

**禁止語:** 治療・治癒・効果・効能・改善・予防・回復
**OK語:** 毎日の・健康習慣・サポート・整える・ケア・体調管理

### Pattern A — 共感×製法アピール（推奨デフォルト）

**プライマリーテキスト（猫用）**

```
うちの猫の毎日に、シリカミネラル。

水とケイ素だけ。無添加・MADE IN JAPAN。
食事に数滴混ぜるだけで、健康習慣のサポートに。

ココペリ｜1本¥3,480／30日間返金保証／2本以上で送料無料
```

**プライマリーテキスト（犬用）**

```
うちの犬の毎日に、シリカミネラル。

水とケイ素だけ。無添加・MADE IN JAPAN。
食事に数滴混ぜるだけで、健康習慣のサポートに。

ココペリ｜1本¥3,480／30日間返金保証／2本以上で送料無料
```

**見出し（共通）**: `ココペリ｜ペットのための高濃度シリカミネラル`
**説明文（共通）**: `原材料は水とケイ素のみ。無添加・国内製造`
**CTAボタン**: `詳しくはこちら`

### Pattern B — オファー強調

**プライマリーテキスト**

```
1本¥3,480・30日間返金保証つき。

ペット向けシリカミネラル【ココペリ】
無添加・国内製造、食事に数滴混ぜるだけ。
2本以上で送料無料。

愛犬・愛猫の毎日のケアに。
```

**見出し**: `30日間返金保証｜ペット向けシリカミネラル`
**説明文**: `1本¥3,480／2本以上送料無料`
**CTAボタン**: `購入する`

### Pattern C — 製造ストーリー

**プライマリーテキスト**

```
原材料は水とケイ素、たった2つだけ。

ペットの体に余計なものを入れたくない。
そんな思いから生まれた、無添加・国内製造のシリカミネラルです。

毎日の食事に数滴混ぜるだけ。

ココペリ｜MADE IN JAPAN
```

**見出し**: `無添加｜水とケイ素だけのペット用ミネラル`
**説明文**: `1本¥3,480・国内製造・MADE IN JAPAN`
**CTAボタン**: `公式サイトを見る`

---

## 3. A/Bテスト推奨設計

| 広告セット        | 配信ターゲット              | バナー    | コピー    | 予算/日 |
| ----------------- | --------------------------- | --------- | --------- | ------- |
| **v16-cat-feed**  | 猫オーナー / 25-65歳 / 関東 | feed-cat  | Pattern A | ¥1,000  |
| **v16-cat-story** | 猫オーナー / 25-65歳 / 関東 | story-cat | Pattern A | ¥500    |
| **v16-dog-feed**  | 犬オーナー / 25-65歳 / 関東 | feed-dog  | Pattern A | ¥1,000  |
| **v16-dog-story** | 犬オーナー / 25-65歳 / 関東 | story-dog | Pattern A | ¥500    |

**評価指標（7日後判定）:**

- CTR ≥ 1.5%（v13比較）
- CPC ≤ ¥120
- LP遷移後の購入転換率 ≥ 1.0%

**勝ちパターン判定後の打ち手:**

- 勝ちセット予算を2倍に増額
- 負けセットは Pattern B / Pattern C に差し替えで再試行
- 全敗の場合は v13 に戻し、バナー再生成（ターゲット痛点ヒアリング再実施）

---

## 4. 配置設定チェックリスト

Meta広告マネージャーで広告作成時、以下を必ず指定：

- [ ] **配置のカスタマイズ** ON
- [ ] **Facebookフィード / Instagramフィード** → `feed-*` バナー
- [ ] **Facebookストーリーズ / Instagramストーリーズ / Reels** → `story-*` バナー
- [ ] **左側の列広告 / インストリーム動画 / Audience Network** → OFF（質悪い配置を排除）
- [ ] **遷移先URL** = 上記UTMパラメータ付きURL
- [ ] **Pixelイベント** = `Purchase` を最適化目標に設定（Conversions APIで補強）
