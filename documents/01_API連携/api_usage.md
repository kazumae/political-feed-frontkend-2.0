# API連携の使用方法

## 概要

このドキュメントでは、政治家フィードアプリケーションでAPI連携を使用する方法について説明します。API連携用のhookとコンテキストプロバイダーを使用することで、バックエンドAPIとの通信を簡単かつ効率的に行うことができます。

## 目次

1. [セットアップ](#セットアップ)
2. [認証関連の使用例](#認証関連の使用例)
3. [政治家関連の使用例](#政治家関連の使用例)
4. [発言関連の使用例](#発言関連の使用例)
5. [エラーハンドリング](#エラーハンドリング)
6. [ベストプラクティス](#ベストプラクティス)

## セットアップ

API連携を使用するには、まずアプリケーションのルートコンポーネントでAPIコンテキストプロバイダーを設定する必要があります。Next.jsのApp Routerを使用している場合は、`src/app/layout.tsx`ファイルで以下のように設定します。

```tsx
// src/app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

`Providers`コンポーネントは、`src/app/providers.tsx`ファイルで以下のように定義します。

```tsx
// src/app/providers.tsx
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

これにより、アプリケーション全体でAPI連携用のhookを使用できるようになります。

## 認証関連の使用例

### ログイン

```tsx
'use client';

import { useState } from 'react';
import { useApi } from '@/lib/api/context/ApiContext';
import { LoginRequest } from '@/lib/api/types/auth';

export default function LoginForm() {
  const { auth } = useApi();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const credentials: LoginRequest = {
      username,
      password,
    };

    const result = await auth.login(credentials);
    if (!result.success) {
      setError(result.error || 'ログインに失敗しました');
    } else {
      // ログイン成功時の処理
      // 例: ホームページにリダイレクト
      window.location.href = '/';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="text-red-500">{error}</div>}
      <div>
        <label htmlFor="username">ユーザー名</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">ログイン</button>
    </form>
  );
}
```

### ユーザー登録

```tsx
'use client';

import { useState } from 'react';
import { useApi } from '@/lib/api/context/ApiContext';
import { RegisterRequest } from '@/lib/api/types/auth';

export default function RegisterForm() {
  const { auth } = useApi();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const userData: RegisterRequest = {
      email,
      username,
      password,
    };

    const result = await auth.register(userData);
    if (!result.success) {
      setError(result.error || 'ユーザー登録に失敗しました');
    } else {
      // 登録成功時の処理
      // 例: ホームページにリダイレクト
      window.location.href = '/';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* フォームの内容 */}
    </form>
  );
}
```

### 認証状態の確認

```tsx
'use client';

import { useEffect } from 'react';
import { useApi } from '@/lib/api/context/ApiContext';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
  const { auth } = useApi();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.isLoading) {
      // 未認証の場合はログインページにリダイレクト
      router.push('/login');
    }
  }, [auth.isAuthenticated, auth.isLoading, router]);

  if (auth.isLoading) {
    return <div>読み込み中...</div>;
  }

  if (!auth.isAuthenticated) {
    return null; // リダイレクト中は何も表示しない
  }

  return (
    <div>
      <h1>保護されたページ</h1>
      <p>ようこそ、{auth.user?.username}さん</p>
      {/* ページの内容 */}
    </div>
  );
}
```

## 政治家関連の使用例

### 政治家一覧の取得

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

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1>政治家一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {politicianList.map((politician) => (
          <div key={politician.id} className="border p-4 rounded">
            <h2>{politician.name}</h2>
            {politician.role && <p>役職: {politician.role}</p>}
            {politician.profile_summary && <p>{politician.profile_summary}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 政治家詳細の取得

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useApi } from '@/lib/api/context/ApiContext';
import { PoliticianWithDetails } from '@/lib/api/types/politician';

export default function PoliticianDetail({ id }: { id: string }) {
  const { politicians } = useApi();
  const [politician, setPolitician] = useState<PoliticianWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPolitician = async () => {
      try {
        const data = await politicians.getPoliticianById(id);
        setPolitician(data);
        setIsLoading(false);
      } catch {
        setError('政治家詳細の取得に失敗しました');
        setIsLoading(false);
      }
    };

    fetchPolitician();
  }, [id, politicians]);

  // ローディング状態とエラー状態の処理
  if (isLoading) return <div>読み込み中...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!politician) return <div>政治家が見つかりません</div>;

  return (
    <div>
      <h1>{politician.name}</h1>
      {/* 政治家詳細の表示 */}
    </div>
  );
}
```

### 政治家のフォロー/アンフォロー

```tsx
'use client';

import { useState } from 'react';
import { useApi } from '@/lib/api/context/ApiContext';

export default function FollowButton({ politicianId }: { politicianId: string }) {
  const { politicians, auth } = useApi();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFollow = async () => {
    if (!auth.isAuthenticated) {
      // 未認証の場合はログインページにリダイレクト
      window.location.href = '/login';
      return;
    }

    setIsLoading(true);
    try {
      if (isFollowing) {
        await politicians.unfollowPolitician(politicianId);
        setIsFollowing(false);
      } else {
        await politicians.followPolitician(politicianId);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('フォロー操作に失敗しました', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      disabled={isLoading}
      className={`px-4 py-2 rounded ${
        isFollowing ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
      }`}
    >
      {isLoading
        ? '処理中...'
        : isFollowing
        ? 'フォロー解除'
        : 'フォローする'}
    </button>
  );
}
```

## 発言関連の使用例

### 発言一覧の取得

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useApi } from '@/lib/api/context/ApiContext';
import { Statement, StatementList } from '@/lib/api/types/statement';

export default function StatementList() {
  const { statements } = useApi();
  const [statementList, setStatementList] = useState<Statement[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatements = async () => {
      try {
        const data = await statements.getStatements({
          limit: 20,
          sort: 'date_desc',
        });
        setStatementList(data.statements);
        setTotal(data.total);
        setIsLoading(false);
      } catch {
        setError('発言データの取得に失敗しました');
        setIsLoading(false);
      }
    };

    fetchStatements();
  }, [statements]);

  // ローディング状態とエラー状態の処理
  if (isLoading) return <div>読み込み中...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h1>発言一覧</h1>
      <p>全{total}件の発言</p>
      <div className="space-y-4">
        {statementList.map((statement) => (
          <div key={statement.id} className="border p-4 rounded">
            <h2>{statement.title}</h2>
            <p className="text-sm text-gray-500">
              {statement.politician_name} - {new Date(statement.statement_date).toLocaleDateString()}
            </p>
            <p>{statement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 発言詳細の取得

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useApi } from '@/lib/api/context/ApiContext';
import { StatementDetail } from '@/lib/api/types/statement';

export default function StatementDetail({ id }: { id: string }) {
  const { statements } = useApi();
  const [statement, setStatement] = useState<StatementDetail | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatement = async () => {
      try {
        const data = await statements.getStatementById(id);
        setStatement(data);
        setIsLoading(false);
      } catch {
        setError('発言詳細の取得に失敗しました');
        setIsLoading(false);
      }
    };

    fetchStatement();
  }, [id, statements]);

  // ローディング状態とエラー状態の処理
  if (isLoading) return <div>読み込み中...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!statement) return <div>発言が見つかりません</div>;

  return (
    <div>
      <h1>{statement.title}</h1>
      <p className="text-sm text-gray-500">
        {statement.politician_name} - {new Date(statement.statement_date).toLocaleDateString()}
      </p>
      <div className="my-4">{statement.content}</div>
      <div>
        <h2>関連トピック</h2>
        <div className="flex flex-wrap gap-2">
          {statement.topics.map((topic) => (
            <span key={topic.id} className="bg-gray-200 px-2 py-1 rounded text-sm">
              {topic.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
```

### 発言へのいいね/いいね解除

```tsx
'use client';

import { useState } from 'react';
import { useApi } from '@/lib/api/context/ApiContext';

export default function LikeButton({ statementId, initialLiked = false }: { statementId: string; initialLiked?: boolean }) {
  const { statements, auth } = useApi();
  const [isLiked, setIsLiked] = useState<boolean>(initialLiked);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLike = async () => {
    if (!auth.isAuthenticated) {
      // 未認証の場合はログインページにリダイレクト
      window.location.href = '/login';
      return;
    }

    setIsLoading(true);
    try {
      if (isLiked) {
        await statements.unlikeStatement(statementId);
        setIsLiked(false);
      } else {
        await statements.likeStatement(statementId);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('いいね操作に失敗しました', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className="flex items-center gap-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={isLiked ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        className={`w-5 h-5 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{isLiked ? 'いいね済み' : 'いいね'}</span>
    </button>
  );
}
```

## エラーハンドリング

API連携では、エラーハンドリングが重要です。以下は、エラーハンドリングの例です。

### グローバルエラーハンドリング

```tsx
'use client';

import { useEffect } from 'react';
import { useApi } from '@/lib/api/context/ApiContext';
import { toast } from 'react-hot-toast'; // 例としてreact-hot-toastを使用

export default function ApiErrorHandler() {
  const { auth, politicians, statements } = useApi();

  useEffect(() => {
    // 認証エラーの監視
    if (auth.error) {
      toast.error(`認証エラー: ${auth.error}`);
    }
  }, [auth.error]);

  useEffect(() => {
    // 政治家関連のエラーの監視
    if (politicians.error) {
      toast.error(`政治家データエラー: ${politicians.error}`);
    }
  }, [politicians.error]);

  useEffect(() => {
    // 発言関連のエラーの監視
    if (statements.error) {
      toast.error(`発言データエラー: ${statements.error}`);
    }
  }, [statements.error]);

  return null; // UIは表示しない
}
```

### コンポーネントレベルのエラーハンドリング

```tsx
'use client';

import { useState } from 'react';
import { useApi } from '@/lib/api/context/ApiContext';

export default function DataFetchingComponent() {
  const { politicians } = useApi();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await politicians.getPoliticians();
      setData(result);
    } catch (err) {
      setError('データの取得に失敗しました');
      console.error('Error fetching data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={isLoading}>
        {isLoading ? '読み込み中...' : 'データを取得'}
      </button>
      {error && <div className="text-red-500">{error}</div>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

## ベストプラクティス

### 1. 認証状態の確認

保護されたページでは、常に認証状態を確認してください。

```tsx
useEffect(() => {
  if (!auth.isAuthenticated && !auth.isLoading) {
    router.push('/login');
  }
}, [auth.isAuthenticated, auth.isLoading, router]);
```

### 2. ローディング状態の表示

データ取得中はローディング状態を表示してください。

```tsx
if (isLoading) {
  return <div>読み込み中...</div>;
}
```

### 3. エラー状態の表示

エラーが発生した場合はエラーメッセージを表示してください。

```tsx
if (error) {
  return <div className="text-red-500">{error}</div>;
}
```

### 4. データの存在確認

データが存在しない場合は適切なメッセージを表示してください。

```tsx
if (!data || data.length === 0) {
  return <div>データがありません</div>;
}
```

### 5. useCallbackの使用

パフォーマンスを向上させるために、関数をuseCallbackでラップしてください。

```tsx
const handleSubmit = useCallback(async (e: React.FormEvent) => {
  e.preventDefault();
  // ...
}, [dependencies]);
```

### 6. 依存配列の適切な設定

useEffectやuseCallbackの依存配列は適切に設定してください。

```tsx
useEffect(() => {
  // ...
}, [id, statements]); // idとstatementsが変更されたときだけ実行
```

これらのベストプラクティスに従うことで、API連携を効率的に行うことができます。