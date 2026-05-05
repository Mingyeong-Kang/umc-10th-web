import { Link } from "../router/Link";

export function NotFoundPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-6xl font-bold text-purple-500">404</h1>
      <p className="text-xl text-gray-500">페이지를 찾을 수 없습니다</p>
      <Link
        to="/"
        className="mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition no-underline"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
