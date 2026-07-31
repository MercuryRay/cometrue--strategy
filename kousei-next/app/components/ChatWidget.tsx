'use client';

import { useEffect, useRef, useState } from 'react';
import { BUSINESS } from '../lib/business-info';

type Message = {
  id: string;
  role: 'bot' | 'user';
  text: string;
};

type Step = {
  id: string;
  question: string;
  options: { label: string; next: string; userText?: string }[];
};

type Result = {
  id: string;
  title: string;
  body: string;
  cta: 'line' | 'tel' | 'both';
};

const STEPS: Record<string, Step | Result> = {
  start: {
    id: 'start',
    question: 'こんにちは！PC回収便の無料回収アシスタントです。\nまず、何を回収したいですか？',
    options: [
      { label: 'ノートPC・デスクトップPC', next: 'pc-quantity', userText: 'PCを回収したい' },
      {
        label: 'モニター・プリンター・周辺機器',
        next: 'pc-quantity',
        userText: '周辺機器を回収したい',
      },
      { label: 'サーバー・業務用機器', next: 'corporate', userText: '業務機器を回収したい' },
      { label: '上記以外（家電など）', next: 'not-accepted', userText: 'その他を回収したい' },
    ],
  },
  'pc-quantity': {
    id: 'pc-quantity',
    question: '台数はどれくらいですか？',
    options: [
      { label: '1〜5台（個人・少量）', next: 'data-check', userText: '1〜5台です' },
      { label: '6〜30台', next: 'data-check', userText: '6〜30台です' },
      { label: '30台以上（オフィス一括）', next: 'corporate', userText: '30台以上です' },
    ],
  },
  'data-check': {
    id: 'data-check',
    question: 'データ消去は必要ですか？',
    options: [
      { label: '必要（消去証明書も希望）', next: 'method', userText: '消去証明書つきで消したい' },
      { label: '必要（証明書はなくてOK）', next: 'method', userText: 'データだけ消したい' },
      { label: '不要（自分で消去済）', next: 'method', userText: '消去は不要' },
    ],
  },
  method: {
    id: 'method',
    question: '回収方法はどれが良いですか？',
    options: [
      {
        label: '出張回収（自宅・オフィスまで来て欲しい）',
        next: 'pickup',
        userText: '出張回収希望',
      },
      { label: '宅配回収（着払いで送りたい）', next: 'shipping', userText: '宅配で送りたい' },
      { label: '持込回収（直接持っていきたい）', next: 'visit', userText: '持込で行きたい' },
    ],
  },
  pickup: {
    id: 'pickup',
    title: '出張回収で対応可能です',
    body: '横浜市内・神奈川県内なら最短翌日対応。日時のご希望をLINEでお知らせください。スタッフが伺います。',
    cta: 'both',
  },
  shipping: {
    id: 'shipping',
    title: '宅配回収で対応可能です',
    body: '着払い伝票の発行手順をご案内します。LINEで「宅配回収希望」とお送りください。',
    cta: 'line',
  },
  visit: {
    id: 'visit',
    title: '持込回収を承ります',
    body: `営業所: ${BUSINESS.addressLocality}${BUSINESS.streetAddress}（${BUSINESS.openingHoursWeekdayDisplay} / ${BUSINESS.openingHoursWeekendDisplay}）。事前にLINEまたはお電話でご連絡ください。`,
    cta: 'both',
  },
  corporate: {
    id: 'corporate',
    title: '法人向け一括回収で対応可能です',
    body: 'NDA締結・消去証明書一括発行・ISMS監査対応に対応しています。数台から大量一括まで回収は無料です（500台以上の大型案件のみ事前にお見積もり）。',
    cta: 'both',
  },
  'not-accepted': {
    id: 'not-accepted',
    title: '回収できない可能性があります',
    body: '家電リサイクル法対象品（テレビ・冷蔵庫・洗濯機・エアコン）はお引き取りできません。詳しくは「回収できないもの」ページをご覧ください。',
    cta: 'line',
  },
};

const isResult = (step: Step | Result): step is Result => 'title' in step;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [stepId, setStepId] = useState('start');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const counterRef = useRef(0);

  const nextId = () => {
    counterRef.current += 1;
    return `m${counterRef.current}`;
  };

  useEffect(() => {
    if (open && messages.length === 0) {
      const start = STEPS.start as Step;
      setMessages([{ id: nextId(), role: 'bot', text: start.question }]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, stepId]);

  useEffect(() => {
    if (open) {
      panelRef.current?.focus();
    }
  }, [open]);

  const closePanel = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  const handleOption = (label: string, next: string, userText?: string) => {
    const userMessage: Message = { id: nextId(), role: 'user', text: userText ?? label };
    const target = STEPS[next];
    const botMessage: Message = isResult(target)
      ? { id: nextId(), role: 'bot', text: `${target.title}\n\n${target.body}` }
      : { id: nextId(), role: 'bot', text: target.question };
    setMessages((prev) => [...prev, userMessage, botMessage]);
    setStepId(next);
    // 選択肢が消えてフォーカスが失われるため、チャット履歴領域へ移す
    scrollRef.current?.focus();
  };

  const reset = () => {
    setStepId('start');
    setMessages([]);
    counterRef.current = 0;
  };

  const current = STEPS[stepId];
  const showOptions = !isResult(current);
  const result = isResult(current) ? current : null;

  return (
    <>
      {/* FAB — モバイルは MobileStickyCta に一本化するため非表示。ピル型 + ラベル */}
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'チャットを閉じる' : '無料回収を相談する'}
        aria-expanded={open}
        className="hidden md:inline-flex fixed bottom-6 right-6 z-[60] items-center gap-2 rounded-full bg-brand text-neutral-900 px-5 py-3.5 min-h-[44px] text-sm font-bold shadow-2xl shadow-amber-500/40 hover:bg-brand-hover hover:scale-105 transition-all"
      >
        {open ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
        {open ? '閉じる' : '相談'}
      </button>

      {open && (
        <div
          ref={panelRef}
          tabIndex={-1}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              closePanel();
            }
          }}
          className="hidden md:flex fixed bottom-24 right-6 z-[60] w-[380px] max-h-[65vh] bg-white rounded-2xl shadow-2xl border border-neutral-100 flex-col overflow-hidden focus:outline-none"
          role="dialog"
          aria-modal="false"
          aria-label="無料回収アシスタント"
        >
          <div className="bg-neutral-900 text-white px-5 py-4 flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-brand">
              <svg
                className="w-5 h-5 text-neutral-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold">無料回収アシスタント</p>
              <p className="text-[11px] text-neutral-400">PC回収便 / 数タップで相談</p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="text-[11px] text-neutral-400 hover:text-white transition"
            >
              最初から
            </button>
          </div>

          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-label="チャット履歴"
            tabIndex={-1}
            className="flex-1 overflow-y-auto px-4 py-4 bg-neutral-50 space-y-3 focus:outline-none"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    m.role === 'user'
                      ? 'bg-neutral-900 text-white rounded-br-sm'
                      : 'bg-white text-neutral-800 border border-neutral-100 rounded-bl-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-neutral-100 bg-white px-4 py-3 max-h-[200px] overflow-y-auto">
            {showOptions && (
              <div className="space-y-2">
                {(current as Step).options.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleOption(opt.label, opt.next, opt.userText)}
                    className="w-full text-left text-sm text-neutral-700 bg-white border border-neutral-200 hover:border-brand hover:bg-amber-50 rounded-xl px-4 py-2.5 transition"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
            {result && (
              <div className="space-y-2">
                {(result.cta === 'line' || result.cta === 'both') && (
                  <a
                    href={BUSINESS.lineUrl}
                    target="_blank"
                    rel="noopener"
                    className="block w-full text-center bg-line text-white text-sm font-semibold px-4 py-3 rounded-xl hover:bg-line-hover transition"
                  >
                    LINEで相談する
                  </a>
                )}
                {(result.cta === 'tel' || result.cta === 'both') && (
                  <a
                    href={BUSINESS.telLink}
                    className="block w-full text-center bg-neutral-900 text-white text-sm font-semibold px-4 py-3 rounded-xl hover:bg-neutral-800 transition"
                  >
                    {BUSINESS.telDisplay} に電話
                  </a>
                )}
                <button
                  type="button"
                  onClick={reset}
                  className="block w-full text-center text-xs text-neutral-500 hover:text-neutral-800 py-2 transition"
                >
                  最初から相談する
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
