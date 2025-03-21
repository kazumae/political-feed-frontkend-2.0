# API連携用型定義

## 概要

このドキュメントでは、政治家フィードアプリケーションのフロントエンドとバックエンドAPIを連携するために定義された型について説明します。これらの型定義を使用することで、TypeScriptの型安全性を活かしたAPI連携が可能になります。

## 目次

1. [認証関連の型定義](#認証関連の型定義)
2. [政治家関連の型定義](#政治家関連の型定義)
3. [発言関連の型定義](#発言関連の型定義)

## 認証関連の型定義

認証関連の型定義は`src/lib/api/types/auth.ts`ファイルで定義されています。

### ログイン関連

```typescript
// ログインリクエスト
export interface LoginRequest {
  username: string;
  password: string;
}

// トークンレスポンス
export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

// リフレッシュトークンリクエスト
export interface RefreshTokenRequest {
  refresh_token: string;
}
```

### ユーザー登録関連

```typescript
// ユーザー登録リクエスト
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}
```

### パスワードリセット関連

```typescript
// パスワードリセットリクエスト
export interface PasswordResetRequest {
  email: string;
}

// パスワードリセット確認リクエスト
export interface PasswordResetConfirmRequest {
  token: string;
  new_password: string;
}
```

### ユーザー情報関連

```typescript
// 認証状態
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  error: string | null;
}

// ユーザープロフィール
export interface UserProfile {
  id: string;
  email: string;
  username: string;
  role: string;
  status: string;
  email_verified: boolean;
  profile_image: string | null;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
}
```

## 政治家関連の型定義

政治家関連の型定義は`src/lib/api/types/politician.ts`ファイルで定義されています。

### 政治家基本情報

```typescript
// 政治家基本情報
export interface Politician {
  id: string;
  name: string;
  name_kana: string | null;
  current_party_id: string | null;
  role: string | null;
  status: string;
  image_url: string | null;
  profile_summary: string | null;
  created_at: string;
  updated_at: string;
}
```

### 政治家詳細情報

```typescript
// 政治家詳細情報
export interface PoliticianDetail {
  birth_date: string | null;
  birth_place: string | null;
  education: string | null; // JSON文字列
  career: string | null; // JSON文字列
  election_history: string | null; // JSON文字列
  website_url: string | null;
  social_media: string | null; // JSON文字列
  additional_info: string | null; // JSON文字列
  politician_id: string;
  created_at: string;
  updated_at: string;
}

// 政治家詳細情報（詳細情報と政党履歴を含む）
export interface PoliticianWithDetails extends Politician {
  details: PoliticianDetail | null;
  party_history: PoliticianParty[];
}
```

### 政治家所属政党履歴

```typescript
// 政治家所属政党履歴
export interface PoliticianParty {
  id: string;
  politician_id: string;
  party_id: string;
  joined_date: string | null;
  left_date: string | null;
  role: string | null;
  is_current: boolean;
  remarks: string | null;
  created_at: string;
  updated_at: string;
}
```

### 政治家のトピック別スタンス

```typescript
// 政治家のトピックに対するスタンス
export interface PoliticianTopicStance {
  topic_id: string;
  topic_name: string;
  topic_slug: string;
  stance: string; // support, oppose, neutral, unknown
  confidence: number; // 0-100
  summary: string | null;
  last_updated: string | null;
}

// 政治家のトピック別スタンス一覧
export interface PoliticianTopicStances {
  politician_id: string;
  politician_name: string;
  topics: PoliticianTopicStance[];
}
```

### リクエストパラメータ

```typescript
// 政治家一覧取得パラメータ
export interface GetPoliticiansParams {
  skip?: number;
  limit?: number;
  status?: string;
  party_id?: string;
  search?: string;
}
```

### リクエスト/レスポンス

```typescript
// 政治家作成リクエスト
export interface PoliticianCreateRequest {
  name: string;
  name_kana?: string;
  current_party_id?: string;
  role?: string;
  status?: string;
  image_url?: string;
  profile_summary?: string;
}

// 政治家更新リクエスト
export interface PoliticianUpdateRequest {
  name?: string;
  name_kana?: string;
  current_party_id?: string;
  role?: string;
  status?: string;
  image_url?: string;
  profile_summary?: string;
}
```

## 発言関連の型定義

発言関連の型定義は`src/lib/api/types/statement.ts`ファイルで定義されています。

### 発言基本情報

```typescript
// 発言基本情報
export interface Statement {
  id: string;
  politician_id: string;
  politician_name: string | null;
  party_id: string | null;
  party_name: string | null;
  title: string;
  content: string;
  source: string | null;
  source_url: string | null;
  statement_date: string;
  context: string | null;
  status: string;
  importance: number;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  is_liked: boolean | null;
}
```

### 発言詳細情報

```typescript
// 発言に関連するトピック情報
export interface StatementTopic {
  id: string;
  name: string;
  slug: string;
  category: string;
  relevance: number;
}

// 発言詳細情報（トピック情報を含む）
export interface StatementDetail extends Statement {
  topics: StatementTopic[];
}
```

### 発言一覧

```typescript
// 発言一覧
export interface StatementList {
  total: number;
  statements: Statement[];
  next_cursor: string | null;
}
```

### リクエストパラメータ

```typescript
// 発言一覧取得パラメータ
export interface GetStatementsParams {
  skip?: number;
  limit?: number;
  sort?: 'date_desc' | 'date_asc' | 'likes';
  filter_party?: string;
  filter_topic?: string;
  filter_date_start?: string;
  filter_date_end?: string;
  search?: string;
}
```

### リクエスト/レスポンス

```typescript
// 発言作成リクエスト
export interface StatementCreateRequest {
  politician_id: string;
  title: string;
  content: string;
  source?: string;
  source_url?: string;
  statement_date: string;
  context?: string;
  status?: string;
  importance?: number;
  topic_ids?: string[];
}

// 発言更新リクエスト
export interface StatementUpdateRequest {
  politician_id?: string;
  title?: string;
  content?: string;
  source?: string;
  source_url?: string;
  statement_date?: string;
  context?: string;
  status?: string;
  importance?: number;
  topic_ids?: string[];
}
```

これらの型定義を使用することで、TypeScriptの型安全性を活かしたAPI連携が可能になります。例えば、APIからのレスポンスデータの型を明示的に指定することで、コンパイル時に型エラーを検出できます。

```typescript
// 例: 政治家一覧を取得する
const getPoliticians = async (params?: GetPoliticiansParams) => {
  try {
    const politicians = await apiClient.get<Politician[]>(
      config.api.endpoints.politicians.list,
      params as Record<string, unknown>
    );
    return politicians;
  } catch (error) {
    console.error('Failed to fetch politicians', error);
    return [];
  }
};
```

また、リクエストパラメータやリクエストボディの型を明示的に指定することで、APIリクエストの正確性を確保できます。

```typescript
// 例: 政治家を作成する
const createPolitician = async (data: PoliticianCreateRequest) => {
  try {
    const politician = await apiClient.post<Politician>(
      config.api.endpoints.politicians.list,
      data
    );
    return politician;
  } catch (error) {
    console.error('Failed to create politician', error);
    return null;
  }
};