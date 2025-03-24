'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@/lib/api/context/ApiContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * 認証が必要なページを保護するためのコンポーネント
 * 認証されていないユーザーがアクセスしようとした場合、ログインページにリダイレクトする
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { auth } = useApi();

  useEffect(() => {
    // 認証状態のロード中は何もしない
    if (auth.isLoading) {
      return;
    }

    // 認証されていない場合はログインページにリダイレクト
    if (!auth.isAuthenticated) {
      // 現在のURLをクエリパラメータとして渡し、ログイン後に元のページに戻れるようにする
      const returnUrl = encodeURIComponent(window.location.pathname);
      router.push(`/login?returnUrl=${returnUrl}`);
    }
  }, [auth.isAuthenticated, auth.isLoading, router]);

  // 認証状態のロード中はローディング表示
  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800 dark:border-blue-400"></div>
      </div>
    );
  }

  // 認証されていない場合は何も表示しない（リダイレクト中）
  if (!auth.isAuthenticated) {
    return null;
  }

  // 認証されている場合は子コンポーネントを表示
  return <>{children}</>;
}