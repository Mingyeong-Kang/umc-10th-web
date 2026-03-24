import { useTodo } from './TodoContext';

function TodoForm() {
  const { input, handleChange, addTodo } = useTodo();

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        addTodo();
      }}
    >
      <input
        className="input"
        value={input}
        onChange={handleChange}
        placeholder="할 일 입력"
      />
      <button className="add-btn">추가</button>
    </form>
  );
}

export default TodoForm;