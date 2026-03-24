import { useTodo } from './TodoContext';

type Task = {
  id: number;
  text: string;
};

function TodoItem({ task }: { task: Task }) {
  const { completeTask } = useTodo();

  return (
    <li className="item">
      {task.text}
      <button className="btn complete" onClick={() => completeTask(task)}>
        완료
      </button>
    </li>
  );
}

export default TodoItem;