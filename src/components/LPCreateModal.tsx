import { useState } from "react";

interface LPCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (input: {
    title: string;
    content: string;
    thumbnail?: string;
    tags: string[];
  }) => void;
  isPending: boolean;
}

export default function LPCreateModal({
  isOpen,
  onClose,
  onSubmit,
  isPending,
}: LPCreateModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  if (!isOpen) return null;

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    if (tags.includes(trimmed)) {
      setTagInput("");
      return;
    }
    setTags((prev) => [...prev, trimmed]);
    setTagInput("");
  };

  const removeTag = (target: string) => {
    setTags((prev) => prev.filter((tag) => tag !== target));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setThumbnail(String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    onSubmit({
      title,
      content,
      thumbnail,
      tags,
    });

    setTitle("");
    setContent("");
    setThumbnail("");
    setTagInput("");
    setTags([]);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 w-[360px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">LP 작성</h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="LP 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <textarea
            placeholder="LP 내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2 rounded h-24"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border p-2 rounded"
          />

          {thumbnail && (
            <img
              src={thumbnail}
              alt="미리보기"
              className="w-32 h-32 object-cover rounded border"
            />
          )}

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="태그 입력"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-1 border p-2 rounded"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-3 py-2 border rounded"
            >
              Add
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <div
                key={tag}
                className="px-2 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2"
              >
                <span>#{tag}</span>
                <button onClick={() => removeTag(tag)}>×</button>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full bg-pink-500 text-white py-2 rounded"
          >
            {isPending ? "추가 중..." : "Add LP"}
          </button>
        </div>
      </div>
    </div>
  );
}