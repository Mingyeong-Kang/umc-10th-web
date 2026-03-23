import { useState, type FormEvent } from "react";
import type { TTodo } from '../types/Todo';


const Todo = () => {
    const [todos, setTodos] = useState<TTodo[]>([]);

    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

    const [input, setInput] = useState<string>('');

    console.log('Input', input);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); //버튼 누를 때마다 새로고침 되는 것 방지
        console.log('동작함');
        const text = input.trim();

        if (text) {
            const newTodo: TTodo = {id: Date.now(), text};
            setTodos((prevTodos) => [...prevTodos, newTodo])
            setInput('');
        }
    };

    const handleCompleteTodo = (todo: TTodo) => { //매개변수로 전달받는 것은 클릭을 당한 투두
        setTodos(prevTodos => prevTodos.filter((t) : boolean => t.id !== todo.id)); //내가 클릭한 투두(todo.id)와 현재 리스트에 있는 투두(t)들을 하나씩 검사해서 다른 투두끼리만 새로 바구니를 만듦
        setDoneTodos(prevDoneTodos => [...prevDoneTodos, todo]);
    }

    const handleDeleteTodo = (todo: TTodo) => {
        setDoneTodos((prevDoneTodo) => prevDoneTodo.filter((t) => t.id !== todo.id));
    }

    return (
        <div className="todo-container">
            <h1 className="todo-container__header">Yeoni TODO</h1>
            <form onSubmit={handleSubmit} className="todo-container__form">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text"
                    className="todo-container__input"
                    placeholder="할 일 입력"
                    required>
                </input>
                <button type='submit' className="todo-container__button">
                    할 일 추가
                </button>
            </form>
            <div className="render-container">
                <div className="render-container__section">
                    <h2 className="render-container__title">할 일</h2>
                    <ul id='todo-list' className="render-container__list">
                        {todos.map((todo) => (
                            <li key={todo.id} className="render-container__item">
                                <span className="render-container__item-text">{todo.text}</span>
                                <button
                                    onClick={() => handleCompleteTodo(todo)}
                                    style={{
                                    backgroundColor: '#28a745',
                                }}
                                    className="render-container__item-button">완료
                                </button>
                            </li>
                        ))}
                        {/* <li className="render-container__item">
                            <span className="render-container__item-text">고구마</span>
                            <button style={{
                                backgroundColor: '#28a745',
                            }} 
                                className="render-container__item-button">완료
                            </button>
                        </li> */}
                    </ul>
                </div>
                <div className="render-container__section">
                    <h2 className="render-container__title">완료</h2>
                    <ul id='todo-list' className="render-container__list">
                        {doneTodos.map((todo) => (
                            <li key={todo.id} className="render-container__item">
                                <span className="render-container__item-text">{todo.text}</span>
                                <button 
                                    onClick={() => handleDeleteTodo(todo)}
                                    style={{
                                    backgroundColor: '#dc3545',
                                }}
                                    className="render-container__item-button">삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Todo;