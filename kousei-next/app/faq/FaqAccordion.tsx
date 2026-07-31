'use client';

import { useId, useState } from 'react';
import type { Faq } from './faq-data';

function FaqItem({ q, a }: Faq) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div
      className={`border border-neutral-100 rounded-2xl transition ${
        isOpen ? 'bg-white shadow-md' : 'bg-neutral-50'
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full text-left px-6 py-5 min-h-[44px] flex items-start justify-between gap-4"
      >
        <span className="flex items-start gap-3">
          <span className="text-brand-text font-black shrink-0" aria-hidden="true">
            Q.
          </span>
          <span className="text-base font-bold text-neutral-900">{q}</span>
        </span>
        <span className="shrink-0 mt-1 text-neutral-500" aria-hidden="true">
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div id={panelId} role="region" aria-label={q} hidden={!isOpen} className="px-6 pb-6">
        <p className="text-sm text-neutral-700 leading-relaxed pl-8 pr-4">{a}</p>
      </div>
    </div>
  );
}

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <FaqItem key={faq.q} q={faq.q} a={faq.a} />
      ))}
    </div>
  );
}
