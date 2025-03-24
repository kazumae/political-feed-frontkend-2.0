'use client';

export default function MaintenancePage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="flex justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-blue-800 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            メンテナンス中
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            現在、システムメンテナンスを実施しています。<br />
            ご不便をおかけして申し訳ありませんが、しばらくお待ちください。
          </p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            メンテナンス情報
          </h3>
          <ul className="text-left text-gray-600 dark:text-gray-400 space-y-2">
            <li className="flex">
              <span className="font-medium w-32">開始時間:</span>
              <span>2025年3月22日 03:00</span>
            </li>
            <li className="flex">
              <span className="font-medium w-32">終了予定:</span>
              <span>2025年3月22日 07:00</span>
            </li>
            <li className="flex">
              <span className="font-medium w-32">影響範囲:</span>
              <span>全サービス</span>
            </li>
            <li className="flex">
              <span className="font-medium w-32">作業内容:</span>
              <span>システムアップデート、データベースメンテナンス</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <a
            href="javascript:window.location.reload(true)"
            className="inline-flex items-center justify-center w-full px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            ページを再読み込み
          </a>
        </div>

        <div className="mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            お問い合わせは
            <a
              href="mailto:support@example.com"
              className="text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              support@example.com
            </a>
            までご連絡ください。
          </p>
        </div>
      </div>
    </div>
  );
}