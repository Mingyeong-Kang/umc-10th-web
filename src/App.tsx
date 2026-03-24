import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import DoneList from './DoneList';
import { TodoProvider } from './TodoContext';

function App() {
  return (
    <TodoProvider>
      <main className="container">
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