// src/layout/root-layout.tsx
import { Outlet } from 'react-router-dom'; //outlet은 페이지가 바뀌면서 내용이 들어오는 자리
// Navbar 아래에 있는 빈 공간(자리) 같은 거라고 보면 됨.
import Navbar from '../components/navbar';

const RootLayout = () => {
  return (
    <>
      <Navbar />  {/* 항상 고정 */}
      <Outlet />  {/* 자식 라우터가 여기서 렌더됨. */}
    </>
  );
};

export default RootLayout;