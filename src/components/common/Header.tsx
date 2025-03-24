'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useApi } from '@/lib/api/context/ApiContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const { auth } = useApi();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // ユーザーメニューの外側をクリックしたときに閉じる
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // ログアウト処理
  const handleLogout = async () => {
    await auth.logout();
    setIsUserMenuOpen(false);
    router.push('/');
  };
  
  return (
    <header className="bg-white shadow-sm dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* ロゴ */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-800 dark:text-blue-400">
              政治家フィード
            </Link>
          </div>
          
          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-blue-800 dark:text-gray-300 dark:hover:text-blue-400">
              ホーム
            </Link>
            <Link href="/politicians" className="text-gray-700 hover:text-blue-800 dark:text-gray-300 dark:hover:text-blue-400">
              政治家
            </Link>
            <Link href="/parties" className="text-gray-700 hover:text-blue-800 dark:text-gray-300 dark:hover:text-blue-400">
              政党
            </Link>
            <Link href="/topics" className="text-gray-700 hover:text-blue-800 dark:text-gray-300 dark:hover:text-blue-400">
              政策トピック
            </Link>
          </nav>
          
          {/* 検索ボックスとユーザーメニュー */}
          <div className="hidden md:flex items-center">
            {/* 検索ボックス */}
            <div className="relative mr-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-500 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg p-2">
                  <input
                    type="text"
                    placeholder="キーワードを入力..."
                    className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
              )}
            </div>
            
            {/* 認証状態に応じたボタン表示 */}
            {auth.isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center text-gray-700 hover:text-blue-800 dark:text-gray-300 dark:hover:text-blue-400"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-800 dark:bg-blue-700 flex items-center justify-center text-white">
                    {auth.user?.username.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="ml-2">{auth.user?.username || 'ユーザー'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1">
                    <Link
                      href="/mypage"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      マイページ
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      設定
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      ログアウト
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  href="/login"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                >
                  ログイン
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
                >
                  新規登録
                </Link>
              </div>
            )}
          </div>
          
          {/* モバイルメニューボタン */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-400"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* モバイルメニュー */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800"
          >
            ホーム
          </Link>
          <Link
            href="/politicians"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800"
          >
            政治家
          </Link>
          <Link
            href="/parties"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800"
          >
            政党
          </Link>
          <Link
            href="/topics"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-800 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800"
          >
            政策トピック
          </Link>
          
          {/* モバイル検索ボックス */}
          <div className="px-3 py-2">
            <input
              type="text"
              placeholder="キーワードを入力..."
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          {/* 認証状態に応じたモバイルボタン表示 */}
          {auth.isAuthenticated ? (
            <div className="px-3 py-2 space-y-1">
              <Link
                href="/mypage"
                className="block w-full px-4 py-2 text-left border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                マイページ
              </Link>
              <Link
                href="/settings"
                className="block w-full px-4 py-2 text-left border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                設定
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600"
              >
                ログアウト
              </button>
            </div>
          ) : (
            <div className="px-3 py-2 space-y-2">
              <Link
                href="/login"
                className="block w-full px-4 py-2 text-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
              >
                ログイン
              </Link>
              <Link
                href="/register"
                className="block w-full px-4 py-2 text-center border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                新規登録
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}