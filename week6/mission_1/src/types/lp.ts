export interface Tag {
  id: number;
  name: string;
}

export interface Like {
  id: number;
  userId: number;
  lpId: number;
}

export interface Lp {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
  likes: Like[];
}

export interface LpAuthor {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LpDetail extends Lp {
  author: LpAuthor;
}

export interface LpListData {
  data: Lp[];
  nextCursor: number;
  hasNext: boolean;
}

export interface ServerResponse<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export type SortOrder = "desc" | "asc";
