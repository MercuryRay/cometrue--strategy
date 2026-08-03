import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { SITE_URL } from '../lib/business-info';
import { KANAGAWA_MUNICIPALITIES, YOKOHAMA_WARDS } from '../lib/area-served';

export const metadata: Metadata = {
  title: '横浜市のパソコン無料回収【全18区対応】',
  description:
    '横浜市18区すべて、神奈川県全域でパソコン無料回収に対応。最短翌日訪問・出張費0円・土日祝も対応（事前予約制）。県外からも宅配回収（着払い）で全国どこからでも依頼可能。',
  alternates: {
    canonical: `${SITE_URL}/area-yokohama`,
    languages: {
      'ja-JP': `${SITE_URL}/area-yokohama`,
      'x-default': `${SITE_URL}/area-yokohama`,
    },
  },
  openGraph: {
    title: '横浜市のパソコン無料回収【全18区対応】 | PC回収便',
    description:
      '横浜市18区すべて、神奈川県全域に対応。最短翌日訪問・出張費0円・土日祝も対応（事前予約制）。',
    url: `${SITE_URL}/area-yokohama`,
    siteName: 'PC回収便',
    type: 'website',
    locale: 'ja_JP',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

const features = [
  {
    title: '最短翌日訪問',
    body: '横浜市内なら、ご連絡から最短翌日でスタッフが訪問可能。お急ぎの場合は当日対応もご相談ください。',
  },
  {
    title: '土日祝も対応（事前予約制）',
    body: '平日お忙しい方のために、土日祝日も事前予約制で訪問対応。ご希望の日時をお早めにご相談ください。',
  },
  {
    title: '出張費0円',
    body: '横浜市・神奈川県全域どこでも出張費は無料です。山間部・県西部など遠方のエリアもご相談ください。',
  },
];

const yokohamaOfficialRoutes = [
  {
    title: 'メーカー回収（資源有効利用促進法）',
    body: 'PCリサイクルマーク付きのパソコンは、製造メーカーが無料で回収します。マークのない古いパソコン（2003年9月以前販売など）は再資源化料金がかかります。データの消去はご自身で行う必要があります。',
  },
  {
    title: '小型家電回収ボックス',
    body: '長さ30cm未満のパソコンは、区役所など市内の回収ボックスに無料で投入できます。市の案内では、パソコンなど個人情報が含まれる製品はデータを消去してから入れるよう求められています。',
  },
  {
    title: '国認定事業者の宅配回収',
    body: '横浜市が連携する小型家電リサイクル認定事業者の宅配便回収も利用できます。段ボールへの梱包が必要で、データ消去を任せる場合は有料オプションになるのが一般的です。',
  },
];

export default function AreaYokohamaPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: '神奈川県のパソコン処分ガイド', href: '/area-kanagawa' },
          { label: '横浜市の対応エリア' },
        ]}
      />

      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">
            Service Area
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            横浜市18区すべて、神奈川県全域、
            <br />
            パソコン無料回収に対応。
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            PC回収便は横浜市港北区を拠点に、横浜市内全域・神奈川県全域へ無料出張回収を行っています。県外からも宅配回収で全国対応可能です。
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-8">
            <SectionHeading title="横浜市内の対応エリア" />
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8">
            <p className="text-sm text-neutral-700 mb-5">
              下記すべての区で、出張回収を承っております。
            </p>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {YOKOHAMA_WARDS.map((ward) => (
                <div
                  key={ward}
                  className="bg-white text-center text-sm font-medium text-neutral-700 px-3 py-3 rounded-xl border border-amber-100"
                >
                  {ward}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-8">
            <SectionHeading
              eyebrow="YOKOHAMA CITY RULE"
              title="横浜市はパソコンを粗大ごみとして収集していません"
              lead="横浜市の案内では、家庭用パソコンは「市では収集できないもの」に分類されています。市の公式ルートは主に次の3つです。"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {yokohamaOfficialRoutes.map((r) => (
              <div key={r.title} className="bg-white border border-neutral-100 rounded-2xl p-7">
                <h3 className="font-bold text-neutral-900 text-xl">{r.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-600 leading-relaxed">
            公式ルートの詳細は{' '}
            <a
              href="https://www.city.yokohama.lg.jp/kurashi/sumai-kurashi/gomi-recycle/gomi/shushufuka/pc.html"
              target="_blank"
              rel="noopener"
              className="text-brand-text underline underline-offset-2 hover:no-underline"
            >
              横浜市公式サイト「パソコンの出し方」
            </a>
            をご確認ください。当社の出張回収なら、梱包不要・データ消去無料（
            <Link
              href="/data-erasure"
              className="text-brand-text underline underline-offset-2 hover:no-underline"
            >
              DoD 5220.22-M 方式
            </Link>
            ）で、年式やPCリサイクルマークの有無を問わず無料でお引き取りします。
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-8">
            <SectionHeading title="神奈川県内の対応エリア" />
          </div>
          <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6 md:p-8">
            <p className="text-sm text-neutral-700 mb-5">
              横浜市以外の神奈川県内も、出張費0円で対応します。
            </p>
            <div className="flex flex-wrap gap-2">
              {KANAGAWA_MUNICIPALITIES.map((city) => (
                <span
                  key={city}
                  className="text-xs font-medium text-neutral-700 bg-white border border-neutral-200 px-4 py-2 rounded-full"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <Link
              href="/area-kawasaki"
              className="group block bg-neutral-50 hover:bg-amber-50 border border-neutral-100 hover:border-amber-200 rounded-2xl p-6 transition"
            >
              <p className="font-bold text-neutral-900 group-hover:text-brand-text transition">
                川崎市のパソコン処分・無料回収
                <span className="ml-1 text-xs text-neutral-400 group-hover:text-brand-text">→</span>
              </p>
              <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
                川崎市の公式ルールと全7区対応の無料出張回収を解説
              </p>
            </Link>
            <Link
              href="/area-kanagawa"
              className="group block bg-neutral-50 hover:bg-amber-50 border border-neutral-100 hover:border-amber-200 rounded-2xl p-6 transition"
            >
              <p className="font-bold text-neutral-900 group-hover:text-brand-text transition">
                神奈川県のパソコン処分ガイド
                <span className="ml-1 text-xs text-neutral-400 group-hover:text-brand-text">→</span>
              </p>
              <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
                県内全市町村の捨て方早見表と民間無料回収との違い
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading eyebrow="WHY LOCAL" title="地元密着だから、できること" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-neutral-100 rounded-2xl p-7">
                <h3 className="font-bold text-neutral-900 text-xl">{f.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            県外の方も、宅配回収で対応します
          </h2>
          <p className="mt-4 text-neutral-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            北海道から沖縄まで、全国どこからでも着払い宅配で受け付けます。
            送料も含めて完全無料です。
          </p>
        </div>
      </section>

      <RelatedPages
        currentPath="/area-yokohama"
        related={['/area-kawasaki', '/area-kanagawa', '/service', '/method', '/flow', '/contact']}
      />
      <CtaSection />
    </>
  );
}
