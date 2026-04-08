import Link from "next/link";

export const metadata = {
  title: "特定商取引法に基づく表記",
};

export default function Tokushoho() {
  return (
    <main className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          特定商取引法に基づく表記
        </h1>

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
              <td className="py-4 text-gray-600">LINE公式アカウントよりお問い合わせください</td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">URL</td>
              <td className="py-4 text-gray-600">https://kokopelli-ec.vercel.app</td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">商品の名称</td>
              <td className="py-4 text-gray-600">ココペリ（犬・猫のための動物用栄養補助食品 水溶性ケイ素濃縮液）</td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">販売価格</td>
              <td className="py-4 text-gray-600">
                お試し1本: ¥3,480（税込）<br />
                2本セット: ¥5,980（税込・送料無料）<br />
                定期便: ¥5,480/月（税込・送料無料）<br />
                5+1セット: ¥15,000（税込・送料無料）
              </td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">送料</td>
              <td className="py-4 text-gray-600">お試し1本のみ送料別途（全国一律500円）。2本セット以上は送料無料。</td>
            </tr>
            <tr>
              <td className="py-4 pr-4 font-medium text-gray-700 align-top">支払方法</td>
              <td className="py-4 text-gray-600">クレジットカード（Visa, Mastercard, American Express, JCB）</td>
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
                次回発送日の7日前までにLINE公式アカウントよりご連絡ください。回数縛りはございません。
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-green-700 hover:underline">
            ← トップページに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
