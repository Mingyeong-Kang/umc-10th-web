import { useEffect, useState } from "react";

function App() {
  const [path, setPath] = useState(window.location.pathname);

  // 뒤로가기 감지
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // 페이지 이동 함수
  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
  };

  return (
    <div>
      <nav>
        <button onClick={() => navigate("/")}>Home </button>
        <button onClick={() => navigate("/about")}>About</button>
        <button onClick={() => navigate("/movies")}>Movies</button>
      </nav>

      {path === "/" && <Home />}
      {path === "/about" && <About />}
      {path === "/movies" && <Movies />}
    </div>
  );
}

function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}

function Movies() {
  return <h1>Movies</h1>;
}

export default App;