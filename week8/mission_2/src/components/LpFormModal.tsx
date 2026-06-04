import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  createLp,
  updateLp,
  type CreateLpPayload,
} from "../apis/lp";
import { uploadImage } from "../apis/uploads";
import type { LpDetail } from "../types/lp";

interface Props {
  open: boolean;
  onClose: () => void;
  /** 전달 시 수정 모드, 없으면 생성 모드 */
  initialLp?: LpDetail;
}

const DEFAULT_THUMBNAIL =
  "https://placehold.co/600x600/1c1c1c/b2dab1?text=LP";

export const LpFormModal = ({ open, onClose, initialLp }: Props) => {
  const isEdit = !!initialLp;
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setTitle(initialLp?.title ?? "");
    setContent(initialLp?.content ?? "");
    setTags(initialLp?.tags?.map((t) => t.name) ?? []);
    setTagInput("");
    setImageFile(null);
    setPreviewUrl(initialLp?.thumbnail ?? null);
    setErrorMessage(null);
  }, [open, initialLp]);

  useEffect(() => {
    if (!imageFile) return;
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = useMutation({
    mutationFn: async () => {
      let thumbnail = initialLp?.thumbnail ?? DEFAULT_THUMBNAIL;
      if (imageFile) {
        thumbnail = await uploadImage(imageFile);
      }
      const payload: CreateLpPayload = {
        title: title.trim(),
        content: content.trim(),
        thumbnail,
        tags,
        published: true,
      };
      if (isEdit && initialLp) {
        return await updateLp(initialLp.id, payload);
      }
      return await createLp(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lps"] });
      if (isEdit && initialLp) {
        queryClient.invalidateQueries({ queryKey: ["lp", initialLp.id] });
      }
      onClose();
    },
    onError: (err: unknown) => {
      const msg = axios.isAxiosError(err)
        ? (err.response?.data?.message ?? "요청에 실패했습니다.")
        : "요청에 실패했습니다.";
      setErrorMessage(msg);
    },
  });

  const handleAddTag = () => {
    const v = tagInput.trim();
    if (!v) return;
    if (tags.includes(v)) {
      setTagInput("");
      return;
    }
    setTags((prev) => [...prev, v]);
    setTagInput("");
  };

  const handleRemoveTag = (name: string) => {
    setTags((prev) => prev.filter((t) => t !== name));
  };

  const isValid =
    title.trim().length > 0 && content.trim().length > 0 && tags.length > 0;

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg bg-[#1c1c1c] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">
            {isEdit ? "LP 수정" : "LP 작성"}
          </h2>
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
            if (!isValid || submit.isPending) return;
            submit.mutate();
          }}
        >
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="relative size-32 mx-auto rounded-full overflow-hidden bg-gray-800 border border-gray-700 hover:opacity-80"
            aria-label="이미지 업로드"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="LP 미리보기"
                className="size-full object-cover"
              />
            ) : (
              <span className="flex items-center justify-center size-full text-3xl text-gray-500">
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
              if (file) setImageFile(file);
            }}
          />

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="LP Name"
            maxLength={100}
            className="px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#b2dab1]"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="LP Content"
            rows={4}
            maxLength={1000}
            className="px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#b2dab1] resize-none"
          />

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="LP Tag"
              maxLength={30}
              className="flex-1 px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#b2dab1]"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3 py-2 rounded bg-[#b2dab1] text-black font-bold text-sm"
            >
              Add
            </button>
          </div>

          {tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {tags.map((name) => (
                <li
                  key={name}
                  className="flex items-center gap-1 pl-3 pr-1 py-1 text-xs rounded-full bg-gray-800 text-gray-200"
                >
                  #{name}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(name)}
                    aria-label={`태그 ${name} 삭제`}
                    className="ml-1 size-4 rounded-full bg-gray-700 hover:bg-gray-600 text-white text-[10px] leading-none flex items-center justify-center"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}

          {errorMessage && (
            <p className="text-xs text-red-400">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={!isValid || submit.isPending}
            className="w-full py-2 rounded bg-[#b2dab1] text-black font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submit.isPending
              ? isEdit
                ? "수정 중..."
                : "추가 중..."
              : isEdit
                ? "수정하기"
                : "Add LP"}
          </button>
        </form>
      </div>
    </div>
  );
};
