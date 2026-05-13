import { Heart } from "lucide-react";
import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail.ts";
import useGetMyInfo from "../hooks/queries/useGetMyInfo.ts";
import usePostLike from "../hooks/mutations/usePostLike.ts";
import useDeleteLike from "../hooks/mutations/useDeleteLike.ts";
import { useAuth } from "../context/AuthContext.tsx";
import type { Likes } from "../types/lp.ts";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();

  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({
    lpId: Number(lpId),
  });

  const { data: me } = useGetMyInfo(accessToken);

  // mutate -> 비동기 요청을 실행하고, 클릭 함수를 이용해서 후속 작업 처리함.
  // mutateAsync -> Promise를 반환해서 await 사용 가능.
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  const isLiked: boolean | undefined = lp?.data.likes.some(
    (like: Likes) => like.userId === me?.data.id,
  );

  const handleLikeLp = () => {
    likeMutate({
      lpId: Number(lpId),
    });
  };

  const handleDislikeLp = () => {
    disLikeMutate({
      lpId: Number(lpId),
    });
  };

  if (isPending) {
    return <div className="mt-12 text-white">Loading...</div>;
  }

  if (isError || !lp) {
    return <div className="mt-12 text-white">Error...</div>;
  }

  return (
    <div className="mt-12 text-white">
      <h1>{lp.data.id}</h1>
      <h1>{lp.data.title}</h1>

      <img
        src={lp.data.thumbnail}
        alt={lp.data.title}
        className="mt-4 w-80 rounded-lg"
      />

      <p className="mt-4">{lp.data.content}</p>

      <button
        type="button"
        onClick={isLiked ? handleDislikeLp : handleLikeLp}
        className="mt-4"
      >
        <Heart
          color={isLiked ? "red" : "black"}
          fill={isLiked ? "red" : "transparent"}
        />
      </button>
    </div>
  );
};

export default LpDetailPage;
