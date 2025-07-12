# Claude Code メモリ

このファイルには、Claude Codeセッションのコンテキストとメモリが含まれています。

## プロジェクト概要
全国の地方自治体・国政の一般市民への補助金等の簡単な検索システム

## 目的
- 調べたい市町村区を入力することで自分が享受できる補助金を把握できるシステム
- 主なペルソナ: 子育て世帯（シングル含む）

## 技術スタック

### フロントエンド
- **Next.js**: SPAとして実装（GitHub Pages想定、将来的にCloudflare対応）
- **TypeScript**: 型安全性の確保
- **Tailwind CSS**: UIスタイリング
- **FlexSearch**: 補助金のLike検索機能

### データ収集・処理
- **スクレイピング**: Python/Go/Rust（要検討）
- **データ形式**: JSON形式で地域別に保存
- **動的取得**: URL指定による探索的データ取得
- **深層リンク対応**: 探索的スクレイピング実装

## データ構造

### マスターデータ
- 都道府県・市町村区データ

### 補助金データ
- 補助金名
- 金額（補助額）
- 受給資格条件
- 受給方法（申請方法）
- 参照URL

## サンプルデータ
- `table.md`: 川口市の補助金データをMarkdown形式で管理
- 住宅リフォーム、地球温暖化対策、児童手当、子ども医療費など

## 開発フェーズ
1. **基盤構築** (2-3週間): Next.js setup、基本UI、FlexSearch統合
2. **データ基盤** (3-4週間): スクレイピング、検索機能、データ管理
3. **拡張・最適化** (2-3週間): 他自治体対応、最適化、GitHub Pages対応

## プロジェクト構成
```
search_subsidiary_aid/
├── frontend/          # Next.js フロントエンド
├── scripts/          # データ取得・処理スクリプト
├── table.md         # 補助金データ（Markdown形式）
└── index.html       # 元のHTMLモック
```

## 実行コマンド

### フロントエンド
```bash
cd frontend
npm run dev      # 開発サーバー起動
npm run build    # ビルド
npm run start    # 本番サーバー起動
```

### Lint/型チェック
```bash
cd frontend
npm run type-check  # TypeScript型チェック
npm run lint        # ESLint
```

## 開発状況
✅ Next.js + TypeScript + Tailwind CSS セットアップ完了
✅ 基本UIコンポーネント実装完了
✅ FlexSearch統合・検索機能完了

## アクセス情報
- 開発サーバー: http://localhost:3000 (frontend/で実行)

## 重要な設計方針
- ネット上から収集できないデータは一旦対象外
- 各自治体・都道府県・国の公開データから全て取得
- セキュリティを考慮した安全な実装