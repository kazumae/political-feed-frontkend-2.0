/**
 * 発言関連の型定義
 */

// 発言基本情報
export interface Statement {
  id: string;
  politician_id: string;
  politician_name: string | null;
  party_id: string | null;
  party_name: string | null;
  title: string;
  content: string;
  source: string | null;
  source_url: string | null;
  statement_date: string;
  context: string | null;
  status: string;
  importance: number;
  likes_count: number;
  comments_count: number;
  created_at: string;
  updated_at: string;
  is_liked: boolean | null;
}

// 発言に関連するトピック情報
export interface StatementTopic {
  id: string;
  name: string;
  slug: string;
  category: string;
  relevance: number;
}

// 発言詳細情報（トピック情報を含む）
export interface StatementDetail extends Statement {
  topics: StatementTopic[];
}

// 発言一覧
export interface StatementList {
  total: number;
  statements: Statement[];
  next_cursor: string | null;
}

// 発言一覧取得パラメータ
export interface GetStatementsParams {
  skip?: number;
  limit?: number;
  sort?: 'date_desc' | 'date_asc' | 'likes';
  filter_party?: string;
  filter_topic?: string;
  filter_date_start?: string;
  filter_date_end?: string;
  search?: string;
}

// 発言作成リクエスト
export interface StatementCreateRequest {
  politician_id: string;
  title: string;
  content: string;
  source?: string;
  source_url?: string;
  statement_date: string;
  context?: string;
  status?: string;
  importance?: number;
  topic_ids?: string[];
}

// 発言更新リクエスト
export interface StatementUpdateRequest {
  politician_id?: string;
  title?: string;
  content?: string;
  source?: string;
  source_url?: string;
  statement_date?: string;
  context?: string;
  status?: string;
  importance?: number;
  topic_ids?: string[];
}