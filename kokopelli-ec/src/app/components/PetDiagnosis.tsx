'use client';

import { useState } from 'react';

type PetType = 'dog' | 'cat' | null;
type AgeBand = 'young' | 'adult' | 'senior' | null;

const RECOMMENDATIONS: Record<string, string> = {
  'dog-young': '若い愛犬の毎日のミネラル補給に。食事に1日2〜3滴混ぜるだけでOKです。',
  'dog-adult':
    '成犬期は体格に合わせて1日3〜5滴。シニアに近づく頃合いから少しずつ量を増やすのが目安。',
  'dog-senior': 'シニア犬は1日5〜8滴を目安に、毎日のごはんに混ぜて続けやすい習慣にしましょう。',
  'cat-young': '若い愛猫には1日1〜2滴から。水嫌いの子でも食事に混ぜれば自然に摂れます。',
  'cat-adult': '成猫期は1日2〜4滴を目安に。ウェットフードに混ぜると食いつきが良くなります。',
  'cat-senior': 'シニア猫は1日3〜5滴。毎日続けることでミネラルバランスのサポートになります。',
};

export default function PetDiagnosis() {
  const [pet, setPet] = useState<PetType>(null);
  const [age, setAge] = useState<AgeBand>(null);

  const key = pet && age ? `${pet}-${age}` : null;
  const recommendation = key ? RECOMMENDATIONS[key] : null;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            うちの子に合う使い方は？
          </h2>
          <p className="text-slate-600">2つ選ぶだけで、目安の使用量がわかります。</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 p-6 md:p-10 space-y-8">
          <div>
            <p className="font-semibold text-slate-700 mb-3">Q1. ペットの種類は？</p>
            <div className="grid grid-cols-2 gap-3">
              {(['dog', 'cat'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPet(p)}
                  className={`py-3 rounded-xl border-2 font-bold transition ${
                    pet === p
                      ? 'border-amber-500 bg-amber-500 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300'
                  }`}
                >
                  {p === 'dog' ? '🐶 犬' : '🐱 猫'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold text-slate-700 mb-3">Q2. 年齢は？</p>
            <div className="grid grid-cols-3 gap-3">
              {(
                [
                  ['young', '〜1歳'],
                  ['adult', '1〜7歳'],
                  ['senior', '7歳〜'],
                ] as const
              ).map(([a, label]) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAge(a)}
                  className={`py-3 rounded-xl border-2 font-bold transition text-sm ${
                    age === a
                      ? 'border-amber-500 bg-amber-500 text-white'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-amber-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {recommendation && (
            <div className="border-t border-amber-100 pt-6">
              <p className="text-sm text-amber-700 font-semibold mb-2">
                あなたの愛犬・愛猫への目安
              </p>
              <p className="text-slate-800 leading-relaxed">{recommendation}</p>
              <p className="text-xs text-slate-400 mt-3">
                ※ あくまで使用量の目安です。健康状態によって最適量は異なります。
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
