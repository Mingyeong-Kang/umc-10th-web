import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { updateMyInfo, type MyInfoData } from "../apis/auth";
import { uploadImage } from "../apis/uploads";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  open: boolean;
  onClose: () => void;
  user: MyInfoData;
}

export const ProfileEditModal = ({ open, onClose, user }: Props) => {
  const { refreshUser } = useAuth();
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio ?? "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user.avatar);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setName(user.name);
    setBio(user.bio ?? "");
    setAvatarFile(null);
    setPreviewUrl(user.avatar);
    setErrorMessage(null);
  }, [open, user]);

  useEffect(() => {
    if (!avatarFile) return;
    const url = URL.createObjectURL(avatarFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const mutation = useMutation({
    mutationFn: async () => {
      let avatar: string | undefined;
      if (avatarFile) {
        avatar = await uploadImage(avatarFile);
      }
      return await updateMyInfo({
        name: name.trim(),
        bio: bio.trim(),
        ...(avatar !== undefined && { avatar }),
      });
    },
    onSuccess: async () => {
      await refreshUser();
      onClose();
    },
    onError: (err: unknown) => {
      const msg = axios.isAxiosError(err)
        ? (err.response?.data?.message ?? "프로필 수정에 실패했습니다.")
        : "프로필 수정에 실패했습니다.";
      setErrorMessage(msg);
    },
  });

  const isValid = name.trim().length > 0;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-[#1c1c1c] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">프로필 수정</h2>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl leading-none"
          >
            ×
          </button>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!isValid || mutation.isPending) return;
            mutation.mutate();
          }}
        >
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative size-24 mx-auto rounded-full overflow-hidden bg-gray-800 border border-gray-700 hover:opacity-80"
            aria-label="프로필 사진 업로드"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="프로필 미리보기"
                className="size-full object-cover"
              />
            ) : (
              <span className="flex items-center justify-center size-full text-2xl text-gray-500">
                +
              </span>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setAvatarFile(file);
            }}
          />

          <label className="text-xs text-gray-400">
            이름
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
              className="mt-1 w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-[#b2dab1]"
            />
          </label>

          <label className="text-xs text-gray-400">
            소개 (선택)
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              maxLength={200}
              placeholder="자기소개를 입력하세요"
              className="mt-1 w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#b2dab1] resize-none"
            />
          </label>

          {errorMessage && (
            <p className="text-xs text-red-400">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={!isValid || mutation.isPending}
            className="w-full py-2 rounded bg-[#b2dab1] text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "저장 중..." : "저장"}
          </button>
        </form>
      </div>
    </div>
  );
};
