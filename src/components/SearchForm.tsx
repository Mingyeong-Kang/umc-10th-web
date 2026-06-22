import { memo, useCallback, useState } from "react";
import type { SearchParams } from "../types/movie";

interface Props {
  onSearch: (params: SearchParams) => void;
  loading: boolean;
}

const LANGUAGES = [
  { value: "ko-KR", label: "한국어" },
  { value: "en-US", label: "English" },
  { value: "ja-JP", label: "日本語" },
] as const;

// React.memo: SearchForm은 영화 목록이 업데이트돼도 재렌더되지 않음
const SearchForm = memo(function SearchForm({ onSearch, loading }: Props) {
  const [query, setQuery] = useState("");
  const [includeAdult, setIncludeAdult] = useState(false);
  const [language, setLanguage] = useState<string>("ko-KR");

  // useCallback: 핸들러 참조를 안정적으로 유지
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch({ query, include_adult: includeAdult, language });
    },
    [onSearch, query, includeAdult, language]
  );

  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setLanguage(e.target.value);
    },
    []
  );

  const handleAdultChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIncludeAdult(e.target.checked);
    },
    []
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-bold text-gray-800">🎬 영화 검색</h2>

      {/* 제목 입력 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영화 제목을 입력하세요"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="rounded-lg bg-pink-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "검색 중…" : "검색"}
        </button>
      </div>

      {/* 필터 옵션 */}
      <div className="mt-3 flex flex-wrap items-center gap-4">
        {/* 언어 선택 */}
        <div className="flex items-center gap-2">
          <label htmlFor="language-select" className="text-sm font-medium text-gray-600">
            언어
          </label>
          <select
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm outline-none transition focus:border-pink-400"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        {/* 성인 콘텐츠 */}
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-600">
          <input
            type="checkbox"
            checked={includeAdult}
            onChange={handleAdultChange}
            className="h-4 w-4 cursor-pointer rounded accent-pink-500"
          />
          성인 콘텐츠 포함
        </label>
      </div>
    </form>
  );
});

export default SearchForm;
