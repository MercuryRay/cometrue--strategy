/**
 * ComparisonTable 用のデータ定義
 *
 * 注意事項:
 * - 他社商品を実名で貶めない。比較対象は一般名詞 (市販ミネラル水 / 一般ペット用水 / 水道水) に限定する。
 * - 数値・科学的根拠を伴うパラメータは断定しない。豊富・含有など定性表現を用いる。
 * - 薬機法 NG ワード (治療 / 治癒 / 効果 / 効能) は使用しない。
 */

export type ComparisonValue =
  | { kind: 'yes'; label?: string }
  | { kind: 'no'; label?: string }
  | { kind: 'partial'; label?: string }
  | { kind: 'text'; label: string };

export type ComparisonColumn = {
  id: string;
  /** 表示名 (一般名詞のみ) */
  name: string;
  /** ココペリ列のみ true */
  highlight?: boolean;
  /** 列下部の補足 */
  caption?: string;
};

export type ComparisonRow = {
  id: string;
  /** 行のラベル (左端固定列に表示) */
  label: string;
  /** 行の補足 (任意) */
  hint?: string;
  /** 列 id -> 値 */
  values: Record<string, ComparisonValue>;
};

export const COMPARISON_COLUMNS: ComparisonColumn[] = [
  {
    id: 'kokopelli',
    name: 'ココペリ',
    highlight: true,
    caption: 'ペット想いのシリカウォーター',
  },
  { id: 'tap', name: '水道水', caption: 'ご家庭の蛇口' },
  { id: 'mineral', name: '市販ミネラル水', caption: '人用ボトルドウォーター' },
  { id: 'petwater', name: '一般ペット用水', caption: 'ペット向け一般流通品' },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: 'silica',
    label: 'シリカ含有',
    hint: 'ミネラル成分のひとつ',
    values: {
      kokopelli: { kind: 'text', label: '豊富に含有' },
      tap: { kind: 'no', label: 'ごく少量' },
      mineral: { kind: 'partial', label: '商品により差' },
      petwater: { kind: 'no', label: '表示なし' },
    },
  },
  {
    id: 'fluoride',
    label: 'フッ素フリー',
    values: {
      kokopelli: { kind: 'yes', label: 'フッ素不使用' },
      tap: { kind: 'partial', label: '地域により含有' },
      mineral: { kind: 'partial', label: '商品により差' },
      petwater: { kind: 'partial', label: '商品により差' },
    },
  },
  {
    id: 'chlorine',
    label: '残留塩素',
    values: {
      kokopelli: { kind: 'yes', label: '不検出' },
      tap: { kind: 'no', label: '残留あり' },
      mineral: { kind: 'yes', label: '不検出' },
      petwater: { kind: 'partial', label: '商品により差' },
    },
  },
  {
    id: 'ph',
    label: 'pH',
    values: {
      kokopelli: { kind: 'text', label: '弱アルカリ性' },
      tap: { kind: 'text', label: '中性付近' },
      mineral: { kind: 'text', label: '商品により差' },
      petwater: { kind: 'text', label: '中性付近' },
    },
  },
  {
    id: 'additive',
    label: '無添加',
    values: {
      kokopelli: { kind: 'yes', label: '香料・保存料不使用' },
      tap: { kind: 'partial', label: '消毒由来成分あり' },
      mineral: { kind: 'yes', label: '基本的に無添加' },
      petwater: { kind: 'partial', label: '商品により差' },
    },
  },
  {
    id: 'subscription',
    label: '定期便',
    hint: '送料無料・いつでも停止可',
    values: {
      kokopelli: { kind: 'yes', label: '2本/月 ¥5,480' },
      tap: { kind: 'no' },
      mineral: { kind: 'partial', label: '一部対応' },
      petwater: { kind: 'partial', label: '一部対応' },
    },
  },
];
