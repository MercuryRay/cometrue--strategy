import Link from 'next/link';
import SectionHeading from '../SectionHeading';
import TextArrowLink from './TextArrowLink';

/**
 * 無料回収できる代表12カテゴリ。
 * page.tsx の ItemList JSON-LD もこの配列から生成する (表示と構造化データの一致)。
 */
export const collectibleItems = [
  {
    name: 'ノートPC',
    desc: 'メーカー・年式問わず。壊れていてもOK',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
      />
    ),
  },
  {
    name: 'デスクトップPC',
    desc: 'タワー型・省スペース型・一体型すべて対応',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m-7.5-3.75h7.5a3 3 0 003-3V6a3 3 0 00-3-3h-7.5a3 3 0 00-3 3v4.5a3 3 0 003 3z"
      />
    ),
  },
  {
    name: 'モニター',
    desc: '液晶モニター・液晶ディスプレイ',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25"
      />
    ),
  },
  {
    name: 'タブレット',
    desc: 'iPad・Androidタブレット等',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
      />
    ),
  },
  {
    name: 'スマートフォン',
    desc: 'iPhone・Android各種',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
      />
    ),
  },
  {
    name: 'プリンター',
    desc: 'インクジェット・レーザープリンター',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
      />
    ),
  },
  {
    name: 'ルーター',
    desc: 'Wi-Fiルーター・モデム等',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
      />
    ),
  },
  {
    name: '周辺機器',
    desc: 'キーボード・マウス・外付けHDD等',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
      />
    ),
  },
  {
    name: 'サーバー',
    desc: 'ラックサーバー・タワーサーバー',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z"
      />
    ),
  },
  {
    name: 'ゲーム機',
    desc: '据置型・携帯型ゲーム機',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    ),
  },
  {
    name: 'カメラ',
    desc: 'デジタルカメラ・ビデオカメラ',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316zM16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0-3a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
      />
    ),
  },
  {
    name: 'オーディオ',
    desc: 'コンポ・スピーカー・ヘッドホン等',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
      />
    ),
  },
];

export default function CollectibleItemsSection() {
  return (
    <section className="bg-white" aria-label="回収対応品目">
      <div className="max-w-[980px] mx-auto px-6 py-24">
        <SectionHeading
          eyebrow="ITEMS"
          title="無料回収できるPC・周辺機器"
          lead={`ノートPC・デスクトップPCからオーディオ機器まで、全${collectibleItems.length}カテゴリのパソコン関連機器を幅広く無料回収。記載のないものも、まずはお気軽にお問い合わせください。`}
        />
        <div
          className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          data-reveal-stagger
        >
          {collectibleItems.map((item) => (
            <div
              key={item.name}
              className="group card-lift bg-white border border-neutral-100 rounded-2xl p-6 hover:border-amber-200"
            >
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 ring-1 ring-amber-200/60">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.6}
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
              </span>
              <h3 className="mt-4 font-bold text-neutral-900 text-sm">{item.name}</h3>
              <p className="mt-1 text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <TextArrowLink href="/items" title="無料回収できる品目の詳細">
            回収できる品目の詳細を見る
          </TextArrowLink>
          <Link
            href="/not-accepted"
            className="inline-flex items-center text-neutral-500 font-semibold text-sm hover:text-neutral-800"
            title="回収できない品目を確認"
          >
            回収できないものを確認
          </Link>
        </div>
      </div>
    </section>
  );
}
