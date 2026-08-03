import Breadcrumb from '../components/Breadcrumb';
import CtaSection from '../components/CtaSection';
import RelatedPages from '../components/RelatedPages';
import FaqAccordion from './FaqAccordion';
import { faqs } from './faq-data';

export default function FaqPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'FAQ' }]} />

      {/* Page header */}
      <section className="bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-[980px] mx-auto px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <p className="text-brand-text font-bold text-sm tracking-widest uppercase mb-4">FAQ</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            横浜・神奈川のパソコン無料回収、
            <br />
            よくある質問。
          </h1>
          <p className="mt-6 text-neutral-500 text-lg max-w-xl leading-relaxed">
            お客様からよくいただくご質問をまとめました。
            こちらで解決しない場合は、LINE・お電話でお気軽にご相談ください。
          </p>
        </div>
      </section>

      {/* FAQ list */}
      <section className="bg-white">
        <div className="max-w-[980px] mx-auto px-6 py-16">
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      <RelatedPages
        currentPath="/faq"
        related={['/why-free', '/data-erasure', '/pricing', '/service', '/flow', '/items']}
      />
      <CtaSection />
    </>
  );
}
