'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

// 静的な発言データ（モック）
const mockStatements = [
  {
    id: 1,
    politician_id: 101,
    politician_name: '鈴木一郎',
    politician_party: '未来創造党',
    politician_role: '経済政策担当',
    politician_image_url: null,
    content: '地方創生のためには、デジタル技術の活用が不可欠です。リモートワークの推進により、地方でも都市部と同等の仕事ができる環境を整備していきます。',
    date: '2025年3月15日',
    source: '記者会見',
    source_url: 'https://example.com/news/12345',
    context: '地方創生に関する政策発表会での発言。地方の人口減少対策として、デジタル技術を活用した新しい働き方の推進について述べた。',
    topics: ['地方創生', 'デジタル化', '雇用'],
    likes_count: 245,
    comments_count: 37,
    related_statements: [6, 7]
  },
  {
    id: 6,
    politician_id: 101,
    politician_name: '鈴木一郎',
    politician_party: '未来創造党',
    politician_role: '経済政策担当',
    politician_image_url: null,
    content: '経済成長と環境保護は両立可能です。グリーンテクノロジーへの投資を促進し、持続可能な経済発展を目指します。',
    date: '2025年2月28日',
    source: '党大会演説',
    source_url: 'https://example.com/news/12340',
    context: '未来創造党の年次党大会での基調演説。環境政策と経済政策の両立について述べた部分。',
    topics: ['経済', '環境', '技術革新'],
    likes_count: 189,
    comments_count: 28,
    related_statements: [1, 7]
  },
  {
    id: 7,
    politician_id: 108,
    politician_name: '中村大輔',
    politician_party: '未来創造党',
    politician_role: 'デジタル大臣',
    politician_image_url: null,
    content: 'デジタル人材の育成は国家的課題です。教育機関と産業界が連携し、次世代のIT人材を育てる体制を構築します。',
    date: '2025年2月15日',
    source: '政策発表会',
    source_url: 'https://example.com/news/12335',
    context: 'デジタル人材育成に関する政策発表会での発言。IT人材不足の解消に向けた政府の取り組みについて説明した。',
    topics: ['教育', 'デジタル化', '人材育成'],
    likes_count: 215,
    comments_count: 32,
    related_statements: [1, 6]
  }
];

// 静的なコメントデータ（モック）
const mockComments = [
  {
    id: 101,
    statement_id: 1,
    user_name: 'user123',
    user_image_url: null,
    content: '地方でのリモートワーク推進は重要ですね。ただ、インターネットインフラの整備も同時に進めないと難しいのではないでしょうか？',
    date: '2025年3月15日',
    likes_count: 24
  },
  {
    id: 102,
    statement_id: 1,
    user_name: 'techfan',
    user_image_url: null,
    content: 'デジタル技術の活用は賛成です。特にブロードバンド環境の地方格差解消が先決だと思います。',
    date: '2025年3月15日',
    likes_count: 18
  },
  {
    id: 103,
    statement_id: 1,
    user_name: 'localworker',
    user_image_url: null,
    content: '実際に地方でリモートワークをしていますが、まだまだ環境整備が必要です。具体的な施策を知りたいです。',
    date: '2025年3月16日',
    likes_count: 32
  }
];

export default function StatementDetailPage() {
  const params = useParams();
  const statementId = Number(params.id);
  
  // 発言データの取得
  const statement = mockStatements.find(s => s.id === statementId);
  
  // 関連発言の取得
  const relatedStatements = statement 
    ? mockStatements.filter(s => statement.related_statements.includes(s.id))
    : [];
  
  // コメントの取得
  const comments = mockComments.filter(c => c.statement_id === statementId);
  
  // コメント入力状態
  const [commentText, setCommentText] = useState('');
  
  // 発言が見つからない場合
  if (!statement) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">発言が見つかりません</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              指定されたIDの発言情報は存在しないか、削除された可能性があります。
            </p>
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* 発言カード */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden mb-8">
          {/* 政治家情報 */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              {statement.politician_image_url ? (
                <img 
                  src={statement.politician_image_url} 
                  alt={statement.politician_name} 
                  className="w-14 h-14 rounded-full mr-4 object-cover"
                />
              ) : (
                <div className="w-14 h-14 rounded-full mr-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 text-xl font-semibold">
                    {statement.politician_name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <Link 
                  href={`/politicians/${statement.politician_id}`}
                  className="text-xl font-semibold text-gray-900 hover:text-blue-800 dark:text-white dark:hover:text-blue-400"
                >
                  {statement.politician_name}
                </Link>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Link 
                    href={`/parties/${statement.politician_party}`}
                    className="hover:text-blue-800 dark:hover:text-blue-400"
                  >
                    {statement.politician_party}
                  </Link>
                  {statement.politician_role && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{statement.politician_role}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* 発言内容 */}
          <div className="p-6">
            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed mb-4">
              {statement.content}
            </p>
            
            <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span>{statement.date}</span>
              <span className="mx-2">•</span>
              {statement.source_url ? (
                <a 
                  href={statement.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-800 hover:underline dark:text-blue-400"
                >
                  {statement.source}
                </a>
              ) : (
                <span>{statement.source}</span>
              )}
            </div>
            
            {statement.context && (
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md mb-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">発言の背景</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {statement.context}
                </p>
              </div>
            )}
            
            {/* トピックタグ */}
            <div className="flex flex-wrap gap-2 mb-6">
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
            
            {/* アクションボタン */}
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex items-center space-x-6">
                <button className="flex items-center text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>いいね</span>
                  <span className="ml-1">({statement.likes_count})</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>コメント</span>
                  <span className="ml-1">({statement.comments_count})</span>
                </button>
              </div>
              <div>
                <button className="flex items-center text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>シェア</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* コメントセクション */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">コメント ({comments.length})</h2>
            
            {/* コメント入力 */}
            <div className="mb-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold">
                      G
                    </span>
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="border-b border-gray-200 dark:border-gray-700 focus-within:border-blue-600">
                    <textarea
                      rows={3}
                      className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-600 focus:ring-0 dark:bg-gray-800 dark:text-white sm:text-sm"
                      placeholder="コメントを追加..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between pt-2">
                    <div className="flex items-center space-x-5">
                      <div className="flow-root">
                        <button type="button" className="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        type="submit"
                        className="inline-flex items-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                      >
                        投稿する
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* コメント一覧 */}
            {comments.length > 0 ? (
              <ul className="space-y-6">
                {comments.map((comment) => (
                  <li key={comment.id} className="flex space-x-4">
                    <div className="flex-shrink-0">
                      {comment.user_image_url ? (
                        <img 
                          src={comment.user_image_url} 
                          alt={comment.user_name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold">
                            {comment.user_name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center mb-1">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">{comment.user_name}</h3>
                        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{comment.date}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <button className="flex items-center text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>いいね ({comment.likes_count})</span>
                        </button>
                        <button className="flex items-center text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                          <span>返信</span>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 dark:text-gray-400">まだコメントはありません。最初のコメントを投稿しましょう。</p>
              </div>
            )}
            
            {comments.length > 0 && (
              <div className="mt-6 text-center">
                <button className="text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                  すべてのコメントを表示
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* 関連発言 */}
        {relatedStatements.length > 0 && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">関連発言</h2>
              
              <div className="space-y-6">
                {relatedStatements.map((relatedStatement) => (
                  <div key={relatedStatement.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center mb-2">
                      <Link 
                        href={`/politicians/${relatedStatement.politician_id}`}
                        className="font-medium text-gray-900 hover:text-blue-800 dark:text-white dark:hover:text-blue-400"
                      >
                        {relatedStatement.politician_name}
                      </Link>
                      <span className="mx-2 text-gray-500 dark:text-gray-400">•</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{relatedStatement.date}</span>
                    </div>
                    
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      {relatedStatement.content.length > 150 
                        ? `${relatedStatement.content.substring(0, 150)}...` 
                        : relatedStatement.content
                      }
                    </p>
                    
                    <Link 
                      href={`/statements/${relatedStatement.id}`}
                      className="text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      詳細を見る →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}