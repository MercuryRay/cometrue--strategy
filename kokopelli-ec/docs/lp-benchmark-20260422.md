# D2C Pet Brand LP ベンチマーク分析 | ココペリ vs トップブランド
**作成日**: 2026-04-22 | **対象**: 高機能ペットサプリメント LP 構成分析

---

## 1. 現状構成ダイアグラム

```
Hero (92vh) → Stats Bar → Intro → Concerns → Diagnosis
→ Benefits → Features → Silica Edu → Evidence → HowTo
→ Testimonials → Pricing → Comparison → FAQ → Member Signup
→ Final CTA → Footer + Sticky Mobile
```

**セクション数**: 17区間 | **CTA配置**: 5回 (Hero, Intro, Concerns, Final, Sticky)

---

## 2. 競合との比較表 | 公開情報ベース

| 項目 | ココペリ | Farmer's Dog | Chewy | Yumove | PetPlate |
|------|---------|---|---|---|---|
| **Hero配置** | Large visual | Video | Carousel | Single+badge | Hero+trust |
| **Problems Section** | 9症状 | なし | 3-5 pain | Guide | Problem-agitate |
| **獣医師推奨** | 医学根拠 | Vet dev | Vet approved | Specialist | Nutritionist |
| **成分詳細** | シリカ濃度 | Sourcing | Label | MSM/Glucosamine | 100% fresh |
| **Before-After** | ❌ 欠落 | ❌ | ❌ | ✅ | ❌ |
| **メディア掲載** | ❌ 欠落 | Forbes等 | Awards | UK press | Best brand |
| **科学的根拠** | Case study | Research | Peer review | Trials | Trial |
| **CTA配置数** | 5 | 6-8 | 4-5 | 5-7 | 6 |
| **セクション数** | 17 | 15 | 13 | 16 | 14 |
| **トラスト位置** | Stats後 | Hero下 | Hero内 | Hero前 | Hero下 |

---

## 3. 欠落セクション TOP 5

| # | セクション | 優先度 | 推奨配置 |
|---|----------|--------|---------|
| **1** | Before-After Gallery | 🔴 高 | Testimonials直前 |
| **2** | メディア掲載/受賞 | 🔴 高 | Stats後 |
| **3** | 獣医師顔写真コメント | 🟠 中 | Evidence内 |
| **4** | 30日返金保証 | 🟠 中 | Hero直下 |
| **5** | 販売数実績 | 🟠 中 | Stats Bar下 |

---

## 4. セクション再配置 提案

### 現状の問題
- スクロール深度が長い（Reviews = 70%地点）
- トラスト要素がLate stage → 初期説得力弱い
- Before-Afterなし → Visual proof不足

### 推奨構成（要素順序）
```
Hero + Return Guarantee → Stats + 購買数
→ Media Trust Section → Intro + CTA
→ Problems + Diagnosis → Benefits → Features
→ Before-After Gallery (NEW) → Vet Comment (NEW)
→ Silica Edu → Evidence → HowTo
→ Testimonials → Pricing → FAQ → Member
→ Final CTA + Footer
```

**変更**: 19-20セクション, トラスト要素前倒し, Before-After統合

---

## 5. CVR最適化ガイドライン（一般論）

**ファーストビュー (0-25%)**
- Hero + トラスト（返金/vet/media） 必須
- CTA1は15秒以内視認

**中盤 (25-60%)**
- Problems → Solutions 明確化
- Before-After/Reviews を50-60%に配置

**後段 (60-100%)**
- 詳細情報（成分・使用方法・FAQ）
- Pricing は70-80% (説得後)
- Final CTA は85-90%

**CTA最適配置**
- Hero: 1回 | Intro: 1回 | Proof section: 1回 | Pricing: 複数 | Final: 1回
- 計5-6回が標準 → ココペリは5回でOK

---

## 6. 実装優先度（工数/CVR Impact）

| Phase | 実装内容 | 工数 | Impact |
|-------|--------|------|--------|
| P0 | Before-After section | 2-3h | +15% |
| P0 | メディア掲載バナー | 1h | +10% |
| P1 | 獣医師コメント | 1.5h | +8% |
| P1 | 購買数実績 | 0.5h | +5% |
| P2 | 返金保証フラッシュ | 1h | +8% |

**合計**: ~7h | **推定CVR向上**: +30-50%

---

## 注記

- データは2026年4月公開情報ベース
- CVR数値は参考値（一般的なD2C ペット向けLP実績）
- 実装時は各競合の最新構成を公式サイトで確認推奨
- ココペリの独自性（シリカ濃度10,000mg/L）は既に強み → Before-After で可視化すべき

