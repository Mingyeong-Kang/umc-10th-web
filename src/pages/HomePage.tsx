import useGetLpList from "../hooks/queries/useGetLpList.ts";
import { useState } from "react";

const HomePage = () => {
  const [search, setSearch] = useState("매튜");

  const { data, isPending, isError } = useGetLpList({
    search,
  });

  if (isPending) {
    return <div className="mt-20">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-20">Error...</div>;
  }

  return (
    <div className="mt-20">
      <input
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        className="border p-2"
      />

      {data?.data.data?.map((lp) => (
        <h1 key={lp.id}>{lp.title}</h1>
      ))}
    </div>
  );
};

export default HomePage;
