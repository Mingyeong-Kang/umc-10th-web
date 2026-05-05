import { useEffect, useState } from "react";
import { fetchMyInfo } from "../apis/auth";
import { LoadingSpinner } from "../components/LoadingSpinner";

interface MyInfo {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
}

const MyPage = () => {
  const [me, setMe] = useState<MyInfo | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const data = await fetchMyInfo();
        if (!cancelled) setMe(data);
      } catch {
        if (!cancelled) setIsError(true);
      } finally {
        if (!cancelled) setIsPending(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !me) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <span className="text-red-500 text-2xl">
          내 정보를 불러오지 못했습니다.
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-gray-900 text-white rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-[#b2dab1]">마이페이지</h1>
      <div className="flex flex-col gap-3 text-sm">
        <p>
          <span className="text-gray-400">이름: </span>
          {me.name}
        </p>
        <p>
          <span className="text-gray-400">이메일: </span>
          {me.email}
        </p>
        <p>
          <span className="text-gray-400">소개: </span>
          {me.bio ?? "-"}
        </p>
      </div>
    </div>
  );
};

export default MyPage;
