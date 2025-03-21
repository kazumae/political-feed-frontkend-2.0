# API連携ドキュメント

## 概要

このディレクトリには、政治家フィードアプリケーションのフロントエンドとバックエンドAPIを連携するためのドキュメントが含まれています。

## ドキュメント一覧

1. [API連携用Hook](./api_hooks.md)
   - API連携用のReact Hooksについての説明
   - 認証、政治家、発言関連のHookの実装と使用方法
   - APIコンテキストプロバイダーの説明

2. [API連携用型定義](./api_types.md)
   - API連携用の型定義についての説明
   - 認証、政治家、発言関連の型定義
   - TypeScriptの型安全性を活かしたAPI連携の方法

3. [API連携の使用方法](./api_usage.md)
   - API連携を使用する方法についての説明
   - 認証、政治家、発言関連の使用例
   - エラーハンドリングとベストプラクティス

## ディレクトリ構造

```
src/
├── config/
│   └── index.ts                # 環境設定
├── lib/
│   └── api/
│       ├── client.ts           # APIクライアント
│       ├── context/
│       │   └── ApiContext.tsx  # APIコンテキストプロバイダー
│       ├── hooks/
│       │   ├── useAuth.ts      # 認証関連のHook
│       │   ├── usePoliticians.ts # 政治家関連のHook
│       │   └── useStatements.ts # 発言関連のHook
│       ├── types/
│       │   ├── auth.ts         # 認証関連の型定義
│       │   ├── politician.ts   # 政治家関連の型定義
│       │   └── statement.ts    # 発言関連の型定義
│       └── utils/
│           └── storage.ts      # ストレージユーティリティ
└── app/
    ├── layout.tsx              # アプリケーションレイアウト
    ├── page.tsx                # ホームページ
    └── providers.tsx           # プロバイダーラッパー
```

## 使用方法

1. APIコンテキストプロバイダーをアプリケーションのルートコンポーネントで設定します。
2. `useApi`フックを使用して、API連携用のHookにアクセスします。
3. 各Hookを使用して、APIとの通信を行います。

```tsx
'use client';

import { useApi } from '@/lib/api/context/ApiContext';

export default function MyComponent() {
  const { auth, politicians, statements } = useApi();

  // 認証、政治家、発言関連のHookを使用
  // ...

  return (
    // ...
  );
}
```

詳細な使用方法については、各ドキュメントを参照してください。