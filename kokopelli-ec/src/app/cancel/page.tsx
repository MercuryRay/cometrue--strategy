import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '定期購入の解約方法｜ココペリ',
  description:
    'ココペリ定期便の解約方法をご案内します。いつでも解約可能、解約料・違約金は一切かかりません。',
};

export default function CancelPage() {
  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              K
            </div>
            <span className="font-black text-blue-900 tracking-wide">kokopelli</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12 md:py-20">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-black text-blue-950 mb-2">
            定期購入（サブスクリプション）の解約
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            ココペリ定期便はいつでも解約可能です。解約料・違約金は一切かかりません。
          </p>

          {/* 解約方法 */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold text-blue-950 mb-4">解約方法</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-blue-950">
                    マイページから解約（おすすめ・即時反映）
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    マイページの「支払い方法・プランを管理する」から、いつでもご自身で解約できます。お手続き完了時点で解約予約が確定するため、最も確実です。
                  </p>
                  <Link
                    href="/account"
                    className="inline-flex items-center mt-2 text-blue-600 text-sm font-bold hover:underline"
                  >
                    マイページを開く
                  </Link>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold shrink-0">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-blue-950">メールで連絡</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    以下のメールアドレスに、お名前と「解約希望」の旨をお送りください。担当者が確認後、解約手続きを行います。
                  </p>
                  <a
                    href="mailto:info@kamuturu.jp?subject=ココペリ定期便解約希望"
                    className="inline-flex items-center mt-2 text-blue-600 text-sm font-bold hover:underline"
                  >
                    info@kamuturu.jp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 注意事項 */}
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-amber-800 mb-3">解約に関する注意事項</h2>
            <ul className="space-y-2 text-sm text-amber-700">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 shrink-0 mt-0.5">*</span>
                <span>
                  次回引き落とし日の<strong>前日まで</strong>
                  に解約のお手続き（マイページでの操作完了、またはメール送信）をいただければ、
                  原則、次回分の請求は発生しません。メールでのご依頼は処理のタイミングにより前後する場合があるため、
                  確実に止めたい場合はマイページからの解約をおすすめします。
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 shrink-0 mt-0.5">*</span>
                <span>
                  解約後も、お届け済みの商品の返品・返金には応じかねます（初回30日間返金保証を除く）。
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 shrink-0 mt-0.5">*</span>
                <span>解約手続き完了後、確認メールをお送りいたします。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 shrink-0 mt-0.5">*</span>
                <span>一時停止をご希望の場合もメールでご相談ください。</span>
              </li>
            </ul>
          </div>

          {/* よくある質問 */}
          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-blue-950 mb-4">よくあるご質問</h2>
            <div className="space-y-4">
              <div>
                <p className="font-bold text-blue-900 text-sm">Q. 解約料はかかりますか？</p>
                <p className="text-sm text-gray-700 mt-1">
                  A. いいえ、解約料・違約金は一切かかりません。いつでも無料で解約できます。
                </p>
              </div>
              <div>
                <p className="font-bold text-blue-900 text-sm">Q. 最低利用期間はありますか？</p>
                <p className="text-sm text-gray-700 mt-1">
                  A. ありません。初回分のみでの解約も可能です。
                </p>
              </div>
              <div>
                <p className="font-bold text-blue-900 text-sm">Q. 解約後に再開できますか？</p>
                <p className="text-sm text-gray-700 mt-1">
                  A. はい、いつでも再開できます。サイトから再度お申し込みください。
                </p>
              </div>
              <div>
                <p className="font-bold text-blue-900 text-sm">
                  Q. お届けサイクルの変更はできますか？
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  A. はい、メールでご連絡いただければ変更可能です。
                </p>
              </div>
            </div>
          </div>

          {/* 連絡先 */}
          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-800 mb-3">お問い合わせ先</h2>
            <p className="text-sm text-gray-600 mb-3">カムトゥル (Come true)</p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-500">Email: </span>
                <a href="mailto:info@kamuturu.jp" className="text-blue-600 hover:underline">
                  info@kamuturu.jp
                </a>
              </p>
              <p>
                <span className="text-gray-500">Web: </span>
                <a
                  href="https://kamuturu.jp"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://kamuturu.jp
                </a>
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:underline text-sm font-bold"
            >
              トップページに戻る
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
