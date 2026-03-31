import { useEffect, useState } from "react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function Home() {
  console.log(import.meta.env.VITE_API_KEY);

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_API_KEY}`
      );

      const data = await res.json();

      console.log(data); // 🔥 여기 확인

      setMovies(data.results);
    };

    fetchMovies();
  }, []);

    return (
      <div className="p-5">
        <h1 className="text-2xl mb-4">영화 목록</h1>

        <div className="grid grid-cols-5 gap-4">
          {movies.map((movie) => (
            <div key={movie.id} className="relative group">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded"
              />

              {/* hover */}
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-center p-2">
                {movie.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
}
