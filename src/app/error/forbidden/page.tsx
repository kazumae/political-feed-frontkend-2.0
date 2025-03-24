'use client';

import Link from 'next/link';

export default function ForbiddenPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <h1 className="text-9xl font-extrabold text-red-600 dark:text-red-500">403</h1>
          <div className="h-1.5 w-16 bg-red-600 dark:bg-red-500 mx-auto my-4"></div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            アクセス権限がありません
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            このページにアクセスするための権限がありません。
            ログインが必要な可能性があります。
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/login"
            className="inline-flex items-center justify-center w-full px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            ログイン
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-5 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            ホームページに戻る
          </Link>
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