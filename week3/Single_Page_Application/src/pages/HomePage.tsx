import { Link } from "../router/Link";

export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-6 px-4">
      <h1 className="text-5xl font-bold text-purple-500">UMC SPA</h1>
      <p className="text-lg text-gray-500">
        React Router 없이 직접 만든 Single Page Application
      </p>
      <div className="flex gap-4 mt-4">
        <Link
          to="/movies"
          className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition no-underline"
        >
          영화 목록 보기
        </Link>
        <Link
          to="/my"
          className="px-6 py-3 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 transition no-underline"
        >
          마이 페이지
        </Link>
      </div>
    </div>
  );
}
