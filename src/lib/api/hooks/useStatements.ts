import { useState, useCallback } from 'react';
import apiClient from '../client';
import config from '@/config';
import {
  StatementDetail,
  StatementList,
  GetStatementsParams,
} from '../types/statement';

/**
 * 発言関連のhook
 * 発言一覧の取得、詳細の取得、いいね/いいね解除などの機能を提供
 */
export const useStatements = () => {
  // ローディング状態
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // エラーメッセージ
  const [error, setError] = useState<string | null>(null);

  /**
   * 発言一覧を取得
   * @param params 取得パラメータ
   * @returns 発言一覧
   */
  const getStatements = useCallback(async (params?: GetStatementsParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const statements = await apiClient.get<StatementList>(
        config.api.endpoints.statements.list,
        params as Record<string, unknown>
      );
      setIsLoading(false);
      return statements;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '発言一覧の取得に失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return { total: 0, statements: [], next_cursor: null };
    }
  }, []);

  /**
   * フォロー中の政治家の発言一覧を取得
   * @param params 取得パラメータ
   * @returns 発言一覧
   */
  const getFollowingStatements = useCallback(async (params?: { skip?: number; limit?: number; sort?: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const statements = await apiClient.get<StatementList>(
        config.api.endpoints.statements.following,
        params as Record<string, unknown>
      );
      setIsLoading(false);
      return statements;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'フォロー中の政治家の発言一覧の取得に失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return { total: 0, statements: [], next_cursor: null };
    }
  }, []);

  /**
   * 発言詳細を取得
   * @param statementId 発言ID
   * @returns 発言詳細
   */
  const getStatementById = useCallback(async (statementId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const statement = await apiClient.get<StatementDetail>(
        config.api.endpoints.statements.byId(statementId)
      );
      setIsLoading(false);
      return statement;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '発言詳細の取得に失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  }, []);

  /**
   * 特定の政治家の発言一覧を取得
   * @param politicianId 政治家ID
   * @param params 取得パラメータ
   * @returns 発言一覧
   */
  const getStatementsByPolitician = useCallback(async (
    politicianId: string,
    params?: { skip?: number; limit?: number; sort?: string }
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const statements = await apiClient.get<StatementList>(
        config.api.endpoints.statements.byPolitician(politicianId),
        params as Record<string, unknown>
      );
      setIsLoading(false);
      return statements;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '政治家の発言一覧の取得に失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return { total: 0, statements: [], next_cursor: null };
    }
  }, []);

  /**
   * 特定の政党の発言一覧を取得
   * @param partyId 政党ID
   * @param params 取得パラメータ
   * @returns 発言一覧
   */
  const getStatementsByParty = useCallback(async (
    partyId: string,
    params?: { skip?: number; limit?: number; sort?: string }
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const statements = await apiClient.get<StatementList>(
        config.api.endpoints.statements.byParty(partyId),
        params as Record<string, unknown>
      );
      setIsLoading(false);
      return statements;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '政党の発言一覧の取得に失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return { total: 0, statements: [], next_cursor: null };
    }
  }, []);

  /**
   * 特定のトピックの発言一覧を取得
   * @param topicId トピックID
   * @param params 取得パラメータ
   * @returns 発言一覧
   */
  const getStatementsByTopic = useCallback(async (
    topicId: string,
    params?: { skip?: number; limit?: number; sort?: string }
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const statements = await apiClient.get<StatementList>(
        config.api.endpoints.statements.byTopic(topicId),
        params as Record<string, unknown>
      );
      setIsLoading(false);
      return statements;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'トピックの発言一覧の取得に失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return { total: 0, statements: [], next_cursor: null };
    }
  }, []);

  /**
   * 発言にいいねする
   * @param statementId 発言ID
   * @returns いいね結果
   */
  const likeStatement = useCallback(async (statementId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiClient.post(
        config.api.endpoints.statements.like(statementId)
      );
      setIsLoading(false);
      return { success: true, result };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '発言へのいいねに失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * 発言のいいねを解除する
   * @param statementId 発言ID
   * @returns いいね解除結果
   */
  const unlikeStatement = useCallback(async (statementId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiClient.delete(
        config.api.endpoints.statements.like(statementId)
      );
      setIsLoading(false);
      return { success: true, result };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '発言のいいね解除に失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  }, []);

  return {
    isLoading,
    error,
    getStatements,
    getFollowingStatements,
    getStatementById,
    getStatementsByPolitician,
    getStatementsByParty,
    getStatementsByTopic,
    likeStatement,
    unlikeStatement,
  };
};