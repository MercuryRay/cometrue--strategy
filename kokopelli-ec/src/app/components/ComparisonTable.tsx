'use client';

import { useState } from 'react';
import {
  COMPARISON_COLUMNS,
  COMPARISON_ROWS,
  type ComparisonColumn,
  type ComparisonRow,
  type ComparisonValue,
} from '@/lib/comparison';

type Props = {
  /** 表題 (省略可) */
  title?: string;
  /** リード文 (省略可) */
  lead?: string;
};

/**
 * D2C 向け比較表コンポーネント。
 * - PC: 全列テーブル表示
 * - モバイル: 「表で見る / カードで見る」切替 + 横スクロール対応
 * - ココペリ列は amber ハイライト、他列は slate/gray 系で落ち着かせる
 */
export default function ComparisonTable({ title, lead }: Props) {
  const [mobileView, setMobileView] = useState<'table' | 'stack'>('stack');

  return (
    <section
      aria-labelledby="comparison-heading"
      className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16"
    >
      <header className="mb-6 text-center sm:mb-10">
        <h2
          id="comparison-heading"
          className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl"
        >
          {title ?? 'ココペリは、ここが違います'}
        </h2>
        {lead ? (
          <p className="mt-3 text-sm text-slate-600 sm:text-base">{lead}</p>
        ) : (
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            水道水・市販ミネラル水・一般ペット用水と、毎日の一杯をくらべてみました。
          </p>
        )}
      </header>

      {/* モバイル表示切替 */}
      <div className="mb-4 flex justify-center gap-2 sm:hidden">
        <button
          type="button"
          onClick={() => setMobileView('stack')}
          aria-pressed={mobileView === 'stack'}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
            mobileView === 'stack'
              ? 'bg-amber-600 text-white shadow'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          カードで見る
        </button>
        <button
          type="button"
          onClick={() => setMobileView('table')}
          aria-pressed={mobileView === 'table'}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
            mobileView === 'table'
              ? 'bg-amber-600 text-white shadow'
              : 'bg-slate-100 text-slate-600'
          }`}
        >
          表で見る
        </button>
      </div>

      {/* テーブル (PC 常時 / モバイルは table モード時のみ) */}
      <div className={`${mobileView === 'table' ? 'block' : 'hidden'} sm:block`}>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-slate-50 px-4 py-4 text-left text-xs font-semibold text-slate-500"
                >
                  項目
                </th>
                {COMPARISON_COLUMNS.map((col) => (
                  <th
                    key={col.id}
                    scope="col"
                    className={`px-4 py-4 text-center text-sm font-semibold ${
                      col.highlight
                        ? 'bg-amber-50 text-amber-700 ring-2 ring-amber-500'
                        : 'text-slate-600'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span>{col.name}</span>
                      {col.caption ? (
                        <span
                          className={`text-[10px] font-normal ${
                            col.highlight ? 'text-amber-600' : 'text-slate-400'
                          }`}
                        >
                          {col.caption}
                        </span>
                      ) : null}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr key={row.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-inherit px-4 py-4 text-left text-sm font-medium text-slate-700"
                  >
                    <div>{row.label}</div>
                    {row.hint ? (
                      <div className="mt-0.5 text-[10px] font-normal text-slate-400">
                        {row.hint}
                      </div>
                    ) : null}
                  </th>
                  {COMPARISON_COLUMNS.map((col) => (
                    <td
                      key={col.id}
                      className={`px-4 py-4 text-center align-middle ${
                        col.highlight ? 'bg-amber-50/70' : ''
                      }`}
                    >
                      <Cell value={row.values[col.id]} highlight={col.highlight} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* モバイル カード表示 */}
      <div className={`${mobileView === 'stack' ? 'block' : 'hidden'} sm:hidden`}>
        <div className="flex flex-col gap-4">
          {COMPARISON_COLUMNS.map((col) => (
            <MobileCard key={col.id} column={col} rows={COMPARISON_ROWS} />
          ))}
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] text-slate-400">
        ※ 比較対象は一般名詞に基づく参考情報です。商品・地域・ロットにより性状は異なります。
      </p>
    </section>
  );
}

function Cell({ value, highlight }: { value: ComparisonValue | undefined; highlight?: boolean }) {
  if (!value) return <span className="text-slate-300">—</span>;
  const base = 'inline-flex items-center gap-1 text-xs font-medium';
  switch (value.kind) {
    case 'yes':
      return (
        <span className={`${base} ${highlight ? 'text-amber-700' : 'text-slate-700'}`}>
          <Check />
          {value.label ?? '対応'}
        </span>
      );
    case 'no':
      return (
        <span className={`${base} text-slate-400`}>
          <Cross />
          {value.label ?? '非対応'}
        </span>
      );
    case 'partial':
      return (
        <span className={`${base} text-slate-500`}>
          <Dot />
          {value.label ?? '一部'}
        </span>
      );
    case 'text':
      return (
        <span className={`${base} ${highlight ? 'text-amber-700' : 'text-slate-600'}`}>
          {value.label}
        </span>
      );
  }
}

function MobileCard({ column, rows }: { column: ComparisonColumn; rows: ComparisonRow[] }) {
  return (
    <article
      className={`rounded-2xl border p-4 shadow-sm ${
        column.highlight
          ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-500'
          : 'border-slate-200 bg-white'
      }`}
    >
      <header className="mb-3 flex items-baseline justify-between">
        <h3
          className={`text-base font-bold ${
            column.highlight ? 'text-amber-700' : 'text-slate-700'
          }`}
        >
          {column.name}
        </h3>
        {column.caption ? (
          <span className={`text-[10px] ${column.highlight ? 'text-amber-600' : 'text-slate-400'}`}>
            {column.caption}
          </span>
        ) : null}
      </header>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
        {rows.map((row) => (
          <div key={row.id} className="flex flex-col">
            <dt className="text-[11px] text-slate-500">{row.label}</dt>
            <dd className="mt-0.5">
              <Cell value={row.values[column.id]} highlight={column.highlight} />
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

function Check() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
      <path d="M16.7 5.3a1 1 0 010 1.4l-7.3 7.3a1 1 0 01-1.4 0L3.3 9.3a1 1 0 111.4-1.4l3.6 3.6 6.6-6.6a1 1 0 011.4 0z" />
    </svg>
  );
}

function Cross() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
      <path d="M5.3 5.3a1 1 0 011.4 0L10 8.6l3.3-3.3a1 1 0 111.4 1.4L11.4 10l3.3 3.3a1 1 0 11-1.4 1.4L10 11.4l-3.3 3.3a1 1 0 11-1.4-1.4L8.6 10 5.3 6.7a1 1 0 010-1.4z" />
    </svg>
  );
}

function Dot() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="h-3 w-3" fill="currentColor">
      <circle cx="10" cy="10" r="4" />
    </svg>
  );
}
