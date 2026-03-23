// 1. HTML 요소 선택
const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

// 2. 타입 정의
type Todo = {
  id: number;
  text: string;
};

// 3. 상태 (데이터)
let todos: Todo[] = [];
let doneTasks: Todo[] = [];

// 4. 텍스트 가져오기
const getTodoText = (): string => {
  return todoInput.value.trim();
};

// 5. 할 일 추가
const addTodo = (text: string): void => {
  todos.push({
    id: Date.now(),
    text,
  });

  todoInput.value = "";
  renderTasks();
};

// 6. 완료 처리
const completeTodo = (todo: Todo): void => {
  todos = todos.filter((t) => t.id !== todo.id);
  doneTasks.push(todo);
  renderTasks();
};

// 7. 삭제
const deleteTodo = (todo: Todo): void => {
  doneTasks = doneTasks.filter((t) => t.id !== todo.id);
  renderTasks();
};

// 8. 요소 생성
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
  const li = document.createElement("li");
  li.classList.add("render-container__item");

  // 텍스트 span
  const span = document.createElement("span");
  span.classList.add("render-container__item-text");
  span.textContent = todo.text;

  // 버튼
  const button = document.createElement("button");
  button.classList.add("render-container__item-button");

  if (isDone) {
    button.textContent = "삭제";
    button.style.backgroundColor = "#dc3545";
  } else {
    button.textContent = "완료";
    button.style.backgroundColor = "#28a745";
  }

  // 클릭 이벤트
  button.addEventListener("click", () => {
    if (isDone) {
      deleteTodo(todo);
    } else {
      completeTodo(todo);
    }
  });

  // 요소 합치기
  li.appendChild(span);
  li.appendChild(button);

  return li;
};

// 9. 렌더링
const renderTasks = (): void => {
  todoList.innerHTML = "";
  doneList.innerHTML = "";

  // 할 일
  todos.forEach((todo) => {
    const li = createTodoElement(todo, false);
    todoList.appendChild(li);
  });

  // 완료
  doneTasks.forEach((todo) => {
    const li = createTodoElement(todo, true);
    doneList.appendChild(li);
  });
};

// 10. 이벤트 연결
todoForm.addEventListener("submit", (event: Event): void => {
  event.preventDefault();

  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});

renderTasks();
