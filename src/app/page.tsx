'use client';

import Link from 'next/link';
import { useState } from 'react';

// 静的な発言データ（モック）
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
      role: '経済政策担当',
      image_url: null
    },
    topics: ['地方創生', 'デジタル化', '雇用']
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
      role: '文部科学大臣',
      image_url: null
    },
    topics: ['教育', '子育て支援', '格差是正']
  },
  {
    id: 3,
    content: '再生可能エネルギーへの転換は待ったなしの課題です。2030年までに電力の50%を再生可能エネルギーにする目標を掲げ、脱炭素社会の実現を目指します。',
    date: '2025年3月8日',
    source: 'テレビ討論番組',
    politician: {
      id: 103,
      name: '田中誠',
      party: '環境保全党',
      role: '環境大臣',
      image_url: null
    },
    topics: ['環境', 'エネルギー政策', '気候変動']
  },
  {
    id: 4,
    content: '少子高齢化対策として、子育て世代への支援を強化します。保育所の増設、育児休業制度の拡充、児童手当の増額など、総合的な対策を講じていきます。',
    date: '2025年3月5日',
    source: '国会答弁',
    politician: {
      id: 104,
      name: '山田優子',
      party: '国民連合',
      role: '厚生労働大臣',
      image_url: null
    },
    topics: ['少子化対策', '子育て支援', '社会保障']
  },
  {
    id: 5,
    content: '国際情勢が不安定化する中、外交・安全保障政策の見直しが必要です。同盟国との連携を強化しつつ、自主防衛能力の向上を図ります。',
    date: '2025年3月1日',
    source: '党大会演説',
    politician: {
      id: 105,
      name: '伊藤健太',
      party: '自由民主連合',
      role: '外務大臣',
      image_url: null
    },
    topics: ['外交', '安全保障', '防衛']
  }
];

// トレンドトピック（モック）
const trendTopics = [
  { id: 1, name: '経済政策', count: 156 },
  { id: 2, name: '教育改革', count: 124 },
  { id: 3, name: '環境問題', count: 98 },
  { id: 4, name: '社会保障', count: 87 },
  { id: 5, name: '外交安全保障', count: 76 }
];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">政治家発言フィード</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            政治家の発言をリアルタイムで確認できます
          </p>
        </div>
        
        {/* フィルターとトレンドトピック */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          {/* フィルター */}
          <div className="w-full md:w-3/4">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">フィルター</h2>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === 'all'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  すべて
                </button>
                <button
                  onClick={() => setActiveFilter('economy')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === 'economy'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  経済
                </button>
                <button
                  onClick={() => setActiveFilter('education')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === 'education'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  教育
                </button>
                <button
                  onClick={() => setActiveFilter('environment')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === 'environment'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  環境
                </button>
                <button
                  onClick={() => setActiveFilter('welfare')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === 'welfare'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  福祉
                </button>
                <button
                  onClick={() => setActiveFilter('diplomacy')}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === 'diplomacy'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  外交
                </button>
              </div>
            </div>
          </div>
          
          {/* トレンドトピック */}
          <div className="w-full md:w-1/4">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">トレンドトピック</h2>
              <ul className="space-y-2">
                {trendTopics.map((topic) => (
                  <li key={topic.id} className="flex justify-between items-center">
                    <Link
                      href={`/topics/${topic.id}`}
                      className="text-sm text-blue-800 hover:underline dark:text-blue-400"
                    >
                      {topic.name}
                    </Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{topic.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* 発言フィード */}
        <div className="space-y-6">
          {mockStatements.map((statement) => (
            <div
              key={statement.id}
              className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              {/* 政治家情報 */}
              <div className="flex items-center mb-4">
                {statement.politician.image_url ? (
                  <img
                    src={statement.politician.image_url}
                    alt={statement.politician.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full mr-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400 text-lg font-semibold">
                      {statement.politician.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <Link
                    href={`/politicians/${statement.politician.id}`}
                    className="text-lg font-semibold text-gray-900 hover:text-blue-800 dark:text-white dark:hover:text-blue-400"
                  >
                    {statement.politician.name}
                  </Link>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Link
                      href={`/parties/${statement.politician.party}`}
                      className="hover:text-blue-800 dark:hover:text-blue-400"
                    >
                      {statement.politician.party}
                    </Link>
                    {statement.politician.role && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{statement.politician.role}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {/* 発言内容 */}
              <div className="mb-4">
                <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
                  {statement.content}
                </p>
              </div>
              
              {/* メタ情報 */}
              <div className="flex flex-wrap items-center justify-between text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <span>{statement.date}</span>
                  <span className="mx-2">•</span>
                  <span>{statement.source}</span>
                </div>
                
                <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                  <button className="flex items-center text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>いいね</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>コメント</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>シェア</span>
                  </button>
                </div>
              </div>
              
              {/* トピックタグ */}
              <div className="mt-4 flex flex-wrap gap-2">
                {statement.topics.map((topic, index) => (
                  <Link
                    key={index}
                    href={`/topics/${topic}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  >
                    {topic}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* ページネーション */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700">
              前へ
            </button>
            <button className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-800 dark:bg-blue-700">
              1
            </button>
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              2
            </button>
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              3
            </button>
            <span className="px-3 py-2 text-gray-500 dark:text-gray-400">...</span>
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              10
            </button>
            <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              次へ
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
