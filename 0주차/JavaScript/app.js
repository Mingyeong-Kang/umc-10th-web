//1. HTML 요소 선택
const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const donelist = document.getElementById('done-list');

//2. todo 정의

let todos = [];
let doneTasks = [];

//3. 할 일 텍스트 입력 처리 함수
const getTodoText = () => {
    return todoInput.value.trim();
}

//3. 할 일 아이템 생성 함수

const createTodoElement = (todo, isDone) => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');

    const p = document.createElement('p');
    p.classList.add('render-container__item-text');
    p.textContent = todo.text;

    const button = document.createElement('button');
    button.classList.add('render-container__item-button')
    if(isDone){
        button.textContent = '삭제';
    }
    else{
        button.textContent = '완료';
    }

    //버튼 클릭 이벤트 처리
    button.addEventListener('click', () => {
        if(isDone){
            deleteTodo(todo.id);
        }
        else{
            completeTodo(todo.id);
        }
    });

    li.appendChild(p);
    li.appendChild(button);

    return li;
}   

//4. 할 일 렌더링 함수

const renderTasks = () => {
    //기존 목록 비우기
    todoList.innerHTML = '';
    donelist.innerHTML = '';

    //해야 할 일 렌더링
    todos.forEach(todo => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    })

    //해낸 일 렌더링
    doneTasks.forEach(todo => {
        const li = createTodoElement(todo, true);
        donelist.appendChild(li);
    });
};

//5. 할 일 추가 처리 함수
const addTodo = (text) => {
    todos.push({id: Date.now(), text});
    todoInput.value = ''; //할 일 추가했으면 입력창 비우기
    renderTasks();
}

//6. 할 일 상태 변경
const completeTodo = (id) => {
    const taskIndex = todos.findIndex(t => t.id === id);
    if (taskIndex > -1) {
        const [completedTask] = todos.splice(taskIndex, 1);
        doneTasks.push(completedTask);
        renderTasks();
    }
}

//7. 완료된 할 일 삭제 함수

const deleteTodo = (id) => {
    doneTasks = doneTasks.filter(t => t.id !== id);
    renderTasks();
}

//8. 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = getTodoText();
    if(text){
        addTodo(text);
    }
})

renderTasks();
