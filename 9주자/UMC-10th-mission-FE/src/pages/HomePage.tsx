
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { LpCard } from "../components/LpCard/LpCard";
import { LpCardSkeletonList } from "../components/LpCard/LpCardSkeletonList";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCED_DELAY } from "../context/delay";

export const HomePage = () => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCED_DELAY); 
  // const{data, isPending, isError} = useGetLpList({
  //   search,
  //   limit: 1000,
  // });

  const {
    data: lps, 
    isFetching, 
    hasNextPage, 
    isPending, 
    fetchNextPage, 
    isError} 
    = useGetInfiniteLpList(5, debouncedValue, PAGINATION_ORDER.asc);

    // ref: 특정한 html 요소를 감시할 수 있음
    // inView: 그 요소가 화면에 보이면 true
    const {ref, inView} = useInView({
      threshold: 0,
  });

  useEffect(() => {
    // 사용자가 바닥(ref)에 도달했고, 다음 페이지가 있으며, 현재 페칭 중이 아닐 때 실행
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if(isPending) {
    return <LpCardSkeletonList count={20}/>;
  }

  if(isError){
    return <div className="=mt-20">Error.</div>
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <input
        className={"border p-4 rounded-sm"}
        placeholder="검색어를 입력하세요."
        value={search}
        onChange={(e) => setSearch(e.target.value)}/>
      <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
        {isPending && <LpCardSkeletonList count={20}/>}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => <LpCard key={lp.id} lp={lp}/>)}
        {isFetching && <LpCardSkeletonList count ={20}/>}
      </div>
      <div ref={ref} className="h-2"></div>
    </div>
  );
};
