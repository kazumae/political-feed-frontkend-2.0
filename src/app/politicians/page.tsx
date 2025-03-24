'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useApi } from '@/lib/api/context/ApiContext';
import { Politician } from '@/lib/api/types/politician';

// 政治家一覧ページのコンポーネント
export default function PoliticiansPage() {
  // APIコンテキストからpoliticiansフックを取得
  const { politicians } = useApi();
  
  // 状態管理
  const [politicianList, setPoliticianList] = useState<Politician[]>([]);
  const [parties, setParties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedParty, setSelectedParty] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'followers' | 'statements'>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9; // 1ページあたりの表示件数
  
  // ページを変更する関数
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  // 検索条件やページが変更されたときにデータを再取得
  useEffect(() => {
    // コンポーネントのマウント時または検索条件が変更されたときにのみデータを取得
    const fetchData = async () => {
      // すでにローディング中の場合は何もしない
      if (isLoading) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // APIパラメータの構築
        const params = {
          skip: (currentPage - 1) * itemsPerPage,
          limit: itemsPerPage,
          search: searchTerm || undefined,
          party_id: selectedParty || undefined,
          sort_by: sortBy
        };
        
        // 政治家データの取得
        const data = await politicians.getPoliticians(params);
        
        if (data && data.items) {
          setPoliticianList(data.items);
          setTotalPages(Math.ceil(data.total / itemsPerPage));
          
          // 政党一覧を取得（一意な政党名のリスト）
          if (data.items.length > 0) {
            const uniqueParties = Array.from(
              new Set(
                data.items
                  .map(p => p.current_party_id)
                  .filter(Boolean) as string[]
              )
            );
            setParties(uniqueParties);
          }
        } else {
          setPoliticianList([]);
          setTotalPages(1);
        }
        
        setIsLoading(false);
      } catch (err) {
        setError('政治家データの取得に失敗しました');
        setIsLoading(false);
        console.error('Error fetching politicians:', err);
      }
    };
    
    fetchData();
  }, [currentPage, searchTerm, selectedParty, sortBy, itemsPerPage]);
  
  // 検索条件が変更されたときにページを1に戻す
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedParty, sortBy]);
  
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

        {/* ローディング状態 */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {/* エラー状態 */}
        {error && !isLoading && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">エラーが発生しました</h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 政治家リスト */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {politicianList.map((politician) => (
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
                        {politician.current_party_id && (
                          <Link 
                            href={`/parties/${politician.current_party_id}`}
                            className="hover:text-blue-800 dark:hover:text-blue-400"
                          >
                            {politician.current_party_id}
                          </Link>
                        )}
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
        )}
        
        {/* 結果がない場合 */}
        {!isLoading && !error && politicianList.length === 0 && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              条件に一致する政治家が見つかりませんでした。検索条件を変更してください。
            </p>
          </div>
        )}

        {/* ページネーション */}
        {!isLoading && !error && totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md mr-2 ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                前へ
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md mx-1 ${
                    currentPage === page
                      ? 'bg-blue-600 text-white dark:bg-blue-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ml-2 ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                次へ
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}