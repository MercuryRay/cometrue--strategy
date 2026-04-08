import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import PetDiagnosis from "./components/PetDiagnosis";
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
} from "./components/Icons";
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
} from "./components/Animations";

/* ───────────── SEO Metadata (layout.tsxで上書き可能) ───────────── */
export const metadata: Metadata = {
  title:
    "ココペリ｜犬・猫のための動物用栄養補助食品【水溶性ケイ素濃縮液】公式",
  description:
    "ココペリは犬・猫のための動物用栄養補助食品。高濃度の水溶性ケイ素10,000mg/Lを含むシンプル処方のケイ素濃縮液。シニア犬・シニア猫の毎日の健康維持に。学会報告症例あり。1本¥3,480〜。",
  keywords:
    "ココペリ,犬 サプリメント,猫 サプリメント,ペット 健康食品,水溶性ケイ素,シリカ,シニア犬,シニア猫,動物用栄養補助食品,ペット ケイ素,犬 関節,猫 元気,高齢犬 サプリ,高齢猫 サプリ",
  openGraph: {
    title: "ココペリ｜犬・猫のための動物用栄養補助食品",
    description:
      "高濃度の水溶性ケイ素を含むシンプル処方。シニアペットの毎日の健康維持をサポート。1本¥3,480〜。2本セット送料無料。",
    locale: "ja_JP",
    type: "website",
    images: ["/images/image-4.webp"],
  },
};

/* ───────────── ペルソナ設定 ─────────────
 * メインペルソナ: 山田美咲さん（45歳・女性）
 * - 14歳のトイプードルと暮らす会社員
 * - 最近愛犬の散歩中の座り込み、食欲低下、毛並みの衰えが気になる
 * - 動物病院では「年齢的なもの」と言われ、家でできることを探している
 * - ネットでペットサプリを検索中。成分の安全性と透明性を重視
 * - Instagram経由でLPに到達
 *
 * サブペルソナ: 鈴木健太さん（55歳・男性）
 * - 12歳の雑種猫2匹と暮らす
 * - 猫の夜鳴き・落ち着きのなさに悩み中
 * - シンプルで手間のかからないケアを求めている
 * ─────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <ScrollProgress />
      {/* ============ Header ============ */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              K
            </div>
            <div>
              <span className="font-black text-blue-900 tracking-wide">
                kokopelli
              </span>
              <span className="block text-xs text-gray-500 font-bold leading-none">
                犬・猫のための動物用栄養補助食品
              </span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-600">
            <a href="#features" className="hover:text-blue-900 transition-colors">特徴</a>
            <a href="#concerns" className="hover:text-blue-900 transition-colors">こんなお悩みに</a>
            <a href="#product" className="hover:text-blue-900 transition-colors">製品情報</a>
            <a href="#evidence" className="hover:text-blue-900 transition-colors">エビデンス</a>
            <a href="#howto" className="hover:text-blue-900 transition-colors">使い方</a>
            <a href="#faq" className="hover:text-blue-900 transition-colors">FAQ</a>
          </nav>
          <Link
            href="/checkout"
            className="bg-gradient-to-r from-blue-900 to-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            購入する
          </Link>
        </div>
      </header>

      {/* ============ Hero ============ */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-28">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-sm">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  動物用栄養補助食品
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-700 font-bold text-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  動物病院でも採用
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-100 text-amber-700 font-bold text-sm">
                  製造10周年
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-blue-950 leading-tight mb-6">
                <TextReveal text="「年齢のせい」で" className="block" />
                <TextReveal text="あきらめていませんか？" className="block" delay={0.3} />
                <span className="block">
                  <TextReveal text="ココペリ" className="inline text-blue-700" delay={0.8} />
                  <TextReveal text="で" className="inline text-2xl md:text-4xl" delay={1.1} />
                </span>
                <TextReveal text="毎日の健康維持を。" className="block" delay={1.2} />
              </h1>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                高濃度の<strong className="text-blue-900">水溶性ケイ素 10,000mg/L</strong>を含む、
                シンプル処方のケイ素濃縮液。
                <br />
                食事に数滴混ぜるだけ。犬にも猫にもお使いいただけます。
              </p>
              <ul className="text-sm text-gray-600 space-y-1 mb-6">
                <li>✓ 原材料はたった2つ：水とケイ素</li>
                <li>✓ 動物病院で10年間使用されてきた製品</li>
                <li>✓ 学会で症例報告済み</li>
                <li>✓ 全成分を購入前に公開</li>
              </ul>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-700 font-bold text-sm">
                  オンライン販売開始記念 — 製造10周年
                </p>
                <p className="text-red-600 text-xs mt-1">
                  これまで動物病院でのみ取り扱い。初めてオンラインでお求めいただけます。
                </p>
              </div>
              <MagneticButton>
                <Link
                  href="/checkout"
                  className="inline-flex bg-gradient-to-r from-orange-500 to-orange-400 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                >
                  購入ページへ →
                </Link>
              </MagneticButton>
              <p className="mt-2 text-sm text-gray-500">
                1本 ¥3,480 / 2本セット ¥5,980（送料無料）
              </p>
              <p className="mt-1 text-xs text-gray-400">
                ※ 本品は動物用栄養補助食品であり、医薬品ではありません。
              </p>
            </div>
            <Parallax speed={0.15}>
              <div className="flex gap-4 items-end">
                <div className="relative w-48 md:w-56 rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                  <Image
                    src="/images/image-4.webp"
                    alt="ココペリ パッケージ正面 - 犬猫用動物用ケイ素濃縮液 栄養補助食品"
                    width={400}
                    height={700}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <div className="relative w-32 md:w-40 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
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

      {/* ============ ペット体質診断 ============ */}
      <PetDiagnosis />

      {/* ============ 10年の物語 ============ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-950 to-blue-900 text-white">
        <div className="max-w-3xl mx-auto px-4">
          <FadeInOnScroll>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-sm mb-6">
                製造開始から10年
              </span>
              <h2 className="text-2xl md:text-4xl font-black leading-tight mb-6">
                正直、ここまで世間の目に
                <br />
                さらす気はありませんでした。
              </h2>
            </div>
          </FadeInOnScroll>

          <div className="space-y-8 text-lg leading-relaxed text-blue-100">
            <FadeInOnScroll delay={0.1}>
              <p>
                ココペリは10年前、動物病院の臨床現場から生まれました。
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.2}>
              <p>
                獣医師がさまざまな症例に使い、その結果を見続けてきた製品です。
                販売目的ではなく、目の前の患者さんのために。
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.3}>
              <p>
                でも、いろいろな症例に使うたびに、
                飼い主さんの<strong className="text-white">喜ぶ顔</strong>を見るたびに、
                思うようになりました。
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.4}>
              <p className="text-xl md:text-2xl font-bold text-white text-center py-4">
                「日本中の飼い主さんに教えてあげたい。
                <br />
                こんないいサプリがありますよ」と。
              </p>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.5}>
              <div className="bg-blue-800/50 rounded-2xl p-6 border border-blue-700/50">
                <p className="text-blue-200 mb-4">
                  夜泣きで眠れない夜を過ごしていませんか。
                  <br />
                  愛犬・愛猫の老化現象に、胸を痛めていませんか。
                </p>
                <p className="text-blue-200">
                  10年間、動物病院で使い続けてきた製品を、
                  <br />
                  ついにご自宅からお求めいただけるようになりました。
                </p>
              </div>
            </FadeInOnScroll>

            <FadeInOnScroll delay={0.6}>
              <div className="bg-amber-500/10 rounded-2xl p-6 border border-amber-500/20">
                <p className="text-sm text-amber-200 mb-2 font-bold">治験担当獣医師より</p>
                <p className="text-amber-100 italic">
                  「2023年の学会発表動画は、飼い主様からいただいたものです。
                  よくぞ記録なさってくださいました。
                  タイミングよく動画があったものです。」
                </p>
                <p className="text-xs text-amber-300 mt-2">— さがら動物病院</p>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* ============ 数字で見るココペリ ============ */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { end: 10, unit: "年", label: "製造・臨床の実績" },
              { end: 10000, unit: "mg/L", label: "水溶性ケイ素濃度" },
              { end: 2, unit: "種類", label: "原材料（水・ケイ素）" },
              { end: 2, unit: "回", label: "学会での症例報告" },
            ].map((item) => (
              <FadeInOnScroll key={item.label} delay={0.1}>
                <p className="text-3xl md:text-4xl font-black text-blue-900">
                  <CountUp end={item.end} duration={1.5} />
                  <span className="text-lg font-bold text-blue-600">{item.unit}</span>
                </p>
                <p className="text-sm text-gray-500 mt-1">{item.label}</p>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ こんなお悩みありませんか？ ============ */}
      <section id="concerns" className="py-16 md:py-24 bg-amber-50/50">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInOnScroll>
            <h2 className="text-2xl md:text-4xl font-black text-blue-950 mb-4 text-center">
              こんな変化、ありませんか？
            </h2>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.1}>
            <p className="text-gray-600 text-center mb-6 text-lg">
              高齢期の犬や猫に見られる老化現象。「年のせいだから仕方ない」と諦めていませんか。
            </p>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.2}>
            <p className="text-gray-500 text-center mb-12 text-sm">
              こんな悩みを抱えている飼い主さまへ。
            </p>
          </FadeInOnScroll>
          <StaggerContainer className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto" staggerDelay={0.08}>
            {[
              { text: "夜中に鳴き続けて、飼い主も眠れない", icon: <MoonIcon /> },
              { text: "部屋の中をウロウロ歩き回る", icon: <RotateCwIcon /> },
              { text: "ぼーっとして、呼びかけに反応しない", icon: <CircleOffIcon /> },
              { text: "食欲が減って、痩せてきた", icon: <UtensilsCrossedIcon /> },
              { text: "散歩の途中で座り込む・動かない", icon: <PawPrintIcon /> },
              { text: "なんとなく年を感じてきた", icon: <ClockIcon /> },
              { text: "毛並みにツヤがなくなった", icon: <SparklesIcon /> },
              { text: "横になっている時間が増えた", icon: <BedDoubleIcon /> },
            ].map((item) => (
              <StaggerItem
                key={item.text}
              >
              <GlowCard className="flex items-start gap-3 bg-white rounded-xl p-5 border border-amber-100 shadow-sm"
              >
                <span className="mt-0.5 shrink-0">{item.icon}</span>
                <span className="text-gray-700">{item.text}</span>
              </GlowCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeInOnScroll>
            <div className="flex flex-col md:flex-row items-center gap-8 mt-12">
              <div className="w-48 md:w-64 rounded-2xl overflow-hidden shadow-lg shrink-0">
                <Image
                  src="/images/image-6.webp"
                  alt="シニア猫"
                  width={400}
                  height={480}
                  className="w-full h-auto"
                />
              </div>
              <div className="text-center md:text-left">
                <p className="text-lg font-bold text-blue-900 mb-2">
                  ひとつでも当てはまるなら、毎日の「健康維持」を見直すタイミングかもしれません。
                </p>
              </div>
            </div>
          </FadeInOnScroll>
        </div>
      </section>

      {/* ============ ココペリとは ============ */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <Parallax speed={0.2}>
              <div className="w-64 md:w-80 rounded-2xl overflow-hidden shadow-xl shrink-0">
                <Image
                  src="/images/image-7.webp"
                  alt="ココペリを見つめる猫"
                  width={480}
                  height={576}
                  className="w-full h-auto"
                />
              </div>
            </Parallax>
            <FadeInOnScroll direction="right">
              <div className="flex-1">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-bold text-xs mb-4">
                  ココペリとは
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-blue-950 mb-4">
                  「幸せをはこぶ精霊」の名を持つ
                  <br />
                  ケイ素濃縮液。
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-4">
                  ココペリ（Kokopelli）は、ネイティブアメリカンに伝わる「幸せをはこぶ精霊」。
                  大切な家族であるペットに、毎日の健康維持という形で幸せを届けたい。
                  そんな想いから生まれた動物用栄養補助食品です。
                </p>
                <p className="text-gray-600 leading-relaxed">
                  原材料はたった2つ：<strong className="text-blue-900">水とケイ素</strong>。
                  余計なものを一切加えないシンプル処方だからこそ、
                  毎日安心して続けていただけます。
                </p>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* ============ 3つの特徴 ============ */}
      <section id="features" className="py-16 md:py-24 bg-blue-50/50">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInOnScroll>
            <h2 className="text-2xl md:text-4xl font-black text-blue-950 mb-4 text-center">
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
                num: "01",
                title: "高濃度ケイ素 10,000mg/L",
                desc: "水溶性ケイ素を高濃度に含有。ケイ素（シリカ）は体内のあらゆる組織に存在するミネラルで、骨・関節・被毛・皮膚の構成要素として知られています。食事に数滴混ぜるだけの手軽さ。",
                icon: <DropletsIcon />,
              },
              {
                title: "原材料たった2つ",
                num: "02",
                desc: "原材料は「水」と「ケイ素」のみ。添加物・保存料・香料は一切使用していません。余計なものを加えないシンプル処方だから、デリケートなシニアペットにも安心してお使いいただけます。",
                icon: <LeafIcon />,
              },
              {
                title: "全成分・全表示を公開",
                num: "03",
                desc: "外箱の表示をすべて公開。成分値・給与方法・注意事項まで、購入前に確認できます。「何が入っているかわからない」という不安を解消し、納得してからお試しいただけます。",
                icon: <ClipboardListIcon />,
              },
            ].map((f) => (
              <StaggerItem key={f.title}>
                <GlowCard className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="shrink-0">{f.icon}</span>
                    <span className="text-xs font-black text-blue-300">
                      {f.num}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-blue-950 mb-3">
                    {f.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </GlowCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============ ケイ素（シリカ）とは ============ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-blue-950 mb-4 text-center">
            そもそも、ケイ素（シリカ）とは？
          </h2>
          <p className="text-gray-600 text-center mb-12 text-lg">
            体内のあらゆる場所で働くミネラル。年齢とともに減少していきます。
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "コラーゲン生成に関与するミネラル",
                desc: "ケイ素はコラーゲンの合成過程に関与するミネラルです。コラーゲンは骨・関節・皮膚・被毛の構造を支えるタンパク質であり、ケイ素はその架橋結合（クロスリンク）に関わるとされています。",
                icon: <BoneIcon />,
              },
              {
                title: "ミトコンドリアに存在するミネラル",
                desc: "ケイ素は細胞内のミトコンドリアにも存在することが研究で報告されています。ミトコンドリアは細胞のエネルギー産生を担う器官であり、体のあらゆる活動の基盤となっています。",
                icon: <MicroscopeIcon />,
              },
              {
                title: "被毛・皮膚・爪の構成要素",
                desc: "ケイ素は毛髪・皮膚・爪に多く含まれるミネラルです。加齢とともに体内のケイ素量は減少していくため、外部からの補給が注目されています。",
                icon: <SparklesAltIcon />,
              },
              {
                title: "体内で生成できないミネラル",
                desc: "ケイ素は必須微量元素でありながら、体内で合成することができません。食事からの摂取が基本ですが、水溶性ケイ素は吸収効率に優れた形態として知られています。",
                icon: <GemIcon />,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border border-blue-100"
              >
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-bold text-blue-950 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            ※ 上記はケイ素（シリカ）というミネラルの一般的な情報であり、本製品の効能効果を示すものではありません。
          </p>

          {/* ケイ素の科学的背景 — 簡潔版 */}
          <div className="mt-12 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-black text-blue-950 mb-4 text-center">
              参考文献
            </h3>
            <ul className="text-xs text-gray-400 space-y-1 max-w-2xl mx-auto">
              <li>Carlisle EM. &quot;Silicon: a possible factor in bone calcification.&quot; Science, 1970</li>
              <li>Jugdaohsingh R. et al. &quot;Dietary silicon intake and absorption.&quot; AJCN, 2002</li>
              <li>Barel A. et al. &quot;Effect of oral intake of choline-stabilized orthosilicic acid on skin, nails and hair.&quot; Archives of Dermatological Research, 2005</li>
              <li>Sripanyakorn S. et al. &quot;The comparative absorption of silicon from different foods and food supplements.&quot; British Journal of Nutrition, 2009</li>
            </ul>

            <p className="text-center text-xs text-gray-400 mt-4">
              ※ 上記はケイ素に関する一般的な栄養学的情報です。本製品の効能効果を示すものではありません。
            </p>
          </div>
        </div>
      </section>

      {/* ============ 製品情報 + パッケージギャラリー ============ */}
      <section id="product" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInOnScroll>
          <h2 className="text-2xl md:text-4xl font-black text-blue-950 mb-4 text-center">
            製品情報
          </h2>
          </FadeInOnScroll>
          <p className="text-gray-600 text-center mb-12 text-lg">
            パッケージ表示のすべてを、購入前にご確認いただけます。
          </p>
          {/* Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { src: "/images/image-4.webp", alt: "ココペリ パッケージ正面", w: 400, h: 700 },
              { src: "/images/image-5.webp", alt: "ココペリ パッケージ側面", w: 300, h: 400 },
              { src: "/images/image-11.webp", alt: "ココペリ 原材料・給与方法", w: 300, h: 400 },
              { src: "/images/image-12.webp", alt: "ココペリ 注意事項・製造情報", w: 300, h: 400 },
            ].map((img) => (
              <div key={img.src} className="rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.w}
                  height={img.h}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
          {/* Spec Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden max-w-2xl mx-auto">
            <div className="divide-y divide-gray-100">
              {[
                ["製品分類", "動物用栄養補助食品"],
                ["商品名", "ココペリ（Kokopelli）"],
                ["主成分", "水溶性ケイ素 10,000mg/L"],
                ["その他成分", "カリウムイオン 470mg/L"],
                ["内容量", "30ml"],
                ["原材料", "水、ケイ素"],
                ["対象動物", "犬・猫（年齢不問）"],
                ["給与方法", "1日1回、食事に数滴混ぜる。またはディスポ容器で直接与える"],
                ["保管方法", "直射日光を避け、常温保存"],
                ["容器", "ガラス瓶"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col sm:flex-row px-6 py-4">
                  <span className="font-bold text-blue-950 sm:w-40 shrink-0">{label}</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            ※ 白い結晶が見えることがありますが、自然のミネラル成分が結晶化したものです。品質に問題はありません。
          </p>
        </div>
      </section>

      {/* ============ エビデンス ============ */}
      <section id="evidence" className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <span className="block text-center text-xs font-black text-blue-400 tracking-widest mb-4">CLINICAL REPORT</span>
          <FadeInOnScroll>
          <h2 className="text-2xl md:text-4xl font-black text-blue-950 mb-4 text-center">
            学会報告症例
          </h2>
          </FadeInOnScroll>
          <p className="text-gray-600 text-center mb-12 text-lg">
            ココペリは学会で症例報告がなされた、学術的にも報告に値する製品です。
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* 症例1 */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-5">
                <span className="inline-flex px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs mb-3">
                  症例1 — 夜間の落ち着き・歩行
                </span>
                <h3 className="text-lg font-bold text-white">
                  柴犬MIX（18歳10か月）
                </h3>
                <p className="text-blue-200 text-xs mt-1">2019年 学会報告症例</p>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
                  <div><span className="font-bold text-blue-950 text-sm">来院時</span><p className="text-gray-600 text-xs mt-1">夜鳴きが激しく、寝たきりの状態として紹介されています。</p></div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <div><span className="font-bold text-blue-950 text-sm">10日後</span><p className="text-gray-600 text-xs mt-1">夜間の落ち着きに変化があった経過が紹介されています。</p></div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2 shrink-0" />
                  <div><span className="font-bold text-blue-950 text-sm">40日後</span><p className="text-gray-600 text-xs mt-1">介助下での起立・歩行が可能になった経過としてまとめられています。</p></div>
                </div>
              </div>
            </div>
            {/* 症例2 */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-5">
                <span className="inline-flex px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs mb-3">
                  症例2 — 長期経過
                </span>
                <h3 className="text-lg font-bold text-white">
                  日本猫（推定11歳）
                </h3>
                <p className="text-blue-200 text-xs mt-1">2019年 学会報告症例</p>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
                  <div><span className="font-bold text-blue-950 text-sm">来院時</span><p className="text-gray-600 text-xs mt-1">目元の状態について来院時の様子が紹介されています。</p></div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2 shrink-0" />
                  <div><span className="font-bold text-blue-950 text-sm">270日後</span><p className="text-gray-600 text-xs mt-1">長期経過の中で、掲載写真とともに変化が確認された例として掲載されています。</p></div>
                </div>
              </div>
            </div>
            {/* 症例3 */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-5">
                <span className="inline-flex px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs mb-3">
                  症例3 — 起立・歩行
                </span>
                <h3 className="text-lg font-bold text-white">
                  ラブラドール（10歳）
                </h3>
                <p className="text-blue-200 text-xs mt-1">2023年 学会報告症例</p>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0" />
                  <div><span className="font-bold text-blue-950 text-sm">来院時</span><p className="text-gray-600 text-xs mt-1">起立が難しく、台車で来院した例として紹介されています。</p></div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                  <div><span className="font-bold text-blue-950 text-sm">3日後</span><p className="text-gray-600 text-xs mt-1">立ち上がりや歩行に変化がみられた経過が掲載されています。</p></div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2 shrink-0" />
                  <div><span className="font-bold text-blue-950 text-sm">10日後</span><p className="text-gray-600 text-xs mt-1">より安定した足取りになった経過として紹介されています。</p></div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-8">
            ※ 上記は学会で報告された個別症例の要点整理です。すべての犬猫に同様の変化が見られることを保証するものではありません。
            本品は動物用栄養補助食品であり、医薬品ではありません。
          </p>
        </div>
      </section>

      {/* ============ 使い方 ============ */}
      <section id="howto" className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <span className="block text-center text-xs font-black text-blue-400 tracking-widest mb-4">HOW TO USE</span>
          <FadeInOnScroll>
          <h2 className="text-2xl md:text-4xl font-black text-blue-950 mb-4 text-center">
            かんたん3ステップ
          </h2>
          </FadeInOnScroll>
          <p className="text-gray-600 text-center mb-12 text-lg">
            毎日のごはんに数滴加えるだけ。手間なく続けられます。
          </p>
          <StaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {[
              {
                step: "おすすめ①",
                title: "スポイトで直接与える",
                desc: "付属のディスポ容器（スポイト）で、口元に直接数滴たらします。もっとも効率的な与え方です。",
                icon: <PipetteIcon />,
              },
              {
                step: "おすすめ②",
                title: "フードにしみこませる",
                desc: "ドライフードやおやつに数滴しみこませてから与えます。味や匂いがほぼないので、嫌がらずに食べてくれます。",
                icon: <CookieIcon />,
              },
              {
                step: "ポイント",
                title: "毎日続けることが大切",
                desc: "1日1回を目安に継続。まずは1〜2ヶ月お試しください。飲み水に入れるよりも、直接またはフードにしみこませる方が効率的です。",
                icon: <CalendarCheckIcon />,
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-20 h-20 rounded-full bg-white border-2 border-blue-200 flex items-center justify-center mx-auto mb-4 shadow-sm">
                  {s.icon}
                </div>
                <span className="text-xs font-black text-blue-400 tracking-widest">
                  {s.step}
                </span>
                <h3 className="font-bold text-blue-950 mt-1 mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============ 商品ビジュアル帯 ============ */}
      <section className="py-8 bg-gray-50 overflow-hidden">
        <FadeInOnScroll>
          <div className="flex gap-4 justify-center items-center max-w-5xl mx-auto px-4">
            {[
              { src: "/images/image-1.webp", alt: "ココペリ パッケージ正面" },
              { src: "/images/image-2.webp", alt: "ココペリ パッケージ側面" },
              { src: "/images/image-8.webp", alt: "ココペリ 外箱" },
              { src: "/images/image-3.webp", alt: "ココペリ ロゴ" },
            ].map((img) => (
              <div key={img.src} className="w-32 md:w-40 rounded-xl overflow-hidden shadow-md border border-gray-100 shrink-0">
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

      {/* ============ 給与量ガイド ============ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInOnScroll>
          <h2 className="text-2xl md:text-4xl font-black text-blue-950 mb-4 text-center">
            給与量の目安
          </h2>
          </FadeInOnScroll>
          <p className="text-gray-600 text-center mb-12 text-lg">
            体重に合わせて調整。はじめは半量からのスタートがおすすめです。
          </p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 text-center">
              <p className="text-white font-bold">基本目安: 体重1kgあたり <span className="text-2xl">0.1cc</span> / 日</p>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                ["小型犬（〜5kg）", "0.3〜0.5cc", "1〜2滴"],
                ["中型犬（5〜15kg）", "0.5〜1.5cc", "3〜5滴"],
                ["大型犬（15kg〜）", "1.5〜3.0cc", "5〜10滴"],
                ["猫（3〜5kg）", "0.3〜0.5cc", "1〜2滴"],
              ].map(([animal, amount, drops]) => (
                <div key={animal} className="flex items-center px-6 py-4">
                  <span className="font-bold text-blue-950 w-44 shrink-0">{animal}</span>
                  <span className="text-gray-600 w-32">{amount}</span>
                  <span className="text-blue-600 font-bold">{drops}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-2xl mx-auto mt-6 bg-amber-50 rounded-xl p-5 border border-amber-100">
            <p className="text-sm text-amber-800">
              <strong>はじめての方へ:</strong> 最初の1週間は上記の半量からスタートし、様子を見ながら徐々に増やしてください。
              食事に混ぜても、ディスポ容器で直接与えても構いません。
            </p>
          </div>
        </div>
      </section>

      {/* ============ 他のサプリとの違い ============ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInOnScroll>
          <h2 className="text-2xl md:text-4xl font-black text-blue-950 mb-4 text-center">
            他のペットサプリメントとの違い
          </h2>
          </FadeInOnScroll>
          <p className="text-gray-600 text-center mb-12 text-lg">
            ココペリは「引き算」の発想で作られています。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-6 py-4 text-left font-bold text-blue-950">比較項目</th>
                  <th className="px-6 py-4 text-left font-bold text-blue-700">ココペリ</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-600">一般的なペットサプリ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["原材料数", "2種類（水・ケイ素）", "10〜30種類以上"],
                  ["添加物", "なし", "保存料・香料・着色料等"],
                  ["形態", "液体（食事に混ぜるだけ）", "錠剤・カプセル（飲ませにくい場合も）"],
                  ["成分表示", "全公開（外箱写真掲載）", "一部のみ / 非公開"],
                  ["犬猫兼用", "○", "別製品の場合が多い"],
                ].map(([item, koko, gen]) => (
                  <tr key={item}>
                    <td className="px-6 py-4 font-bold text-blue-950">{item}</td>
                    <td className="px-6 py-4 text-blue-700 font-bold">{koko}</td>
                    <td className="px-6 py-4 text-gray-500">{gen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ============ お客様の声 ============ */}
      <section className="py-16 md:py-24 bg-blue-50/50">
        <div className="max-w-5xl mx-auto px-4">
          <FadeInOnScroll>
          <h2 className="text-2xl md:text-4xl font-black text-blue-950 mb-12 text-center">
            ご愛用者の声
          </h2>
          </FadeInOnScroll>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: "毎日の食事にサッと混ぜるだけで手軽に続けられています。猫たちの毎日の習慣として欠かせない存在になりました。",
                name: "愛猫家の方",
                pet: "猫2匹（12歳・10歳）",
              },
              {
                text: "15歳の犬に毎日あげています。液体なのでフードに混ぜるだけで手間もなく、続けやすいのが気に入っています。",
                name: "愛犬家の方",
                pet: "トイプードル（15歳）",
              },
              {
                text: "シニア期に入ってから食欲にムラがありましたが、続けているうちに毎日しっかり食べるようになりました。毛並みも少しふわっとしてきた気がします。",
                name: "シニア犬の飼い主さま",
                pet: "柴犬（13歳）",
              },
            ].map((v) => (
              <div
                key={v.name}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm"
              >
                <div className="text-yellow-400 text-sm mb-3">★★★★★</div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  &ldquo;{v.text}&rdquo;
                </p>
                <p className="text-sm font-bold text-blue-900">— {v.name}</p>
                <p className="text-xs text-gray-500">{v.pet}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            ※ 個人の感想であり、すべての犬猫に同様の結果を保証するものではありません。
          </p>
        </div>
      </section>

      {/* ============ 安心・安全への取り組み ============ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInOnScroll>
          <h2 className="text-2xl md:text-4xl font-black text-blue-950 mb-12 text-center">
            安心・安全への取り組み
          </h2>
          </FadeInOnScroll>
          <StaggerContainer className="grid md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {[
              {
                title: "シンプル処方",
                desc: "原材料は水とケイ素の2種類のみ。添加物・保存料・香料は一切使用していません。",
                icon: <FlaskConicalIcon />,
              },
              {
                title: "国内製造",
                desc: "シリカラボが国内で製造・品質管理を行っています。",
                icon: <FactoryIcon />,
              },
              {
                title: "全表示公開",
                desc: "外箱に記載されている成分値・給与方法・注意事項のすべてを購入前に公開しています。",
                icon: <FileCheckIcon />,
              },
              {
                title: "学会での紹介実績",
                desc: "学会にて個別症例が報告されています。",
                icon: <GraduationCapIcon />,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <span className="shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-blue-950 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============ 不安を解消する ============ */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <FadeInOnScroll>
          <h2 className="text-2xl md:text-4xl font-black text-blue-950 mb-4 text-center">
            こんな不安、ありませんか？
          </h2>
          </FadeInOnScroll>
          <FadeInOnScroll delay={0.1}>
          <p className="text-gray-600 text-center mb-12">
            初めてのペットサプリ。不安があるのは当然です。
          </p>
          </FadeInOnScroll>
          <div className="space-y-6">
            {[
              {
                worry: "本当に安全なの？",
                answer: "原材料は水とケイ素の2つだけ。添加物ゼロ。株式会社シリカラボが宮崎県で製造し、10年間動物病院で使用されてきた実績があります。",
              },
              {
                worry: "効果があるかわからない…",
                answer: "ココペリは栄養補助食品であり、即効性を謳う製品ではありません。ただし、学会で複数の症例報告がなされるほど、獣医師からの評価を得ている製品です。まずは1〜2ヶ月お試しください。",
              },
              {
                worry: "うちの子が嫌がらない？",
                answer: "味も匂いもほぼありません。食事に数滴混ぜるか、スポイトで直接与えるだけ。「嫌がらずに食べてくれる」という声を多くいただいています。",
              },
              {
                worry: "ネットで買うのが不安…",
                answer: "決済はStripe社（世界最大級の決済プラットフォーム）の安全な画面で行われます。カード情報は当サイトには一切保存されません。Amazon・Shopifyと同じ決済基盤です。",
              },
              {
                worry: "高くない？",
                answer: "2本セットなら¥5,980で送料無料。動物病院に行く手間もなく、ご自宅に届きます。定期便なら¥5,480/月でさらにおトクに続けられます。",
              },
            ].map((item) => (
              <FadeInOnScroll key={item.worry}>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="font-bold text-red-500 text-lg mb-3">
                    「{item.worry}」
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    → {item.answer}
                  </p>
                </div>
              </FadeInOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <FadeInOnScroll>
          <h2 className="text-2xl md:text-4xl font-black text-blue-950 mb-12 text-center">
            よくあるご質問
          </h2>
          </FadeInOnScroll>
          <StaggerContainer className="space-y-4" staggerDelay={0.05}>
            {[
              [
                "白い結晶のようなものが見えますが大丈夫ですか？",
                "自然のミネラル成分が結晶化したものです。品質に問題はございません。外箱にもその旨記載しております。",
              ],
              [
                "若い犬や猫にも使えますか？",
                "はい、年齢を問わずご使用いただけます。シニア期だけでなく、日常の健康維持にもお役立ていただけます。",
              ],
              [
                "どのくらいで変化を感じられますか？",
                "個体差がございますが、まずは1〜2ヶ月ほど継続してお試しください。",
              ],
              [
                "他のサプリメントやフードと併用できますか？",
                "食品ですので、基本的に併用いただけます。ご心配な場合はかかりつけの獣医師にご相談ください。",
              ],
              [
                "1本でどのくらい持ちますか？",
                "1本30mlです。体重や給与量にもよりますが、小型犬・猫の場合は約2〜4週間が目安です。",
              ],
              [
                "犬と猫で与え方は違いますか？",
                "基本的な与え方は同じです。食事に数滴混ぜるか、ディスポ容器で直接与えてください。",
              ],
              [
                "開封後の保存方法は？",
                "開封後もキャップをしっかり閉めて常温保存してください。直射日光は避けてください。",
              ],
              [
                "定期購入はありますか？",
                "はい、月額¥5,480の定期便（2本/月）がございます。単品（¥3,480）より毎月¥1,000おトクで送料無料。さらに5+1セット（¥15,000・6本届く）なら1本あたり¥2,500と最もおトクです。",
              ],
              [
                "原材料は何ですか？",
                "水と水溶性ケイ素の2つだけです。着色料・香料・保存料は一切使用しておりません。",
              ],
              [
                "送料はかかりますか？",
                "5+1セットと定期便は全国送料無料です。1本のみのご注文は別途送料がかかります。ご注文確定後、3〜5営業日以内に発送いたします。",
              ],
            ].map(([q, a]) => (
              <div
                key={q}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
              >
                <p className="font-bold text-blue-950 mb-2">Q. {q}</p>
                <p className="text-gray-600 text-sm leading-relaxed">A. {a}</p>
              </div>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ============ こんな方におすすめ ============ */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInOnScroll>
          <h2 className="text-2xl md:text-4xl font-black text-blue-950 mb-12 text-center">
            こんな飼い主さまにおすすめです
          </h2>
          </FadeInOnScroll>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "シニア期に入った愛犬・愛猫の健康維持を考えている方",
              "動物病院で「年齢的なもの」と言われ、家でできることを探している方",
              "成分が明確で安心できるサプリメントを探している方",
              "錠剤やカプセルが苦手なペットの飼い主さま",
              "シンプルで手間のかからないケアを求めている方",
              "食事に混ぜるだけで続けられるものを探している方",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-blue-50 rounded-xl p-5"
              >
                <span className="text-blue-600 font-bold text-lg mt-0.5">✓</span>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Final CTA ============ */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-blue-900 to-blue-950 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/image-13.webp" alt="" fill className="object-cover" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <FadeInOnScroll>
          <FadeInOnScroll><h2 className="text-2xl md:text-4xl font-black text-white mb-4">
            大切な家族の健康維持に。
            <br />
            ココペリをお試しください。
          </h2></FadeInOnScroll>
          </FadeInOnScroll>
          {/* 損失回避 */}
          <p className="text-blue-200 text-lg mb-2">
            10年間、動物病院でしか手に入らなかった製品です。
          </p>
          <p className="text-amber-300 text-sm font-bold mb-6">
            オンライン販売は始まったばかり。いつまで続くかは未定です。
          </p>

          <div className="text-center mb-6">
            <p className="text-white text-2xl font-black mb-2">5+1セット ¥15,000（送料無料）</p>
            <p className="text-blue-200 text-sm">1本 ¥3,480 / 2本セット ¥5,980 / 定期便 ¥5,480/月（送料無料）</p>
          </div>

          <Link
            href="/checkout"
            className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-400 text-white px-12 py-5 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 mb-4"
          >
            購入ページへ →
          </Link>

          {/* 社会的証明 */}
          <p className="text-blue-200 text-sm mb-2">
            多くの飼い主さまにご愛用いただいています
          </p>
          <p className="text-blue-300 text-xs">
            クレジットカード決済 / セット・定期便送料無料 / 3〜5営業日以内に発送
          </p>
          <p className="text-blue-400 text-xs mt-8">
            ※ 本品は動物用栄養補助食品であり、医薬品ではありません。
            疾病の治療・予防を目的としたものではありません。
          </p>
        </div>
      </section>

      {/* ============ 動物病院での取り扱い ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInOnScroll>
          <h2 className="text-2xl md:text-3xl font-black text-blue-950 mb-8 text-center">
            動物病院でも採用されています
          </h2>
          </FadeInOnScroll>
          <FadeInOnScroll><div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-100 mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              ココペリは、<strong>さがら動物病院</strong>の獣医師が治験担当として臨床現場で使用・研究してきた製品です。
              学会でも<strong>2度の症例報告</strong>が行われており、
              獣医療の現場で実際に活用されています。
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              製造元の<strong>株式会社シリカラボ</strong>（宮崎県都城市 / 代表: 渡邊道治）が
              品質管理・製造・発送を一貫して行っています。
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              これまで動物病院を通じてのみ入手可能だったココペリが、
              <strong className="text-blue-900">ついにオンラインで直接購入できるようになりました。</strong>
            </p>
            <p className="text-sm text-gray-500">
              ※ すべての動物病院で取り扱いがあるわけではありません。
            </p>
          </div></FadeInOnScroll>
        </div>
      </section>

      {/* ============ 会社概要 ============ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <FadeInOnScroll>
          <h2 className="text-2xl md:text-3xl font-black text-blue-950 mb-8 text-center">
            会社概要
          </h2>
          </FadeInOnScroll>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["製造元", "株式会社シリカラボ"],
                  ["代表", "渡邊道治"],
                  ["所在地", "〒885-0086 宮崎県都城市久保原町9-43"],
                  ["研究機関", "さがら動物病院（治験担当）"],
                  ["販売協賛", "カムトゥル（Come true）"],
                  ["WEBサイト", "https://silica-lab.jp/"],
                  ["お問い合わせ", "info@silica-lab.com"],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-gray-100 last:border-0">
                    <td className="px-6 py-4 font-bold text-blue-950 bg-gray-50 w-1/3">
                      {label}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {value.startsWith("http") ? (
                        <a
                          href={value}
                          className="text-blue-600 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {value}
                        </a>
                      ) : value.includes("@") ? (
                        <a href={`mailto:${value}`} className="text-blue-600 underline">
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

      {/* ============ Footer ============ */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
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
                お問い合わせ:{" "}
                <a
                  href="mailto:info@silica-lab.com?subject=ココペリのお問い合わせ"
                  className="text-blue-400 hover:text-blue-300"
                >
                  info@silica-lab.com
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-xs text-center space-y-2">
            <p>
              本品は動物用栄養補助食品であり、医薬品ではありません。
              掲載の感想は個別の経過や感想であり、すべての犬猫に同様の変化を保証するものではありません。
              ご判断に迷う場合は、かかりつけの獣医師へご相談ください。
            </p>
            <p>&copy; {new Date().getFullYear()} kokopelli / Come true</p>
          </div>
        </div>
      </footer>

      {/* ============ Schema.org 構造化データ ============ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: "ココペリ（Kokopelli）",
            description:
              "犬・猫のための動物用栄養補助食品。高濃度の水溶性ケイ素10,000mg/Lを含むケイ素濃縮液。原材料は水とケイ素のみ。",
            image: "https://kokopelli-ec.vercel.app/images/image-4.webp",
            brand: { "@type": "Brand", name: "kokopelli" },
            manufacturer: {
              "@type": "Organization",
              name: "株式会社シリカラボ",
              address: {
                "@type": "PostalAddress",
                addressLocality: "都城市",
                addressRegion: "宮崎県",
                addressCountry: "JP",
              },
            },
            offers: [
              {
                "@type": "Offer",
                name: "1本（通常購入）",
                price: "3480",
                priceCurrency: "JPY",
                availability: "https://schema.org/InStock",
                url: "https://kokopelli-ec.vercel.app/checkout",
                seller: { "@type": "Organization", name: "カムトゥル" },
                deliveryLeadTime: { "@type": "QuantitativeValue", minValue: 3, maxValue: 5, unitCode: "DAY" },
              },
              {
                "@type": "Offer",
                name: "5+1セット（6本）",
                price: "15000",
                priceCurrency: "JPY",
                availability: "https://schema.org/InStock",
                url: "https://kokopelli-ec.vercel.app/checkout",
                seller: { "@type": "Organization", name: "カムトゥル" },
                shippingDetails: {
                  "@type": "OfferShippingDetails",
                  shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "JPY" },
                  shippingDestination: { "@type": "DefinedRegion", addressCountry: "JP" },
                  deliveryTime: { "@type": "ShippingDeliveryTime", businessDays: { "@type": "QuantitativeValue", minValue: 3, maxValue: 5 } },
                },
              },
            ],
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5",
              reviewCount: "3",
            },
          }),
        }}
      />
    </>
  );
}
