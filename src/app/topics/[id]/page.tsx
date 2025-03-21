'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

// 静的なトピックデータ（モック）
const mockTopics = [
  {
    id: 1,
    name: '経済政策',
    icon: '💹',
    description: '経済成長、財政政策、金融政策、雇用対策など、国の経済に関する政策分野。',
    long_description: `
      経済政策は、国や地方自治体が経済活動に介入し、経済成長、雇用創出、物価安定などの目標を達成するために行う政策です。
      
      主な経済政策には以下のようなものがあります：
      
      1. 財政政策：政府支出や税制を通じて経済に影響を与える政策
      2. 金融政策：中央銀行が金利や通貨供給量を調整して経済に影響を与える政策
      3. 産業政策：特定の産業や企業を支援・規制する政策
      4. 雇用政策：雇用の創出・維持を目的とした政策
      5. 貿易政策：国際貿易に関する政策
      
      経済政策は、景気循環の調整、経済成長の促進、所得分配の是正、市場の失敗の修正など、様々な目的で実施されます。
      政策の選択や実施方法については、政治的イデオロギーや経済理論によって見解が分かれることが多く、政治的議論の中心となることが多い分野です。
    `,
    statements_count: 156,
    politicians_count: 48,
    related_topics: ['財政', '雇用', '金融', '中小企業'],
    party_positions: [
      { party_id: 1, party_name: '未来創造党', position: 'デジタル技術を活用した新しい経済成長モデルの構築と、地方経済の活性化を目指す。', color: '#1E40AF' },
      { party_id: 2, party_name: '国民連合', position: '中小企業支援と地域経済の活性化により、雇用の安定と賃金の引き上げを実現する。', color: '#DC2626' },
      { party_id: 4, party_name: '自由民主連合', position: '規制緩和と自由競争の促進により、経済の活性化と成長を目指す。', color: '#7C3AED' },
      { party_id: 5, party_name: '社会民主党', position: '格差是正と公正な分配を重視し、労働者の権利向上と福祉の充実を図る。', color: '#F59E0B' }
    ]
  },
  {
    id: 3,
    name: '環境・エネルギー',
    icon: '🌳',
    description: '環境保護、気候変動対策、エネルギー政策、再生可能エネルギーなど、環境とエネルギーに関する政策分野。',
    long_description: `
      環境・エネルギー政策は、自然環境の保全とエネルギー供給の確保を両立させることを目指す政策分野です。
      
      主な環境・エネルギー政策には以下のようなものがあります：
      
      1. 気候変動対策：温室効果ガスの排出削減、カーボンニュートラルの実現
      2. 再生可能エネルギー推進：太陽光、風力、水力、地熱などのクリーンエネルギーの導入促進
      3. エネルギー効率化：省エネルギー技術の開発・普及
      4. 資源循環：廃棄物の削減、リサイクル、リユースの促進
      5. 自然保護：生物多様性の保全、自然環境の保護
      
      近年は特に気候変動対策が重要視され、2050年カーボンニュートラル（温室効果ガス排出実質ゼロ）の実現に向けた取り組みが世界的に進められています。
      一方で、エネルギーの安定供給やコスト、産業競争力への影響なども考慮する必要があり、バランスの取れた政策が求められています。
    `,
    statements_count: 98,
    politicians_count: 29,
    related_topics: ['再生可能エネルギー', '気候変動', '脱炭素', '原子力'],
    party_positions: [
      { party_id: 1, party_name: '未来創造党', position: '経済成長と環境保護の両立を目指し、再生可能エネルギーの推進と脱炭素社会の実現に取り組む。', color: '#1E40AF' },
      { party_id: 3, party_name: '環境保全党', position: '環境保護を最優先し、再生可能エネルギー100%社会の実現と自然環境の保全を目指す。', color: '#059669' },
      { party_id: 4, party_name: '自由民主連合', position: 'エネルギー安全保障を重視し、原子力を含む多様なエネルギー源の活用を支持する。', color: '#7C3AED' }
    ]
  }
];

// 静的な発言データ（モック）
const mockStatements = [
  {
    id: 1,
    politician_id: 101,
    politician_name: '鈴木一郎',
    politician_party: '未来創造党',
    politician_image_url: null,
    content: '地方創生のためには、デジタル技術の活用が不可欠です。リモートワークの推進により、地方でも都市部と同等の仕事ができる環境を整備していきます。',
    date: '2025年3月15日',
    source: '記者会見',
    topics: ['地方創生', 'デジタル化', '雇用'],
    topic_ids: [7, 6, 1]
  },
  {
    id: 6,
    politician_id: 101,
    politician_name: '鈴木一郎',
    politician_party: '未来創造党',
    politician_image_url: null,
    content: '経済成長と環境保護は両立可能です。グリーンテクノロジーへの投資を促進し、持続可能な経済発展を目指します。',
    date: '2025年2月28日',
    source: '党大会演説',
    topics: ['経済', '環境', '技術革新'],
    topic_ids: [1, 3, 6]
  },
  {
    id: 7,
    politician_id: 108,
    politician_name: '中村大輔',
    politician_party: '未来創造党',
    politician_image_url: null,
    content: 'デジタル人材の育成は国家的課題です。教育機関と産業界が連携し、次世代のIT人材を育てる体制を構築します。',
    date: '2025年2月15日',
    source: '政策発表会',
    topics: ['教育', 'デジタル化', '人材育成'],
    topic_ids: [4, 6, 1]
  },
  {
    id: 2,
    politician_id: 102,
    politician_name: '佐藤花子',
    politician_party: '国民連合',
    politician_image_url: null,
    content: '教育の無償化は、すべての子どもたちに平等な機会を提供するために必要な政策です。高等教育までの無償化を段階的に実現していきます。',
    date: '2025年3月10日',
    source: '政党公式サイト',
    topics: ['教育', '子育て支援', '格差是正'],
    topic_ids: [4, 8, 5]
  },
  {
    id: 8,
    politician_id: 104,
    politician_name: '山田優子',
    politician_party: '国民連合',
    politician_image_url: null,
    content: '子育て世代の負担軽減のため、保育所の増設と保育士の処遇改善を進めます。待機児童ゼロを目指し、安心して子育てできる社会を作ります。',
    date: '2025年2月20日',
    source: '国会答弁',
    topics: ['子育て支援', '保育', '女性活躍'],
    topic_ids: [8, 5]
  },
  {
    id: 9,
    politician_id: 103,
    politician_name: '田中誠',
    politician_party: '環境保全党',
    politician_image_url: null,
    content: '再生可能エネルギーへの転換は待ったなしの課題です。2030年までに電力の50%を再生可能エネルギーにする目標を掲げ、脱炭素社会の実現を目指します。',
    date: '2025年3月8日',
    source: 'テレビ討論番組',
    topics: ['環境', 'エネルギー政策', '気候変動'],
    topic_ids: [3]
  },
  {
    id: 10,
    politician_id: 105,
    politician_name: '伊藤健太',
    politician_party: '自由民主連合',
    politician_image_url: null,
    content: '経済成長なくして財政健全化なし。規制改革と法人税減税により、企業の競争力を高め、雇用と所得の拡大を実現します。',
    date: '2025年2月5日',
    source: '経済団体講演',
    topics: ['経済', '財政', '税制'],
    topic_ids: [1]
  }
];

// 政治家の発言数の型定義
type StatementsCount = {
  [key: string]: number;
};

// 政治家の型定義
interface Politician {
  id: number;
  name: string;
  party: string;
  role: string;
  image_url: string | null;
  statements_count: StatementsCount;
}

// 静的な政治家データ（モック）
const mockPoliticians: Politician[] = [
  {
    id: 101,
    name: '鈴木一郎',
    party: '未来創造党',
    role: '経済政策担当',
    image_url: null,
    statements_count: {
      '1': 12, // 経済政策に関する発言数
      '3': 5,  // 環境・エネルギーに関する発言数
      '6': 8,  // デジタル化に関する発言数
      '7': 7   // 地方創生に関する発言数
    }
  },
  {
    id: 102,
    name: '佐藤花子',
    party: '国民連合',
    role: '文部科学大臣',
    image_url: null,
    statements_count: {
      '4': 15, // 教育・文化に関する発言数
      '8': 10  // 子育て・少子化対策に関する発言数
    }
  },
  {
    id: 103,
    name: '田中誠',
    party: '環境保全党',
    role: '環境大臣',
    image_url: null,
    statements_count: {
      '3': 18  // 環境・エネルギーに関する発言数
    }
  },
  {
    id: 105,
    name: '伊藤健太',
    party: '自由民主連合',
    role: '外務大臣',
    image_url: null,
    statements_count: {
      '1': 9,  // 経済政策に関する発言数
      '2': 14  // 外交・安全保障に関する発言数
    }
  }
];

export default function TopicDetailPage() {
  const params = useParams();
  const topicId = Number(params.id);
  
  // トピックデータの取得
  const topic = mockTopics.find(t => t.id === topicId);
  
  // トピックに関連する発言を取得
  const statements = mockStatements.filter(s => s.topic_ids.includes(topicId));
  
  // トピックに関連する政治家を取得（発言数順）
  const topicIdStr = String(topicId);
  const topicPoliticians = mockPoliticians
    .filter(p => p.statements_count && p.statements_count[topicIdStr])
    .sort((a, b) => (b.statements_count[topicIdStr] || 0) - (a.statements_count[topicIdStr] || 0));
  
  // タブ状態管理
  const [activeTab, setActiveTab] = useState<'overview' | 'statements' | 'politicians' | 'positions'>('overview');
  
  // トピックが見つからない場合
  if (!topic) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">トピックが見つかりません</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              指定されたIDのトピック情報は存在しないか、削除された可能性があります。
            </p>
            <Link 
              href="/topics"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              トピック一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* トピックヘッダー情報 */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row">
            {/* トピックアイコン */}
            <div className="flex-shrink-0 flex justify-center mb-4 md:mb-0 md:mr-6">
              <div className="w-24 h-24 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-4xl">
                {topic.icon}
              </div>
            </div>
            
            {/* トピック基本情報 */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{topic.name}</h1>
              
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                {topic.description}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10.5h8m-8 5h8m-4-15h4.553a3 3 0 012.936 2.27l1.311 7.312A3 3 0 0117.07 15H6.93a3 3 0 01-2.73-4.263l1.311-7.312A3 3 0 018.446.5h3.105z" />
                  </svg>
                  <span>{topic.statements_count} 発言</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>{topic.politicians_count} 政治家</span>
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
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              概要
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
              onClick={() => setActiveTab('politicians')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'politicians'
                  ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              政治家
            </button>
            <button
              onClick={() => setActiveTab('positions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'positions'
                  ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              政党の立場
            </button>
          </nav>
        </div>
        
        {/* 概要タブ */}
        {activeTab === 'overview' && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <div className="space-y-8">
              {/* 詳細説明 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">詳細説明</h2>
                <div className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {topic.long_description}
                </div>
              </div>
              
              {/* 関連トピック */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">関連トピック</h2>
                <div className="flex flex-wrap gap-2">
                  {topic.related_topics.map((relatedTopic, index) => (
                    <Link 
                      key={index}
                      href={`/topics/search?q=${encodeURIComponent(relatedTopic)}`}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      {relatedTopic}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* トレンド */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">発言トレンド</h2>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="h-64 flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                      発言数の推移グラフ（開発中）
                    </p>
                  </div>
                </div>
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
                  {/* 政治家情報 */}
                  <div className="flex items-center mb-4">
                    {statement.politician_image_url ? (
                      <img 
                        src={statement.politician_image_url} 
                        alt={statement.politician_name} 
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full mr-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400 text-lg font-semibold">
                          {statement.politician_name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <Link 
                        href={`/politicians/${statement.politician_id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-blue-800 dark:text-white dark:hover:text-blue-400"
                      >
                        {statement.politician_name}
                      </Link>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {statement.politician_party}
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
                  このトピックに関する発言はまだ登録されていません。
                </p>
              </div>
            )}
            
            {statements.length > 0 && (
              <div className="mt-8 flex justify-center">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                  もっと見る
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* 政治家タブ */}
        {activeTab === 'politicians' && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topicPoliticians.length > 0 ? (
                topicPoliticians.map((politician) => (
                  <div 
                    key={politician.id}
                    className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-3">
                      {politician.image_url ? (
                        <img 
                          src={politician.image_url} 
                          alt={politician.name} 
                          className="w-14 h-14 rounded-full mr-4 object-cover"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full mr-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-500 dark:text-gray-400 text-lg font-semibold">
                            {politician.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <Link 
                          href={`/politicians/${politician.id}`}
                          className="font-medium text-gray-900 hover:text-blue-800 dark:text-white dark:hover:text-blue-400"
                        >
                          {politician.name}
                        </Link>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {politician.party}
                          {politician.role && (
                            <>
                              <span className="mx-1">•</span>
                              <span>{politician.role}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium">{politician.statements_count[topicIdStr]}</span> 発言
                      </div>
                      <Link
                        href={`/politicians/${politician.id}?topic=${topicId}`}
                        className="text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        詳細を見る →
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    このトピックに関連する政治家はまだ登録されていません。
                  </p>
                </div>
              )}
            </div>
            
            {topicPoliticians.length > 0 && (
              <div className="mt-8 flex justify-center">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                  もっと見る
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* 政党の立場タブ */}
        {activeTab === 'positions' && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <div className="space-y-6">
              {topic.party_positions && topic.party_positions.length > 0 ? (
                topic.party_positions.map((position) => (
                  <div 
                    key={position.party_id}
                    className="p-4 rounded-lg border-l-4"
                    style={{ borderLeftColor: position.color }}
                  >
                    <Link 
                      href={`/parties/${position.party_id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-blue-800 dark:text-white dark:hover:text-blue-400"
                    >
                      {position.party_name}
                    </Link>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      {position.position}
                    </p>
                    <div className="mt-3 flex justify-end">
                      <Link 
                        href={`/parties/${position.party_id}/policies?topic=${topicId}`}
                        className="text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        政策詳細を見る →
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    このトピックに関する政党の立場情報はまだ登録されていません。
                  </p>
                </div>
              )}
            </div>
            
            {/* 政党間比較 */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">政党間の立場比較</h2>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <div className="h-64 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    政党間の立場比較図（開発中）
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}