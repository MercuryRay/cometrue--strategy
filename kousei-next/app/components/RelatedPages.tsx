import Link from 'next/link';

type RelatedLink = {
  href: string;
  title: string;
  desc: string;
};

const ALL_PAGES: Record<string, RelatedLink> = {
  '/': {
    href: '/',
    title: 'トップページ',
    desc: 'PC回収便のサービス概要・横浜市・神奈川県全域でパソコン無料回収',
  },
  '/service': {
    href: '/service',
    title: 'サービス内容',
    desc: '出張回収・データ消去・法人一括対応の詳細',
  },
  '/method': {
    href: '/method',
    title: '回収方法',
    desc: '出張・宅配（着払い）・持込から選べる3つの回収方法',
  },
  '/flow': {
    href: '/flow',
    title: '回収の流れ',
    desc: '問い合わせから回収完了まで3ステップで完結',
  },
  '/pricing': {
    href: '/pricing',
    title: '料金',
    desc: '回収費・出張費・データ消去・証明書発行すべて0円',
  },
  '/items': {
    href: '/items',
    title: '回収品目',
    desc: 'ノートPC・デスクトップ・モニター・サーバーなど無料回収一覧',
  },
  '/not-accepted': {
    href: '/not-accepted',
    title: '回収できないもの',
    desc: '家電リサイクル法対象家電・危険物などの引取不可品目',
  },
  '/data-erasure': {
    href: '/data-erasure',
    title: 'データ消去',
    desc: 'DoD 5220.22-M 方式の上書き消去に対応 + 消去証明書を無料発行',
  },
  '/area-yokohama': {
    href: '/area-yokohama',
    title: '横浜市の対応エリア',
    desc: '横浜市18区+神奈川県全域+全国宅配対応エリア一覧',
  },
  '/area-kawasaki': {
    href: '/area-kawasaki',
    title: '川崎市のPC回収',
    desc: '川崎全7区対応。市のルールから無料出張回収まで',
  },
  '/area-kanagawa': {
    href: '/area-kanagawa',
    title: '神奈川県のPC処分ガイド',
    desc: '県内全市町村の捨て方比較と無料回収',
  },
  '/windows10-shobun': {
    href: '/windows10-shobun',
    title: 'Windows10サポート終了とPC処分',
    desc: '2026年10月13日に個人向けESU終了。Win11非対応PCの無料処分ガイド',
  },
  '/hdd-destruction': {
    href: '/hdd-destruction',
    title: 'HDD・SSD物理破壊',
    desc: '専用クラッシャーで物理破壊。破壊済み写真・証明書無料',
  },
  '/office-relocation': {
    href: '/office-relocation',
    title: 'オフィス移転のPC処分',
    desc: 'IT機器一括回収。証明書・NDA・スケジュール対応',
  },
  '/corporate': {
    href: '/corporate',
    title: '法人向け回収',
    desc: 'オフィス移転・閉鎖時の大量回収、NDA・ISMS監査対応',
  },
  '/why-free': {
    href: '/why-free',
    title: 'なぜ無料？',
    desc: '再生販売と資源リサイクルで成り立つ無料回収の仕組み',
  },
  '/faq': {
    href: '/faq',
    title: 'よくある質問',
    desc: '料金・データ消去・対応エリアなどのよくある質問',
  },
  '/about': {
    href: '/about',
    title: '会社概要',
    desc: '株式会社煌盛商事（屋号: PC回収便）の会社情報',
  },
  '/contact': {
    href: '/contact',
    title: 'お問い合わせ',
    desc: 'LINE・電話からお気軽にご連絡ください',
  },
};

export default function RelatedPages({
  currentPath,
  related,
}: {
  currentPath: string;
  related: string[];
}) {
  const links = related.filter((p) => p !== currentPath && ALL_PAGES[p]).map((p) => ALL_PAGES[p]);

  if (links.length === 0) return null;

  return (
    <section className="bg-white border-t border-neutral-100">
      <div className="max-w-[980px] mx-auto px-6 py-16">
        <h2 className="text-xl md:text-2xl font-black tracking-tight mb-8">関連ページ</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group block bg-neutral-50 hover:bg-amber-50 border border-neutral-100 hover:border-amber-200 rounded-2xl p-5 transition"
            >
              <p className="font-bold text-neutral-900 group-hover:text-brand-text transition">
                {l.title}
                <span className="ml-1 text-xs text-neutral-400 group-hover:text-brand-text">→</span>
              </p>
              <p className="mt-2 text-xs text-neutral-500 leading-relaxed">{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
