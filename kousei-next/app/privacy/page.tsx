import type { Metadata } from 'next';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';
import RelatedPages from '../components/RelatedPages';
import { BUSINESS, SITE_URL } from '../lib/business-info';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description:
    'PC回収便（株式会社煌盛商事）のプライバシーポリシー。お問い合わせ時にお預かりする個人情報と、回収した機器・記憶媒体内に残存するデータの取扱いについて説明します。',
  alternates: {
    canonical: `${SITE_URL}/privacy`,
    languages: { 'ja-JP': `${SITE_URL}/privacy`, 'x-default': `${SITE_URL}/privacy` },
  },
  openGraph: {
    title: 'プライバシーポリシー | PC回収便',
    description:
      'お問い合わせ時にお預かりする個人情報と、回収した機器・記憶媒体内データの取扱いについて説明します。',
    url: `${SITE_URL}/privacy`,
    siteName: 'PC回収便',
    type: 'website',
    locale: 'ja_JP',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

const sections = [
  {
    title: '1. 事業者',
    body: [
      `本ポリシーは、${BUSINESS.legalName}（屋号: ${BUSINESS.brandName}、所在地: ${BUSINESS.addressRegion}${BUSINESS.addressLocality}${BUSINESS.streetAddress}）が運営する当サイトおよびパソコン無料回収サービスにおける、個人情報とお客様データの取扱いを定めるものです。`,
    ],
  },
  {
    title: '2. 取得する情報',
    body: [
      '当社は、サービスの提供にあたり次の情報を取得します。',
      '・LINE またはお電話でのお問い合わせの際にお伺いする、氏名・ご連絡先・ご相談内容（回収をご希望の機器の種類や台数、回収方法のご希望など）',
      '・回収をお引き受けしたパソコン・周辺機器・記憶媒体の内部に残存しているデータ',
    ],
  },
  {
    title: '3. 利用目的',
    body: [
      'お問い合わせの際に取得した個人情報は、回収サービスの提供（回収方法・日時の調整、回収の実施）およびそれに伴うご連絡のためにのみ利用し、それ以外の目的では利用しません。',
    ],
  },
  {
    title: '4. 回収した機器内データの取扱い',
    body: [
      '回収した機器・記憶媒体に残存するデータは、DoD 5220.22-M 方式（米国国防総省方式）の上書き消去に対応した専用ソフトウェア、または物理破壊により、復元が困難な状態に処理します（SSD等は必要に応じて物理破壊を併用します）。',
      '当社が消去作業の過程でデータの内容を閲覧・利用することはなく、第三者に提供することもありません。',
    ],
  },
  {
    title: '5. 第三者提供',
    body: ['当社は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供しません。'],
  },
  {
    title: '6. アクセス解析・Cookie',
    body: [
      '当サイトでは、サイトの利用状況と表示速度の把握のために Vercel Analytics および Vercel Speed Insights を使用しています。これらは Cookie を使用せず、個人を特定できない匿名化された統計情報のみを収集します。',
      '当サイトでは、第三者配信の広告サービスおよびアフィリエイトプログラムは利用していません。',
    ],
  },
  {
    title: '7. 開示・訂正・削除のご請求',
    body: [
      'ご本人から個人情報の開示・訂正・削除のお申し出があった場合は、ご本人であることを確認のうえ、速やかに対応します。',
    ],
  },
  {
    title: '8. 本ポリシーの変更',
    body: [
      '本ポリシーは、法令の改正やサービス内容の変更に応じて改定することがあります。変更後のポリシーは、当ページへの掲載をもって効力を生じます。',
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'プライバシーポリシー' }]} />

      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-12 md:pt-16 md:pb-16">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">
            Privacy Policy
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">プライバシーポリシー</h1>
          <p className="mt-6 text-neutral-600 text-lg max-w-2xl leading-relaxed">
            {BUSINESS.legalName}（屋号: {BUSINESS.brandName}
            ）は、お客様からお預かりする個人情報と、回収した機器内に残るデータを、以下の方針に基づいて取り扱います。
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 pb-16 md:pb-20 space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl md:text-2xl font-black tracking-tight">{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 text-neutral-600 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          ))}

          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">9. お問い合わせ窓口</h2>
            <p className="mt-3 text-neutral-600 leading-relaxed">
              本ポリシーに関するお問い合わせは、LINE またはお電話にてお願いいたします。
            </p>
            <ul className="mt-3 space-y-2 text-neutral-600 leading-relaxed">
              <li>
                ・LINE:{' '}
                <a
                  href={BUSINESS.lineUrl}
                  target="_blank"
                  rel="noopener"
                  className="font-semibold text-neutral-900 underline underline-offset-2 hover:text-brand-text transition"
                >
                  PC回収便 公式LINE
                </a>
                （24時間受付・返信は営業時間内）
              </li>
              <li>
                ・電話:{' '}
                <a
                  href={BUSINESS.telLink}
                  className="font-semibold text-neutral-900 underline underline-offset-2 hover:text-brand-text transition"
                >
                  {BUSINESS.telDisplay}
                </a>
                （{BUSINESS.openingHoursWeekdayDisplay} / {BUSINESS.openingHoursWeekendDisplay}）
              </li>
            </ul>
          </div>

          <p className="text-sm text-neutral-500 pt-2 border-t border-neutral-100">
            改定日: 2026年6月12日
          </p>
        </div>
      </section>

      <RelatedPages currentPath="/privacy" related={['/', '/contact', '/data-erasure', '/faq']} />
      <CtaSection />
    </>
  );
}
