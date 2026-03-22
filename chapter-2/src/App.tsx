import './App.css'

import List from './components/List';

function App() {
  const nickname = '여니'
  const sweetPotato = '고구마'
  const array = ['REACT', 'NEXT', 'VUE', 'SVELTE', 'ANGULAR', 'REACT-NATIVE']
  return (
    <>
      <strong className = 'school'>이화여자대학교</strong>
      <p style={{color:'purple', fontWeight:'bold', fontSize:'3rem'}}>{nickname}/이홍연</p>
      <h1>{`${nickname}는 ${sweetPotato} 아이스크림을 좋아합니다`}</h1>
      <ul>
        {array.map((yaho, index) => (
        // 2) <li key = {index}>{yaho}</li> → <List /> 로 교체
        <List key={index} tech={yaho}/>
        ))}
      </ul>
    </>
  )
}

export default App