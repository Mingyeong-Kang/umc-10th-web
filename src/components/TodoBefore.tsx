import type { TTodo } from "../types/todo";
import { useState } from "react";

const TodoBefore = () => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);
  const [input, setInput] = useState<string>("");

  console.log("Input", input);

  //할일 입력시
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();
    if (text) {
      const newTodo: TTodo = {
        id: Date.now(),
        text,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInput("");
    }
  };

  // 완료 버튼 클릭시 (todos → doneTodos 이동)
  const completeTodo = (todo: TTodo): void => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
  };

  // 삭제 버튼 클릭시 (doneTodos에서 제거)
  const deleteTodo = (todo: TTodo): void => {
    setDoneTodos((prevDoneTodos) =>
      prevDoneTodos.filter((t) => t.id !== todo.id),
    );
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>

      <form onSubmit={handleSubmit} className="todo-container__form">
        <input
          value={input} //이런식으로 value 속성으로 state를 연결시키면, react가 계속 관리해주는거
          onChange={(e) => setInput(e.target.value)}
          type="text"
          className="todo-container__input"
          placeholder="할 일 입력"
          required
        />

        <button type="submit" className="todo-container__button">
          할 일 추가
        </button>
      </form>

      <div className="render-container">
        {/* 할 일 */}
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>

          <ul className="render-container__list">
            {todos.map((todo) => (
              <li key={todo.id} className="render-container__item">
                <span className="render-container__item-text">{todo.text}</span>
                <button
                  onClick={() => completeTodo(todo)}
                  style={{ backgroundColor: "#28a745" }}
                  className="render-container__item-button"
                >
                  완료
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 완료 */}
        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>

          <ul className="render-container__list">
            {doneTodos.map((todo) => (
              <li key={todo.id} className="render-container__item">
                <span className="render-container__item-text">{todo.text}</span>
                <button
                  onClick={() => deleteTodo(todo)}
                  style={{ backgroundColor: "#dc3545" }}
                  className="render-container__item-button"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoBefore;
