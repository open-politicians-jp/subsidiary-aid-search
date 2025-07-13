'use client'

import { useState } from 'react'
import SearchBox from './SearchBox'
import CategoryTags from './CategoryTags'
import SearchResults from './SearchResults'
import { useSearch } from '../hooks/useSearch'

export default function SearchTab() {
  const [searchQuery, setSearchQuery] = useState('')
  const { search, searchResults, isLoading } = useSearch()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    search({ query })
  }

  const handleCategoryClick = (category: string) => {
    setSearchQuery(category)
    search({ category })
  }

  return (
    <div>
      <SearchBox onSearch={handleSearch} value={searchQuery} />
      <CategoryTags onCategoryClick={handleCategoryClick} />
      <SearchResults 
        results={searchResults} 
        isLoading={isLoading} 
        query={searchQuery}
      />
    </div>
  )
}