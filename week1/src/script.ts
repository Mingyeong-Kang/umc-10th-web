// 1. 요소 선택 (클래스 앞에 점 . 을 꼭 붙이세요!)
const todoInput = document.querySelector('.todo-container__input input') as HTMLInputElement;
const addBtn = document.querySelector('.todo-container__input button') as HTMLButtonElement;
const todoList = document.querySelector('.main__todo-list ul') as HTMLUListElement;
const doneList = document.querySelector('.main__done-list ul') as HTMLUListElement;

function addTodo(): void {
  const text: string = todoInput.value.trim();

  if (text === "") {
    alert("오늘 할 일을 입력해주세요! 🌿");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `<span>${text}</span> <button class="complete-btn">완료</button>`;

  todoList.appendChild(li);
  todoInput.value = "";

  // 완료 버튼 로직
  const completeBtn = li.querySelector(".complete-btn") as HTMLButtonElement;
  completeBtn.addEventListener("click", () => {
    doneList.appendChild(li);
    completeBtn.textContent = "삭제";

    // 삭제 기능으로 변경
    completeBtn.onclick = () => {
      li.remove(); // 괄호 () 필수!
    };
  });
}

// ⚠️ 함수 밖에서 이벤트 리스너를 등록해야 합니다!
addBtn.addEventListener("click", addTodo);

// 엔터 키 지원 (보너스)
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});