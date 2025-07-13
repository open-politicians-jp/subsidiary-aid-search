'use client'

import { useState, useEffect, useMemo } from 'react'

export interface Prefecture {
  id: string
  name: string
  reading: string
  region: string
  cityCount: number
  subsidyCount: number
}

export interface City {
  id: string
  name: string
  reading: string
  prefecture: string
  prefectureName: string
  type: string
  population: number
  subsidyCount: number
  keywords: string[]
}

export interface RegionFilter {
  prefecture?: Prefecture
  city?: City
}

export function useRegionFilter() {
  const [selectedPrefecture, setSelectedPrefecture] = useState<Prefecture | null>(null)
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [availableCities, setAvailableCities] = useState<City[]>([])
  const [prefectures, setPrefectures] = useState<Prefecture[]>([])
  const [allCities, setAllCities] = useState<City[]>([])

  // データの動的読み込み
  useEffect(() => {
    const loadData = async () => {
      try {
        // 都道府県データを動的に読み込み
        const prefecturesModule = await import('../data/master/index.json')
        setPrefectures(prefecturesModule.prefectures)

        // 市区町村データを動的に読み込み
        const [tokyoModule, saitamaModule] = await Promise.all([
          import('../data/master/prefecture/tokyo.json'),
          import('../data/master/prefecture/saitama.json')
        ])

        const cities = [...tokyoModule.default, ...saitamaModule.default]
        setAllCities(cities)
      } catch (error) {
        console.error('データの読み込みに失敗しました:', error)
        // フォールバックデータ
        setPrefectures([
          {
            id: "tokyo",
            name: "東京都",
            reading: "とうきょうと",
            region: "関東",
            cityCount: 1,
            subsidyCount: 14
          },
          {
            id: "saitama",
            name: "埼玉県",
            reading: "さいたまけん",
            region: "関東",
            cityCount: 1,
            subsidyCount: 17
          }
        ])
        setAllCities([
          {
            id: "kodaira",
            name: "小平市",
            reading: "こだいら",
            prefecture: "tokyo",
            prefectureName: "東京都",
            type: "市",
            population: 195000,
            subsidyCount: 14,
            keywords: ["小平", "こだいら", "東京"]
          },
          {
            id: "kawaguchi",
            name: "川口市",
            reading: "かわぐち",
            prefecture: "saitama",
            prefectureName: "埼玉県",
            type: "市",
            population: 600000,
            subsidyCount: 17,
            keywords: ["川口", "かわぐち", "埼玉"]
          }
        ])
      }
    }

    loadData()
  }, [])

  // 都道府県選択時の処理
  const selectPrefecture = (prefecture: Prefecture | null) => {
    setSelectedPrefecture(prefecture)
    setSelectedCity(null) // 市区町村選択をリセット

    if (prefecture) {
      // 選択された都道府県の市区町村を取得
      const cities = allCities.filter(city => city.prefecture === prefecture.id)
      setAvailableCities(cities)
    } else {
      setAvailableCities([])
    }
  }

  // 市区町村選択時の処理
  const selectCity = (city: City | null) => {
    setSelectedCity(city)
    
    // 市区町村が選択された場合、対応する都道府県も自動選択
    if (city && !selectedPrefecture) {
      const prefecture = prefectures.find(p => p.id === city.prefecture)
      if (prefecture) {
        setSelectedPrefecture(prefecture)
        const cities = allCities.filter(c => c.prefecture === city.prefecture)
        setAvailableCities(cities)
      }
    }
  }

  // フィルターをクリア
  const clearFilter = () => {
    setSelectedPrefecture(null)
    setSelectedCity(null)
    setAvailableCities([])
  }

  // 都道府県検索
  const searchPrefectures = (query: string): Prefecture[] => {
    if (!query.trim()) return prefectures

    const normalizedQuery = query.toLowerCase().trim()
    
    return prefectures.filter(prefecture => {
      return (
        prefecture.name.includes(query) ||
        prefecture.reading.includes(normalizedQuery) ||
        prefecture.region.includes(query)
      )
    })
  }

  // 市区町村検索
  const searchCities = (query: string, prefectureFilter?: string): City[] => {
    let cities = prefectureFilter 
      ? allCities.filter(city => city.prefecture === prefectureFilter)
      : allCities

    if (!query.trim()) return cities

    const normalizedQuery = query.toLowerCase().trim()
    
    return cities.filter(city => {
      return (
        city.name.includes(query) ||
        city.reading.includes(normalizedQuery) ||
        city.keywords.some(keyword => 
          keyword.toLowerCase().includes(normalizedQuery)
        )
      )
    })
  }

  // 現在のフィルター状態を取得
  const getCurrentFilter = (): RegionFilter => {
    return {
      prefecture: selectedPrefecture || undefined,
      city: selectedCity || undefined
    }
  }

  return {
    // 状態
    selectedPrefecture,
    selectedCity,
    availableCities,
    
    // データ
    prefectures,
    allCities,
    
    // アクション
    selectPrefecture,
    selectCity,
    clearFilter,
    
    // 検索
    searchPrefectures,
    searchCities,
    
    // ユーティリティ
    getCurrentFilter
  }
}