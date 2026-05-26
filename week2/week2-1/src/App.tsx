import './App.css'
import React, { useState } from "react";
import TodoInput from './TodoInput'
import TodoList from './TodoList';

  interface Task{
    id: number;
    text: string;
  }

function App(){
  const[text,setText] = useState("");
  const[todos,setTodos]= useState<Task[]>([]);
  const[doneTasks, setDoneTasks]= useState<Task[]>([]);

  const addTodo= () => {
    
    if(text=="") return;

    const newTask: Task={
      id: Date.now(),
      text: text,
    }

    setTodos([...todos, newTask]);
    setText("")

  }


  const completetask=(id: number) => {
    const newTodos= todos.filter((task)=> task.id !== id);
    const doneTodo= todos.find((task)=> task.id == id);
    setTodos(newTodos);

    if(doneTodo){
      setDoneTasks([...doneTasks,doneTodo])


    }
  

  }

  const deleteTask= (id: number)=> {
    const remainDone = doneTasks.filter((done)=> done.id!==id);
    setDoneTasks(remainDone);
    
  }
  



  return(

    <div className="todo-container">
      <h1 className="todo-container__header">SARA TODO</h1>
      <TodoInput
      text={text}
      setText={setText}
      addTodo={addTodo}
      ></TodoInput>
      
      <TodoList
      todos={todos}
      doneTasks={doneTasks}
      completetask={completetask}
      deleteTask={deleteTask}>
      </TodoList>
     
    
    </div>



  )

}

export default App;