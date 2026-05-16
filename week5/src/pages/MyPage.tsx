import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getMyInfo } from "../apis/auth";
import useUpdateProfileMutation from "../hooks/useUpdateProfileMutation";
import useWithdrawMutation from "../hooks/useWithdrawMutation";
import { AuthContext } from "../context/AuthContext"; // ⭐ 추가
import type { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
  const navigate = useNavigate();

  // ⭐ 여기 추가
  const { logout } = useContext(AuthContext);

  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");

  // 프로필 수정
  const { mutate: updateProfile, isPending } =
    useUpdateProfileMutation(() => {
      setIsEditOpen(false);
    });

  // 탈퇴 mutation
  const { mutate: withdraw } = useWithdrawMutation(() => {
    logout(); // ⭐ 이제 정상
    navigate("/login");
  });

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();

      setData(response);

      setName(response.data.name || "");
      setBio(response.data.bio || "");
      setAvatar(response.data.avatar || "");
    };

    getData();
  }, []);

  const handleSubmit = () => {
    updateProfile({
      name,
      bio,
      avatar,
    });
  };

  const handleWithdraw = () => {
    const ok = window.confirm("정말 탈퇴하시겠습니까?");
    if (!ok) return;

    withdraw();
  };

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 py-10 text-white">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">마이페이지</h1>

          <button
            onClick={() => setIsEditOpen(true)}
            className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
          >
            ⚙️ 설정
          </button>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 flex flex-col items-center">
          <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-700 mb-6">
            {data?.data.avatar ? (
              <img
                src={data.data.avatar}
                alt={data.data.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white">
                {data?.data.name?.[0]}
              </div>
            )}
          </div>

          <h2 className="text-2xl font-bold mb-2 text-white">
            {data?.data.name}
          </h2>

          <p className="text-gray-400 mb-2">
            {data?.data.email}
          </p>

          <p className="text-gray-300 text-center">
            {data?.data.bio || "소개가 없습니다."}
          </p>

          {/* 탈퇴 버튼 */}
          <button
            onClick={handleWithdraw}
            className="mt-6 px-4 py-2 bg-red-500 hover:bg-red-600 transition rounded-lg text-white text-sm"
          >
            탈퇴하기
          </button>
        </div>
      </div>

      {/* 수정 모달 */}
      {isEditOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setIsEditOpen(false)}
        >
          <div
            className="bg-gray-900 w-full max-w-md rounded-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                프로필 수정
              </h2>

              <button
                onClick={() => setIsEditOpen(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-300 block mb-1">
                  이름
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 block mb-1">
                  Bio
                </label>

                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none resize-none h-24"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 block mb-1">
                  프로필 이미지 URL
                </label>

                <input
                  type="text"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg outline-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!name || isPending}
                className="w-full bg-pink-500 hover:bg-pink-600 transition py-3 rounded-lg text-white font-semibold disabled:opacity-50"
              >
                {isPending ? "저장 중..." : "저장하기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyPage;