import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { SITE_URL } from '../lib/business-info';

export const metadata: Metadata = {
  title: '川崎市のパソコン処分・無料回収【全7区対応】',
  description:
    '川崎市はパソコンを粗大ごみ・普通ごみとして収集していません。メーカー回収・宅配回収・民間無料回収を費用/手間/データ消去で比較。川崎全7区へ最短翌日の無料出張回収、DoD方式のデータ消去も無料です。',
  alternates: {
    canonical: `${SITE_URL}/area-kawasaki`,
    languages: {
      'ja-JP': `${SITE_URL}/area-kawasaki`,
      'x-default': `${SITE_URL}/area-kawasaki`,
    },
  },
  openGraph: {
    title: '川崎市のパソコン処分・無料回収【全7区対応】 | PC回収便',
    description:
      '川崎市はパソコンを粗大ごみとして収集していません。公式ルートとの比較から、川崎全7区対応・最短翌日の無料出張回収までを解説。',
    url: `${SITE_URL}/area-kawasaki`,
    siteName: 'PC回収便',
    type: 'website',
    locale: 'ja_JP',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

const KAWASAKI_WARDS = ['川崎区', '幸区', '中原区', '高津区', '宮前区', '多摩区', '麻生区'];

const disposalOptions = [
  {
    method: 'メーカー回収',
    cost: 'PCリサイクルマーク付きは無料。マークなし（2003年9月以前販売など）は有料',
    effort: '申込のうえ梱包して発送',
    erase: 'ご自身で消去が必要',
  },
  {
    method: '市の協力事業者の宅配回収',
    cost: 'パソコンを含む1箱は回収無料',
    effort: '段ボールに梱包。最短翌日に宅配業者が回収',
    erase: 'データ消去は有料オプション',
  },
  {
    method: 'パソコン3R推進協会',
    cost: '有料（メーカー不明・自作PCなどが対象）',
    effort: '申込のうえ梱包して発送',
    erase: 'ご自身で消去が必要',
  },
  {
    method: 'PC回収便の出張回収',
    cost: '回収費・出張費・データ消去すべて0円',
    effort: '梱包不要。スタッフが運び出し',
    erase: '無料（DoD 5220.22-M 方式・証明書無料）',
  },
];

const kawasakiFaq = [
  {
    q: '川崎市でパソコンを粗大ごみに出せますか？',
    a: '出せません。資源有効利用促進法に基づく家庭用パソコンのリサイクル開始に伴い、川崎市は2003年10月1日から家庭用パソコンの収集を行っていません。メーカー回収・市の協力事業者の宅配回収、または当社のような民間の無料回収をご利用ください。',
  },
  {
    q: 'マウス・キーボードなどの周辺機器はどうすればいいですか？',
    a: '川崎市では、アダプタ・ケーブル・マウス・キーボードなどの周辺機器は、最長辺30cm未満なら小物金属、30cm以上なら粗大ごみとして出せます。当社の出張回収なら、パソコン本体とまとめて周辺機器も無料でお引き取りします。',
  },
  {
    q: '壊れて起動しないパソコンでも無料ですか？',
    a: 'はい。電源が入らない・画面が割れているなどの故障PCも無料で回収します。起動しないPCのストレージは物理破壊で確実に処理し、ご希望の方には消去証明書を無料発行します。',
  },
  {
    q: '川崎市内はどこまで来てもらえますか？',
    a: '川崎区・幸区・中原区・高津区・宮前区・多摩区・麻生区の全7区に出張します。出張費は無料で、最短翌日にお伺いします。',
  },
  {
    q: '平日は仕事で家にいません。土日でも大丈夫ですか？',
    a: '土日祝も対応しています（事前予約制）。LINEは24時間受付ですので、ご希望の日時をお気軽にお送りください。',
  },
];

export default function AreaKawasakiPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: '神奈川県のパソコン処分ガイド', href: '/area-kanagawa' },
          { label: '川崎市のパソコン処分' },
        ]}
      />

      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">
            Kawasaki City
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            川崎市のパソコン処分。
            <br />
            全7区へ無料出張回収します。
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            川崎市では、パソコンを粗大ごみや普通ごみとして出すことはできません。市の公式ルートと民間無料回収の違いを整理したうえで、川崎区から麻生区まで全7区対応の無料出張回収をご案内します。
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-8">
            <SectionHeading
              eyebrow="KAWASAKI CITY RULE"
              title="川崎市でパソコンは粗大ごみに出せません"
              lead="資源有効利用促進法に基づく家庭用パソコンのメーカーリサイクル開始に伴い、川崎市は2003年10月1日から家庭用パソコンの収集を行っていません。"
            />
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8">
            <ul className="space-y-3 text-sm text-neutral-700 leading-relaxed">
              <li className="flex gap-3">
                <span className="text-brand-text font-black shrink-0">✓</span>
                パソコン本体（ノート・デスクトップ）とモニターは、粗大ごみ・普通ごみのどちらでも収集されません。
              </li>
              <li className="flex gap-3">
                <span className="text-brand-text font-black shrink-0">✓</span>
                周辺機器（アダプタ・ケーブル・マウス・キーボードなど）は、最長辺30cm未満は小物金属、30cm以上は粗大ごみとして出せます。
              </li>
              <li className="flex gap-3">
                <span className="text-brand-text font-black shrink-0">✓</span>
                本体の処分は、メーカー回収・市の協力事業者の宅配回収・民間回収のいずれかを利用します。
              </li>
            </ul>
            <p className="mt-5 pt-5 border-t border-amber-200 text-sm text-neutral-600 leading-relaxed">
              市の公式な案内は{' '}
              <a
                href="https://www.city.kawasaki.jp/templates/faq/300/0000013329.html"
                target="_blank"
                rel="noopener"
                className="text-brand-text underline underline-offset-2 hover:no-underline"
              >
                川崎市公式サイト「パソコンの捨て方」
              </a>
              をご確認ください。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="COMPARISON"
              title="川崎市の処分方法を比較"
              lead="公式ルートはいずれも「梱包・発送の手間」か「データ消去の扱い」に注意が必要です。費用・手間・データ消去の3点で比較しました。"
            />
          </div>
          <div
            className="border border-neutral-100 rounded-2xl bg-white overflow-x-auto"
            tabIndex={0}
            role="region"
            aria-label="川崎市のパソコン処分方法の比較表"
          >
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-neutral-50 text-xs text-neutral-500 uppercase tracking-widest">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">処分方法</th>
                  <th className="px-4 py-3 text-left font-medium">費用</th>
                  <th className="px-4 py-3 text-left font-medium">手間</th>
                  <th className="px-4 py-3 text-left font-medium">データ消去</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {disposalOptions.map((row) => (
                  <tr key={row.method}>
                    <td className="px-4 py-4 font-bold text-neutral-900">{row.method}</td>
                    <td className="px-4 py-4 text-neutral-700">{row.cost}</td>
                    <td className="px-4 py-4 text-neutral-700">{row.effort}</td>
                    <td className="px-4 py-4 text-neutral-700">{row.erase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-500 leading-relaxed">
            ※
            公式ルートの料金・条件の最新情報は川崎市公式サイトおよび各事業者の案内をご確認ください。
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-8">
            <SectionHeading
              eyebrow="SERVICE AREA"
              title="川崎市全7区へ、無料出張回収"
              lead="出張費・回収費は0円。最短翌日にお伺いし、梱包不要でスタッフが運び出します。壊れたパソコンや古いパソコンもそのままお引き取りします。"
            />
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {KAWASAKI_WARDS.map((ward) => (
                <div
                  key={ward}
                  className="bg-white text-center text-sm font-medium text-neutral-700 px-3 py-3 rounded-xl border border-amber-100"
                >
                  {ward}
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-neutral-700 leading-relaxed">
              武蔵小杉・溝の口・登戸・新百合ヶ丘など川崎市内のどのエリアからも、出張費0円でお伺いします。重いデスクトップPCやモニター複数台も、スタッフが運び出すため搬出作業は不要です。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-8">
            <SectionHeading eyebrow="DATA ERASURE" title="データ消去も無料（DoD 5220.22-M 方式）" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-neutral-100 rounded-2xl p-7">
              <h3 className="font-bold text-neutral-900 text-xl">ソフトウェア消去 + 物理破壊</h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                DoD 5220.22-M
                方式（米国国防総省方式）の上書き消去に対応した専用ソフトウェアでデータを消去。起動しないPCや確実性を優先したい場合は、ストレージを専用クラッシャーで物理破壊します。ご希望があれば、その場で消去作業をご確認いただくことも可能です。
              </p>
            </div>
            <div className="bg-white border border-neutral-100 rounded-2xl p-7">
              <h3 className="font-bold text-neutral-900 text-xl">消去証明書を無料発行</h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                いずれの方式でも、ご希望の方には消去証明書を無料で発行します。市の公式ルートではデータ消去が自己責任または有料オプションになるのに対し、当社は消去から証明書発行まですべて無料です。
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-neutral-600">
            詳しくは{' '}
            <Link
              href="/data-erasure"
              className="text-brand-text underline underline-offset-2 hover:no-underline"
            >
              データ消去サービスのページ
            </Link>
            をご覧ください。
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-8">
            <SectionHeading
              eyebrow="FOR BUSINESS"
              title="川崎市内の法人様も一括対応"
              lead="オフィス移転・拠点閉鎖・入替に伴う複数台のパソコン処分も無料で承ります。機密保持契約（NDA）の締結や、ISMS/Pマーク監査資料としてご活用いただける消去証明書の発行にも対応します。"
            />
          </div>
          <p className="text-sm text-neutral-600">
            詳しくは{' '}
            <Link
              href="/corporate"
              className="text-brand-text underline underline-offset-2 hover:no-underline"
            >
              法人向け回収のページ
            </Link>
            をご覧ください。
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading eyebrow="FAQ" title="川崎市のパソコン処分でよくある質問" />
          </div>
          <div className="space-y-6">
            {kawasakiFaq.map((f) => (
              <div key={f.q} className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8">
                <p className="font-bold text-neutral-900">Q. {f.q}</p>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">A. {f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedPages
        currentPath="/area-kawasaki"
        related={[
          '/area-kanagawa',
          '/area-yokohama',
          '/data-erasure',
          '/items',
          '/flow',
          '/contact',
        ]}
      />
      <CtaSection />
    </>
  );
}
