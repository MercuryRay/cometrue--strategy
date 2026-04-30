/**
 * ココペリEC 自動メールテンプレート
 *
 * メールシリーズ:
 * 1. purchase_confirmation — 購入直後
 * 2. shipping_notification — 発送通知
 * 3. usage_reminder       — 到着3日後（使い方リマインダー）
 * 4. effect_check         — 2週間後（様子伺い）
 * 5. reorder_reminder     — 1ヶ月後（次回購入案内）
 * 6. referral_campaign    — 紹介キャンペーン案内
 */

export interface TemplateVars {
  customerName: string;
  email?: string;
  productName?: string;
  quantity?: number;
  amount?: number;
  trackingNumber?: string;
  trackingUrl?: string;
  carrier?: string;
  referralCode?: string;
  mypageUrl?: string;
  shopUrl?: string;
}

const SHOP_URL = 'https://kokopelli.kamuturu.jp';
const LINE_URL = 'https://line.me/R/ti/p/@636yyubo';
const FOOTER = `
━━━━━━━━━━━━━━━━━━━━
ココペリ｜犬・猫のための動物用栄養補助食品
公式サイト: ${SHOP_URL}
LINE相談: ${LINE_URL}
お問合せ: info@kamuturu.jp
運営: カムトゥル (Come true)
━━━━━━━━━━━━━━━━━━━━
※このメールに心当たりがない場合はお手数ですがinfo@kamuturu.jpまでご連絡ください。
`.trim();

// ───────────────────────────────────────────
// 1. 購入確認メール
// ───────────────────────────────────────────
export function purchaseConfirmation(vars: TemplateVars) {
  const subject = '【ココペリ】ご注文ありがとうございます';
  const referralBlock = vars.referralCode
    ? `

■ お友達紹介で双方¥500OFF
あなた専用の紹介コード: ${vars.referralCode}
ご紹介URL: ${SHOP_URL}/checkout?ref=${vars.referralCode}
お友達がこのURLからご購入されると、お友達は¥500割引でお買い物でき、
${vars.customerName}様にも次回購入時に使える¥500クレジットが自動付与されます。`
    : '';
  const text = `${vars.customerName}様

この度はココペリをご注文いただき、誠にありがとうございます。

■ ご注文内容
商品: ${vars.productName || 'ココペリ（水溶性ケイ素濃縮液）'}
数量: ${vars.quantity || 1}点
金額: ¥${(vars.amount || 0).toLocaleString()}（税込・送料込）

ご注文の商品は、通常3〜5営業日以内に発送いたします。
発送完了後、追跡番号をメールでお知らせいたします。

■ マイページ
ご注文履歴・配送状況は下記マイページからご確認いただけます。
${vars.mypageUrl || SHOP_URL + '/account'}
${referralBlock}

■ ご不明な点はお気軽に
LINE: ${LINE_URL}
メール: info@kamuturu.jp

大切なご家族（ペット）の健康のお役に立てますよう、
心を込めてお届けいたします。

${FOOTER}`;

  return { subject, text };
}

// ───────────────────────────────────────────
// 2. 発送通知メール
// ───────────────────────────────────────────
export function shippingNotification(vars: TemplateVars) {
  const subject = '【ココペリ】商品を発送いたしました';
  const text = `${vars.customerName}様

ご注文いただいた商品を発送いたしました。

■ 配送情報
配送業者: ${vars.carrier || 'ヤマト運輸'}
追跡番号: ${vars.trackingNumber || '（登録後にお知らせいたします）'}
${vars.trackingUrl ? `追跡URL: ${vars.trackingUrl}` : ''}

お届けまで通常1〜3日ほどお時間をいただきます。
届きましたら、まずは中身のご確認をお願いいたします。

■ はじめてのお客様へ
商品に同封のガイドに使い方を記載しておりますが、
ご不明な点がございましたらお気軽にLINEでご相談ください。
LINE: ${LINE_URL}

${FOOTER}`;

  return { subject, text };
}

// ───────────────────────────────────────────
// 3. 使い方リマインダー（到着3日後）
// ───────────────────────────────────────────
export function usageReminder(vars: TemplateVars) {
  const subject = '【ココペリ】使い方のご案内｜おすすめの与え方';
  const text = `${vars.customerName}様

ココペリをお届けしてから数日が経ちました。
無事にお手元に届いておりますでしょうか？

今日は、ココペリをおいしく続けていただくためのおすすめの使い方をご案内します。

━━━ ココペリの与え方 ━━━

【基本の使い方】
- 毎日のお水やフードに数滴混ぜるだけ
- 小型犬・猫: 1日3〜5滴
- 中型犬: 1日5〜8滴
- 大型犬: 1日8〜10滴

【ポイント】
1. 毎日同じ時間帯に与えると習慣化しやすいです
2. お水に混ぜる場合は、新鮮な水に交換するタイミングで
3. フードに直接かけてもOK。味や匂いはほぼ変わりません

【継続のめやす】
個体差がありますが、2〜4週間ほど継続してお使いいただくと、
毛並みや活力の変化を感じたとのお声をいただくことがあります。

━━━━━━━━━━━━━━━━

「うちの子に合う量がわからない」
「こんな症状があるけど使って大丈夫？」

など、どんな些細なことでもお気軽にご相談ください。
LINE: ${LINE_URL}

${FOOTER}`;

  return { subject, text };
}

// ───────────────────────────────────────────
// 4. 様子伺いメール（2週間後）
// ───────────────────────────────────────────
export function effectCheck(vars: TemplateVars) {
  const subject = '【ココペリ】その後いかがですか？';
  const text = `${vars.customerName}様

ココペリをご利用いただいて約2週間が経ちました。
${vars.customerName}様のペットちゃんの調子はいかがでしょうか？

この時期に感じる変化として、お客様からよくいただくお声:

「毛並みにツヤが出てきた気がする」
「以前より元気に散歩するようになった」
「ごはんの食いつきが良くなった」

ケイ素は体内に蓄積しないため、毎日コツコツ続けることが大切です。
まだ変化を感じていなくても、焦らずお続けください。

■ お困りのことはありませんか？

使い方でお悩みのことや、気になる症状がございましたら
お気軽にLINEでご相談ください。獣医師監修のもと回答いたします。

LINE: ${LINE_URL}

■ マイページ
${vars.mypageUrl || SHOP_URL + '/member'}

${FOOTER}`;

  return { subject, text };
}

// ───────────────────────────────────────────
// 5. 次回購入リマインダー（1ヶ月後）
// ───────────────────────────────────────────
export function reorderReminder(vars: TemplateVars) {
  const subject = '【ココペリ】そろそろ残りが少なくなっていませんか？';
  const text = `${vars.customerName}様

ココペリをご愛用いただきありがとうございます。
ご購入から約1ヶ月が経ちました。

そろそろ残りが少なくなっている頃ではないでしょうか？

ケイ素の健康サポートは「毎日の継続」が大切です。
途切れなくお使いいただくため、お早めのご注文をおすすめいたします。

■ ご注文はこちら
${vars.shopUrl || SHOP_URL}

■ お得な2本セット
まとめ買いで1本あたりお得になります。
詳しくは公式サイトをご覧ください。

■ LINEお友だち限定
LINE登録済みの方には、リピーター様向けの
お得な情報を優先的にお届けしています。
LINE: ${LINE_URL}

${FOOTER}`;

  return { subject, text };
}

// ───────────────────────────────────────────
// 6. 紹介キャンペーン案内
// ───────────────────────────────────────────
export function referralCampaign(vars: TemplateVars) {
  const subject = '【ココペリ】お友だち紹介で¥500割引プレゼント';
  const text = `${vars.customerName}様

いつもココペリをご愛用いただきありがとうございます。

大切なペットの健康を想う気持ちは、飼い主様同士で共感できるもの。
もし周りにペットの健康でお悩みの方がいらっしゃいましたら、
ぜひココペリをご紹介ください。

━━━ 紹介キャンペーン ━━━

【特典】
ご紹介者様: ¥500割引クレジット（次回購入時に自動適用）
お友だち: 通常価格でご購入いただけます

【紹介方法】
1. マイページから紹介コードを確認
   ${vars.mypageUrl || SHOP_URL + '/member'}
${vars.referralCode ? `   あなたの紹介コード: ${vars.referralCode}` : ''}
2. お友だちに紹介コードを共有
3. お友だちが紹介コード付きで購入
4. 自動で¥500クレジットが付与されます

━━━━━━━━━━━━━━━━

紹介人数に上限はありません。
ご紹介いただくたびに¥500クレジットが貯まります。

${FOOTER}`;

  return { subject, text };
}

// ───────────────────────────────────────────
// 7. カート放棄リカバリーメール（expired session直後）
// ───────────────────────────────────────────
export interface AbandonedCartVars {
  customerName: string;
  productName: string;
  amount: number;
  recoveryUrl: string;
}

export function abandonedCart(vars: AbandonedCartVars) {
  const subject = '【ココペリ】お買い物の続きはこちらから（¥500クーポン同梱）';
  const text = `${vars.customerName || 'お客様'}様

先ほどはココペリの購入ページまでお進みいただき、ありがとうございました。
決済画面でお手続きが中断されたままになっておりましたので、
そのままお買い物を再開できる専用URLをお送りいたします。

■ 中断された商品
${vars.productName}（¥${(vars.amount || 0).toLocaleString()}）

■ お買い物を再開する
${vars.recoveryUrl}

※このURLは24時間有効です。
※決済方法はクレジットカード（Visa/Mastercard/AMEX）に対応しています。

━━━ 限定クーポン ━━━

このメールから24時間以内にご購入いただいた方限定で
クーポンコード「COMEBACK500」で **¥500OFF** になります。
決済画面の「クーポン」欄にご入力ください。

━━━━━━━━━━━━━━━━

「決済画面でつまずいてしまった」「迷ってしまった」というお声をよくいただきます。
不明点はLINEでお気軽にどうぞ。獣医師監修のもと、ご相談を承っております。
LINE: ${LINE_URL}

ご家族（ペット）の健康のお役に立てる商品です。
ご検討、よろしくお願いいたします。

${FOOTER}`;

  return { subject, text };
}

// ───────────────────────────────────────────
// 8. オーナー向け新規購入通知
// ───────────────────────────────────────────
export interface OwnerNotifyVars {
  customerName: string;
  customerEmail: string;
  productName: string;
  quantity: number;
  amount: number;
  addressStr: string;
  shippingName: string;
  sessionId: string;
  paymentIntent: string;
}

export function ownerPurchaseNotification(vars: OwnerNotifyVars) {
  const subject = `【ココペリ】新規注文 ¥${vars.amount.toLocaleString()} - ${vars.customerName}様`;
  const text = `新しい注文が入りました。

■ 注文情報
お名前: ${vars.customerName}
メール: ${vars.customerEmail}
商品: ${vars.productName}
数量: ${vars.quantity}点
金額: ¥${vars.amount.toLocaleString()}（税込）

■ 配送先
${vars.addressStr}
${vars.shippingName}様

■ Stripe
Session ID: ${vars.sessionId}
Payment: ${vars.paymentIntent}
ダッシュボード: https://dashboard.stripe.com/payments/${vars.paymentIntent}

━━━━━━━━━━━━━━━━━━━━
ココペリEC 自動通知
━━━━━━━━━━━━━━━━━━━━`;

  return { subject, text };
}

// ───────────────────────────────────────────
// テンプレートマップ（APIからの呼び出し用）
// ───────────────────────────────────────────
export const TEMPLATES = {
  purchase_confirmation: purchaseConfirmation,
  shipping_notification: shippingNotification,
  usage_reminder: usageReminder,
  effect_check: effectCheck,
  reorder_reminder: reorderReminder,
  referral_campaign: referralCampaign,
} as const;

export type TemplateName = keyof typeof TEMPLATES;
