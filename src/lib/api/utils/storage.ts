/**
 * ローカルストレージ関連のユーティリティ関数
 */

// ストレージキー
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'political_feed_access_token',
  REFRESH_TOKEN: 'political_feed_refresh_token',
  USER: 'political_feed_user',
};

/**
 * アクセストークンを保存
 * @param token アクセストークン
 */
export const saveAccessToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }
};

/**
 * アクセストークンを取得
 * @returns アクセストークン
 */
export const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }
  return null;
};

/**
 * リフレッシュトークンを保存
 * @param token リフレッシュトークン
 */
export const saveRefreshToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }
};

/**
 * リフレッシュトークンを取得
 * @returns リフレッシュトークン
 */
export const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }
  return null;
};

/**
 * ユーザー情報を保存
 * @param user ユーザー情報
 */
export const saveUser = (user: unknown): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }
};

/**
 * ユーザー情報を取得
 * @returns ユーザー情報
 */
export const getUser = <T>(): T | null => {
  if (typeof window !== 'undefined') {
    const userJson = localStorage.getItem(STORAGE_KEYS.USER);
    if (userJson) {
      try {
        return JSON.parse(userJson) as T;
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
      }
    }
  }
  return null;
};

/**
 * 認証情報をクリア
 */
export const clearAuthStorage = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};