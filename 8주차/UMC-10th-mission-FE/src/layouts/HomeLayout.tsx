import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Sidebar } from "../components/SideBar"
import { useSideBar } from "../hooks/useSideBar"

export const HomeLayout = () => {
  const {isOpen, toggle, close} = useSideBar();
  return (
    <div className="h-dvh flex flex-col"> 
        <Navbar isOpen={isOpen} onToggle={toggle}></Navbar>
        <Sidebar isOpen={isOpen} onClose={close}/>
        <main className="flex-1 mt-10">
          <Outlet></Outlet>
        </main>
        <Footer>푸터</Footer>
    </div>
  ) 
}
