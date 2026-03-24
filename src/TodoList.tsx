import { useTodo } from './TodoContext';
import TodoItem from './TodoItem';

function TodoList() {
  const { todos } = useTodo();

  return (
    <section>
      <h2 className="sub-title">할 일</h2>
      <ul>
        {todos.map((task) => (
          <TodoItem key={task.id} task={task} />
        ))}
      </ul>
    </section>
  );
}

export default TodoList;