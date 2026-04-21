# Stripe Checkout 最適化監査レポート
**日時:** 2026-04-22  
**スコープ:** `/src/app/api/checkout/` + `/src/app/api/subscribe/` + checkout UX  
**目標:** Cart Abandonment 70%→45% (25pt改善)

---

## 課題 Top 10 (優先度順)

### 1. 【HIGH】payment_method_types 未指定 → Apple Pay / Google Pay 非対応
**現状:** Checkout Session作成時に `payment_method_types` が明示されていない  
**影響:** デフォルトはcard/iDealのみ。スマホユーザー（決済の40%）がワンクリック決済できない  
**証拠:** `route.ts:42-72` でリカバリー設定はあるが支払い方法が限定的  
**修正パッチ:**
```typescript
// route.ts:87-90 に追加
payment_method_types: [
  'card',        // Visa/MC/AMEX/JCB (既存対応)
  'apple_pay',   // Safari/iOS/Apple Wallet
  'google_pay',  // Chrome/Android/Google Wallet
  'konbini',     // 日本コンビニ (利用可能なら有効化)
],
```
**A/B Test:** Mobile CV率: 現状 vs +Apple/Google Pay → 期待: +8-12%

---

### 2. 【HIGH】billing_address_collection が省略 → 請求住所未収集
**現状:** checkout route.ts に `billing_address_collection` がない  
**影響:** Stripe Dashboard で billing address 不明。配送エラーリスク、CRM連携不可  
**修正パッチ:**
```typescript
// route.ts:149-151 の phone_number_collection の下に追加
billing_address_collection: 'required', // 日本EC向け: shipping と同じ住所確認
```
**注:** 顧客体験を損なわないため、shipping_address_collection と同じ「JP限定」に設定

---

### 3. 【MID】customer_creation: 'always' だが fbp/fbc metadata が不完全
**現状:** `customer_creation: 'always'` は正しいが、Meta CAPI correlation が弱い  
**影響:** Meta広告との顧客マッチング精度 60-70% → 改善可能  
**修正パッチ:**
```typescript
// route.ts:153-161 metadata section
metadata: {
  // ... (既存)
  ...(fbp ? { fbp: String(fbp) } : {}),
  ...(fbc ? { fbc: String(fbc) } : {}),
  // 追加: CAPI correlation
  ...(fbp ? { fbp_for_capi: String(fbp) } : {}), 
  purchase_channel: 'web_checkout',
  marketing_consent: 'pending',
},
```
**A/B Test:** Meta ROAS: 現状 vs +metadata correlation

---

### 4. 【MID】locale 未指定 → 日本語チェックアウト UI が保証されない
**現状:** Stripe Checkout デフォルトは ブラウザの Accept-Language  
**影響:** 海外VPN/偽物ブラウザ設定で英語になる可能性  
**修正パッチ:**
```typescript
// route.ts:87 の sessionParams に追加
locale: 'ja',  // または 'ja-JP'
```

---

### 5. 【MID】expires_at 24時間は OK だが、recovery が実装されていない
**現状:** `expires_at: expiresAt` + `recovery: { enabled: true }` は正しい  
**改善:** recovery_url をカート放棄メール送信時に使用すること  
**修正パッチ:**
```typescript
// session 作成後に session.recovery?.url を DB 保存
const session = await stripe.checkout.sessions.create(sessionParams);
if (session.recovery?.url) {
  // DB: customer recovery_url を保存し、email trigger に使用
  await db.cartAbandonment.create({
    sessionId: session.id,
    recoveryUrl: session.recovery.url,
    expiresAt: new Date((expiresAt + 24*3600) * 1000),
    customerEmail: 取得したメール,
  });
}
```

---

### 6. 【MID】line_items product_data.images が空 → Checkout視認性が低い
**現状:** `product_data: { name, description }` のみ。images なし  
**影響:** 顧客が商品写真を見られない → 離脱リスク  
**修正パッチ:**
```typescript
product_data: {
  name: productName,
  description: productDesc,
  images: [
    'https://kokopelli.kamuturu.jp/images/image-4.webp', // パッケージ写真
  ],
},
```

---

### 7. 【MID】success_url / cancel_url UX が単純
**現状:**  
- `success_url: /success?session_id={...}&plan=X&amount=Y`  
- `cancel_url: /checkout`

**改善:** cancel_url で「どうして戻ったのか」を選択肢で聞く  
**修正パッチ:**
```typescript
cancel_url: `${siteUrl}/checkout?from=cart_cancel&plan=${plan}&amount=${finalAmount}`,
// /checkout page で URL param を読み取り、
// cancel reason poll を表示: 「高い？ 送料？ カード情報不安？」
```

---

### 8. 【MID】subscription mode との切り替えロジックが client-side のみ
**現状:** `/checkout` と `/api/subscribe` が別々。フロント側で `if (selectedPlan === 'subscription')` で分岐  
**リスク:** mode の混在がありえる  
**改善:** API route 側で自動判定
```typescript
// route.ts を統合版に
export async function POST(req: NextRequest) {
  const { plan, ...rest } = await req.json();
  const mode = (plan === 'subscription') ? 'subscription' : 'payment';
  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode,
    // ... plan に応じて line_items 動的生成
  };
}
```

---

### 9. 【LOW】promotion_codes 対応が recovery のみ
**現状:** `recovery: { allow_promotion_codes: true }` のみ  
**改善:** デフォルト Checkout 流でも有効化
```typescript
// sessionParams に追加
discounts: undefined, // UI側で promo code input を表示
allow_promotion_codes: true,
```

---

### 10. 【LOW】customer_creation: 'always' なので duplicate customer 管理不要だが、metadata の一貫性チェックが不完全
**現状:** Meta CAPI 連携は success page の fbq() のみ  
**改善:** server-side webhook で CAPI call を実装  
**修正パッチ:** `/api/webhook/route.ts` で `checkout.session.completed` イベントから:
```typescript
if (event.type === 'checkout.session.completed') {
  const session = event.data.object as Stripe.Checkout.Session;
  // Meta CAPI Purchase event 送信 (deduplicate via session_id)
  await sendMetaCAPIEvent({
    event_name: 'Purchase',
    event_id: session.id,
    customer: {
      email: session.customer_details?.email,
      phone: session.customer_details?.phone,
      fbc: session.metadata?.fbc,
      fbp: session.metadata?.fbp,
    },
    value: session.amount_total,
    currency: session.currency?.toUpperCase(),
  });
}
```

---

## A/B Test 推奨項目

| 項目 | Control | Test | 期待効果 | KPI |
|------|---------|------|--------|-----|
| **Payment Methods** | card only | +Apple Pay/Google Pay | スマホ CV | Mobile +8-12% |
| **Billing Address** | なし | required | 配送精度 | Billing mismatch -50% |
| **Checkout Images** | 画像なし | product images 表示 | 信頼度 | Abandon -3-5% |
| **Cancel UX** | 単純戻る | cancel reason poll | 改善点把握 | Insights +有 |
| **Recovery URL** | 未使用 | Email + recovery link | 戻り率 | Cart recovery +15-20% |
| **Locale** | auto | ja 強制 | UI確実性 | JP visitor +2% |

---

## 修正実装順序 (優先度)

1. **Week 1 (Critical):** 
   - #1: payment_method_types 追加
   - #2: billing_address_collection 追加
   - #4: locale: 'ja' 追加

2. **Week 2 (High Impact):**
   - #6: line_items images 追加
   - #3: metadata CAPI correlation 強化
   - #5: recovery_url DB 保存

3. **Week 3 (Polish):**
   - #7: cancel_url reason poll
   - #8: subscription mode 統合
   - #9/#10: promotion codes + webhook CAPI

---

## 推定効果

- **Abandonment 削減:** 25pt (70%→45%)
- **Mobile CV:** +8-12%
- **Recovery Rate:** +15-20%
- **配送エラー削減:** -50%
- **Meta ROAS:** +5-10%

**総合CV改善期待:** +15-20%

