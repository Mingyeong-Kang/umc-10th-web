import { useTodo } from './TodoContext';

type Task = {
  id: number;
  text: string;
};

function DoneItem({ task }: { task: Task }) {
  const { deleteTask } = useTodo();

  return (
    <li className="item">
      {task.text}
      <button className="btn delete" onClick={() => deleteTask(task)}>
        삭제</button>
    </li>
  );
}

export default DoneItem;