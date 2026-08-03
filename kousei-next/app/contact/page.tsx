import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import CtaButton from '../components/CtaButton';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { BUSINESS, SITE_URL } from '../lib/business-info';

export const metadata: Metadata = {
  title: 'お問い合わせ【LINE・電話で無料相談】',
  description: `パソコン無料回収のご相談・ご質問はLINE・お電話でお気軽にどうぞ。LINEは24時間受付、写真を送るだけで回収可否をすぐ回答。お電話は${BUSINESS.openingHoursWeekdayDisplay} / ${BUSINESS.openingHoursWeekendDisplay}。`,
  alternates: {
    canonical: `${SITE_URL}/contact`,
    languages: { 'ja-JP': `${SITE_URL}/contact`, 'x-default': `${SITE_URL}/contact` },
  },
  openGraph: {
    title: 'お問い合わせ | 横浜・神奈川のパソコン無料回収',
    description:
      'パソコン無料回収のご相談はLINE・お電話で。LINEは24時間受付、写真を送るだけで回収可否をすぐ回答。',
    url: `${SITE_URL}/contact`,
    siteName: 'PC回収便',
    type: 'website',
    locale: 'ja_JP',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

const helpfulLinks = [
  {
    href: '/faq',
    title: 'よくある質問',
    desc: '料金・データ消去・対応エリアなど、よくいただくご質問への回答',
  },
  {
    href: '/items',
    title: '回収できるもの',
    desc: 'ノートPC・デスクトップ・モニター・サーバーなど無料回収対象の一覧',
  },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'お問い合わせ' }]} />

      {/* Page header */}
      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">
            Contact
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            横浜・神奈川のパソコン無料回収、
            <br />
            お気軽にお問い合わせください。
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            パソコンの無料回収に関するご相談・ご質問は、
            LINE・お電話からお気軽にどうぞ。横浜・神奈川全域、最短翌日対応。
          </p>
        </div>
      </section>

      {/* Contact methods */}
      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {/* LINE */}
            <div className="bg-line/5 border border-line/20 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-line rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </div>
              <h2 className="text-xl font-black mb-2">LINEで相談</h2>
              <p className="text-sm text-neutral-500 mb-6">
                写真を送るだけで回収可否をすぐに回答。
                <br />
                24時間受付（返信は営業時間内）。
              </p>
              <CtaButton
                href={BUSINESS.lineUrl}
                variant="line"
                external
                ariaLabel="LINEで友だち追加してパソコン無料回収を相談する"
              >
                LINEで友だち追加
              </CtaButton>
            </div>

            {/* Phone */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-black mb-2">電話で相談</h2>
              <p className="text-sm text-neutral-500 mb-6">
                お電話でもご相談を承ります。
                <br />
                受付時間: {BUSINESS.openingHoursWeekdayDisplay} /{' '}
                {BUSINESS.openingHoursWeekendDisplay}
              </p>
              <CtaButton
                href={BUSINESS.telLink}
                variant="tel"
                ariaLabel={`電話で問い合わせ ${BUSINESS.telDisplay}（${BUSINESS.openingHoursWeekdayDisplay} / ${BUSINESS.openingHoursWeekendDisplay}）`}
              >
                {BUSINESS.telDisplay}
              </CtaButton>
            </div>
          </div>

          {/* Helpful links */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-8 md:p-12">
            <div className="mb-8">
              <SectionHeading
                title="お問い合わせの前に"
                lead="よくいただくご質問や回収対象は、以下のページでもご確認いただけます。"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {helpfulLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group block bg-white hover:bg-amber-50 border border-neutral-200 hover:border-amber-200 rounded-2xl p-5 transition"
                >
                  <p className="font-bold text-neutral-900 group-hover:text-brand-text transition">
                    {l.title}
                    <span className="ml-1 text-xs text-neutral-500 group-hover:text-brand-text">
                      →
                    </span>
                  </p>
                  <p className="mt-2 text-xs text-neutral-500 leading-relaxed">{l.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <RelatedPages currentPath="/contact" related={['/flow', '/faq', '/method', '/pricing']} />
    </>
  );
}
