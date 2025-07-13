'use client'

import { useState, useEffect } from 'react'
import { useSearch, SearchFilter } from './hooks/useSearch'
import { useRegionFilter, Prefecture, City } from './hooks/useRegionFilter'
import RegionSelector from './components/RegionSelector'
import CategorySelector from './components/CategorySelector'
import Header from './components/Header'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'search' | 'contact'>('search')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPrefecture, setSelectedPrefecture] = useState<Prefecture | null>(null)
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const { search, searchResults, isLoading, currentFilter } = useSearch()

  // ハイドレーション対応
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 検索実行
  const executeSearch = () => {
    const filter: SearchFilter = {
      query: searchQuery || undefined,
      prefecture: selectedPrefecture?.name || undefined,
      city: selectedCity?.name || undefined,
      category: selectedCategory || undefined
    }
    search(filter)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    executeSearch()
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    
    // カテゴリ選択時に即座に検索実行
    const filter: SearchFilter = {
      query: searchQuery || undefined,
      prefecture: selectedPrefecture?.name || undefined,
      city: selectedCity?.name || undefined,
      category: category || undefined
    }
    search(filter)
  }

  const handleRegionChange = (prefecture: Prefecture | null, city: City | null) => {
    setSelectedPrefecture(prefecture)
    setSelectedCity(city)
    
    // 地域選択時に即座に検索実行（検索クエリがある場合）
    if (searchQuery || selectedCategory) {
      const filter: SearchFilter = {
        query: searchQuery || undefined,
        prefecture: prefecture?.name || undefined,
        city: city?.name || undefined,
        category: selectedCategory || undefined
      }
      search(filter)
    } else if (prefecture || city) {
      // 地域のみ選択された場合も検索実行
      const filter: SearchFilter = {
        prefecture: prefecture?.name || undefined,
        city: city?.name || undefined,
        category: selectedCategory || undefined
      }
      search(filter)
    }
  }

  const switchTab = (tabName: 'search' | 'contact') => {
    setActiveTab(tabName)
  }

  return (
    <div className="app">
      {/* ヘッダー */}
      <Header activeTab={activeTab} onTabChange={switchTab} />

      {/* メインコンテンツ */}
      <div className="container">

      {/* Search Tab Content */}
      <div className={`tab-content ${activeTab === 'search' ? 'active' : ''}`}>
        {/* Main Search */}
        <section className="search-section">
          <form onSubmit={handleSearch} className="search-container">
            <input 
              type="text" 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="お住まいの地域、補助金名、キーワードを入力してください"
            />
            <button type="submit" className="search-button">🔍 検索</button>
          </form>
        </section>

        {/* Filters Section */}
        <div className="filters-container">
          {/* Region Filter */}
          <div className="filter-section">
            <RegionSelector 
              onSelectionChange={handleRegionChange}
              selectedPrefecture={selectedPrefecture}
              selectedCity={selectedCity}
            />
          </div>

          {/* Category Filter */}
          <div className="filter-section">
            <CategorySelector 
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>

        {/* Search Results */}
        {isMounted && isLoading && (
          <div className="loading">検索中...</div>
        )}

        {isMounted && !isLoading && searchQuery && searchResults.length === 0 && (
          <div className="no-results">
            「{searchQuery}」に関する補助金が見つかりませんでした。<br />
            別のキーワードでお試しください。
          </div>
        )}

        {isMounted && !isLoading && searchResults.length > 0 && (
          <div className="search-results">
            <h2 className="results-title">検索結果: {searchResults.length}件</h2>
            {searchResults.map((subsidy) => (
              <div key={subsidy.id} className="result-card">
                <div className="result-header">
                  <h3 className="result-name">{subsidy.name}</h3>
                  <span className="result-category">{subsidy.category}</span>
                </div>
                
                <div className="result-location">
                  📍 {subsidy.prefecture} {subsidy.city}
                </div>
                
                <div className="result-section">
                  <div className="result-label">💰 補助額</div>
                  <div className="result-text">{subsidy.amount}</div>
                </div>
                
                <div className="result-section">
                  <div className="result-label">📋 受給資格</div>
                  <div className="result-text">{subsidy.eligibility}</div>
                </div>
                
                <div className="result-section">
                  <div className="result-label">📝 申請方法</div>
                  <div className="result-text">{subsidy.applicationMethod}</div>
                </div>
                
                <div className="result-keywords">
                  {subsidy.keywords.map((keyword, index) => (
                    <span key={index} className="result-keyword">{keyword}</span>
                  ))}
                </div>
                
                <a
                  href={subsidy.referenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="result-link"
                >
                  詳細情報を見る →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contact Tab Content */}
      <div className={`tab-content ${activeTab === 'contact' ? 'active' : ''}`}>
        {/* Contact Content */}
        <section className="contact-content">
          <h1 className="page-title">お問い合わせ</h1>
          <p className="page-description">
            補助金検索システムに関するご質問、ご要望、不具合報告などがございましたら、<br />
            下記のフォームよりお気軽にお問い合わせください。
          </p>
        </section>

        {/* Form Container */}
        <div className="form-container">
          <iframe 
            src="https://docs.google.com/forms/d/e/1FAIpQLSe4Kg7c0qql0pniVmsno77PM1XlWu6116IbkxjbnlE9i2f_Fg/viewform?embedded=true"
            width="100%" 
            height="510"
            style={{ border: 'none', borderRadius: '8px' }}
            title="お問い合わせフォーム"
          >
            読み込んでいます…
          </iframe>
        </div>

        {/* Info Section */}
        <section className="info-section">
          <h2 className="info-title">お問い合わせについて</h2>
          <div className="info-grid">
            <div className="info-item">
              <h3>📋 お問い合わせ内容</h3>
              <p>システムの使い方、補助金情報の追加依頼、不具合報告、機能改善のご提案など、どんなことでもお気軽にお問い合わせください。</p>
            </div>
            <div className="info-item">
              <h3>🔒 個人情報の取り扱い</h3>
              <p>お問い合わせでいただいた個人情報は、お問い合わせ対応の目的以外には使用いたしません。</p>
            </div>
            <div className="info-item">
              <h3>💡 要望内容</h3>
              <p>お住まいの地域の補助金が見つからない場合は、対象地域の拡大を検討いたしますので、ぜひお知らせください。</p>
            </div>
          </div>
        </section>
      </div>
      </div>
    </div>
  )
}