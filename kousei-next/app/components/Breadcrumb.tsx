import Link from 'next/link';
import { SITE_URL } from '../lib/business-info';
import JsonLd from './JsonLd';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** 現在ページのパス (例: '/items')。JSON-LD の @id をページごとに一意化するために指定する。 */
  currentPath?: string;
}

export default function Breadcrumb({ items, currentPath }: BreadcrumbProps) {
  const lastItem = items[items.length - 1];
  // @id の一意化: currentPath 指定 > 末尾 item の href > 最終ラベルによるフォールバック。
  // 慣例として現在ページの item は href を持たないため、未指定時はラベルで一意化する。
  const idPath = currentPath ?? lastItem?.href ?? '';
  const breadcrumbId = idPath
    ? `${idPath.startsWith('http') ? idPath : `${SITE_URL}${idPath}`}#breadcrumb`
    : `${SITE_URL}/#breadcrumb-${encodeURIComponent(lastItem?.label ?? '')}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': breadcrumbId,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'トップ',
        item: `${SITE_URL}/`,
      },
      ...items.map((item, i) => {
        const entry: Record<string, unknown> = {
          '@type': 'ListItem',
          position: i + 2,
          name: item.label,
        };
        if (item.href) {
          entry.item = item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}`;
        }
        return entry;
      }),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="パンくずリスト" className="max-w-[980px] mx-auto px-6 py-2">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-neutral-500">
          <li>
            <Link
              href="/"
              className="inline-flex items-center min-h-[44px] px-1 hover:text-neutral-900 transition"
            >
              トップ
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              <span className="mx-1 text-neutral-400" aria-hidden="true">
                /
              </span>
              {item.href ? (
                <Link
                  href={item.href}
                  className="inline-flex items-center min-h-[44px] px-1 hover:text-neutral-900 transition"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className="inline-flex items-center min-h-[44px] px-1 text-neutral-900 font-medium"
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
