import { createContext, useContext, useState} from 'react';
import type {ReactNode} from 'react';

type Task = {
  id: number;
  text: string;
};

type TodoContextType = {
  input: string;
  todos: Task[];
  done: Task[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTodo: () => void;
  completeTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
};

const TodoContext = createContext<TodoContextType | null>(null);

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error('TodoProvider 안에서 사용해야 함');
  return context;
};

export function TodoProvider({ children }: { children: ReactNode }) {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState<Task[]>([]);
  const [done, setDone] = useState<Task[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos((prev) => [...prev, { id: Date.now(), text: input }]);
    setInput('');
  };

  const completeTask = (task: Task) => {
    setTodos((prev) => prev.filter((t) => t.id !== task.id));
    setDone((prev) => [...prev, task]);
  };

  const deleteTask = (task: Task) => {
    setDone((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
    <TodoContext.Provider
      value={{
        input,
        todos,
        done,
        handleChange,
        addTodo,
        completeTask,
        deleteTask,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}