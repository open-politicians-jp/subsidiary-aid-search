'use client'

import { useState } from 'react'
import { useSearch } from './hooks/useSearch'
import { useCitySuggest, City } from './hooks/useCitySuggest'
import CitySelector from './components/CitySelector'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'search' | 'contact'>('search')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const { search, searchResults, isLoading } = useSearch()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 検索クエリに市区町村フィルターを追加
    let query = searchQuery
    if (selectedCity) {
      query = `${query} ${selectedCity.prefecture} ${selectedCity.city}`.trim()
    }
    
    search(query)
  }

  const handleCategoryClick = (category: string) => {
    setSearchQuery(category)
    
    // カテゴリ検索に市区町村フィルターを追加
    let query = category
    if (selectedCity) {
      query = `${query} ${selectedCity.prefecture} ${selectedCity.city}`.trim()
    }
    
    search(query)
  }

  const handleCitySelect = (city: City | null) => {
    setSelectedCity(city)
    
    // 市区町村が選択された場合、即座に検索を実行
    if (city && searchQuery) {
      const query = `${searchQuery} ${city.prefecture} ${city.city}`.trim()
      search(query)
    }
  }

  const switchTab = (tabName: 'search' | 'contact') => {
    setActiveTab(tabName)
  }

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <div className="logo-icon">💰</div>
          <h1 className="title">補助金検索</h1>
        </div>
        <div className="subtitle">あなたの知らない補助金が見つかるかもしれません</div>
      </header>

      {/* Tab Navigation */}
      <nav className="tab-nav">
        <button 
          className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => switchTab('search')}
        >
          🔍 検索
        </button>
        <button 
          className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => switchTab('contact')}
        >
          📧 お問い合わせ
        </button>
      </nav>

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

        {/* City Filter */}
        <div className="filter-section">
          <h2 className="filter-title">📍 地域で絞り込み</h2>
          <CitySelector onCitySelect={handleCitySelect} selectedCity={selectedCity} />
          {selectedCity && (
            <div className="selected-city">
              {selectedCity.prefecture} {selectedCity.city} で絞り込み中
            </div>
          )}
        </div>

        {/* Popular Categories Card */}
        <div className="cards-container">
          <div className="card">
            <h2 className="card-title">
              📈 カテゴリー
            </h2>
            <div className="keywords-grid">
              {['子育て支援', '住宅リフォーム', '医療費助成', '環境・省エネ', '高齢者支援', '起業・創業', '教育・学費', '農業支援'].map((category) => (
                <span 
                  key={category}
                  className="keyword-tag"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Search Results */}
        {isLoading && (
          <div className="loading">検索中...</div>
        )}

        {!isLoading && searchQuery && searchResults.length === 0 && (
          <div className="no-results">
            「{searchQuery}」に関する補助金が見つかりませんでした。<br />
            別のキーワードでお試しください。
          </div>
        )}

        {!isLoading && searchResults.length > 0 && (
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
  )
}