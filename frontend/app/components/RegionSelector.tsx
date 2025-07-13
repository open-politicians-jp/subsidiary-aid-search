'use client'

import { useState, useRef, useEffect } from 'react'
import { useRegionFilter, Prefecture, City } from '../hooks/useRegionFilter'

interface RegionSelectorProps {
  onSelectionChange: (prefecture: Prefecture | null, city: City | null) => void
  selectedPrefecture: Prefecture | null
  selectedCity: City | null
}

export default function RegionSelector({ 
  onSelectionChange, 
  selectedPrefecture, 
  selectedCity 
}: RegionSelectorProps) {
  const [prefectureInputValue, setPrefectureInputValue] = useState('')
  const [cityInputValue, setCityInputValue] = useState('')
  const [isPrefectureOpen, setIsPrefectureOpen] = useState(false)
  const [isCityOpen, setIsCityOpen] = useState(false)
  const [prefectureSuggestions, setPrefectureSuggestions] = useState<Prefecture[]>([])
  const [citySuggestions, setCitySuggestions] = useState<City[]>([])
  
  const {
    prefectures,
    availableCities,
    selectPrefecture,
    selectCity,
    clearFilter,
    searchPrefectures,
    searchCities
  } = useRegionFilter()

  const prefectureRef = useRef<HTMLDivElement>(null)
  const cityRef = useRef<HTMLDivElement>(null)

  // 外部から選択状態が変更された場合の同期
  useEffect(() => {
    if (selectedPrefecture) {
      setPrefectureInputValue(selectedPrefecture.name)
      selectPrefecture(selectedPrefecture)
    } else {
      setPrefectureInputValue('')
    }
  }, [selectedPrefecture])

  useEffect(() => {
    if (selectedCity) {
      setCityInputValue(selectedCity.name)
      selectCity(selectedCity)
    } else {
      setCityInputValue('')
    }
  }, [selectedCity])

  // 外部クリック検知
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (prefectureRef.current && !prefectureRef.current.contains(event.target as Node)) {
        setIsPrefectureOpen(false)
      }
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setIsCityOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // 都道府県入力処理
  const handlePrefectureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPrefectureInputValue(value)
    
    const suggestions = searchPrefectures(value)
    setPrefectureSuggestions(suggestions)
    setIsPrefectureOpen(value.length > 0 && suggestions.length > 0)
    
    if (!value) {
      handlePrefectureSelect(null)
    }
  }

  // 市区町村入力処理
  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCityInputValue(value)
    
    const suggestions = searchCities(value, selectedPrefecture?.id)
    setCitySuggestions(suggestions)
    setIsCityOpen(value.length > 0 && suggestions.length > 0)
    
    if (!value) {
      handleCitySelect(null)
    }
  }

  // 都道府県選択処理
  const handlePrefectureSelect = (prefecture: Prefecture | null) => {
    selectPrefecture(prefecture)
    setPrefectureInputValue(prefecture?.name || '')
    setIsPrefectureOpen(false)
    
    // 市区町村もリセット
    handleCitySelect(null)
    
    onSelectionChange(prefecture, null)
  }

  // 市区町村選択処理
  const handleCitySelect = (city: City | null) => {
    selectCity(city)
    setCityInputValue(city?.name || '')
    setIsCityOpen(false)
    
    // 市区町村選択時に都道府県も自動選択
    if (city && !selectedPrefecture) {
      const prefecture = prefectures.find(p => p.id === city.prefecture)
      if (prefecture) {
        selectPrefecture(prefecture)
        setPrefectureInputValue(prefecture.name)
        onSelectionChange(prefecture, city)
        return
      }
    }
    
    onSelectionChange(selectedPrefecture, city)
  }

  // 全クリア
  const handleClearAll = () => {
    clearFilter()
    setPrefectureInputValue('')
    setCityInputValue('')
    setIsPrefectureOpen(false)
    setIsCityOpen(false)
    onSelectionChange(null, null)
  }

  const hasSelection = selectedPrefecture || selectedCity

  return (
    <div className="region-selector">
      <div className="region-selector-header">
        <h3 className="region-selector-title">地域で絞り込み</h3>
        {hasSelection && (
          <button 
            className="region-clear-button"
            onClick={handleClearAll}
          >
            クリア
          </button>
        )}
      </div>

      <div className="region-selector-content">
        {/* 都道府県選択 */}
        <div ref={prefectureRef} className="region-input-group">
          <label className="region-label">都道府県</label>
          <div className="region-input-container">
            <input
              type="text"
              value={prefectureInputValue}
              onChange={handlePrefectureChange}
              onFocus={() => {
                if (prefectureInputValue) {
                  const suggestions = searchPrefectures(prefectureInputValue)
                  setPrefectureSuggestions(suggestions)
                  setIsPrefectureOpen(suggestions.length > 0)
                }
              }}
              className="region-input"
              placeholder="都道府県を選択"
            />
            {prefectureInputValue && (
              <button
                type="button"
                onClick={() => handlePrefectureSelect(null)}
                className="region-clear-input-button"
              >
                ✕
              </button>
            )}
          </div>

          {isPrefectureOpen && prefectureSuggestions.length > 0 && (
            <div className="region-suggestions">
              {prefectureSuggestions.map((prefecture) => (
                <div
                  key={prefecture.id}
                  className="region-suggestion-item"
                  onClick={() => handlePrefectureSelect(prefecture)}
                >
                  <div className="region-suggestion-main">
                    {prefecture.name}
                  </div>
                  <div className="region-suggestion-meta">
                    {prefecture.region} • {prefecture.cityCount}市区町村
                    {prefecture.subsidyCount > 0 && ` • ${prefecture.subsidyCount}件の制度`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 市区町村選択 */}
        <div ref={cityRef} className="region-input-group">
          <label className="region-label">
            市区町村
            {selectedPrefecture && ` (${selectedPrefecture.name})`}
          </label>
          <div className="region-input-container">
            <input
              type="text"
              value={cityInputValue}
              onChange={handleCityChange}
              onFocus={() => {
                if (cityInputValue) {
                  const suggestions = searchCities(cityInputValue, selectedPrefecture?.id)
                  setCitySuggestions(suggestions)
                  setIsCityOpen(suggestions.length > 0)
                }
              }}
              className="region-input"
              placeholder={selectedPrefecture ? `${selectedPrefecture.name}の市区町村を選択` : "市区町村を選択"}
              disabled={!selectedPrefecture && !cityInputValue}
            />
            {cityInputValue && (
              <button
                type="button"
                onClick={() => handleCitySelect(null)}
                className="region-clear-input-button"
              >
                ✕
              </button>
            )}
          </div>

          {isCityOpen && citySuggestions.length > 0 && (
            <div className="region-suggestions">
              {citySuggestions.map((city) => (
                <div
                  key={city.id}
                  className="region-suggestion-item"
                  onClick={() => handleCitySelect(city)}
                >
                  <div className="region-suggestion-main">
                    {city.name}
                  </div>
                  <div className="region-suggestion-meta">
                    {city.prefectureName} • 人口{Math.round(city.population / 10000)}万人
                    {city.subsidyCount > 0 && ` • ${city.subsidyCount}件の制度`}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 選択状態表示 */}
      {hasSelection && (
        <div className="region-selection-display">
          <div className="region-selection-item">
            📍 {selectedPrefecture?.name || ''}
            {selectedCity && ` ${selectedCity.name}`}
            {selectedCity && selectedCity.subsidyCount > 0 && (
              <span className="region-subsidy-count">
                {selectedCity.subsidyCount}件の制度
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}