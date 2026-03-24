import { useTodo } from './TodoContext';
import DoneItem from './DoneItem';

function DoneList() {
  const { done } = useTodo();

  return (
    <section>
      <h2 className="sub-title">완료</h2>
      <ul>
        {done.map((task) => (
          <DoneItem key={task.id} task={task} />
        ))}
      </ul>
    </section>
  );
}

export default DoneList;