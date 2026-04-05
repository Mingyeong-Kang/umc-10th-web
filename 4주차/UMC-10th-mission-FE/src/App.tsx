import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/LoginPage';
import { HomeLayout } from './layouts/HomeLayout';
import { SignupPage } from './pages/SignupPage';

//1. 홈페이지
//2. 로그인 페이지
//3. 회원가입 페이지

const router  = createBrowserRouter( [
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <NotFoundPage></NotFoundPage>,
    children: [
      // 홈 경로일 때 렌더링될 화면
      // {
      //   path:"/", element: <div>Home</div>
      // },
      {
        index: true, element: <HomePage></HomePage>
      },
      {
        path: 'login', element: <LoginPage></LoginPage>
      },
      {
        path: 'signup', element: <SignupPage></SignupPage>
      },
    ]
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
