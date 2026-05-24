import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  // 300ms debounce
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    // 공백이면 요청 안 보냄
    if (!debouncedQuery.trim()) return;

    console.log("API 요청:", debouncedQuery);

    fetch(`/api/search?q=${debouncedQuery}`);
  }, [debouncedQuery]);

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl mb-5">검색 페이지</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어 입력"
        className="border p-2 text-black"
      />
    </div>
  );
};

export default SearchPage;