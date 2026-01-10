# Repository Guidelines

## プロジェクト構成
Next.js 16 の App Router 構成です。主要な配置は以下です。
- `app/`: ルート/レイアウト/ページなどのアプリ本体（例: `app/page.tsx`）。
- `public/`: 静的アセット。
- `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`: ビルド/型/リント設定。

## 開発・ビルド・起動コマンド
主要な操作は npm scripts に集約されています。
- `npm run dev`: 開発サーバ起動（http://localhost:3000）。
- `npm run build`: 本番ビルドの生成。
- `npm run start`: 本番ビルドの起動（`build` 後に実行）。
- `npm run lint`: ESLint（`eslint-config-next`）で静的解析。

## コーディングスタイル & 命名
TypeScript/React 前提です。明示的なフォーマッタは未導入のため、既存の書式に合わせ、`npm run lint` が通る形を優先してください。
- ルーティングやレイアウトは Next.js App Router の命名/配置規約に従う（例: `app/(group)/page.tsx`）。
- コンポーネントは React の慣例に沿って PascalCase 推奨（例: `Header.tsx`）。

## テスト方針
現時点でテストフレームワークは導入されていません。必要になった場合は、導入方針と実行コマンドを本ドキュメントに追記してください。

## コミット & PR ガイドライン
履歴が少ないため厳密な規約はありません。以下を推奨します。
- コミットメッセージは簡潔な現在形で要点を記述（例: `Add hero section`）。
- PR には変更概要、動作確認手順、必要に応じてスクリーンショットを含める。

## 設定メモ
Tailwind CSS v4 が導入済みです。スタイル追加時は `postcss.config.mjs` と `tailwindcss` の設定を参照してください。
