/**
 * ココペリEC FAQ コンポーネント
 *
 * - カテゴリ別アコーディオン（details/summary ベース・JS不要で動作）
 * - JSON-LD FAQPage 構造化データを同梱（SEO）
 * - Tailwind v4 / amber-600 ブランドカラー準拠
 *
 * 使用例:
 *   import FAQ from '@/../components/FAQ';
 *   // or: import FAQ from '../../components/FAQ';
 *   <FAQ />
 */

import { FAQ_BY_CATEGORY, FAQ_ITEMS, buildFaqJsonLd, type FAQCategory } from '@/lib/faq-data';

const CATEGORY_ORDER: readonly FAQCategory[] = [
  '製品',
  '安全性',
  '配送',
  '返金',
  '飲ませ方',
] as const;

const CATEGORY_META: Record<FAQCategory, { emoji: string; description: string }> = {
  製品: { emoji: '', description: 'シリカ・ミネラル含有量・pH・賞味期限について' },
  安全性: { emoji: '', description: 'ペット種別・給水量・体質面について' },
  配送: { emoji: '', description: '送料・定期便サイクル・解約について' },
  返金: { emoji: '', description: '満足保証・申請方法・対象条件について' },
  飲ませ方: { emoji: '', description: '量の目安・お水の切り替え方について' },
};

interface FAQProps {
  /** セクションタイトル（省略時: 「よくあるご質問」） */
  heading?: string;
  /** JSON-LD を埋め込むか（複数ページに同じFAQを置く場合は親で1箇所だけ true） */
  includeJsonLd?: boolean;
  /** 追加className（外側 section） */
  className?: string;
}

export default function FAQ({
  heading = 'よくあるご質問',
  includeJsonLd = true,
  className = '',
}: FAQProps) {
  const jsonLd = includeJsonLd ? buildFaqJsonLd(FAQ_ITEMS) : null;

  return (
    <section
      aria-labelledby="faq-heading"
      className={`mx-auto w-full max-w-3xl px-4 py-16 sm:py-20 ${className}`}
    >
      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}

      <header className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold tracking-[0.2em] text-amber-600">FAQ</p>
        <h2 id="faq-heading" className="text-3xl font-bold text-slate-800 sm:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 text-sm text-slate-600 sm:text-base">
          ご購入前に多くいただくご質問をまとめました。解決しない場合は公式LINEよりお気軽にどうぞ。
        </p>
      </header>

      <div className="space-y-10">
        {CATEGORY_ORDER.map((cat) => {
          const items = FAQ_BY_CATEGORY[cat] ?? [];
          if (items.length === 0) return null;
          const meta = CATEGORY_META[cat];
          return (
            <div key={cat}>
              <div className="mb-4 border-l-4 border-amber-600 pl-3">
                <h3 className="text-lg font-bold text-slate-800 sm:text-xl">{cat}</h3>
                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">{meta.description}</p>
              </div>

              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.id}>
                    <details
                      id={item.id}
                      className="group rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-amber-300 open:border-amber-500 open:shadow-md"
                    >
                      <summary className="flex cursor-pointer list-none items-start gap-3 rounded-xl px-5 py-4 text-left font-semibold text-slate-800 outline-none focus-visible:ring-2 focus-visible:ring-amber-500">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700"
                        >
                          Q
                        </span>
                        <span className="flex-1 text-sm leading-relaxed sm:text-base">
                          {item.question}
                        </span>
                        <span
                          aria-hidden="true"
                          className="ml-2 mt-1 inline-block h-3 w-3 flex-none rotate-0 border-b-2 border-r-2 border-slate-400 transition-transform duration-200 group-open:rotate-[225deg] group-open:border-amber-600"
                          style={{ transform: 'rotate(45deg)' }}
                        />
                      </summary>
                      <div className="border-t border-slate-100 px-5 py-4">
                        <div className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-slate-800 text-sm font-bold text-white"
                          >
                            A
                          </span>
                          <p className="flex-1 whitespace-pre-line text-sm leading-relaxed text-slate-700 sm:text-base">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <footer className="mt-12 rounded-xl bg-amber-50 px-6 py-6 text-center">
        <p className="text-sm text-slate-700 sm:text-base">
          その他のご質問は公式LINEまたはお問い合わせフォームまでお気軽にどうぞ。
        </p>
      </footer>
    </section>
  );
}
