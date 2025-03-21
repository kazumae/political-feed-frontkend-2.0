import { useState, useCallback } from 'react';
import apiClient from '../client';
import config from '@/config';
import {
  Politician,
  PoliticianWithDetails,
  PoliticianTopicStances,
  GetPoliticiansParams,
} from '../types/politician';

/**
 * 政治家関連のhook
 * 政治家一覧の取得、詳細の取得、フォロー/アンフォローなどの機能を提供
 */
export const usePoliticians = () => {
  // ローディング状態
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // エラーメッセージ
  const [error, setError] = useState<string | null>(null);

  /**
   * 政治家一覧を取得
   * @param params 取得パラメータ
   * @returns 政治家一覧
   */
  const getPoliticians = useCallback(async (params?: GetPoliticiansParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const politicians = await apiClient.get<Politician[]>(
        config.api.endpoints.politicians.list,
        params as Record<string, unknown>
      );
      setIsLoading(false);
      return politicians;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '政治家一覧の取得に失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return [];
    }
  }, []);

  /**
   * 政治家詳細を取得
   * @param id 政治家ID
   * @returns 政治家詳細
   */
  const getPoliticianById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const politician = await apiClient.get<PoliticianWithDetails>(
        config.api.endpoints.politicians.byId(id)
      );
      setIsLoading(false);
      return politician;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '政治家詳細の取得に失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  }, []);

  /**
   * 政治家のトピック別スタンスを取得
   * @param politicianId 政治家ID
   * @returns トピック別スタンス
   */
  const getPoliticianTopics = useCallback(async (politicianId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const topics = await apiClient.get<PoliticianTopicStances>(
        config.api.endpoints.politicians.topics(politicianId)
      );
      setIsLoading(false);
      return topics;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '政治家のトピック別スタンスの取得に失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  }, []);

  /**
   * 政治家をフォロー
   * @param politicianId 政治家ID
   * @returns フォロー結果
   */
  const followPolitician = useCallback(async (politicianId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiClient.post(
        config.api.endpoints.politicians.follow(politicianId)
      );
      setIsLoading(false);
      return { success: true, result };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '政治家のフォローに失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * 政治家のフォローを解除
   * @param politicianId 政治家ID
   * @returns フォロー解除結果
   */
  const unfollowPolitician = useCallback(async (politicianId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiClient.delete(
        config.api.endpoints.politicians.follow(politicianId)
      );
      setIsLoading(false);
      return { success: true, result };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '政治家のフォロー解除に失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * 特定の政党に所属する政治家一覧を取得
   * @param partyId 政党ID
   * @param params 取得パラメータ
   * @returns 政治家一覧
   */
  const getPoliticiansByParty = useCallback(async (partyId: string, params?: { skip?: number; limit?: number; role?: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const politicians = await apiClient.get<Politician[]>(
        config.api.endpoints.parties.politicians(partyId),
        params as Record<string, unknown>
      );
      setIsLoading(false);
      return politicians;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '政党に所属する政治家一覧の取得に失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return [];
    }
  }, []);

  return {
    isLoading,
    error,
    getPoliticians,
    getPoliticianById,
    getPoliticianTopics,
    followPolitician,
    unfollowPolitician,
    getPoliticiansByParty,
  };
};