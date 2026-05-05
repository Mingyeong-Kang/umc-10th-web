import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCustomFetch } from './hooks/useCustomFetch';

interface User {
  id: number;
  name: string;
  email: string;
}

function UserCard({ userId }: { userId: number }) {
  const { data, isPending, isError } = useCustomFetch<User>(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  if (isPending) return <div>로딩 중... (ID: {userId})</div>;
  if (isError) return <div>에러가 발생했어요!</div>;

  return (
    <div>
      <h1>{data?.name}</h1>
      <p>{data?.email}</p>
      <p style={{ fontSize: 12, color: '#666' }}>User ID: {data?.id}</p>
    </div>
  );
}

function App() {
  const [userId, setUserId] = useState(1);
  const [show, setShow] = useState(true);

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        <button onClick={() => setUserId(Math.floor(Math.random() * 10) + 1)}>
          랜덤 사용자 (취소 테스트)
        </button>
        <button onClick={() => setShow(!show)}>
          컴포넌트 토글 (언마운트 테스트)
        </button>
        <button
          onClick={() => setUserId(999999)}
          style={{ background: '#ff9800', color: 'white' }}
        >
          재시도 테스트 (404)
        </button>
      </div>

      {show && <UserCard userId={userId} />}
    </div>
  );
}

// QueryClient는 함수 바깥에서 한 번만 만들기
const queryClient = new QueryClient();

// AppRoot가 진짜 export 되는 컴포넌트.
// QueryClientProvider로 App을 감싸서 React Query가 동작하게 함.
function AppRoot() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}

export default AppRoot;