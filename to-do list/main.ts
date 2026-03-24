interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const input = document.getElementById("todo-input") as HTMLInputElement;
const button = document.getElementById("add-btn") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const completedList = document.getElementById("completed-list") as HTMLUListElement;

let todos: Todo[] = [];

// 🔥 추가
button.addEventListener("click", () => {
  const text = input.value;

  if (text.trim() === "") return;

  const newTodo: Todo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(newTodo);
  input.value = "";

  render();
});

// 🔥 화면 렌더링
function render() {
  todoList.innerHTML = "";
  completedList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo__item";

    if (todo.completed) {
      li.classList.add("todo__item--completed");
    }

    li.textContent = todo.text;

    // 👉 완료 버튼
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "완료";
    completeBtn.className = "todo__complete-btn";

    completeBtn.addEventListener("click", () => {
      todo.completed = true;
      render();
    });

    li.appendChild(completeBtn);

    // 👉 완료된 경우 삭제 버튼
    if (todo.completed) {
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "삭제";
      deleteBtn.className = "todo__delete-btn";

      deleteBtn.addEventListener("click", () => {
        todos = todos.filter((t) => t.id !== todo.id);
        render();
      });

      li.appendChild(deleteBtn);
      completedList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }
  });
}