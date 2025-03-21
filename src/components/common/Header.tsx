'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
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
            
            {/* ログインボタン */}
            <Link 
              href="/login" 
              className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              ログイン
            </Link>
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
          
          {/* モバイルログインボタン */}
          <div className="px-3 py-2">
            <Link 
              href="/login" 
              className="block w-full px-4 py-2 text-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              ログイン
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}