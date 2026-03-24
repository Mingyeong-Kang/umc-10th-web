import React from "react";

interface TodoInputProps{
  text: string;
  setText: (value: string)=> void;
  addTodo: ()=> void;
}

const TodoInput= ({text, setText, addTodo}: TodoInputProps)=>{
  return(
    <form
      className="todo-container__form"
      onSubmit={(e) => { e.preventDefault(); addTodo(); }}
    >
      <input
        type="text"
        className="todo-container__input"
        placeholder="할 일 입력"
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="todo-container__button">할 일 추가</button>
    </form>
  )
};

export default TodoInput;