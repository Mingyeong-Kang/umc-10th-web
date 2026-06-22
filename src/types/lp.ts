export interface Me {
  id: number;
  nickname: string;
  email?: string;
  bio?: string;
  image?: string;
}

export interface LP {
  id: number;
  title: string;
  content?: string | null;
  thumbnail?: string | null;
  published?: boolean;
  authorId?: number | null;
  author?: string | null;
  createdAt?: string;
  likes?: number;
  isLiked?: boolean;
  likedByMe?: boolean;
  tags?: string[];
}

export interface LPComment {
  id: number;
  content: string;
  authorName?: string | null;
  authorId?: number | null;
  lpId?: number;
  createdAt?: string;
  isMine?: boolean;
}

export interface InfiniteListResult<T> {
  items: T[];
  hasNext: boolean;
  nextPage?: number;
}
