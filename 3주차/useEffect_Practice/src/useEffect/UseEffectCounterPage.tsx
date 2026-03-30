import { useEffect, useState } from "react"

export default function Parent() {
    const [visible, setVisible] = useState(false);

    return(
        <>
            <h1>같이 배우는 리액트</h1>
            <button onClick={() => setVisible(!visible)}>
                {visible ? '숨기기' : '보이기'}
            </button>
            {visible && <Child></Child>}
        </>
    )
}

function Child() {
    useEffect(() => {
        let i = 0;
        const countInterval = setInterval(() => {
            console.log('Number => ' + i)
            i++;
        }, 1_000);

        return () => {
            console.log('언마운트 될 때 실행됩니다')
            clearInterval(countInterval);
        }

    }, [])

    return <div className="mt-20 text-4x1">Child</div>
}