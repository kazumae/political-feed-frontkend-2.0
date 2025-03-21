/**
 * 政治家関連の型定義
 */

// 政治家基本情報
export interface Politician {
  id: string;
  name: string;
  name_kana: string | null;
  current_party_id: string | null;
  role: string | null;
  status: string;
  image_url: string | null;
  profile_summary: string | null;
  created_at: string;
  updated_at: string;
}

// 政治家詳細情報
export interface PoliticianDetail {
  birth_date: string | null;
  birth_place: string | null;
  education: string | null; // JSON文字列
  career: string | null; // JSON文字列
  election_history: string | null; // JSON文字列
  website_url: string | null;
  social_media: string | null; // JSON文字列
  additional_info: string | null; // JSON文字列
  politician_id: string;
  created_at: string;
  updated_at: string;
}

// 政治家所属政党履歴
export interface PoliticianParty {
  id: string;
  politician_id: string;
  party_id: string;
  joined_date: string | null;
  left_date: string | null;
  role: string | null;
  is_current: boolean;
  remarks: string | null;
  created_at: string;
  updated_at: string;
}

// 政治家詳細情報（詳細情報と政党履歴を含む）
export interface PoliticianWithDetails extends Politician {
  details: PoliticianDetail | null;
  party_history: PoliticianParty[];
}

// 政治家のトピックに対するスタンス
export interface PoliticianTopicStance {
  topic_id: string;
  topic_name: string;
  topic_slug: string;
  stance: string; // support, oppose, neutral, unknown
  confidence: number; // 0-100
  summary: string | null;
  last_updated: string | null;
}

// 政治家のトピック別スタンス一覧
export interface PoliticianTopicStances {
  politician_id: string;
  politician_name: string;
  topics: PoliticianTopicStance[];
}

// 政治家一覧取得パラメータ
export interface GetPoliticiansParams {
  skip?: number;
  limit?: number;
  status?: string;
  party_id?: string;
  search?: string;
}

// 政治家作成リクエスト
export interface PoliticianCreateRequest {
  name: string;
  name_kana?: string;
  current_party_id?: string;
  role?: string;
  status?: string;
  image_url?: string;
  profile_summary?: string;
}

// 政治家更新リクエスト
export interface PoliticianUpdateRequest {
  name?: string;
  name_kana?: string;
  current_party_id?: string;
  role?: string;
  status?: string;
  image_url?: string;
  profile_summary?: string;
}

// 政治家詳細作成リクエスト
export interface PoliticianDetailCreateRequest {
  birth_date?: string;
  birth_place?: string;
  education?: string;
  career?: string;
  election_history?: string;
  website_url?: string;
  social_media?: string;
  additional_info?: string;
}

// 政治家詳細更新リクエスト
export interface PoliticianDetailUpdateRequest {
  birth_date?: string;
  birth_place?: string;
  education?: string;
  career?: string;
  election_history?: string;
  website_url?: string;
  social_media?: string;
  additional_info?: string;
}

// 政治家所属政党履歴作成リクエスト
export interface PoliticianPartyCreateRequest {
  politician_id: string;
  party_id: string;
  joined_date?: string;
  left_date?: string;
  role?: string;
  is_current?: boolean;
  remarks?: string;
}

// 政治家所属政党履歴更新リクエスト
export interface PoliticianPartyUpdateRequest {
  joined_date?: string;
  left_date?: string;
  role?: string;
  is_current?: boolean;
  remarks?: string;
}