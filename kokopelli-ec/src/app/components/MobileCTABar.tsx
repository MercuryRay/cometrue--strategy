'use client';

import Link from 'next/link';
import { BUNDLE_2_PRICE, SINGLE_PRICE, PER_BOTTLE_BUNDLE_2, formatYen } from '@/lib/prices';

export default function MobileCTABar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-2.5">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <p className="text-[10px] text-amber-600 font-bold leading-none">人気No.1・送料無料</p>
          <p className="text-xl font-black text-slate-800 leading-tight">
            {formatYen(BUNDLE_2_PRICE)}
            <span className="text-[10px] font-normal text-gray-400 ml-1">/ 2本</span>
          </p>
          <p className="text-[10px] text-gray-500 leading-none">
            1本 {formatYen(PER_BOTTLE_BUNDLE_2)}・
            <span className="text-amber-600 font-bold">30日間返金保証</span>
          </p>
          <p className="text-[10px] text-gray-400 leading-none mt-0.5">
            お試し1本 {formatYen(SINGLE_PRICE)} も選べます
          </p>
        </div>
        <Link
          href="/checkout"
          className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 text-white py-3.5 rounded-full font-black text-center shadow-lg text-sm leading-tight"
        >
          今すぐ購入 →
        </Link>
      </div>
      <div className="flex justify-center mt-1.5 gap-4">
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
