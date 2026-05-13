import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import useGetInfiniteLpList from "../hooks/queries/useGetLpList.ts";
import { PAGINATION_ORDER } from "../enums/common.ts";
import LpCard from "../compoenets/LpCard/LpCard.tsx";
import LpCardSkeletonList from "../compoenets/LpCard/LpCardSkeletonList.tsx";

const HomePage = () => {
  const [search, setSearch] = useState("");

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, search, PAGINATION_ORDER.desc);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) {
    return <div className="mt-20 text-white">Error...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <input
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        placeholder="검색어를 입력하세요"
        className="mb-6 w-full rounded-md border border-gray-600 bg-black px-4 py-3 text-white outline-none placeholder:text-gray-400"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isPending && <LpCardSkeletonList count={20} />}

        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}

        {isFetching && !isPending && <LpCardSkeletonList count={20} />}
      </div>

      <div ref={ref} className="h-2" />
    </div>
  );
};

export default HomePage;
