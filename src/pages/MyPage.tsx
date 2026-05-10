import axios from "../api/axios";
import { useEffect } from "react";

export default function MyPage() {
  useEffect(() => {
    axios.get("/users/me")
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="flex justify-center items-center h-screen text-2xl">
      🔒 로그인한 사람만 볼 수 있는 페이지
    </div>
  );
}