import { useState } from 'react'
import './App.css'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import type { Task } from './types/todo'

function App() {
  const [todos, setTodos] = useState<Task[]>([])
  const [done, setDone] = useState<Task[]>([])

  const addTodo = (text: string) => {
    const newTodo: Task = {
      id: Date.now(),
      text,
    }
    setTodos([...todos, newTodo])
  }

  const completeTodo = (task: Task) => {
    setTodos(todos.filter((t) => t.id !== task.id))
    setDone([...done, task])
  }

  const deleteTodo = (task: Task) => {
    setDone(done.filter((t) => t.id !== task.id))
  }

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">chen TODO</h1>

      <TodoInput onAdd={addTodo} />

      <div className="render-container">
        <TodoList
          title="할 일"
          tasks={todos}
          onComplete={completeTodo}
        />

        <TodoList
          title="완료"
          tasks={done}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  )
}
export default App
