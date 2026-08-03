import JsonLd from '../components/JsonLd';
import { SITE_URL } from '../lib/business-info';

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/service#service`,
  name: 'PC回収便 — 横浜・神奈川のパソコン無料回収',
  serviceType: 'パソコン無料回収',
  category: '不用品回収・リサイクル',
  description:
    '横浜・神奈川全域でパソコン・周辺機器を完全無料で回収。米国国防総省 DoD 5220.22-M 準拠のデータ消去、消去証明書発行、法人一括回収（NDA・ISMS監査対応）すべて0円。出張回収は最短翌日、宅配回収は全国対応・着払い。',
  url: `${SITE_URL}/service`,
  provider: { '@id': `${SITE_URL}/#business` },
  brand: { '@id': `${SITE_URL}/#business` },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY',
    availability: 'https://schema.org/InStock',
    url: `${SITE_URL}/contact`,
  },
  termsOfService: `${SITE_URL}/privacy`,
  serviceOutput: {
    '@type': 'Thing',
    name: 'データ消去証明書（無料発行）',
  },
  areaServed: [
    { '@type': 'AdministrativeArea', name: '神奈川県' },
    { '@type': 'City', name: '横浜市' },
    { '@type': 'City', name: '川崎市' },
    { '@type': 'City', name: '相模原市' },
    { '@type': 'Country', name: 'JP' },
  ],
  audience: [
    { '@type': 'Audience', audienceType: '個人' },
    { '@type': 'BusinessAudience', audienceType: '法人' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: '無料回収メニュー',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'パソコン無料回収（個人・法人）',
        price: '0',
        priceCurrency: 'JPY',
        itemOffered: { '@type': 'Service', name: 'PC・周辺機器の無料回収' },
      },
      {
        '@type': 'Offer',
        name: 'データ消去 + 証明書発行',
        price: '0',
        priceCurrency: 'JPY',
        itemOffered: {
          '@type': 'Service',
          name: 'データ消去（DoD 5220.22-M 方式の上書き消去・物理破壊対応）',
        },
      },
      {
        '@type': 'Offer',
        name: '法人一括回収（NDA・ISMS監査対応）',
        price: '0',
        priceCurrency: 'JPY',
        itemOffered: { '@type': 'Service', name: '法人向けPC一括処分・NDA締結' },
      },
      {
        '@type': 'Offer',
        name: '出張回収（最短翌日）',
        price: '0',
        priceCurrency: 'JPY',
        itemOffered: { '@type': 'Service', name: '横浜市・神奈川県の出張回収' },
      },
      {
        '@type': 'Offer',
        name: '宅配回収（全国対応）',
        price: '0',
        priceCurrency: 'JPY',
        itemOffered: { '@type': 'Service', name: '段ボール発送による宅配回収' },
      },
    ],
  },
};

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={serviceJsonLd} />
      {children}
    </>
  );
}
