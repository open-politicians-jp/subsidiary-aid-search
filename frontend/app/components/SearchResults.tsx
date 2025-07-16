import { type Subsidy } from '../utils/loadSubsidies'

interface SearchResultsProps {
  results: Subsidy[]
  isLoading: boolean
  query: string
}

export default function SearchResults({ results, isLoading, query }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600">検索中...</div>
      </div>
    )
  }

  if (!query) {
    return null
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-600">
          「{query}」に関する補助金が見つかりませんでした。
          <br />
          別のキーワードでお試しください。
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-6 text-primary-500">
        検索結果: {results.length}件
      </h2>
      <div className="grid gap-6">
        {results.map((subsidy) => (
          <div key={subsidy.id} className="bg-white rounded-2xl shadow-soft p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-gray-800">{subsidy.name}</h3>
              <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                {subsidy.category}
              </span>
            </div>
            
            <div className="text-sm text-gray-600 mb-4">
              📍 {subsidy.prefecture} {subsidy.city}
            </div>
            
            <div className="mb-4">
              <div className="font-semibold text-primary-600 mb-2">💰 補助額</div>
              <div className="text-gray-700">{subsidy.amount}</div>
            </div>
            
            <div className="mb-4">
              <div className="font-semibold text-primary-600 mb-2">📋 受給資格</div>
              <div className="text-gray-700 text-sm leading-relaxed">{subsidy.eligibility}</div>
            </div>
            
            <div className="mb-4">
              <div className="font-semibold text-primary-600 mb-2">📝 申請方法</div>
              <div className="text-gray-700 text-sm leading-relaxed">{subsidy.applicationMethod}</div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {subsidy.keywords.map((keyword, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                  {keyword}
                </span>
              ))}
            </div>
            
            <a
              href={subsidy.referenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-500 hover:text-primary-600 text-sm font-medium transition-colors"
            >
              詳細情報を見る →
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}