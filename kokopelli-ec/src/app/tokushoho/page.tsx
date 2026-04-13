import Link from 'next/link';

export const metadata = {
  title: '特定商取引法に基づく表記',
};

export default function Tokushoho() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">特定商取引法に基づく表記</h1>

        <table className="w-full text-sm">
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 w-1/3 align-top">販売業者</td>
              <td className="py-4 text-gray-600">カムトゥル（Come true）</td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">代表者</td>
              <td className="py-4 text-gray-600">古川</td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">所在地</td>
              <td className="py-4 text-gray-600">請求があった場合に遅滞なく開示いたします</td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">電話番号</td>
              <td className="py-4 text-gray-600">請求があった場合に遅滞なく開示いたします</td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">メールアドレス</td>
              <td className="py-4 text-gray-600">info@kamuturu.jp</td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">URL</td>
              <td className="py-4 text-gray-600">https://kokopelli-ec.vercel.app</td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">商品の名称</td>
              <td className="py-4 text-gray-600">
                ココペリ（犬・猫のための動物用栄養補助食品 水溶性ケイ素濃縮液）
              </td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">販売価格</td>
              <td className="py-4 text-gray-600">
                お試し1本: ¥3,480（税込）
                <br />
                2本セット: ¥5,980（税込・送料無料）
                <br />
                定期便: ¥5,480/月（税込・送料無料）
                <br />
                5+1セット: ¥15,000（税込・送料無料）
              </td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">送料</td>
              <td className="py-4 text-gray-600">
                お試し1本のみ送料別途（全国一律500円）。2本セット以上は送料無料。
              </td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">支払方法</td>
              <td className="py-4 text-gray-600">
                クレジットカード（Visa, Mastercard, American Express, JCB）
              </td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">支払時期</td>
              <td className="py-4 text-gray-600">ご注文時に即時決済</td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">商品の引渡時期</td>
              <td className="py-4 text-gray-600">ご注文確認後、3〜5営業日以内に発送</td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">返品・キャンセル</td>
              <td className="py-4 text-gray-600">
                商品到着後7日以内、未開封に限り返品を承ります。返品送料はお客様負担となります。
                不良品の場合は当方負担で交換いたします。
              </td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">定期便の解約</td>
              <td className="py-4 text-gray-600">
                次回引き落とし日の7日前までに info@kamuturu.jp
                へご連絡ください。回数縛りはございません。解約料は一切かかりません。
                <br />
                詳細は
                <a href="/cancel" className="text-blue-600 underline">
                  解約ページ
                </a>
                をご確認ください。
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-200">
          <h2 className="text-base font-bold text-amber-800 mb-3">
            定期購入（サブスクリプション）に関する事項
          </h2>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-amber-100">
              <tr>
                <td className="py-2 pr-4 font-medium text-amber-700 w-1/3">契約形態</td>
                <td className="py-2 text-amber-900">自動更新（期間の定めなし）</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium text-amber-700">毎月の請求額</td>
                <td className="py-2 text-amber-900">¥5,480（税込・送料無料）</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium text-amber-700">お届けサイクル</td>
                <td className="py-2 text-amber-900">毎月1回（30日ごと）</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium text-amber-700">解約方法</td>
                <td className="py-2 text-amber-900">info@kamuturu.jp へメール連絡</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium text-amber-700">解約期限</td>
                <td className="py-2 text-amber-900">次回引き落とし日の7日前まで</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium text-amber-700">解約料</td>
                <td className="py-2 text-amber-900">なし（いつでも無料で解約可能）</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium text-amber-700">最低契約期間</td>
                <td className="py-2 text-amber-900">なし（初回のみでの解約も可能）</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-400 mt-6">
          ※ 通信販売のため、クーリングオフ制度は適用されません。
        </p>
        <p className="text-xs text-gray-400">
          ※ 商品代金以外に必要な費用:
          お試し1本の場合のみ送料500円。振込手数料等はお客様負担となる場合があります。
        </p>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-amber-700 hover:underline">
            ← トップページに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
