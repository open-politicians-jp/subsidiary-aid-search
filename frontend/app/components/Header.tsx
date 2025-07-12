export default function Header() {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-2 text-center md:text-left">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl">
          💰
        </div>
        <h1 className="text-3xl font-bold text-primary-500">補助金検索</h1>
      </div>
      <div className="text-gray-600 text-sm">
        あなたにぴったりの補助金を簡単に見つけられます
      </div>
    </header>
  )
}