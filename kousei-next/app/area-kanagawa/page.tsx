import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { SITE_URL } from '../lib/business-info';
import { KANAGAWA_MUNICIPALITIES } from '../lib/area-served';

export const metadata: Metadata = {
  title: '神奈川県のパソコン処分・回収ガイド【全市町村対応】',
  description:
    'ノートパソコン・デスクトップPCの正しい捨て方を神奈川県向けに解説。粗大ごみに出せない理由（資源有効利用促進法）、PCリサイクルマークの確認方法、市町村別の処分方法早見表、データ消去無料の出張回収（最短翌日）まで。',
  alternates: {
    canonical: `${SITE_URL}/area-kanagawa`,
    languages: {
      'ja-JP': `${SITE_URL}/area-kanagawa`,
      'x-default': `${SITE_URL}/area-kanagawa`,
    },
  },
  openGraph: {
    title: '神奈川県のパソコン処分・回収ガイド【全市町村対応】 | PC回収便',
    description:
      'ノートパソコンの捨て方から市町村別ルールの早見表、データ消去無料の出張回収まで。神奈川県全市町村対応。',
    url: `${SITE_URL}/area-kanagawa`,
    siteName: 'PC回収便',
    type: 'website',
    locale: 'ja_JP',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

const basicRules = [
  {
    no: '01',
    title: '粗大ごみ・燃えないごみには出せない',
    body: '資源有効利用促進法に基づき、家庭用パソコン（ノート・デスクトップ・モニター）はメーカーによる回収・リサイクルが基本ルートです。神奈川県内の市町村でも、粗大ごみや燃えないごみとしては原則出せません。',
  },
  {
    no: '02',
    title: 'PCリサイクルマークを確認する',
    body: '2003年10月以降に販売された家庭向けパソコンには「PCリサイクルマーク」が貼られており、メーカー回収が無料です。マークのない古いパソコンは、メーカー回収では再資源化料金がかかります。',
  },
  {
    no: '03',
    title: 'メーカー不明・自作PCは窓口が別',
    body: '回収するメーカーがない自作パソコンや倒産メーカーの製品は、一般社団法人パソコン3R推進協会が有料で受け付けています。',
  },
  {
    no: '04',
    title: '認定事業者・民間の無料回収も選べる',
    body: '小型家電リサイクル法の認定事業者による宅配回収や、当社のような民間の無料回収も利用できます。梱包の手間やデータ消去の扱いが選ぶ際のポイントです。',
  },
];

const municipalityRows = [
  {
    name: '横浜市',
    collection: '市では収集しない（「市では収集できないもの」に分類）',
    route: 'メーカー回収 / 小型家電回収ボックス（長さ30cm未満） / 連携事業者の宅配回収',
    detailHref: '/area-yokohama',
    detailLabel: '横浜市の詳細ページ',
  },
  {
    name: '川崎市',
    collection: '市では収集しない（2003年10月1日から）',
    route: 'メーカー回収 / 市の協力事業者の宅配回収',
    detailHref: '/area-kawasaki',
    detailLabel: '川崎市の詳細ページ',
  },
  {
    name: '相模原市・藤沢市・横須賀市・平塚市・厚木市 ほか県内全域',
    collection: '原則、自治体の通常収集では出せない（全国共通の法律ルール）',
    route: 'メーカー回収が基本。細かな運用は各市町村の公式サイト「ごみの出し方」をご確認ください',
    detailHref: null,
    detailLabel: null,
  },
];

const differences = [
  {
    title: '自治体・公式ルート',
    points: [
      'メーカー回収はPCリサイクルマークがあれば無料、なければ有料',
      '梱包・発送やボックスへの持ち込みなど、手間は自分持ち',
      'データ消去は自己責任（横浜市もデータを消去してから出すよう案内）または有料オプション',
    ],
    tone: 'bg-white border-neutral-200',
  },
  {
    title: '当社の無料出張回収',
    points: [
      'マークの有無・メーカー・年式を問わず回収費0円',
      '梱包不要。最短翌日にスタッフが訪問して運び出し',
      'DoD 5220.22-M 方式のデータ消去と消去証明書の発行が無料',
    ],
    tone: 'bg-amber-50 border-amber-200',
  },
];

const kanagawaFaq = [
  {
    q: 'ノートパソコンは何ごみに出せばいいですか？',
    a: '神奈川県内の市町村では、ノートパソコンを燃えないごみ・粗大ごみとして出すことは原則できません。資源有効利用促進法によりメーカー回収が基本ルートです。ほかに小型家電リサイクル認定事業者の宅配回収や、当社のような民間の無料出張回収も利用できます。',
  },
  {
    q: 'PCリサイクルマークがない古いパソコンはどうすればいいですか？',
    a: '2003年9月以前に販売されたパソコンなどマークのないものは、メーカー回収では再資源化料金がかかります。当社の回収なら、マークの有無・メーカー・年式を問わず無料でお引き取りします。',
  },
  {
    q: 'データが入ったまま処分しても大丈夫ですか？',
    a: '自治体系のルートでは、データの消去は基本的にご自身で行う必要があります。消去しないまま手放すと情報漏洩のリスクがあるためおすすめできません。当社では DoD 5220.22-M 方式のデータ消去と消去証明書の発行を無料で行っています。',
  },
  {
    q: '神奈川県内で出張回収に来てもらえない地域はありますか？',
    a: '横浜市18区・川崎市7区を含む県内全市町村に出張します。出張費はどこでも無料です。山間部・県西部など遠方の地域も、まずはご相談ください。',
  },
  {
    q: '引越しが近く、急いで処分したいのですが。',
    a: '最短翌日にお伺いします。お急ぎの場合は当日対応もご相談ください。土日祝の訪問も可能です（事前予約制）。宅配回収（着払い・無料）や持込回収（要事前予約）も選べます。',
  },
];

export default function AreaKanagawaPage() {
  return (
    <>
      <Breadcrumb items={[{ label: '神奈川県のパソコン処分ガイド' }]} />

      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">
            Kanagawa Guide
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            神奈川県のパソコン処分・
            <br />
            捨て方ガイド。
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            ノートパソコンもデスクトップも、神奈川県内では粗大ごみとして出せないのが原則です。法律の基本ルールと市町村別の違い、そしてデータ消去まで無料の出張回収（県内全市町村対応）をまとめました。
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-10">
            <SectionHeading
              eyebrow="BASIC RULES"
              title="神奈川県でのパソコンの正しい捨て方"
              lead="パソコンの処分ルールは全国共通の法律（資源有効利用促進法）で決まっています。まずは4つの基本を押さえましょう。"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {basicRules.map((r) => (
              <div key={r.no} className="bg-neutral-50 border border-neutral-100 rounded-2xl p-7">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-black text-brand-text shrink-0">{r.no}</span>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-xl">{r.title}</h3>
                    <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{r.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="BY MUNICIPALITY"
              title="市町村別の処分方法 早見表"
              lead="基本ルールは県内共通ですが、小型家電回収ボックスの有無など市町村ごとに運用が異なります。"
            />
          </div>
          <div
            className="border border-neutral-100 rounded-2xl bg-white overflow-x-auto"
            tabIndex={0}
            role="region"
            aria-label="神奈川県の市町村別パソコン処分方法 早見表"
          >
            <table className="w-full min-w-[640px] text-sm">
              <thead className="bg-neutral-50 text-xs text-neutral-500 uppercase tracking-widest">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">市町村</th>
                  <th className="px-4 py-3 text-left font-medium">自治体でのパソコン収集</th>
                  <th className="px-4 py-3 text-left font-medium">主な公式ルート</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {municipalityRows.map((row) => (
                  <tr key={row.name}>
                    <td className="px-4 py-4 font-bold text-neutral-900">{row.name}</td>
                    <td className="px-4 py-4 text-neutral-700">{row.collection}</td>
                    <td className="px-4 py-4 text-neutral-700">
                      {row.route}
                      {row.detailHref && row.detailLabel && (
                        <>
                          {' '}
                          <Link
                            href={row.detailHref}
                            className="text-brand-text underline underline-offset-2 hover:no-underline whitespace-nowrap"
                          >
                            {row.detailLabel} →
                          </Link>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-500 leading-relaxed">
            ※
            どの市町村にお住まいでも、メーカー回収と当社の無料出張回収は利用できます。自治体の回収ボックス等の詳細は各市町村公式サイトをご確認ください。
          </p>
          <div className="mt-8 bg-white border border-neutral-100 rounded-2xl p-6 md:p-8">
            <p className="text-sm text-neutral-700 mb-5 font-bold">
              当社の出張回収は、横浜市18区を含む神奈川県内の全市町村に対応しています。
            </p>
            <div className="flex flex-wrap gap-2">
              {['横浜市', ...KANAGAWA_MUNICIPALITIES].map((city) => (
                <span
                  key={city}
                  className="text-xs font-medium text-neutral-700 bg-neutral-100 px-4 py-2 rounded-full"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-10">
            <SectionHeading
              eyebrow="WHICH TO CHOOSE"
              title="自治体ルートと民間無料回収の違い"
              lead="最大の違いは「データ消去を誰がやるか」。費用と手間もあわせて比較してください。"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {differences.map((d) => (
              <div key={d.title} className={`${d.tone} border rounded-2xl p-7`}>
                <h3 className="font-bold text-neutral-900 text-xl">{d.title}</h3>
                <ul className="mt-4 space-y-3">
                  {d.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-neutral-700 leading-relaxed">
                      <span className="text-brand-text font-black shrink-0">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-600 leading-relaxed">
            なお、川崎市などは「無料」をうたって回収後に高額請求する不用品回収業者への注意を呼びかけています（
            <a
              href="https://www.city.kawasaki.jp/kurashi/category/261-5-0-0-0-0-0-0-0-0.html"
              target="_blank"
              rel="noopener"
              className="text-brand-text underline underline-offset-2 hover:no-underline"
            >
              川崎市の注意喚起ページ
            </a>
            ）。民間回収を選ぶ際は、料金体系とデータ消去の扱いを事前に確認しましょう。当社が無料で回収できる理由は{' '}
            <Link
              href="/why-free"
              className="text-brand-text underline underline-offset-2 hover:no-underline"
            >
              「なぜ無料？」のページ
            </Link>
            で公開しています。
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-8">
            <SectionHeading
              eyebrow="OUR SERVICE"
              title="当社の無料出張回収（最短翌日）"
              lead="回収費・出張費・データ消去・証明書発行まですべて0円。梱包不要で、スタッフが運び出します。"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-neutral-100 rounded-2xl p-7">
              <h3 className="font-bold text-neutral-900 text-xl">最短翌日訪問</h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                ご連絡から最短翌日にお伺いします。土日祝も対応可能です（事前予約制）。LINEは24時間受付。
              </p>
            </div>
            <div className="bg-white border border-neutral-100 rounded-2xl p-7">
              <h3 className="font-bold text-neutral-900 text-xl">壊れていてもOK</h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                電源が入らない・画面が割れているパソコンも無料で回収。メーカー・年式・PCリサイクルマークの有無は問いません。
              </p>
            </div>
            <div className="bg-white border border-neutral-100 rounded-2xl p-7">
              <h3 className="font-bold text-neutral-900 text-xl">データ消去無料</h3>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                DoD 5220.22-M
                方式の上書き消去または物理破壊で確実に処理し、消去証明書も無料で発行します。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-8">
            <SectionHeading
              eyebrow="CITY GUIDES"
              title="市別の詳しい処分ガイド"
              lead="横浜市・川崎市にお住まいの方は、市の公式ルールと対応エリアをまとめた詳細ページをご覧ください。"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/area-yokohama"
              className="group block bg-neutral-50 hover:bg-amber-50 border border-neutral-100 hover:border-amber-200 rounded-2xl p-6 transition"
            >
              <p className="font-bold text-neutral-900 group-hover:text-brand-text transition">
                横浜市のパソコン無料回収【全18区対応】
                <span className="ml-1 text-xs text-neutral-400 group-hover:text-brand-text">→</span>
              </p>
              <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
                横浜市の公式ルール（回収ボックス・連携宅配回収）と18区すべての対応エリア
              </p>
            </Link>
            <Link
              href="/area-kawasaki"
              className="group block bg-neutral-50 hover:bg-amber-50 border border-neutral-100 hover:border-amber-200 rounded-2xl p-6 transition"
            >
              <p className="font-bold text-neutral-900 group-hover:text-brand-text transition">
                川崎市のパソコン処分・無料回収【全7区対応】
                <span className="ml-1 text-xs text-neutral-400 group-hover:text-brand-text">→</span>
              </p>
              <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
                川崎市の公式ルールと処分方法の比較表、全7区への無料出張回収
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading eyebrow="FAQ" title="神奈川県のパソコン処分でよくある質問" />
          </div>
          <div className="space-y-6">
            {kanagawaFaq.map((f) => (
              <div key={f.q} className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8">
                <p className="font-bold text-neutral-900">Q. {f.q}</p>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">A. {f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedPages
        currentPath="/area-kanagawa"
        related={[
          '/area-yokohama',
          '/area-kawasaki',
          '/method',
          '/data-erasure',
          '/why-free',
          '/contact',
        ]}
      />
      <CtaSection />
    </>
  );
}
