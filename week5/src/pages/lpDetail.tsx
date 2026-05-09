import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useLPDetailQuery from "../hooks/useLPDetailQuery";
import useLPCommentsQuery from "../hooks/useLPCommentsQuery";
import { PAGINATION_ORDER } from "../enums/common";

interface Tag { id: number; name: string; }
interface Like { id: number; userId: number; lpId: number; }
interface Author { id: number; name: string; email: string; avatar: string | null; }

interface LpDetail {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  authorId: number;
  author: Author;
  tags: Tag[];
  likes: Like[];
}

interface Comment {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  author: Author;
}

function SkeletonComment() {
  return (
    <div className="animate-pulse flex gap-3 py-3 border-b border-gray-800">
      <div className="w-8 h-8 rounded-full bg-gray-700 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-700 rounded w-24" />
        <div className="h-3 bg-gray-700 rounded w-full" />
      </div>
    </div>
  );
}

const LPDetailPage = () => {
  const { lpid } = useParams();
  const navigate = useNavigate();
  const [commentOrder, setCommentOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.DESC);
  const [commentInput, setCommentInput] = useState("");
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, isError, refetch } = useLPDetailQuery(lpid);
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useLPCommentsQuery(Number(lpid), commentOrder);

  const lp: LpDetail | undefined = data?.data;
  const commentList: Comment[] =
    commentsData?.pages.flatMap((page) => page.data.data) ?? [];

  const uploadDate = lp?.createdAt
    ? new Date(lp.createdAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  useEffect(() => {
    if (!sentinelRef.current) return;
    const el = sentinelRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !lp) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <p className="text-gray-400">데이터를 불러오지 못했어요 😢</p>
        <button
          onClick={() => refetch()}
          className="px-5 py-2 bg-pink-500 rounded-full text-white hover:bg-pink-600 transition"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-white">
      {/* 뒤로가기 */}
      <button
        onClick={() => navigate(-1)}
        className="text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-1 transition"
      >
        ← 목록으로
      </button>

      {/* 작성자 + 날짜 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-sm font-bold">
            {lp.author.avatar ? (
              <img src={lp.author.avatar} alt={lp.author.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              lp.author.name[0]
            )}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{lp.author.name}</p>
            <p className="text-gray-400 text-xs">{uploadDate}</p>
          </div>
        </div>

        {/* 수정/삭제 버튼 */}
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-white transition text-sm px-3 py-1 border border-gray-600 rounded-lg">
            ✏️ 수정
          </button>
          <button className="text-gray-400 hover:text-red-400 transition text-sm px-3 py-1 border border-gray-600 rounded-lg">
            🗑️ 삭제
          </button>
        </div>
      </div>

      {/* 제목 */}
      <h1 className="text-2xl font-bold mb-6">{lp.title}</h1>

      {/* 썸네일 - LP 원판 스타일 */}
      <div className="relative w-64 h-64 mx-auto mb-8">
        <img
          src={`https://picsum.photos/seed/${lp.id}/400/400`}
          alt={lp.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover rounded-full shadow-2xl"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gray-950 border-2 border-gray-700" />
        </div>
      </div>

      {/* 태그 */}
      {lp.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {lp.tags.map((tag) => (
            <span key={tag.id} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300">
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      {/* 본문 */}
      <p className="text-gray-300 leading-relaxed whitespace-pre-line mb-8">
        {lp.content}
      </p>

      {/* 좋아요 버튼 */}
      <div className="flex justify-center mb-10">
        <button className="flex items-center gap-2 px-6 py-2 bg-gray-800 hover:bg-pink-500 rounded-full transition text-white">
          ❤️ {lp.likes.length}
        </button>
      </div>

      {/* 댓글 작성란 */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-3">댓글</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="댓글을 입력하세요..."
            maxLength={200}
            className="flex-1 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            disabled={commentInput.trim().length === 0}
            className="px-4 py-2 bg-pink-500 rounded-lg text-white text-sm hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            등록
          </button>
        </div>
        {commentInput.trim().length === 0 && (
          <p className="text-xs text-gray-500 mt-1">댓글 내용을 입력해주세요.</p>
        )}
      </div>

      {/* 댓글 정렬 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setCommentOrder(PAGINATION_ORDER.DESC)}
          className={`px-3 py-1 rounded-full text-xs transition ${
            commentOrder === PAGINATION_ORDER.DESC
              ? "bg-pink-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => setCommentOrder(PAGINATION_ORDER.ASC)}
          className={`px-3 py-1 rounded-full text-xs transition ${
            commentOrder === PAGINATION_ORDER.ASC
              ? "bg-pink-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          오래된순
        </button>
      </div>

      {/* 댓글 목록 - 초기 로딩 스켈레톤 */}
      {isCommentsLoading && (
        <div>
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonComment key={i} />
          ))}
        </div>
      )}

      {/* 댓글 목록 */}
      {!isCommentsLoading && (
        <div>
          {commentList.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-6">
              첫 댓글을 남겨보세요! 💬
            </p>
          ) : (
            commentList.map((comment) => (
              <div key={comment.id} className="flex gap-3 py-3 border-b border-gray-800">
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-sm font-bold shrink-0">
                  {comment.author.avatar ? (
                    <img src={comment.author.avatar} alt={comment.author.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    comment.author.name[0]
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{comment.author.name}</p>
                  <p className="text-xs text-gray-400 mb-1">
                    {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
                  </p>
                  <p className="text-sm text-gray-300">{comment.content}</p>
                </div>
              </div>
            ))
          )}

          {/* 무한스크롤 sentinel */}
          <div ref={sentinelRef} className="h-2" />

          {/* 추가 로딩 스켈레톤 */}
          {isFetchingNextPage && (
            <div>
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonComment key={i} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 플로팅 버튼 */}
      <button
        onClick={() => navigate("/lp/create")}
        className="fixed bottom-8 right-8 w-14 h-14 bg-pink-500 rounded-full text-white text-3xl shadow-lg hover:bg-pink-600 transition flex items-center justify-center"
        aria-label="LP 추가"
      >
        +
      </button>
    </div>
  );
};

export default LPDetailPage;