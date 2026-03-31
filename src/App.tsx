import { useState, useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", onPopState);
  }, []);

  let Page;
  if (path === "/") Page = <Home />;
  else if (path === "/about") Page = <About />;
  else Page = <div>404</div>;

  return (
    <div>
      <button
        onClick={() => {
          window.history.pushState({}, "", "/");
          window.dispatchEvent(new PopStateEvent("popstate"));
        }}
      >
        홈
      </button>

      <button
        onClick={() => {
          window.history.pushState({}, "", "/about");
          window.dispatchEvent(new PopStateEvent("popstate"));
        }}
      >
        소개
      </button>

      {Page}
    </div>
  );
}

export default App;