export default function ContactTab() {
  return (
    <div>
      {/* Contact Content */}
      <section className="text-center mb-10">
        <h1 className="text-3xl font-bold text-primary-500 mb-4">
          お問い合わせ
        </h1>
        <p className="text-base text-gray-600 leading-relaxed max-w-2xl mx-auto mb-10">
          補助金検索システムに関するご質問、ご要望、不具合報告などがございましたら、
          <br />
          下記のフォームよりお気軽にお問い合わせください。
        </p>
      </section>

      {/* Form Container */}
      <div className="bg-white rounded-2xl p-8 shadow-soft mb-10">
        <div className="flex items-center justify-center min-h-96 text-gray-600 text-base text-center">
          <p>📝 準備中</p>
        </div>
      </div>

      {/* Info Section */}
      <section className="bg-white rounded-2xl p-6 shadow-soft">
        <h2 className="text-lg font-bold mb-4 text-primary-500">
          お問い合わせについて
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-base font-bold mb-2 text-gray-800">
              🕒 回答時間
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              通常、お問い合わせから2-3営業日以内にご回答いたします。お急ぎの場合はその旨をお知らせください。
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold mb-2 text-gray-800">
              📋 お問い合わせ内容
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              システムの使い方、補助金情報の追加依頼、不具合報告、機能改善のご提案など、どんなことでもお気軽にお問い合わせください。
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold mb-2 text-gray-800">
              🔒 個人情報の取り扱い
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              お問い合わせでいただいた個人情報は、お問い合わせ対応の目的以外には使用いたしません。
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold mb-2 text-gray-800">
              💡 よくある質問
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              お住まいの地域の補助金が見つからない場合は、対象地域の拡大を検討いたしますので、ぜひお知らせください。
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}