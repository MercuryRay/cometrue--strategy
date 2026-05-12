import Link from 'next/link';
import type { Metadata } from 'next';
import { articles } from './blog/articles';

export const metadata: Metadata = {
  title: 'ページが見つかりません (404)',
  description:
    'お探しのページは見つかりませんでした。ココペリ公式トップ・ブログ・お問い合わせのご案内はこちら。',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const featured = articles.slice(0, 4);

  return (
    <>
      <header className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-bold text-amber-600">
            ココペリ
          </Link>
          <Link href="/blog" className="text-sm text-gray-600 hover:text-amber-600">
            ブログ
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          <p className="text-amber-600 font-black tracking-widest text-sm mb-3">404 NOT FOUND</p>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
            ページが見つかりませんでした
          </h1>
          <p className="text-gray-600 mb-10 leading-relaxed">
            お探しのページは移動・削除された可能性があります。
            <br />
            下記から目的のページへお進みください。
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-3 rounded-full font-bold shadow hover:shadow-lg transition-all hover:-translate-y-0.5"
            >
              トップへ戻る
            </Link>
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center bg-white border-2 border-amber-500 text-amber-600 px-8 py-3 rounded-full font-bold hover:bg-amber-50 transition-all"
            >
              商品ページ
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center bg-white border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-full font-bold hover:bg-slate-50 transition-all"
            >
              ブログ一覧
            </Link>
          </div>

          {featured.length > 0 && (
            <div className="mt-12 text-left">
              <h2 className="text-lg font-bold text-slate-900 mb-4 text-center">
                よく読まれている記事
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {featured.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="block p-4 bg-white rounded-xl border hover:border-amber-300 hover:shadow-md transition-all"
                  >
                    <h3 className="font-bold text-slate-900 text-sm mb-1 line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{a.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-100 border-t mt-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-amber-600">
            ココペリ公式サイト
          </Link>
          <span className="mx-2">|</span>
          <Link href="/tokushoho" className="hover:text-amber-600">
            特定商取引法に基づく表記
          </Link>
        </div>
      </footer>
    </>
  );
}
