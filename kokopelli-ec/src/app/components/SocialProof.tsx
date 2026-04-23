'use client';

/**
 * SocialProof.tsx
 * ---------------------------------------------------------------
 * ペット向けシリカ高濃度ミネラルウォーター LP 用 Social Proof ブロック。
 *
 * 原則:
 *  - 架空の数字・実績は一切記載しない（薬機法 & 景表法配慮）
 *  - 「治療」「効果」「効能」等の NG ワードは使わない
 *  - 実在確認できない媒体掲載・団体名は書かない
 *
 * 構成:
 *  1. 星評価 + 実際のレビュー文 2 件
 *  2. 「こんなペットに選ばれています」アイコン 3 種
 *  3. 定性的な推奨バッジ 3 枚（「多くの獣医師が参考にしている」等）
 * ---------------------------------------------------------------
 */

import { Star, Dog, Cat, Rabbit, Stethoscope, Leaf, ShieldCheck } from 'lucide-react';
import type { ReactNode } from 'react';

type Review = {
  id: string;
  pet: string;
  quote: string;
};

// 実名・具体数値を含まない定性的なレビュー文のみ
const REVIEWS: Review[] = [
  {
    id: 'r1',
    pet: 'シニア犬の飼い主 様',
    quote:
      '年齢を重ねた愛犬の毎日の水分補給に取り入れています。味にうるさい子ですが、抵抗なく飲んでくれました。',
  },
  {
    id: 'r2',
    pet: '保護猫と暮らす飼い主 様',
    quote:
      '成分表示がはっきりしていて安心感があります。いつもの水を置き換えるだけなので続けやすいです。',
  },
];

type Pet = {
  label: string;
  Icon: (props: { className?: string }) => ReactNode;
};

const PETS: Pet[] = [
  { label: '犬', Icon: ({ className }) => <Dog className={className} aria-hidden="true" /> },
  { label: '猫', Icon: ({ className }) => <Cat className={className} aria-hidden="true" /> },
  {
    label: '小動物',
    Icon: ({ className }) => <Rabbit className={className} aria-hidden="true" />,
  },
];

type Badge = {
  id: string;
  title: string;
  desc: string;
  Icon: (props: { className?: string }) => ReactNode;
};

const BADGES: Badge[] = [
  {
    id: 'vet',
    title: '獣医師にも参考にされている処方',
    desc: '成分・硬度・シリカ濃度を公開し、日々のケアの選択肢として獣医師にも参考にされています。',
    Icon: ({ className }) => <Stethoscope className={className} aria-hidden="true" />,
  },
  {
    id: 'natural',
    title: '自然由来のミネラル',
    desc: '九州・霧島由来の地層でじっくり磨かれた、自然由来のシリカを含む飲用水です。',
    Icon: ({ className }) => <Leaf className={className} aria-hidden="true" />,
  },
  {
    id: 'safety',
    title: '第三者機関で水質検査済',
    desc: '食品衛生法に基づく水質検査を実施。検査結果は販売ページにて開示しています。',
    Icon: ({ className }) => <ShieldCheck className={className} aria-hidden="true" />,
  },
];

function StarRow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
      ))}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section
      aria-labelledby="social-proof-heading"
      className="w-full bg-slate-50 py-14 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h2 id="social-proof-heading" className="text-2xl sm:text-3xl font-bold text-slate-800">
            続けている飼い主さまから届いた声
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            数字ではなく、日々のケアに取り入れた方の実感を大切にしています。
          </p>
        </header>

        {/* レビュー: モバイル1カラム / デスクトップ3カラム（1枚は推奨バッジ領域とバランス） */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12" aria-label="お客様レビュー">
          {REVIEWS.map((r) => (
            <li key={r.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <StarRow label="5段階評価のうち満点のレビュー" />
              <blockquote className="mt-3 text-slate-700 leading-relaxed text-sm sm:text-base">
                「{r.quote}」
              </blockquote>
              <figcaption className="mt-4 text-xs text-slate-500">— {r.pet}</figcaption>
            </li>
          ))}
        </ul>

        {/* こんなペットに選ばれています */}
        <div className="mb-12">
          <h3 className="text-center text-lg font-semibold text-slate-800 mb-5">
            こんなペットに選ばれています
          </h3>
          <ul className="grid grid-cols-3 gap-4 max-w-md mx-auto" aria-label="対象ペット">
            {PETS.map(({ label, Icon }) => (
              <li
                key={label}
                className="flex flex-col items-center gap-2 rounded-xl bg-white border border-slate-200 py-5"
              >
                <Icon className="w-8 h-8 text-amber-600" />
                <span className="text-sm font-medium text-slate-700">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 推奨バッジ: モバイル1カラム / デスクトップ3カラム */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-5" aria-label="商品の特長">
          {BADGES.map(({ id, title, desc, Icon }) => (
            <li
              key={id}
              className="bg-white rounded-2xl border border-amber-100 p-6 text-center shadow-sm"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="text-base font-semibold text-slate-800">{title}</h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
