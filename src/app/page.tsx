'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useApi } from '@/lib/api/context/ApiContext';
import { Statement } from '@/lib/api/types/statement';
import { Topic } from '@/lib/api/types/topic';

// フィルターとトピックのマッピング
const filterToTopicMap: Record<string, string> = {
  'economy': 'economy',
  'education': 'education',
  'environment': 'environment',
  'welfare': 'welfare',
  'diplomacy': 'diplomacy'
};

export default function Home() {
  const { statements, topics } = useApi();
  // statementsとtopicsの最新の参照を保持するためのref
  const statementsRef = useRef(statements);
  const topicsRef = useRef(topics);
  
  // refを最新の値で更新
  useEffect(() => {
    statementsRef.current = statements;
    topicsRef.current = topics;
  }, [statements, topics]);
  
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [statementList, setStatementList] = useState<Statement[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalStatements, setTotalStatements] = useState<number>(0);

  // 発言データを取得
  useEffect(() => {
    const fetchStatements = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // フィルター条件に応じたパラメータを設定
        const params: Record<string, unknown> = {
          limit: 20,
          sort: 'date_desc'
        };

        // フィルター条件を追加
        if (activeFilter !== 'all') {
          params.filter_topic = filterToTopicMap[activeFilter];
        }

        const data = await statementsRef.current.getStatements(params);
        setStatementList(data.statements);
        setTotalStatements(data.total);
        setIsLoading(false);
      } catch (err) {
        console.error('発言データの取得に失敗しました', err);
        setError('発言データの取得に失敗しました');
        setIsLoading(false);
      }
    };

    fetchStatements();
  }, [activeFilter]); // statementsを依存配列から削除

  // トレンドトピックを取得
  useEffect(() => {
    const fetchTrendingTopics = async () => {
      try {
        const data = await topicsRef.current.getTrendingTopics(5);
        setTrendingTopics(data);
      } catch (err) {
        console.error('トレンドトピックの取得に失敗しました', err);
        setError('トレンドトピックの取得に失敗しました');
      }
    };

    fetchTrendingTopics();
  }, []); // topicsを依存配列から削除
  
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
              {isLoading ? (
                <p className="text-sm text-gray-500">読み込み中...</p>
              ) : error ? (
                <p className="text-sm text-red-500">エラーが発生しました</p>
              ) : (
                <ul className="space-y-2">
                  {trendingTopics.map((topic) => (
                    <li key={topic.id} className="flex justify-between items-center">
                      <Link
                        href={`/topics/${topic.id}`}
                        className="text-sm text-blue-800 hover:underline dark:text-blue-400"
                      >
                        {topic.name}
                      </Link>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {/* トピックの発言数などがあれば表示 */}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        
        {/* 発言フィード */}
        <div className="space-y-6">
          {isLoading ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">読み込み中...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">{error}</p>
            </div>
          ) : statementList.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 dark:text-gray-400">発言が見つかりませんでした</p>
            </div>
          ) : (
            statementList.map((statement) => (
              <div
                key={statement.id}
                className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                {/* 政治家情報 */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full mr-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400 text-lg font-semibold">
                      {statement.politician_name ? statement.politician_name.charAt(0) : '?'}
                    </span>
                  </div>
                  <div>
                    <Link
                      href={`/politicians/${statement.politician_id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-blue-800 dark:text-white dark:hover:text-blue-400"
                    >
                      {statement.politician_name || '不明'}
                    </Link>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      {statement.party_name && (
                        <Link
                          href={`/parties/${statement.party_id}`}
                          className="hover:text-blue-800 dark:hover:text-blue-400"
                        >
                          {statement.party_name}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* 発言内容 */}
                <div className="mb-4">
                  <h3 className="text-lg font-medium mb-2">{statement.title}</h3>
                  <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed">
                    {statement.content}
                  </p>
                </div>
                
                {/* メタ情報 */}
                <div className="flex flex-wrap items-center justify-between text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <span>{new Date(statement.statement_date).toLocaleDateString('ja-JP')}</span>
                    {statement.source && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{statement.source}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                    <button
                      onClick={() => statementsRef.current.likeStatement(statement.id)}
                      className="flex items-center text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill={statement.is_liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>いいね {statement.likes_count > 0 && `(${statement.likes_count})`}</span>
                    </button>
                    <Link 
                      href={`/statements/${statement.id}`}
                      className="flex items-center text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-400"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>コメント {statement.comments_count > 0 && `(${statement.comments_count})`}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* ページネーション */}
        {!isLoading && !error && statementList.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button 
                onClick={() => {
                  if (totalStatements > 0) {
                    const fetchPrevPage = async () => {
                      setIsLoading(true);
                      try {
                        const params: Record<string, unknown> = {
                          limit: 20,
                          sort: 'date_desc',
                          skip: Math.max(0, (statementList.length || 0) - 20)
                        };
                        
                        if (activeFilter !== 'all') {
                          params.filter_topic = filterToTopicMap[activeFilter];
                        }
                        
                        const data = await statementsRef.current.getStatements(params);
                        setStatementList(data.statements);
                        setTotalStatements(data.total);
                      } catch (err) {
                        console.error('発言データの取得に失敗しました', err);
                        setError('発言データの取得に失敗しました');
                      } finally {
                        setIsLoading(false);
                      }
                    };
                    fetchPrevPage();
                  }
                }}
                disabled={statementList.length === 0}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                前へ
              </button>
              <span className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
                {totalStatements > 0 ? `${Math.min(totalStatements, 20)}件 / 全${totalStatements}件` : '0件'}
              </span>
              <button 
                onClick={() => {
                  if (statementList.length > 0 && statementList.length < totalStatements) {
                    const fetchNextPage = async () => {
                      setIsLoading(true);
                      try {
                        const params: Record<string, unknown> = {
                          limit: 20,
                          sort: 'date_desc',
                          skip: statementList.length
                        };
                        
                        if (activeFilter !== 'all') {
                          params.filter_topic = filterToTopicMap[activeFilter];
                        }
                        
                        const data = await statementsRef.current.getStatements(params);
                        setStatementList(data.statements);
                        setTotalStatements(data.total);
                      } catch (err) {
                        console.error('発言データの取得に失敗しました', err);
                        setError('発言データの取得に失敗しました');
                      } finally {
                        setIsLoading(false);
                      }
                    };
                    fetchNextPage();
                  }
                }}
                disabled={statementList.length >= totalStatements}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
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
