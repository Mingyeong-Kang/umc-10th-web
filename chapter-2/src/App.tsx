import './App.css'
import {useState} from 'react';
import ButtonGroup from './components/ButtonGroup';

function App() {
  const [count, setCount] = useState<number>(0);

  //카운트 1씩 증가
  const handleIncrement = () => {
    setCount(count + 1);
  };

  //카운트 1씩 감소
  const handleDecrement = () => {
    setCount(count - 1);
  }

  return (
    <>
    <h1>카운트: {count}</h1>
    {/* ButtonGroup라는 함수 호출, 매개변수로 함수 2개를 props에 담아 전달함 */}
    <ButtonGroup handleIncrement={handleIncrement}
                 handleDecrement={handleDecrement}
    />
    </>
  );
}

export default App;