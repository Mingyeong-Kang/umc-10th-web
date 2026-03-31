import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { MovieCredit, MovieDetail } from "../types/movie";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>(); //구조분해할당

  const [movie, setMovie] = useState<MovieDetail>();
  const [credits, setCredits] = useState<MovieCredit>();
  //1. 로딩 상태
  const [isPending, setIsPending] = useState(false);
  //2. 에러 상태
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsPending(true);
      try {
        const [movieRes, creditsRes] = await Promise.all([
          axios.get<MovieDetail>(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            },
          ),
          axios.get<MovieCredit>(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            },
          ),
        ]);

        setMovie(movieRes.data);
        setCredits(creditsRes.data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovieDetail();
  }, [movieId]); //movieId가 바뀔 때마다 다시 실행

  //로딩 상태일 때 스피너를 가장 먼저 보여줌
  if (isPending){
    return (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner></LoadingSpinner>
        </div>
    )
  }
  //에러 발생시 처리
  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  //데이터가 아직 없을 때 처리
  if (!movie || !credits) return null;

  // 주요 제작진으로 표시하고 싶은 역할들
  const MAIN_JOBS = [
    "Director",
    "Writer",
    "Screenplay",
    "Producer",
    "Executive Producer",
  ];

  // credits 데이터에서 주요 제작진만 추출
  const mainCrew = credits.crew.filter((person) =>
    MAIN_JOBS.includes(person.job),
  );

  return (
    <>
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner></LoadingSpinner>
        </div>
      )}

      {!isPending && (
        <div className="min-h-screen bg-black text-white p-10">
          <div className="flex flex-col md:flex-row gap-10 max-w-6xl mx-auto">
            {/* 포스터 이미지 */}
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} 영화의 이미지`}
              className="w-full md:w-96 rounded-2xl shadow-2xl"
            />

            {/* 영화 상세 설명 */}
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl font-bold">{movie.title}</h1>
              {/* tagline이 있을 때만 출력 */}
                {movie.tagline && (
                    <p className="text-xl text-gray-400 italic">"{movie.tagline}"</p>
                )}
              <div className="flex gap-2 text-sm text-[#dda5e3] font-semibold">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="border border-[#dda5e3] px-2 py-1 rounded"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-lg font-bold">
                  평점: ⭐ {movie.vote_average.toFixed(1)}
                </p>
                <p className="text-gray-400">개봉일: {movie.release_date}</p>
                <p className="text-gray-400">상영 시간: {movie.runtime}분</p>
              </div>
              <p className="mt-6 text-lg leading-relaxed">{movie.overview}</p>
            </div>
          </div>

          {/* 영화 출연진 */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 mt-8">출연진</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-6">
              {credits.cast.slice(0, 16).map((person) => (
                <div key={person.id} className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-gray-800 bg-neutral-800 flex items-center justify-center">
                    {person.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                        alt="" // alt를 비워두면 이미지가 없을 때 텍스트가 나타나지 않아 깔끔합니다.
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-12 h-12 text-gray-500"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm font-bold text-center line-clamp-1">
                    {person.name}
                  </p>
                  <p className="text-xs text-gray-400 text-center line-clamp-1">
                    {person.character}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 제작진 섹션 */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8 mt-8">제작진</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-6">
              {mainCrew.map((person, index) => (
                <div
                  key={`${person.id}-${person.job}-${index}`}
                  className="flex flex-col items-center"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-[#dda5e3] bg-neutral-800 flex items-center justify-center">
                    {person.profile_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-12 h-12 text-gray-500"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    )}
                  </div>
                  <p className="text-sm font-bold text-center line-clamp-1">
                    {person.name}
                  </p>
                  <p className="text-xs text-[#dda5e3] text-center line-clamp-1">
                    {person.job}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieDetailPage;
