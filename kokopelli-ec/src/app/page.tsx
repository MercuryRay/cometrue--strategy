import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import PetDiagnosis from './components/PetDiagnosis';
import SocialProof from './components/SocialProof';
import ComparisonTable from './components/ComparisonTable';
import ExitIntentPopup from './components/ExitIntentPopup';
// FirstTrialButton removed - no more ¥980 offer
import MobileCTABar from './components/MobileCTABar';
import MemberRegistration from './components/MemberRegistration';
import PixelEvents from './components/PixelEvents';
import KokopelliLogo from './components/KokopelliLogo';
import {
  MoonIcon,
  RotateCwIcon,
  CircleOffIcon,
  UtensilsCrossedIcon,
  PawPrintIcon,
  ClockIcon,
  SparklesIcon,
  BedDoubleIcon,
  DropletsIcon,
  LeafIcon,
  ClipboardListIcon,
  BoneIcon,
  MicroscopeIcon,
  SparklesAltIcon,
  GemIcon,
  PipetteIcon,
  CookieIcon,
  CalendarCheckIcon,
  FlaskConicalIcon,
  FactoryIcon,
  FileCheckIcon,
  GraduationCapIcon,
} from './components/Icons';
import {
  FadeInOnScroll,
  TextReveal,
  CountUp,
  Parallax,
  MagneticButton,
  ScrollProgress,
  StaggerContainer,
  StaggerItem,
  GlowCard,
} from './components/Animations';
import {
  SINGLE_PRICE,
  BUNDLE_2_PRICE,
  BUNDLE_6_PRICE,
  SUBSCRIPTION_PRICE,
  PER_BOTTLE_BUNDLE_2,
  PER_BOTTLE_BUNDLE_6,
  PER_BOTTLE_SUBSCRIPTION,
  SHIPPING,
  REFERRAL_DISCOUNT,
  formatYen,
} from '@/lib/prices';

/* ───────────── SEO Metadata ───────────── */
export const metadata: Metadata = {
  title: `ココペリ｜シニア犬・シニア猫のシリカ水｜定期便${formatYen(SUBSCRIPTION_PRICE)}・縛りなし・30日返金 公式`,
  description: `シニア犬・シニア猫のための動物用栄養補助食品「ココペリ」。獣医師監修・臨床使用10年・水溶性ケイ素10,000mg/Lの国産シンプル処方（水＋ケイ素のみ・無添加）。定期便 月${formatYen(SUBSCRIPTION_PRICE)}・送料無料・縛りなし／30日間全額返金保証。お試し1本${formatYen(SINGLE_PRICE)}〜。`,
  keywords:
    'ココペリ,シニア犬 サプリ,シニア猫 サプリ,シニア犬 シリカ水,シニア猫 シリカ水,犬 シリカ水,猫 シリカ水,ペット 水分補給,水溶性ケイ素,シリカ,動物用栄養補助食品,ペット ケイ素,シリカ水 定期便,ペット シリカ 縛りなし,ペットサプリ 返金保証,獣医師監修 ペットサプリ,国産 ペットサプリ,無添加 ペットサプリ,高齢犬 サプリ,高齢猫 サプリ',
  openGraph: {
    title: 'ココペリ｜シニア犬・シニア猫のための動物用栄養補助食品',
    description: `獣医師監修・臨床使用10年。水溶性ケイ素10,000mg/Lの国産シンプル処方。定期便 月${formatYen(SUBSCRIPTION_PRICE)}・送料無料・縛りなし／30日間全額返金保証。`,
    locale: 'ja_JP',
    type: 'website',
    url: 'https://kokopelli-ec.vercel.app/',
    siteName: 'ココペリ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ココペリ｜シニア犬・シニア猫のための動物用栄養補助食品',
    description: `獣医師監修・臨床使用10年。定期便 月${formatYen(SUBSCRIPTION_PRICE)}・送料無料・縛りなし／30日間全額返金保証。`,
  },
  alternates: {
    canonical: 'https://kokopelli-ec.vercel.app/',
  },
};

/* ───────────── 共通CTAボタン ───────────── */
function CTAButton({
  size = 'lg',
  label,
  plan = 'set',
}: {
  size?: 'lg' | 'md';
  label?: string;
  plan?: 'trial' | 'set' | 'bulk' | 'subscription';
}) {
  const cls = size === 'lg' ? 'px-10 py-5 text-lg md:text-xl' : 'px-8 py-4 text-base md:text-lg';
  const text = label ?? `2本セット ${formatYen(BUNDLE_2_PRICE)}（送料無料）で始める →`;
  return (
    <div className="flex flex-col items-center">
      <MagneticButton>
        <Link
          href={`/checkout?plan=${plan}`}
          className={`inline-flex items-center justify-center bg-gradient-to-r from-amber-600 to-amber-500 text-white ${cls} rounded-full font-black shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 text-center leading-tight`}
        >
          {text}
        </Link>
      </MagneticButton>
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 mt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="text-amber-500">&#10003;</span> 30日間全額返金保証
        </span>
        <span className="flex items-center gap-1">
          <span className="text-amber-500">&#10003;</span> 2本セット以上 送料無料
        </span>
        <span className="flex items-center gap-1">
          <span className="text-amber-500">&#10003;</span> カード情報は保存されません
        </span>
      </div>
    </div>
  );
}

/* ───────────── FAQ アコーディオン ───────────── */
function FAQAccordion({ items }: { items: [string, string][] }) {
  return (
    <div className="space-y-3">
      {items.map(([q, a]) => (
        <details
          key={q}
          className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-bold text-blue-950 hover:bg-slate-50/50 transition-colors">
            <span>Q. {q}</span>
            <span className="text-amber-500 text-xl transition-transform group-open:rotate-45 shrink-0 ml-4">
              +
            </span>
          </summary>
          <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
            A. {a}
          </div>
        </details>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <PixelEvents />
      <ScrollProgress />

      {/* ============ Header ============ */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <KokopelliLogo />
            <div>
              <span className="font-black text-slate-900 tracking-wide">kokopelli</span>
              <span className="block text-xs text-gray-500 font-bold leading-none">
                犬・猫のための動物用栄養補助食品
              </span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-600">
            <a href="#concerns" className="hover:text-amber-700 transition-colors">
              お悩み
            </a>
            <a href="#features" className="hover:text-amber-700 transition-colors">
              特徴
            </a>
            <a href="#howto" className="hover:text-amber-700 transition-colors">
              使い方
            </a>
            <a href="#pricing" className="hover:text-amber-700 transition-colors">
              価格
            </a>
            <a href="#faq" className="hover:text-amber-700 transition-colors">
              FAQ
            </a>
            <Link href="/blog" className="hover:text-amber-700 transition-colors">
              ブログ
            </Link>
            <Link href="/login" className="hover:text-amber-700 transition-colors">
              マイページ
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-bold text-gray-600 hover:text-amber-700 transition-colors hidden sm:block"
            >
              マイページ
            </Link>
            <Link
              href="/checkout"
              className="bg-gradient-to-r from-slate-800 to-slate-700 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              購入する
            </Link>
          </div>
        </div>
      </header>

      {/* ============================================================
          1. ファーストビュー — PASONA構成 / モバイル1画面最適化
          ============================================================ */}
      {/* 訴求バー（常時視認・CTR底上げ） */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white text-center py-2 px-4">
        <p className="text-xs md:text-sm font-bold tracking-wide">
          公式ストア限定 ── 2本セット以上で
          <span className="underline underline-offset-2">送料無料</span>
          <span className="mx-2">+</span>30日間
          <span className="underline underline-offset-2">全額返金保証</span>
        </p>
      </div>

      <section className="relative min-h-[92vh] md:min-h-[85vh] flex items-center overflow-hidden">
        {/* 背景: ペットと飼い主の写真 */}
        <div className="absolute inset-0">
          <Image
            src="/images/pet-dog-owner.jpg"
            alt="愛犬と飼い主が一緒に過ごす幸せな時間"
            fill
            className="object-cover"
            priority
          />
          {/* 写真を活かしつつ可読性を確保したマスク (白マスクを大幅に薄く) */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/55 to-white/25 md:bg-gradient-to-r md:from-white/85 md:via-white/45 md:to-transparent" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-10 md:py-24 w-full">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* テキスト側 */}
            <div className="flex-1 w-full">
              {/* ❶ Problem — 飼い主の心の声に刺す（PASOの P） */}
              <p className="inline-block bg-slate-900 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full mb-4">
                シニア犬・シニア猫の飼い主様へ
              </p>

              {/* メインコピー — PAS 3段で一気に引き込む */}
              <h1 className="text-[28px] sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.2] mb-4 tracking-tight">
                <TextReveal
                  text="「最近、元気ないかも…」"
                  className="block text-slate-700 text-xl sm:text-2xl md:text-3xl font-bold mb-2"
                />
                <TextReveal text="この子との毎日を、" className="block" delay={0.15} />
                <TextReveal text="1日でも長く。" className="block text-amber-600" delay={0.3} />
              </h1>

              {/* ❷ Solution — 1文で何者かを理解させる */}
              <p className="text-[15px] md:text-lg text-slate-700 mb-5 leading-relaxed max-w-lg">
                動物病院で<strong className="text-slate-900">10年</strong>使われてきた、 高濃度
                <strong className="text-amber-700">水溶性ケイ素 10,000mg/L</strong>。 いつもの食事に
                <strong className="text-slate-900">数滴たらすだけ</strong>。
              </p>

              {/* トラストバッジ 3連（コンパクト化） */}
              <div className="grid grid-cols-3 gap-2 mb-5 max-w-md">
                <div className="bg-white/95 border border-slate-200 rounded-xl px-1 py-2 text-center shadow-sm">
                  <p className="text-[10px] text-gray-500 leading-none mb-1">MADE IN</p>
                  <p className="text-[13px] font-black text-slate-800 leading-none">国産</p>
                  <p className="text-[10px] text-gray-500 leading-none mt-1">宮崎県製造</p>
                </div>
                <div className="bg-white/95 border border-blue-200 rounded-xl px-1 py-2 text-center shadow-sm">
                  <p className="text-[10px] text-blue-600 leading-none mb-1">VET</p>
                  <p className="text-[13px] font-black text-slate-800 leading-none">獣医師監修</p>
                  <p className="text-[10px] text-gray-500 leading-none mt-1">臨床使用10年</p>
                </div>
                <div className="bg-white/95 border border-amber-200 rounded-xl px-1 py-2 text-center shadow-sm">
                  <p className="text-[10px] text-amber-600 leading-none mb-1">REPORT</p>
                  <p className="text-[13px] font-black text-slate-800 leading-none">学会報告</p>
                  <p className="text-[10px] text-gray-500 leading-none mt-1">症例あり</p>
                </div>
              </div>

              {/* ❸ Offer — 価格・保証を強く・大きく */}
              <div className="bg-white border-2 border-amber-500 rounded-2xl px-4 py-4 mb-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white flex flex-col items-center justify-center shadow-md">
                    <span className="text-[10px] font-bold leading-none">30日間</span>
                    <span className="text-[11px] font-black leading-none mt-0.5">全額</span>
                    <span className="text-[11px] font-black leading-none">返金</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] text-amber-700 font-bold leading-none mb-1">
                      まずは1本からお試し
                    </p>
                    <p className="text-slate-900 font-black leading-tight">
                      <span className="text-amber-600 text-[32px] md:text-[36px] leading-none">
                        {formatYen(SINGLE_PRICE)}
                      </span>
                      <span className="text-sm ml-1 text-slate-600">（税込・1本から）</span>
                    </p>
                    <p className="text-gray-600 text-[11px] mt-1 leading-snug">
                      合わなければ返金OK・継続義務なし・定期縛りなし
                    </p>
                  </div>
                </div>
              </div>

              {/* ❹ Action — CTA（tap target 56px以上・ビビッドオレンジ） */}
              <CTAButton size="lg" />

              {/* 価格バリエーション — 選択肢を可視化（離脱防止） */}
              <p className="mt-3 text-xs md:text-sm text-gray-600 text-center md:text-left">
                1本 {formatYen(SINGLE_PRICE)}（送料{formatYen(SHIPPING)}） ／ 2本{' '}
                {formatYen(BUNDLE_2_PRICE)}
                <span className="text-amber-600 font-bold">（送料無料）</span> ／ 定期 月
                {formatYen(SUBSCRIPTION_PRICE)}
              </p>

              {/* セカンダリCTA — 迷っている人のためのLINE相談 */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <a
                  href="https://line.me/R/ti/p/@636yyubo"
                  className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-[#06C755] text-white font-bold text-sm shadow hover:shadow-md transition-all"
                >
                  💬 LINEで無料相談
                </a>
                <span className="text-xs text-gray-500">購入前のご質問もお気軽に</span>
              </div>

              <p className="mt-3 text-[10px] text-gray-400 leading-snug">
                ※
                本品は動物用栄養補助食品であり、医薬品ではありません。効果・効能を保証するものではありません。
              </p>
            </div>

            {/* 商品写真（主役: image-4 パッケージを大きく / 副: 愛用シーン） */}
            <Parallax speed={0.15}>
              <div className="flex gap-3 md:gap-4 items-end">
                <div className="relative w-44 sm:w-56 md:w-80 rounded-3xl overflow-hidden shadow-[0_25px_60px_-10px_rgba(15,23,42,0.45)] ring-1 ring-amber-200/50 bg-white">
                  <Image
                    src="/images/image-4.webp"
                    alt="ココペリ パッケージ正面 - 犬猫用動物用ケイ素濃縮液"
                    width={600}
                    height={1050}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <div className="relative w-28 sm:w-36 md:w-52 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/50">
                  <Image
                    src="/images/image-6.webp"
                    alt="ココペリを愛用する猫"
                    width={500}
                    height={600}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      {/* ============================================================
          Social Proof — Hero直下(LCP外)で安心感を前倒し
          ============================================================ */}
      <SocialProof />

      {/* ============================================================
          信頼バー — 大きな数字
          ============================================================ */}
      <section className="py-10 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { end: 2, unit: 'つだけ', label: '原材料（水・ケイ素）', icon: <LeafIcon /> },
              { end: 10000, unit: 'mg/L', label: '水溶性ケイ素濃度', icon: <DropletsIcon /> },
              { end: 10, unit: '年', label: '製造・臨床の実績', icon: <CalendarCheckIcon /> },
              { end: 0, unit: '無添加', label: '保存料・香料・着色料', icon: <FlaskConicalIcon /> },
            ].map((item) => (
              <FadeInOnScroll key={item.label} delay={0.1}>
                <div className="text-center p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="flex justify-center mb-2">{item.icon}</div>
                  <p className="text-3xl md:text-4xl font-black text-amber-700">
                    {item.end > 0 ? <CountUp end={item.end} duration={1.5} /> : ''}
                    <span className="text-base font-bold ml-1">{item.unit}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{item.label}</p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          初回お試し訴求 — ヒーロー直下のCVRブースター
          ============================================================ */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50 via-white to-amber-50">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInOnScroll>
            <div className="bg-white rounded-3xl shadow-xl border-2 border-amber-300 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white text-center py-2.5 px-4">
                <p className="text-sm font-black tracking-wide">
                  まずは1本から。30日間全額返金保証つきでリスクなくスタート
                </p>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="shrink-0">
                    <Image
                      src="/images/image-4.webp"
                      alt="ココペリ お試し1本"
                      width={120}
                      height={200}
                      className="h-32 md:h-40 w-auto drop-shadow-lg"
                    />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <p className="text-xs font-bold text-amber-600 mb-1">お試し1本（30ml）</p>
                    <p className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
                      {formatYen(SINGLE_PRICE)}
                      <span className="text-sm text-gray-500 font-normal ml-1">税込</span>
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                        <span>&#10003;</span> 2本目から送料無料
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                        <span>&#10003;</span> 定期便は2本セットより
                        {formatYen(BUNDLE_2_PRICE - SUBSCRIPTION_PRICE)}おトク
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                        <span>&#10003;</span> 継続義務なし
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      初回1本だけでOK。飲ませなくても
                      <strong className="text-amber-700">30日間全額返金保証</strong>
                      なので、まずは気軽にお試しいただけます。
                    </p>
                  </div>
                  <div className="shrink-0 w-full md:w-auto">
                    <Link
                      href="/checkout?plan=trial"
                      className="block w-full md:w-auto text-center bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-full font-black text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    >
                      1本だけ試す →
                    </Link>
                    <p className="text-[10px] text-gray-400 text-center mt-2">
                      送料{formatYen(SHIPPING)} / カード決済
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ============================================================
          2. 問題提起 — アイコン+短文で「こんなお悩みありませんか？」
          ============================================================ */}
      <section id="concerns" className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInOnScroll>
            <p className="text-center text-sm font-black text-amber-600 tracking-widest mb-3">
              FOR SENIOR PETS
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 text-center">
              こんなお悩み、ありませんか？
            </h2>
          </FadeInOnScroll>

          {/* 写真 + アイコングリッド */}
          <div className="flex flex-col md:flex-row gap-8 items-center mt-12">
            {/* 左: シニアペット写真 */}
            <FadeInOnScroll direction="left">
              <div className="w-full md:w-80 shrink-0 space-y-4">
                <div className="group rounded-3xl overflow-hidden shadow-xl ring-1 ring-amber-100">
                  <Image
                    src="/images/pet-dog-senior.jpg"
                    alt="シニア犬の様子"
                    width={500}
                    height={620}
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="group rounded-3xl overflow-hidden shadow-xl ring-1 ring-amber-100">
                  <Image
                    src="/images/pet-cat-senior.jpg"
                    alt="シニア猫の様子"
                    width={500}
                    height={620}
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </FadeInOnScroll>

            {/* 右: アイコン + 短文 */}
            <div className="flex-1">
              <StaggerContainer
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                staggerDelay={0.06}
              >
                {[
                  { text: '夜中に鳴き続ける', sub: '飼い主も眠れない日々', icon: <MoonIcon /> },
                  { text: 'ウロウロ歩き回る', sub: '落ち着きがなくなった', icon: <RotateCwIcon /> },
                  { text: '反応が鈍くなった', sub: '呼びかけに応じない', icon: <CircleOffIcon /> },
                  {
                    text: '食欲が減ってきた',
                    sub: '体重も落ちてきた',
                    icon: <UtensilsCrossedIcon />,
                  },
                  { text: '散歩で座り込む', sub: '途中で動かなくなる', icon: <PawPrintIcon /> },
                  { text: '毛並みに元気がない', sub: 'ツヤがなくパサつく', icon: <SparklesIcon /> },
                  { text: '寝てる時間が増えた', sub: '遊ばなくなった', icon: <BedDoubleIcon /> },
                  {
                    text: 'なんとなく老いを感じる',
                    sub: '以前と比べて衰えが',
                    icon: <ClockIcon />,
                  },
                ].map((item) => (
                  <StaggerItem key={item.text}>
                    <GlowCard className="flex items-center gap-3 bg-amber-50/50 rounded-xl p-4 border border-amber-100 h-full">
                      <span className="shrink-0">{item.icon}</span>
                      <div>
                        <span className="font-bold text-gray-800 text-sm block">{item.text}</span>
                        <span className="text-xs text-gray-500">{item.sub}</span>
                      </div>
                    </GlowCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <FadeInOnScroll>
                <div className="mt-6 bg-slate-50 rounded-xl p-5 border border-slate-200 text-center">
                  <p className="text-slate-900 font-bold mb-3">
                    ひとつでも当てはまるなら、「健康維持」を見直すタイミングかもしれません。
                  </p>
                  {/* CTA #2 */}
                  <CTAButton size="md" />
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ペット体質診断 ============ */}
      <PetDiagnosis />

      {/* ============================================================
          3. 解決策 — 成分図解（原材料2つだけ）
          ============================================================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* 左: 写真ギャラリー */}
            <Parallax speed={0.2}>
              <div className="w-64 md:w-96 shrink-0">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100 mb-4">
                  <Image
                    src="/images/image-7.webp"
                    alt="ココペリを見つめる猫"
                    width={480}
                    height={576}
                    className="w-full h-auto"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl overflow-hidden shadow-md border border-gray-100">
                    <Image
                      src="/images/pet-cat-happy.jpg"
                      alt="元気な猫"
                      width={240}
                      height={240}
                      className="w-full h-auto aspect-square object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-md border border-gray-100">
                    <Image
                      src="/images/pet-dog-happy.jpg"
                      alt="元気な犬"
                      width={240}
                      height={240}
                      className="w-full h-auto aspect-square object-cover"
                    />
                  </div>
                </div>
              </div>
            </Parallax>

            {/* 右: テキスト + 成分図解 */}
            <FadeInOnScroll direction="right">
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-amber-700 font-bold text-xs mb-4">
                  ココペリとは
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                  「幸せをはこぶ精霊」の名を持つ
                  <br />
                  ケイ素濃縮液。
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  原材料はたった2つ。余計なものを一切加えないシンプル処方だから、
                  毎日安心して続けていただけます。
                </p>

                {/* 成分図解 */}
                <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200 mb-6">
                  <p className="text-xs font-bold text-amber-600 mb-4 tracking-widest text-center">
                    INGREDIENTS --- たった2つの原材料
                  </p>
                  <div className="flex items-center justify-center gap-4 md:gap-8">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2 border-2 border-blue-200 shadow-sm">
                        <DropletsIcon />
                      </div>
                      <p className="font-bold text-gray-800 text-sm">水</p>
                    </div>
                    <span className="text-3xl text-gray-300 font-light">+</span>
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2 border-2 border-amber-200 shadow-sm">
                        <GemIcon />
                      </div>
                      <p className="font-bold text-gray-800 text-sm">ケイ素</p>
                      <p className="text-xs text-amber-600 font-bold">10,000mg/L</p>
                    </div>
                    <span className="text-3xl text-gray-300 font-light">=</span>
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-50 to-blue-100 flex items-center justify-center mx-auto mb-2 border-2 border-amber-300 shadow-sm">
                        <span className="font-black text-amber-700 text-[10px]">kokopelli</span>
                      </div>
                      <p className="font-bold text-gray-800 text-sm">ココペリ</p>
                      <p className="text-xs text-gray-500">それだけ。</p>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    {['保存料なし', '香料なし', '着色料なし', '添加物なし'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white text-amber-700 text-xs font-bold border border-amber-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* ============================================================
          特徴 3カード — 写真付き
          ============================================================ */}
      <section id="features" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInOnScroll>
            <p className="text-center text-xs font-black text-amber-600 tracking-widest mb-3">
              WHY KOKOPELLI
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 text-center">
              ココペリが選ばれる3つの理由
            </h2>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.1}>
            <p className="text-gray-600 text-center mb-12 text-lg">
              シンプルだから、続けやすい。続けやすいから、実感しやすい。
            </p>
          </FadeInOnScroll>
          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
            {[
              {
                num: '01',
                title: '高濃度ケイ素 10,000mg/L',
                desc: '水溶性ケイ素を高濃度に含有。骨・関節・被毛・皮膚の構成要素として知られるミネラル。食事に数滴混ぜるだけ。',
                icon: <DropletsIcon />,
                img: '/images/supplement-bottle.jpg',
                imgAlt: 'ココペリのボトル',
              },
              {
                num: '02',
                title: '原材料たった2つ',
                desc: '「水」と「ケイ素」のみ。添加物・保存料・香料は一切不使用。デリケートなシニアペットにも安心。',
                icon: <LeafIcon />,
                img: '/images/image-11.webp',
                imgAlt: '原材料表示',
              },
              {
                num: '03',
                title: '全成分・全表示を公開',
                desc: '外箱の表示をすべて公開。成分値・給与方法・注意事項まで購入前に確認できます。',
                icon: <ClipboardListIcon />,
                img: '/images/image-12.webp',
                imgAlt: '成分表示の公開',
              },
            ].map((f) => (
              <StaggerItem key={f.title}>
                <GlowCard className="bg-white rounded-2xl border border-gray-100 shadow-sm h-full overflow-hidden">
                  <div className="h-44 overflow-hidden">
                    <Image
                      src={f.img}
                      alt={f.imgAlt}
                      width={400}
                      height={260}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="shrink-0">{f.icon}</span>
                      <span className="text-xs font-black text-amber-400">{f.num}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================================
          ケイ素とは — アイコン付き
          ============================================================ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInOnScroll>
            <p className="text-center text-xs font-black text-amber-600 tracking-widest mb-3">
              ABOUT SILICON
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 text-center">
              ケイ素（シリカ）とは？
            </h2>
          </FadeInOnScroll>
          <p className="text-gray-600 text-center mb-12 text-lg">
            体内のあらゆる場所で働くミネラル。年齢とともに減少していきます。
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'コラーゲン生成に関与',
                desc: '骨・関節・皮膚・被毛の構造を支えるコラーゲンの合成過程に関わるミネラル。',
                icon: <BoneIcon />,
                bg: 'from-blue-50 to-white',
              },
              {
                title: 'ミトコンドリアに存在',
                desc: '細胞のエネルギー産生を担うミトコンドリアにも存在。研究で報告されています。',
                icon: <MicroscopeIcon />,
                bg: 'from-slate-50 to-white',
              },
              {
                title: '被毛・皮膚・爪の構成要素',
                desc: '加齢とともに体内のケイ素量は減少。外部からの補給が注目されています。',
                icon: <SparklesAltIcon />,
                bg: 'from-amber-50 to-white',
              },
              {
                title: '体内で生成できない',
                desc: '必須微量元素でありながら体内合成不可。水溶性ケイ素は吸収効率に優れた形態です。',
                icon: <GemIcon />,
                bg: 'from-purple-50 to-white',
              },
            ].map((item) => (
              <FadeInOnScroll key={item.title}>
                <div
                  className={`bg-gradient-to-br ${item.bg} rounded-2xl p-6 border border-gray-100 flex gap-4 items-start`}
                >
                  <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-gray-100">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-8">
            ※
            上記はケイ素（シリカ）というミネラルの一般的な情報であり、本製品の効能効果を示すものではありません。
          </p>
        </div>
      </section>

      {/* ============================================================
          製品情報 + パッケージギャラリー
          ============================================================ */}
      <section id="product" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInOnScroll>
            <p className="text-center text-xs font-black text-amber-600 tracking-widest mb-3">
              PRODUCT
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 text-center">
              製品情報
            </h2>
          </FadeInOnScroll>
          <p className="text-gray-600 text-center mb-12 text-lg">
            パッケージ表示のすべてを、購入前にご確認いただけます。
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { src: '/images/image-4.webp', alt: 'ココペリ パッケージ正面', w: 400, h: 700 },
              { src: '/images/image-5.webp', alt: 'ココペリ パッケージ側面', w: 300, h: 400 },
              { src: '/images/image-11.webp', alt: 'ココペリ 原材料・給与方法', w: 300, h: 400 },
              { src: '/images/image-12.webp', alt: 'ココペリ 注意事項・製造情報', w: 300, h: 400 },
            ].map((img) => (
              <FadeInOnScroll key={img.src}>
                <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white hover:shadow-lg transition-shadow">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.w}
                    height={img.h}
                    className="w-full h-auto"
                  />
                </div>
              </FadeInOnScroll>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden max-w-2xl mx-auto">
            <div className="divide-y divide-gray-100">
              {[
                ['製品分類', '動物用栄養補助食品'],
                ['商品名', 'ココペリ（Kokopelli）'],
                ['主成分', '水溶性ケイ素 10,000mg/L'],
                ['その他成分', 'カリウムイオン 470mg/L'],
                ['内容量', '30ml'],
                ['原材料', '水、ケイ素'],
                ['対象動物', '犬・猫（年齢不問）'],
                ['給与方法', '1日1回、食事に数滴混ぜる。またはディスポ容器で直接与える'],
                ['保管方法', '直射日光を避け、常温保存'],
                ['容器', 'ガラス瓶'],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col sm:flex-row px-6 py-4">
                  <span className="font-bold text-gray-900 sm:w-40 shrink-0">{label}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          学会報告症例
          ============================================================ */}
      <section id="evidence" className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInOnScroll>
            <p className="text-center text-xs font-black text-amber-600 tracking-widest mb-3">
              CLINICAL REPORT
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 text-center">
              学会報告症例
            </h2>
          </FadeInOnScroll>
          <p className="text-gray-600 text-center mb-12 text-lg">
            学会で症例報告がなされた、学術的にも報告に値する製品です。
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tag: '症例1 --- 夜間の落ち着き・歩行',
                animal: '柴犬MIX（18歳10か月）',
                year: '2019年 学会報告症例',
                steps: [
                  { color: 'bg-red-400', time: '来院時', text: '夜鳴きが激しく、寝たきりの状態' },
                  { color: 'bg-amber-400', time: '10日後', text: '夜間の落ち着きに変化' },
                  { color: 'bg-amber-500', time: '40日後', text: '介助下での起立・歩行が可能に' },
                ],
              },
              {
                tag: '症例2 --- 長期経過',
                animal: '日本猫（推定11歳）',
                year: '2019年 学会報告症例',
                steps: [
                  { color: 'bg-red-400', time: '来院時', text: '目元の状態について来院' },
                  {
                    color: 'bg-amber-500',
                    time: '270日後',
                    text: '写真とともに変化が確認された例',
                  },
                ],
              },
              {
                tag: '症例3 --- 起立・歩行',
                animal: 'ラブラドール（10歳）',
                year: '2023年 学会報告症例',
                steps: [
                  { color: 'bg-red-400', time: '来院時', text: '起立が難しく、台車で来院' },
                  { color: 'bg-amber-400', time: '3日後', text: '立ち上がりや歩行に変化' },
                  { color: 'bg-amber-500', time: '10日後', text: 'より安定した足取りに' },
                ],
              },
            ].map((c) => (
              <FadeInOnScroll key={c.tag}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
                  <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-5">
                    <span className="inline-flex px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs mb-3">
                      {c.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white">{c.animal}</h3>
                    <p className="text-amber-200 text-xs mt-1">{c.year}</p>
                  </div>
                  <div className="p-5 space-y-4">
                    {c.steps.map((s) => (
                      <div key={s.time} className="flex gap-3">
                        <div className={`w-2 h-2 rounded-full ${s.color} mt-2 shrink-0`} />
                        <div>
                          <span className="font-bold text-gray-900 text-sm">{s.time}</span>
                          <p className="text-gray-600 text-xs mt-1">{s.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            ※
            上記は学会で報告された個別症例の要点整理です。すべての犬猫に同様の変化が見られることを保証するものではありません。
            本品は動物用栄養補助食品であり、医薬品ではありません。
          </p>
        </div>
        <div className="text-center mt-10">
          <CTAButton size="md" />
        </div>
      </section>

      {/* ============ 動物病院での取り扱い + 獣医師証言 ============ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInOnScroll>
            <p className="text-center text-xs font-black text-amber-600 tracking-widest mb-3">
              獣医師の声
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-3 text-center">
              獣医師が<span className="text-amber-600">10年</span>使ってきた
              <br className="md:hidden" />
              水溶性ケイ素濃縮液
            </h2>
            <p className="text-center text-gray-600 mb-8 text-sm md:text-base">
              宮崎・都井岬の野生馬を診る獣医師が、臨床現場で取り入れてきたペット用シリカサプリ。
            </p>
          </FadeInOnScroll>

          {/* シネマティック・バナー — 都井岬の野生馬と相良獣医師 */}
          <FadeInOnScroll>
            <figure className="mb-10 rounded-3xl overflow-hidden shadow-2xl border border-white">
              <Image
                src="/images/dr-sagara-toi-misaki-16x9.webp"
                alt="さがら動物病院 相良獣医師 — 宮崎・都井岬の野生馬を診る現場"
                width={1920}
                height={1080}
                className="w-full h-auto"
                priority={false}
              />
              <figcaption className="bg-slate-900 text-white px-5 py-3 text-xs md:text-sm leading-relaxed">
                <strong className="text-amber-300">宮崎・都井岬</strong> —
                国の天然記念物に指定された野生馬「御崎馬」と、現地で診療にあたる相良獣医師。
              </figcaption>
            </figure>
          </FadeInOnScroll>

          <FadeInOnScroll>
            <div className="max-w-3xl mx-auto">
              {/* 証言カード */}
              <div className="flex flex-col gap-5">
                <blockquote className="relative bg-white rounded-3xl p-7 md:p-8 border border-amber-200 shadow-lg">
                  <span className="absolute -top-3 left-7 bg-amber-500 text-white text-xs font-black px-3 py-1 rounded-full tracking-widest">
                    獣医師コメント
                  </span>
                  <svg
                    className="absolute top-5 right-6 w-10 h-10 text-amber-100"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M9.5 7c-3 0-5.5 2.5-5.5 5.5v4.5h5v-5h-2c0-1.5 1.5-3 2.5-3v-2zm9 0c-3 0-5.5 2.5-5.5 5.5v4.5h5v-5h-2c0-1.5 1.5-3 2.5-3v-2z" />
                  </svg>
                  <p className="text-gray-800 leading-relaxed text-[15px] md:text-base mb-3">
                    都井岬で野生馬を診ていると、動物たちが水質を選んで飲む姿に、いつも気づかされます。
                  </p>
                  <p className="text-gray-800 leading-relaxed text-[15px] md:text-base mb-3">
                    ココペリは<strong className="text-amber-700">水と水溶性ケイ素だけの液体</strong>
                    で、10年にわたって私の臨床現場で取り入れてきたシリカサプリです。
                  </p>
                  <p className="text-gray-800 leading-relaxed text-[15px] md:text-base">
                    シニア期のワンちゃん・猫ちゃんの<strong>毎日の食事サポート</strong>
                    として、飼い主様におすすめしています。
                  </p>
                  <p className="mt-5 text-right text-sm text-gray-600">
                    — さがら動物病院 <strong className="text-gray-900">相良獣医師</strong>
                    <span className="block text-xs text-gray-500 mt-1">
                      宮崎県・都井岬の野生馬を診療 / 水溶性ケイ素の臨床使用10年
                    </span>
                  </p>
                </blockquote>

                {/* 客観事実3点 */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white rounded-2xl px-3 py-4 border border-slate-200 text-center shadow-sm">
                    <p className="text-amber-600 text-xs font-bold tracking-wider mb-1">臨床実績</p>
                    <p className="text-2xl font-black text-slate-900 leading-none">
                      10<span className="text-base">年</span>
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1 leading-tight">臨床使用の実績</p>
                  </div>
                  <div className="bg-white rounded-2xl px-3 py-4 border border-slate-200 text-center shadow-sm">
                    <p className="text-amber-600 text-xs font-bold tracking-wider mb-1">学会報告</p>
                    <p className="text-2xl font-black text-slate-900 leading-none">
                      2<span className="text-base">回</span>
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1 leading-tight">学会での症例報告</p>
                  </div>
                  <div className="bg-white rounded-2xl px-3 py-4 border border-slate-200 text-center shadow-sm">
                    <p className="text-amber-600 text-xs font-bold tracking-wider mb-1">産地</p>
                    <p className="text-2xl font-black text-slate-900 leading-none">宮崎</p>
                    <p className="text-[11px] text-gray-500 mt-1 leading-tight">シリカラボが製造</p>
                  </div>
                </div>

                {/* 補足ノート */}
                <div className="bg-slate-900 text-white rounded-2xl p-5 text-sm leading-relaxed">
                  <p className="mb-1">
                    <strong className="text-amber-300">これまで動物病院経由のみ</strong>
                    で流通していた製品です。
                  </p>
                  <p className="text-slate-300">
                    オンラインでの一般販売は始まったばかり。製造元
                    <strong className="text-white">株式会社シリカラボ</strong>
                    （宮崎県都城市）から直送します。
                  </p>
                </div>

                <p className="text-xs text-gray-500">
                  ※
                  本コメントは獣医師の臨床経験に基づく所見であり、製品の効能効果を保証するものではありません。
                  本品は動物用栄養補助食品であり、医薬品ではありません。
                </p>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ============================================================
          競合比較 — 水道水・市販ミネラル水・ペット用水との比較表
          ============================================================ */}
      <ComparisonTable
        title="他の水と、何が違うの？"
        lead="一般的なペット向け水との違いを、フラットにまとめました。"
      />

      {/* ============================================================
          4. 使い方 — 3ステップ図解
          ============================================================ */}
      <section id="howto" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInOnScroll>
            <p className="text-center text-xs font-black text-amber-600 tracking-widest mb-3">
              HOW TO USE
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 text-center">
              かんたん3ステップ
            </h2>
          </FadeInOnScroll>
          <p className="text-gray-600 text-center mb-12 text-lg">
            毎日のごはんに数滴加えるだけ。手間なく続けられます。
          </p>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.15}>
            {[
              {
                step: 'STEP 1',
                title: 'シリンジで数滴取る',
                desc: '付属のシリンジ（注射針なし）でココペリを数滴取ります。',
                icon: <PipetteIcon />,
                img: '/images/supplement-bottle.jpg',
              },
              {
                step: 'STEP 2',
                title: 'フードに混ぜる or 直接',
                desc: 'フードにしみこませるか、口元に直接数滴たらします。味・匂いがほぼないので嫌がりません。',
                icon: <CookieIcon />,
                img: '/images/pet-dog-water.jpg',
              },
              {
                step: 'STEP 3',
                title: '毎日続ける',
                desc: '1日1回を目安に継続。まずは1〜2ヶ月お試しください。',
                icon: <CalendarCheckIcon />,
                img: '/images/pet-cat-owner.jpg',
              },
            ].map((s) => (
              <StaggerItem key={s.step}>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
                  <div className="h-44 overflow-hidden relative">
                    <Image
                      src={s.img}
                      alt={s.title}
                      width={400}
                      height={260}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-black shadow">
                      {s.step}
                    </div>
                  </div>
                  <div className="p-5 text-center">
                    <div className="w-14 h-14 rounded-full bg-slate-50 border-2 border-amber-200 flex items-center justify-center mx-auto mb-3">
                      {s.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-600">{s.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* 給与量テーブル */}
          <FadeInOnScroll>
            <div className="mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden max-w-2xl mx-auto">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-4 text-center">
                <p className="text-white font-bold">
                  基本目安: 体重1kgあたり <span className="text-2xl">0.1cc</span> / 日
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  ['小型犬（〜5kg）', '0.3〜0.5cc', '1〜2滴'],
                  ['中型犬（5〜15kg）', '0.5〜1.5cc', '3〜5滴'],
                  ['大型犬（15kg〜）', '1.5〜3.0cc', '5〜10滴'],
                  ['猫（3〜5kg）', '0.3〜0.5cc', '1〜2滴'],
                ].map(([animal, amount, drops]) => (
                  <div key={animal} className="flex items-center px-6 py-4">
                    <span className="font-bold text-gray-900 w-44 shrink-0 text-sm">{animal}</span>
                    <span className="text-gray-600 w-32 text-sm">{amount}</span>
                    <span className="text-amber-600 font-bold text-sm">{drops}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInOnScroll>
          <div className="max-w-2xl mx-auto mt-4 bg-amber-50 rounded-xl p-4 border border-amber-100">
            <p className="text-sm text-amber-800">
              <strong>はじめての方へ:</strong>{' '}
              最初の1週間は半量からスタートし、様子を見ながら徐々に増やしてください。
            </p>
          </div>

          {/* CTA #3 */}
          <div className="text-center mt-10">
            <CTAButton size="lg" />
          </div>
        </div>
      </section>

      {/* ============ 商品ビジュアル帯 ============ */}
      <section className="py-8 bg-white overflow-hidden">
        <FadeInOnScroll>
          <div className="flex gap-4 justify-center items-center max-w-5xl mx-auto px-4">
            {[
              { src: '/images/image-1.webp', alt: 'ココペリ パッケージ正面' },
              { src: '/images/image-2.webp', alt: 'ココペリ パッケージ側面' },
              { src: '/images/image-8.webp', alt: 'ココペリ 外箱' },
              { src: '/images/image-3.webp', alt: 'ココペリ ロゴ' },
            ].map((img) => (
              <div
                key={img.src}
                className="w-32 md:w-40 rounded-xl overflow-hidden shadow-md border border-gray-100 shrink-0"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={200}
                  height={280}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </FadeInOnScroll>
      </section>

      {/* ============================================================
          5. 価格セクション — カード型
          ============================================================ */}
      <section id="pricing" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInOnScroll>
            <p className="text-center text-xs font-black text-amber-600 tracking-widest mb-3">
              PRICING
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 text-center">
              お求めやすい価格で
            </h2>
          </FadeInOnScroll>
          <p className="text-gray-600 text-center mb-12 text-lg">
            毎月の習慣にする定期便が一番おトク。回数縛りなし・30日返金保証付きで安心。
          </p>

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            staggerDelay={0.1}
          >
            {/* 定期便 — 最も選ばれているプラン (HERO) */}
            <StaggerItem>
              <div className="relative bg-gradient-to-b from-amber-600 to-amber-500 rounded-2xl border-2 border-amber-400 shadow-xl p-6 text-center h-full flex flex-col">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-1 rounded-full text-xs font-black shadow whitespace-nowrap">
                  最も選ばれているプラン
                </div>
                <div className="w-16 h-16 mx-auto mb-3 mt-2 rounded-full bg-white/20 flex items-center justify-center">
                  <CalendarCheckIcon />
                </div>
                <p className="text-sm font-bold text-amber-100 mb-1">定期便</p>
                <h3 className="text-xl font-black text-white mb-1">毎月2本</h3>
                <p className="text-xs text-amber-200 mb-4">30ml x 2本 / 月</p>
                <p className="text-4xl font-black text-white mb-1">
                  {formatYen(SUBSCRIPTION_PRICE)}
                  <span className="text-lg">/月</span>
                </p>
                <p className="text-xs text-amber-200 mb-1">送料無料</p>
                <p className="text-white text-sm font-bold mb-2">
                  1本あたり {formatYen(PER_BOTTLE_SUBSCRIPTION)}
                </p>
                <p className="text-amber-100 text-xs font-bold mb-6">
                  2本セット毎月買うより 年{formatYen((BUNDLE_2_PRICE - SUBSCRIPTION_PRICE) * 12)}
                  おトク
                </p>
                <ul className="text-sm text-amber-50 text-left space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-0.5 shrink-0">&#10003;</span>
                    <span>送料無料・毎月自動でお届け</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-0.5 shrink-0">&#10003;</span>
                    <span>回数縛りなし・いつでも解約OK</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-0.5 shrink-0">&#10003;</span>
                    <span>30日間返金保証付きで安心</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-0.5 shrink-0">&#10003;</span>
                    <span>注文の手間ゼロ・買い忘れ防止</span>
                  </li>
                </ul>
                <Link
                  href="/checkout?plan=subscription"
                  className="block w-full bg-white text-amber-700 py-3.5 rounded-full font-black text-base shadow-lg hover:shadow-xl transition-all"
                >
                  今すぐ始める →
                </Link>
              </div>
            </StaggerItem>

            {/* 5+1セット — 一番おトク */}
            <StaggerItem>
              <div className="relative bg-gradient-to-b from-slate-800 to-slate-700 rounded-2xl border-2 border-amber-500 shadow-xl p-6 text-center h-full flex flex-col">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-xs font-black shadow">
                  まとめ買い最安
                </div>
                <div className="w-28 h-28 mx-auto mb-3 mt-2 rounded-2xl bg-white/20 backdrop-blur ring-1 ring-white/30 flex items-center justify-center overflow-hidden shadow-inner">
                  <Image
                    src="/images/image-4.webp"
                    alt="ココペリ6本"
                    width={160}
                    height={280}
                    className="h-24 w-auto drop-shadow-lg"
                  />
                </div>
                <p className="text-sm font-bold text-amber-100 mb-1">5+1セット</p>
                <h3 className="text-xl font-black text-white mb-1">6本</h3>
                <p className="text-xs text-amber-200 mb-4">30ml x 6本</p>
                <p className="text-4xl font-black text-white mb-1">{formatYen(BUNDLE_6_PRICE)}</p>
                <p className="text-xs text-amber-200 mb-1">送料無料</p>
                <p className="text-amber-300 text-sm font-bold mb-6">
                  1本あたり {formatYen(PER_BOTTLE_BUNDLE_6)}
                </p>
                <ul className="text-sm text-amber-50 text-left space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-300 mt-0.5 shrink-0">&#10003;</span>
                    <span>5本分の価格で6本届く</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-300 mt-0.5 shrink-0">&#10003;</span>
                    <span>送料無料</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-300 mt-0.5 shrink-0">&#10003;</span>
                    <span>多頭飼いの方にもおすすめ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-300 mt-0.5 shrink-0">&#10003;</span>
                    <span>30日間返金保証付き</span>
                  </li>
                </ul>
                <Link
                  href="/checkout?plan=bulk"
                  className="block w-full bg-white text-amber-700 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                >
                  まとめて購入する →
                </Link>
              </div>
            </StaggerItem>

            {/* 2本セット */}
            <StaggerItem>
              <div className="relative bg-white rounded-2xl border-2 border-amber-200 shadow-sm p-6 text-center h-full flex flex-col">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-xs font-black shadow-sm whitespace-nowrap border border-amber-300">
                  単品より送料無料
                </div>
                <div className="w-28 h-28 mx-auto mb-3 mt-2 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center border border-amber-200 overflow-hidden shadow-inner">
                  <Image
                    src="/images/image-4.webp"
                    alt="ココペリ2本セット"
                    width={160}
                    height={280}
                    className="h-24 w-auto drop-shadow-md"
                  />
                </div>
                <p className="text-sm font-bold text-amber-600 mb-1">2本セット</p>
                <h3 className="text-xl font-black text-gray-900 mb-1">2本</h3>
                <p className="text-xs text-gray-500 mb-4">30ml x 2本</p>
                <p className="text-4xl font-black text-gray-900 mb-1">
                  {formatYen(BUNDLE_2_PRICE)}
                </p>
                <p className="text-xs text-gray-500 mb-1">送料無料</p>
                <p className="text-amber-600 text-sm font-bold mb-6">
                  1本あたり {formatYen(PER_BOTTLE_BUNDLE_2)}
                </p>
                <ul className="text-sm text-gray-600 text-left space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5 shrink-0">&#10003;</span>
                    <span>送料無料でおトク</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5 shrink-0">&#10003;</span>
                    <span>中〜大型犬に約1〜2ヶ月分</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5 shrink-0">&#10003;</span>
                    <span>30日間返金保証付き</span>
                  </li>
                </ul>
                <Link
                  href="/checkout?plan=set"
                  className="block w-full bg-white border-2 border-slate-700 text-amber-600 py-3 rounded-full font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  2本セットを購入 →
                </Link>
              </div>
            </StaggerItem>

            {/* 1本 — お試し */}
            <StaggerItem>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center h-full flex flex-col">
                <div className="w-28 h-28 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border border-gray-200 overflow-hidden shadow-inner">
                  <Image
                    src="/images/image-4.webp"
                    alt="ココペリ1本"
                    width={160}
                    height={280}
                    className="h-24 w-auto drop-shadow-md"
                  />
                </div>
                <p className="text-sm font-bold text-gray-500 mb-1">お試し</p>
                <h3 className="text-xl font-black text-gray-900 mb-1">1本</h3>
                <p className="text-xs text-gray-500 mb-4">30ml</p>
                <p className="text-4xl font-black text-gray-900 mb-1">{formatYen(SINGLE_PRICE)}</p>
                <p className="text-xs text-gray-500 mb-6">+ 送料 {formatYen(SHIPPING)}</p>
                <ul className="text-sm text-gray-600 text-left space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5 shrink-0">&#10003;</span>
                    <span>まずは試してみたい方に</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5 shrink-0">&#10003;</span>
                    <span>小型犬・猫なら約2〜4週間分</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5 shrink-0">&#10003;</span>
                    <span>30日間返金保証付き</span>
                  </li>
                </ul>
                <Link
                  href="/checkout?plan=trial"
                  className="block w-full bg-white border-2 border-slate-700 text-amber-600 py-3 rounded-full font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  1本だけ試す →
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <p className="text-center text-xs text-gray-400 mt-6">
            決済はStripe社（世界最大級の決済プラットフォーム）を使用。カード情報は当サイトには保存されません。
          </p>
        </div>
      </section>

      {/* ============ お客様の声 — 写真付き ============ */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInOnScroll>
            <p className="text-center text-xs font-black text-amber-600 tracking-widest mb-3">
              VOICE
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-12 text-center">
              ご愛用者の声
            </h2>
          </FadeInOnScroll>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: '毎日の食事にサッと混ぜるだけで手軽に続けられています。猫たちの毎日の習慣として欠かせない存在になりました。',
                name: '愛猫家の方',
                pet: '猫2匹（12歳・10歳）',
                img: '/images/pet-cat-happy.jpg',
              },
              {
                text: '15歳の犬に毎日あげています。液体なのでフードに混ぜるだけで手間もなく、続けやすいのが気に入っています。',
                name: '愛犬家の方',
                pet: 'トイプードル（15歳）',
                img: '/images/pet-dog-happy.jpg',
              },
              {
                text: 'シニア期に入ってから食欲にムラがありましたが、続けているうちに毎日しっかり食べるようになりました。毛並みも少しふわっとしてきた気がします。',
                name: 'シニア犬の飼い主さま',
                pet: '柴犬（13歳）',
                img: '/images/pet-dog-senior.jpg',
              },
            ].map((v) => (
              <FadeInOnScroll key={v.name}>
                <div className="group bg-white rounded-3xl border border-gray-100 shadow-md hover:shadow-2xl overflow-hidden h-full transition-shadow duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={v.img}
                      alt={v.pet}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/95 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="text-amber-400 text-base mb-3">
                      &#9733;&#9733;&#9733;&#9733;&#9733;
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                      &ldquo;{v.text}&rdquo;
                    </p>
                    <p className="text-sm font-bold text-gray-900">--- {v.name}</p>
                    <p className="text-xs text-gray-500">{v.pet}</p>
                  </div>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            ※ 個人の感想であり、すべての犬猫に同様の結果を保証するものではありません。
          </p>
          <div className="text-center mt-10">
            <CTAButton size="md" />
          </div>
        </div>
      </section>

      {/* ============ 安心・安全 ============ */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInOnScroll>
            <p className="text-center text-xs font-black text-amber-600 tracking-widest mb-3">
              SAFETY
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-12 text-center">
              安心・安全への取り組み
            </h2>
          </FadeInOnScroll>
          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {[
              {
                title: 'シンプル処方',
                desc: '原材料は水とケイ素の2種類のみ。添加物・保存料・香料は一切使用していません。',
                icon: <FlaskConicalIcon />,
              },
              {
                title: '国内製造',
                desc: 'シリカラボが国内で製造・品質管理を行っています。',
                icon: <FactoryIcon />,
              },
              {
                title: '全表示公開',
                desc: '外箱に記載されている成分値・給与方法・注意事項のすべてを購入前に公開しています。',
                icon: <FileCheckIcon />,
              },
              {
                title: '学会での紹介実績',
                desc: '学会にて個別症例が報告されています。',
                icon: <GraduationCapIcon />,
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex gap-4 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-200">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================================
          6. FAQ — アコーディオン形式
          ============================================================ */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <FadeInOnScroll>
            <p className="text-center text-xs font-black text-amber-600 tracking-widest mb-3">
              FAQ
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-12 text-center">
              よくあるご質問
            </h2>
          </FadeInOnScroll>
          <FAQAccordion
            items={[
              [
                '白い結晶のようなものが見えますが大丈夫ですか？',
                '自然のミネラル成分が結晶化したものです。品質に問題はございません。',
              ],
              [
                '若い犬や猫にも使えますか？',
                'はい、年齢を問わずご使用いただけます。日常の健康維持にもお役立ていただけます。',
              ],
              [
                'どのくらいで変化を感じられますか？',
                '個体差がございますが、まずは1〜2ヶ月ほど継続してお試しください。',
              ],
              [
                '他のサプリメントやフードと併用できますか？',
                '食品ですので基本的に併用いただけます。ご心配な場合はかかりつけの獣医師にご相談ください。',
              ],
              [
                '1本でどのくらい持ちますか？',
                '1本30mlです。小型犬・猫の場合は約2〜4週間が目安です。',
              ],
              [
                '犬と猫で与え方は違いますか？',
                '基本的な与え方は同じです。食事に数滴混ぜるか、ディスポ容器で直接与えてください。',
              ],
              [
                '開封後の保存方法は？',
                'キャップをしっかり閉めて常温保存。直射日光は避けてください。',
              ],
              [
                '定期購入はありますか？',
                `月額${formatYen(SUBSCRIPTION_PRICE)}の定期便（2本/月）がございます。5+1セット（${formatYen(BUNDLE_6_PRICE)}・6本届く）なら1本あたり${formatYen(PER_BOTTLE_BUNDLE_6)}と最もおトクです。`,
              ],
              [
                '原材料は何ですか？',
                '水と水溶性ケイ素の2つだけです。着色料・香料・保存料は一切不使用です。',
              ],
              [
                '送料はかかりますか？',
                '2本セット以上送料無料です。3〜5営業日以内に発送いたします。',
              ],
              [
                '飲ませなくても返金してもらえますか？',
                'はい、可能です。開封後・未開封を問わず、到着後30日以内であれば全額返金いたします。お試しいただいて合わないと感じた場合も安心してご返金をお申し出ください。',
              ],
              [
                '定期便はいつでも解約できますか？',
                'はい、いつでも解約可能です。マイページの「支払い方法・プランを管理する」からご自身でいつでも解約手続きができ、メール（timberfrost321@gmail.com）でも承ります。解約金や違約金は一切なく、回数縛りもありません。次回引き落とし日の前日までに解約のお手続きをいただければ、原則、次回分の請求は発生しません。',
              ],
              [
                '多頭飼いの場合、1日の量の目安は？',
                '1頭あたり体重5kgごとに数滴（約0.5ml）が目安です。例：小型犬（3kg）＋猫（4kg）の2頭なら1日合計で約1ml程度。食事に混ぜて与えてください。詳しい量は同梱のパンフレット、またはLINE公式までお気軽にご相談ください。',
              ],
              [
                '副作用はありませんか？',
                '原材料は「水」と「水溶性ケイ素」のみで、添加物・保存料・香料・着色料は一切不使用です。動物病院での臨床使用10年、学会での症例報告も2度実施しており、安全性を確認した上で販売しています。ごく稀に体質により合わない場合もありますので、気になる症状があれば使用を中止し、獣医師にご相談ください。',
              ],
              [
                '老犬・老猫の腎臓が心配です。与えても大丈夫ですか？',
                'ココペリは原材料が「水」と「水溶性ケイ素」のみのシンプル処方で、軟水ベースのため腎臓への負担をかけにくい設計です。ただし、すでに腎臓病の診断を受けているペットや投薬中のペットは、必ずかかりつけの獣医師にご相談のうえご使用ください。',
              ],
              [
                '水をあまり飲まないのですが、どう与えればいいですか？',
                '水を飲まない子には、フードに直接数滴混ぜていただく方法をおすすめします。ウェットフードに混ぜると気付かれにくく、ドライフードをふやかす際にも一緒に加えていただけます。シリンジ（注射針なし）で口の横から少量ずつ与える方法も取り入れやすいです。',
              ],
              [
                'ミネラルウォーターを使っていますが、ココペリと併用しても大丈夫ですか？',
                'はい、併用いただけます。ペット用には「軟水」のミネラルウォーターをお選びいただき、そこにココペリを数滴加える形でご使用ください。海外の硬水（コントレックス等）は犬猫の尿路結石リスクを高める可能性があるため避けてください。',
              ],
              [
                '一度に何頭分か購入したいのですが、おすすめは？',
                `多頭飼いの方には6本セット（5+1・送料無料・${formatYen(BUNDLE_6_PRICE)}）が最もおトクです。1本あたり${formatYen(PER_BOTTLE_BUNDLE_6)}となり、長期保存もできます。月々のコスト管理を重視される場合は、定期便2本/月（${formatYen(SUBSCRIPTION_PRICE)}・送料無料）が安定的に続けやすいプランです。`,
              ],
              [
                'ご満足いただけなかった場合、本当に返金されますか？',
                'はい、ご安心ください。到着後30日以内であれば、開封後・未開封を問わず全額返金いたします。お試しいただいて合わないと感じた場合の他、ご満足いただけなかった場合も対象です。マイページまたはLINE公式から手続きいただけます。',
              ],
            ]}
          />
        </div>
      </section>

      {/* ============================================================
          価格比較 — 動物病院の費用感 vs ココペリ
          ============================================================ */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInOnScroll>
            <p className="text-center text-xs font-black text-amber-600 tracking-widest mb-3">
              COMPARE
            </p>
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 text-center">
              シニアペットの「毎日の健康維持」を考えると
            </h2>
            <p className="text-gray-600 text-center mb-10 text-base">
              1日あたりのコストで比べると、ココペリはとても続けやすい選択肢です。
            </p>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* 左: 動物病院通院の目安 */}
            <FadeInOnScroll direction="left">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 h-full">
                <p className="text-xs font-bold text-gray-400 tracking-wider mb-2">REFERENCE</p>
                <h3 className="text-lg font-black text-gray-700 mb-4">
                  動物病院での健康診断・サプリ処方の目安
                </h3>
                <ul className="space-y-2 text-sm text-gray-600 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 shrink-0">・</span>
                    <span>初診料・診察料：¥1,500〜¥3,000／回</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 shrink-0">・</span>
                    <span>血液検査：¥5,000〜¥10,000／回</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 shrink-0">・</span>
                    <span>処方サプリ：¥3,000〜¥8,000／月</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-400">
                  ※金額は一般的な参考値。動物病院・処方内容により異なります。
                </p>
              </div>
            </FadeInOnScroll>

            {/* 右: ココペリ */}
            <FadeInOnScroll direction="right">
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl border-2 border-amber-400 shadow-xl p-6 h-full text-white">
                <p className="text-xs font-bold text-amber-100 tracking-wider mb-2">KOKOPELLI</p>
                <h3 className="text-lg font-black mb-4">ココペリ（動物用栄養補助食品）</h3>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-start gap-2">
                    <span className="shrink-0">&#10003;</span>
                    <span>定期便：{formatYen(SUBSCRIPTION_PRICE)}／月（2本・送料無料）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0">&#10003;</span>
                    <span>
                      <strong>1日あたり約{formatYen(Math.round(SUBSCRIPTION_PRICE / 60))}</strong>
                      （定期便2本を約2ヶ月で使用した場合の換算）
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0">&#10003;</span>
                    <span>食事に数滴混ぜるだけ・通院不要</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0">&#10003;</span>
                    <span>30日間全額返金保証付き</span>
                  </li>
                </ul>
                <p className="text-xs text-amber-100">
                  ※ 本品は栄養補助食品であり、治療・診断に代わるものではありません。
                </p>
              </div>
            </FadeInOnScroll>
          </div>

          {/* 発送スピード訴求 */}
          <FadeInOnScroll>
            <div className="mt-10 bg-white rounded-2xl border-2 border-amber-300 p-5 md:p-6 text-center shadow-md">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-600 text-xl font-black">
                  ⏱
                </span>
                <p className="text-lg md:text-xl font-black text-slate-900">
                  ご注文確認後、<span className="text-amber-600">3〜5営業日以内</span>に発送
                </p>
              </div>
              <p className="text-xs text-gray-500">
                株式会社シリカラボ（宮崎県都城市）より直送 / クレジットカード決済対応
              </p>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ============================================================
          Final CTA — 写真背景 + 緑CTA
          ============================================================ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/pet-cat-owner.jpg"
            alt="飼い主とペットの幸せな時間"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 to-slate-900/90" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <FadeInOnScroll>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4">
              大切な家族の健康維持に。
              <br />
              ココペリをお試しください。
            </h2>
          </FadeInOnScroll>
          <p className="text-amber-200 text-lg mb-2">
            10年間、動物病院でしか手に入らなかった製品です。
          </p>
          <p className="text-amber-300 text-sm font-bold mb-8">オンライン販売は始まったばかり。</p>

          {/* 価格まとめカード */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
              <p className="text-white font-bold text-sm">1本</p>
              <p className="text-white text-2xl font-black">{formatYen(SINGLE_PRICE)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
              <p className="text-amber-200 font-bold text-sm">定期便 2本/月</p>
              <p className="text-white text-2xl font-black">{formatYen(SUBSCRIPTION_PRICE)}</p>
            </div>
            <div className="bg-amber-500/20 backdrop-blur rounded-xl p-4 border border-amber-400/40">
              <p className="text-amber-300 font-bold text-sm">5+1セット</p>
              <p className="text-white text-2xl font-black">{formatYen(BUNDLE_6_PRICE)}</p>
              <p className="text-amber-300 text-xs">1本{formatYen(PER_BOTTLE_BUNDLE_6)}</p>
            </div>
          </div>

          {/* CTA #4 */}
          <CTAButton size="lg" />

          <p className="text-amber-300 text-xs mt-6">
            クレジットカード決済 / 2本セット以上送料無料 / 3〜5営業日以内に発送
          </p>
          <p className="text-amber-400 text-xs mt-6">
            ※ 本品は動物用栄養補助食品であり、医薬品ではありません。
            疾病の治療・予防を目的としたものではありません。
          </p>
        </div>
      </section>

      {/* ============ 会社概要 ============ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInOnScroll>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 text-center">
              会社概要
            </h2>
          </FadeInOnScroll>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ['製造元', '株式会社シリカラボ（宮崎県都城市）'],
                  ['販売課代表', '渡邊道治'],
                  ['所在地', '〒885-0086 宮崎県都城市久保原町9-43'],
                  ['研究機関', 'さがら動物病院（治験担当）'],
                  ['販売', 'カムトゥル（Come true）'],
                  ['製造元WEB', 'https://silica-lab.jp/'],
                  ['販売者お問い合わせ', 'timberfrost321@gmail.com'],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-gray-100 last:border-0">
                    <td className="px-6 py-4 font-bold text-gray-900 bg-gray-50 w-1/3">{label}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {value.startsWith('http') ? (
                        <a
                          href={value}
                          className="text-amber-600 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {value}
                        </a>
                      ) : value.includes('@') ? (
                        <a href={`mailto:${value}`} className="text-amber-600 underline">
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============================================================
          開発者ストーリー — ココペリへの思い
          ============================================================ */}
      <section id="story" className="py-16 md:py-24 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-3xl mx-auto px-4">
          <FadeInOnScroll>
            <p className="text-center text-xs font-black text-amber-600 tracking-widest mb-3">
              OUR STORY
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-center text-gray-900 mb-12">
              ココペリに込めた<span className="text-amber-600">想い</span>
            </h2>
          </FadeInOnScroll>

          <FadeInOnScroll>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
              <div className="mb-8">
                <p className="text-xl font-bold text-gray-900 mb-1">開発者より</p>
                <p className="text-sm text-gray-500 mb-4">ココペリ シリカウォーター 企画・開発</p>
                <div className="w-12 h-1 bg-amber-400 rounded-full"></div>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>ココペリを作ったきっかけは、自分の愛犬の健康を本気で考えたことでした。</p>
                <p>
                  市販のペット用水を調べるうちに、シリカ（ケイ素）が持つ可能性に出会いました。
                  人間用のシリカ水はたくさんあるのに、ペットが安心して飲めるものがない——
                  なら自分で作ろう、と思ったのが始まりです。
                </p>
                <p>
                  水質にこだわり、ペットの体に負担をかけない硬度設計を追求しました。
                  大切な家族であるペットに、毎日安心して与えられる水を届けたい。
                  ココペリには、そんな想いが込められています。
                </p>
                <p className="text-amber-700 font-bold">
                  「うちの子に少しでも長く、元気でいてほしい」——
                  飼い主として当たり前のその願いに、ココペリで応えたいと思っています。
                </p>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ============ 会員登録セクション ============ */}
      <section id="member" className="py-16 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInOnScroll>
            <div className="text-center mb-8">
              <span className="inline-block bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-bold mb-3">
                会員限定特典
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
                無料会員登録で
                <span className="text-amber-600">{formatYen(REFERRAL_DISCOUNT)}OFFクーポン</span>
              </h2>
              <p className="text-gray-600 max-w-lg mx-auto">
                メールアドレスだけで登録完了。今すぐ使える{formatYen(REFERRAL_DISCOUNT)}
                OFFクーポンをお届けします。
              </p>
            </div>
          </FadeInOnScroll>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* 会員特典 */}
            <FadeInOnScroll>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">会員特典</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-100 text-amber-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
                      1
                    </span>
                    <div>
                      <p className="font-bold text-gray-900">
                        {formatYen(REFERRAL_DISCOUNT)}OFFクーポン
                      </p>
                      <p className="text-sm text-gray-500">
                        ご登録後すぐに使えるクーポンをお届け。決済画面のクーポン欄でご利用いただけます
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-100 text-amber-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
                      2
                    </span>
                    <div>
                      <p className="font-bold text-gray-900">30日間全額返金保証</p>
                      <p className="text-sm text-gray-500">ご満足いただけなければ全額返金します</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-amber-100 text-amber-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
                      3
                    </span>
                    <div>
                      <p className="font-bold text-gray-900">マイページで購入管理</p>
                      <p className="text-sm text-gray-500">
                        購入履歴・お届け状況の確認、支払い方法の変更が可能
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0">
                      4
                    </span>
                    <div>
                      <p className="font-bold text-gray-900">
                        お友達紹介で{formatYen(REFERRAL_DISCOUNT)}OFF
                      </p>
                      <p className="text-sm text-gray-500">
                        紹介した方もされた方も{formatYen(REFERRAL_DISCOUNT)}割引
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInOnScroll>

            {/* 登録フォーム */}
            <FadeInOnScroll>
              <MemberRegistration />
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* モバイル固定CTAバー分の余白 */}
      <div className="h-28 md:hidden" />

      {/* ============ Footer ============ */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center text-white font-bold text-sm">
                  K
                </div>
                <span className="font-bold text-white">kokopelli</span>
              </div>
              <p className="text-sm mb-2">犬・猫のための動物用栄養補助食品</p>
              <p className="text-xs text-gray-500">
                「幸せをはこぶ精霊」ココペリの名を冠したケイ素濃縮液
              </p>
            </div>
            <div className="text-sm space-y-2">
              <p>販売: カムトゥル (Come true)</p>
              <p>製造・発送: シリカラボ</p>
              <p>
                お問い合わせ:{' '}
                <a
                  href="mailto:timberfrost321@gmail.com?subject=ココペリのお問い合わせ"
                  className="text-amber-400 hover:text-amber-300"
                >
                  timberfrost321@gmail.com
                </a>
              </p>
              <p>
                LINE相談:{' '}
                <a
                  href="https://line.me/R/ti/p/@636yyubo"
                  className="text-amber-400 hover:text-amber-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @636yyubo
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-xs text-center space-y-2">
            <div className="flex justify-center gap-4 mb-4">
              <Link href="/blog" className="text-gray-400 hover:text-white underline">
                ブログ
              </Link>
              <Link href="/tokushoho" className="text-gray-400 hover:text-white underline">
                特定商取引法に基づく表記
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white underline">
                プライバシーポリシー
              </Link>
              <Link href="/cancel" className="text-gray-400 hover:text-white underline">
                定期購入の解約
              </Link>
            </div>
            <p>
              本品は動物用栄養補助食品であり、医薬品ではありません。
              掲載の感想は個別の経過や感想であり、すべての犬猫に同様の変化を保証するものではありません。
              ご判断に迷う場合は、かかりつけの獣医師へご相談ください。
            </p>
            <p>&copy; {new Date().getFullYear()} kokopelli / Come true</p>
          </div>
        </div>
      </footer>

      {/* ============ モバイル固定CTAバー ============ */}
      <MobileCTABar />

      {/* ============ 離脱意図ポップアップ（24h cooldown） ============ */}
      <ExitIntentPopup />

      {/* ============ Schema.org 構造化データ ============ */}
      {/* Product JSON-LD は layout.tsx に統一（重複防止）— Search Console「商品掲載情報」エラー対策 */}
      {false && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: 'ココペリ（Kokopelli）',
              description:
                '犬・猫のための動物用栄養補助食品。高濃度の水溶性ケイ素10,000mg/Lを含むケイ素濃縮液。原材料は水とケイ素のみ。',
              image: 'https://kokopelli-ec.vercel.app/images/image-4.webp',
              brand: { '@type': 'Brand', name: 'kokopelli' },
              manufacturer: {
                '@type': 'Organization',
                name: '株式会社シリカラボ',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: '都城市',
                  addressRegion: '宮崎県',
                  addressCountry: 'JP',
                },
              },
              offers: [
                {
                  '@type': 'Offer',
                  name: '1本（通常購入）',
                  price: String(SINGLE_PRICE),
                  priceCurrency: 'JPY',
                  availability: 'https://schema.org/InStock',
                  url: 'https://kokopelli-ec.vercel.app/checkout',
                  seller: { '@type': 'Organization', name: 'カムトゥル' },
                  shippingDetails: {
                    '@type': 'OfferShippingDetails',
                    shippingRate: {
                      '@type': 'MonetaryAmount',
                      value: String(SHIPPING),
                      currency: 'JPY',
                    },
                    shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'JP' },
                    deliveryTime: {
                      '@type': 'ShippingDeliveryTime',
                      handlingTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 1,
                        maxValue: 2,
                        unitCode: 'DAY',
                      },
                      transitTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 1,
                        maxValue: 3,
                        unitCode: 'DAY',
                      },
                    },
                  },
                  hasMerchantReturnPolicy: {
                    '@type': 'MerchantReturnPolicy',
                    applicableCountry: 'JP',
                    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                    merchantReturnDays: 30,
                    returnMethod: 'https://schema.org/ReturnByMail',
                    returnFees: 'https://schema.org/FreeReturn',
                  },
                },
                {
                  '@type': 'Offer',
                  name: '5+1セット（6本）',
                  price: String(BUNDLE_6_PRICE),
                  priceCurrency: 'JPY',
                  availability: 'https://schema.org/InStock',
                  url: 'https://kokopelli-ec.vercel.app/checkout',
                  seller: { '@type': 'Organization', name: 'カムトゥル' },
                  shippingDetails: {
                    '@type': 'OfferShippingDetails',
                    shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'JPY' },
                    shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'JP' },
                    deliveryTime: {
                      '@type': 'ShippingDeliveryTime',
                      handlingTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 1,
                        maxValue: 2,
                        unitCode: 'DAY',
                      },
                      transitTime: {
                        '@type': 'QuantitativeValue',
                        minValue: 1,
                        maxValue: 3,
                        unitCode: 'DAY',
                      },
                    },
                  },
                  hasMerchantReturnPolicy: {
                    '@type': 'MerchantReturnPolicy',
                    applicableCountry: 'JP',
                    returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
                    merchantReturnDays: 30,
                    returnMethod: 'https://schema.org/ReturnByMail',
                    returnFees: 'https://schema.org/FreeReturn',
                  },
                },
              ],
            }),
          }}
        />
      )}

      {/* ============ HowTo 構造化データ — 使い方3ステップ ============ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            name: 'ココペリ シリカ高濃度ミネラルウォーターの与え方',
            description:
              '付属シリンジで数滴を取り、フードに混ぜるか口元に直接たらして、1日1回毎日続けるだけ。',
            totalTime: 'PT1M',
            supply: [
              { '@type': 'HowToSupply', name: 'ココペリ 水溶性ケイ素濃縮液 30ml' },
              { '@type': 'HowToSupply', name: '付属シリンジ（注射針なし）' },
              { '@type': 'HowToSupply', name: '普段のペットフード' },
            ],
            step: [
              {
                '@type': 'HowToStep',
                position: 1,
                name: 'シリンジで数滴取る',
                text: '付属のシリンジ（注射針なし）でココペリを体重1kgあたり0.1ccを目安に取ります。',
                url: 'https://kokopelli-ec.vercel.app/#howto',
              },
              {
                '@type': 'HowToStep',
                position: 2,
                name: 'フードに混ぜる or 直接与える',
                text: 'フードにしみこませるか、口元に直接数滴たらします。味・匂いがほぼないので嫌がりません。',
                url: 'https://kokopelli-ec.vercel.app/#howto',
              },
              {
                '@type': 'HowToStep',
                position: 3,
                name: '毎日続ける',
                text: '1日1回を目安に継続します。まずは1〜2ヶ月を目安にお試しください。',
                url: 'https://kokopelli-ec.vercel.app/#howto',
              },
            ],
          }),
        }}
      />

      {/* ============ FAQPage 構造化データ ============ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: '白い結晶のようなものが見えますが大丈夫ですか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '自然のミネラル成分が結晶化したものです。品質に問題はございません。',
                },
              },
              {
                '@type': 'Question',
                name: '若い犬や猫にも使えますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'はい、年齢を問わずご使用いただけます。日常の健康維持にもお役立ていただけます。',
                },
              },
              {
                '@type': 'Question',
                name: 'どのくらいで変化を感じられますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '個体差がございますが、まずは1〜2ヶ月ほど継続してお試しください。',
                },
              },
              {
                '@type': 'Question',
                name: '他のサプリメントやフードと併用できますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '食品ですので基本的に併用いただけます。ご心配な場合はかかりつけの獣医師にご相談ください。',
                },
              },
              {
                '@type': 'Question',
                name: '1本でどのくらい持ちますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '1本30mlです。小型犬・猫の場合は約2〜4週間が目安です。',
                },
              },
              {
                '@type': 'Question',
                name: '犬と猫で与え方は違いますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '基本的な与え方は同じです。食事に数滴混ぜるか、ディスポ容器で直接与えてください。',
                },
              },
              {
                '@type': 'Question',
                name: '開封後の保存方法は？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'キャップをしっかり閉めて常温保存。直射日光は避けてください。',
                },
              },
              {
                '@type': 'Question',
                name: '定期購入はありますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `月額${formatYen(SUBSCRIPTION_PRICE)}の定期便（2本/月）がございます。5+1セット（${formatYen(BUNDLE_6_PRICE)}・6本届く）なら1本あたり${formatYen(PER_BOTTLE_BUNDLE_6)}と最もおトクです。`,
                },
              },
              {
                '@type': 'Question',
                name: '原材料は何ですか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '水と水溶性ケイ素の2つだけです。着色料・香料・保存料は一切不使用です。',
                },
              },
              {
                '@type': 'Question',
                name: '送料はかかりますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '2本セット以上送料無料です。3〜5営業日以内に発送いたします。',
                },
              },
              {
                '@type': 'Question',
                name: '飲ませなくても返金してもらえますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'はい、可能です。開封後・未開封を問わず、到着後30日以内であれば全額返金いたします。',
                },
              },
              {
                '@type': 'Question',
                name: '定期便はいつでも解約できますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'はい、いつでも解約可能です。マイページの「支払い方法・プランを管理する」からご自身でいつでも解約手続きができ、メール（timberfrost321@gmail.com）でも承ります。解約金や違約金は一切なく、回数縛りもありません。次回引き落とし日の前日までに解約のお手続きをいただければ、原則、次回分の請求は発生しません。',
                },
              },
              {
                '@type': 'Question',
                name: '多頭飼いの場合、1日の量の目安は？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '1頭あたり体重5kgごとに数滴（約0.5ml）が目安です。食事に混ぜて与えてください。',
                },
              },
              {
                '@type': 'Question',
                name: '副作用はありませんか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '原材料は「水」と「水溶性ケイ素」のみで、添加物・保存料・香料・着色料は一切不使用です。動物病院での臨床使用10年、学会での症例報告も2度実施しており、安全性を確認した上で販売しています。',
                },
              },
              {
                '@type': 'Question',
                name: '老犬・老猫の腎臓が心配です。与えても大丈夫ですか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'ココペリは原材料が「水」と「水溶性ケイ素」のみのシンプル処方で、軟水ベースのため腎臓への負担をかけにくい設計です。ただし、すでに腎臓病の診断を受けているペットや投薬中のペットは、必ずかかりつけの獣医師にご相談のうえご使用ください。',
                },
              },
              {
                '@type': 'Question',
                name: '水をあまり飲まないのですが、どう与えればいいですか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '水を飲まない子には、フードに直接数滴混ぜていただく方法をおすすめします。シリンジ（注射針なし）で口の横から少量ずつ与える方法も取り入れやすいです。',
                },
              },
              {
                '@type': 'Question',
                name: 'ミネラルウォーターを使っていますが、ココペリと併用しても大丈夫ですか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'はい、併用いただけます。ペット用には軟水のミネラルウォーターをお選びいただき、そこにココペリを数滴加える形でご使用ください。海外の硬水は犬猫の尿路結石リスクを高める可能性があるため避けてください。',
                },
              },
              {
                '@type': 'Question',
                name: '一度に何頭分か購入したいのですが、おすすめは？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: `多頭飼いの方には6本セット（5+1・送料無料・${formatYen(BUNDLE_6_PRICE)}）が最もおトクです。月々のコスト管理を重視される場合は、定期便2本/月（${formatYen(SUBSCRIPTION_PRICE)}・送料無料）が安定的に続けやすいプランです。`,
                },
              },
              {
                '@type': 'Question',
                name: 'ご満足いただけなかった場合、本当に返金されますか？',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'はい、ご安心ください。到着後30日以内であれば、開封後・未開封を問わず全額返金いたします。お試しいただいて合わないと感じた場合の他、ご満足いただけなかった場合も対象です。',
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
