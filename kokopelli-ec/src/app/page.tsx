import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import PetDiagnosis from './components/PetDiagnosis';
// FirstTrialButton removed - no more ¥980 offer
import MobileCTABar from './components/MobileCTABar';
import MemberRegistration from './components/MemberRegistration';
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

/* ───────────── SEO Metadata ───────────── */
export const metadata: Metadata = {
  title: 'ココペリ｜犬・猫のための動物用栄養補助食品【水溶性ケイ素濃縮液】公式',
  description:
    'ココペリは犬・猫のための動物用栄養補助食品。高濃度の水溶性ケイ素10,000mg/Lを含むシンプル処方のケイ素濃縮液。シニア犬・シニア猫の毎日の健康維持に。学会報告症例あり。1本¥3,480〜。',
  keywords:
    'ココペリ,犬 サプリメント,猫 サプリメント,ペット 健康食品,水溶性ケイ素,シリカ,シニア犬,シニア猫,動物用栄養補助食品,ペット ケイ素,犬 関節,猫 元気,高齢犬 サプリ,高齢猫 サプリ',
  openGraph: {
    title: 'ココペリ｜犬・猫のための動物用栄養補助食品',
    description:
      '高濃度の水溶性ケイ素を含むシンプル処方。シニアペットの毎日の健康維持をサポート。1本¥3,480〜。2本セット以上送料無料。',
    locale: 'ja_JP',
    type: 'website',
    images: ['/images/image-4.webp'],
  },
};

/* ───────────── ブランドロゴ SVG ───────────── */
function KokopelliLogo({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ココペリ ロゴ"
      className="shrink-0"
    >
      {/* 丸背景 */}
      <circle cx="60" cy="60" r="58" fill="#1e293b" />
      {/* 水滴シルエット */}
      <path
        d="M60 18 C60 18 34 54 34 72 C34 86.4 45.6 98 60 98 C74.4 98 86 86.4 86 72 C86 54 60 18 60 18Z"
        fill="url(#dropGrad)"
      />
      {/* 肉球（中央パッド） */}
      <ellipse cx="60" cy="74" rx="10" ry="8" fill="#1e293b" opacity="0.85" />
      {/* 肉球（左上指） */}
      <ellipse cx="47" cy="62" rx="5.5" ry="5" fill="#1e293b" opacity="0.85" />
      {/* 肉球（右上指） */}
      <ellipse cx="73" cy="62" rx="5.5" ry="5" fill="#1e293b" opacity="0.85" />
      {/* 肉球（左下指） */}
      <ellipse cx="50" cy="72" rx="4.5" ry="4" fill="#1e293b" opacity="0.85" />
      {/* 肉球（右下指） */}
      <ellipse cx="70" cy="72" rx="4.5" ry="4" fill="#1e293b" opacity="0.85" />
      <defs>
        <linearGradient
          id="dropGrad"
          x1="60"
          y1="18"
          x2="60"
          y2="98"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ───────────── 共通CTAボタン ───────────── */
function CTAButton({ size = 'lg' }: { size?: 'lg' | 'md' }) {
  const cls = size === 'lg' ? 'px-12 py-5 text-xl' : 'px-10 py-4 text-lg';
  return (
    <div className="flex flex-col items-center">
      <MagneticButton>
        <Link
          href="/checkout"
          className={`inline-flex items-center justify-center bg-gradient-to-r from-amber-600 to-amber-500 text-white ${cls} rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5`}
        >
          今すぐ試してみる →
        </Link>
      </MagneticButton>
      <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="text-amber-500">&#10003;</span> 30日間全額返金保証
        </span>
        <span className="flex items-center gap-1">
          <span className="text-amber-500">&#10003;</span> いつでも解約OK
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
          1. ファーストビュー — ペット写真大きく + コピー + CTA
          ============================================================ */}
      {/* 期間限定バナー */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-white text-center py-2.5 px-4">
        <p className="text-sm font-bold tracking-wide">
          今月限定 ── 2本セット以上で<span className="underline underline-offset-2">送料無料</span>{' '}
          + 30日間全額返金保証付き
        </p>
      </div>

      <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center overflow-hidden">
        {/* 背景: ペットと飼い主の写真 */}
        <div className="absolute inset-0">
          <Image
            src="/images/pet-dog-owner.jpg"
            alt="愛犬と飼い主が一緒に過ごす幸せな時間"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent md:from-white/90 md:via-white/60" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* テキスト側 */}
            <div className="flex-1">
              {/* トラストバッジ 3連 */}
              <div className="grid grid-cols-3 gap-2 mb-6 max-w-md">
                <div className="bg-white/90 border border-slate-200 rounded-xl px-2 py-2 text-center shadow-sm">
                  <p className="text-[10px] text-gray-500 leading-none mb-1">MADE IN</p>
                  <p className="text-sm font-black text-slate-800 leading-none">国産</p>
                  <p className="text-[10px] text-gray-500 leading-none mt-1">宮崎県製造</p>
                </div>
                <div className="bg-white/90 border border-blue-200 rounded-xl px-2 py-2 text-center shadow-sm">
                  <p className="text-[10px] text-blue-600 leading-none mb-1">VET</p>
                  <p className="text-sm font-black text-slate-800 leading-none">獣医師監修</p>
                  <p className="text-[10px] text-gray-500 leading-none mt-1">臨床使用10年</p>
                </div>
                <div className="bg-white/90 border border-amber-200 rounded-xl px-2 py-2 text-center shadow-sm">
                  <p className="text-[10px] text-amber-600 leading-none mb-1">REPORT</p>
                  <p className="text-sm font-black text-slate-800 leading-none">2度の症例</p>
                  <p className="text-[10px] text-gray-500 leading-none mt-1">学会報告済</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-amber-200 text-amber-700 font-bold text-xs">
                  <span className="w-2 h-2 rounded-full bg-slate-500" />
                  動物用栄養補助食品
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  動物病院でも採用
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs">
                  製造10周年
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight mb-6">
                <TextReveal text="この子との時間を、" className="block" />
                <TextReveal text="もっと長く。" className="block text-amber-600" delay={0.3} />
              </h1>

              <p className="text-lg text-gray-600 mb-4 leading-relaxed max-w-lg">
                動物病院で<strong className="text-slate-800">10年間</strong>使われてきた、 高濃度
                <strong className="text-amber-700">水溶性ケイ素 10,000mg/L</strong>。
                食事に数滴混ぜるだけで、シニアペットの毎日をサポートします。
              </p>

              <ul className="text-sm text-gray-600 space-y-1.5 mb-8">
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs font-bold shrink-0">
                    &#10003;
                  </span>
                  原材料はたった2つ：水とケイ素
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs font-bold shrink-0">
                    &#10003;
                  </span>
                  動物病院で10年間使用されてきた製品
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs font-bold shrink-0">
                    &#10003;
                  </span>
                  学会で症例報告済み
                </li>
              </ul>

              {/* 価格前倒し + 返金保証強化バッジ */}
              <div className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-400 rounded-2xl px-5 py-4 mb-4 shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  <div className="shrink-0 w-14 h-14 rounded-full bg-amber-500 text-white flex flex-col items-center justify-center shadow">
                    <span className="text-[9px] font-bold leading-none">30日間</span>
                    <span className="text-[10px] font-black leading-none mt-0.5">全額</span>
                    <span className="text-[10px] font-black leading-none">返金</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900 font-black text-base leading-tight">
                      初回お試し <span className="text-amber-600 text-2xl">¥3,480</span>〜
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      飲ませなくても返金OK・初回1本だけでOK・継続義務なし
                    </p>
                  </div>
                </div>
              </div>
              <CTAButton size="lg" />
              <p className="mt-3 text-sm text-gray-500">
                1本 ¥3,480（送料¥520）/ 2本セット ¥5,980（送料無料）/ 定期なら月¥5,480
              </p>
              <div className="mt-3 flex items-center gap-4">
                <a
                  href="https://line.me/R/ti/p/@636yyubo"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#06C755] text-white font-bold text-sm shadow hover:shadow-md transition-all"
                >
                  💬 LINEで無料相談
                </a>
                <span className="text-xs text-gray-400">購入前のご質問もお気軽に</span>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                ※ 本品は動物用栄養補助食品であり、医薬品ではありません。
              </p>
            </div>

            {/* 商品写真 */}
            <Parallax speed={0.15}>
              <div className="flex gap-4 items-end">
                <div className="relative w-48 md:w-56 rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
                  <Image
                    src="/images/image-4.webp"
                    alt="ココペリ パッケージ正面 - 犬猫用動物用ケイ素濃縮液"
                    width={400}
                    height={700}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <div className="relative w-32 md:w-40 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                  <Image
                    src="/images/image-6.webp"
                    alt="ココペリを愛用する猫"
                    width={400}
                    height={480}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </Parallax>
          </div>
        </div>
      </section>

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
                  まずは1本から。初回お試し価格でリスクなくスタート
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
                      ¥3,480<span className="text-sm text-gray-500 font-normal ml-1">税込</span>
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-3">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                        <span>&#10003;</span> 2本目から送料無料
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                        <span>&#10003;</span> 定期便なら¥500OFF
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold">
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
                      href="/checkout"
                      className="block w-full md:w-auto text-center bg-gradient-to-r from-amber-600 to-amber-500 text-white px-8 py-4 rounded-full font-black text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    >
                      1本だけ試す →
                    </Link>
                    <p className="text-[10px] text-gray-400 text-center mt-2">
                      送料¥520 / カード決済
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
              <div className="w-full md:w-64 shrink-0 space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                  <Image
                    src="/images/pet-dog-senior.jpg"
                    alt="シニア犬の様子"
                    width={400}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                  <Image
                    src="/images/pet-cat-senior.jpg"
                    alt="シニア猫の様子"
                    width={400}
                    height={500}
                    className="w-full h-auto"
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
            まずは1本からお試しいただけます。セット・定期便はさらにおトクです。
          </p>

          <StaggerContainer
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
            staggerDelay={0.1}
          >
            {/* 1本 */}
            <StaggerItem>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center h-full flex flex-col">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200">
                  <Image
                    src="/images/image-4.webp"
                    alt="ококопеリ1本"
                    width={40}
                    height={70}
                    className="h-10 w-auto"
                  />
                </div>
                <p className="text-sm font-bold text-gray-500 mb-1">お試し</p>
                <h3 className="text-xl font-black text-gray-900 mb-1">1本</h3>
                <p className="text-xs text-gray-500 mb-4">30ml</p>
                <p className="text-4xl font-black text-gray-900 mb-1">¥3,480</p>
                <p className="text-xs text-gray-500 mb-6">+ 送料 ¥520</p>
                <ul className="text-sm text-gray-600 text-left space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5 shrink-0">&#10003;</span>
                    <span>まずは試してみたい方に</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5 shrink-0">&#10003;</span>
                    <span>小型犬・猫なら約2〜4週間分</span>
                  </li>
                </ul>
                <Link
                  href="/checkout"
                  className="block w-full bg-white border-2 border-slate-700 text-amber-600 py-3 rounded-full font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  購入する
                </Link>
              </div>
            </StaggerItem>

            {/* 2本セット — 人気No.1 */}
            <StaggerItem>
              <div className="relative bg-gradient-to-b from-amber-600 to-amber-500 rounded-2xl border-2 border-amber-400 shadow-xl p-6 text-center h-full flex flex-col">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-1 rounded-full text-xs font-black shadow">
                  人気No.1
                </div>
                <div className="w-16 h-16 mx-auto mb-3 mt-2 rounded-full bg-white/20 flex items-center justify-center">
                  <Image
                    src="/images/image-4.webp"
                    alt="ококопеリ2本セット"
                    width={40}
                    height={70}
                    className="h-10 w-auto"
                  />
                </div>
                <p className="text-sm font-bold text-amber-100 mb-1">2本セット</p>
                <h3 className="text-xl font-black text-white mb-1">2本</h3>
                <p className="text-xs text-amber-200 mb-4">30ml x 2本</p>
                <p className="text-4xl font-black text-white mb-1">¥5,980</p>
                <p className="text-xs text-amber-200 mb-1">送料無料</p>
                <p className="text-white text-sm font-bold mb-6">1本あたり ¥2,990</p>
                <ul className="text-sm text-amber-50 text-left space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-0.5 shrink-0">&#10003;</span>
                    <span>送料無料でおトク</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-0.5 shrink-0">&#10003;</span>
                    <span>中〜大型犬に約1〜2ヶ月分</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-white mt-0.5 shrink-0">&#10003;</span>
                    <span>継続しやすい量</span>
                  </li>
                </ul>
                <Link
                  href="/checkout"
                  className="block w-full bg-white text-amber-700 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                >
                  購入する
                </Link>
              </div>
            </StaggerItem>

            {/* 5+1セット — おすすめ */}
            <StaggerItem>
              <div className="relative bg-gradient-to-b from-slate-800 to-slate-700 rounded-2xl border-2 border-amber-500 shadow-xl p-6 text-center h-full flex flex-col">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white px-4 py-1 rounded-full text-xs font-black shadow">
                  一番おトク
                </div>
                <div className="w-16 h-16 mx-auto mb-3 mt-2 rounded-full bg-white/20 flex items-center justify-center">
                  <Image
                    src="/images/image-4.webp"
                    alt="ココペリ6本"
                    width={40}
                    height={70}
                    className="h-10 w-auto"
                  />
                </div>
                <p className="text-sm font-bold text-amber-100 mb-1">5+1セット</p>
                <h3 className="text-xl font-black text-white mb-1">6本</h3>
                <p className="text-xs text-amber-200 mb-4">30ml x 6本</p>
                <p className="text-4xl font-black text-white mb-1">¥15,000</p>
                <p className="text-xs text-amber-200 mb-1">送料無料</p>
                <p className="text-amber-300 text-sm font-bold mb-6">1本あたり ¥2,500</p>
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
                </ul>
                <Link
                  href="/checkout"
                  className="block w-full bg-white text-amber-700 py-3 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                >
                  購入する
                </Link>
              </div>
            </StaggerItem>

            {/* 定期便 */}
            <StaggerItem>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 text-center h-full flex flex-col">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-slate-50 flex items-center justify-center border border-amber-200">
                  <CalendarCheckIcon />
                </div>
                <p className="text-sm font-bold text-amber-600 mb-1">定期便</p>
                <h3 className="text-xl font-black text-gray-900 mb-1">毎月2本</h3>
                <p className="text-xs text-gray-500 mb-4">30ml x 2本 / 月</p>
                <p className="text-4xl font-black text-gray-900 mb-1">
                  ¥5,480<span className="text-lg">/月</span>
                </p>
                <p className="text-xs text-gray-500 mb-1">送料無料</p>
                <p className="text-amber-600 text-sm font-bold mb-6">毎月¥1,000おトク</p>
                <ul className="text-sm text-gray-600 text-left space-y-2 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5 shrink-0">&#10003;</span>
                    <span>買い忘れなく毎月届く</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5 shrink-0">&#10003;</span>
                    <span>いつでも解約可能</span>
                  </li>
                </ul>
                <Link
                  href="/checkout"
                  className="block w-full bg-white border-2 border-slate-700 text-amber-600 py-3 rounded-full font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  定期便を申し込む
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
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
                  <div className="h-40 overflow-hidden">
                    <Image
                      src={v.img}
                      alt={v.pet}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-yellow-400 text-sm mb-3">
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
                '月額¥5,480の定期便（2本/月）がございます。5+1セット（¥15,000・6本届く）なら1本あたり¥2,500と最もおトクです。',
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
                'はい、いつでも解約可能です。マイページから即時で解約手続きが完了します。解約金や違約金は一切ありません。次回発送日の前日までに手続きしていただければ次回分の請求は発生しません。',
              ],
              [
                '多頭飼いの場合、1日の量の目安は？',
                '1頭あたり体重5kgごとに数滴（約0.5ml）が目安です。例：小型犬（3kg）＋猫（4kg）の2頭なら1日合計で約1ml程度。食事に混ぜて与えてください。詳しい量は同梱のパンフレット、またはLINE公式までお気軽にご相談ください。',
              ],
              [
                '副作用はありませんか？',
                '原材料は「水」と「水溶性ケイ素」のみで、添加物・保存料・香料・着色料は一切不使用です。動物病院での臨床使用10年、学会での症例報告も2度実施しており、安全性を確認した上で販売しています。ごく稀に体質により合わない場合もありますので、気になる症状があれば使用を中止し、獣医師にご相談ください。',
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
                    <span>定期便：¥5,480／月（2本・送料無料）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0">&#10003;</span>
                    <span>
                      <strong>1日あたり約¥91</strong>（定期便・1日あたり換算）
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
                  本日ご注文で<span className="text-amber-600">3営業日以内</span>に発送
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
              <p className="text-white text-2xl font-black">¥3,480</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/20">
              <p className="text-amber-200 font-bold text-sm">定期便 2本/月</p>
              <p className="text-white text-2xl font-black">¥5,480</p>
            </div>
            <div className="bg-amber-500/20 backdrop-blur rounded-xl p-4 border border-amber-400/40">
              <p className="text-amber-300 font-bold text-sm">5+1セット</p>
              <p className="text-white text-2xl font-black">¥15,000</p>
              <p className="text-amber-300 text-xs">1本¥2,500</p>
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

      {/* ============ 動物病院での取り扱い ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInOnScroll>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-48 md:w-64 shrink-0 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <Image
                  src="/images/image-9.webp"
                  alt="動物病院での使用イメージ"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">
                  動物病院でも採用されています
                </h2>
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
                  <p className="text-gray-700 leading-relaxed mb-3">
                    <strong>さがら動物病院</strong>の獣医師が治験担当として臨床現場で使用・研究。
                    学会で<strong>2度の症例報告</strong>済み。
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    製造元の<strong>株式会社シリカラボ</strong>
                    （宮崎県都城市）が品質管理・製造・発送を一貫して担当。
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    これまで動物病院経由のみだった製品が、
                    <strong className="text-amber-700">ついにオンラインで直接購入可能に。</strong>
                  </p>
                  <p className="text-sm text-gray-500 mt-3">
                    ※ すべての動物病院で取り扱いがあるわけではありません。
                  </p>
                </div>
              </div>
            </div>
          </FadeInOnScroll>
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
                  ['製造元', '株式会社シリカラボ'],
                  ['代表', '渡邊道治'],
                  ['所在地', '〒885-0086 宮崎県都城市久保原町9-43'],
                  ['研究機関', 'さがら動物病院（治験担当）'],
                  ['販売協賛', 'カムトゥル（Come true）'],
                  ['WEBサイト', 'https://silica-lab.jp/'],
                  ['お問い合わせ', 'info@silica-lab.com'],
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
              {/* 開発者写真（写真が届いたら差し替え） */}
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
                <div className="w-32 h-32 rounded-full bg-amber-100 flex items-center justify-center text-5xl flex-shrink-0">
                  👤
                </div>
                <div>
                  <p className="text-xl font-bold text-gray-900 mb-1">開発者</p>
                  <p className="text-sm text-gray-500 mb-4">ココペリ シリカウォーター 企画・開発</p>
                  <div className="w-12 h-1 bg-amber-400 rounded-full"></div>
                </div>
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

              <p className="text-xs text-gray-400 mt-8">
                ※ 開発者の写真・詳細なストーリーは近日公開予定です。
              </p>
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
                無料会員登録で<span className="text-amber-600">ずっと5%OFF</span>
              </h2>
              <p className="text-gray-600 max-w-lg mx-auto">
                メールアドレスだけで登録完了。会員価格でお得にご購入いただけます。
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
                      <p className="font-bold text-gray-900">ずっと5%OFF</p>
                      <p className="text-sm text-gray-500">1本 ¥3,480 → ¥3,306（会員価格）</p>
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
                      <p className="font-bold text-gray-900">お友達紹介で500円OFF</p>
                      <p className="text-sm text-gray-500">紹介した方もされた方も500円割引</p>
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
              <p>販売協賛: カムトゥル (Come true)</p>
              <p>製造・発送: シリカラボ</p>
              <p>
                お問い合わせ:{' '}
                <a
                  href="mailto:info@silica-lab.com?subject=ココペリのお問い合わせ"
                  className="text-amber-400 hover:text-amber-300"
                >
                  info@silica-lab.com
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

      {/* ============ Schema.org 構造化データ ============ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'ココペリ（Kokopelli）',
            description:
              '犬・猫のための動物用栄養補助食品。高濃度の水溶性ケイ素10,000mg/Lを含むケイ素濃縮液。原材料は水とケイ素のみ。',
            image: 'https://kokopelli.kamuturu.jp/images/image-4.webp',
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
                price: '3480',
                priceCurrency: 'JPY',
                availability: 'https://schema.org/InStock',
                url: 'https://kokopelli.kamuturu.jp/checkout',
                seller: { '@type': 'Organization', name: 'カムトゥル' },
                shippingDetails: {
                  '@type': 'OfferShippingDetails',
                  shippingRate: { '@type': 'MonetaryAmount', value: '500', currency: 'JPY' },
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
                price: '15000',
                priceCurrency: 'JPY',
                availability: 'https://schema.org/InStock',
                url: 'https://kokopelli.kamuturu.jp/checkout',
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
                  text: '月額¥5,480の定期便（2本/月）がございます。5+1セット（¥15,000・6本届く）なら1本あたり¥2,500と最もおトクです。',
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
                  text: 'はい、いつでも解約可能です。マイページから即時で解約手続きが完了します。解約金や違約金は一切ありません。',
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
            ],
          }),
        }}
      />
    </>
  );
}
