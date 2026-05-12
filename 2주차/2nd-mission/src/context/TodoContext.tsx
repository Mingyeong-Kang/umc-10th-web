import { createContext, useContext, useState, type PropsWithChildren } from "react";
import type { TTodo } from "../types/Todo";

interface ITodoContext {
    todos: TTodo[];
    doneTodos: TTodo[];
    addTodo: (text:string) => void;
    handleCompleteTodo: (todo: TTodo) => void;
    handleDeleteTodo: (todo: TTodo) => void;
}

export const TodoContext = createContext<ITodoContext | undefined>(undefined);

export const TodoProvider = ({children}: PropsWithChildren) => {

    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

    const addTodo = (text:string) => {
        const newTodo: TTodo = { id:Date.now(), text};
        setTodos((prevTodos): TTodo[] => [...prevTodos, newTodo]);
    };

    const handleCompleteTodo = (todo: TTodo) => {
    //매개변수로 전달받는 것은 클릭을 당한 투두
    setTodos((prevTodos) => prevTodos.filter((t): boolean => t.id !== todo.id)); //내가 클릭한 투두(todo.id)와 현재 리스트에 있는 투두(t)들을 하나씩 검사해서 다른 투두끼리만 새로 바구니를 만듦
    setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
    };

    const handleDeleteTodo = (todo: TTodo) => {
    setDoneTodos((prevDoneTodo) => prevDoneTodo.filter((t) => t.id !== todo.id))
    };

    return (
        <TodoContext.Provider value = {{todos, doneTodos, addTodo, handleCompleteTodo, handleDeleteTodo}}>

            {children}
        </TodoContext.Provider>
    );
};

export const useTodo = (): ITodoContext => {
    const context = useContext(TodoContext);

    // 컨텍스트가 없는 경우
    if(!context){
        throw new Error('useTodo를 사용하기 위헤서는, 무조건 TodoProvider로 감싸야 합니다.');
    }

    //컨텍스트가 있는 경우
    return context;
};