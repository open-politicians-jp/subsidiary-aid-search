'use client'

import { useState, useEffect } from 'react'
import citiesData from '../data/cities.json'

export interface City {
  id: string
  prefecture: string
  city: string
  reading: string
  keywords: string[]
}

export function useCitySuggest() {
  const [suggestions, setSuggestions] = useState<City[]>([])

  const searchCities = (query: string) => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }

    const normalizedQuery = query.toLowerCase().trim()
    
    const filtered = citiesData.filter(city => {
      // 都道府県名での検索
      if (city.prefecture.includes(query)) return true
      
      // 市区町村名での検索
      if (city.city.includes(query)) return true
      
      // 読み仮名での検索
      if (city.reading.includes(normalizedQuery)) return true
      
      // キーワードでの検索
      return city.keywords.some(keyword => 
        keyword.toLowerCase().includes(normalizedQuery)
      )
    })

    // 完全一致を優先し、部分一致を後に
    const sorted = filtered.sort((a, b) => {
      const aExact = a.city === query || a.prefecture === query
      const bExact = b.city === query || b.prefecture === query
      
      if (aExact && !bExact) return -1
      if (!aExact && bExact) return 1
      
      return 0
    })

    setSuggestions(sorted.slice(0, 10)) // 最大10件
  }

  const clearSuggestions = () => {
    setSuggestions([])
  }

  const getAllCities = () => {
    return citiesData
  }

  const getCityById = (id: string) => {
    return citiesData.find(city => city.id === id)
  }

  return {
    suggestions,
    searchCities,
    clearSuggestions,
    getAllCities,
    getCityById
  }
}