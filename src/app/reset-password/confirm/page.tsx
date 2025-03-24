'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useApi } from '@/lib/api/context/ApiContext';

export default function ConfirmResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { auth } = useApi();
  
  // URLからトークンを取得
  const token = searchParams.get('token');
  
  // フォーム状態
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // フォームバリデーション
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  
  // パスワード強度
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);
  
  // トークンの存在確認
  useEffect(() => {
    if (!token) {
      setError('無効なリセットリンクです。パスワードリセットを再度リクエストしてください。');
    }
  }, [token]);
  
  // パスワードのバリデーション
  const validatePassword = (password: string): boolean => {
    if (!password) {
      setPasswordError('パスワードを入力してください');
      setPasswordStrength(null);
      return false;
    } else if (password.length < 8) {
      setPasswordError('パスワードは8文字以上で入力してください');
      setPasswordStrength('weak');
      return false;
    }
    
    // パスワード強度の評価
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (hasLetter && hasNumber && hasSymbol) {
      setPasswordStrength('strong');
    } else if ((hasLetter && hasNumber) || (hasLetter && hasSymbol) || (hasNumber && hasSymbol)) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('weak');
    }
    
    if (!(hasLetter && hasNumber && hasSymbol)) {
      setPasswordError('英字、数字、記号をそれぞれ1文字以上含めてください');
      return false;
    }
    
    setPasswordError(null);
    return true;
  };
  
  // パスワード確認のバリデーション
  const validateConfirmPassword = (confirmPassword: string): boolean => {
    if (!confirmPassword) {
      setConfirmPasswordError('確認用パスワードを入力してください');
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('パスワードが一致しません');
      return false;
    }
    
    setConfirmPasswordError(null);
    return true;
  };
  
  // フォーム送信処理
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      setError('無効なリセットリンクです。パスワードリセットを再度リクエストしてください。');
      return;
    }
    
    // バリデーション
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    
    if (!isPasswordValid || !isConfirmPasswordValid) {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // パスワードリセット確認処理
      const result = await auth.confirmPasswordReset(token, password);
      
      if (result.success) {
        // リセット成功時の処理
        setSuccess(true);
        // 3秒後にログイン画面にリダイレクト
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        // エラーメッセージの設定
        setError(result.error || 'パスワードリセットに失敗しました');
      }
    } catch (err) {
      setError('パスワードリセット処理中にエラーが発生しました');
      console.error('Password reset confirmation error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          新しいパスワードの設定
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          新しいパスワードを入力してください。
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* エラーメッセージ */}
          {error && (
            <div className="mb-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* 成功メッセージ */}
          {success && (
            <div className="mb-4 bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-green-700 dark:text-green-200">
                    パスワードが正常にリセットされました。ログイン画面に移動します...
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {!token ? (
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                無効なリセットリンクです。パスワードリセットを再度リクエストしてください。
              </p>
              <Link
                href="/reset-password"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                パスワードリセットを再リクエスト
              </Link>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* パスワード入力 */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  新しいパスワード
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                    onBlur={() => validatePassword(password)}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      passwordError ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white`}
                    placeholder="新しいパスワード（8文字以上）"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                  {passwordError && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{passwordError}</p>
                  )}
                </div>
                
                {/* パスワード強度インジケーター */}
                {password && (
                  <div className="mt-2">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div 
                          className={`h-2.5 rounded-full ${
                            passwordStrength === 'weak' ? 'w-1/3 bg-red-500' : 
                            passwordStrength === 'medium' ? 'w-2/3 bg-yellow-500' : 
                            passwordStrength === 'strong' ? 'w-full bg-green-500' : ''
                          }`}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        {passwordStrength === 'weak' ? '弱' : 
                         passwordStrength === 'medium' ? '中' : 
                         passwordStrength === 'strong' ? '強' : ''}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* パスワード確認入力 */}
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  新しいパスワード（確認）
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => validateConfirmPassword(confirmPassword)}
                    className={`appearance-none block w-full px-3 py-2 border ${
                      confirmPasswordError ? 'border-red-300 dark:border-red-700' : 'border-gray-300 dark:border-gray-700'
                    } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white`}
                    placeholder="新しいパスワード（確認）"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                  {confirmPasswordError && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{confirmPasswordError}</p>
                  )}
                </div>
              </div>

              {/* 送信ボタン */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading || success}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  パスワードを変更
                </button>
              </div>
            </form>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                ログイン画面に戻る
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}