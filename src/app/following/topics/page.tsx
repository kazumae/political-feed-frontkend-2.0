'use client';

import Link from 'next/link';
import { useState } from 'react';

// モックフォロー中トピックデータ
const mockFollowingTopics = [
  {
    id: 1,
    name: '経済政策',
    description: '財政政策、金融政策、経済成長戦略などに関する議論',
    followedAt: '2025年2月20日',
    recentStatements: 12,
    relatedPoliticians: 8,
  },
  {
    id: 2,
    name: '教育改革',
    description: '教育制度、学校教育、高等教育、生涯学習などに関する議論',
    followedAt: '2025年2月15日',
    recentStatements: 8,
    relatedPoliticians: 5,
  },
  {
    id: 3,
    name: '環境問題',
    description: '気候変動対策、再生可能エネルギー、環境保全などに関する議論',
    followedAt: '2025年2月10日',
    recentStatements: 15,
    relatedPoliticians: 6,
  },
  {
    id: 4,
    name: '社会保障',
    description: '年金制度、医療保険、介護保険、生活保護などに関する議論',
    followedAt: '2025年1月25日',
    recentStatements: 7,
    relatedPoliticians: 9,
  },
  {
    id: 5,
    name: '外交安全保障',
    description: '国際関係、安全保障政策、防衛政策などに関する議論',
    followedAt: '2025年1月20日',
    recentStatements: 10,
    relatedPoliticians: 7,
  },
];

export default function FollowingTopicsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'recent' | 'date'>('date');
  const [isUnfollowing, setIsUnfollowing] = useState<number | null>(null);

  // 検索とソート
  const filteredTopics = mockFollowingTopics
    .filter((topic) => 
      topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'recent') {
        return b.recentStatements - a.recentStatements;
      } else {
        // date (default)
        return new Date(b.followedAt).getTime() - new Date(a.followedAt).getTime();
      }
    });

  // フォロー解除処理
  const handleUnfollow = (id: number) => {
    setIsUnfollowing(id);
    
    // APIとの連携は後で実装（現在はモック）
    setTimeout(() => {
      console.log(`トピックID: ${id} のフォローを解除`);
      setIsUnfollowing(null);
      // 実際にはここでデータを更新する
    }, 500);
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">フォロー中のトピック</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            フォローしている政策トピックの一覧と最新情報
          </p>
        </div>

        {/* 検索とソート */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {/* 検索ボックス */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="トピックを検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-800 focus:ring-blue-800 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 dark:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* ソートオプション */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700 dark:text-gray-300">並び替え:</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSortBy('date')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    sortBy === 'date'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  フォロー日
                </button>
                <button
                  onClick={() => setSortBy('name')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    sortBy === 'name'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  名前
                </button>
                <button
                  onClick={() => setSortBy('recent')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    sortBy === 'recent'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  最近の発言
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* トピックリスト */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => (
              <div
                key={topic.id}
                className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link
                        href={`/topics/${topic.id}`}
                        className="text-xl font-semibold text-gray-900 hover:text-blue-800 dark:text-white dark:hover:text-blue-400"
                      >
                        {topic.name}
                      </Link>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {topic.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleUnfollow(topic.id)}
                      disabled={isUnfollowing === topic.id}
                      className="ml-4 inline-flex items-center px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-xs font-medium text-red-600 dark:text-red-400 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                    >
                      {isUnfollowing === topic.id ? (
                        <svg
                          className="animate-spin h-3 w-3 mr-1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                      {isUnfollowing === topic.id ? '処理中' : '解除'}
                    </button>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                      発言 {topic.recentStatements}件
                    </div>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
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
                      政治家 {topic.relatedPoliticians}人
                    </div>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {topic.followedAt}にフォロー
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Link
                      href={`/topics/${topic.id}`}
                      className="inline-flex items-center text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      詳細を見る
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm
                  ? '検索条件に一致するトピックが見つかりませんでした。'
                  : 'フォロー中のトピックはありません。'}
              </p>
              <Link
                href="/topics"
                className="mt-4 inline-flex items-center text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                トピック一覧を見る
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* ナビゲーションリンク */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/following/politicians"
            className="inline-flex items-center text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            フォロー中の政治家を見る
          </Link>
          <Link
            href="/mypage"
            className="inline-flex items-center text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            マイページに戻る
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}