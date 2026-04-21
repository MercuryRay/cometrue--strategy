/**
 * ココペリEC 価格定数 — 唯一の真実 (Single Source of Truth)
 *
 * すべての価格・送料はこのファイルから import すること。
 * ハードコード禁止。修正時はここ1箇所のみ変更。
 */

// ============================================================
// 実販売価格（税込）— Stripe Price ID と紐付く「実際に課金される額」
// ============================================================
export const SINGLE_PRICE = 3480; // 1本（送料別）
export const BUNDLE_2_PRICE = 5980; // 2本セット（送料無料）
export const BUNDLE_6_PRICE = 15000; // 5+1セット 6本（送料無料）
export const SUBSCRIPTION_PRICE = 5480; // 定期便 2本/月（送料無料）

// 1本あたり単価（表示用）
export const PER_BOTTLE_BUNDLE_2 = 2990;
export const PER_BOTTLE_BUNDLE_6 = 2500;
export const PER_BOTTLE_SUBSCRIPTION = 2740;

// 送料
export const SHIPPING = 520; // 1本購入時の送料（全国一律）
export const SHIPPING_FREE_THRESHOLD = BUNDLE_2_PRICE; // 2本セット以上で送料無料

// 紹介コード割引
export const REFERRAL_DISCOUNT = 500; // 紹介者・被紹介者ともに ¥500 OFF

// ============================================================
// アンカー価格（表示専用）— CVR向上のための心理価格設計
// ------------------------------------------------------------
// 「通常価格 ¥4,980 → 特別価格 ¥3,480」のような比較表示に使う。
// これは架空の値引きではなく、単品小売時の「定価（希望小売価格）」として
// 正当に設定可能な水準。LP/チェックアウトで打ち消し線表示に使う。
//
// ⚠ 実課金額（上記 SINGLE_PRICE 等）は変更していない。
// ⚠ 景品表示法（二重価格表示）対策: REGULAR_PRICES は「通常小売価格」
//    であり、一定期間販売実績があることを前提に使うこと。
// ============================================================

/** 通常価格（アンカー）— 打ち消し線で見せる "before" 価格 */
export const REGULAR_PRICES = {
  single: 4980, // 1本通常価格（アンカー）
  bundle2: 7960, // 2本セット通常価格（= 4980 × 2 − セット割 0）
  bundle6: 20880, // 6本セット通常価格（≒ 3480 × 6）
  subscription: 6960, // 定期便通常想定価格（= 3480 × 2）
} as const;

/** 初回限定お試し価格（お試しキャンペーン用・未使用時は null） */
export const FIRST_TRIAL_PRICES = {
  /** 初回1本お試し ¥1,980（送料無料キャンペーン想定） */
  single: 1980,
  /** 定期便 初回 50%OFF ¥2,740 想定（2回目以降 ¥5,480） */
  subscription: 2740,
} as const;

// ============================================================
// 割引率（自動計算）— アンカー比での OFF% を表示に使う
// ============================================================
const calcDiscount = (regular: number, actual: number): number =>
  Math.round((1 - actual / regular) * 100);

export const DISCOUNT_PERCENT = {
  single: calcDiscount(REGULAR_PRICES.single, SINGLE_PRICE), // 30%
  bundle2: calcDiscount(REGULAR_PRICES.bundle2, BUNDLE_2_PRICE), // 25%
  bundle6: calcDiscount(REGULAR_PRICES.bundle6, BUNDLE_6_PRICE), // 28%
  subscription: calcDiscount(REGULAR_PRICES.subscription, SUBSCRIPTION_PRICE), // 21%
  firstTrialSingle: calcDiscount(REGULAR_PRICES.single, FIRST_TRIAL_PRICES.single), // 60%
  firstTrialSubscription: calcDiscount(
    REGULAR_PRICES.subscription,
    FIRST_TRIAL_PRICES.subscription
  ), // 61%
} as const;

// ============================================================
// 表示用フォーマッタ
// ============================================================
export const formatYen = (n: number): string => `¥${n.toLocaleString('ja-JP')}`;

// ============================================================
// プラン定義（Stripe・LP・Checkout 共通）
// 既存互換: PRICES の shape は維持（破壊的変更なし）
// 新規: PRICES.regular / PRICES.firstTrial / PRICES.discount を追加
// ============================================================
export const PRICES = {
  // 実課金額（既存）
  single: SINGLE_PRICE,
  bundle2: BUNDLE_2_PRICE,
  bundle6: BUNDLE_6_PRICE,
  subscription: SUBSCRIPTION_PRICE,
  shipping: SHIPPING,
  referralDiscount: REFERRAL_DISCOUNT,

  // アンカー / 初回 / 割引率（新規・表示専用）
  regular: REGULAR_PRICES,
  firstTrial: FIRST_TRIAL_PRICES,
  discount: DISCOUNT_PERCENT,
} as const;

// 後方互換: 既存インポート元は PriceKey を string literal union として使う。
// regular/firstTrial/discount は object 型のため、既存ロジックとは衝突しない。
export type PriceKey = keyof typeof PRICES;
export type RegularPriceKey = keyof typeof REGULAR_PRICES;
export type FirstTrialPriceKey = keyof typeof FIRST_TRIAL_PRICES;
