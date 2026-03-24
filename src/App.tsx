import ContextPage from "../src/Week2-Mission2/ContextPage";
import { ThemeProvider } from "./Week2-Mission2/context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <ContextPage />
    </ThemeProvider>
  );
}

export default App;
