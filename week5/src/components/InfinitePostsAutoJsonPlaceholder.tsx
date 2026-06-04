import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

const PAGE_SIZE = 10;

async function fetchPosts({
  pageParam = 1,
}: {
  pageParam?: number;
}) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${PAGE_SIZE}`
  );

  if (!res.ok) {
    throw new Error("네트워크 에러");
  }

  return (await res.json()) as Post[];
}

export default function InfinitePostsAutoJsonPlaceholder() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts", PAGE_SIZE],

    queryFn: ({ pageParam }) =>
      fetchPosts({ pageParam }),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE
        ? undefined
        : allPages.length + 1,
  });

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const el = sentinelRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];

        if (
          first.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  ]);

  if (isLoading) {
    return (
      <div className="text-white p-4">
        로딩 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        에러 발생!
      </div>
    );
  }

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">
        무한 스크롤
      </h1>

      <div className="space-y-4">
        {data?.pages.map((page, idx) => (
          <div key={idx}>
            {page.map((post) => (
              <div
                key={post.id}
                className="border border-gray-700 rounded p-4 mb-4"
              >
                <h2 className="font-bold mb-2">
                  #{post.id} {post.title}
                </h2>

                <p className="text-gray-300">
                  {post.body}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div
        ref={sentinelRef}
        className="h-2"
      />

      <div className="text-center py-4 text-gray-400">
        {isFetchingNextPage
          ? "불러오는 중..."
          : hasNextPage
          ? "스크롤을 내려주세요"
          : "마지막 페이지입니다"}
      </div>
    </div>
  );
}