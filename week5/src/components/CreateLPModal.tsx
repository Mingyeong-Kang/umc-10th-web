import { useState } from "react";
import useCreateLPMutation from "../hooks/useCreateLPMutation";
import type { CreateLPRequest } from "../types/common";

interface Props {
  onClose: () => void;
}

const CreateLPModal = ({ onClose }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const { mutate: createLP, isPending } =
    useCreateLPMutation(onClose);

  const handleAddTag = () => {
    if (!tagInput.trim()) return;

    setTags((prev) => [...prev, tagInput.trim()]);
    setTagInput("");
  };

  const handleDeleteTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
  const request: CreateLPRequest = {
    title,
    content,
    thumbnail: "https://picsum.photos/400/400",
    tags,
    published: true,
  };

  createLP({
    request,
  });
};

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 text-white p-6 rounded-xl w-[500px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <div className="flex justify-end mb-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* LP 이미지 */}
        <div className="relative w-48 h-48 mx-auto mb-6">
          <img
            src={
              thumbnail
                ? URL.createObjectURL(thumbnail)
                : "https://picsum.photos/400/400"
            }
            alt="LP Thumbnail"
            className="w-full h-full object-cover rounded-full shadow-2xl"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gray-950 border-2 border-gray-700" />
          </div>
        </div>

        {/* 이미지 업로드 */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setThumbnail(e.target.files?.[0] ?? null)
          }
          className="w-full mb-4 text-sm text-gray-300"
        />

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="LP Name"
          className="w-full p-2 mb-3 bg-gray-800 rounded"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={1}
          placeholder="LP Content"
          className="w-full p-2 mb-3 bg-gray-800 rounded"
        />

        <div className="flex gap-2 mb-3">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="LP Tag"
            className="flex-1 p-2 bg-gray-800 rounded"
          />
          <button
            onClick={handleAddTag}
            className="px-3 bg-gray-400 rounded"
          >
            add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-700 rounded-full text-sm"
            >
              #{tag}
              <button
                onClick={() => handleDeleteTag(index)}
                className="ml-1"
              >
                x
              </button>
            </span>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="w-full py-2 bg-gray-400 rounded"
        >
          Add LP
        </button>
      </div>
    </div>
  );
};

export default CreateLPModal;