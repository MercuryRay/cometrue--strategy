import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー｜ココペリ",
  description: "ココペリのプライバシーポリシー。個人情報の取り扱いについてご説明します。",
};

export default function PrivacyPage() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">K</div>
            <span className="font-black text-blue-900 tracking-wide">kokopelli</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-2xl mx-auto px-4 prose prose-sm prose-gray">
          <h1 className="text-2xl font-black text-blue-950 mb-8">プライバシーポリシー</h1>

          <p>カムトゥル（Come true）（以下「当社」）は、ココペリ公式オンラインショップ（以下「本サービス」）における個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。</p>

          <h2 className="text-lg font-bold mt-8 mb-3">1. 収集する個人情報</h2>
          <p>当社は、本サービスの提供にあたり、以下の個人情報を収集することがあります。</p>
          <ul>
            <li>氏名</li>
            <li>メールアドレス</li>
            <li>配送先住所</li>
            <li>電話番号</li>
            <li>決済に関する情報（クレジットカード情報はStripe社が管理し、当社は保持しません）</li>
            <li>購入履歴</li>
          </ul>

          <h2 className="text-lg font-bold mt-8 mb-3">2. 個人情報の利用目的</h2>
          <ul>
            <li>商品の発送およびお届けに関するご連絡</li>
            <li>ご注文内容の確認、決済処理</li>
            <li>定期購入（サブスクリプション）の管理</li>
            <li>お問い合わせへの対応</li>
            <li>商品やサービスに関するご案内</li>
            <li>サービスの改善・分析</li>
          </ul>

          <h2 className="text-lg font-bold mt-8 mb-3">3. 第三者への提供</h2>
          <p>当社は、以下の場合を除き、お客様の個人情報を第三者に提供することはありません。</p>
          <ul>
            <li>お客様の同意がある場合</li>
            <li>法令に基づく場合</li>
            <li>商品の配送のため、配送業者に必要な範囲で提供する場合</li>
            <li>決済処理のため、Stripe社に必要な範囲で提供する場合</li>
          </ul>

          <h2 className="text-lg font-bold mt-8 mb-3">4. Cookie・アクセス解析ツールの使用</h2>
          <p>本サービスでは、以下のツールを使用してアクセス情報を収集しています。</p>
          <ul>
            <li><strong>Google Analytics 4（GA4）</strong> — サイトの利用状況を分析し、サービス改善に活用します</li>
            <li><strong>Meta Pixel</strong> — 広告の効果測定に使用します</li>
          </ul>
          <p>これらのツールはCookieを使用しますが、個人を特定する情報は含まれません。ブラウザの設定によりCookieを無効にすることが可能です。</p>

          <h2 className="text-lg font-bold mt-8 mb-3">5. 個人情報の管理</h2>
          <p>当社は、個人情報の漏洩・滅失・毀損を防止するため、適切なセキュリティ対策を講じます。クレジットカード情報はStripe社のPCI DSS準拠の環境で管理され、当社のサーバーには保存されません。</p>

          <h2 className="text-lg font-bold mt-8 mb-3">6. 個人情報の開示・訂正・削除</h2>
          <p>お客様ご本人から個人情報の開示・訂正・削除のご請求があった場合、ご本人確認のうえ、速やかに対応いたします。下記のお問い合わせ先までご連絡ください。</p>

          <h2 className="text-lg font-bold mt-8 mb-3">7. プライバシーポリシーの変更</h2>
          <p>当社は、必要に応じて本ポリシーを変更することがあります。変更後のポリシーは、本ページに掲載した時点から効力を生じるものとします。</p>

          <h2 className="text-lg font-bold mt-8 mb-3">8. お問い合わせ</h2>
          <p>個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。</p>
          <p>
            カムトゥル（Come true）<br />
            Email: <a href="mailto:info@kamuturu.jp" className="text-blue-600">info@kamuturu.jp</a><br />
            URL: <a href="https://kamuturu.jp" className="text-blue-600">https://kamuturu.jp</a>
          </p>

          <p className="text-sm text-gray-400 mt-8">制定日: 2026年4月11日</p>

          <div className="mt-8 text-center">
            <Link href="/" className="text-blue-600 text-sm hover:underline">トップページに戻る</Link>
          </div>
        </div>
      </main>
    </>
  );
}
