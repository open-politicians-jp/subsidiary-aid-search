'use client'

import { useState, useEffect, useMemo } from 'react'
import FlexSearch from 'flexsearch'
import subsidiesData from '../data/subsidies.json'

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

export function useSearch() {
  const [searchResults, setSearchResults] = useState<Subsidy[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // FlexSearchインデックスの初期化
  const searchIndex = useMemo(() => {
    const index = new FlexSearch.Index({
      tokenize: 'forward'
    })

    // データをインデックスに追加
    subsidiesData.forEach((subsidy) => {
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
  }, [])

  const search = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    
    try {
      // FlexSearchで検索実行
      const results = await searchIndex.search(query)
      
      // 結果のIDを使用して実際のデータを取得
      const matchedSubsidies = subsidiesData.filter(subsidy => 
        results.includes(subsidy.id)
      )
      
      setSearchResults(matchedSubsidies)
    } catch (error) {
      console.error('検索エラー:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const getAllSubsidies = () => {
    return subsidiesData
  }

  const getSubsidiesByCategory = (category: string) => {
    return subsidiesData.filter(subsidy => 
      subsidy.category === category
    )
  }

  return {
    search,
    searchResults,
    isLoading,
    getAllSubsidies,
    getSubsidiesByCategory
  }
}