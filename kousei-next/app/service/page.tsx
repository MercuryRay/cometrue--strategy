import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '../components/Breadcrumb';
import CtaButton from '../components/CtaButton';
import CtaSection from '../components/CtaSection';
import RelatedPages from '../components/RelatedPages';
import SectionHeading from '../components/SectionHeading';
import { BUSINESS, SITE_URL } from '../lib/business-info';

export const metadata: Metadata = {
  title: 'サービス内容【回収・データ消去・法人対応】',
  description:
    '横浜・神奈川全域でパソコンを完全無料で回収。出張回収・データ消去・HDD物理破壊・消去証明書・法人一括対応まで、PC回収便の全サービスをご案内。すべて0円、個人/法人どちらもOK。',
  alternates: {
    canonical: `${SITE_URL}/service`,
    languages: { 'ja-JP': `${SITE_URL}/service`, 'x-default': `${SITE_URL}/service` },
  },
  openGraph: {
    title: 'サービス内容 | 横浜・神奈川のパソコン無料回収',
    description:
      '出張回収・データ消去・HDD物理破壊・消去証明書・法人一括対応まですべて0円。横浜・神奈川全域。',
    url: `${SITE_URL}/service`,
    siteName: 'PC回収便',
    type: 'website',
    locale: 'ja_JP',
    images: ['/photos/og-image.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/photos/og-image.jpg'] },
};

// Service JSON-LD の正本は /service ルート (実体は app/service/layout.tsx の
// @id: /service#service)。このページで二重出力しないこと。
// 例外は /data-erasure と /corporate の個別 Service のみ (provider @id 参照付き)。

type IconProps = { className?: string };

const TruckIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg
    className={className}
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
);

const ShieldIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.6}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
);

const DriveIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.6}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375"
    />
  </svg>
);

const PcIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.6}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
    />
  </svg>
);

const BuildingIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg
    className={className}
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
);

const BoxIcon = ({ className = 'w-6 h-6' }: IconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth={1.6}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
    />
  </svg>
);

const services = [
  {
    href: '/method',
    Icon: TruckIcon,
    title: 'パソコン無料回収（出張・宅配・持込）',
    summary:
      '横浜市・神奈川県全域は出張回収、全国からは着払い宅配、直接のお持ち込みにも対応。回収費・出張費ともに完全無料で、重いデスクトップやモニターの運び出しもスタッフにお任せください。',
  },
  {
    href: '/data-erasure',
    Icon: ShieldIcon,
    title: 'データ消去・消去証明書',
    summary:
      '専用ソフトウェアで米国国防総省準拠の方式によりデータを上書き消去。ご希望の方にはデータ消去証明書を無料で発行します。SSDは物理破壊の併用にも対応。',
  },
  {
    href: '/hdd-destruction',
    Icon: DriveIcon,
    title: 'HDD・SSD物理破壊',
    summary:
      '起動しないPCや取り外し済みのHDD・SSDは、専用機材で物理的に破壊処理。破壊後の状態がわかる写真と証明書も無料でお渡しします。',
  },
  {
    href: '/windows10-shobun',
    Icon: PcIcon,
    title: 'Windows10サポート終了PCの処分',
    summary:
      'サポートが終了したWindows 10搭載PCや、Windows 11に対応していない古いPCの処分もまとめて無料回収。買い替えで不要になったPCのデータ消去も無料です。',
  },
  {
    href: '/corporate',
    Icon: BuildingIcon,
    title: '法人一括回収',
    summary:
      'オフィスの移転・閉鎖時の大量回収に対応。法人向けデータ消去証明書の一括発行、情報セキュリティポリシーに沿った処理、事前お見積もりも無料です。',
  },
  {
    href: '/office-relocation',
    Icon: BoxIcon,
    title: 'オフィス移転のIT機器処分',
    summary:
      '移転スケジュールに合わせて、PC・モニター・サーバー等のIT機器を一括回収。証明書発行やNDAにも対応し、移転作業の負担を減らします。',
  },
];

export default function ServicePage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'サービス内容' }]} />

      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">
            Service
          </p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            横浜・神奈川のパソコン無料回収、
            <br />
            サービスのすべて。
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            回収・データ消去・証明書発行・法人対応まで、PC回収便の全サービスをこのページからご案内します。
            どのサービスも費用は0円。詳細は各サービスの専用ページをご覧ください。
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <CtaButton href={BUSINESS.lineUrl} variant="line" external ariaLabel="LINEで無料相談">
              LINEで無料相談
            </CtaButton>
            <CtaButton
              href={BUSINESS.telLink}
              variant="ghost-light"
              ariaLabel={`電話する ${BUSINESS.telDisplay}`}
            >
              電話する（{BUSINESS.telDisplay}）
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-10">
            <SectionHeading
              eyebrow="ALL SERVICES"
              title="サービス一覧"
              lead="気になるサービスを選ぶと、対応内容・手順・よくある質問まで詳しく確認できます。"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => {
              const Icon = service.Icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group flex flex-col bg-white border border-neutral-100 hover:border-amber-200 hover:bg-amber-50/40 rounded-2xl p-7 transition"
                >
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 text-brand-text mb-5">
                    <Icon />
                  </span>
                  <h3 className="text-xl font-black tracking-tight">{service.title}</h3>
                  <p className="mt-3 text-sm text-neutral-600 leading-relaxed flex-1">
                    {service.summary}
                  </p>
                  <p className="mt-5 text-sm font-bold text-brand-text">
                    詳しく見る <span aria-hidden="true">→</span>
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <div className="mb-8">
            <SectionHeading
              title="どのサービスを選んでも、料金は0円"
              lead="回収費用・出張費・データ消去・証明書発行まで0円。特殊な搬出作業などが必要な場合のみ、必ず事前にお見積もりします。どのサービスが合うか迷ったら、LINEで写真を送るだけで回収可否をお答えします。"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            <CtaButton href="/pricing" variant="ghost-light">
              料金の内訳を見る
            </CtaButton>
            <CtaButton href="/flow" variant="ghost-light">
              回収の流れを見る
            </CtaButton>
          </div>
        </div>
      </section>

      <RelatedPages
        currentPath="/service"
        related={['/pricing', '/flow', '/items', '/not-accepted', '/why-free', '/faq']}
      />
      <CtaSection />
    </>
  );
}
