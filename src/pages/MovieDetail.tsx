import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface MovieDetailType {
  title: string;
  overview: string;
  backdrop_path: string;
}

interface Cast {
  id: number;
  name: string;
  profile_path: string;
}

export default function MovieDetail() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);

        // 영화 상세
        const res1 = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_API_KEY}`
        );
        const data1 = await res1.json();

        // 출연진
        const res2 = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${import.meta.env.VITE_API_KEY}`
        );
        const data2 = await res2.json();

        setMovie(data1);
        setCast(data2.cast.slice(0, 10));
      } catch (e) {
        setError("에러 발생");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [movieId]);

  if (loading) return <div className="text-center mt-10">로딩중...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-5 text-white bg-black min-h-screen">
      {/* 배경 */}
      <div
        className="h-64 bg-cover bg-center rounded"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
        }}
      />

      {/* 정보 */}
      <h1 className="text-3xl mt-5">{movie?.title}</h1>
      <p className="mt-2 text-gray-300">{movie?.overview}</p>

      {/* 출연진 */}
      <h2 className="mt-6 text-xl">출연진</h2>

      <div className="flex gap-4 overflow-x-scroll mt-3">
        {cast.map((actor) => (
          <div key={actor.id} className="text-center">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              className="w-20 h-20 rounded-full"
            />
            <p className="text-sm mt-1">{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}