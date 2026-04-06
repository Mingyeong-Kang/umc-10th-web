import { useEffect, useState } from "react"

export default function UseEffectPage() {
    const [count, setCount] = useState(0);

    const handleIncrease = () => {
        setCount((prev) => prev + 1);
        console.log('setCount', count);
    };

    useEffect(() => {
        //실행하고 싶은 코드
        console.log(count);

        //(optional) return function
        //clean up function
        return () => {
            console.log('청소하는 함수 입니다')
        }

        //의존성 배열 (dependency array)
    }, [count])

  return (
    <>
        <h2>useEffectPage</h2>
        <h2>{count}</h2>
        <button onClick={handleIncrease}>증가</button>
    </>
  )
}
