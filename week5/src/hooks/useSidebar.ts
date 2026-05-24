import { useState, useEffect } from "react";

//사이드바 열림, 닫힘 상태 관리. 초기값은 false
function useSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true); //사이드바 열기
  const close = () => setIsOpen(false); //사이드바 닫기
  const toggle = () => setIsOpen((prev) => !prev); //열려있으면 닫고, 닫혀있으면 열기

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };

    //컴포넌트 마운트 시(화면에 나타날 때) keydown 이벤트 등록(키보드 입력 감지 시작)
    //document는 웹페이지 전체 문서 의미
    //document.addEventListener = 웹페이지 전체에 이벤트 감지기 달기
    document.addEventListener("keydown", handleKeyDown);

    //컴포넌트 언마운트 시(화면에서 사라질 때)keydown 이벤트 해제(키보드 입력 감지 중단): 메모리 누수 방지
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []); //의존성 배열 [] : 마운트/언마운트 시 딱 한 번만 실행

  // 사이드바 열릴 때 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; //원래대로 복구(스크롤 가능)
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return { isOpen, open, close, toggle };
  //훅을 사용하는 컴포넌트에서 상태와 함수를 꺼내 쓸 수 있도록 반환
}

export default useSidebar;