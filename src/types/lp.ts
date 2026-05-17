export interface LP {
  id: number;
  title: string;
  content?: string | null;
  thumbnail?: string | null;
  published?: boolean;
  authorId?: number | null;
  author?: string | null;
  createdAt?: string;
}

export interface LPComment {
  id: number;
  content: string;
  authorName?: string | null;
  createdAt?: string;
}

export interface InfiniteListResult<T> {
  items: T[];
  hasNext: boolean;
  nextPage?: number;
}