import { Outlet } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"

export const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col"> 
        <Navbar></Navbar>
        <main className="flex-1 mt-10">
            <Outlet></Outlet>
        </main>
        <Footer>푸터</Footer>
    </div>
  ) 
}
