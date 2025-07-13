'use client'

import { useState } from 'react'

interface NavigationProps {
  activeTab: 'search' | 'contact'
  onTabChange: (tab: 'search' | 'contact') => void
}

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleTabClick = (tab: 'search' | 'contact') => {
    onTabChange(tab)
    setIsMobileMenuOpen(false) // モバイルメニューを閉じる
  }

  return (
    <>
      {/* PC版ナビゲーション */}
      <nav className="navigation-desktop">
        <button 
          className={`nav-button ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => handleTabClick('search')}
        >
          🔍 検索
        </button>
        <button 
          className={`nav-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => handleTabClick('contact')}
        >
          📧 お問い合わせ
        </button>
      </nav>

      {/* SP版ハンバーガーメニュー */}
      <div className="navigation-mobile">
        <button 
          className={`hamburger-button ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="メニューを開く"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* モバイルメニューオーバーレイ */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-menu-header">
                <span className="mobile-menu-title">メニュー</span>
                <button 
                  className="mobile-menu-close"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="メニューを閉じる"
                >
                  ✕
                </button>
              </div>
              
              <div className="mobile-menu-content">
                <button 
                  className={`mobile-nav-button ${activeTab === 'search' ? 'active' : ''}`}
                  onClick={() => handleTabClick('search')}
                >
                  <span className="mobile-nav-icon">🔍</span>
                  <span className="mobile-nav-text">検索</span>
                </button>
                
                <button 
                  className={`mobile-nav-button ${activeTab === 'contact' ? 'active' : ''}`}
                  onClick={() => handleTabClick('contact')}
                >
                  <span className="mobile-nav-icon">📧</span>
                  <span className="mobile-nav-text">お問い合わせ</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}