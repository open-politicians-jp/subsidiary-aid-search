'use client'

import { useState, useEffect, useMemo } from 'react'
import FlexSearch from 'flexsearch'
import subsidiesData from '../data/subsidies.json'
import kodairaData from '../data/tokyo/kodaira.json'

export interface Subsidy {
  id: string
  name: string
  amount: string
  eligibility: string
  applicationMethod: string
  referenceUrl: string
  prefecture: string
  city: string
  category: string
  keywords: string[]
}

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

  // 全てのデータを統合
  const allSubsidiesData = useMemo(() => {
    return [...subsidiesData, ...kodairaData]
  }, [])

  // FlexSearchインデックスの初期化
  const searchIndex = useMemo(() => {
    const index = new FlexSearch.Index({
      tokenize: 'forward'
    })

    // データをインデックスに追加
    allSubsidiesData.forEach((subsidy) => {
      const searchText = [
        subsidy.name,
        subsidy.category,
        subsidy.keywords.join(' '),
        subsidy.prefecture,
        subsidy.city,
        subsidy.eligibility
      ].join(' ')
      
      index.add(subsidy.id, searchText)
    })

    return index
  }, [allSubsidiesData])

  const search = async (searchFilter: SearchFilter) => {
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