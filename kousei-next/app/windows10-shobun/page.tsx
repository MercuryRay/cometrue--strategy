import type { Metadata } from 'next';
import Breadcrumb from '../components/Breadcrumb';
import CtaButton from '../components/CtaButton';
import CtaSection from '../components/CtaSection';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { BUSINESS, SITE_URL } from '../lib/business-info';

export const metadata: Metadata = {
  title: 'Windows10サポート終了後のパソコン処分ガイド【2026年版】',
  description:
    'Windows 10の個人向けESUは2026年10月13日に完全終了。Windows 11にできないパソコンの処分方法を解説。横浜・神奈川なら出張回収0円・データ消去0円・消去証明書無料のPC回収便におまかせください。',
  alternates: {
    canonical: `${SITE_URL}/windows10-shobun`,
    languages: {
      'ja-JP': `${SITE_URL}/windows10-shobun`,
      'x-default': `${SITE_URL}/windows10-shobun`,
    },
  },
  openGraph: {
    title: 'Windows10サポート終了後のパソコン処分ガイド【2026年版】',
    description:
      '個人向けESUは2026年10月13日に完全終了。Windows 11にできないパソコンは、横浜・神奈川なら回収0円・データ消去0円・証明書無料で処分できます。',
    url: `${SITE_URL}/windows10-shobun`,
    type: 'website',
    locale: 'ja_JP',
    siteName: 'PC回収便',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

const schedule = [
  {
    date: '2025年10月14日',
    label: '通常サポート終了（終了済み）',
    body: 'Windows 10 Home / Pro の通常サポートが終了。以降、機能更新は行われず、セキュリティ更新はESU（拡張セキュリティ更新プログラム）加入者のみに提供されています。',
    status: '終了済み',
    statusColor: 'bg-neutral-200 text-neutral-600',
  },
  {
    date: '2026年10月13日',
    label: '個人向けESU 完全終了',
    body: '個人向けESUの提供が終了し、個人のWindows 10へのセキュリティ更新は完全に停止します。この日以降、個人向けESUによる延命はできません（法人向けESUは有償で最長2028年10月まで）。',
    status: '完全終了',
    statusColor: 'bg-red-100 text-red-700',
  },
];

const risks = [
  {
    title: 'セキュリティ更新が止まる',
    body: '新しく発見された脆弱性が修正されないまま放置されます。修正されない欠陥はウイルス感染や不正アクセスの入口になり、使い続けるほどリスクが積み上がります。',
  },
  {
    title: '個人情報・ネットバンキングの危険',
    body: 'サポート切れOSでのネットバンキングやネットショッピングは、ID・パスワードやカード情報を狙う攻撃に対して無防備になりがちです。',
  },
  {
    title: '対応ソフト・周辺機器が減っていく',
    body: 'ブラウザやセキュリティソフトなどの主要ソフトは、順次サポート切れOSへの対応を打ち切ります。プリンタ等の新しい周辺機器ドライバも提供されなくなっていきます。',
  },
];

const win11Requirements = [
  {
    item: 'CPU',
    spec: '1GHz以上・2コア以上の64bit対応プロセッサ（Microsoftの対応CPUリスト掲載品）',
  },
  { item: 'メモリ', spec: '4GB以上' },
  { item: 'ストレージ', spec: '64GB以上' },
  { item: 'ファームウェア', spec: 'UEFI・セキュアブート対応' },
  { item: 'TPM', spec: 'バージョン2.0' },
  { item: 'グラフィックス', spec: 'DirectX 12以降（WDDM 2.0ドライバー）対応' },
];

const options = [
  {
    name: '買い替え＋今のPCを処分',
    cost: '新PC購入費のみ（処分は0円）',
    effort: 'データ移行が必要',
    security: '当社ならデータ消去0円＋証明書無料',
    bestFor: 'これからもPCを使い続ける方。もっとも一般的な選択肢です。',
    highlight: true,
  },
  {
    name: '処分のみ',
    cost: '0円（出張費・回収費・消去費すべて無料）',
    effort: '電話・LINEで依頼するだけ',
    security: 'データ消去0円＋証明書無料',
    bestFor: 'スマホ・タブレットで足りている方、使っていないPCを手放したい方。',
    highlight: true,
  },
  {
    name: '中古売却',
    cost: '売却額が入る可能性あり',
    effort: '査定・出品・梱包・データ消去を自分で行う',
    security: 'データ消去は自己責任',
    bestFor:
      '発売から年数が浅い高スペック機。Windows 11非対応の古い機種は値が付きにくい傾向があります。',
    highlight: false,
  },
];

const faqs = [
  {
    q: 'サポートが終了したWindows 10パソコンも無料で回収してもらえますか？',
    a: 'はい、無料で回収します。古いOSのパソコンでも、起動しない・壊れているパソコンでも、回収費・出張費・データ消去費すべて0円です。',
  },
  {
    q: 'Windows 10パソコンを初期化してから渡したほうがいいですか？',
    a: '初期化は必須ではありません。初期化だけではデータが復元されるおそれがあるため、当社では専用ソフトによる上書き消去または物理破壊を無料で実施し、ご希望の方には消去証明書も無料発行します。',
  },
  {
    q: '2026年10月13日を過ぎてから処分を依頼しても大丈夫ですか？',
    a: 'もちろん大丈夫です。ただしサポート完全終了後の使用はセキュリティリスクが高まるため、使わないパソコンはお早めの処分をおすすめします。',
  },
  {
    q: '会社のWindows 10パソコンを数十台まとめて処分したいのですが。',
    a: '法人向けの一括回収に対応しています。NDA（機密保持契約）の締結、シリアル番号別の消去証明書一括発行も可能です。詳しくは法人向けページをご覧ください。',
  },
];

export default function Windows10ShobunPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Windows10サポート終了とPC処分' }]} />

      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">
            Windows 10 End of Support
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            Windows10サポート終了。
            <br />
            そのパソコン、どうしますか？
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            Windows
            10の通常サポートは2025年10月14日に終了し、個人向けESU（拡張セキュリティ更新プログラム）も2026年10月13日で完全終了します。Windows
            11にできないパソコンの安全な処分方法を、横浜・神奈川の無料回収業者がわかりやすく解説します。
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <CtaButton href={BUSINESS.lineUrl} variant="line" external ariaLabel="LINEで無料相談">
              LINEで無料相談
            </CtaButton>
            <CtaButton href="/flow" variant="ghost-light">
              回収の流れを見る
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="SCHEDULE"
              title="Windows 10サポート終了スケジュール"
              lead="重要な日付は2つ。通常サポートはすでに終了しており、残る個人向けESUの期限が2026年10月13日です。"
            />
          </div>
          <div className="space-y-6">
            {schedule.map((s) => (
              <div
                key={s.date}
                className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6 md:p-8"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-xl md:text-2xl font-black tracking-tight">{s.date}</p>
                  <span className={`${s.statusColor} text-xs font-bold px-3 py-1 rounded-full`}>
                    {s.status}
                  </span>
                </div>
                <h3 className="mt-2 text-xl font-bold text-neutral-900">{s.label}</h3>
                <p className="mt-3 text-sm md:text-base text-neutral-600 leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-neutral-500 leading-relaxed">
            ※
            法人向けESUは有償で最長2028年10月まで延長できますが、個人向けESUの延長はありません（Microsoft公表のスケジュールに基づく。2026年7月時点）。
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="RISK"
              title="サポート切れPCを使い続けるリスク"
              lead="「まだ動くから」と使い続けるのがいちばん危険です。サポート終了後は、次の3つのリスクが時間とともに大きくなります。"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {risks.map((r) => (
              <div key={r.title} className="bg-white border border-neutral-100 rounded-2xl p-7">
                <h3 className="text-xl font-bold text-neutral-900">{r.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="CHECK"
              title="お使いのPCはWindows 11にできる？"
              lead="処分を決める前に、まず今のパソコンがWindows 11に無償アップグレードできるか確認しましょう。"
            />
          </div>
          <div className="border border-neutral-100 rounded-2xl overflow-hidden bg-white">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-xs text-neutral-500 uppercase tracking-widest">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">項目</th>
                  <th className="px-4 py-3 text-left font-medium">Windows 11の最小システム要件</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {win11Requirements.map((row) => (
                  <tr key={row.item}>
                    <td className="px-4 py-4 font-bold text-neutral-900 whitespace-nowrap">
                      {row.item}
                    </td>
                    <td className="px-4 py-4 text-neutral-700 leading-relaxed">{row.spec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-neutral-900">かんたんな確認手順</h3>
            <ol className="mt-4 space-y-3 text-sm md:text-base text-neutral-700 leading-relaxed list-decimal list-inside">
              <li>
                「設定」→「更新とセキュリティ」→「Windows Update」を開き、Windows
                11へのアップグレード案内が表示されるか確認する
              </li>
              <li>
                表示されない場合は、Microsoft公式の「PC正常性チェック」アプリで要件を満たしているか診断する
              </li>
              <li>TPM 2.0の有無は、Windowsキー＋Rで「tpm.msc」を実行すると確認できる</li>
            </ol>
            <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
              目安として、おおむねIntel第8世代Core以降・AMD Ryzen
              2000シリーズ以降のCPUが対応リストに含まれます。それより古いパソコンは、メモリやストレージが十分でもアップグレードできないケースがほとんどです。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="OPTIONS"
              title="アップグレード不可PCの選択肢比較"
              lead="Windows 11にできないパソコンの行き先は、大きく3つ。それぞれの費用・手間・データの安全性を比べてみましょう。"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {options.map((o) => (
              <div
                key={o.name}
                className={`rounded-2xl p-7 border ${
                  o.highlight ? 'bg-amber-50 border-amber-200' : 'bg-white border-neutral-100'
                }`}
              >
                <h3 className="text-xl font-bold text-neutral-900">{o.name}</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-xs text-neutral-500">費用</dt>
                    <dd className="mt-1 text-neutral-700 leading-relaxed">{o.cost}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-neutral-500">手間</dt>
                    <dd className="mt-1 text-neutral-700 leading-relaxed">{o.effort}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-neutral-500">データの安全</dt>
                    <dd className="mt-1 text-neutral-700 leading-relaxed">{o.security}</dd>
                  </div>
                </dl>
                <div className="mt-5 pt-5 border-t border-neutral-200/70">
                  <p className="text-xs text-neutral-500 mb-1">こんな方におすすめ</p>
                  <p className="text-sm text-neutral-700 leading-relaxed">{o.bestFor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="DATA ERASURE"
              title="処分前に必ずデータ消去"
              lead="どの選択肢を選んでも、手放す前のデータ消去は必須です。「初期化したから大丈夫」は誤解です。"
            />
          </div>
          <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-6 md:p-10">
            <p className="text-neutral-700 text-sm md:text-base leading-relaxed">
              Windowsの初期化（リカバリ）は、ファイルの管理情報を消すだけで、記録領域に実データが残ったままになることがあります。市販の復元ソフトで写真・書類・パスワードが読み出されるおそれがあるため、確実に手放すには記録領域そのものの上書き消去、または物理破壊が必要です。
            </p>
            <p className="mt-4 text-neutral-700 text-sm md:text-base leading-relaxed">
              PC回収便では、DoD 5220.22-M
              方式（米国国防総省方式）の上書き消去に対応した専用ソフトによる消去と物理破壊の両方に無料で対応し、消去証明書も無料発行しています。
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <CtaButton href="/data-erasure" variant="brand">
                データ消去サービスの詳細
              </CtaButton>
              <CtaButton href="/hdd-destruction" variant="ghost-light">
                HDD・SSD物理破壊はこちら
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <SectionHeading
              eyebrow="FREE PICKUP"
              title="横浜・神奈川なら無料出張回収"
              lead="Windows 10パソコンの処分は、地元の回収業者に頼むのがいちばん手軽です。梱包も持ち運びも不要、玄関先でお渡しいただくだけ。"
            />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                title: '回収0円',
                body: '出張費・回収費は完全無料。横浜市・神奈川県全域に対応します。',
              },
              {
                title: 'データ消去0円',
                body: '専用ソフトによる上書き消去・物理破壊とも無料で実施します。',
              },
              {
                title: '証明書無料',
                body: 'ご希望の方には消去証明書を無料発行。処分の証跡が残ります。',
              },
              {
                title: '最短翌日',
                body: '横浜市内ならご連絡から最短翌日に訪問。お急ぎもご相談ください。',
              },
            ].map((f) => (
              <div key={f.title} className="bg-white border border-neutral-100 rounded-2xl p-6">
                <p className="text-xl font-black text-brand-text">{f.title}</p>
                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-600 leading-relaxed">
            電話受付は{BUSINESS.openingHoursWeekdayDisplay}（{BUSINESS.openingHoursWeekendDisplay}
            ）。LINEなら24時間いつでも受付、写真を送るだけで回収可否をお答えします。
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
              eyebrow="FOR BUSINESS"
              title="法人の大量入れ替えにも対応"
              lead="Windows 10サポート終了にともなう社内PCの一斉入れ替えは、退役PCの情報管理が最大の課題です。"
            />
          </div>
          <div className="bg-neutral-900 text-white rounded-2xl p-8 md:p-10">
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed max-w-2xl">
              PC回収便は法人向けに、NDA（機密保持契約）の締結、シリアル番号別の消去証明書一括発行（ISO27001/Pマーク監査対応）に対応。数台からの入れ替えも、オフィス移転にともなう一括処分もご相談いただけます。
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <CtaButton href="/corporate" variant="brand">
                法人向けサービスの詳細
              </CtaButton>
              <CtaButton href="/office-relocation" variant="ghost-dark">
                オフィス移転のPC処分
              </CtaButton>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-16 md:py-20">
          <div className="mb-10">
            <SectionHeading eyebrow="FAQ" title="Windows10処分のよくある質問" />
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
        currentPath="/windows10-shobun"
        related={[
          '/data-erasure',
          '/hdd-destruction',
          '/flow',
          '/corporate',
          '/area-kanagawa',
          '/faq',
        ]}
      />
      <CtaSection />
    </>
  );
}
