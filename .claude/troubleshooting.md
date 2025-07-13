# トラブルシューティングガイド

## JSON Parse Error: Bad control character

### 問題
```
Module parse failed: Cannot parse JSON: Bad control character in string literal in JSON at position 66
```

### 原因
1. JSONファイルに制御文字が含まれている
2. ファイルエンコーディングの問題
3. Next.jsの開発サーバーのキャッシュ問題

### 対処法

#### 1. ファイルの再作成
```bash
# 問題のファイルを削除
rm frontend/app/data/master/index.json
rm frontend/app/data/master/prefecture/tokyo.json
rm frontend/app/data/master/prefecture/saitama.json

# 正しいファイルを再作成（この作業は完了済み）
```

#### 2. 開発サーバーの完全リセット
```bash
cd frontend/
# 開発サーバーを停止 (Ctrl+C)

# Next.jsキャッシュをクリア
rm -rf .next

# node_modulesキャッシュをクリア（必要に応じて）
rm -rf node_modules/.cache

# 開発サーバーを再起動
npm run dev
```

#### 3. ブラウザキャッシュのクリア
- ブラウザのデベロッパーツールを開く
- Application/Storage タブ
- "Clear storage" または "Clear all data"
- ページをリロード

#### 4. 動的インポートの使用
static importで問題が発生する場合、dynamic importを使用:

```typescript
// 静的インポート（問題が発生する可能性）
import data from '../data/master/index.json'

// 動的インポート（推奨）
const data = await import('../data/master/index.json')
```

## Next.js開発時の一般的な問題

### ファイル変更が反映されない
1. 開発サーバーの再起動
2. `.next`フォルダの削除
3. ブラウザキャッシュのクリア

### TypeScript型エラー
1. `next-env.d.ts`の確認
2. `tsconfig.json`の設定確認
3. 型定義ファイルの再生成

### import/export エラー
1. ファイルパスの確認
2. 拡張子の明示的指定
3. default export vs named export の確認

## 推奨開発環境設定

### package.json scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "clean": "rm -rf .next out",
    "reset": "npm run clean && npm run dev"
  }
}
```

### .gitignore 確認項目
```
.next/
out/
node_modules/
.env.local
.DS_Store
```

## デバッグコマンド

### JSONファイルの検証
```bash
# JSON構文チェック
jq . frontend/app/data/master/index.json

# ファイルエンコーディングチェック
file frontend/app/data/master/index.json

# 制御文字の確認
hexdump -C frontend/app/data/master/index.json | head -10
```

### Next.js状態確認
```bash
# ビルド可能性の確認
npm run build

# 依存関係の確認
npm ls

# TypeScript型チェック
npx tsc --noEmit
```