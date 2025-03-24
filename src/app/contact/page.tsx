'use client';

import { useState } from 'react';
import Link from 'next/link';

// お問い合わせフォームの型定義
type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

// 初期値
const initialForm: ContactForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // フォーム入力の変更ハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // 入力時にエラーをクリア
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // バリデーション
  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'お名前を入力してください';
    }
    
    if (!form.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }
    
    if (!form.subject.trim()) {
      newErrors.subject = '件名を入力してください';
    }
    
    if (!form.message.trim()) {
      newErrors.message = 'メッセージを入力してください';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // フォーム送信ハンドラ
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // ここでAPIリクエストを送信する（現在はモック）
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setForm(initialForm);
      }, 1000);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* ページヘッダー */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">お問い合わせ</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            ご質問、ご意見、ご要望などがございましたら、以下のフォームからお気軽にお問い合わせください。
          </p>
        </div>

        {/* 送信完了メッセージ */}
        {isSubmitted ? (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-400 mb-2">
              お問い合わせを受け付けました
            </h2>
            <p className="text-green-700 dark:text-green-300 mb-4">
              お問い合わせいただき、ありがとうございます。内容を確認の上、担当者より折り返しご連絡いたします。
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
            >
              新しいお問い合わせをする
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <form onSubmit={handleSubmit}>
              {/* お名前 */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  お名前 <span className="text-red-600 dark:text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm ${
                    errors.name
                      ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500'
                  } dark:bg-gray-700 dark:text-white`}
                  placeholder="山田太郎"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
              </div>

              {/* メールアドレス */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  メールアドレス <span className="text-red-600 dark:text-red-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm ${
                    errors.email
                      ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500'
                  } dark:bg-gray-700 dark:text-white`}
                  placeholder="example@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
              </div>

              {/* 件名 */}
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  件名 <span className="text-red-600 dark:text-red-400">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm ${
                    errors.subject
                      ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500'
                  } dark:bg-gray-700 dark:text-white`}
                >
                  <option value="">選択してください</option>
                  <option value="サービスについて">サービスについて</option>
                  <option value="アカウントについて">アカウントについて</option>
                  <option value="技術的な問題">技術的な問題</option>
                  <option value="機能の提案">機能の提案</option>
                  <option value="その他">その他</option>
                </select>
                {errors.subject && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>}
              </div>

              {/* メッセージ */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  メッセージ <span className="text-red-600 dark:text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  className={`block w-full rounded-md shadow-sm ${
                    errors.message
                      ? 'border-red-300 dark:border-red-700 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500 dark:focus:ring-red-500'
                      : 'border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500'
                  } dark:bg-gray-700 dark:text-white`}
                  placeholder="お問い合わせ内容を入力してください"
                />
                {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
              </div>

              {/* 送信ボタン */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                    isSubmitting
                      ? 'bg-blue-400 dark:bg-blue-600 cursor-not-allowed'
                      : 'bg-blue-800 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      送信中...
                    </>
                  ) : (
                    '送信する'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 追加情報 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">お問い合わせ先</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              フォーム以外でのお問い合わせは、以下の連絡先までお願いいたします。
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex">
                <svg
                  className="h-6 w-6 text-gray-400 dark:text-gray-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>support@politician-feed.example.com</span>
              </li>
              <li className="flex">
                <svg
                  className="h-6 w-6 text-gray-400 dark:text-gray-500 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>03-1234-5678（平日 9:00-18:00）</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">よくある質問</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              お問い合わせの前に、よくある質問をご確認ください。
            </p>
            <Link
              href="/faq"
              className="text-blue-800 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              よくある質問を見る →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}