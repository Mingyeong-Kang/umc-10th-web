import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import type { Likes, ResponseLpDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";

function useDeleteLike() {
    return useMutation({
        mutationFn: deleteLike,
        //onMutate -> api 요청 이전에 호출되는 거
        //UI에 바로 변경을 보여주기 위해 캐시를 업데이트
        onMutate: async(lp) => {
            //1. 이 게시글에 관련된 쿼리를 취소(캐시된 데이터를 새로 불러오는 요청)
            await queryClient.cancelQueries({
                queryKey:[QUERY_KEY.lps, lp.lpId],
            });

            //2. 현재 게시글의 데이터를 캐시에서 가져와야 함
            const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
                QUERY_KEY.lps, 
                lp.lpId,
            ]);

            //게시 글 데이터를 복사해서 NewLpPost라는 새로운 객체를 만들거임
            // 복사하는 가장 큰 이유는 나중에 오류가 발생했을 때 이전 상태로 되돌리기 위함
            const newLpPost = {...previousLpPost};

            //게시글에 작성된 좋아요 목록에서 내가 눌렀던 좋아요의 위치를 찾아야함
            const me = queryClient.getQueryData<ResponseMyInfoDto>([
                QUERY_KEY.myinfo
            ]);

            const userId = Number(me?.data.id);
            
            const likeIndex = previousLpPost?.data.likes.findIndex(
                (like) => like.userId === userId,
            ) ??-1;

            if (likeIndex >= 0){
                previousLpPost?.data.likes.splice(likeIndex, 1);
            } else {
                const newLike =  {userId, lpId:lp.lpId} as Likes;
                previousLpPost?.data.likes.push(newLike);
            }

            //업데이트된 게시글 데이터를 캐시에 저장
            //이렇게하면 UI가 바로 업데이트 됨, 사용자가 변화를 확인할 수 있다
            queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

            return {previousLpPost, newLpPost};

        },

        onError:(err, newLp, context) => {
            console.log(err, newLp);
            queryClient.setQueryData(
                [QUERY_KEY.lps, newLp.lpId],
                context?.previousLpPost?.data.id,
            );
        },

        onSettled: async(data, error, variables, context) => {
            await queryClient.invalidateQueries({
                queryKey:[QUERY_KEY.lps, variables.lpId],
            });
        },

    });
}

export default useDeleteLike;