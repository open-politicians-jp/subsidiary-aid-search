'use client'

import Navigation from './Navigation'

interface HeaderProps {
  activeTab: 'search' | 'contact'
  onTabChange: (tab: 'search' | 'contact') => void
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        {/* ロゴ・タイトル部分 */}
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">💰</div>
            <h1 className="title">補助金検索</h1>
          </div>
          <div className="subtitle">あなたの知らない補助金が見つかるかもしれません</div>
        </div>

        {/* ナビゲーション部分 */}
        <div className="header-right">
          <Navigation activeTab={activeTab} onTabChange={onTabChange} />
        </div>
      </div>

      {/* 注意書き */}
      <div className="notice-container">
        <div className="notice-box">
          <span className="notice-icon">⚠️</span>
          <div className="notice-text">
            <strong>ご注意ください</strong><br />
            補助金一覧には漏れがある場合や、既に期限が過ぎているものが含まれる可能性があります。<br />
            詳細は必ず各自治体の公式サイトでご確認ください。
          </div>
        </div>
      </div>
    </header>
  )
}