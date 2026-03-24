import { useTodo } from './TodoContext';

type Task = {
  id: number;
  text: string;
};

function TodoItem({ task }: { task: Task }) {
  const { completeTask } = useTodo();

  return (
    <li className="flex justify-between items-center p-3 rounded 
                   bg-gray-100 dark:bg-gray-800">
      
      <span className="text-black dark:text-white">
        {task.text}
      </span>

      <button
        onClick={() => completeTask(task)}
        className="px-3 py-1 rounded bg-green-500 text-white 
                   hover:bg-green-600"
      >
        완료
      </button>
    </li>
  );
}

export default TodoItem;