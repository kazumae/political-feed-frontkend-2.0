'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// モック検索結果データ
const mockPoliticians = [
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
];

const mockStatements = [
  {
    id: 1,
    content: '地方創生のためには、デジタル技術の活用が不可欠です。リモートワークの推進により、地方でも都市部と同等の仕事ができる環境を整備していきます。',
    date: '2025年3月15日',
    source: '記者会見',
    politician: {
      id: 101,
      name: '鈴木一郎',
      party: '未来創造党',
    },
    topics: ['地方創生', 'デジタル化', '雇用'],
  },
  {
    id: 2,
    content: '教育の無償化は、すべての子どもたちに平等な機会を提供するために必要な政策です。高等教育までの無償化を段階的に実現していきます。',
    date: '2025年3月10日',
    source: '政党公式サイト',
    politician: {
      id: 102,
      name: '佐藤花子',
      party: '国民連合',
    },
    topics: ['教育', '子育て支援', '格差是正'],
  },
];

const mockParties = [
  {
    id: 1,
    name: '未来創造党',
    seats: 120,
    logo_url: null,
  },
  {
    id: 2,
    name: '国民連合',
    seats: 95,
    logo_url: null,
  },
];

const mockTopics = [
  {
    id: 1,
    name: '経済政策',
    description: '財政政策、金融政策、経済成長戦略などに関する議論',
  },
  {
    id: 2,
    name: '教育改革',
    description: '教育制度、学校教育、高等教育、生涯学習などに関する議論',
  },
];

// 検索結果の型定義
type SearchResultType = 'all' | 'politicians' | 'statements' | 'parties' | 'topics';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [activeTab, setActiveTab] = useState<SearchResultType>('all');
  const [isLoading, setIsLoading] = useState(false);

  // 検索実行
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      
      // APIとの連携は後で実装（現在はモック）
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [query]);

  // 検索結果の件数
  const resultCounts = {
    politicians: mockPoliticians.length,
    statements: mockStatements.length,
    parties: mockParties.length,
    topics: mockTopics.length,
    all: mockPoliticians.length + mockStatements.length + mockParties.length + mockTopics.length,
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 検索ヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">検索結果</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            「{query}」の検索結果: {resultCounts.all}件
          </p>
        </div>

        {/* 検索フォーム */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 mb-6">
          <form action="/search" method="get" className="flex gap-2">
            <div className="relative flex-grow">
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="キーワードを入力..."
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
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-blue-500"
            >
              検索
            </button>
          </form>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <svg
              className="animate-spin h-8 w-8 text-blue-800 dark:text-blue-400"
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
          </div>
        ) : query ? (
          <>
            {/* タブナビゲーション */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
              <nav className="-mb-px flex space-x-8 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'all'
                      ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  すべて ({resultCounts.all})
                </button>
                <button
                  onClick={() => setActiveTab('politicians')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'politicians'
                      ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  政治家 ({resultCounts.politicians})
                </button>
                <button
                  onClick={() => setActiveTab('statements')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'statements'
                      ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  発言 ({resultCounts.statements})
                </button>
                <button
                  onClick={() => setActiveTab('parties')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'parties'
                      ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  政党 ({resultCounts.parties})
                </button>
                <button
                  onClick={() => setActiveTab('topics')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'topics'
                      ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  トピック ({resultCounts.topics})
                </button>
              </nav>
            </div>

            {/* 検索結果 */}
            <div className="space-y-8">
              {/* 政治家の検索結果 */}
              {(activeTab === 'all' || activeTab === 'politicians') && (
                <div>
                  {activeTab === 'all' && (
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">政治家</h2>
                      {resultCounts.politicians > 2 && (
                        <Link
                          href={`/search?q=${query}&type=politicians`}
                          className="text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          すべて表示
                        </Link>
                      )}
                    </div>
                  )}
                  
                  <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {mockPoliticians.map((politician) => (
                        <li key={politician.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750">
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
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* 発言の検索結果 */}
              {(activeTab === 'all' || activeTab === 'statements') && (
                <div>
                  {activeTab === 'all' && (
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">発言</h2>
                      {resultCounts.statements > 2 && (
                        <Link
                          href={`/search?q=${query}&type=statements`}
                          className="text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          すべて表示
                        </Link>
                      )}
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {mockStatements.map((statement) => (
                      <div
                        key={statement.id}
                        className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow"
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
                          <div className="text-gray-500 dark:text-gray-400">
                            {statement.date} • {statement.source}
                          </div>
                          <div className="flex space-x-2">
                            {statement.topics.map((topic, index) => (
                              <Link
                                key={index}
                                href={`/topics/${topic}`}
                                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                              >
                                {topic}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 政党の検索結果 */}
              {(activeTab === 'all' || activeTab === 'parties') && (
                <div>
                  {activeTab === 'all' && (
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">政党</h2>
                      {resultCounts.parties > 2 && (
                        <Link
                          href={`/search?q=${query}&type=parties`}
                          className="text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          すべて表示
                        </Link>
                      )}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockParties.map((party) => (
                      <Link
                        key={party.id}
                        href={`/parties/${party.id}`}
                        className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center">
                          {party.logo_url ? (
                            <img
                              src={party.logo_url}
                              alt={party.name}
                              className="w-12 h-12 mr-4 object-contain"
                            />
                          ) : (
                            <div className="w-12 h-12 mr-4 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                              <span className="text-gray-500 dark:text-gray-400 text-lg font-semibold">
                                {party.name.charAt(0)}
                              </span>
                            </div>
                          )}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {party.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              議席数: {party.seats}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* トピックの検索結果 */}
              {(activeTab === 'all' || activeTab === 'topics') && (
                <div>
                  {activeTab === 'all' && (
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">トピック</h2>
                      {resultCounts.topics > 2 && (
                        <Link
                          href={`/search?q=${query}&type=topics`}
                          className="text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          すべて表示
                        </Link>
                      )}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockTopics.map((topic) => (
                      <Link
                        key={topic.id}
                        href={`/topics/${topic.id}`}
                        className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {topic.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {topic.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8 text-center">
            <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
              検索キーワードを入力してください
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              政治家、発言、政党、政策トピックなどを検索できます
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/politicians"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                政治家一覧
              </Link>
              <Link
                href="/topics"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                トピック一覧
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}