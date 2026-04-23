# D2C LP Badge Set (SVG)

kokopelli-ec LP 用の信頼性バッジセット。全て 120x120 viewBox、外部フォント・外部リソース不使用、自社オファーのみで構成（架空の第三者認証は含まない）。

## 一覧

| ファイル                     | 用途                     | カテゴリ                   |
| ---------------------------- | ------------------------ | -------------------------- |
| `ssl-secure.svg`             | SSL 暗号化通信           | セキュリティ               |
| `satisfaction-guarantee.svg` | 30日返金保証             | 自社オファー               |
| `free-shipping.svg`          | 送料無料                 | 自社オファー               |
| `made-in-japan.svg`          | 日本製（原産地表示）     | 品質                       |
| `pet-safe.svg`               | ペットに安心             | 用途訴求                   |
| `no-additives.svg`           | 無添加（筆字＋ハンコ風） | 品質                       |
| `vet-recommended.svg`        | 獣医師も注目             | 専門家訴求（断定回避表現） |
| `subscription-save.svg`      | 定期購入で 10% OFF       | 自社オファー               |

## 使い方（Next.js / React）

### 1. `<img>` タグで直接参照

```tsx
<img src="/badges/ssl-secure.svg" alt="SSL Secure" width={96} height={96} />
```

### 2. `next/image` で参照

```tsx
import Image from 'next/image';

<Image
  src="/badges/satisfaction-guarantee.svg"
  alt="30日返金保証"
  width={96}
  height={96}
  unoptimized
/>;
```

`unoptimized` を付けると SVG 最適化をスキップ（小サイズなので不要）。

### 3. LP のトラストバッジ帯として並べる

```tsx
const badges = [
  { src: '/badges/ssl-secure.svg', alt: 'SSL 暗号化通信' },
  { src: '/badges/satisfaction-guarantee.svg', alt: '30日返金保証' },
  { src: '/badges/free-shipping.svg', alt: '送料無料' },
  { src: '/badges/made-in-japan.svg', alt: 'Made in Japan' },
  { src: '/badges/pet-safe.svg', alt: 'ペットに安心' },
  { src: '/badges/no-additives.svg', alt: '無添加' },
  { src: '/badges/vet-recommended.svg', alt: '獣医師も注目' },
  { src: '/badges/subscription-save.svg', alt: '定期購入で10%OFF' },
];

export function TrustBadges() {
  return (
    <ul className="grid grid-cols-4 gap-4 md:grid-cols-8 justify-items-center">
      {badges.map((b) => (
        <li key={b.src}>
          <img src={b.src} alt={b.alt} width={80} height={80} loading="lazy" />
        </li>
      ))}
    </ul>
  );
}
```

## 注意事項

- 表示サイズは任意（viewBox 指定のためスケーラブル）。LP では 72–96px 推奨。
- テキストは `system-ui` フォールバックを使用。OS の既定日本語フォントで描画される。筆字風（無添加）は `Yu Mincho` / `Hiragino Mincho Pro` フォールバック。
- 「獣医師も注目」は推奨・承認を断定しない表現。「推奨」「認定」と言い換えない（景表法・薬機法リスク回避）。
- `satisfaction-guarantee.svg` / `subscription-save.svg` の数字（30日・10%OFF）は実オファーに合わせて数値を変える場合は SVG 内の `<text>` を書き換えてください。
- 追加バナー・背景透過用途は既に透明背景ではないので、枠取りが不要ならバッジの最外周 `<circle>` の `stroke` を削除してください。

## ライセンス

社内プロジェクト kokopelli-ec 専用。他プロジェクト流用時は事前に相談すること。
