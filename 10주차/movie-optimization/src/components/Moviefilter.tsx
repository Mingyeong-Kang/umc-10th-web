import { useState } from "react";
import { LANGUAGE_OPTIONS } from "../constants/movie";
import type { MovieFilters, MovieLanguage } from "../types/movie";
import { Input } from "../components/Input";
import LanguageSelector from "../components/LanguageSelector";
import { SelectBox } from "../components/SelectBox";

interface MovieFilterProps {
  onChange: (filter: MovieFilters) => void;
}

const MovieFilter = ({ onChange }: MovieFilterProps) => {
  console.log("렌더링, Movie Filter");

  const [query, setQuery] = useState<string>("");
  const [includeAdult, setIncludeAdult] = useState<boolean>(false);
  const [language, setLanguage] = useState<MovieLanguage>("ko-KR");

  const handleSubmit = (): void => {
    const filters: MovieFilters = {
      query,
      include_adult: includeAdult,
      language,
    };

    console.log(filters);
    onChange(filters);
  };

  return (
    <div className="mb-8 transform space-y-6 rounded-2xl border border-gray-300 bg-white p-6 shadow-xl transition-all hover:shadow-2xl">
      <div className="flex flex-wrap gap-6">
        <div className="min-w-[300px] flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            영화 제목
          </label>
          <Input value={query} onChange={setQuery} />
        </div>

        <div className="min-w-[200px] flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            옵션
          </label>
          <SelectBox
            checked={includeAdult}
            onChange={setIncludeAdult}
            label="성인 콘텐츠 표시"
            id="include_adult"
            className="h-[50px] w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm"
          />
        </div>

        <div className="min-w-[200px] flex-1">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            언어
          </label>
          <LanguageSelector
            value={language}
            onChange={setLanguage}
            options={LANGUAGE_OPTIONS}
            className="h-[50px]"
          />
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="h-[50px] rounded-lg bg-blue-500 px-6 font-semibold text-white transition hover:bg-blue-600"
          >
            영화 검색
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieFilter;
