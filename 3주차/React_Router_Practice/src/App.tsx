import './App.css'

// React Router에서 필요한 함수/컴포넌트를 import
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// 만든 페이지 import
import HomePage from './pages/home';
import NotFound from './pages/not-found';
import MoviesPage from './pages/movies';
import RootLayout from './layout/root-layout';


//1. 문자 리터럴로 직접 JSX 넣는 방식
// 와일드 카드 경로로 NotFound 라우트 만들기
// const NotFound = () => (
//   <main style={{ padding: 24}}>
//     <h1>페이지를 찾을 수 없어요 (404)</h1>
//     <p>주소를 다시 확인하거나 홈으로 이동해 주세요.</p>
//     <a href='/'>홈으로</a>
//   </main>
// );

// 경로(path)와 보여줄 화면(element)를 정의
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <h1>홈 페이지 입니다.</h1>,
//     // 매칭실패/라우트 에러 시 보여줄 UI
//     errorElement: <h1>너는 없는 경로에 들어왔다 야호~</h1>,
//   },
//   {
//     path: '/movies',
//     element: <h1>영화 페이지 입니다.</h1>
//   },
//   {
//     path: '*',
//     element: <NotFound></NotFound>
//   }
// ]);

//2. React Router의 Outlet 사용법
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <HomePage></HomePage>,
//     errorElement: <NotFound></NotFound>
//   },
//   {
//     path: '/movies',
//     element: <MoviesPage></MoviesPage>
//   },
// ]);

//3. '/'로 시작하는 모든 경로에서 공유되는 레이아웃(navbar)은 그대로 두고 아래 컨텐츠 영역만 라우트에 따라 바꾸도록 구현하기
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <RootLayout></RootLayout>,
//     errorElement: <NotFound></NotFound>,
//     //1) Navbar 아래에 표시할 자식 라우트
//     children: [
//       {
//         //2) index: true -> 부모의 기본 경로('/')일 때 렌더
//         index: true,
//         element: <HomePage></HomePage>,
//       },
//       {
//         //3) 부모가 '/'이므로, 'movies'만 써도 '/movies'로 매칭
//         path: 'movies',
//         element: <MoviesPage></MoviesPage>,
//       },
//     ],
//   },
// ]);

//4. 동적 라우팅 구현
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout></RootLayout>,
    errorElement: <NotFound></NotFound>,
    //1) Navbar 아래에 표시할 자식 라우트
    children: [
      {
        //2) index: true -> 부모의 기본 경로('/')일 때 렌더
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        //3) /movies/뒤에 오는 값을 movieId라는 이름으로 받겠다는 뜻
        path: 'movies/:movieId',
        element: <MoviesPage></MoviesPage>,
      },
    ],
  },
]);

// RouterProvider로 router 전달
function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
