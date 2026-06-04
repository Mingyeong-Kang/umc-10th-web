import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({cursor, search, order, limit}: PaginationDto) {

    return useQuery({
        queryKey: [QUERY_KEY.lps, search, order],
        queryFn: () => getLpList ({
            cursor,
            search,
            order,
            limit,
        }),
        // 데이터가 신선하다고 간주하는 시간
        // 이 시간 동안은 캐시된 데이터를 그대로 사용함
        // 컴포넌트가 마운트되거나 창에 포커스가 들어오는 경우에도 재요청x
        // 5분 동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄인다.
        staleTime: 1000*60*5, //5분

        //사용되지 않는 (비활성 상태)인 쿼리 데이터가 캐시에 남아있는 시간
        // staleTime이 지나고 데이터가 신선하지 않더라도 일정 시간 동안 메모리에 보관
        // 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 제거한다(garbage collection)
        // ex. 10분 동안 사용되지 않으면 해당 캐시 데이터가 삭제되어, 다시 요청시 새 데이터를 받아오게 됨
        gcTime: 100*60*10, //10분


        //조건에 따라 쿼리를 실행 여부 제어
        // enabled: Boolean(search),
        // referchInterval: 100 * 60,
        
        //retry: 쿼리 요청이 실패했을 때 자동으로 재시도할 횟수를 지정
        // 기본값은 3회 정도, 네트워크 오류 등 임시적인 문제를 보완할 수 있음

        // initialData: 쿼리 실행 전 미리 제공할 초기 데이터 설정
        // 컴포넌트가 렌더링 될 때 빈 데이터 구조를 미리 제공해서, 로딩 전에도 안전하게 UI를 구성할 수 있게 해줌
        // initialData:[]

        //파라미터가 변경될 때 이전 데이터를 유지하여 UI 깜빡힘(Flicking)을 줄여줌
        // ex. 페이지네이션 시 페이지 전환 사이에 이전 데이터를 보여주여 사용자 경험 향상
        // keepPreviousData: true,

        select: (data) => data.data.data,
    });
}

export default useGetLpList;