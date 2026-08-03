type JsonLdProps = { data: object };

/**
 * JSON-LD 構造化データを安全に出力する共通コンポーネント。
 * `<` を Unicode エスケープ (u003c 形式) に変換し、データ内の文字列から閉じ script タグが
 * 生成されて HTML が壊れる/XSS になるのを防ぐ (JSON-LD としての意味は不変)。
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
