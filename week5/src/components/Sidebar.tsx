import { NavLink } from "react-router-dom";

interface SidebarProps { //이 컴포넌트가 받는 props 타입 정의
  isOpen: boolean; //isOpen은 사이드바 열림/닫힘 상태
  onClose: () => void; //onClose는 사이드바 닫는 함수
}

//useSidebar에서 만든 isOpen, close를 props로 받아서 사용
export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* 배경 오버레이 */}

      {isOpen && (//isOpen이 true일 때만 오버레이 렌더링
        <div
          className="fixed inset-0 bg-black/50 z-20"
          //화면 전체 고정 레이어, 반투명 검정 배경, 다른 요소들 위에 표시
          onClick={onClose} //오버레이 클릭시 사이드바 닫기
        />
      )}

      {/* 사이드바 본체 */}
      <aside 
        className={`
          fixed top-0 left-0 h-full w-60 bg-gray-900 z-30 pt-16
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        //화면 왼쪽 상단에 고정, 높이 100% 너비 60, 오버레이(z-30)보다 위에 표시
        //이동 애니메이션 0.3초, 열리면 제자리(x축으로 0만큼 이동) 
        //닫히면 왼쪽으로 숨기기(x축으로 자기 너비(w-60)만큼 왼쪽으로 이동)
      >
        <nav className="flex flex-col gap-2 p-4">
          <NavLink
            to="/lps"  //LP 목록 페이지로 이동
            onClick={onClose} //링크 클릭 시 사이드바 자동으로 닫기
            className={({ isActive }) => //현재 페이지와 일치하면 강조 표시
              `text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition
               ${isActive ? "bg-gray-700 font-bold" : ""}`
               //NavLink는 리액트 라우터에서 제공하는 특별한 링크인데 현재 브라우저
               //URL이 to 경로와 일치하면 자동으로 isActive를 true로 만들어줌.
            }
          >
            🎵 LP 목록
          </NavLink>
          <NavLink
            to="/my"
            onClick={onClose}
            className={({ isActive }) =>
              `text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition
               ${isActive ? "bg-gray-700 font-bold" : ""}`
            }
          >
            👤 마이페이지
          </NavLink>
        </nav>
      </aside>
    </>
  );
}