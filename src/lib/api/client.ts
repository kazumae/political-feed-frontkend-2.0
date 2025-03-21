import config from '@/config';

// レスポンスのエラーを表すインターフェース
export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
}

// APIクライアントのオプション
export interface ApiClientOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
  timeout?: number;
}

// APIクライアントのデフォルトオプション
const defaultOptions: ApiClientOptions = {
  baseUrl: config.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30秒
};

/**
 * APIクライアント
 * RESTful APIとの通信を担当するクラス
 */
class ApiClient {
  private options: ApiClientOptions;

  constructor(options: ApiClientOptions = {}) {
    this.options = { ...defaultOptions, ...options };
  }

  /**
   * 認証トークンをヘッダーに設定
   * @param token アクセストークン
   */
  setAuthToken(token: string | null): void {
    if (token) {
      this.options.headers = {
        ...this.options.headers,
        Authorization: `Bearer ${token}`,
      };
    } else {
      // トークンがnullの場合は認証ヘッダーを削除
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { Authorization, ...restHeaders } = this.options.headers || {};
      this.options.headers = restHeaders;
      this.options.headers = restHeaders;
    }
  }

  /**
   * リクエストURLを生成
   * @param endpoint エンドポイント
   * @returns 完全なURL
   */
  private getUrl(endpoint: string): string {
    const baseUrl = this.options.baseUrl?.replace(/\/$/, '');
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseUrl}${path}`;
  }

  /**
   * リクエストを送信
   * @param method HTTPメソッド
   * @param endpoint エンドポイント
   * @param data リクエストデータ
   * @param customHeaders カスタムヘッダー
   * @returns レスポンス
   */
  private async request<T>(
    method: string,
    endpoint: string,
    data?: unknown,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    const url = this.getUrl(endpoint);
    const headers = { ...this.options.headers, ...customHeaders };

    const config: RequestInit = {
      method,
      headers,
      credentials: 'include', // クッキーを含める
    };

    // GETリクエスト以外でデータがある場合はボディに設定
    if (method !== 'GET' && data) {
      config.body = JSON.stringify(data);
    }

    try {
      // URLSearchParamsを使用してGETリクエストのクエリパラメータを設定
      let finalUrl = url;
      if (method === 'GET' && data) {
        const params = new URLSearchParams();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, String(value));
          }
        });
        const queryString = params.toString();
        finalUrl = queryString ? `${url}?${queryString}` : url;
      }

      // タイムアウト処理
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error(`Request timeout after ${this.options.timeout}ms`));
        }, this.options.timeout);
      });

      // フェッチリクエスト
      const fetchPromise = fetch(finalUrl, config);
      const response = await Promise.race([fetchPromise, timeoutPromise]) as Response;

      // レスポンスのステータスコードをチェック
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const error: ApiError = {
          status: response.status,
          message: errorData.detail || response.statusText,
          errors: errorData.errors,
        };
        throw error;
      }

      // 204 No Contentの場合は空のオブジェクトを返す
      if (response.status === 204) {
        return {} as T;
      }

      // JSONレスポンスをパース
      const result = await response.json();
      return result as T;
    } catch (error) {
      if ((error as ApiError).status) {
        throw error;
      }
      // ネットワークエラーなどの場合
      throw {
        status: 0,
        message: (error as Error).message || 'Network error',
      } as ApiError;
    }
  }

  /**
   * GETリクエスト
   * @param endpoint エンドポイント
   * @param params クエリパラメータ
   * @param headers カスタムヘッダー
   * @returns レスポンス
   */
  async get<T>(
    endpoint: string,
    params?: Record<string, unknown>,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>('GET', endpoint, params, headers);
  }

  /**
   * POSTリクエスト
   * @param endpoint エンドポイント
   * @param data リクエストデータ
   * @param headers カスタムヘッダー
   * @returns レスポンス
   */
  async post<T>(
    endpoint: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>('POST', endpoint, data, headers);
  }

  /**
   * PUTリクエスト
   * @param endpoint エンドポイント
   * @param data リクエストデータ
   * @param headers カスタムヘッダー
   * @returns レスポンス
   */
  async put<T>(
    endpoint: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>('PUT', endpoint, data, headers);
  }

  /**
   * DELETEリクエスト
   * @param endpoint エンドポイント
   * @param data リクエストデータ
   * @param headers カスタムヘッダー
   * @returns レスポンス
   */
  async delete<T>(
    endpoint: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>('DELETE', endpoint, data, headers);
  }

  /**
   * PATCHリクエスト
   * @param endpoint エンドポイント
   * @param data リクエストデータ
   * @param headers カスタムヘッダー
   * @returns レスポンス
   */
  async patch<T>(
    endpoint: string,
    data?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>('PATCH', endpoint, data, headers);
  }
}

// シングルトンインスタンスを作成
const apiClient = new ApiClient();

export default apiClient;