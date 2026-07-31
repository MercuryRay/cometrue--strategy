import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import CtaButton from '../components/CtaButton';
import CtaSection from '../components/CtaSection';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { BUSINESS, SITE_URL } from '../lib/business-info';

export const metadata: Metadata = {
  title: 'オフィス移転・PC入れ替え時のIT機器一括処分【神奈川の法人様向け】',
  description:
    'オフィス移転・レイアウト変更・PC入れ替えで不要になったパソコン・サーバー・モニターを、横浜・神奈川全域で無料一括回収。移転スケジュールに合わせて訪問し、DoD方式のデータ消去・消去証明書発行まで0円。NDA締結・ISMS監査対応。',
  alternates: {
    canonical: `${SITE_URL}/office-relocation`,
    languages: {
      'ja-JP': `${SITE_URL}/office-relocation`,
      'x-default': `${SITE_URL}/office-relocation`,
    },
  },
  openGraph: {
    title: 'オフィス移転・PC入れ替え時のIT機器一括処分 | PC回収便【横浜・神奈川】',
    description:
      '移転で不要になったPC・サーバー・モニターを無料一括回収。移転スケジュールに合わせて訪問し、データ消去・証明書発行まで0円。',
    url: `${SITE_URL}/office-relocation`,
    siteName: 'PC回収便',
    type: 'website',
    locale: 'ja_JP',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

const reasons = [
  {
    no: '01',
    title: '会社のPCは「家庭ごみ」に出せない',
    body: '事業活動に伴って出るパソコンや周辺機器は事業系の廃棄物にあたり、家庭用の粗大ごみ収集や自治体の小型家電回収ボックスには出せません。移転で出た機器を社員が家庭ごみとして持ち帰って捨てる、といった処理は制度上できない点にご注意ください。',
  },
  {
    no: '02',
    title: '廃棄物として処理するなら排出事業者責任とマニフェスト',
    body: '廃棄物処理法では、産業廃棄物の処理を委託する場合、排出事業者（＝御社）に許可を持つ処理業者への委託と、マニフェスト（産業廃棄物管理票）による最終処分までの確認が義務付けられています。無許可の業者に引き渡した場合、委託した側も責任を問われる可能性があります。これは一般的な制度の話ですが、「とりあえず引き取ってくれる業者」に安易に渡すのが危険な理由です。',
  },
  {
    no: '03',
    title: 'データを消さずに手放すと情報漏洩リスク',
    body: '退役PCのストレージには人事・顧客・経理データが残っています。ファイル削除やフォーマットだけでは記録領域にデータが残り、復元される可能性があります。移転のドタバタで消去が漏れた1台が、後から重大事故につながりかねません。',
  },
];

const reasonsAnswer =
  'PC回収便は、リユース・再資源化を前提としてIT機器を無料でお引き取りし、DoD方式のデータ消去と消去証明書・回収証明書の発行まで一括対応します。NDA締結のうえ、移転スケジュールに合わせて訪問。「捨て方の判断」から「消去の証跡」まで、情シス・総務のご担当者様の負担を最小化します。';

const schedule = [
  {
    period: '移転1ヶ月前〜',
    title: '台数・機器のご相談',
    body: '不要になるPC・サーバー・モニターのおおよその台数をLINEまたはお電話でお知らせください。機器一覧がまだ固まっていない段階でも、写真を送っていただければ回収可否をすぐに判断します。',
  },
  {
    period: '2週間前〜',
    title: 'NDA締結・回収日の確定',
    body: '必要に応じてNDA（機密保持契約）を締結し、訪問日時を確定。搬出経路やエレベーター利用時間など、ビル側の条件もこの段階で共有いただけるとスムーズです。',
  },
  {
    period: '移転前後の指定日',
    title: '訪問・一括搬出',
    body: '移転作業や原状回復工事の日程に合わせて訪問し、スタッフが搬出まで実施します。横浜市内なら最短翌日、神奈川県内も2〜3日以内の訪問が可能。土日祝の回収は事前予約制で承ります。',
  },
  {
    period: '回収後',
    title: 'データ消去・証明書納品',
    body: 'データ消去を実施し、消去証明書・回収証明書をシリアル番号別に発行。PDF納品・原本郵送に対応し、資産除却や監査の記録としてご活用いただけます。',
  },
];

const items = [
  { name: 'デスクトップPC・ノートPC', desc: 'メーカー・年式問わず。壊れていてもOK' },
  { name: '液晶モニター', desc: '液晶ディスプレイ各種' },
  { name: 'サーバー', desc: 'ラック型・タワー型' },
  { name: 'UPS（無停電電源装置）', desc: 'サーバールームの撤去に伴う機器も' },
  { name: '複合機・プリンター', desc: 'インクジェット・レーザー各種' },
  { name: 'ルーター・モデム', desc: 'ネットワーク機器一式' },
  { name: '周辺機器', desc: 'キーボード・マウス・外付けHDD等' },
  { name: 'タブレット・スマートフォン', desc: '社用端末は初期化のうえ回収' },
];

const security = [
  {
    title: 'DoD方式の上書き消去',
    body: 'DoD 5220.22-M 方式（米国国防総省方式）の上書き消去に対応した専用ソフトウェアで記録領域を上書き。SSD/NVMeは特性上、物理破壊の併用をおすすめしています。',
  },
  {
    title: '物理破壊・破壊済み写真',
    body: '起動しないPCや確実性を最優先する案件では、専用クラッシャーでストレージを物理破壊。破壊済み写真の提供も可能です。',
  },
  {
    title: 'NDA（機密保持契約）締結',
    body: '事前にNDAを締結のうえ作業を開始。輸送経路・保管場所・処理工程の情報管理体制を契約書面で明示します。',
  },
  {
    title: '証明書のシリアル別一括発行',
    body: '消去証明書をシリアル番号別に一括発行・PDF納品。ISO27001（ISMS）/Pマーク監査の証跡資料としてそのまま提出できます。',
  },
];

const faqs = [
  {
    q: '何台から依頼できますか？',
    a: '数台からご依頼いただけます。500台以上の複数日対応が必要な大型案件は、事前にお見積もりのうえ回収計画をご提案します。',
  },
  {
    q: '移転当日や土日の回収はできますか？',
    a: '移転作業や原状回復工事の日程に合わせて訪問日時を調整します。横浜市内なら最短翌日の訪問が可能です。土日祝の回収は事前予約制ですので、お早めにご相談ください。',
  },
  {
    q: '資産管理台帳から除却するための書類は出ますか？',
    a: '回収証明書・消去証明書をシリアル番号別に発行します。PDF納品・原本郵送に対応しており、資産除却の記録やISO27001/Pマーク監査の証跡資料としてご活用いただけます。',
  },
  {
    q: '産業廃棄物のマニフェストは必要ですか？',
    a: '産業廃棄物として処理を委託する場合には、法令上マニフェストの交付が必要です。PC回収便の無料回収はリユース・再資源化を前提にお引き取りするもので、回収証明書・消去証明書を発行して記録を残せます。廃棄物としての処理が必要な品目が含まれそうな場合は、事前にご相談ください。',
  },
  {
    q: 'リース満了の機器が混ざっていても大丈夫ですか？',
    a: 'リース会社へ返却する前のデータ消去に対応しています。証明書は原本を郵送・控えPDFをメール納品しますので、返却時の消去エビデンスとしてご利用いただけます。',
  },
  {
    q: '消去作業に立ち会うことはできますか？',
    a: '出張回収時に、その場でデータ消去ソフトを起動し完了画面をご確認いただくことが可能です。確実性を最優先される場合は、物理破壊＋破壊済み写真の提供をおすすめします。',
  },
  {
    q: '本当に費用はかかりませんか？請求書払いは？',
    a: '回収費・出張費・データ消去費・証明書発行費はすべて0円です。500台超の大型案件など付帯作業で費用が発生する場合のみ、法人向けの請求書払い・月締めに対応します。',
  },
];

export default function OfficeRelocationPage() {
  return (
    <>
      <Breadcrumb
        items={[{ label: '法人向け回収', href: '/corporate' }, { label: 'オフィス移転のPC処分' }]}
      />

      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">
            Office Relocation
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            オフィス移転で出る不要PC、
            <br />
            移転日程に合わせて無料で一括回収。
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            移転・レイアウト変更・PC入れ替えで不要になったIT機器を、横浜・神奈川全域で無料回収。移転スケジュールに合わせて訪問し、データ消去と証明書発行まで0円で完結します。NDA締結・ISMS監査対応。
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <CtaButton
              href={BUSINESS.lineUrl}
              variant="line"
              external
              ariaLabel="LINEで移転スケジュールを相談する"
            >
              移転スケジュールを相談する
            </CtaButton>
            <CtaButton
              href={BUSINESS.telLink}
              variant="ghost-light"
              ariaLabel={`電話する ${BUSINESS.telDisplay}`}
            >
              {BUSINESS.telDisplay}
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="Why It Matters"
              title="移転で出るIT機器を「そのまま廃棄」してはいけない理由"
              lead="オフィス移転は、社内のPC・サーバーが一斉に退役する数少ないタイミング。だからこそ、処分方法を誤ると法令面・セキュリティ面のリスクが一度に表面化します。"
            />
          </div>
          <div className="space-y-6">
            {reasons.map((r) => (
              <div key={r.no} className="bg-neutral-50 border border-neutral-100 rounded-2xl p-8">
                <div className="flex items-start gap-6">
                  <span className="text-3xl font-black text-brand-text shrink-0">{r.no}</span>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">{r.title}</h3>
                    <p className="mt-3 text-neutral-600 text-sm md:text-base leading-relaxed">
                      {r.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-8">
            <p className="font-bold text-neutral-900">PC回収便なら</p>
            <p className="mt-3 text-neutral-700 text-sm md:text-base leading-relaxed">
              {reasonsAnswer}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="Schedule"
              title="移転スケジュールに合わせた回収計画"
              lead="移転プロジェクトの他のタスクと同じように、IT機器の処分も逆算で計画できます。標準的な進め方の目安です。"
            />
          </div>
          <ol className="space-y-5">
            {schedule.map((s) => (
              <li
                key={s.title}
                className="flex items-start gap-4 border-l-4 border-brand pl-5 py-2"
              >
                <div>
                  <p className="text-brand-text font-bold text-sm tracking-wide">{s.period}</p>
                  <h3 className="mt-1 font-bold text-neutral-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="Items"
              title="オフィス移転で回収できる品目"
              lead="オフィスから出るIT機器を幅広く無料回収します。壊れていても、古くても大丈夫です。"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item.name}
                className="bg-neutral-50 border border-neutral-100 rounded-xl p-5 hover:border-brand hover:bg-amber-50 transition"
              >
                <h3 className="font-bold text-neutral-900 text-sm">{item.name}</h3>
                <p className="mt-1 text-xs text-neutral-500">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-500 leading-relaxed">
            ※ ブラウン管モニター（CRT）や机・椅子などの什器・家具はお引き取りできません（
            <Link href="/not-accepted" className="text-brand-text hover:underline">
              回収できないもの一覧
            </Link>
            ）。1mを超える業務用サーバーラックなどの大型機器は、個別にご相談ください。
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="Security"
              title="データ消去とセキュリティ"
              lead="移転時の大量処分こそ、消去の抜け漏れが起きやすいタイミング。全台に消去の証跡を残します。"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {security.map((s) => (
              <div key={s.title} className="bg-white border border-neutral-100 rounded-2xl p-7">
                <h3 className="font-bold text-neutral-900">{s.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
            <Link
              href="/data-erasure"
              className="inline-flex items-center text-brand-text font-semibold text-sm hover:underline"
            >
              データ消去の詳細
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
            <Link
              href="/hdd-destruction"
              className="inline-flex items-center text-brand-text font-semibold text-sm hover:underline"
            >
              HDD・SSD物理破壊の詳細
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="Pricing"
              title="費用は0円。移転コストを増やしません"
              lead="回収費・出張費・データ消去費・証明書発行費はすべて0円。500台以上の複数日対応が必要な大型案件のみ、事前にお見積もりします。"
            />
          </div>
          <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-8">
            <h3 className="font-bold text-neutral-900">
              Windows 10搭載機の入れ替えもこのタイミングで
            </h3>
            <p className="mt-3 text-sm md:text-base text-neutral-600 leading-relaxed">
              移転はPCの世代交代のタイミングとしても有効です。Windows
              10のサポートは2025年10月14日に終了しており、個人向け延長セキュリティ更新（ESU）も2026年10月13日に終了します（法人向けESUは有償・最長2028年10月まで）。移転を機にWindows
              11非対応機をまとめて処分する場合も、台数にかかわらず回収は0円です。
            </p>
            <Link
              href="/windows10-shobun"
              className="mt-4 inline-flex items-center text-brand-text font-semibold text-sm hover:underline"
            >
              Windows10サポート終了とPC処分ガイド
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="mb-10">
            <SectionHeading eyebrow="FAQ" title="情シス・総務のご担当者様からよくある質問" />
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
        currentPath="/office-relocation"
        related={[
          '/corporate',
          '/data-erasure',
          '/hdd-destruction',
          '/windows10-shobun',
          '/items',
          '/pricing',
        ]}
      />
      <CtaSection />
    </>
  );
}
