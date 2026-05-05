import { Link } from "../router/Link";
import { useRouterContext } from "../router/RouterContext";

const NAV_ITEMS = [
  { to: "/", label: "홈" },
  { to: "/movies", label: "영화" },
  { to: "/my", label: "마이페이지" },
];

export function Navbar() {
  const { path } = useRouterContext();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <Link to="/" className="text-xl font-bold text-purple-500 no-underline">
        UMC SPA
      </Link>
      <ul className="flex gap-6 list-none m-0 p-0">
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={`no-underline transition ${
                path === item.to
                  ? "text-purple-500 font-semibold"
                  : "text-gray-500 hover:text-purple-400"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
