import './App.css'
import {useState} from 'react';

function App() {
  const [count, setCount] = useState<number>(0);

  //카운트 1씩 증가
  const increaseCount = () => {
    setCount(count + 1);
  };

  //카운트 1씩 감소
  const decreaseCount = () => {
    setCount(count - 1);
  }

  return (
    <>
    <h1>카운트: {count}</h1>
    <button onClick={increaseCount}>카운트 1 증가</button>
    <button onClick={decreaseCount}>카운트 1 감소</button>
    </>
  );
}

export default App;