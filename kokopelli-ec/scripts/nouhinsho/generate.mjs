#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', '..');

const orderPath = process.argv[2] || join(__dirname, 'order.json');
if (!existsSync(orderPath)) {
  console.error(`order.json not found: ${orderPath}`);
  console.error('Usage: node generate.mjs [path/to/order.json]');
  process.exit(1);
}

const order = JSON.parse(readFileSync(orderPath, 'utf8'));

const yen = (n) => `¥${Number(n).toLocaleString('ja-JP')}`;
const subtotal = order.items.reduce((s, it) => s + it.unitPrice * it.qty, 0);
const shipping = Number(order.shipping ?? 0);
const total = subtotal + shipping;

const issueDate = order.issueDate || new Date().toISOString().slice(0, 10);
const yyyymmdd = issueDate.replaceAll('-', '');
const docNo = order.docNo || `KKP-${yyyymmdd}-001`;

const html = `<!doctype html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>納品書 ${docNo} - ココペリ シリカウォーター</title>
    <style>
      @page { size: A4; margin: 10mm 12mm; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Meiryo', 'Yu Gothic', sans-serif; color: #333; font-size: 11px; line-height: 1.4; }
      .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; padding-bottom: 8px; border-bottom: 2px solid #d97706; }
      .header h1 { font-size: 20px; color: #d97706; letter-spacing: 0.15em; }
      .header .lead { margin-top: 4px; font-size: 11px; color: #666; }
      .header .doc-info { text-align: right; font-size: 10px; color: #666; line-height: 1.6; }
      .section { margin-bottom: 12px; }
      .section h2 { font-size: 11px; color: #d97706; margin-bottom: 4px; padding-bottom: 2px; border-bottom: 1px solid #e5e7eb; }
      table { width: 100%; border-collapse: collapse; }
      .info-table td { padding: 2px 0; font-size: 11px; }
      .info-table td:first-child { width: 70px; color: #666; font-weight: bold; }
      .item-table th { background: #fef3c7; padding: 5px 6px; text-align: left; font-size: 10px; border-bottom: 1.5px solid #d97706; }
      .item-table td { padding: 5px 6px; font-size: 11px; border-bottom: 1px solid #e5e7eb; }
      .item-table .right { text-align: right; }
      .total-row td { font-weight: bold; font-size: 12px; border-top: 1.5px solid #333; padding-top: 6px; }
      .total-amount { font-size: 16px; color: #d97706; }
      .footer { margin-top: 12px; padding-top: 6px; border-top: 1px solid #e5e7eb; font-size: 9px; color: #999; text-align: center; line-height: 1.5; }
      .stamp-area { margin-top: 8px; display: flex; justify-content: flex-end; }
      .stamp-box { width: 56px; height: 56px; border: 1px dashed #ccc; display: flex; align-items: center; justify-content: center; color: #ccc; font-size: 10px; }
    </style>
  </head>
  <body>
    <div class="header">
      <div>
        <h1>納 品 書</h1>
        <p class="lead">下記の通り納品いたします。</p>
      </div>
      <div class="doc-info">
        <p>納品書番号: ${docNo}</p>
        <p>発行日: ${issueDate}</p>
        ${order.deliveryDate ? `<p>納品日: ${order.deliveryDate}</p>` : ''}
      </div>
    </div>

    <div class="section">
      <h2>お届け先</h2>
      <table class="info-table">
        <tr><td>お名前</td><td>${order.customer.name} 様</td></tr>
        <tr><td>ご住所</td><td>${order.customer.postal ? `〒${order.customer.postal} ` : ''}${order.customer.address}</td></tr>
        ${order.customer.phone ? `<tr><td>お電話</td><td>${order.customer.phone}</td></tr>` : ''}
        ${order.customer.email ? `<tr><td>メール</td><td>${order.customer.email}</td></tr>` : ''}
      </table>
    </div>

    <div class="section">
      <h2>ご注文内容</h2>
      <table class="item-table">
        <thead>
          <tr>
            <th>商品名</th>
            <th>数量</th>
            <th class="right">単価（税込）</th>
            <th class="right">金額（税込）</th>
          </tr>
        </thead>
        <tbody>
${order.items
  .map(
    (it) => `          <tr>
            <td>${it.name}${it.note ? `<br /><span style="font-size: 9px; color: #888">${it.note}</span>` : ''}</td>
            <td>${it.qty}</td>
            <td class="right">${yen(it.unitPrice)}</td>
            <td class="right">${yen(it.unitPrice * it.qty)}</td>
          </tr>`
  )
  .join('\n')}
          <tr>
            <td colspan="3" class="right" style="color: #666">小計</td>
            <td class="right">${yen(subtotal)}</td>
          </tr>
          <tr>
            <td colspan="3" class="right" style="color: #666">送料</td>
            <td class="right">${shipping === 0 ? '¥0（送料無料）' : yen(shipping)}</td>
          </tr>
          <tr class="total-row">
            <td colspan="3" class="right">合計（税込）</td>
            <td class="right"><span class="total-amount">${yen(total)}</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <h2>お支払い情報</h2>
      <table class="info-table">
        <tr><td>決済方法</td><td>${order.payment?.method || 'クレジットカード（Stripe決済）'}</td></tr>
        <tr><td>決済日</td><td>${order.payment?.date || issueDate}</td></tr>
        <tr><td>ステータス</td><td>${order.payment?.status || 'お支払い済み'}</td></tr>
        ${order.payment?.id ? `<tr><td>取引ID</td><td style="font-family: monospace; font-size: 10px;">${order.payment.id}</td></tr>` : ''}
      </table>
    </div>

    <div class="section">
      <h2>販売者情報</h2>
      <table class="info-table">
        <tr><td>屋号</td><td>カムトゥル（Come true）</td></tr>
        <tr><td>ブランド</td><td>ココペリ シリカウォーター</td></tr>
        <tr><td>サイト</td><td>https://kokopelli-ec.vercel.app</td></tr>
        <tr><td>LINE</td><td>https://line.me/R/ti/p/@636yyubo</td></tr>
      </table>
    </div>

    <div class="stamp-area">
      <div class="stamp-box">印</div>
    </div>

    <div class="footer">
      <p>この納品書はココペリ シリカウォーターの正式な納品書です。</p>
      <p>ご不明な点がございましたら、LINEまたはメールでお問い合わせください。</p>
      <p style="margin-top: 8px">ココペリ シリカウォーター | https://kokopelli-ec.vercel.app</p>
    </div>
  </body>
</html>
`;

const outDir = join(ROOT, 'nouhinsho-output');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, `${docNo}.html`);
writeFileSync(outPath, html, 'utf8');

console.log(`OK: ${outPath}`);
console.log(`合計: ${yen(total)} (小計 ${yen(subtotal)} + 送料 ${yen(shipping)})`);
