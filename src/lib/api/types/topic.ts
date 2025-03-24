/**
 * トピック関連の型定義
 */

// トピック基本情報
export interface Topic {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  importance: number;
  icon_url: string | null;
  color_code: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

// トピック関連情報
export interface TopicRelation {
  id: string;
  name: string;
  slug: string;
  relation_type: string;
  strength: number;
}

// トピック詳細情報（関連トピック情報を含む）
export interface TopicWithDetails extends Topic {
  related_topics: TopicRelation[];
  is_following: boolean | null;
}

// トピック一覧取得パラメータ
export interface GetTopicsParams {
  skip?: number;
  limit?: number;
  status?: string;
  category?: string;
  search?: string;
}

// トレンドトピック
export interface TrendingTopic {
  id: string;
  name: string;
  count: number;
  slug?: string;
  category?: string;
  icon_url?: string | null;
  color_code?: string | null;
}