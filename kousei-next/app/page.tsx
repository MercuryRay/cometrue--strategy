import Link from 'next/link';
import { BUSINESS, SITE_URL } from './lib/business-info';
import SectionHeading from './components/SectionHeading';
import JsonLd from './components/JsonLd';
import CtaButton from './components/CtaButton';
import HeroSection from './components/home/HeroSection';
import Windows10Band from './components/home/Windows10Band';
import CollectibleItemsSection, {
  collectibleItems,
} from './components/home/CollectibleItemsSection';
import AreaSection from './components/home/AreaSection';
import HomeFaqSection from './components/home/HomeFaqSection';
import TextArrowLink from './components/home/TextArrowLink';

const flowSteps = [
  {
    step: '01',
    title: 'LINE・電話で相談',
    desc: '回収したいPC・周辺機器の写真や台数をお送りください。回収可否を即返答します。',
  },
  {
    step: '02',
    title: '回収方法・日時の決定',
    desc: '出張回収・宅配回収・持込から選択。最短翌日対応、ご都合に合わせて訪問します。',
  },
  {
    step: '03',
    title: '回収・データ消去',
    desc: '訪問または受領後、専用ソフトでHDD/SSDのデータをDoD 5220.22-M準拠の方式で上書き消去（SSDは物理破壊の併用を推奨）。完了後はLINEでご連絡し、消去証明書も無料発行（法人様にはPDF納品）。',
  },
];

const usageScenes = [
  {
    type: '個人',
    accent: 'bg-amber-50 text-amber-700 ring-amber-200/60',
    title: '古いノートPCを安全に処分したい',
    body: '10年以上前のノートPCでもメーカー・状態問わず無料回収。HDD/SSDのデータ消去から証明書発行までセットで対応するため、個人情報や家族写真の漏洩リスクを心配せずに処分できます。',
  },
  {
    type: '法人',
    accent: 'bg-violet-50 text-violet-700 ring-violet-200/60',
    title: 'オフィス移転で大量のPCを一括処分',
    body: 'NDA(機密保持契約)締結のうえ、移転日や事業所閉鎖日に合わせて訪問。大量のPCも一括無料回収し、消去証明書をPDF納品。ISMS/Pマーク監査資料としてもそのまま提出できます。',
  },
  {
    type: '個人',
    accent: 'bg-amber-50 text-amber-700 ring-amber-200/60',
    title: '電源が入らない壊れたデスクトップPC',
    body: '電源が入らない・起動しない・画面が割れているといった故障PCも完全無料で回収。重量物のデスクトップPCやモニター複数台も、スタッフが運び出すため搬出作業は不要です。',
  },
  {
    type: '法人',
    accent: 'bg-violet-50 text-violet-700 ring-violet-200/60',
    title: '機密情報を含む業務PCの確実な消去',
    body: 'クライアント情報や個人情報を扱う業務PCは、DoD 5220.22-M(米国国防総省)準拠の3回上書き消去 + ご希望時の物理破壊で確実処理。シリアル番号別の消去証明書を発行します。',
  },
];

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/#items`,
  name: '無料回収対応品目',
  itemListElement: collectibleItems.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    description: item.desc,
  })),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': `${SITE_URL}/#breadcrumb`,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'ホーム',
      item: SITE_URL,
    },
  ],
};

const navItems = [
  {
    name: 'サービス内容',
    path: '/service',
    description: 'パソコン無料回収・データ消去・法人一括回収',
  },
  { name: '料金', path: '/pricing', description: '回収・消去・出張費すべて0円' },
  { name: '回収方法', path: '/method', description: '出張・宅配・持込から選択' },
  { name: 'ご利用の流れ', path: '/flow', description: 'LINE相談から完了まで3ステップ' },
  {
    name: 'データ消去',
    path: '/data-erasure',
    description: 'DoD 5220.22-M 準拠・証明書発行無料',
  },
  {
    name: 'HDD物理破壊',
    path: '/hdd-destruction',
    description: '起動しないPCのHDD/SSDも物理破壊で確実処理',
  },
  {
    name: 'Windows 10サポート終了PCの処分',
    path: '/windows10-shobun',
    description: 'Windows 11にできないPCの無料回収・データ消去',
  },
  {
    name: '対応エリア',
    path: '/area-yokohama',
    description: '横浜市18区・神奈川県全域',
  },
  { name: '川崎市の対応エリア', path: '/area-kawasaki', description: '川崎市全域に出張回収' },
  {
    name: '神奈川県の対応エリア',
    path: '/area-kanagawa',
    description: '神奈川県全33市町村に対応',
  },
  {
    name: '法人向け',
    path: '/corporate',
    description: 'NDA・ISMS監査対応・大量一括回収',
  },
  {
    name: 'オフィス移転のPC処分',
    path: '/office-relocation',
    description: '移転・閉鎖日に合わせた一括回収・消去証明書PDF納品',
  },
  {
    name: 'よくある質問',
    path: '/faq',
    description: '料金・対応エリア・データ消去の疑問解消',
  },
  { name: '回収できないもの', path: '/not-accepted', description: '事前確認用' },
  { name: '運営会社', path: '/about', description: '株式会社煌盛商事の概要' },
  { name: 'お問い合わせ', path: '/contact', description: 'LINE・電話' },
];

const siteNavigationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/#sitenav`,
  name: 'サイトナビゲーション',
  itemListElement: navItems.map((item, i) => ({
    '@type': 'SiteNavigationElement',
    position: i + 1,
    name: item.name,
    url: `${SITE_URL}${item.path}`,
    description: item.description,
  })),
};

const speakableJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: 'PC回収便 — 横浜・神奈川のパソコン無料回収',
  description:
    'PC回収便は横浜・神奈川全域でパソコン・周辺機器を完全無料で回収。データ消去・証明書発行・出張費すべて0円。',
  inLanguage: 'ja-JP',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#business` },
  primaryImageOfPage: `${SITE_URL}/photos/og-image.jpg`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2'],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />

      <Windows10Band />

      <section className="bg-white border-y border-neutral-100" aria-label="サービスの主要数値">
        <div
          className="max-w-[980px] mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          data-reveal-stagger
        >
          {[
            { num: '0', unit: '円', label: '回収費用' },
            { num: '0', unit: '円', label: 'データ消去' },
            { num: '最短', unit: '翌日', label: '回収対応' },
            { num: '法人', unit: 'OK', label: '一括回収' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-4xl md:text-5xl font-black text-brand-text">
                {item.num}
                <span className="text-2xl ml-1">{item.unit}</span>
              </p>
              <p className="mt-2 text-sm text-neutral-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        className="bg-gradient-to-br from-amber-50 via-white to-sky-50"
        aria-label="法令準拠の処理ルート"
      >
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <SectionHeading eyebrow="COMPLIANCE" title="法令準拠の適切な処理ルート。" />
              <p className="mt-6 text-neutral-600 leading-relaxed">
                PC回収便は、行政の許可を受けた処理業者と連携して適正処理を行う事業者です。
                資源有効利用促進法・小型家電リサイクル法に基づき、
                回収後のパソコンを適切なルートで再資源化しています。
                違法投棄や不法な海外輸出は一切ありません。
              </p>
            </div>
            <div className="md:col-span-7 grid sm:grid-cols-2 gap-4" data-reveal-stagger>
              {[
                {
                  title: '許可業者と連携した適正処理',
                  desc: '産業廃棄物は行政の許可を受けた処理業者と連携して処理',
                },
                {
                  title: '中古機器の適正な再流通',
                  desc: '再生販売・流通も行政の許可を受けた事業者と連携して実施',
                },
                {
                  title: '小型家電リサイクル法対応',
                  desc: '希少金属の再資源化に貢献',
                },
                {
                  title: '個人情報保護方針策定',
                  desc: 'NDA締結に対応し、情報漏洩防止を徹底',
                },
              ].map((c) => (
                <div
                  key={c.title}
                  className="card-lift bg-white border border-neutral-100 rounded-2xl p-6"
                >
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 ring-1 ring-emerald-200/60">
                    <svg
                      className="w-5 h-5 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </span>
                  <h3 className="mt-4 font-bold text-neutral-900 text-sm">{c.title}</h3>
                  <p className="mt-2 text-xs text-neutral-500 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CollectibleItemsSection />

      <section className="bg-neutral-50" aria-label="3つのサービス">
        <div className="max-w-[980px] mx-auto px-6 py-24">
          <SectionHeading
            eyebrow="SERVICE"
            title="出張回収・データ消去・法人対応。"
            lead="面倒な手続きは一切不要。連絡いただければ、あとはすべて対応します。"
          />
          <div className="mt-12 grid md:grid-cols-3 gap-6" data-reveal-stagger>
            {[
              {
                title: '出張回収（無料）',
                desc: '横浜市内なら最短翌日。重いデスクトップPCもスタッフが運び出します。',
                accent: 'from-amber-100 to-amber-50',
                ring: 'ring-amber-200/60',
                icon: (
                  <svg
                    className="w-7 h-7 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 0a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8 0h2m4 0h1a1 1 0 001-1v-5a1 1 0 00-.293-.707L17 7h-4"
                    />
                  </svg>
                ),
              },
              {
                title: 'データ消去（無料）',
                desc: '米国国防総省準拠の専用ソフトで上書き消去。シリアル別の証明書を無料発行。',
                accent: 'from-sky-100 to-sky-50',
                ring: 'ring-sky-200/60',
                icon: (
                  <svg
                    className="w-7 h-7 text-sky-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
              },
              {
                title: '法人一括対応',
                desc: 'NDA締結・大量一括回収・ISMS監査対応。オフィス移転や閉鎖もまるごと。',
                accent: 'from-violet-100 to-violet-50',
                ring: 'ring-violet-200/60',
                icon: (
                  <svg
                    className="w-7 h-7 text-violet-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5M9 9.75h1.5M9 12.75h1.5m3-6h1.5m-1.5 3h1.5m-1.5 3h1.5M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                    />
                  </svg>
                ),
              },
            ].map((s) => (
              <div
                key={s.title}
                className="group card-lift bg-white rounded-2xl p-8 border border-neutral-100 hover:border-neutral-200"
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${s.accent} ring-1 ${s.ring}`}
                >
                  {s.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-neutral-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <TextArrowLink href="/service" title="無料回収サービスの詳細">
              PC無料回収サービスの詳細
            </TextArrowLink>
          </div>
        </div>
      </section>

      <section className="bg-white" aria-label="ご利用の流れ">
        <div className="max-w-[980px] mx-auto px-6 py-24">
          <SectionHeading
            eyebrow="FLOW"
            title="ご利用3ステップ"
            lead="連絡から回収完了まで、最短翌日。"
          />
          <div className="mt-12 grid md:grid-cols-3 gap-6" data-reveal-stagger>
            {flowSteps.map((step) => (
              <div
                key={step.step}
                className="relative card-lift bg-gradient-to-br from-neutral-50 to-white border border-neutral-100 rounded-2xl p-7"
              >
                <span className="text-brand-text font-black text-3xl tracking-tight">
                  {step.step}
                </span>
                <h3 className="mt-3 font-bold text-neutral-900">{step.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <TextArrowLink href="/flow" title="ご利用の流れの詳細">
              ご利用の流れを詳しく
            </TextArrowLink>
          </div>
        </div>
      </section>

      <section
        className="bg-gradient-to-br from-sky-50 via-white to-emerald-50"
        aria-label="データ消去の対応"
      >
        <div className="max-w-[980px] mx-auto px-6 py-24">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <SectionHeading
                eyebrow="DATA ERASURE"
                title="HDD/SSDのデータを、確実に消去します。"
              />
              <p className="mt-6 text-neutral-600 leading-relaxed">
                米国国防総省方式（DoD 5220.22-M）準拠の専用ソフトウェアでHDD/SSDを上書き消去。
                SSD/NVMeは特性上、上書き消去に加えて物理破壊の併用をおすすめしています。
                ご希望の方には消去証明書をシリアル番号別に発行し、
                ISO27001/Pマーク監査対応も可能です。
              </p>
              <TextArrowLink href="/data-erasure" title="データ消去・証明書の詳細" className="mt-6">
                データ消去・証明書の詳細
              </TextArrowLink>
            </div>
            <ul className="md:col-span-7 space-y-3" data-reveal-stagger>
              {[
                'DoD 5220.22-M（米国国防総省）準拠の3回上書き消去',
                'SSDは上書き消去に加え物理破壊の併用にも対応',
                '起動しないPCはHDD/SSDを物理破壊で確実処理',
                'シリアル番号別の消去証明書を無料発行',
                '法人様には一括証明書をPDF納品（監査資料に直接利用可）',
                'NDA（機密保持契約）の締結に対応し、情報漏洩対策を徹底',
              ].map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 bg-white border border-neutral-100 rounded-xl px-5 py-4"
                >
                  <span className="text-brand-text mt-0.5 shrink-0">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-neutral-700 leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <AreaSection />

      <section className="bg-neutral-50" aria-label="ご利用シーン">
        <div className="max-w-[980px] mx-auto px-6 py-24">
          <SectionHeading
            eyebrow="USE CASES"
            title="こんな時にご利用ください"
            lead="個人のお客様から法人のお客様まで、PC回収便がお役に立てる代表的なご利用シーンをご紹介します。"
          />
          <div className="mt-12 grid md:grid-cols-2 gap-6" data-reveal-stagger>
            {usageScenes.map((scene) => (
              <article
                key={scene.title}
                className="card-lift bg-white border border-neutral-100 rounded-2xl p-7"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-xs font-bold tracking-widest uppercase ${scene.accent} ring-1 px-3 py-1 rounded-full`}
                  >
                    {scene.type}
                  </span>
                  <h3 className="font-bold text-neutral-900 text-sm">{scene.title}</h3>
                </div>
                <p className="text-sm text-neutral-600 leading-relaxed">{scene.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <HomeFaqSection />

      <section
        className="bg-gradient-to-br from-emerald-50 via-white to-amber-50"
        aria-label="資源循環への取り組み"
      >
        <div className="max-w-[980px] mx-auto px-6 py-24">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-5">
              <SectionHeading eyebrow="SUSTAINABILITY" title="資源を、循環させる。" />
              <p className="mt-6 text-neutral-600 leading-relaxed">
                回収したパソコンは、再利用できる部品をリユース・リファビッシュし、
                再利用不可な機器も希少金属（金・銀・銅・パラジウム等）を回収して再資源化。
                資源を埋め立てず、循環型社会の構築に貢献しています。
              </p>
            </div>
            <div className="md:col-span-7 grid sm:grid-cols-3 gap-4" data-reveal-stagger>
              {[
                {
                  label: '再資源化',
                  desc: '部品再利用・希少金属回収で資源を循環',
                },
                {
                  label: '環境負荷低減',
                  desc: '埋立処理に比べ廃棄物量とCO₂排出を削減',
                },
                {
                  label: 'SDGs貢献',
                  desc: '目標12「つくる責任つかう責任」/ 目標13「気候変動対策」',
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="card-lift bg-white border border-neutral-100 rounded-2xl p-6 text-center"
                >
                  <p className="text-base font-black text-emerald-600">{s.label}</p>
                  <p className="mt-2 text-xs text-neutral-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-neutral-100" aria-label="関連ページへのリンク">
        <div className="max-w-[980px] mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <SectionHeading
                eyebrow="WHY FREE?"
                title="なぜPC回収・データ消去すべて無料でできるのか。"
              />
              <p className="mt-6 text-neutral-500 leading-relaxed">
                再生販売（リユース）と資源リサイクルの2つの仕組みで、
                ユーザー様から費用を頂かなくても事業として成立しています。
                違法投棄は行わず、情報漏洩対策を徹底しています。
              </p>
              <TextArrowLink href="/why-free" title="無料回収の仕組み" className="mt-6">
                無料回収の仕組みを詳しく
              </TextArrowLink>
            </div>
            <ul className="space-y-3" data-reveal-stagger>
              {[
                {
                  href: '/data-erasure',
                  label: 'データ消去・証明書 ｜ DoD 5220.22-M準拠',
                },
                {
                  href: '/method',
                  label: 'PC回収方法 ｜ 出張・宅配・持込から選択',
                },
                { href: '/pricing', label: 'PC回収の料金 ｜ 回収・消去・出張費すべて0円' },
                { href: '/corporate', label: '法人向けPC一括回収 ｜ NDA・ISMS監査対応' },
                { href: '/area-yokohama', label: '対応エリア ｜ 横浜18区・神奈川全域' },
                { href: '/not-accepted', label: '回収できないもの ｜ 事前確認' },
                { href: '/about', label: '運営会社 ｜ 株式会社煌盛商事の概要' },
                { href: '/contact', label: 'お問い合わせ ｜ LINE・電話' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center justify-between bg-neutral-50 hover:bg-amber-50 border border-neutral-100 rounded-xl px-5 py-4 transition group min-h-[44px]"
                    title={link.label}
                  >
                    <span className="text-sm font-medium text-neutral-700">{link.label}</span>
                    <svg
                      className="w-4 h-4 text-neutral-400 group-hover:text-brand-text transition"
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
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-neutral-900 text-white" aria-label="お問い合わせ">
        <div className="max-w-[980px] mx-auto px-6 py-24 text-center">
          <SectionHeading align="center" title="まずは無料相談から。" />
          <p className="mt-6 text-neutral-400 text-lg max-w-lg mx-auto">
            LINEで写真を送るだけ。横浜・神奈川全域で回収可能かすぐにお答えします。
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CtaButton href={BUSINESS.lineUrl} variant="line" external ariaLabel="LINEで無料相談">
              LINEで無料相談
            </CtaButton>
            <CtaButton
              href={BUSINESS.telLink}
              variant="ghost-dark"
              ariaLabel={`電話する ${BUSINESS.telDisplay}`}
            >
              電話する（{BUSINESS.telDisplay}）
            </CtaButton>
          </div>
        </div>
      </section>

      <JsonLd data={itemListJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={siteNavigationJsonLd} />
      <JsonLd data={speakableJsonLd} />
    </>
  );
}
