import {
  createCommentRecord,
  createLPRecord,
  deleteCommentRecord,
  setCurrentUser,
  sleep,
  updateCommentRecord,
  updateNicknameRecord,
} from "./mockDb";
import { mockLPs } from "./mockDb";
import type { Me } from "../types/lp";

export async function loginMutation(input: {
  email: string;
  password: string;
}): Promise<Me> {
  await sleep(400);

  if (!input.email || !input.password) {
    throw new Error("이메일과 비밀번호를 입력해주세요.");
  }

  const user: Me = {
    id: 999,
    email: input.email,
    nickname: "연진님",
    bio: "안녕하세요",
    image: "",
  };

  setCurrentUser(user);
  localStorage.setItem("accessToken", "mock-access-token");
  localStorage.setItem("refreshToken", "mock-refresh-token");

  return user;
}

export async function googleLoginMutation(): Promise<Me> {
  await sleep(300);

  const user: Me = {
    id: 999,
    email: "google@example.com",
    nickname: "연진님",
    bio: "구글 로그인 사용자",
    image: "",
  };

  setCurrentUser(user);
  localStorage.setItem("accessToken", "mock-google-access-token");
  localStorage.setItem("refreshToken", "mock-google-refresh-token");

  return user;
}

export async function logoutMutation() {
  await sleep(200);
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  setCurrentUser(null);
  return true;
}

export async function createLPMutation(input: {
  title: string;
  content?: string;
  thumbnail?: string;
  tags?: string[];
}) {
  await sleep(500);

  if (!input.title.trim()) {
    throw new Error("LP 제목을 입력해주세요.");
  }

  return createLPRecord(input);
}

export async function createCommentMutation(input: {
  lpId: number;
  content: string;
}) {
  await sleep(400);

  if (!input.content.trim()) {
    throw new Error("댓글 내용을 입력해주세요.");
  }

  return createCommentRecord(input);
}

export async function updateCommentMutation(input: {
  lpId: number;
  commentId: number;
  content: string;
}) {
  await sleep(350);

  if (!input.content.trim()) {
    throw new Error("수정할 내용을 입력해주세요.");
  }

  return updateCommentRecord(input);
}

export async function deleteCommentMutation(input: {
  lpId: number;
  commentId: number;
}) {
  await sleep(250);
  deleteCommentRecord(input);
  return true;
}

export async function updateNicknameMutation(input: { nickname: string }) {
  await sleep(300);

  if (!input.nickname.trim()) {
    throw new Error("닉네임을 입력해주세요.");
  }

  return updateNicknameRecord(input);
}

export async function toggleLikeMutation(input: { lpId: number }) {
  await sleep(300);

  const target = mockLPs.find((lp) => lp.id === input.lpId);
  if (!target) throw new Error("LP를 찾을 수 없습니다.");

  return { ...target };
}