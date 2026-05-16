import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useLPListQuery from "../hooks/useLPListQuery";
import { PAGINATION_ORDER } from "../enums/common";
import CreateLPModal from "../components/CreateLPModal";

interface LpItem {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  likes: { id: number }[];
}

function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-700 rounded-xl aspect-square" />
  );
}

function LpCard({
  lp,
  onClick,
}: {
  lp: LpItem;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const uploadDate = new Date(lp.createdAt).toLocaleDateString(
    "ko-KR",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div
      className="relative rounded-xl overflow-hidden cursor-pointer aspect-square bg-gray-800"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover transition-transform duration-300 ${
          hovered ? "scale-110" : "scale-100"
        }`}
      />

      <div
        className={`absolute inset-0 bg-black/60 flex flex-col justify-end p-3 transition-opacity duration-300 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-white font-bold text-sm truncate">
          {lp.title}
        </p>

        <p className="text-gray-300 text-xs mt-1">
          {uploadDate}
        </p>

        <p className="text-pink-400 text-xs mt-1">
          ❤️ {lp.likes.length}
        </p>
      </div>
    </div>
  );
}

export default function LPListPage() {
  const navigate = useNavigate();

  const [order, setOrder] =
    useState<PAGINATION_ORDER>(PAGINATION_ORDER.DESC);

  const [isCreateModalOpen, setIsCreateModalOpen] =
    useState(false);

  const {
    data,
    isLoading,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useLPListQuery(order);

  const lpList: LpItem[] =
    data?.pages.flatMap((page) => page.data.data) ?? [];

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const el = sentinelRef.current;

    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <div className="p-6 text-white min-h-screen">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            🎵 LP 목록
          </h1>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setOrder(PAGINATION_ORDER.ASC)
              }
              className={`px-4 py-1.5 rounded-full text-sm transition ${
                order === PAGINATION_ORDER.ASC
                  ? "bg-pink-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              오래된순
            </button>

            <button
              onClick={() =>
                setOrder(PAGINATION_ORDER.DESC)
              }
              className={`px-4 py-1.5 rounded-full text-sm transition ${
                order === PAGINATION_ORDER.DESC
                  ? "bg-pink-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              최신순
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center h-60 gap-4">
            <p className="text-gray-400">
              데이터를 불러오지 못했어요 😢
            </p>

            <button
              onClick={() => refetch()}
              className="px-5 py-2 bg-pink-500 rounded-full text-white hover:bg-pink-600 transition"
            >
              다시 시도
            </button>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {lpList.length === 0 ? (
              <p className="text-gray-400 text-center mt-20">
                LP가 없어요. 첫 번째로 올려보세요! 🎶
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {lpList.map((lp) => (
                  <LpCard
                    key={lp.id}
                    lp={lp}
                    onClick={() =>
                      navigate(`/lp/${lp.id}`)
                    }
                  />
                ))}
              </div>
            )}

            {/* 무한스크롤 트리거 */}
            <div
              ref={sentinelRef}
              className="h-2"
            />

            {/* 추가 로딩 */}
            {isFetchingNextPage && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                {Array.from({ length: 4 }).map(
                  (_, i) => (
                    <SkeletonCard key={i} />
                  )
                )}
              </div>
            )}
          </>
        )}

        {/* 플로팅 버튼 */}
        <button
          onClick={() =>
            setIsCreateModalOpen(true)
          }
          className="fixed bottom-8 right-8 w-14 h-14 bg-pink-500 rounded-full text-white text-3xl shadow-lg hover:bg-pink-600 transition flex items-center justify-center"
          aria-label="LP 추가"
        >
          +
        </button>
      </div>

      {/* 모달 */}
      {isCreateModalOpen && (
        <CreateLPModal
          onClose={() =>
            setIsCreateModalOpen(false)
          }
        />
      )}
    </>
  );
}