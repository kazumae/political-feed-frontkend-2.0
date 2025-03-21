'use client';

import Link from 'next/link';
import { useState } from 'react';

// 静的なトピックデータ（モック）
const mockTopics = [
  {
    id: 1,
    name: '経済政策',
    icon: '💹',
    description: '経済成長、財政政策、金融政策、雇用対策など、国の経済に関する政策分野。',
    statements_count: 156,
    politicians_count: 48,
    related_topics: ['財政', '雇用', '金融', '中小企業']
  },
  {
    id: 2,
    name: '外交・安全保障',
    icon: '🌐',
    description: '国際関係、同盟関係、安全保障政策、防衛政策など、国の対外関係に関する政策分野。',
    statements_count: 124,
    politicians_count: 35,
    related_topics: ['防衛', '国際協力', '安全保障', '同盟']
  },
  {
    id: 3,
    name: '環境・エネルギー',
    icon: '🌳',
    description: '環境保護、気候変動対策、エネルギー政策、再生可能エネルギーなど、環境とエネルギーに関する政策分野。',
    statements_count: 98,
    politicians_count: 29,
    related_topics: ['再生可能エネルギー', '気候変動', '脱炭素', '原子力']
  },
  {
    id: 4,
    name: '教育・文化',
    icon: '🎓',
    description: '教育制度、学校教育、高等教育、生涯学習、文化振興など、教育と文化に関する政策分野。',
    statements_count: 87,
    politicians_count: 31,
    related_topics: ['学校教育', '高等教育', '教育改革', '文化振興']
  },
  {
    id: 5,
    name: '社会保障',
    icon: '🏥',
    description: '医療保険、年金制度、介護保険、生活保護など、社会保障制度に関する政策分野。',
    statements_count: 76,
    politicians_count: 27,
    related_topics: ['医療', '年金', '介護', '福祉']
  },
  {
    id: 6,
    name: 'デジタル化',
    icon: '💻',
    description: '行政のデジタル化、デジタル社会の実現、IT産業振興、サイバーセキュリティなど、デジタル技術に関する政策分野。',
    statements_count: 68,
    politicians_count: 22,
    related_topics: ['IT', 'DX', 'サイバーセキュリティ', 'デジタル行政']
  },
  {
    id: 7,
    name: '地方創生',
    icon: '🏙️',
    description: '地方活性化、過疎対策、地方分権、地域経済振興など、地方の発展に関する政策分野。',
    statements_count: 62,
    politicians_count: 25,
    related_topics: ['過疎対策', '地方分権', '地域振興', 'まちづくり']
  },
  {
    id: 8,
    name: '子育て・少子化対策',
    icon: '👶',
    description: '少子化対策、子育て支援、保育サービス、児童福祉など、子育てと少子化に関する政策分野。',
    statements_count: 58,
    politicians_count: 24,
    related_topics: ['保育', '児童福祉', '出産支援', '家族政策']
  }
];

// トピックカテゴリー（モック）
const topicCategories = [
  { id: 'all', name: 'すべて' },
  { id: 'economy', name: '経済' },
  { id: 'diplomacy', name: '外交・安全保障' },
  { id: 'social', name: '社会保障・福祉' },
  { id: 'environment', name: '環境・エネルギー' },
  { id: 'education', name: '教育・文化' },
  { id: 'digital', name: 'デジタル・科学技術' },
  { id: 'regional', name: '地方・地域' }
];

export default function TopicsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'statements' | 'politicians'>('statements');
  
  // カテゴリーによるフィルタリング
  const getCategoryTopics = (category: string) => {
    if (category === 'all') return mockTopics;
    
    const categoryMap: Record<string, number[]> = {
      'economy': [1],
      'diplomacy': [2],
      'social': [5, 8],
      'environment': [3],
      'education': [4],
      'digital': [6],
      'regional': [7]
    };
    
    return mockTopics.filter(topic => categoryMap[category]?.includes(topic.id));
  };
  
  // 検索とフィルタリングの適用
  const filteredTopics = getCategoryTopics(selectedCategory)
    .filter(topic => 
      topic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.related_topics.some(rt => rt.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'statements') {
        return b.statements_count - a.statements_count;
      } else {
        return b.politicians_count - a.politicians_count;
      }
    });
  
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">政策トピック一覧</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            政治家の発言を政策分野ごとに整理しています
          </p>
        </div>
        
        {/* カテゴリータブ */}
        <div className="mb-6 overflow-x-auto">
          <div className="inline-flex space-x-1 pb-2">
            {topicCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  selectedCategory === category.id
                    ? 'bg-blue-800 text-white dark:bg-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* 検索・ソート */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 検索ボックス */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                検索
              </label>
              <input
                type="text"
                id="search"
                placeholder="トピック名や説明で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            {/* ソート */}
            <div>
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                並び替え
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'statements' | 'politicians')}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="statements">発言数順</option>
                <option value="politicians">政治家数順</option>
                <option value="name">名前順</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* トピックリスト */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <Link 
              key={topic.id}
              href={`/topics/${topic.id}`}
              className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{topic.icon}</span>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{topic.name}</h2>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {topic.description}
                </p>
                
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10.5h8m-8 5h8m-4-15h4.553a3 3 0 012.936 2.27l1.311 7.312A3 3 0 0117.07 15H6.93a3 3 0 01-2.73-4.263l1.311-7.312A3 3 0 018.446.5h3.105z" />
                    </svg>
                    <span>{topic.statements_count} 発言</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span>{topic.politicians_count} 政治家</span>
                  </div>
                </div>
                
                {/* 関連トピック */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {topic.related_topics.slice(0, 3).map((relatedTopic, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {relatedTopic}
                    </span>
                  ))}
                  {topic.related_topics.length > 3 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                      +{topic.related_topics.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* 結果がない場合 */}
        {filteredTopics.length === 0 && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              条件に一致するトピックが見つかりませんでした。検索条件を変更してください。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}