import { useAuth } from "../contexts/AuthContext";

const MyPage = () => {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-gray-900 text-white rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-[#b2dab1]">마이페이지</h1>
      <div className="flex flex-col gap-3 text-sm">
        <p>
          <span className="text-gray-400">이름: </span>
          {user.name}
        </p>
        <p>
          <span className="text-gray-400">이메일: </span>
          {user.email}
        </p>
        <p>
          <span className="text-gray-400">소개: </span>
          {user.bio ?? "-"}
        </p>
      </div>
    </div>
  );
};

export default MyPage;
