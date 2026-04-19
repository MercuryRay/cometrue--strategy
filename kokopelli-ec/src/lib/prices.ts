/**
 * ココペリEC 価格定数 — 唯一の真実 (Single Source of Truth)
 *
 * すべての価格・送料はこのファイルから import すること。
 * ハードコード禁止。修正時はここ1箇所のみ変更。
 */

// 商品価格（税込）
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

// 表示用フォーマッタ
export const formatYen = (n: number): string => `¥${n.toLocaleString('ja-JP')}`;

// プラン定義（Stripe・LP・Checkout 共通）
export const PRICES = {
  single: SINGLE_PRICE,
  bundle2: BUNDLE_2_PRICE,
  bundle6: BUNDLE_6_PRICE,
  subscription: SUBSCRIPTION_PRICE,
  shipping: SHIPPING,
  referralDiscount: REFERRAL_DISCOUNT,
} as const;

export type PriceKey = keyof typeof PRICES;
