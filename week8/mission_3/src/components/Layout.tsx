import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { FloatingButton } from "./FloatingButton";
import { LpFormModal } from "./LpFormModal";
import { AuthRequiredModal } from "./AuthRequiredModal";
import { useAuth } from "../contexts/AuthContext";
import { useSidebar } from "../hooks/useSidebar";

export const Layout = () => {
  const sidebar = useSidebar();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleOpenCreate = () => {
    if (!isAuthenticated) {
      setIsAuthPromptOpen(true);
      return;
    }
    setIsCreateOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar isOpen={sidebar.isOpen} onClose={sidebar.close} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onToggleSidebar={sidebar.toggle} />
        <main className="flex-1 px-4 py-6">
          <Outlet />
        </main>
      </div>

      <FloatingButton onClick={handleOpenCreate} />
      <LpFormModal
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
      <AuthRequiredModal
        open={isAuthPromptOpen}
        onConfirm={() => {
          setIsAuthPromptOpen(false);
          navigate("/login");
        }}
        onCancel={() => setIsAuthPromptOpen(false)}
      />
    </div>
  );
};
