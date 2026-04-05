const MOVIES = [
  { id: 1, title: "인셉션", year: 2010, genre: "SF/액션" },
  { id: 2, title: "기생충", year: 2019, genre: "드라마/스릴러" },
  { id: 3, title: "인터스텔라", year: 2014, genre: "SF/드라마" },
  { id: 4, title: "올드보이", year: 2003, genre: "스릴러/미스터리" },
  { id: 5, title: "라라랜드", year: 2016, genre: "뮤지컬/로맨스" },
  { id: 6, title: "어바웃 타임", year: 2013, genre: "로맨스/SF" },
];

export function MoviesPage() {
  return (
    <div className="flex-1 px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">영화 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {MOVIES.map((movie) => (
          <div
            key={movie.id}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
            <p className="text-gray-500 text-sm">{movie.year}년</p>
            <span className="inline-block mt-3 px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
              {movie.genre}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
