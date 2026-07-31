import SectionHeading from '../SectionHeading';
import TextArrowLink from './TextArrowLink';
import { YOKOHAMA_WARDS, KANAGAWA_MUNICIPALITIES } from '../../lib/area-served';

// 神奈川県内の全市町村数 = 横浜市(1) + 横浜市を除く市町村 (area-served.ts が単一ソース)
const TOTAL_MUNICIPALITIES = KANAGAWA_MUNICIPALITIES.length + 1;

export default function AreaSection() {
  return (
    <section className="bg-white" aria-label="対応エリア">
      <div className="max-w-[980px] mx-auto px-6 py-24">
        <SectionHeading
          eyebrow="AREA"
          title={`横浜${YOKOHAMA_WARDS.length}区・神奈川全域に出張回収。`}
          lead="横浜市内は最短翌日訪問。神奈川県内も2〜3日以内に出張回収可能です。県外の方は宅配回収（着払い）もご利用いただけます。"
        />
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-2xl p-8">
            <h3 className="font-bold text-neutral-900 text-lg mb-4">
              横浜市{YOKOHAMA_WARDS.length}区
            </h3>
            <ul className="flex flex-wrap gap-2" aria-label="横浜市の対応区一覧">
              {YOKOHAMA_WARDS.map((w) => (
                <li
                  key={w}
                  className="text-xs font-medium text-brand-text bg-amber-100/60 px-3 py-1.5 rounded-full"
                >
                  {w}
                </li>
              ))}
            </ul>
            <TextArrowLink href="/area-yokohama" title="横浜市の対応エリア詳細" className="mt-6">
              横浜市のPC回収エリア詳細
            </TextArrowLink>
          </div>
          <div className="bg-gradient-to-br from-sky-50 to-white border border-sky-100 rounded-2xl p-8">
            <h3 className="font-bold text-neutral-900 text-lg mb-2">神奈川県全域</h3>
            <p className="text-sm text-neutral-600 leading-relaxed mb-4">
              川崎市・相模原市ほか、横浜市を含む神奈川県全{TOTAL_MUNICIPALITIES}
              市町村に対応しています。
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="神奈川県の対応市町村一覧">
              {KANAGAWA_MUNICIPALITIES.map((c) => (
                <li
                  key={c}
                  className="text-xs font-medium text-sky-700 bg-sky-100/60 px-3 py-1.5 rounded-full"
                >
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <TextArrowLink href="/area-kawasaki" title="川崎市の対応エリア詳細">
                川崎市のPC回収エリア詳細
              </TextArrowLink>
              <TextArrowLink href="/area-kanagawa" title="神奈川県の対応エリア詳細">
                神奈川県の対応エリア詳細
              </TextArrowLink>
            </div>
            <p className="mt-4 text-xs text-neutral-500 leading-relaxed">
              上記以外のエリアもご相談ください。県外は宅配回収（着払い）で対応します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
