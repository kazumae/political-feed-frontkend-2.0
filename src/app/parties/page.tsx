'use client';

import Link from 'next/link';
import { useState } from 'react';

// 静的な政党データ（モック）
const mockParties = [
  {
    id: 1,
    name: '未来創造党',
    logo_url: null,
    color: '#1E40AF', // 青
    founded_year: 2018,
    ideology: '中道革新',
    description: 'デジタル技術の活用と地方創生を重視する政党。経済成長と環境保護の両立を目指す。',
    seats_count: 120,
    members_count: 142,
    leader: {
      id: 108,
      name: '中村大輔'
    }
  },
  {
    id: 2,
    name: '国民連合',
    logo_url: null,
    color: '#DC2626', // 赤
    founded_year: 2012,
    ideology: '中道左派',
    description: '教育と社会保障の充実を重視する政党。格差是正と子育て支援に力を入れている。',
    seats_count: 95,
    members_count: 110,
    leader: {
      id: 102,
      name: '佐藤花子'
    }
  },
  {
    id: 3,
    name: '環境保全党',
    logo_url: null,
    color: '#059669', // 緑
    founded_year: 2010,
    ideology: '環境保護',
    description: '環境問題と持続可能な社会の実現を最優先する政党。再生可能エネルギーの推進を主張。',
    seats_count: 25,
    members_count: 32,
    leader: {
      id: 103,
      name: '田中誠'
    }
  },
  {
    id: 4,
    name: '自由民主連合',
    logo_url: null,
    color: '#7C3AED', // 紫
    founded_year: 1998,
    ideology: '中道右派',
    description: '伝統的価値観と経済的自由を重視する政党。安全保障と財政規律を重視している。',
    seats_count: 105,
    members_count: 118,
    leader: {
      id: 105,
      name: '伊藤健太'
    }
  },
  {
    id: 5,
    name: '社会民主党',
    logo_url: null,
    color: '#F59E0B', // オレンジ
    founded_year: 1996,
    ideology: '社会民主主義',
    description: '労働者の権利と社会的公正を重視する政党。福祉の充実と格差是正を主張。',
    seats_count: 35,
    members_count: 42,
    leader: {
      id: 107,
      name: '小林美咲'
    }
  }
];

// 政策分野（モック）
const policyAreas = [
  '経済', '外交', '安全保障', '環境', '教育', '社会保障', 'デジタル', '地方創生'
];

export default function PartiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIdeology, setSelectedIdeology] = useState<string | null>(null);
  
  // 検索とフィルタリングの適用
  const filteredParties = mockParties
    .filter(party => 
      party.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      party.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(party => 
      selectedIdeology ? party.ideology === selectedIdeology : true
    );
  
  // 政党のイデオロギー一覧を取得
  const ideologies = Array.from(new Set(mockParties.map(party => party.ideology)));
  
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">政党一覧</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            日本の主要政党の情報を確認できます
          </p>
        </div>
        
        {/* 検索・フィルター */}
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
                placeholder="政党名や説明で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            
            {/* イデオロギーフィルター */}
            <div>
              <label htmlFor="ideology-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                イデオロギー
              </label>
              <select
                id="ideology-filter"
                value={selectedIdeology || ''}
                onChange={(e) => setSelectedIdeology(e.target.value || null)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value="">すべてのイデオロギー</option>
                {ideologies.map((ideology) => (
                  <option key={ideology} value={ideology}>{ideology}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        {/* 政党リスト */}
        <div className="space-y-8">
          {filteredParties.map((party) => (
            <div 
              key={party.id}
              className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center">
                  {/* 政党ロゴ */}
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                    {party.logo_url ? (
                      <img 
                        src={party.logo_url} 
                        alt={party.name} 
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <div 
                        className="w-16 h-16 rounded-md flex items-center justify-center text-white text-xl font-bold"
                        style={{ backgroundColor: party.color }}
                      >
                        {party.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  
                  {/* 政党基本情報 */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <Link 
                          href={`/parties/${party.id}`}
                          className="text-xl font-semibold text-gray-900 hover:text-blue-800 dark:text-white dark:hover:text-blue-400"
                        >
                          {party.name}
                        </Link>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <span>{party.ideology}</span>
                          <span className="mx-2">•</span>
                          <span>設立: {party.founded_year}年</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 md:mt-0 flex space-x-4">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>{party.seats_count} 議席</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                          <span>{party.members_count} 議員</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="mt-3 text-gray-600 dark:text-gray-300">
                      {party.description}
                    </p>
                    
                    <div className="mt-4 flex flex-wrap items-center">
                      <div className="mr-4 mb-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">党首:</span>{' '}
                        <Link 
                          href={`/politicians/${party.leader.id}`}
                          className="text-blue-800 hover:underline dark:text-blue-400"
                        >
                          {party.leader.name}
                        </Link>
                      </div>
                      
                      <div className="flex-1 flex flex-wrap gap-2 mb-2">
                        {policyAreas.slice(0, 4).map((area) => (
                          <span 
                            key={area}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                      
                      <Link 
                        href={`/parties/${party.id}`}
                        className="text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        詳細を見る →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 結果がない場合 */}
        {filteredParties.length === 0 && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              条件に一致する政党が見つかりませんでした。検索条件を変更してください。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}