import { Outlet } from "react-router-dom"

export const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col"> 
    {/* h-dvh: 요소가 요소 만큼만 화면에 차지하는게 화면 전체를 차지하게 */}
    {/* flex-col 세로축 정렬 */}
        <nav>네비게이션 바 입니다.</nav>
        {/* flex-1 : flex-row 1 */}
        <main className="flex-1">
            <Outlet></Outlet> {/*children 요소들이 나옴*/}
        </main>
        <footer>푸터</footer>
    </div>
  )
}
