import Image from 'next/image';
import Link from 'next/link';
import { BUSINESS } from '../lib/business-info';

const footerColumns: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: 'サービス',
    links: [
      { href: '/service', label: 'PC無料回収サービス' },
      { href: '/pricing', label: '料金（完全無料）' },
      { href: '/method', label: '回収方法（出張・宅配・持込）' },
      { href: '/flow', label: '回収の流れ' },
      { href: '/items', label: '回収できる品目' },
      { href: '/not-accepted', label: '回収できないもの' },
      { href: '/hdd-destruction', label: 'HDD・SSD物理破壊' },
      { href: '/windows10-shobun', label: 'Windows10サポート終了とPC処分' },
    ],
  },
  {
    heading: '対応エリア・法人',
    links: [
      { href: '/area-yokohama', label: '横浜市の対応エリア' },
      { href: '/area-kawasaki', label: '川崎市のPC回収' },
      { href: '/area-kanagawa', label: '神奈川県のPC処分ガイド' },
      { href: '/corporate', label: '法人向けPC一括回収' },
      { href: '/office-relocation', label: 'オフィス移転のPC処分' },
    ],
  },
  {
    heading: '安心・会社情報',
    links: [
      { href: '/data-erasure', label: 'データ消去・証明書' },
      { href: '/why-free', label: 'なぜ無料で回収できるのか' },
      { href: '/about', label: '会社概要' },
      { href: '/faq', label: 'よくあるご質問' },
      { href: '/privacy', label: 'プライバシーポリシー' },
      { href: '/contact', label: 'お問い合わせ' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300 pb-24 md:pb-0">
      <div className="max-w-[980px] mx-auto px-6 py-12">
        <nav aria-label="フッターナビゲーション">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8">
            {footerColumns.map((column) => (
              <div key={column.heading}>
                <p className="text-white text-sm font-bold tracking-wide">{column.heading}</p>
                <ul className="mt-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center min-h-[40px] text-[13px] text-neutral-400 hover:text-white transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div className="mt-10 pt-8 border-t border-neutral-800">
          <address className="not-italic">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/logo-symbol-v2-256.png"
                alt=""
                width={256}
                height={256}
                sizes="40px"
                className="h-10 w-10"
              />
              <div>
                <p className="text-white font-bold text-lg">{BUSINESS.legalName}</p>
                <p className="text-neutral-400 text-xs mt-0.5">屋号: {BUSINESS.brandName}</p>
              </div>
            </div>
            <p className="text-xs mt-3">
              {BUSINESS.addressRegion} {BUSINESS.addressLocality}
              {BUSINESS.streetAddress}
            </p>
            <p className="text-xs mt-1">
              TEL:{' '}
              <a href={BUSINESS.telLink} className="hover:text-white transition">
                {BUSINESS.telDisplay}
              </a>
            </p>
            <p className="text-xs mt-1">
              {BUSINESS.openingHoursWeekdayDisplay} / {BUSINESS.openingHoursWeekendDisplay}
            </p>
            <p className="text-xs mt-1">対応エリア: {BUSINESS.serviceArea}</p>
          </address>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-800 text-center">
          <p className="text-xs">&copy; 2026 {BUSINESS.legalName} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
