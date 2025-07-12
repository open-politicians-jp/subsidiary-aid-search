interface CategoryTagsProps {
  onCategoryClick: (category: string) => void
}

const categories = [
  '子育て支援',
  '住宅リフォーム',
  '医療費助成',
  '環境・省エネ',
  '高齢者支援',
  '起業・創業',
  '教育・学費',
  '農業支援'
]

export default function CategoryTags({ onCategoryClick }: CategoryTagsProps) {
  return (
    <div className="max-w-2xl mx-auto mb-10">
      <div className="bg-white rounded-2xl p-6 shadow-soft">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          📈 人気のカテゴリー
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryClick(category)}
              className="bg-primary-500 text-white px-4 py-2 rounded-full text-sm cursor-pointer transition-colors hover:bg-primary-600"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}