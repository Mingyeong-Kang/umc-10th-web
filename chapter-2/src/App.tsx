import './App.css'
import {useContext, useState} from 'react';
import ButtonGroup from './components/ButtonGroup';
import { CounterContext } from './context/CounterProvider';
import { useCount } from './context/CounterProvider';

function App() {
  const { count } = useCount();

  return (
    <>
      <h1>{count}</h1>
      <ButtonGroup />
    </>
  );
}

export default App;