# 補助金検索システム

全国の地方自治体・国政の一般市民への補助金等の簡単な検索システム

## プロジェクト構成

```
search_subsidiary_aid/
├── frontend/          # Next.js フロントエンド
│   ├── app/          # Next.js App Router
│   ├── package.json  # フロントエンド依存関係
│   └── ...           # その他Next.js関連ファイル
├── scripts/          # データ取得・処理スクリプト
│   └── (今後追加予定) # Python スクレイピングスクリプト等
└── README.md        # このファイル
```

## 開発環境セットアップ

### フロントエンド

```bash
cd frontend
npm install
npm run dev
```

### データ処理（今後追加予定）

```bash
cd scripts
# Python仮想環境の作成とスクレイピングスクリプト実行
```

## 技術スタック

- **フロントエンド**: Next.js, TypeScript, Tailwind CSS, FlexSearch
- **データ処理**: Python（予定）
- **デプロイ**: GitHub Pages対応

## 主な機能

- 補助金情報の高速検索（FlexSearch）
- 市区町村サジェスト絞り込み
- カテゴリー別絞り込み  
- レスポンシブデザイン
- Google Form統合お問い合わせ

## デプロイ

GitHub Actionsを使用してGitHub Pagesに自動デプロイされます。

### 設定手順

1. **GitHub Pages設定**
   - リポジトリ設定 → Pages
   - Source: GitHub Actions

2. **自動デプロイ**
   - mainブランチへのプッシュで自動実行
   - 手動実行も可能（Actions タブ）
