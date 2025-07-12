import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '補助金検索システム',
  description: '全国の地方自治体・国政の一般市民への補助金等の簡単な検索システム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}