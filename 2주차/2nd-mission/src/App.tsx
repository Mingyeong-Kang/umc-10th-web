import './App.css'
import Todo from './components/Todo';
import { ThemeProvider } from './context/ThemeProvider';
import { TodoProvider } from './context/TodoContext';

function App() {

  return (
    <>
      <TodoProvider>
        <ThemeProvider>
          <Todo></Todo>
        </ThemeProvider>
      </TodoProvider>
    </>
  )
}

export default App;
