import { useState } from "react";

export function MyPage() {
  const [name, setName] = useState("UMC 멤버");
  const [bio, setBio] = useState("안녕하세요! UMC에서 웹 개발을 공부하고 있습니다.");
  const [editing, setEditing] = useState(false);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl font-bold mb-8">마이 페이지</h1>
      <div className="w-full max-w-md border border-gray-200 rounded-xl p-8">
        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">👤</span>
        </div>
        {editing ? (
          <div className="flex flex-col gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-center"
              placeholder="이름"
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 resize-none"
              rows={3}
              placeholder="자기소개"
            />
            <button
              onClick={() => setEditing(false)}
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
            >
              저장
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold text-center mb-2">{name}</h2>
            <p className="text-gray-500 text-center mb-6">{bio}</p>
            <button
              onClick={() => setEditing(true)}
              className="w-full px-6 py-2 border border-purple-500 text-purple-500 rounded-lg hover:bg-purple-50 transition"
            >
              프로필 수정
            </button>
          </>
        )}
      </div>
    </div>
  );
}
