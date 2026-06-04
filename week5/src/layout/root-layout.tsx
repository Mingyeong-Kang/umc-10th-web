import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import Sidebar from "../components/Sidebar";
import useSidebar from "../hooks/useSidebar";

const RootLayout = () => {
  const { isOpen, toggle, close } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      {/* 헤더 */}
      <Navbar onMenuClick={toggle} />

      {/* 헤더 아래 영역 */}
      <div className="flex flex-1">
        {/* 사이드바 */}
        <Sidebar
          isOpen={isOpen}
          onClose={close}
        />

        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;