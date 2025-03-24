'use client';

import Link from 'next/link';
import { useState } from 'react';

// モックユーザーデータ
const mockUser = {
  id: 1,
  name: '山田太郎',
  email: 'yamada@example.com',
  profileImage: null,
  joinedDate: '2025年1月15日',
};

// モックフォロー中政治家データ
const mockFollowingPoliticians = [
  {
    id: 101,
    name: '鈴木一郎',
    party: '未来創造党',
    role: '経済政策担当',
    image_url: null,
  },
  {
    id: 102,
    name: '佐藤花子',
    party: '国民連合',
    role: '文部科学大臣',
    image_url: null,
  },
  {
    id: 103,
    name: '田中誠',
    party: '環境保全党',
    role: '環境大臣',
    image_url: null,
  },
];

// モックフォロー中トピックデータ
const mockFollowingTopics = [
  { id: 1, name: '経済政策' },
  { id: 2, name: '教育改革' },
  { id: 3, name: '環境問題' },
];

// モックいいね発言データ
const mockLikedStatements = [
  {
    id: 1,
    content: '地方創生のためには、デジタル技術の活用が不可欠です。リモートワークの推進により、地方でも都市部と同等の仕事ができる環境を整備していきます。',
    date: '2025年3月15日',
    politician: {
      id: 101,
      name: '鈴木一郎',
      party: '未来創造党',
    },
  },
  {
    id: 3,
    content: '再生可能エネルギーへの転換は待ったなしの課題です。2030年までに電力の50%を再生可能エネルギーにする目標を掲げ、脱炭素社会の実現を目指します。',
    date: '2025年3月8日',
    politician: {
      id: 103,
      name: '田中誠',
      party: '環境保全党',
    },
  },
];

// モックコメントデータ
const mockComments = [
  {
    id: 1,
    content: 'この政策は地方創生に大きく貢献すると思います。特に若者の雇用創出の観点から評価できます。',
    date: '2025年3月18日',
    statement: {
      id: 1,
      content: '地方創生のためには、デジタル技術の活用が不可欠です。リモートワークの推進により、地方でも都市部と同等の仕事ができる環境を整備していきます。',
      politician: {
        id: 101,
        name: '鈴木一郎',
        party: '未来創造党',
      },
    },
  },
  {
    id: 2,
    content: '再生可能エネルギーへの投資は重要ですが、エネルギー安全保障の観点からバランスの取れた政策が必要だと思います。',
    date: '2025年3月10日',
    statement: {
      id: 3,
      content: '再生可能エネルギーへの転換は待ったなしの課題です。2030年までに電力の50%を再生可能エネルギーにする目標を掲げ、脱炭素社会の実現を目指します。',
      politician: {
        id: 103,
        name: '田中誠',
        party: '環境保全党',
      },
    },
  },
];

// タブの型定義
type TabType = 'profile' | 'following-politicians' | 'following-topics' | 'liked-statements' | 'comments';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">マイページ</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            アカウント情報の確認やフォロー中のコンテンツを管理できます
          </p>
        </div>

        {/* ユーザープロフィールカード */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            {mockUser.profileImage ? (
              <img
                src={mockUser.profileImage}
                alt={mockUser.name}
                className="w-24 h-24 rounded-full object-cover mb-4 sm:mb-0 sm:mr-6"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                <span className="text-blue-800 dark:text-blue-200 text-2xl font-semibold">
                  {mockUser.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{mockUser.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{mockUser.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                {mockUser.joinedDate}に登録
              </p>
              <div className="mt-4">
                <Link
                  href="/settings"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  プロフィール編集
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* タブナビゲーション */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              プロフィール
            </button>
            <button
              onClick={() => setActiveTab('following-politicians')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'following-politicians'
                  ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              フォロー中の政治家
            </button>
            <button
              onClick={() => setActiveTab('following-topics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'following-topics'
                  ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              フォロー中のトピック
            </button>
            <button
              onClick={() => setActiveTab('liked-statements')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'liked-statements'
                  ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              いいねした発言
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'comments'
                  ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              コメント履歴
            </button>
          </nav>
        </div>

        {/* タブコンテンツ */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
          {/* プロフィールタブ */}
          {activeTab === 'profile' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">アカウント情報</h3>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">ユーザー名</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{mockUser.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">メールアドレス</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{mockUser.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">登録日</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{mockUser.joinedDate}</dd>
                </div>
              </dl>
              <div className="mt-6">
                <Link
                  href="/settings"
                  className="text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  アカウント設定を変更する →
                </Link>
              </div>
            </div>
          )}

          {/* フォロー中の政治家タブ */}
          {activeTab === 'following-politicians' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">フォロー中の政治家</h3>
              {mockFollowingPoliticians.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {mockFollowingPoliticians.map((politician) => (
                    <li key={politician.id} className="py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        {politician.image_url ? (
                          <img
                            src={politician.image_url}
                            alt={politician.name}
                            className="w-12 h-12 rounded-full mr-4 object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full mr-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-500 dark:text-gray-400 text-lg font-semibold">
                              {politician.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <Link
                            href={`/politicians/${politician.id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-blue-800 dark:text-white dark:hover:text-blue-400"
                          >
                            {politician.name}
                          </Link>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            <Link
                              href={`/parties/${politician.party}`}
                              className="hover:text-blue-800 dark:hover:text-blue-400"
                            >
                              {politician.party}
                            </Link>
                            {politician.role && (
                              <>
                                <span className="mx-2">•</span>
                                <span>{politician.role}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <button className="ml-4 text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                        フォロー解除
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">フォロー中の政治家はいません。</p>
              )}
              <div className="mt-6">
                <Link
                  href="/politicians"
                  className="text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  政治家一覧を見る →
                </Link>
              </div>
            </div>
          )}

          {/* フォロー中のトピックタブ */}
          {activeTab === 'following-topics' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">フォロー中のトピック</h3>
              {mockFollowingTopics.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {mockFollowingTopics.map((topic) => (
                    <div
                      key={topic.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex justify-between items-center"
                    >
                      <Link
                        href={`/topics/${topic.id}`}
                        className="text-gray-900 dark:text-white hover:text-blue-800 dark:hover:text-blue-400 font-medium"
                      >
                        {topic.name}
                      </Link>
                      <button className="text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                        解除
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">フォロー中のトピックはありません。</p>
              )}
              <div className="mt-6">
                <Link
                  href="/topics"
                  className="text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  トピック一覧を見る →
                </Link>
              </div>
            </div>
          )}

          {/* いいねした発言タブ */}
          {activeTab === 'liked-statements' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">いいねした発言</h3>
              {mockLikedStatements.length > 0 ? (
                <div className="space-y-6">
                  {mockLikedStatements.map((statement) => (
                    <div
                      key={statement.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-750"
                    >
                      <div className="flex items-center mb-2">
                        <Link
                          href={`/politicians/${statement.politician.id}`}
                          className="font-medium text-gray-900 dark:text-white hover:text-blue-800 dark:hover:text-blue-400"
                        >
                          {statement.politician.name}
                        </Link>
                        <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                        <Link
                          href={`/parties/${statement.politician.party}`}
                          className="text-gray-600 dark:text-gray-400 hover:text-blue-800 dark:hover:text-blue-400"
                        >
                          {statement.politician.party}
                        </Link>
                      </div>
                      <Link href={`/statements/${statement.id}`}>
                        <p className="text-gray-800 dark:text-gray-200 mb-2">{statement.content}</p>
                      </Link>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{statement.date}</span>
                        <button className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300">
                          いいね解除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">いいねした発言はありません。</p>
              )}
            </div>
          )}

          {/* コメント履歴タブ */}
          {activeTab === 'comments' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">コメント履歴</h3>
              {mockComments.length > 0 ? (
                <div className="space-y-6">
                  {mockComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-750"
                    >
                      <div className="mb-3">
                        <p className="text-gray-800 dark:text-gray-200 mb-2">{comment.content}</p>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {comment.date}に投稿
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                        <div className="flex items-center mb-2">
                          <Link
                            href={`/politicians/${comment.statement.politician.id}`}
                            className="font-medium text-gray-900 dark:text-white hover:text-blue-800 dark:hover:text-blue-400"
                          >
                            {comment.statement.politician.name}
                          </Link>
                          <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                          <Link
                            href={`/parties/${comment.statement.politician.party}`}
                            className="text-gray-600 dark:text-gray-400 hover:text-blue-800 dark:hover:text-blue-400"
                          >
                            {comment.statement.politician.party}
                          </Link>
                        </div>
                        <Link href={`/statements/${comment.statement.id}`}>
                          <p className="text-gray-700 dark:text-gray-300 text-sm">{comment.statement.content}</p>
                        </Link>
                      </div>
                      <div className="mt-3 flex justify-end space-x-3">
                        <button className="text-sm text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                          編集
                        </button>
                        <button className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                          削除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">コメント履歴はありません。</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}