"use strict";
const input = document.getElementById("todo-input");
const button = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list");
let todos = [];
button.addEventListener("click", () => {
    const text = input.value;
    if (text.trim() === "")
        return;
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
    };
    todos.push(newTodo);
    input.value = "";
    render();
});
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
        const completeBtn = document.createElement("button");
        completeBtn.textContent = "완료";
        completeBtn.className = "todo__complete-btn";
        completeBtn.addEventListener("click", () => {
            todo.completed = true;
            render();
        });
        li.appendChild(completeBtn);
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
        }
        else {
            todoList.appendChild(li);
        }
    });
}
