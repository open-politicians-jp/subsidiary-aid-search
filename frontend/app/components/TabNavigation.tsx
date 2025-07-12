interface TabNavigationProps {
  activeTab: 'search' | 'contact'
  onTabChange: (tab: 'search' | 'contact') => void
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="flex flex-col md:flex-row bg-white rounded-xl p-1 mb-10 shadow-soft">
      <button
        className={`flex-1 px-5 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
          activeTab === 'search'
            ? 'bg-primary-500 text-white'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
        }`}
        onClick={() => onTabChange('search')}
      >
        🔍 検索
      </button>
      <button
        className={`flex-1 px-5 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
          activeTab === 'contact'
            ? 'bg-primary-500 text-white'
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
        }`}
        onClick={() => onTabChange('contact')}
      >
        📧 お問い合わせ
      </button>
    </nav>
  )
}