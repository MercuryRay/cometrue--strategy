import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import CtaButton from '../components/CtaButton';
import CtaSection from '../components/CtaSection';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { BUSINESS, SITE_URL } from '../lib/business-info';

export const metadata: Metadata = {
  title: 'HDD・SSD物理破壊サービス【横浜】持ち込み・出張対応',
  description:
    '横浜・神奈川全域でHDD・SSDの物理破壊に対応。専用クラッシャーでプラッタ/メモリチップを変形・粉砕し、破壊証明書を無料発行。お客様立会いでの破壊、出張・宅配・持込の3方法に対応。パソコン本体の回収とあわせてのご依頼で費用0円。',
  alternates: {
    canonical: `${SITE_URL}/hdd-destruction`,
    languages: {
      'ja-JP': `${SITE_URL}/hdd-destruction`,
      'x-default': `${SITE_URL}/hdd-destruction`,
    },
  },
  openGraph: {
    title: 'HDD・SSD物理破壊サービス【横浜】持ち込み・出張対応',
    description:
      '専用クラッシャーでプラッタ/メモリチップを変形・粉砕。破壊証明書無料・立会い破壊可・出張/宅配/持込対応。パソコン本体の回収とあわせてのご依頼で0円。',
    url: `${SITE_URL}/hdd-destruction`,
    type: 'website',
    locale: 'ja_JP',
    siteName: 'PC回収便',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

const comparison = [
  {
    item: '消去の仕組み',
    physical: 'プラッタ/メモリチップを変形・粉砕し、読み出し自体を不可能にする',
    software: '記録領域全体を複数回上書きしてデータを塗りつぶす',
  },
  {
    item: '故障したドライブ',
    physical: '対応可（通電不要）',
    software: '不可（正常に動作するドライブのみ）',
  },
  {
    item: 'SSD/NVMe',
    physical: '推奨（確実）',
    software: 'ウェアレベリングにより消し残り領域が残る可能性',
  },
  {
    item: 'ドライブの再利用',
    physical: '不可（破壊されるため）',
    software: '可（消去後も使用できる）',
  },
  {
    item: '証跡',
    physical: '破壊証明書＋破壊済み写真の提供可能',
    software: '消去証明書（シリアル番号・実施日・担当者名入り）',
  },
];

const flowSteps = [
  'お問い合わせ（LINE・電話）で破壊方式と日時を調整',
  '訪問（または持込・宅配着荷）でドライブの状態を確認',
  'お客様の目の前で専用クラッシャーによる破壊作業を実施',
  '破壊済みの状態をその場でご確認いただく（写真提供も可能）',
  '破壊証明書の発行・郵送',
];

const methods = [
  {
    title: '出張破壊',
    body: '横浜市・神奈川県全域へスタッフが訪問し、その場で破壊作業を実施。お客様の目の前で確認しながら進められるので、機密性の高いデータでも安心です。',
    note: '出張費0円',
  },
  {
    title: '持込',
    body: `${BUSINESS.addressLocality}${BUSINESS.streetAddress}の事務所へのお持込にも対応しています（要事前予約）。お持込の際は、事前にLINEまたはお電話で日時をご予約ください。`,
    note: '要事前予約',
  },
  {
    title: '宅配（着払い）',
    body: '遠方の方は着払い宅配でお送りいただけます。到着後に破壊作業を行い、ご希望の方には破壊済み写真と証明書をお送りします。',
    note: '送料も無料',
  },
];

const ssdReasons = [
  {
    title: 'ウェアレベリングの落とし穴',
    body: 'SSD/NVMeは書き込み回数を平準化する「ウェアレベリング」という仕組みで動いており、OSから見えない領域にデータの断片が残ることがあります。上書き消去ソフトではこの領域に手が届かない可能性があります。',
  },
  {
    title: '物理破壊なら確実',
    body: 'メモリチップそのものを変形・粉砕してしまえば、見えない領域も含めて読み出し自体が不可能になります。だからPC回収便では、SSD/NVMeには上書き消去と物理破壊の併用をおすすめしています。',
  },
  {
    title: '故障ドライブもそのまま対応',
    body: '認識しない・異音がするなど故障したドライブは、ソフト消去がそもそも実行できません。物理破壊なら通電できないドライブでも確実にデータを抹消できます。',
  },
];

const corporateFeatures = [
  'NDA（機密保持契約）の締結',
  'シリアル番号別の破壊・消去証明書一括発行',
  'ISO27001（ISMS）/Pマーク監査資料としてそのまま提出可能',
  '破壊済み写真の提供可能',
  'サーバー・NASのドライブもご相談可能',
];

const faqs = [
  {
    q: '破壊作業に立ち会えますか？',
    a: 'はい。出張時はお客様の目の前で破壊作業を実施し、破壊済みの状態をその場でご確認いただけます。持込の場合もご希望があればお申し付けください。',
  },
  {
    q: 'HDDだけを破壊してもらうことはできますか？',
    a: 'パソコン本体の回収とあわせてのご依頼をおすすめしています。取り外し済みのストレージのみの破壊はご相談ください。',
  },
  {
    q: '破壊したことの証明はもらえますか？',
    a: 'はい。破壊証明書を無料で発行します。シリアル番号・実施日・担当者名を記載した正式書類で、破壊済み写真の提供も可能です。',
  },
  {
    q: '外付けHDDやUSBメモリも破壊できますか？',
    a: 'はい、外付けHDD・SSD・USBメモリなどの記録メディアも対応します。数量が多い場合は事前にLINEまたはお電話でご相談ください。',
  },
  {
    q: '破壊後のHDDはどうなりますか？',
    a: '破壊後のドライブは当社が責任をもって引き取り、資源として適正処理します。破壊済みドライブの返却をご希望の場合はご相談ください。',
  },
];

export default function HddDestructionPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'HDD・SSD物理破壊' }]} />

      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">
            HDD / SSD Destruction
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            HDD・SSD物理破壊。
            <br />
            目の前で壊して、証明書まで無料。
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            専用クラッシャーでプラッタ/メモリチップを変形・粉砕し、データの読み出し自体を不可能にします。横浜・神奈川全域へ出張対応、お客様立会いでの破壊も可能。破壊証明書は無料発行です。
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CtaButton href={BUSINESS.lineUrl} variant="line" external ariaLabel="LINEで無料相談">
              LINEで無料相談
            </CtaButton>
            <CtaButton
              href={BUSINESS.telLink}
              variant="tel"
              ariaLabel={`電話する ${BUSINESS.telDisplay}`}
            >
              {BUSINESS.telDisplay}
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="COMPARISON"
              title="物理破壊とソフト消去の違い・使い分け"
              lead="どちらも無料で対応しています。ドライブの状態と用途に合わせて、最適な方式をご提案します。"
            />
          </div>
          <div className="border border-neutral-100 rounded-2xl overflow-hidden bg-white">
            <div
              className="overflow-x-auto"
              tabIndex={0}
              role="region"
              aria-label="物理破壊とソフト消去の比較表"
            >
              <table className="w-full text-sm min-w-[640px]">
                <thead className="bg-neutral-50 text-xs text-neutral-500 uppercase tracking-widest">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium">項目</th>
                    <th className="px-4 py-3 text-left font-medium">物理破壊</th>
                    <th className="px-4 py-3 text-left font-medium">ソフト消去（上書き）</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {comparison.map((row) => (
                    <tr key={row.item}>
                      <td className="px-4 py-4 font-bold text-neutral-900 whitespace-nowrap">
                        {row.item}
                      </td>
                      <td className="px-4 py-4 text-neutral-700 leading-relaxed">{row.physical}</td>
                      <td className="px-4 py-4 text-neutral-700 leading-relaxed">{row.software}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="mt-6 text-sm text-neutral-600 leading-relaxed">
            迷ったら「動くHDDはソフト消去、故障ドライブとSSD/NVMeは物理破壊」が目安です。ソフト消去の詳細は
            <Link
              href="/data-erasure"
              className="text-brand-text font-bold underline underline-offset-2"
            >
              データ消去サービス
            </Link>
            をご覧ください。
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="FLOW"
              title="立会い破壊の流れ"
              lead="「本当に壊したのか」を確認できるのが立会い破壊のいちばんの価値。ご依頼から証明書発行まで5ステップです。"
            />
          </div>
          <ol className="space-y-5">
            {flowSteps.map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-4 border-l-4 border-brand pl-5 py-2 bg-white rounded-r-2xl"
              >
                <span className="text-2xl font-black text-brand-text shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-neutral-700 leading-relaxed pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="HOW TO USE"
              title="持ち込み・出張の利用方法"
              lead="出張・持込・宅配の3つの方法からお選びいただけます。対応エリアは横浜市・神奈川県全域、出張費は0円です。"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {methods.map((m) => (
              <div
                key={m.title}
                className="bg-neutral-50 border border-neutral-100 rounded-2xl p-7"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-neutral-900">{m.title}</h3>
                  <span className="bg-amber-100 text-brand-text text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {m.note}
                  </span>
                </div>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-600 leading-relaxed">
            電話受付は{BUSINESS.openingHoursWeekdayDisplay}（{BUSINESS.openingHoursWeekendDisplay}
            ）。LINEは24時間受付です。
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="CERTIFICATE"
              title="破壊証明書の無料発行"
              lead="「壊した証拠」を書面で残せます。個人の方の安心にも、法人の監査対応にも。"
            />
          </div>
          <div className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-10">
            <p className="text-neutral-700 text-sm md:text-base leading-relaxed">
              ご希望の方には、シリアル番号・実施日・担当者名を記載した証明書を無料で発行します。破壊済み写真の提供も可能で、ISO27001（ISMS）/Pマーク監査の証跡資料としてもご活用いただけます。PDF納品・原本郵送のどちらにも対応します。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="WHY PHYSICAL"
              title="SSD/NVMeこそ物理破壊を推奨する理由"
              lead="「上書き消去すれば安心」はHDD時代の常識。SSDには、ソフト消去だけでは届かない領域があります。"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {ssdReasons.map((r) => (
              <div
                key={r.title}
                className="bg-neutral-50 border border-neutral-100 rounded-2xl p-7"
              >
                <h3 className="text-xl font-bold text-neutral-900">{r.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 text-white">
        <div className="max-w-[980px] mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <SectionHeading title="法人向け大量破壊" />
            <p className="mt-4 text-neutral-400 leading-relaxed max-w-2xl">
              PC入れ替え・サーバー更改・オフィス移転にともなう大量のドライブ破壊も、情報管理体制ごとご相談ください。
            </p>
          </div>
          <ul className="grid sm:grid-cols-2 gap-4">
            {corporateFeatures.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 bg-neutral-800 rounded-2xl p-5 text-sm text-neutral-200 leading-relaxed"
              >
                <span className="text-brand font-black shrink-0" aria-hidden="true">
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <CtaButton href="/corporate" variant="brand">
              法人向けサービスの詳細
            </CtaButton>
            <CtaButton href="/office-relocation" variant="ghost-dark">
              オフィス移転のPC処分
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="PRICE"
              title="料金は0円"
              lead="パソコン本体の回収とあわせてご依頼いただく場合、物理破壊・破壊証明書の発行まですべて無料です。"
            />
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-10">
            <div className="flex flex-wrap items-baseline gap-3">
              <p className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900">0円</p>
              <p className="text-sm text-neutral-600">出張費・破壊作業費・証明書発行費すべて込み</p>
            </div>
            <p className="mt-5 text-sm md:text-base text-neutral-700 leading-relaxed">
              物理破壊はパソコン本体の回収とあわせてご依頼ください。取り外し済みのストレージのみの破壊をご希望の場合は、LINEまたはお電話でご相談ください。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <SectionHeading eyebrow="FAQ" title="物理破壊のよくある質問" />
          </div>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8">
                <p className="font-bold text-neutral-900">Q. {f.q}</p>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">A. {f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedPages
        currentPath="/hdd-destruction"
        related={[
          '/data-erasure',
          '/windows10-shobun',
          '/corporate',
          '/method',
          '/pricing',
          '/faq',
        ]}
      />
      <CtaSection />
    </>
  );
}
