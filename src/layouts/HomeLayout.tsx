import { Outlet } from "react-router-dom";
import HamburgerButton from "../compoenets/HamburgerButton";
import Sidebar from "../compoenets/Sidebar";
import useSidebar from "../hooks/useSidebar";

const HomeLayout = () => {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 z-50 w-full bg-black shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <HamburgerButton isOpen={isOpen} onClick={toggle} />

          <h1 className="text-xl font-bold text-white">돌려돌려 LP판</h1>

          <nav className="ml-auto flex items-center gap-4 text-sm">
            <a href="/my" className="hover:text-gray-300">
              마이 페이지
            </a>
            <a href="/#search" className="hover:text-gray-300">
              검색
            </a>
          </nav>
        </div>
      </header>

      <Sidebar isOpen={isOpen} onClose={close} />

      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;
