'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <h1 className="text-9xl font-extrabold text-blue-800 dark:text-blue-400">404</h1>
          <div className="h-1.5 w-16 bg-blue-800 dark:bg-blue-400 mx-auto my-4"></div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ページが見つかりません
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            お探しのページは存在しないか、移動した可能性があります。
            URLが正しいかご確認ください。
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            ホームページに戻る
          </Link>
          
          <div className="flex justify-center space-x-4">
            <Link
              href="/politicians"
              className="text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              政治家一覧
            </Link>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <Link
              href="/parties"
              className="text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              政党一覧
            </Link>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <Link
              href="/topics"
              className="text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              トピック一覧
            </Link>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            問題が解決しない場合は、
            <Link
              href="/contact"
              className="text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              お問い合わせ
            </Link>
            ください。
          </p>
        </div>
      </div>
    </div>
  );
}