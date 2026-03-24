import type { Task } from '../types/todo'
import TodoItem from './TodoItem'

type Props = {
  title: string
  tasks: Task[]
  onComplete?: (task: Task) => void
  onDelete?: (task: Task) => void
}

function TodoList({ title, tasks, onComplete, onDelete }: Props) {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>

      <ul className="render-container__list">
        {tasks.map((task) => (
          <TodoItem
            key={task.id} // key 필수
            task={task}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  )
}

export default TodoList