import './App.css';
import { useState, useEffect } from 'react';

function App() {
  //현재로 경로를 관리할 State (이게 바뀌면 화면이 리렌더링)
  const [path, setPath] = useState(window.location.pathname)

  //페이지 이동 함수
  const naviateTo = (url) => {
    //브라우저 주소창의 주소만 변경 (새로고침x)
    window.history.pushState({}, '', url);
    //리액트 상태 업데이트, 화면 리렌더링
    setPath(url);
  };

  //뒤로가기/앞으로가기 감지
  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname)
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  //경로에 따른 조건부 렌더링
  const renderContent = () => {
    if (path === '/page1')
      return <div>1 페이지</div>;
    
    if (path === '/page2')
      return <div>2 페이지</div>;
    
    return <div>홈 페이지</div>;
  }  

  return (
    <>
      <nav>
        <button onClick={() => naviateTo('/')}>홈</button>
        <button onClick={() => naviateTo('/page1')}>1 페이지 가기</button>
        <button onClick={() => naviateTo('/page2')}>2 페이지 가기</button>
      </nav>
      <main>
        {renderContent()}
      </main>
    </>
  );
}

export default App;