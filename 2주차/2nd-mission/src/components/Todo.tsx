import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";
import { THEME, useTheme } from "../context/ThemeProvider";
import ThemeToggleButton from "./ThemeToggleButton";
import clsx from "clsx";

const Todo = () => {
  const {todos, handleCompleteTodo, handleDeleteTodo, doneTodos} = useTodo();
  const { theme } = useTheme();
  
  const isLightMode = theme == THEME.LIGHT;

    return (
      <>
      <ThemeToggleButton></ThemeToggleButton>
      <div className={clsx(
        "todo-container", isLightMode ? "light" : "dark" //클래스만 주입
        )}> 
        <h1 className="todo-container__header">Yeoni TODO</h1>
        <TodoForm></TodoForm>
        <div className="render-container">
          <TodoList
            title="할 일"
            todos={todos}
            buttonLabel="완료"
            buttonColor="#28a745"
            onClick={handleCompleteTodo}
          ></TodoList>
          <TodoList
            title="완료"
            todos={doneTodos}
            buttonLabel="삭제"
            buttonColor="#dc3545"
            onClick={handleDeleteTodo}
          ></TodoList>
        </div>
      </div>
    </>
    );
  
};

export default Todo;
