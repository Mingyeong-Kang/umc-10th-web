import { useTheme } from "./context/ThemeContext";

export default function ContextPage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center pt-20 gap-6">
      <h1 className="text-3xl font-bold">다크모드 토글</h1>

      <p>현재 모드: {isDark ? "다크 🌙" : "라이트 ☀️"}</p>

      <button
        onClick={toggleTheme}
        className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      </button>

      <div className="mt-10 p-6 rounded-lg border border-gray-300 dark:border-gray-600 max-w-md">
        <h2 className="text-xl font-semibold mb-2">샘플 카드</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          useContext로 테마 상태를 전역에서 관리하고 있습니다.
        </p>
      </div>
    </div>
  );
}
