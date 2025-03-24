'use client';

import { useState } from 'react';
import Link from 'next/link';

// モックユーザーデータ
const mockUser = {
  id: 1,
  name: '山田太郎',
  email: 'yamada@example.com',
  profileImage: null,
};

export default function SettingsPage() {
  // プロフィール設定
  const [name, setName] = useState(mockUser.name);
  const [email, setEmail] = useState(mockUser.email);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(mockUser.profileImage);

  // パスワード設定
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 通知設定
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [followNotifications, setFollowNotifications] = useState(true);
  const [commentNotifications, setCommentNotifications] = useState(true);
  const [likeNotifications, setLikeNotifications] = useState(false);

  // アカウント削除
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  // 状態管理
  const [activeTab, setActiveTab] = useState<'profile' | 'password' | 'notifications' | 'account'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // プロフィール画像のハンドリング
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      
      // プレビュー用のURL生成
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setProfilePreview(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // プロフィール更新
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // APIとの連携は後で実装（現在はモック）
    setTimeout(() => {
      console.log('プロフィール更新:', { name, email, profileImage });
      setIsLoading(false);
      setSuccessMessage('プロフィールが更新されました');
    }, 1000);
  };

  // パスワード更新
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setErrorMessage('新しいパスワードと確認用パスワードが一致しません');
      return;
    }
    
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // APIとの連携は後で実装（現在はモック）
    setTimeout(() => {
      console.log('パスワード更新:', { currentPassword, newPassword });
      setIsLoading(false);
      setSuccessMessage('パスワードが更新されました');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1000);
  };

  // 通知設定更新
  const handleNotificationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // APIとの連携は後で実装（現在はモック）
    setTimeout(() => {
      console.log('通知設定更新:', { 
        emailNotifications, 
        followNotifications, 
        commentNotifications, 
        likeNotifications 
      });
      setIsLoading(false);
      setSuccessMessage('通知設定が更新されました');
    }, 1000);
  };

  // アカウント削除
  const handleAccountDelete = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (deleteConfirmation !== mockUser.email) {
      setErrorMessage('メールアドレスが一致しません');
      return;
    }
    
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // APIとの連携は後で実装（現在はモック）
    setTimeout(() => {
      console.log('アカウント削除');
      setIsLoading(false);
      // 削除成功後はログアウトしてホームページにリダイレクト
      window.location.href = '/';
    }, 1000);
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">アカウント設定</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            アカウント情報や通知設定を管理できます
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* サイドナビゲーション */}
          <div className="w-full md:w-1/4">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'profile'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-200'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`mr-3 h-5 w-5 ${
                    activeTab === 'profile'
                      ? 'text-blue-800 dark:text-blue-200'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                プロフィール設定
              </button>

              <button
                onClick={() => setActiveTab('password')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'password'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-200'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`mr-3 h-5 w-5 ${
                    activeTab === 'password'
                      ? 'text-blue-800 dark:text-blue-200'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                パスワード変更
              </button>

              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'notifications'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-200'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`mr-3 h-5 w-5 ${
                    activeTab === 'notifications'
                      ? 'text-blue-800 dark:text-blue-200'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                通知設定
              </button>

              <button
                onClick={() => setActiveTab('account')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'account'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-blue-200'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`mr-3 h-5 w-5 ${
                    activeTab === 'account'
                      ? 'text-blue-800 dark:text-blue-200'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                アカウント管理
              </button>
            </nav>

            <div className="mt-8">
              <Link
                href="/mypage"
                className="text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                ← マイページに戻る
              </Link>
            </div>
          </div>

          {/* メインコンテンツ */}
          <div className="w-full md:w-3/4">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
              {/* 成功メッセージ */}
              {successMessage && (
                <div className="mb-4 bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-4">
                  <p className="text-sm text-green-700 dark:text-green-400">{successMessage}</p>
                </div>
              )}

              {/* エラーメッセージ */}
              {errorMessage && (
                <div className="mb-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4">
                  <p className="text-sm text-red-700 dark:text-red-400">{errorMessage}</p>
                </div>
              )}

              {/* プロフィール設定 */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">プロフィール設定</h2>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    {/* プロフィール画像 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        プロフィール画像
                      </label>
                      <div className="flex items-center">
                        {profilePreview ? (
                          <img
                            src={profilePreview}
                            alt="プロフィール"
                            className="w-20 h-20 rounded-full object-cover mr-4"
                          />
                        ) : (
                          <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                            <span className="text-blue-800 dark:text-blue-200 text-xl font-semibold">
                              {name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <label
                            htmlFor="profile-image"
                            className="cursor-pointer bg-white dark:bg-gray-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            画像を選択
                            <input
                              id="profile-image"
                              name="profile-image"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleImageChange}
                            />
                          </label>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            JPG, PNG, GIF形式、最大2MB
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ユーザー名 */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        ユーザー名
                      </label>
                      <div className="mt-1">
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* メールアドレス */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        メールアドレス
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* 送信ボタン */}
                    <div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-500"
                      >
                        {isLoading ? '更新中...' : '変更を保存'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* パスワード変更 */}
              {activeTab === 'password' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">パスワード変更</h2>
                  <form onSubmit={handlePasswordUpdate} className="space-y-6">
                    {/* 現在のパスワード */}
                    <div>
                      <label
                        htmlFor="current-password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        現在のパスワード
                      </label>
                      <div className="mt-1">
                        <input
                          id="current-password"
                          name="current-password"
                          type="password"
                          required
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* 新しいパスワード */}
                    <div>
                      <label
                        htmlFor="new-password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        新しいパスワード
                      </label>
                      <div className="mt-1">
                        <input
                          id="new-password"
                          name="new-password"
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        8文字以上で、英字・数字を含めてください
                      </p>
                    </div>

                    {/* パスワード確認 */}
                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        新しいパスワード（確認）
                      </label>
                      <div className="mt-1">
                        <input
                          id="confirm-password"
                          name="confirm-password"
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* 送信ボタン */}
                    <div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-500"
                      >
                        {isLoading ? '更新中...' : 'パスワードを変更'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* 通知設定 */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">通知設定</h2>
                  <form onSubmit={handleNotificationUpdate} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="email-notifications"
                            name="email-notifications"
                            type="checkbox"
                            checked={emailNotifications}
                            onChange={(e) => setEmailNotifications(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-800 focus:ring-blue-800 dark:border-gray-700 dark:bg-gray-700 dark:focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="email-notifications"
                            className="font-medium text-gray-700 dark:text-gray-300"
                          >
                            メール通知を受け取る
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            重要な更新やアクティビティについてメールで通知を受け取ります
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="follow-notifications"
                            name="follow-notifications"
                            type="checkbox"
                            checked={followNotifications}
                            onChange={(e) => setFollowNotifications(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-800 focus:ring-blue-800 dark:border-gray-700 dark:bg-gray-700 dark:focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="follow-notifications"
                            className="font-medium text-gray-700 dark:text-gray-300"
                          >
                            フォロー通知
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            フォローしている政治家や政策トピックの更新を通知します
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="comment-notifications"
                            name="comment-notifications"
                            type="checkbox"
                            checked={commentNotifications}
                            onChange={(e) => setCommentNotifications(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-800 focus:ring-blue-800 dark:border-gray-700 dark:bg-gray-700 dark:focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="comment-notifications"
                            className="font-medium text-gray-700 dark:text-gray-300"
                          >
                            コメント通知
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            あなたのコメントへの返信や関連するコメントを通知します
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="like-notifications"
                            name="like-notifications"
                            type="checkbox"
                            checked={likeNotifications}
                            onChange={(e) => setLikeNotifications(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-800 focus:ring-blue-800 dark:border-gray-700 dark:bg-gray-700 dark:focus:ring-blue-500"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            htmlFor="like-notifications"
                            className="font-medium text-gray-700 dark:text-gray-300"
                          >
                            いいね通知
                          </label>
                          <p className="text-gray-500 dark:text-gray-400">
                            あなたのコメントがいいねされた時に通知します
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 送信ボタン */}
                    <div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-500"
                      >
                        {isLoading ? '更新中...' : '設定を保存'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* アカウント管理 */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">アカウント管理</h2>
                  
                  <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-400 dark:text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-400">
                          アカウント削除の注意
                        </h3>
                        <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                          <p>
                            アカウントを削除すると、すべてのデータが完全に削除され、復元できなくなります。
                            フォロー、いいね、コメントなどのすべての情報が失われます。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleAccountDelete} className="space-y-6">
                    <div>
                      <label
                        htmlFor="delete-confirmation"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        確認のため、メールアドレスを入力してください
                      </label>
                      <div className="mt-1">
                        <input
                          id="delete-confirmation"
                          name="delete-confirmation"
                          type="email"
                          required
                          value={deleteConfirmation}
                          onChange={(e) => setDeleteConfirmation(e.target.value)}
                          placeholder={mockUser.email}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? '処理中...' : 'アカウントを削除する'}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}