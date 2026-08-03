import { BUSINESS } from '../lib/business-info';
import CtaButton from './CtaButton';

export default function CtaSection() {
  return (
    <section className="bg-neutral-900 text-white" aria-label="お問い合わせ">
      <div className="max-w-[980px] mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">まずは、相談から。</h2>
        <p className="mt-6 text-neutral-400 text-lg max-w-lg mx-auto">
          LINEで写真を送るだけ。横浜・神奈川全域で回収可能かすぐにお答えします。
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <CtaButton href={BUSINESS.lineUrl} variant="line" external ariaLabel="LINEで無料相談">
            LINEで無料相談
          </CtaButton>
          <CtaButton
            href={BUSINESS.telLink}
            variant="ghost-dark"
            ariaLabel={`電話する ${BUSINESS.telDisplay}`}
          >
            電話する（{BUSINESS.telDisplay}）
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
