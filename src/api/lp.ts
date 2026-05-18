import type { InfiniteListResult, LP, LPComment } from "../types/lp";
import { mockComments, mockLPs, sleep } from "./mockDb";

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

  const items = sorted.slice(start, end).map((lp) => ({ ...lp }));
  const hasNext = end < sorted.length;
  const nextPage = hasNext ? pageParam + 1 : undefined;

  return {
    items,
    hasNext,
    nextPage,
  };
}

export async function getLPDetail(lpId: number | string): Promise<LP> {
  await sleep(300);

  const target = mockLPs.find((lp) => lp.id === Number(lpId));

  if (!target) {
    throw new Error("해당 LP를 찾을 수 없습니다.");
  }

  return { ...target };
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
  await sleep(300);

  const all = [...(mockComments[Number(lpId)] ?? [])].map((comment) => ({
    ...comment,
  }));

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