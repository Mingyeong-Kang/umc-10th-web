import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useLPDetailQuery from "../hooks/useLPDetailQuery";
import useLPCommentsQuery from "../hooks/useLPCommentsQuery";
import useCreateCommentMutation from "../hooks/useCreateCommentMutation";
import useUpdateCommentMutation from "../hooks/useUpdateCommentMutation";
import useDeleteCommentMutation from "../hooks/useDeleteCommentMutation";
import useToggleLikeMutation from "../hooks/useToggleLikeMutation";
import { PAGINATION_ORDER } from "../enums/common";
import CreateLPModal from "../components/CreateLPModal";
import useDeleteLPMutation from "../hooks/useDeleteLPMutation";

interface Tag {
  id: number;
  name: string;
}

interface Like {
  id: number;
  userId: number;
  lpId: number;
}

interface Author {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
}

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

  const [commentOrder, setCommentOrder] = useState<PAGINATION_ORDER>(
    PAGINATION_ORDER.DESC
  );

  const [commentInput, setCommentInput] = useState("");

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

  const [editingContent, setEditingContent] = useState("");

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const lpId = Number(lpid);

  const { mutate: deleteLP } = useDeleteLPMutation(lpId);

  // 현재 로그인 사용자
  const accessToken = localStorage.getItem("accessToken");

  let myId: number | null = null;

  if (accessToken) {
    const payload = JSON.parse(atob(accessToken.split(".")[1]));

    console.log(payload);

    // 대부분 JWT는 sub에 user id 저장됨
    myId = payload.sub;
  }

  const { data, isLoading, isError, refetch } =
    useLPDetailQuery(lpid);

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useLPCommentsQuery(lpId, commentOrder);

  const { mutate: createComment } =
    useCreateCommentMutation(lpId);

  const { mutate: updateComment } =
    useUpdateCommentMutation(lpId);

  const { mutate: deleteComment } =
    useDeleteCommentMutation(lpId);

  const { mutate: toggleLike } =
    useToggleLikeMutation(lpId);

  const handleCreateComment = () => {
    if (!commentInput.trim()) return;

    createComment(commentInput);

    setCommentInput("");
  };

  const handleEditStart = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
    setOpenMenuId(null);
  };

  const handleEditSave = (commentId: number) => {
    if (!editingContent.trim()) return;

    updateComment(
      {
        commentId,
        content: editingContent,
      },
      {
        onSuccess: () => {
          setEditingCommentId(null);
          setEditingContent("");
        },
      }
    );
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditingContent("");
  };

  const handleDeleteComment = (commentId: number) => {
    const ok = window.confirm("댓글을 삭제하시겠습니까?");

    if (!ok) return;

    deleteComment(commentId);

    setOpenMenuId(null);
  };

  const lp: LpDetail | undefined = data?.data;

  const commentList: Comment[] =
    commentsData?.pages.flatMap(
      (page) => page.data.data
    ) ?? [];

  const uploadDate = lp?.createdAt
    ? new Date(lp.createdAt).toLocaleDateString(
        "ko-KR",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      )
    : "";

  useEffect(() => {
    if (!sentinelRef.current) return;

    const el = sentinelRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
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
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !lp) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
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
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-10 text-white">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-1 transition"
        >
          ← 목록으로
        </button>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-sm font-bold">
              {lp.author.avatar ? (
                <img
                  src={lp.author.avatar}
                  alt={lp.author.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                lp.author.name[0]
              )}
            </div>

            <div>
              <p className="text-white text-sm font-medium">
                {lp.author.name}
              </p>

              <p className="text-gray-400 text-xs">
                {uploadDate}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="text-gray-400 hover:text-white transition text-sm px-3 py-1 border border-gray-600 rounded-lg">
              ✏️ 수정
            </button>

            <button
              onClick={() => {
              const ok = window.confirm("LP를 삭제하시겠습니까?");
              if (!ok) return;

              deleteLP();
            }}
            className="text-gray-400 hover:text-red-400 transition text-sm px-3 py-1 border border-gray-600 rounded-lg"
          >
            🗑️ 삭제
          </button>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-6">
          {lp.title}
        </h1>

        <div className="relative w-64 h-64 mx-auto mb-8">
          <img
            src={lp.thumbnail}
            alt={lp.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full shadow-2xl"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gray-950 border-2 border-gray-700" />
          </div>
        </div>

        {lp.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {lp.tags.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <p className="text-gray-300 leading-relaxed whitespace-pre-line mb-8">
          {lp.content}
        </p>

        <div className="flex justify-center mb-10">
          <button
            onClick={() => {
              const isLiked = lp.likes.some(
                (like) => like.userId === myId
              );

              toggleLike(isLiked);
            }}
            className="flex items-center gap-2 px-6 py-2 bg-gray-800 hover:bg-pink-500 rounded-full transition text-white"
          >
            ❤️ {lp.likes.length}
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-bold mb-3">
            댓글
          </h2>

          <div className="flex gap-2">
            <input
              type="text"
              value={commentInput}
              onChange={(e) =>
                setCommentInput(e.target.value)
              }
              placeholder="댓글을 입력하세요..."
              maxLength={200}
              className="flex-1 bg-gray-800 text-white text-sm px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-pink-500"
            />

            <button
              onClick={handleCreateComment}
              disabled={
                commentInput.trim().length === 0
              }
              className="px-4 py-2 bg-pink-500 rounded-lg text-white text-sm hover:bg-pink-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              등록
            </button>
          </div>

          {commentInput.trim().length === 0 && (
            <p className="text-xs text-gray-500 mt-1">
              댓글 내용을 입력해주세요.
            </p>
          )}
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() =>
              setCommentOrder(
                PAGINATION_ORDER.DESC
              )
            }
            className={`px-3 py-1 rounded-full text-xs transition ${
              commentOrder ===
              PAGINATION_ORDER.DESC
                ? "bg-pink-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            최신순
          </button>

          <button
            onClick={() =>
              setCommentOrder(
                PAGINATION_ORDER.ASC
              )
            }
            className={`px-3 py-1 rounded-full text-xs transition ${
              commentOrder ===
              PAGINATION_ORDER.ASC
                ? "bg-pink-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            오래된순
          </button>
        </div>

        {isCommentsLoading ? (
          <div>
            {Array.from({ length: 5 }).map(
              (_, i) => (
                <SkeletonComment key={i} />
              )
            )}
          </div>
        ) : (
          <div>
            {commentList.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-6">
                첫 댓글을 남겨보세요! 💬
              </p>
            ) : (
              commentList.map((comment) => {
                console.log("myId:", myId);
                console.log(
                  "comment authorId:",
                  comment.authorId
                );

                const isMine =
                  comment.authorId === myId;

                const isEditing =
                  editingCommentId === comment.id;

                return (
                  <div
                    key={comment.id}
                    className="flex gap-3 py-3 border-b border-gray-800"
                  >
                    <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-sm font-bold shrink-0">
                      {comment.author.avatar ? (
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        comment.author.name[0]
                      )}
                    </div>

                    <div className="flex-1 text-left">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {comment.author.name}
                          </p>

                          <p className="text-xs text-gray-400 mb-1">
                            {new Date(
                              comment.createdAt
                            ).toLocaleDateString(
                              "ko-KR"
                            )}
                          </p>
                        </div>

                        {isMine && !isEditing && (
                          <div className="relative">
                            <button
                              onClick={() =>
                                setOpenMenuId(
                                  openMenuId ===
                                    comment.id
                                    ? null
                                    : comment.id
                                )
                              }
                              className="text-gray-400 hover:text-white px-2 text-lg leading-none"
                            >
                              ⋯
                            </button>

                            {openMenuId ===
                              comment.id && (
                              <div className="absolute right-0 mt-1 w-24 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 overflow-hidden">
                                <button
                                  onClick={() =>
                                    handleEditStart(
                                      comment
                                    )
                                  }
                                  className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-gray-700"
                                >
                                  수정
                                </button>

                                <button
                                  onClick={() =>
                                    handleDeleteComment(
                                      comment.id
                                    )
                                  }
                                  className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-gray-700"
                                >
                                  삭제
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {isEditing ? (
                        <div className="mt-2 flex gap-2">
                          <input
                            type="text"
                            value={editingContent}
                            onChange={(e) =>
                              setEditingContent(
                                e.target.value
                              )
                            }
                            className="flex-1 bg-gray-800 text-white text-sm px-3 py-2 rounded"
                          />

                          <button
                            onClick={() =>
                              handleEditSave(
                                comment.id
                              )
                            }
                            className="px-3 py-2 bg-pink-500 rounded text-xs text-white"
                          >
                            저장
                          </button>

                          <button
                            onClick={
                              handleEditCancel
                            }
                            className="px-3 py-2 bg-gray-700 rounded text-xs text-white"
                          >
                            취소
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-300 text-left break-words">
                          {comment.content}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            <div
              ref={sentinelRef}
              className="h-2"
            />

            {isFetchingNextPage && (
              <div>
                {Array.from({ length: 3 }).map(
                  (_, i) => (
                    <SkeletonComment key={i} />
                  )
                )}
              </div>
            )}
          </div>
        )}

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

      {isCreateModalOpen && (
        <CreateLPModal
          onClose={() =>
            setIsCreateModalOpen(false)
          }
        />
      )}
    </>
  );
};

export default LPDetailPage;