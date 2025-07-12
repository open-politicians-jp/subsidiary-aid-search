'use client'

import React, { useState } from 'react'

interface SearchBoxProps {
  onSearch: (query: string) => void
  value?: string
}

export default function SearchBox({ onSearch, value = '' }: SearchBoxProps) {
  const [query, setQuery] = useState(value)

  // valueプロパティが変更された時にローカル状態を更新
  React.useEffect(() => {
    setQuery(value)
  }, [value])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <section className="text-center mb-10">
      <div className="relative max-w-4xl mx-auto">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-6 py-5 text-base border-none rounded-full shadow-medium outline-none bg-white"
            placeholder="お住まいの地域、補助金名、キーワードを入力してください"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-500 text-white border-none px-6 py-3 rounded-full cursor-pointer text-base font-bold hover:bg-primary-600 transition-colors"
          >
            🔍 検索
          </button>
        </form>
      </div>
    </section>
  )
}