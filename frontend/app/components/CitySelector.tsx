'use client'

import { useState, useRef, useEffect } from 'react'
import { useCitySuggest, City } from '../hooks/useCitySuggest'

interface CitySelectorProps {
  onCitySelect: (city: City | null) => void
  selectedCity: City | null
}

export default function CitySelector({ onCitySelect, selectedCity }: CitySelectorProps) {
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { suggestions, searchCities, clearSuggestions } = useCitySuggest()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedCity) {
      setInputValue(`${selectedCity.prefecture} ${selectedCity.city}`)
    } else {
      setInputValue('')
    }
  }, [selectedCity])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    searchCities(value)
    setIsOpen(value.length > 0)
    
    if (!value) {
      onCitySelect(null)
    }
  }

  const handleCitySelect = (city: City) => {
    setInputValue(`${city.prefecture} ${city.city}`)
    onCitySelect(city)
    setIsOpen(false)
    clearSuggestions()
  }

  const handleClear = () => {
    setInputValue('')
    onCitySelect(null)
    setIsOpen(false)
    clearSuggestions()
    inputRef.current?.focus()
  }

  const handleFocus = () => {
    if (inputValue && suggestions.length > 0) {
      setIsOpen(true)
    }
  }

  return (
    <div ref={containerRef} className="city-selector">
      <div className="city-input-container">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          className="city-input"
          placeholder="市区町村を選択してください（例：川口市、渋谷区）"
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="city-clear-button"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="city-suggestions">
          {suggestions.map((city) => (
            <div
              key={city.id}
              className="city-suggestion-item"
              onClick={() => handleCitySelect(city)}
            >
              <div className="city-suggestion-main">
                {city.prefecture} {city.city}
              </div>
              <div className="city-suggestion-reading">
                {city.reading}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}