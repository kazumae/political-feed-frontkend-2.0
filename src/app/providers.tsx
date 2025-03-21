'use client';

import { ReactNode } from 'react';
import { ApiProvider } from '@/lib/api/context/ApiContext';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * クライアントコンポーネントとしてのプロバイダーラッパー
 * サーバーコンポーネントである layout.tsx でクライアントコンポーネントである ApiProvider を使用するためのラッパー
 */
export function Providers({ children }: ProvidersProps) {
  return <ApiProvider>{children}</ApiProvider>;
}