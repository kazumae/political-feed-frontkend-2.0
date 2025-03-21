'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
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
    bio: `
      1975年東京都生まれ。東京大学経済学部卒業後、米国ハーバード大学で経済学博士号を取得。
      大学教授として経済学を教える傍ら、政策提言を行い、2020年に政界入り。
      デジタル技術を活用した地方創生や、新しい働き方の推進に力を入れている。
      著書に「デジタル時代の経済政策」「地方から変わる日本経済」など。
    `,
    education: [
      { institution: '東京大学', degree: '経済学部', year: '1998年' },
      { institution: 'ハーバード大学', degree: '経済学博士', year: '2003年' }
    ],
    career: [
      { position: '大学教授', organization: '国立経済大学', period: '2003年-2020年' },
      { position: '経済政策担当', organization: '未来創造党', period: '2020年-現在' }
    ],
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
    bio: `
      1972年大阪府生まれ。京都大学教育学部卒業。
      公立学校教諭を経て、地方教育委員会で活動。教育委員会委員長として教育改革に取り組む。
      2018年に政界入りし、教育政策と子育て支援を中心に活動。
      2023年より文部科学大臣を務める。
    `,
    education: [
      { institution: '京都大学', degree: '教育学部', year: '1995年' }
    ],
    career: [
      { position: '公立高校教諭', organization: '大阪府立高校', period: '1995年-2005年' },
      { position: '教育委員', organization: '大阪府教育委員会', period: '2005年-2015年' },
      { position: '教育委員会委員長', organization: '大阪府教育委員会', period: '2015年-2018年' },
      { position: '国会議員', organization: '国民連合', period: '2018年-現在' },
      { position: '文部科学大臣', organization: '内閣', period: '2023年-現在' }
    ],
    followers_count: 9800,
    statements_count: 287
  }
];

// 静的な発言データ（モック）
const mockStatements = [
  {
    id: 1,
    politician_id: 101,
    content: '地方創生のためには、デジタル技術の活用が不可欠です。リモートワークの推進により、地方でも都市部と同等の仕事ができる環境を整備していきます。',
    date: '2025年3月15日',
    source: '記者会見',
    topics: ['地方創生', 'デジタル化', '雇用']
  },
  {
    id: 6,
    politician_id: 101,
    content: '経済成長と環境保護は両立可能です。グリーンテクノロジーへの投資を促進し、持続可能な経済発展を目指します。',
    date: '2025年2月28日',
    source: '党大会演説',
    topics: ['経済', '環境', '技術革新']
  },
  {
    id: 7,
    politician_id: 101,
    content: 'デジタル人材の育成は国家的課題です。教育機関と産業界が連携し、次世代のIT人材を育てる体制を構築します。',
    date: '2025年2月15日',
    source: '政策発表会',
    topics: ['教育', 'デジタル化', '人材育成']
  },
  {
    id: 2,
    politician_id: 102,
    content: '教育の無償化は、すべての子どもたちに平等な機会を提供するために必要な政策です。高等教育までの無償化を段階的に実現していきます。',
    date: '2025年3月10日',
    source: '政党公式サイト',
    topics: ['教育', '子育て支援', '格差是正']
  },
  {
    id: 8,
    politician_id: 102,
    content: '子育て世代の負担軽減のため、保育所の増設と保育士の処遇改善を進めます。待機児童ゼロを目指し、安心して子育てできる社会を作ります。',
    date: '2025年2月20日',
    source: '国会答弁',
    topics: ['子育て支援', '保育', '女性活躍']
  }
];

export default function PoliticianDetailPage() {
  const params = useParams();
  const politicianId = Number(params.id);
  
  // 政治家データの取得
  const politician = mockPoliticians.find(p => p.id === politicianId);
  
  // 政治家の発言を取得
  const statements = mockStatements.filter(s => s.politician_id === politicianId);
  
  // タブ状態管理
  const [activeTab, setActiveTab] = useState<'profile' | 'statements' | 'topics'>('profile');
  
  // 政治家が見つからない場合
  if (!politician) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">政治家が見つかりません</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              指定されたIDの政治家情報は存在しないか、削除された可能性があります。
            </p>
            <Link 
              href="/politicians"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              政治家一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 政治家ヘッダー情報 */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row">
            {/* 政治家アバター */}
            <div className="flex-shrink-0 flex justify-center mb-4 md:mb-0 md:mr-6">
              {politician.image_url ? (
                <img 
                  src={politician.image_url} 
                  alt={politician.name} 
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400 text-4xl font-semibold">
                    {politician.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            
            {/* 政治家基本情報 */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{politician.name}</h1>
              
              <div className="flex flex-wrap items-center mt-2 text-gray-600 dark:text-gray-400">
                <Link 
                  href={`/parties/${politician.party}`}
                  className="text-blue-800 hover:underline dark:text-blue-400"
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
              
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                {politician.profile_summary}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  <span>{politician.followers_count.toLocaleString()} フォロワー</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10.5h8m-8 5h8m-4-15h4.553a3 3 0 012.936 2.27l1.311 7.312A3 3 0 0117.07 15H6.93a3 3 0 01-2.73-4.263l1.311-7.312A3 3 0 018.446.5h3.105z" />
                  </svg>
                  <span>{politician.statements_count.toLocaleString()} 発言</span>
                </div>
                
                <button className="ml-auto inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  フォローする
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* タブナビゲーション */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              プロフィール
            </button>
            <button
              onClick={() => setActiveTab('statements')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'statements'
                  ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              発言
            </button>
            <button
              onClick={() => setActiveTab('topics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'topics'
                  ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              政策トピック
            </button>
          </nav>
        </div>
        
        {/* プロフィールタブ */}
        {activeTab === 'profile' && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <div className="space-y-8">
              {/* 経歴 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">経歴</h2>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {politician.bio}
                </div>
              </div>
              
              {/* 学歴 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">学歴</h2>
                <ul className="space-y-3">
                  {politician.education.map((edu, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-blue-800 dark:text-blue-400 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                      </div>
                      <div className="ml-3 text-gray-700 dark:text-gray-300">
                        <div className="font-medium">{edu.institution}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {edu.degree} • {edu.year}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* 職歴 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">職歴</h2>
                <ul className="space-y-3">
                  {politician.career.map((career, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 text-blue-800 dark:text-blue-400 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                      </div>
                      <div className="ml-3 text-gray-700 dark:text-gray-300">
                        <div className="font-medium">{career.position}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {career.organization} • {career.period}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* 発言タブ */}
        {activeTab === 'statements' && (
          <div className="space-y-6">
            {statements.length > 0 ? (
              statements.map((statement) => (
                <div 
                  key={statement.id}
                  className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow"
                >
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
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  この政治家の発言はまだ登録されていません。
                </p>
              </div>
            )}
            
            {statements.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Link 
                  href={`/politicians/${politicianId}/statements`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  すべての発言を見る
                </Link>
              </div>
            )}
          </div>
        )}
        
        {/* 政策トピックタブ */}
        {activeTab === 'topics' && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* トピック別の発言数グラフ（モック） */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">トピック別発言数</h2>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">経済</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">42件</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-800 h-2.5 rounded-full dark:bg-blue-600" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">デジタル化</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">38件</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-800 h-2.5 rounded-full dark:bg-blue-600" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">地方創生</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">35件</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-800 h-2.5 rounded-full dark:bg-blue-600" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">環境</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">28件</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-800 h-2.5 rounded-full dark:bg-blue-600" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">教育</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">25件</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-blue-800 h-2.5 rounded-full dark:bg-blue-600" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 主要政策トピック */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">主要政策トピック</h2>
                <div className="space-y-4">
                  <Link 
                    href="/topics/economy"
                    className="block p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-950 rounded-lg"
                  >
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">経済政策</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      デジタル技術を活用した新しい経済成長モデルの構築と、地方経済の活性化
                    </p>
                  </Link>
                  <Link 
                    href="/topics/digital"
                    className="block p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-950 rounded-lg"
                  >
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">デジタル化推進</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      行政のデジタル化と、デジタル人材の育成による社会全体のDX推進
                    </p>
                  </Link>
                  <Link 
                    href="/topics/regional"
                    className="block p-4 bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-950 rounded-lg"
                  >
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">地方創生</h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      リモートワークの推進と地方移住支援による、地方の人口減少対策
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}