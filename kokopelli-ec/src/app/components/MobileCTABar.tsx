'use client';

import Link from 'next/link';

export default function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-[10px] text-gray-500 leading-none">お試し1本〜</p>
          <p className="text-xl font-black text-slate-800 leading-tight">
            ¥3,480
            <span className="text-[10px] font-normal text-gray-400 ml-1">税込</span>
          </p>
          <p className="text-[10px] text-gray-500 leading-none">
            初回送料<span className="font-bold text-slate-700">¥520</span>のみ
          </p>
          <p className="text-[10px] text-amber-600 font-bold leading-none mt-0.5">30日間返金保証</p>
        </div>
        <Link
          href="/checkout"
          className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 text-white py-3.5 rounded-full font-black text-center shadow-lg text-sm"
        >
          今すぐ購入 →
        </Link>
      </div>
      <div className="flex justify-center mt-2 gap-4">
        <a
          href="https://line.me/R/ti/p/@636yyubo"
          className="text-xs text-amber-600 font-bold underline"
        >
          LINE相談
        </a>
        <span className="text-xs text-gray-400">|</span>
        <Link href="/checkout" className="text-xs text-gray-500 underline">
          プラン一覧
        </Link>
      </div>
    </div>
  );
}
