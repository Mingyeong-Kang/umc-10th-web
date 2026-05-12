import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";

import useGetLpDetail from "../hooks/queries/useGetLpDetail.ts";
import useGetMyInfo from "../hooks/queries/useGetMyInfo.ts";
import usePostLike from "../hooks/mutations/usePostLike.ts";
import useDeleteLike from "../hooks/mutations/useDeleteLike.ts";
import { useAuth } from "../context/AuthContext.tsx";

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const { accessToken } = useAuth();

  const numericLpId = Number(lpId);

  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({
    lpId: numericLpId,
  });

  const { data: me } = useGetMyInfo(accessToken);

  // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리함
  // mutateAsync -> Promise를 반환해서 await 사용 가능
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  const isLiked: boolean | undefined = lp?.data.likes.some(
    (like) => like.userId === me?.data.id,
  );

  const handleLikeLp = () => {
    likeMutate({
      lpId: numericLpId,
    });
  };

  const handleDislikeLp = () => {
    disLikeMutate({
      lpId: numericLpId,
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
        className="w-80 h-80 object-cover"
      />

      <p>{lp.data.content}</p>

      <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
        <Heart
          color={isLiked ? "red" : "black"}
          fill={isLiked ? "red" : "transparent"}
        />
      </button>
    </div>
  );
};

export default LpDetailPage;
