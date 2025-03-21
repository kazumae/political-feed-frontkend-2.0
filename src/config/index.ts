/**
 * 環境ごとの設定を管理するための設定ファイル
 */

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
  // 注: 実際の本番ドメインに置き換える必要があります
  return 'https://api.example.com';
};

// 設定オブジェクト
const config = {
  // APIの設定
  api: {
    baseUrl: getApiBaseUrl(),
    endpoints: {
      // 認証関連
      auth: {
        login: '/api/v1/auth/login',
        register: '/api/v1/auth/register',
        logout: '/api/v1/auth/logout',
        refresh: '/api/v1/auth/refresh',
        resetPassword: '/api/v1/auth/password/reset',
        confirmPassword: '/api/v1/auth/password/confirm',
        verifyEmail: '/api/v1/auth/email/verify',
      },
      // ユーザー関連
      users: {
        me: '/api/v1/users/me',
        password: '/api/v1/users/password',
        list: '/api/v1/users',
        byId: (userId: string) => `/api/v1/users/${userId}`,
        followingPoliticians: '/api/v1/users/me/following/politicians',
        followingTopics: '/api/v1/users/me/following/topics',
        likes: '/api/v1/users/me/likes',
        comments: '/api/v1/users/me/comments',
        history: '/api/v1/users/me/history',
        feed: '/api/v1/users/me/feed',
        notifications: '/api/v1/users/me/notifications',
        markNotificationAsRead: (notificationId: string) => `/api/v1/users/me/notifications/${notificationId}/read`,
        markAllNotificationsAsRead: '/api/v1/users/me/notifications/read-all',
      },
      // 政治家関連
      politicians: {
        list: '/api/v1/politicians/',
        byId: (id: string) => `/api/v1/politicians/${id}`,
        details: (id: string) => `/api/v1/politicians/${id}/details`,
        parties: (id: string) => `/api/v1/politicians/${id}/parties`,
        updateParty: (partyId: string) => `/api/v1/politicians/parties/${partyId}`,
        topics: (politicianId: string) => `/api/v1/politicians/${politicianId}/topics`,
        follow: (politicianId: string) => `/api/v1/politicians/${politicianId}/follow`,
      },
      // トピック関連
      topics: {
        list: '/api/v1/topics/',
        byId: (id: string) => `/api/v1/topics/${id}`,
        follow: (topicId: string) => `/api/v1/topics/${topicId}/follow`,
        parties: (topicId: string) => `/api/v1/topics/${topicId}/parties`,
        trending: '/api/v1/topics/trending',
      },
      // 発言関連
      statements: {
        list: '/api/v1/statements/',
        following: '/api/v1/statements/following',
        byId: (statementId: string) => `/api/v1/statements/${statementId}`,
        byPolitician: (politicianId: string) => `/api/v1/statements/politicians/${politicianId}`,
        byParty: (partyId: string) => `/api/v1/statements/parties/${partyId}`,
        byTopic: (topicId: string) => `/api/v1/statements/topics/${topicId}`,
        like: (statementId: string) => `/api/v1/statements/${statementId}/like`,
      },
      // 政党関連
      parties: {
        list: '/api/v1/parties/',
        byId: (id: string) => `/api/v1/parties/${id}`,
        politicians: (partyId: string) => `/api/v1/parties/${partyId}/politicians`,
        topics: (partyId: string) => `/api/v1/parties/${partyId}/topics`,
      },
      // コメント関連
      comments: {
        byStatement: (statementId: string) => `/api/v1/comments/statements/${statementId}`,
        byId: (commentId: string) => `/api/v1/comments/${commentId}`,
        replies: (commentId: string) => `/api/v1/comments/${commentId}/replies`,
        like: (commentId: string) => `/api/v1/comments/${commentId}/like`,
        report: (commentId: string) => `/api/v1/comments/${commentId}/report`,
      },
      // 検索関連
      search: {
        statements: '/api/v1/search/statements',
        all: '/api/v1/search/all',
      },
      // ヘルスチェック
      health: {
        check: '/api/v1/health',
        version: '/api/v1/version',
      },
    },
  },
};

export default config;