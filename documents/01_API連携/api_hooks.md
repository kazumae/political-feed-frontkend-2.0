# API連携用Hook

## 概要

このドキュメントでは、政治家フィードアプリケーションのフロントエンドとバックエンドAPIを連携するために実装されたReact Hooksについて説明します。これらのHookを使用することで、バックエンドAPIとの通信を簡単かつ効率的に行うことができます。

## 目次

1. [環境設定](#環境設定)
2. [APIクライアント](#apiクライアント)
3. [認証関連のHook](#認証関連のhook)
4. [政治家関連のHook](#政治家関連のhook)
5. [発言関連のHook](#発言関連のhook)
6. [APIコンテキストプロバイダー](#apiコンテキストプロバイダー)
7. [使用例](#使用例)

## 環境設定

環境設定は`src/config/index.ts`ファイルで管理されています。このファイルでは、環境ごとのAPIのベースURLやエンドポイントを定義しています。

```typescript
// 環境変数からAPIのベースURLを取得、または環境ごとのデフォルト値を使用
const getApiBaseUrl = (): string => {
  // Next.jsの環境変数
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  // 開発環境ではlocalhostを使用
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000';
  }

  // 本番環境では本番用のドメインを使用
  return 'https://api.example.com';
};
```

この設定により、開発環境では`http://localhost:8000`、本番環境では`https://api.example.com`をAPIのベースURLとして使用します。また、環境変数`NEXT_PUBLIC_API_BASE_URL`が設定されている場合は、その値を優先して使用します。

## APIクライアント

APIクライアントは`src/lib/api/client.ts`ファイルで実装されています。このクライアントは、RESTful APIとの通信を担当するクラスで、以下の機能を提供します：

- 認証トークンの管理
- リクエストの送信と応答の処理
- エラーハンドリング
- タイムアウト処理

```typescript
class ApiClient {
  private options: ApiClientOptions;

  constructor(options: ApiClientOptions = {}) {
    this.options = { ...defaultOptions, ...options };
  }

  // 認証トークンをヘッダーに設定
  setAuthToken(token: string | null): void {
    // ...
  }

  // GETリクエスト
  async get<T>(endpoint: string, params?: Record<string, unknown>, headers?: Record<string, string>): Promise<T> {
    // ...
  }

  // POSTリクエスト
  async post<T>(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
    // ...
  }

  // PUTリクエスト
  async put<T>(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
    // ...
  }

  // DELETEリクエスト
  async delete<T>(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
    // ...
  }

  // PATCHリクエスト
  async patch<T>(endpoint: string, data?: unknown, headers?: Record<string, string>): Promise<T> {
    // ...
  }
}
```

APIクライアントはシングルトンインスタンスとして作成され、アプリケーション全体で共有されます。

## 認証関連のHook

認証関連のHookは`src/lib/api/hooks/useAuth.ts`ファイルで実装されています。このHookは、ユーザーの認証状態を管理し、以下の機能を提供します：

- ログイン
- ログアウト
- ユーザー登録
- トークンのリフレッシュ
- パスワードリセット
- ユーザープロフィールの取得

```typescript
export const useAuth = () => {
  // 認証状態
  const [authState, setAuthState] = useState<AuthState>(initialState);

  // ログイン処理
  const login = useCallback(async (credentials: LoginRequest) => {
    // ...
  }, []);

  // ユーザー登録処理
  const register = useCallback(async (userData: RegisterRequest) => {
    // ...
  }, []);

  // ログアウト処理
  const logout = useCallback(async () => {
    // ...
  }, []);

  // トークンリフレッシュ処理
  const refreshToken = useCallback(async () => {
    // ...
  }, [logout]);

  // パスワードリセットリクエスト
  const requestPasswordReset = useCallback(async (email: string) => {
    // ...
  }, []);

  // パスワードリセット確認
  const confirmPasswordReset = useCallback(async (token: string, newPassword: string) => {
    // ...
  }, []);

  // ...

  return {
    ...authState,
    login,
    register,
    logout,
    refreshToken,
    requestPasswordReset,
    confirmPasswordReset,
    fetchUserProfile,
  };
};
```

## 政治家関連のHook

政治家関連のHookは`src/lib/api/hooks/usePoliticians.ts`ファイルで実装されています。このHookは、政治家に関する情報を取得し、以下の機能を提供します：

- 政治家一覧の取得
- 政治家詳細の取得
- 政治家のトピック別スタンスの取得
- 政治家のフォロー/アンフォロー
- 特定の政党に所属する政治家一覧の取得

```typescript
export const usePoliticians = () => {
  // ローディング状態
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // エラーメッセージ
  const [error, setError] = useState<string | null>(null);

  // 政治家一覧を取得
  const getPoliticians = useCallback(async (params?: GetPoliticiansParams) => {
    // ...
  }, []);

  // 政治家詳細を取得
  const getPoliticianById = useCallback(async (id: string) => {
    // ...
  }, []);

  // 政治家のトピック別スタンスを取得
  const getPoliticianTopics = useCallback(async (politicianId: string) => {
    // ...
  }, []);

  // 政治家をフォロー
  const followPolitician = useCallback(async (politicianId: string) => {
    // ...
  }, []);

  // 政治家のフォローを解除
  const unfollowPolitician = useCallback(async (politicianId: string) => {
    // ...
  }, []);

  // 特定の政党に所属する政治家一覧を取得
  const getPoliticiansByParty = useCallback(async (partyId: string, params?: { skip?: number; limit?: number; role?: string }) => {
    // ...
  }, []);

  return {
    isLoading,
    error,
    getPoliticians,
    getPoliticianById,
    getPoliticianTopics,
    followPolitician,
    unfollowPolitician,
    getPoliticiansByParty,
  };
};
```

## 発言関連のHook

発言関連のHookは`src/lib/api/hooks/useStatements.ts`ファイルで実装されています。このHookは、政治家の発言に関する情報を取得し、以下の機能を提供します：

- 発言一覧の取得
- フォロー中の政治家の発言一覧の取得
- 発言詳細の取得
- 特定の政治家/政党/トピックに関連する発言の取得
- 発言へのいいね/いいね解除

```typescript
export const useStatements = () => {
  // ローディング状態
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // エラーメッセージ
  const [error, setError] = useState<string | null>(null);

  // 発言一覧を取得
  const getStatements = useCallback(async (params?: GetStatementsParams) => {
    // ...
  }, []);

  // フォロー中の政治家の発言一覧を取得
  const getFollowingStatements = useCallback(async (params?: { skip?: number; limit?: number; sort?: string }) => {
    // ...
  }, []);

  // 発言詳細を取得
  const getStatementById = useCallback(async (statementId: string) => {
    // ...
  }, []);

  // 特定の政治家の発言一覧を取得
  const getStatementsByPolitician = useCallback(async (
    politicianId: string,
    params?: { skip?: number; limit?: number; sort?: string }
  ) => {
    // ...
  }, []);

  // 特定の政党の発言一覧を取得
  const getStatementsByParty = useCallback(async (
    partyId: string,
    params?: { skip?: number; limit?: number; sort?: string }
  ) => {
    // ...
  }, []);

  // 特定のトピックの発言一覧を取得
  const getStatementsByTopic = useCallback(async (
    topicId: string,
    params?: { skip?: number; limit?: number; sort?: string }
  ) => {
    // ...
  }, []);

  // 発言にいいねする
  const likeStatement = useCallback(async (statementId: string) => {
    // ...
  }, []);

  // 発言のいいねを解除する
  const unlikeStatement = useCallback(async (statementId: string) => {
    // ...
  }, []);

  return {
    isLoading,
    error,
    getStatements,
    getFollowingStatements,
    getStatementById,
    getStatementsByPolitician,
    getStatementsByParty,
    getStatementsByTopic,
    likeStatement,
    unlikeStatement,
  };
};
```

## APIコンテキストプロバイダー

APIコンテキストプロバイダーは`src/lib/api/context/ApiContext.tsx`ファイルで実装されています。このプロバイダーは、アプリケーション全体でAPIクライアントとHookを使用できるようにするためのReactコンテキストを提供します。

```typescript
// APIコンテキストの型定義
interface ApiContextType {
  auth: ReturnType<typeof useAuth>;
  politicians: ReturnType<typeof usePoliticians>;
  statements: ReturnType<typeof useStatements>;
}

// APIコンテキストの作成
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// APIコンテキストプロバイダー
export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  // 各hookの初期化
  const auth = useAuth();
  const politicians = usePoliticians();
  const statements = useStatements();

  // コンテキスト値の作成
  const value: ApiContextType = {
    auth,
    politicians,
    statements,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

// APIコンテキストを使用するためのhook
export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
```

Next.jsのApp Routerでは、サーバーコンポーネントでクライアントコンポーネントを使用するために、`src/app/providers.tsx`ファイルでクライアントコンポーネントとしてのプロバイダーラッパーを作成しています。

```typescript
'use client';

import { ReactNode } from 'react';
import { ApiProvider } from '@/lib/api/context/ApiContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <ApiProvider>{children}</ApiProvider>;
}
```

そして、`src/app/layout.tsx`ファイルでこのプロバイダーラッパーを使用しています。

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

## 使用例

以下は、APIコンテキストとHookを使用して政治家一覧を取得する例です。

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useApi } from '@/lib/api/context/ApiContext';
import { Politician } from '@/lib/api/types/politician';

export default function PoliticianList() {
  const { politicians } = useApi();
  const [politicianList, setPoliticianList] = useState<Politician[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoliticians = async () => {
      try {
        const data = await politicians.getPoliticians();
        setPoliticianList(data || []);
        setIsLoading(false);
      } catch {
        setError('政治家データの取得に失敗しました');
        setIsLoading(false);
      }
    };

    fetchPoliticians();
  }, [politicians]);

  // ...
}
```

このように、`useApi`フックを使用することで、APIクライアントとHookを簡単に使用できます。