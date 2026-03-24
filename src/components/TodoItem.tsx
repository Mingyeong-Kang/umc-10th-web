import type { Task } from '../types/todo'

type Props = {
  task: Task
  onComplete?: (task: Task) => void
  onDelete?: (task: Task) => void
}

function TodoItem({ task, onComplete, onDelete }: Props) {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">
        {task.text}
      </span>

      {onComplete && (
        <button
          className="render-container__item-button"
          onClick={() => onComplete(task)}
        >
          완료
        </button>
      )}

      {onDelete && (
        <button
          className="render-container__item-button"
          style={{ backgroundColor: '#dc3545' }}
          onClick={() => onDelete(task)}
        >
          삭제
        </button>
      )}
    </li>
  )
}

export default TodoItem