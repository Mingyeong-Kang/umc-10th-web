import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import {Heart} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyinfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";


const LpDetailPage = () => {
  const {lpId} = useParams();  
  const {accessToken} = useAuth();
  const {
    data: lp, 
    isPending, 
    isError} = useGetLpDetail({lpId:Number(lpId)})
    const {data:me} = useGetMyInfo(accessToken);
    //mutate ->  비동기 요청을 실행하고 콜백 함수를 이용해서 후속 작업을 처리함
    //mutateAsync -> Promise를 반환해서 await 사용 가능  
    const {mutate:likeMutate, mutateAsync} = usePostLike()
    const {mutate:deleteMutate} = useDeleteLike()

    // const isLiked = lp?.data.likes
    // .map((like) => like.userId)
    // .includes(me?.data.id as number);

    const isLiked = lp?.data.likes.some((like)=>like.userId === me?.data.id);

    const handleLikeLp = async () => {
       // eslint-disable-next-line @typescript-eslint/no-unused-expressions
       me?.data.id && likeMutate({lpId:Number(lpId)});
    }; 

    const handleDislikeLp = async () => {
        deleteMutate({lpId:Number(lpId)});
    };

    if(isPending && isError){
        return<></>
    }

    return (
    <div className={"mt-12"}>
        <h1>{lp?.data.id}</h1>
        <h1>{lp?.data.title}</h1>
        <img src={lp?.data.thumbnail} alt={lp?.data.title}></img>
        <p>{lp?.data.content}</p>

        <button onClick={isLiked ? handleDislikeLp : handleLikeLp}>
            <Heart 
            color={isLiked ? "red" : "black"}
            fill={isLiked ? "red" : "transparent"}></Heart>
        </button>

    </div>
  )
}

export default LpDetailPage;
