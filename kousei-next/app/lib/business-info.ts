export const SITE_URL = 'https://kouseishoji.vercel.app';

export const BUSINESS = {
  legalName: '株式会社煌盛商事',
  brandName: 'PC回収便',
  serviceArea: '横浜・神奈川全域',
  telDisplay: '045-550-5765',
  telE164: '+81-45-550-5765',
  telLink: 'tel:0455505765',
  lineUrl: 'https://lin.ee/BvvSYYH1',
  addressRegion: '神奈川県',
  addressLocality: '横浜市',
  streetAddress: '港北区',
  openingHoursWeekdayDisplay: '平日 10:00-17:00',
  openingHoursWeekendDisplay: '土日祝 事前予約制',
  geoLatitude: 35.5072,
  geoLongitude: 139.619,
} as const;

// Google のローカルビジネス構造化データ仕様は opens/closes ペアを要求するため平日のみ。
// 「土日祝は事前予約制（要問い合わせ）」は LocalBusiness の description 文側で伝える。
export const OPENING_HOURS_JSON_LD = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '10:00',
    closes: '17:00',
  },
] as const;
