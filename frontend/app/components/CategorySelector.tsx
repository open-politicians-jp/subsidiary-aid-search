'use client'

import { useState, useRef, useEffect } from 'react'

interface CategorySelectorProps {
  onCategorySelect: (category: string) => void
  selectedCategory: string
}

const categories = [
  { id: '', name: 'すべてのカテゴリ' },
  { id: '子育て支援', name: '👶 子育て支援' },
  { id: '住宅リフォーム', name: '🏠 住宅リフォーム' },
  { id: '医療費助成', name: '🏥 医療費助成' },
  { id: '環境・省エネ', name: '🌱 環境・省エネ' },
  { id: '高齢者支援', name: '👵 高齢者支援' },
  { id: '起業・創業', name: '💼 起業・創業' },
  { id: '教育・学費', name: '📚 教育・学費' },
  { id: '農業支援', name: '🌾 農業支援' }
]

export default function CategorySelector({ onCategorySelect, selectedCategory }: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectorRef = useRef<HTMLDivElement>(null)

  // 外部クリック検知
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId)
    setIsOpen(false)
  }

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory) || categories[0]

  return (
    <div ref={selectorRef} className="category-selector">
      <label className="category-label">カテゴリで絞り込み</label>
      
      <div className="category-dropdown">
        <button
          type="button"
          className="category-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="category-button-text">{selectedCategoryData.name}</span>
          <span className={`category-arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </button>

        {isOpen && (
          <div className="category-options">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`category-option ${selectedCategory === category.id ? 'selected' : ''}`}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}