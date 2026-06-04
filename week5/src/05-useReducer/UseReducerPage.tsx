import { useReducer, useState } from "react";

//1. State에 대한 interface
interface IState {
    counter: number;
}

//2. reducer에 대한 interface
interface IAction{
    type: 'INCREASE'|'DECREASE'|'RESET_TO_ZERO';
    payload?: number;
}

function reducer(state: IState, action: IAction){
    const {type} = action;
    console.log(action);
    console.log(state);

    switch(type){
        case 'INCREASE':{
            return{
                ...state,
                counter: state.counter+1,
            };
        }
        case "DECREASE":{
            return{
                ...state,
                counter: state.counter-1,
            };
        }
        case "RESET_TO_ZERO":{
            return{
                ...state,
                counter: 0,
            };
        }
        default:
            return state;
    }
}

const btnStyle = {
    color: "white",
    backgroundColor: "#374151",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
};

export default function UseReducerPage() {
    // 1. useState
    const [count, setCount] = useState(0);

    //2. useRedeucer
    const [state, dispatch] = useReducer(reducer, {
        counter:0,
    });

    const handleIncrease = ():void => {
        setCount(count+1);
    };
   
    console.log(state);

    return (
        <div className="flex flex-col gap-10">
            <div>
                <h2 className='text-3xl' style={{color: "white"}}>useState</h2>
                <p style={{color: "white"}}>useState훅 사용:{count}</p>
                <button style={btnStyle} onClick={handleIncrease}>Increase</button>
            </div>
            <div>
                <h2 className='text-3xl' style={{color: "white"}}>useReducer</h2>
                <p style={{color: "white"}}>useReducer훅 사용:{state.counter}</p>
                <div style={{display: "flex", gap: "8px", justifyContent: "center"}}>
                    <button style={btnStyle} onClick={() => dispatch(
                        { type: 'INCREASE', payload: 3, })}>Increase</button>
                    <button style={btnStyle} onClick={() => dispatch(
                        { type: 'DECREASE' })}>Decrease</button>
                    <button style={btnStyle} onClick={() => dispatch(
                        { type: 'RESET_TO_ZERO' })}>Reset</button>
                </div>
            </div>
        </div>
    );
}