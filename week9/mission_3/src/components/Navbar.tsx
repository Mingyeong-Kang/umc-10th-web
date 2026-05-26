import useCartStore from '../store/useCartStore';

const Navbar = () => {
  const amount = useCartStore((state) => state.amount);

  return (
    <nav className="sticky top-0 z-10 bg-violet-700 text-white shadow-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <h1 className="text-2xl font-bold tracking-tight">UMC Play List</h1>
        <div className="relative">
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-violet-900">
            {amount}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
