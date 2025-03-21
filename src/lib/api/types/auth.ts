/**
 * 認証関連の型定義
 */

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

// ユーザー登録リクエスト
export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

// リフレッシュトークンリクエスト
export interface RefreshTokenRequest {
  refresh_token: string;
}

// パスワードリセットリクエスト
export interface PasswordResetRequest {
  email: string;
}

// パスワードリセット確認リクエスト
export interface PasswordResetConfirmRequest {
  token: string;
  new_password: string;
}

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