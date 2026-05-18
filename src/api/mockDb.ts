import type { LP, LPComment, Me } from "../types/lp";

let currentUser: Me | null = null;

let lpIdSeq = 9;
let commentIdSeq = 1000;

export const mockLPs: LP[] = [
  {
    id: 1,
    title: "Übermensch",
    content: "예시 LP 1입니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200&auto=format&fit=crop",
    published: true,
    authorId: 1,
    author: "오라니안",
    createdAt: "2026-05-17T10:00:00.000Z",
    tags: ["락", "한국"],
    likes: 1,
    likedByMe: false,
  },
  {
    id: 2,
    title: "Flower Boy",
    content: "예시 LP 2입니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
    published: true,
    authorId: 2,
    author: "Tyler, The Creator",
    createdAt: "2026-05-16T10:00:00.000Z",
    tags: ["힙합", "해외"],
    likes: 3,
    likedByMe: false,
  },
  {
    id: 3,
    title: "Blonde",
    content: "예시 LP 3입니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?q=80&w=1200&auto=format&fit=crop",
    published: true,
    authorId: 3,
    author: "Frank Ocean",
    createdAt: "2026-05-15T10:00:00.000Z",
    tags: ["R&B"],
    likes: 6,
    likedByMe: false,
  },
  {
    id: 4,
    title: "Currents",
    content: "예시 LP 4입니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?q=80&w=1200&auto=format&fit=crop",
    published: true,
    authorId: 4,
    author: "Tame Impala",
    createdAt: "2026-05-14T10:00:00.000Z",
    tags: ["록", "인디"],
    likes: 5,
    likedByMe: false,
  },
  {
    id: 5,
    title: "IGOR",
    content: "예시 LP 5입니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    published: true,
    authorId: 2,
    author: "Tyler, The Creator",
    createdAt: "2026-05-13T10:00:00.000Z",
    tags: ["힙합"],
    likes: 10,
    likedByMe: false,
  },
  {
    id: 6,
    title: "DAMN.",
    content: "예시 LP 6입니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?q=80&w=1200&auto=format&fit=crop",
    published: true,
    authorId: 6,
    author: "Kendrick Lamar",
    createdAt: "2026-05-12T10:00:00.000Z",
    tags: ["랩"],
    likes: 8,
    likedByMe: false,
  },
  {
    id: 7,
    title: "Melodrama",
    content: "예시 LP 7입니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1461783436728-0a9217714694?q=80&w=1200&auto=format&fit=crop",
    published: true,
    authorId: 7,
    author: "Lorde",
    createdAt: "2026-05-11T10:00:00.000Z",
    tags: ["팝"],
    likes: 2,
    likedByMe: false,
  },
  {
    id: 8,
    title: "channel ORANGE",
    content: "예시 LP 8입니다.",
    thumbnail:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1200&auto=format&fit=crop",
    published: true,
    authorId: 3,
    author: "Frank Ocean",
    createdAt: "2026-05-10T10:00:00.000Z",
    tags: ["R&B", "해외"],
    likes: 4,
    likedByMe: false,
  },
];

export const mockComments: Record<number, LPComment[]> = {
  1: Array.from({ length: 18 }).map((_, idx) => ({
    id: idx + 1,
    content: `Übermensch 댓글 ${idx + 1}`,
    authorName: idx % 2 === 0 ? "연진님" : "익명 사용자",
    createdAt: new Date(Date.now() - idx * 1000 * 60 * 10).toISOString(),
    lpId: 1,
    authorId: idx % 2 === 0 ? 999 : null,
    isMine: idx % 2 === 0,
  })),
  2: Array.from({ length: 10 }).map((_, idx) => ({
    id: idx + 101,
    content: `Flower Boy 댓글 ${idx + 1}`,
    authorName: idx % 2 === 0 ? "LP 유저" : "Tyler 팬",
    createdAt: new Date(Date.now() - idx * 1000 * 60 * 7).toISOString(),
    lpId: 2,
    authorId: idx % 2 === 0 ? null : 999,
    isMine: idx % 2 !== 0,
  })),
};

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getCurrentUser() {
  return currentUser;
}

export function setCurrentUser(user: Me | null) {
  currentUser = user;
}

export function createLPRecord(input: {
  title: string;
  content?: string;
  thumbnail?: string;
  tags?: string[];
}) {
  const user = currentUser;
  if (!user) throw new Error("로그인이 필요합니다.");

  const newLP: LP = {
    id: lpIdSeq++,
    title: input.title,
    content: input.content ?? "",
    thumbnail: input.thumbnail ?? null,
    published: true,
    authorId: user.id,
    author: user.nickname,
    createdAt: new Date().toISOString(),
    tags: input.tags ?? [],
    likes: 0,
    likedByMe: false,
  };

  mockLPs.unshift(newLP);
  return newLP;
}

export function createCommentRecord(input: {
  lpId: number;
  content: string;
}) {
  const user = currentUser;
  if (!user) throw new Error("로그인이 필요합니다.");

  const newComment: LPComment = {
    id: commentIdSeq++,
    content: input.content,
    authorName: user.nickname,
    createdAt: new Date().toISOString(),
    lpId: input.lpId,
    authorId: user.id,
    isMine: true,
  };

  if (!mockComments[input.lpId]) {
    mockComments[input.lpId] = [];
  }

  mockComments[input.lpId].unshift(newComment);
  return newComment;
}

export function updateCommentRecord(input: {
  lpId: number;
  commentId: number;
  content: string;
}) {
  const comments = mockComments[input.lpId] ?? [];
  const target = comments.find((comment) => comment.id === input.commentId);

  if (!target) throw new Error("댓글을 찾을 수 없습니다.");
  target.content = input.content;
  return { ...target };
}

export function deleteCommentRecord(input: {
  lpId: number;
  commentId: number;
}) {
  const comments = mockComments[input.lpId] ?? [];
  const index = comments.findIndex((comment) => comment.id === input.commentId);

  if (index === -1) throw new Error("댓글을 찾을 수 없습니다.");
  comments.splice(index, 1);
}

export function updateNicknameRecord(input: { nickname: string }) {
  if (!currentUser) throw new Error("로그인이 필요합니다.");
  currentUser.nickname = input.nickname;

  mockLPs.forEach((lp) => {
    if (lp.authorId === currentUser?.id) {
      lp.author = input.nickname;
    }
  });

  Object.values(mockComments).forEach((comments) => {
    comments.forEach((comment) => {
      if (comment.authorId === currentUser?.id) {
        comment.authorName = input.nickname;
      }
    });
  });

  return { ...currentUser };
}