# 補助金検索システム - アーキテクチャ設計書

## 📁 ディレクトリ構成

### データ構造
```
frontend/app/data/
├── master/                          # マスターデータ（都道府県・市区町村情報）
│   ├── index.json                   # 全都道府県一覧
│   └── prefecture/                  # 都道府県別市区町村データ
│       ├── tokyo.json               # 東京都の市区町村一覧
│       ├── saitama.json             # 埼玉県の市区町村一覧
│       └── [prefecture].json       # 各都道府県
│
├── [prefecture]/                    # 補助金データ（都道府県別）
│   ├── index.json                   # 都道府県概要・統計
│   └── [city].json                  # 市区町村別補助金データ
│
└── subsidies.json                   # 既存データ（移行予定）
```

### ファイル例
```
data/
├── master/
│   ├── index.json                   # {"prefectures": [{"id": "tokyo", "name": "東京都", "cities": 62}]}
│   └── prefecture/
│       ├── tokyo.json               # [{"id": "kodaira", "name": "小平市", "reading": "こだいら"}]
│       └── saitama.json             # [{"id": "kawaguchi", "name": "川口市", "reading": "かわぐち"}]
│
├── tokyo/
│   ├── index.json                   # 東京都の補助金統計・概要
│   └── kodaira.json                 # 小平市の補助金詳細データ
│
└── saitama/
    ├── index.json                   # 埼玉県の補助金統計・概要
    └── kawaguchi.json               # 川口市の補助金詳細データ
```

## 🎯 実装方針

### 1. 段階的移行戦略
- **Phase 1**: マスターデータ構造作成 + 既存データ互換性維持
- **Phase 2**: 地域絞り込み機能実装
- **Phase 3**: 動的データロード対応
- **Phase 4**: 既存subsidies.jsonからの完全移行

### 2. データロード戦略
```typescript
// 静的インポート（初期実装）
import tokyoCities from '../data/master/prefecture/tokyo.json'
import saitamaCities from '../data/master/prefecture/saitama.json'

// 動的インポート（将来的拡張）
const loadPrefectureData = async (prefecture: string) => {
  return await import(`../data/master/prefecture/${prefecture}.json`)
}
```

### 3. 地域絞り込み機能
- **都道府県選択** → 市区町村リスト更新
- **市区町村選択** → 補助金データフィルタリング
- **カスケード選択** → 都道府県変更時に市区町村リセット

### 4. 検索機能統合
```typescript
interface SearchFilter {
  query?: string           // キーワード検索
  prefecture?: string      // 都道府県フィルター
  city?: string           // 市区町村フィルター
  category?: string       // カテゴリフィルター
}
```

## 📋 データスキーマ

### マスターデータ

#### `master/index.json`
```json
{
  "prefectures": [
    {
      "id": "tokyo",
      "name": "東京都",
      "reading": "とうきょうと",
      "region": "関東",
      "cityCount": 62,
      "subsidyCount": 150
    }
  ],
  "lastUpdated": "2025-01-13"
}
```

#### `master/prefecture/[prefecture].json`
```json
[
  {
    "id": "kodaira",
    "name": "小平市",
    "reading": "こだいら",
    "prefecture": "tokyo",
    "type": "市",
    "population": 195000,
    "subsidyCount": 14
  }
]
```

### 補助金データ（変更なし）
```json
[
  {
    "id": "kodaira_energy_saving_appliances",
    "name": "小平市省エネ家電等買換促進補助金",
    "amount": "購入・設置費用の1/4（上限3万円）",
    "eligibility": "...",
    "applicationMethod": "...",
    "referenceUrl": "...",
    "prefecture": "東京都",
    "city": "小平市",
    "category": "環境・省エネ",
    "keywords": ["省エネ", "家電"]
  }
]
```

## 🔧 実装優先順位

### High Priority
1. ✅ 基本ディレクトリ構成作成
2. ✅ マスターデータ作成（東京都・埼玉県）
3. ✅ 地域選択コンポーネント改修
4. ✅ 検索フィルター統合

### Medium Priority
1. 動的データロード実装
2. 都道府県データ拡張
3. パフォーマンス最適化

### Low Priority
1. 既存データ完全移行
2. 統計情報表示
3. データ更新システム

## 🚀 パフォーマンス考慮

### 初期ロード最適化
- 必要最小限のマスターデータのみ初期ロード
- 補助金データは地域選択時に動的ロード

### メモリ最適化
- 使用済み地域データのキャッシュ管理
- 大量データの分割ロード

### UX最適化
- 地域選択時のローディング表示
- プリフェッチによる体感速度向上

## 📝 実装チェックリスト

- [x] マスターデータ構造作成
- [x] 既存cities.jsonからの移行
- [x] 地域選択コンポーネント更新 (RegionSelector)
- [x] 検索フィルター統合 (SearchFilter対応)
- [x] 新しいhook実装 (useRegionFilter)
- [x] UI/UXデザイン実装
- [ ] エラーハンドリング実装
- [ ] テストデータ作成
- [ ] ドキュメント更新

## 🎯 実装完了済み機能

### ✅ Phase 1: 基本機能 (完了)
1. **マスターデータ構造**
   - `data/master/index.json` - 全都道府県一覧
   - `data/master/prefecture/tokyo.json` - 東京都市区町村
   - `data/master/prefecture/saitama.json` - 埼玉県市区町村

2. **地域選択機能**
   - `RegionSelector` コンポーネント
   - カスケード選択（都道府県→市区町村）
   - インクリメンタル検索対応

3. **統合検索機能**
   - `SearchFilter` インターフェース
   - キーワード + 地域 + カテゴリの複合検索
   - リアルタイム絞り込み

4. **UI/UX改善**
   - レスポンシブデザイン
   - 選択状態の可視化
   - クリア機能

## 🔄 次期実装予定

### Phase 2: 拡張機能
1. **動的データロード**
   - 都道府県データの段階的ロード
   - パフォーマンス最適化

2. **データ拡張**
   - 全47都道府県対応
   - 補助金データの網羅性向上

3. **検索体験向上**
   - 検索履歴機能
   - おすすめ地域表示
   - 人気カテゴリの動的更新