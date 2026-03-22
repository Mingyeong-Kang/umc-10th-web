import './App.css'
import {useContext, useState} from 'react';
import ButtonGroup from './components/ButtonGroup';
import { CounterContext } from './context/CounterProvider';

function App() {
  const context = useContext(CounterContext);
  console.log(context);

  return (
    <>
      <h1>{context?.count}</h1>
      <ButtonGroup
        handleIncrement={context?.handleIncrement}
        handleDecrement={context?.handleDecrement}
        >
      </ButtonGroup>
    </>
  );
}

export default App;