export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="読み込み中"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-amber-50 px-4"
    >
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-4 border-amber-100" />
        <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
      </div>
      <p className="mt-6 text-sm font-bold tracking-widest text-amber-700">LOADING</p>
      <p className="mt-1 text-xs text-slate-500">ココペリ公式サイト</p>
    </div>
  );
}
