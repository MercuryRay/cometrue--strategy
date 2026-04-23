/**
 * KokopelliLogo — ブランド共通 SVG ロゴ
 *
 * - slate-800 背景 + amber グラデーションの水滴 + 肉球
 * - LP/Checkout/Success ヘッダーで共通利用
 * - サイズは props で可変（デフォルト 40px）
 */
export default function KokopelliLogo({ size = 40 }: { size?: number }) {
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
      <circle cx="60" cy="60" r="58" fill="#1e293b" />
      <path
        d="M60 18 C60 18 34 54 34 72 C34 86.4 45.6 98 60 98 C74.4 98 86 86.4 86 72 C86 54 60 18 60 18Z"
        fill="url(#dropGradKokopelli)"
      />
      <ellipse cx="60" cy="74" rx="10" ry="8" fill="#1e293b" opacity="0.85" />
      <ellipse cx="47" cy="62" rx="5.5" ry="5" fill="#1e293b" opacity="0.85" />
      <ellipse cx="73" cy="62" rx="5.5" ry="5" fill="#1e293b" opacity="0.85" />
      <ellipse cx="50" cy="72" rx="4.5" ry="4" fill="#1e293b" opacity="0.85" />
      <ellipse cx="70" cy="72" rx="4.5" ry="4" fill="#1e293b" opacity="0.85" />
      <defs>
        <linearGradient
          id="dropGradKokopelli"
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
