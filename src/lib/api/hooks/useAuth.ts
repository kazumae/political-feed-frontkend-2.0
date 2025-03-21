import { useState, useEffect, useCallback } from 'react';
import apiClient from '../client';
import config from '@/config';
import {
  AuthState,
  LoginRequest,
  RegisterRequest,
  TokenResponse,
  UserProfile,
  RefreshTokenRequest,
  PasswordResetRequest,
  PasswordResetConfirmRequest,
} from '../types/auth';
import {
  saveAccessToken,
  saveRefreshToken,
  getAccessToken,
  getRefreshToken,
  saveUser,
  clearAuthStorage,
} from '../utils/storage';

/**
 * 認証関連のhook
 * ログイン、ログアウト、ユーザー登録、トークンリフレッシュなどの機能を提供
 */
export const useAuth = () => {
  // 初期状態
  const initialState: AuthState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    error: null,
  };

  // 認証状態
  const [authState, setAuthState] = useState<AuthState>(initialState);

  /**
   * ログイン処理
   * @param credentials ログイン情報
   * @returns ログイン結果
   */
  const login = useCallback(async (credentials: LoginRequest) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // URLエンコードされたフォームデータを作成
      const formData = new URLSearchParams();
      formData.append('username', credentials.username);
      formData.append('password', credentials.password);
      formData.append('grant_type', 'password');

      // ログインAPIを呼び出し
      const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.auth.login}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'ログインに失敗しました');
      }

      const tokenData: TokenResponse = await response.json();

      // トークンを保存
      saveAccessToken(tokenData.access_token);
      saveRefreshToken(tokenData.refresh_token);

      // APIクライアントに認証トークンを設定
      apiClient.setAuthToken(tokenData.access_token);

      // ユーザー情報を取得
      const user = await fetchUserProfile();

      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user,
        error: null,
      });

      return { success: true, user };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '認証に失敗しました';
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * ユーザー登録処理
   * @param userData ユーザー登録情報
   * @returns 登録結果
   */
  const register = useCallback(async (userData: RegisterRequest) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // 登録APIを呼び出し
      const tokenData = await apiClient.post<TokenResponse>(
        config.api.endpoints.auth.register,
        userData
      );

      // トークンを保存
      saveAccessToken(tokenData.access_token);
      saveRefreshToken(tokenData.refresh_token);

      // APIクライアントに認証トークンを設定
      apiClient.setAuthToken(tokenData.access_token);

      // ユーザー情報を取得
      const user = await fetchUserProfile();

      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user,
        error: null,
      });

      return { success: true, user };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'ユーザー登録に失敗しました';
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: errorMessage,
      });
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * ログアウト処理
   */
  const logout = useCallback(async () => {
    try {
      // ログアウトAPIを呼び出し（失敗しても続行）
      await apiClient.post(config.api.endpoints.auth.logout).catch(() => {
        // エラーを無視
      });
    } finally {
      // 認証情報をクリア
      clearAuthStorage();
      apiClient.setAuthToken(null);

      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      });
    }
  }, []);

  /**
   * トークンリフレッシュ処理
   * @returns リフレッシュ結果
   */
  const refreshToken = useCallback(async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      return false;
    }

    try {
      const tokenData = await apiClient.post<TokenResponse>(
        config.api.endpoints.auth.refresh,
        { refresh_token: refreshToken } as RefreshTokenRequest
      );

      // トークンを保存
      saveAccessToken(tokenData.access_token);
      saveRefreshToken(tokenData.refresh_token);

      // APIクライアントに認証トークンを設定
      apiClient.setAuthToken(tokenData.access_token);

      return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // リフレッシュに失敗した場合はログアウト
      logout();
      return false;
    }
  }, [logout]);

  /**
   * ユーザープロフィールを取得
   * @returns ユーザープロフィール
   */
  const fetchUserProfile = useCallback(async (): Promise<UserProfile> => {
    try {
      const user = await apiClient.get<UserProfile>(config.api.endpoints.users.me);
      saveUser(user);
      return user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new Error('ユーザー情報の取得に失敗しました');
    }
  }, []);

  /**
   * パスワードリセットリクエスト
   * @param email メールアドレス
   * @returns リクエスト結果
   */
  const requestPasswordReset = useCallback(async (email: string) => {
    try {
      await apiClient.post(config.api.endpoints.auth.resetPassword, {
        email,
      } as PasswordResetRequest);
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'パスワードリセットリクエストに失敗しました';
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * パスワードリセット確認
   * @param token トークン
   * @param newPassword 新しいパスワード
   * @returns 確認結果
   */
  const confirmPasswordReset = useCallback(async (token: string, newPassword: string) => {
    try {
      await apiClient.post(config.api.endpoints.auth.confirmPassword, {
        token,
        new_password: newPassword,
      } as PasswordResetConfirmRequest);
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'パスワードリセットに失敗しました';
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * 認証状態を初期化
   */
  const initAuth = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    const accessToken = getAccessToken();
    if (!accessToken) {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        error: null,
      });
      return;
    }

    // APIクライアントに認証トークンを設定
    apiClient.setAuthToken(accessToken);

    try {
      // ユーザー情報を取得
      const user = await fetchUserProfile();

      setAuthState({
        isAuthenticated: true,
        isLoading: false,
        user,
        error: null,
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // ユーザー情報の取得に失敗した場合はトークンリフレッシュを試みる
      const refreshed = await refreshToken();
      if (refreshed) {
        try {
          const user = await fetchUserProfile();
          setAuthState({
            isAuthenticated: true,
            isLoading: false,
            user,
            error: null,
          });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          // リフレッシュ後もユーザー情報の取得に失敗した場合はログアウト
          logout();
        }
      } else {
        // リフレッシュに失敗した場合はログアウト
        logout();
      }
    }
  }, [fetchUserProfile, logout, refreshToken]);

  // コンポーネントマウント時に認証状態を初期化
  useEffect(() => {
    initAuth();
  }, [initAuth]);

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