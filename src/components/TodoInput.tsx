import { useState } from 'react'

type Props = {
  onAdd: (text: string) => void
}

function TodoInput({ onAdd }: Props) {
  const [input, setInput] = useState('')

  const handleAdd = () => {
    if (!input.trim()) return
    onAdd(input)
    setInput('')
  }

  return (
    <div className="todo-container__form">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일 입력"
        className="todo-container__input"
      />
      <button onClick={handleAdd} className="todo-container__button">
        할 일 추가
      </button>
    </div>
  )
}

export default TodoInput