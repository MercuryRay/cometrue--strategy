import SectionHeading from '../SectionHeading';
import TextArrowLink from './TextArrowLink';
import { faqs } from '../../faq/faq-data';

/**
 * トップページの FAQ 抜粋。
 * /faq の faq-data.ts (唯一のデータ源) から代表5問を文言そのままで表示する。
 * FAQPage JSON-LD はサイト方針により /faq のみに置くため、ここでは出力しない。
 */
const HOME_FAQS = faqs.slice(0, 5);

export default function HomeFaqSection() {
  return (
    <section className="bg-white" aria-label="よくあるご質問">
      <div className="max-w-[980px] mx-auto px-6 py-24">
        <SectionHeading
          eyebrow="FAQ"
          title="PC無料回収に関するよくあるご質問"
          lead="お問い合わせの多いご質問をまとめました。記載のないご不明点はLINE・お電話でお気軽にどうぞ。"
        />
        <div className="mt-12 space-y-4">
          {HOME_FAQS.map((f) => (
            <details
              key={f.q}
              className="group bg-neutral-50 border border-neutral-100 rounded-2xl open:bg-white open:shadow-md transition"
            >
              <summary className="flex items-start gap-4 cursor-pointer px-6 py-5 list-none min-h-[44px]">
                <span className="text-brand-text font-black shrink-0" aria-hidden="true">
                  Q
                </span>
                <span className="flex-1 font-bold text-neutral-900 text-sm md:text-base">
                  {f.q}
                </span>
                <svg
                  className="w-5 h-5 text-neutral-500 group-open:rotate-180 transition-transform shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-6 pb-5 pl-14">
                <p className="text-sm text-neutral-600 leading-relaxed">{f.a}</p>
              </div>
            </details>
          ))}
        </div>
        <div className="mt-10 text-center">
          <TextArrowLink href="/faq" title="よくあるご質問の全件">
            FAQをすべて見る
          </TextArrowLink>
        </div>
      </div>
    </section>
  );
}
