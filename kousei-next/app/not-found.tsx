import Link from 'next/link';
import CtaSection from './components/CtaSection';

export default function NotFound() {
  return (
    <>
      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center">
          <p className="text-amber-700 font-bold text-sm tracking-widest uppercase mb-4">
            404 Not Found
          </p>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            お探しのページが見つかりません
          </h1>
          <p className="mt-6 text-neutral-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            URLが変更されたか、ページが削除された可能性があります。
            お手数ですが、以下のリンクから目的のページをお探しください。
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center bg-[#f5a623] text-neutral-900 font-semibold px-8 py-3.5 rounded-full text-sm hover:bg-[#e09500] transition min-h-[44px]"
            >
              ホームへ戻る
            </Link>
            <Link
              href="/items"
              className="inline-flex items-center border-2 border-neutral-200 text-neutral-700 font-semibold px-8 py-3.5 rounded-full text-sm hover:border-neutral-400 transition min-h-[44px]"
            >
              回収できるものを見る
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center border-2 border-neutral-200 text-neutral-700 font-semibold px-8 py-3.5 rounded-full text-sm hover:border-neutral-400 transition min-h-[44px]"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
