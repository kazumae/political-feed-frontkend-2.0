import { useState, useCallback } from 'react';
import apiClient from '../client';
import config from '@/config';
import {
  Topic,
  TopicWithDetails,
  GetTopicsParams,
  TrendingTopic
} from '../types/topic';

/**
 * トピック関連のhook
 * トピック一覧の取得、詳細の取得、フォロー/アンフォローなどの機能を提供
 */
export const useTopics = () => {
  // ローディング状態
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // エラーメッセージ
  const [error, setError] = useState<string | null>(null);

  /**
   * トピック一覧を取得
   * @param params 取得パラメータ
   * @returns トピック一覧
   */
  const getTopics = useCallback(async (params?: GetTopicsParams) => {
    setIsLoading(true);
    setError(null);

    try {
      const topics = await apiClient.get<Topic[]>(
        config.api.endpoints.topics.list,
        params as Record<string, unknown>
      );
      setIsLoading(false);
      return topics;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'トピック一覧の取得に失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return [];
    }
  }, []);

  /**
   * トピック詳細を取得
   * @param id トピックID
   * @returns トピック詳細
   */
  const getTopicById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const topic = await apiClient.get<TopicWithDetails>(
        config.api.endpoints.topics.byId(id)
      );
      setIsLoading(false);
      return topic;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'トピック詳細の取得に失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return null;
    }
  }, []);

  /**
   * トレンドトピックを取得
   * @param limit 取得数
   * @returns トレンドトピック一覧
   */
  const getTrendingTopics = useCallback(async (limit: number = 10) => {
    setIsLoading(true);
    setError(null);

    try {
      const topics = await apiClient.get<Topic[]>(
        config.api.endpoints.topics.trending,
        { limit }
      );
      setIsLoading(false);
      return topics;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'トレンドトピックの取得に失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return [];
    }
  }, []);

  /**
   * トピックをフォロー
   * @param topicId トピックID
   * @returns フォロー結果
   */
  const followTopic = useCallback(async (topicId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiClient.post(
        config.api.endpoints.topics.follow(topicId)
      );
      setIsLoading(false);
      return { success: true, result };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'トピックのフォローに失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  }, []);

  /**
   * トピックのフォローを解除
   * @param topicId トピックID
   * @returns フォロー解除結果
   */
  const unfollowTopic = useCallback(async (topicId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiClient.delete(
        config.api.endpoints.topics.follow(topicId)
      );
      setIsLoading(false);
      return { success: true, result };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'トピックのフォロー解除に失敗しました';
      setError(errorMessage);
      setIsLoading(false);
      return { success: false, error: errorMessage };
    }
  }, []);

  return {
    isLoading,
    error,
    getTopics,
    getTopicById,
    getTrendingTopics,
    followTopic,
    unfollowTopic,
  };
};