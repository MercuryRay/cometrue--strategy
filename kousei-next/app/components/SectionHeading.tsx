type SectionHeadingProps = {
  /** 小ラベル (例: 'SERVICE' / 'データ消去')。text-brand-text で表示 */
  eyebrow?: string;
  /** h2 見出し本文 */
  title: string;
  /** 見出し下のリード文 */
  lead?: string;
  /** 揃え。既定は 'left' */
  align?: 'left' | 'center';
};

/**
 * サイト共通のセクション見出し。
 * h2 は text-3xl md:text-4xl font-black tracking-tight で全ページ統一。
 * 文字色は継承 (ダーク背景セクションでもそのまま使える)。
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div className={isCenter ? 'text-center' : 'text-left'}>
      {eyebrow && (
        <p className="text-brand-text text-[13px] font-bold tracking-widest mb-2">{eyebrow}</p>
      )}
      <h2 className="text-3xl md:text-4xl font-black tracking-tight">{title}</h2>
      {lead && (
        <p
          className={`mt-4 text-neutral-500 leading-relaxed max-w-2xl ${isCenter ? 'mx-auto' : ''}`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
