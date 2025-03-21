'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
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
    manifesto: `
      未来創造党は、デジタル技術の活用と地方創生を通じて、持続可能な社会と経済成長の両立を目指します。
      
      【基本理念】
      1. デジタル技術を活用した新しい社会の創造
      2. 地方の活性化と分散型社会の実現
      3. 環境と経済の調和による持続可能な発展
      4. 多様性を尊重する開かれた社会の構築
      
      【主要政策】
      ■ デジタル政策
      ・行政のデジタル化推進と市民サービスの向上
      ・デジタル人材の育成と技術革新の支援
      ・サイバーセキュリティの強化
      
      ■ 地方創生
      ・リモートワークの推進と地方移住支援
      ・地方の産業振興と雇用創出
      ・地方自治体のデジタル化支援
      
      ■ 経済政策
      ・デジタル経済の促進とスタートアップ支援
      ・成長分野への戦略的投資
      ・公正な競争環境の整備
      
      ■ 環境政策
      ・再生可能エネルギーの推進
      ・脱炭素社会に向けた技術開発支援
      ・循環型経済の構築
    `,
    seats_count: 120,
    members_count: 142,
    leader: {
      id: 108,
      name: '中村大輔',
      role: '党首',
      image_url: null
    },
    executives: [
      { id: 101, name: '鈴木一郎', role: '幹事長', image_url: null },
      { id: 108, name: '中村大輔', role: '党首', image_url: null },
      { id: 109, name: '高橋健太', role: '政調会長', image_url: null },
      { id: 110, name: '松本さやか', role: '国会対策委員長', image_url: null }
    ]
  },
  {
    id: 2,
    name: '国民連合',
    logo_url: null,
    color: '#DC2626', // 赤
    founded_year: 2012,
    ideology: '中道左派',
    description: '教育と社会保障の充実を重視する政党。格差是正と子育て支援に力を入れている。',
    manifesto: `
      国民連合は、すべての国民が安心して暮らせる社会の実現を目指します。
      
      【基本理念】
      1. 格差のない公正な社会の実現
      2. 充実した社会保障と教育の提供
      3. 子育て世代への手厚い支援
      4. 持続可能な経済成長の追求
      
      【主要政策】
      ■ 教育政策
      ・教育の無償化の段階的実現
      ・教育環境の整備と教員の処遇改善
      ・生涯学習の推進
      
      ■ 社会保障政策
      ・医療・介護サービスの充実
      ・年金制度の安定化
      ・セーフティネットの強化
      
      ■ 子育て支援
      ・保育所の増設と保育士の処遇改善
      ・児童手当の拡充
      ・ワークライフバランスの推進
      
      ■ 経済政策
      ・中小企業支援と地域経済の活性化
      ・雇用の安定と賃金の引き上げ
      ・公正な税制の実現
    `,
    seats_count: 95,
    members_count: 110,
    leader: {
      id: 102,
      name: '佐藤花子',
      role: '党首',
      image_url: null
    },
    executives: [
      { id: 102, name: '佐藤花子', role: '党首', image_url: null },
      { id: 104, name: '山田優子', role: '幹事長', image_url: null },
      { id: 111, name: '井上拓也', role: '政調会長', image_url: null },
      { id: 112, name: '西田真理', role: '国会対策委員長', image_url: null }
    ]
  }
];

// 静的な政治家データ（モック）
const mockPoliticians = [
  {
    id: 101,
    name: '鈴木一郎',
    party_id: 1,
    role: '幹事長',
    image_url: null,
    profile_summary: '元経済学者。デジタル経済と地方創生を専門とし、新しい経済政策を提唱している。'
  },
  {
    id: 108,
    name: '中村大輔',
    party_id: 1,
    role: '党首',
    image_url: null,
    profile_summary: 'IT企業出身。デジタル社会の実現とテクノロジー政策を担当。'
  },
  {
    id: 109,
    name: '高橋健太',
    party_id: 1,
    role: '政調会長',
    image_url: null,
    profile_summary: '元シンクタンク研究員。政策立案のエキスパートとして活躍。'
  },
  {
    id: 110,
    name: '松本さやか',
    party_id: 1,
    role: '国会対策委員長',
    image_url: null,
    profile_summary: '弁護士出身。法律の専門知識を活かした国会戦略を担当。'
  },
  {
    id: 102,
    name: '佐藤花子',
    party_id: 2,
    role: '党首',
    image_url: null,
    profile_summary: '元教育委員会委員長。教育改革と子育て支援に力を入れている。'
  },
  {
    id: 104,
    name: '山田優子',
    party_id: 2,
    role: '幹事長',
    image_url: null,
    profile_summary: '医師出身。医療制度改革と社会保障の充実に取り組んでいる。'
  }
];

// 静的な発言データ（モック）
const mockStatements = [
  {
    id: 1,
    politician_id: 101,
    party_id: 1,
    content: '地方創生のためには、デジタル技術の活用が不可欠です。リモートワークの推進により、地方でも都市部と同等の仕事ができる環境を整備していきます。',
    date: '2025年3月15日',
    source: '記者会見',
    topics: ['地方創生', 'デジタル化', '雇用']
  },
  {
    id: 6,
    politician_id: 101,
    party_id: 1,
    content: '経済成長と環境保護は両立可能です。グリーンテクノロジーへの投資を促進し、持続可能な経済発展を目指します。',
    date: '2025年2月28日',
    source: '党大会演説',
    topics: ['経済', '環境', '技術革新']
  },
  {
    id: 7,
    politician_id: 108,
    party_id: 1,
    content: 'デジタル人材の育成は国家的課題です。教育機関と産業界が連携し、次世代のIT人材を育てる体制を構築します。',
    date: '2025年2月15日',
    source: '政策発表会',
    topics: ['教育', 'デジタル化', '人材育成']
  },
  {
    id: 2,
    politician_id: 102,
    party_id: 2,
    content: '教育の無償化は、すべての子どもたちに平等な機会を提供するために必要な政策です。高等教育までの無償化を段階的に実現していきます。',
    date: '2025年3月10日',
    source: '政党公式サイト',
    topics: ['教育', '子育て支援', '格差是正']
  },
  {
    id: 8,
    politician_id: 104,
    party_id: 2,
    content: '子育て世代の負担軽減のため、保育所の増設と保育士の処遇改善を進めます。待機児童ゼロを目指し、安心して子育てできる社会を作ります。',
    date: '2025年2月20日',
    source: '国会答弁',
    topics: ['子育て支援', '保育', '女性活躍']
  }
];

// 政策分野（モック）
const policyAreas = [
  { id: 1, name: '経済', icon: '💹' },
  { id: 2, name: '外交', icon: '🌐' },
  { id: 3, name: '安全保障', icon: '🛡️' },
  { id: 4, name: '環境', icon: '🌳' },
  { id: 5, name: '教育', icon: '🎓' },
  { id: 6, name: '社会保障', icon: '🏥' },
  { id: 7, name: 'デジタル', icon: '💻' },
  { id: 8, name: '地方創生', icon: '🏙️' }
];

export default function PartyDetailPage() {
  const params = useParams();
  const partyId = Number(params.id);
  
  // 政党データの取得
  const party = mockParties.find(p => p.id === partyId);
  
  // 政党に所属する政治家を取得
  const members = mockPoliticians.filter(p => p.party_id === partyId);
  
  // 政党の発言を取得
  const statements = mockStatements.filter(s => s.party_id === partyId);
  
  // タブ状態管理
  const [activeTab, setActiveTab] = useState<'about' | 'members' | 'statements' | 'policies'>('about');
  
  // 政党が見つからない場合
  if (!party) {
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">政党が見つかりません</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              指定されたIDの政党情報は存在しないか、削除された可能性があります。
            </p>
            <Link 
              href="/parties"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              政党一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 政党ヘッダー情報 */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row">
            {/* 政党ロゴ */}
            <div className="flex-shrink-0 flex justify-center mb-4 md:mb-0 md:mr-6">
              {party.logo_url ? (
                <img 
                  src={party.logo_url} 
                  alt={party.name} 
                  className="w-32 h-32 object-contain"
                />
              ) : (
                <div 
                  className="w-32 h-32 rounded-md flex items-center justify-center text-white text-4xl font-bold"
                  style={{ backgroundColor: party.color }}
                >
                  {party.name.charAt(0)}
                </div>
              )}
            </div>
            
            {/* 政党基本情報 */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{party.name}</h1>
              
              <div className="flex flex-wrap items-center mt-2 text-gray-600 dark:text-gray-400">
                <span>{party.ideology}</span>
                <span className="mx-2">•</span>
                <span>設立: {party.founded_year}年</span>
              </div>
              
              <p className="mt-4 text-gray-700 dark:text-gray-300">
                {party.description}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>{party.seats_count} 議席</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span>{party.members_count} 議員</span>
                </div>
                
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>党首: </span>
                  <Link 
                    href={`/politicians/${party.leader.id}`}
                    className="ml-1 text-blue-800 hover:underline dark:text-blue-400"
                  >
                    {party.leader.name}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* タブナビゲーション */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('about')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'about'
                  ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              政党概要
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'members'
                  ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              所属議員
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
              onClick={() => setActiveTab('policies')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'policies'
                  ? 'border-blue-800 text-blue-800 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              政策
            </button>
          </nav>
        </div>
        
        {/* 政党概要タブ */}
        {activeTab === 'about' && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <div className="space-y-8">
              {/* 党の歴史 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">党の歴史</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {party.name}は{party.founded_year}年に設立されました。
                  {party.id === 1 && `
                    デジタル技術の活用と地方創生を重視する新しい政治勢力として誕生しました。
                    設立以来、経済成長と環境保護の両立を目指し、特にデジタル分野での政策提言に力を入れています。
                    2022年の総選挙では120議席を獲得し、第一党となりました。
                  `}
                  {party.id === 2 && `
                    教育と社会保障の充実を重視する政党として設立されました。
                    格差是正と子育て支援に力を入れ、特に教育の無償化や社会保障の拡充を主要政策として掲げています。
                    2022年の総選挙では95議席を獲得し、第二党となりました。
                  `}
                </p>
              </div>
              
              {/* 党の理念 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">党の理念</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  {party.id === 1 && `
                    未来創造党は、デジタル技術の活用と地方創生を通じて、持続可能な社会と経済成長の両立を目指します。
                    多様性を尊重し、誰もが活躍できる社会の実現を目指しています。
                    環境と経済の調和を重視し、次世代に豊かな社会を引き継ぐことを使命としています。
                  `}
                  {party.id === 2 && `
                    国民連合は、すべての国民が安心して暮らせる社会の実現を目指します。
                    格差のない公正な社会を構築し、充実した社会保障と教育を提供することを基本理念としています。
                    特に子育て世代への支援を重視し、次世代を担う子どもたちの育成に力を入れています。
                  `}
                </p>
              </div>
              
              {/* 党の組織 */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">党の組織</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {party.executives.map((executive) => (
                    <div key={executive.id} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      <div className="flex items-center">
                        {executive.image_url ? (
                          <img 
                            src={executive.image_url} 
                            alt={executive.name} 
                            className="w-12 h-12 rounded-full mr-4 object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full mr-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <span className="text-gray-500 dark:text-gray-400 text-lg font-semibold">
                              {executive.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <Link 
                            href={`/politicians/${executive.id}`}
                            className="font-medium text-gray-900 hover:text-blue-800 dark:text-white dark:hover:text-blue-400"
                          >
                            {executive.name}
                          </Link>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{executive.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 所属議員タブ */}
        {activeTab === 'members' && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <div 
                  key={member.id}
                  className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center mb-3">
                    {member.image_url ? (
                      <img 
                        src={member.image_url} 
                        alt={member.name} 
                        className="w-14 h-14 rounded-full mr-4 object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full mr-4 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400 text-lg font-semibold">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <Link 
                        href={`/politicians/${member.id}`}
                        className="font-medium text-gray-900 hover:text-blue-800 dark:text-white dark:hover:text-blue-400"
                      >
                        {member.name}
                      </Link>
                      {member.role && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                      )}
                    </div>
                  </div>
                  {member.profile_summary && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {member.profile_summary}
                    </p>
                  )}
                  <div className="mt-3">
                    <Link 
                      href={`/politicians/${member.id}`}
                      className="text-sm font-medium text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      詳細を見る →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* もっと見るボタン */}
            <div className="mt-8 flex justify-center">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                もっと見る
              </button>
            </div>
          </div>
        )}
        
        {/* 発言タブ */}
        {activeTab === 'statements' && (
          <div className="space-y-6">
            {statements.length > 0 ? (
              statements.map((statement) => {
                const politician = mockPoliticians.find(p => p.id === statement.politician_id);
                return (
                  <div 
                    key={statement.id}
                    className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    {/* 政治家情報 */}
                    {politician && (
                      <div className="flex items-center mb-4">
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
                          {politician.role && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">{politician.role}</p>
                          )}
                        </div>
                      </div>
                    )}
                    
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
                );
              })
            ) : (
              <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  この政党の発言はまだ登録されていません。
                </p>
              </div>
            )}
            
            {statements.length > 0 && (
              <div className="mt-8 flex justify-center">
                <Link 
                  href={`/parties/${partyId}/statements`}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  すべての発言を見る
                </Link>
              </div>
            )}
          </div>
        )}
        
        {/* 政策タブ */}
        {activeTab === 'policies' && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            {/* マニフェスト */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">マニフェスト</h2>
              <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
                <pre className="text-gray-700 dark:text-gray-300 whitespace-pre-line font-sans">
                  {party.manifesto}
                </pre>
              </div>
            </div>
            
            {/* 政策分野別の立場 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">政策分野別の立場</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {policyAreas.map((area) => (
                  <div key={area.id} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <span className="text-2xl mr-2">{area.icon}</span>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{area.name}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {party.id === 1 && area.id === 1 && 'デジタル技術を活用した新しい経済成長モデルの構築と、地方経済の活性化を目指します。'}
                      {party.id === 1 && area.id === 4 && '経済成長と環境保護の両立を目指し、再生可能エネルギーの推進と脱炭素社会の実現に取り組みます。'}
                      {party.id === 1 && area.id === 7 && '行政のデジタル化とデジタル人材の育成を推進し、社会全体のDXを加速させます。'}
                      {party.id === 1 && area.id === 8 && 'リモートワークの推進と地方移住支援により、地方の人口減少対策と活性化を図ります。'}
                      
                      {party.id === 2 && area.id === 5 && '教育の無償化を段階的に実現し、すべての子どもたちに平等な教育機会を提供します。'}
                      {party.id === 2 && area.id === 6 && '医療・介護サービスの充実と年金制度の安定化により、安心できる社会保障制度を構築します。'}
                      {party.id === 2 && area.id === 1 && '中小企業支援と地域経済の活性化により、雇用の安定と賃金の引き上げを実現します。'}
                      
                      {((party.id === 1 && ![1, 4, 7, 8].includes(area.id)) || (party.id === 2 && ![1, 5, 6].includes(area.id))) && 
                        '詳細な政策は準備中です。'}
                    </p>
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