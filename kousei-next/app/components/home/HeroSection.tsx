import Image from 'next/image';
import { BUSINESS } from '../../lib/business-info';

const HERO_TAGS = ['完全無料', 'データ消去対応', '法人OK', '出張・宅配・持込', '消去証明書発行'];

/**
 * トップページのヒーロー。
 * h1 は clamp 上限 64px。<br/> は md 以上のみ有効にし、モバイルは自然折返しで二重折れを防ぐ。
 */
export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-950 bg-noise">
      <Image
        src="/photos/hero.jpg"
        alt="横浜・神奈川のパソコン無料回収サービス PC回収便のメインビジュアル"
        fill
        loading="eager"
        fetchPriority="high"
        sizes="100vw"
        className="hero-zoom object-cover object-center -z-10"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-950/85 via-neutral-900/75 to-neutral-950/90" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(245,166,35,0.25),transparent_55%)]" />
      {/* 浮遊オーブ (質感レイヤー) */}
      <div
        aria-hidden="true"
        className="float-slow absolute -z-10 top-[10%] right-[6%] w-64 h-64 md:w-96 md:h-96 rounded-full bg-brand/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="float-slow absolute -z-10 bottom-[4%] -left-[6%] w-72 h-72 rounded-full bg-[#ffb84d]/10 blur-3xl [animation-delay:-4.5s]"
      />

      <div className="max-w-[980px] mx-auto px-6 pt-28 pb-24 md:pt-40 md:pb-36 text-white">
        <div className="hero-enter inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-xs font-medium tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          横浜市 / 神奈川県全域 / 無料回収
        </div>
        <h1 className="hero-enter [animation-delay:0.12s] mt-8 text-[clamp(34px,5.5vw,64px)] font-black leading-[1.1] tracking-tight">
          横浜・神奈川のパソコン、
          <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-brand to-[#ffb84d] bg-clip-text text-transparent">
            完全無料
          </span>
          で回収。
        </h1>
        <p className="hero-enter [animation-delay:0.24s] mt-8 text-lg md:text-xl text-neutral-200 max-w-xl leading-relaxed">
          データ消去・出張回収・証明書発行まですべて0円。
          <br className="hidden md:inline" />
          個人のお客様も、法人の大量回収も、横浜市18区・神奈川全域で対応します。
        </p>
        <div className="hero-enter [animation-delay:0.36s] mt-10 flex flex-wrap gap-4">
          <a
            href={BUSINESS.lineUrl}
            target="_blank"
            rel="noopener"
            className="group btn-sheen inline-flex items-center bg-brand text-neutral-900 font-semibold px-8 py-4 rounded-full text-base hover:bg-brand-hover transition-all shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:-translate-y-0.5 min-h-[44px]"
            aria-label="LINEで無料回収を相談する"
          >
            無料回収を相談する
            <svg
              className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
          <a
            href={BUSINESS.telLink}
            className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/30 text-white font-semibold px-8 py-4 rounded-full text-base hover:bg-white/20 transition min-h-[44px]"
            aria-label={`電話で相談 ${BUSINESS.telDisplay}`}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {BUSINESS.telDisplay}
          </a>
        </div>
        <div className="hero-enter [animation-delay:0.48s] mt-12 flex flex-wrap gap-3">
          {HERO_TAGS.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-white/80 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-2 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
