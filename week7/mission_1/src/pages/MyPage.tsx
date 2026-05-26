import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ProfileEditModal } from "../components/ProfileEditModal";

const MyPage = () => {
  const { user } = useAuth();
  const [editOpen, setEditOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-gray-900 text-white rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#b2dab1]">마이페이지</h1>
        <button
          type="button"
          onClick={() => setEditOpen(true)}
          aria-label="프로필 설정"
          className="px-3 py-1 text-sm rounded border border-gray-600 text-gray-200 hover:bg-gray-800"
        >
          ⚙ 설정
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="size-20 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center text-xl font-bold">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="size-full object-cover"
            />
          ) : (
            user.name[0]?.toUpperCase() ?? "?"
          )}
        </div>
        <div>
          <p className="text-lg font-bold">{user.name}</p>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <p>
          <span className="text-gray-400">소개: </span>
          {user.bio ?? "-"}
        </p>
      </div>

      <ProfileEditModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        user={user}
      />
    </div>
  );
};

export default MyPage;
