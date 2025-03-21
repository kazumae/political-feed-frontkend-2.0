'use client';

import Link from 'next/link';
import { useState } from 'react';

// 静的な政治家データ（モック）
const mockPoliticians = [
  {
    id: 101,
    name: '鈴木一郎',
    party: '未来創造党',
    role: '経済政策担当',
    image_url: null,
    profile_summary: '元経済学者。デジタル経済と地方創生を専門とし、新しい経済政策を提唱している。',
    followers_count: 12500,
    statements_count: 342
  },
  {
    id: 102,
    name: '佐藤花子',
    party: '国民連合',
    role: '文部科学大臣',
    image_url: null,
    profile_summary: '元教育委員会委員長。教育改革と子育て支援に力を入れている。',
    followers_count: 9800,
    statements_count: 287
  },
  {
    id: 103,
    name: '田中誠',
    party: '環境保全党',
    role: '環境大臣',
    image_url: null,
    profile_summary: '環境活動家出身。再生可能エネルギーの推進と環境保護政策を主導。',
    followers_count: 8700,
    statements_count: 256
  },
  {
    id: 104,
    name: '山田優子',
    party: '国民連合',
    role: '厚生労働大臣',
    image_url: null,
    profile_summary: '医師出身。医療制度改革と社会保障の充実に取り組んでいる。',
    followers_count: 10200,
    statements_count: 312
  },
  {
    id: 105,
    name: '伊藤健太',
    party: '自由民主連合',
    role: '外務大臣',
    image_url: null,
    profile_summary: '元外交官。国際関係の専門家として外交・安全保障政策を担当。',
    followers_count: 11500,
    statements_count: 298
  },
  {
    id: 106,
    name: '渡辺隆',
    party: '自由民主連合',
    role: '財務大臣',
    image_url: null,
    profile_summary: '元銀行員。財政再建と経済成長の両立を目指す政策を推進。',
    followers_count: 9300,
    statements_count: 276
  },
  {
    id: 107,
    name: '小林美咲',
    party: '社会民主党',
    role: '内閣府特命担当大臣（男女共同参画）',
    image_url: null,
    profile_summary: '女性活躍推進と多様性の確保に取り組む。ワークライフバランス政策を主導。',
    followers_count: 8900,
    statements_count: 245
  },
  {
    id: 108,
    name: '中村大輔',
    party: '未来創造党',
    role: 'デジタル大臣',
    image_url: null,
    profile_summary: 'IT企業出身。デジタル社会の実現とテクノロジー政策を担当。',
    followers_count: 13200,
    statements_count: 321
  }
];

// 政党一覧（モック）
const parties = [
  '未来創造党',
  '国民連合',
  '環境保全党',
  '自由民主連合',
  '社会民主党'
];

export default function PoliticiansPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParty, setSelectedParty] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'followers' | 'statements'>('name');
  
  // 検索とフィルタリングの適用
  const filteredPoliticians = mockPoliticians
    .filter(politician => 
      politician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      politician.role.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(politician => 
      selectedParty ? politician.party === selectedParty : true
    )
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'followers') {
        return b.followers_count - a.followers_count;
      } else {
        return b.statements_count - a.statements_count;
      }
    });
  
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">政治家一覧</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            日本の主要政治家の情報を確認できます
          </p>
        </div>
        
        {/* 検索・フィルター */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 検索ボックス */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                検索
              </label>
              <input
                type="text"
                id="search"
                placeholder="名前や役職で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            {/* 政党フィルター */}
            <div>
              <label htmlFor="party-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                政党
              </label>
              <select
                id="party-filter"
                value={selectedParty || ''}
                onChange={(e) => setSelectedParty(e.target.value || null)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">すべての政党</option>
                {parties.map((party) => (
                  <option key={party} value={party}>{party}</option>
                ))}
              </select>
            </div>
            
            {/* ソート */}
            <div>
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                並び替え
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'followers' | 'statements')}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="name">名前順</option>
                <option value="followers">フォロワー数順</option>
                <option value="statements">発言数順</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* 政治家リスト */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoliticians.map((politician) => (
            <div 
              key={politician.id}
              className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
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
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
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
                
                {politician.profile_summary && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {politician.profile_summary}
                  </p>
                )}
                
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <span>{politician.followers_count.toLocaleString()} フォロワー</span>
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10.5h8m-8 5h8m-4-15h4.553a3 3 0 012.936 2.27l1.311 7.312A3 3 0 0117.07 15H6.93a3 3 0 01-2.73-4.263l1.311-7.312A3 3 0 018.446.5h3.105z" />
                    </svg>
                    <span>{politician.statements_count.toLocaleString()} 発言</span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Link 
                    href={`/politicians/${politician.id}`}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    詳細を見る
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 結果がない場合 */}
        {filteredPoliticians.length === 0 && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              条件に一致する政治家が見つかりませんでした。検索条件を変更してください。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}