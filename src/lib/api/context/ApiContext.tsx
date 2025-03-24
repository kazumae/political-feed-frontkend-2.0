'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { usePoliticians } from '../hooks/usePoliticians';
import { useStatements } from '../hooks/useStatements';
import { useTopics } from '../hooks/useTopics';

// APIコンテキストの型定義
interface ApiContextType {
  auth: ReturnType<typeof useAuth>;
  politicians: ReturnType<typeof usePoliticians>;
  statements: ReturnType<typeof useStatements>;
  topics: ReturnType<typeof useTopics>;
}

// APIコンテキストの作成
const ApiContext = createContext<ApiContextType | undefined>(undefined);

// APIコンテキストプロバイダーのプロパティ
interface ApiProviderProps {
  children: ReactNode;
}

/**
 * APIコンテキストプロバイダー
 * アプリケーション全体でAPIクライアントとhookを使用できるようにする
 */
export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  // 各hookの初期化
  const auth = useAuth();
  const politicians = usePoliticians();
  const statements = useStatements();
  const topics = useTopics();

  // コンテキスト値の作成
  const value: ApiContextType = {
    auth,
    politicians,
    statements,
    topics,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

/**
 * APIコンテキストを使用するためのhook
 * @returns APIコンテキスト
 */
export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};