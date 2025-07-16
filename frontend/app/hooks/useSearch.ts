'use client'

import { useState, useEffect, useMemo } from 'react'
import FlexSearch, { Index } from 'flexsearch'
import { loadAllSubsidies, type Subsidy } from '../utils/loadSubsidies'

export interface SearchFilter {
  query?: string
  prefecture?: string
  city?: string
  category?: string
}

export function useSearch() {
  const [searchResults, setSearchResults] = useState<Subsidy[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentFilter, setCurrentFilter] = useState<SearchFilter>({})
  const [allSubsidiesData, setAllSubsidiesData] = useState<Subsidy[]>([])
  const [searchIndex, setSearchIndex] = useState<Index | null>(null)

  // データの読み込みとインデックス作成
  useEffect(() => {
    const initializeData = async () => {
      try {
        const data = await loadAllSubsidies()
        setAllSubsidiesData(data)

        // FlexSearchインデックスの初期化
        const index = new Index({
          tokenize: 'forward'
        })

        // データをインデックスに追加
        data.forEach((subsidy) => {
          const searchText = [
            subsidy.name,
            subsidy.category || '',
            subsidy.keywords?.join(' ') || '',
            subsidy.prefecture,
            subsidy.city,
            subsidy.eligibility
          ].join(' ')
          
          index.add(subsidy.id, searchText)
        })

        setSearchIndex(index)
      } catch (error) {
        console.error('データの初期化エラー:', error)
      }
    }

    initializeData()
  }, [])

  const search = async (searchFilter: SearchFilter) => {
    if (!searchIndex) return
    
    setCurrentFilter(searchFilter)
    setIsLoading(true)
    
    try {
      let results = allSubsidiesData

      // キーワード検索
      if (searchFilter.query?.trim()) {
        const searchResults = await searchIndex.search(searchFilter.query)
        results = allSubsidiesData.filter(subsidy => 
          searchResults.includes(subsidy.id)
        )
      }

      // 地域フィルター
      if (searchFilter.prefecture) {
        results = results.filter(subsidy => 
          subsidy.prefecture === searchFilter.prefecture
        )
      }

      if (searchFilter.city) {
        results = results.filter(subsidy => 
          subsidy.city === searchFilter.city
        )
      }

      // カテゴリフィルター
      if (searchFilter.category) {
        results = results.filter(subsidy => 
          subsidy.category === searchFilter.category
        )
      }
      
      setSearchResults(results)
    } catch (error) {
      console.error('検索エラー:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // 従来のsearch関数との互換性維持
  const searchByQuery = async (query: string) => {
    return search({ query })
  }

  const getAllSubsidies = () => {
    return allSubsidiesData
  }

  const getSubsidiesByCategory = (category: string) => {
    return allSubsidiesData.filter(subsidy => 
      subsidy.category === category
    )
  }

  return {
    search,
    searchByQuery,
    searchResults,
    isLoading,
    currentFilter,
    getAllSubsidies,
    getSubsidiesByCategory
  }
}