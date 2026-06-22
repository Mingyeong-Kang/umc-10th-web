import { memo, useCallback, useEffect, useState } from "react";
import { getMovieDetail, POSTER_URL } from "../api/movie";
import type { Movie, MovieDetail } from "../types/movie";

interface Props {
  movie: Movie;
  onClose: () => void;
}

// 정적 정보 행 컴포넌트 - React.memo로 개별 최적화
const InfoRow = memo(function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="w-20 shrink-0 font-medium text-gray-500">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
});

const MovieDetailModal = memo(function MovieDetailModal({ movie, onClose }: Props) {
  const [detail, setDetail] = useState<MovieDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(true);

  // 모달 열릴 때 상세 정보 추가 fetch
  useEffect(() => {
    let cancelled = false;
    setDetailLoading(true);
    setDetail(null);
    getMovieDetail(movie.id)
      .then((d) => {
        if (!cancelled) setDetail(d);
      })
      .catch(() => {
        // 상세 fetch 실패해도 기본 정보는 표시
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [movie.id]);

  // useCallback: ESC 핸들러 참조 안정화
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // useMemo가 적용된 파생 데이터는 이미 상위에서 가공되어 내려오므로
  // 여기서는 detail 데이터를 직접 가공해서 표시
  const runtime = detail
    ? `${Math.floor(detail.runtime / 60)}시간 ${detail.runtime % 60}분`
    : null;

  const genres = detail?.genres.map((g) => g.name).join(", ") ?? null;

  const imdbUrl = `https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/80"
          aria-label="닫기"
        >
          ✕
        </button>

        {/* 배경 배너 */}
        {(detail?.backdrop_path ?? movie.backdrop_path) && (
          <div
            className="h-40 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w780${detail?.backdrop_path ?? movie.backdrop_path})`,
            }}
          />
        )}

        <div className="flex gap-5 p-6">
          {/* 포스터 */}
          <div className="hidden shrink-0 sm:block">
            {movie.poster_path ? (
              <img
                src={POSTER_URL(movie.poster_path)}
                alt={movie.title}
                className="h-52 w-36 rounded-lg object-cover shadow"
              />
            ) : (
              <div className="flex h-52 w-36 items-center justify-center rounded-lg bg-gray-100">
                <span className="text-4xl">🎬</span>
              </div>
            )}
          </div>

          {/* 본문 */}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 leading-snug">
              {movie.title}
            </h2>
            {detail?.tagline && (
              <p className="mt-0.5 text-sm italic text-gray-400">{detail.tagline}</p>
            )}

            {/* 기본 정보 */}
            <div className="mt-4 space-y-2">
              <InfoRow
                label="평점"
                value={
                  <span className="font-semibold text-yellow-500">
                    ★ {movie.vote_average.toFixed(1)}{" "}
                    <span className="text-gray-400 font-normal">
                      ({movie.vote_count.toLocaleString()}명)
                    </span>
                  </span>
                }
              />
              <InfoRow
                label="개봉일"
                value={
                  movie.release_date
                    ? new Date(movie.release_date).toLocaleDateString("ko-KR")
                    : "미정"
                }
              />
              {detailLoading ? (
                <div className="text-sm text-gray-400 animate-pulse">상세 정보 로딩 중…</div>
              ) : (
                <>
                  {runtime && <InfoRow label="러닝타임" value={runtime} />}
                  {genres && <InfoRow label="장르" value={genres} />}
                  <InfoRow label="원제" value={movie.original_title} />
                  <InfoRow label="언어" value={movie.original_language.toUpperCase()} />
                </>
              )}
            </div>

            {/* 줄거리 */}
            {movie.overview && (
              <div className="mt-4">
                <p className="mb-1 text-sm font-medium text-gray-500">줄거리</p>
                <p className="text-sm text-gray-700 leading-relaxed">{movie.overview}</p>
              </div>
            )}

            {/* IMDb 버튼 */}
            <a
              href={imdbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-black transition hover:bg-yellow-500"
            >
              <span>IMDb</span>
              <span>에서 검색하기 ↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MovieDetailModal;
