"use strict";
const todoInput = document.querySelector('.todo-container__input input');
const addBtn = document.querySelector('.todo-container__input button');
const todoList = document.querySelector('.main__todo-list ul');
const doneList = document.querySelector('.main__done-list ul');
function addTodo() {
    const text = todoInput.value.trim();
    if (text === "") {
        alert("오늘 할 일을 입력해주세요! 🌿");
        return;
    }
    const li = document.createElement("li");
    li.innerHTML = `<span>${text}</span> <button class="complete-btn">완료</button>`;
    todoList.appendChild(li);
    todoInput.value = "";
    const completeBtn = li.querySelector(".complete-btn");
    completeBtn.addEventListener("click", () => {
        doneList.appendChild(li);
        completeBtn.textContent = "삭제";
        completeBtn.onclick = () => {
            li.remove();
        };
    });
}
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter")
        addTodo();
});
