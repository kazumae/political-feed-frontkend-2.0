'use client';

import Link from 'next/link';
import { useState } from 'react';

// モックフォロー中政治家データ
const mockFollowingPoliticians = [
  {
    id: 101,
    name: '鈴木一郎',
    party: '未来創造党',
    role: '経済政策担当',
    image_url: null,
    followedAt: '2025年2月15日',
    recentStatements: 3,
  },
  {
    id: 102,
    name: '佐藤花子',
    party: '国民連合',
    role: '文部科学大臣',
    image_url: null,
    followedAt: '2025年2月10日',
    recentStatements: 5,
  },
  {
    id: 103,
    name: '田中誠',
    party: '環境保全党',
    role: '環境大臣',
    image_url: null,
    followedAt: '2025年1月25日',
    recentStatements: 2,
  },
  {
    id: 104,
    name: '山田優子',
    party: '国民連合',
    role: '厚生労働大臣',
    image_url: null,
    followedAt: '2025年1月20日',
    recentStatements: 4,
  },
  {
    id: 105,
    name: '伊藤健太',
    party: '自由民主連合',
    role: '外務大臣',
    image_url: null,
    followedAt: '2025年1月15日',
    recentStatements: 6,
  },
];

export default function FollowingPoliticiansPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'recent' | 'date'>('date');
  const [isUnfollowing, setIsUnfollowing] = useState<number | null>(null);

  // 検索とソート
  const filteredPoliticians = mockFollowingPoliticians
    .filter((politician) => 
      politician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      politician.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (politician.role && politician.role.toLowerCase().includes(searchTerm.toLowerCase()))
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
      console.log(`政治家ID: ${id} のフォローを解除`);
      setIsUnfollowing(null);
      // 実際にはここでデータを更新する
    }, 500);
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">フォロー中の政治家</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            フォローしている政治家の一覧と最新情報
          </p>
        </div>

        {/* 検索とソート */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            {/* 検索ボックス */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="政治家を検索..."
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

        {/* 政治家リスト */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          {filteredPoliticians.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPoliticians.map((politician) => (
                <li key={politician.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center">
                      {politician.image_url ? (
                        <img
                          src={politician.image_url}
                          alt={politician.name}
                          className="w-16 h-16 rounded-full mr-4 object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full mr-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-500 dark:text-gray-400 text-xl font-semibold">
                            {politician.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <Link
                          href={`/politicians/${politician.id}`}
                          className="text-xl font-semibold text-gray-900 hover:text-blue-800 dark:text-white dark:hover:text-blue-400"
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
                        <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-500">
                          <span>{politician.followedAt}にフォロー</span>
                          <span className="mx-2">•</span>
                          <span>最近の発言: {politician.recentStatements}件</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 ml-auto">
                      <Link
                        href={`/politicians/${politician.id}`}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        詳細
                      </Link>
                      <button
                        onClick={() => handleUnfollow(politician.id)}
                        disabled={isUnfollowing === politician.id}
                        className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-red-600 dark:text-red-400 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
                      >
                        {isUnfollowing === politician.id ? (
                          <svg
                            className="animate-spin h-4 w-4 mr-1"
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
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"
                            />
                          </svg>
                        )}
                        {isUnfollowing === politician.id ? '処理中...' : 'フォロー解除'}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                {searchTerm
                  ? '検索条件に一致する政治家が見つかりませんでした。'
                  : 'フォロー中の政治家はいません。'}
              </p>
              <Link
                href="/politicians"
                className="mt-4 inline-flex items-center text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                政治家一覧を見る
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
            href="/mypage"
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
            マイページに戻る
          </Link>
          <Link
            href="/following/topics"
            className="inline-flex items-center text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            フォロー中のトピックを見る
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