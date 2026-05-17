import type { InfiniteListResult, LP, LPComment } from "../types/lp";

const mockLPs: LP[] = [
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
  },
];

const mockComments: Record<number, LPComment[]> = {
  1: Array.from({ length: 23 }).map((_, idx) => ({
    id: idx + 1,
    content: `Übermensch 댓글 ${idx + 1}`,
    authorName: idx % 2 === 0 ? "연진님" : "익명 사용자",
    createdAt: new Date(Date.now() - idx * 1000 * 60 * 10).toISOString(),
  })),
  2: Array.from({ length: 13 }).map((_, idx) => ({
    id: idx + 101,
    content: `Flower Boy 댓글 ${idx + 1}`,
    authorName: idx % 2 === 0 ? "Tyler 팬" : "LP 유저",
    createdAt: new Date(Date.now() - idx * 1000 * 60 * 7).toISOString(),
  })),
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getLPList({
  pageParam = 1,
  sort = "latest",
}: {
  pageParam?: number;
  sort?: string;
}): Promise<InfiniteListResult<LP>> {
  await sleep(700);

  const sorted = [...mockLPs].sort((a, b) => {
    const timeA = new Date(a.createdAt ?? "").getTime();
    const timeB = new Date(b.createdAt ?? "").getTime();
    return sort === "oldest" ? timeA - timeB : timeB - timeA;
  });

  const pageSize = 4;
  const start = (pageParam - 1) * pageSize;
  const end = start + pageSize;

  const items = sorted.slice(start, end);
  const hasNext = end < sorted.length;
  const nextPage = hasNext ? pageParam + 1 : undefined;

  return {
    items,
    hasNext,
    nextPage,
  };
}

export async function getLPDetail(lpId: number | string): Promise<LP> {
  await sleep(500);

  const target = mockLPs.find((lp) => lp.id === Number(lpId));

  if (!target) {
    throw new Error("해당 LP를 찾을 수 없습니다.");
  }

  return target;
}

export async function getLPComments({
  lpId,
  pageParam = 1,
  order = "latest",
}: {
  lpId: number | string;
  pageParam?: number;
  order?: string;
}): Promise<InfiniteListResult<LPComment>> {
  await sleep(600);

  const all = [...(mockComments[Number(lpId)] ?? [])];

  all.sort((a, b) => {
    const timeA = new Date(a.createdAt ?? "").getTime();
    const timeB = new Date(b.createdAt ?? "").getTime();
    return order === "oldest" ? timeA - timeB : timeB - timeA;
  });

  const pageSize = 6;
  const start = (pageParam - 1) * pageSize;
  const end = start + pageSize;

  const items = all.slice(start, end);
  const hasNext = end < all.length;
  const nextPage = hasNext ? pageParam + 1 : undefined;

  return {
    items,
    hasNext,
    nextPage,
  };
}