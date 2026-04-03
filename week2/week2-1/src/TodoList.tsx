import React from "react";

interface Task {
  id: number;
  text: string;
}

interface TodoListProps {
  todos: Task[];
  doneTasks: Task[];
  completetask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TodoList = ({ todos, doneTasks, completetask, deleteTask }: TodoListProps) => {
  return (
    <div className="render-container">
      {/* 할 일 섹션 */}
      <div className="render-container__section">
        <h2 className="render-container__title">할 일</h2>
        <ul className="render-container__list">
          {todos.map((task) => (
            <li key={task.id} className="render-container__item">
              {task.text}
              <button className="render-container__item-button" onClick={() => completetask(task.id)}>완료</button>
            </li>
          ))}
        </ul>
      </div>

      {/* 완료 섹션 */}
      <div className="render-container__section">
        <h2 className="render-container__title">완료</h2>
        <ul className="render-container__list">
          {doneTasks.map((done) => (
            <li key={done.id} className="render-container__item">
              {done.text}
              <button className="render-container__item-button" onClick={() => deleteTask(done.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;