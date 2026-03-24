import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import DoneList from './DoneList';
import { TodoProvider } from './TodoContext';
import { useDarkMode } from './DarkModeContext';

function App() {
  const { dark, toggleDark } = useDarkMode();

  return (
    <TodoProvider>
      <main className="container min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
        <button
          onClick={toggleDark}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {dark ? "🌙 Dark" : "☀️ Light"}
        </button>

        <h1 className="title">YONG TODO</h1>

        <TodoForm />

        <section className="lists">
          <TodoList />
          <DoneList />
        </section>

      </main>
    </TodoProvider>
  );
}

export default App;