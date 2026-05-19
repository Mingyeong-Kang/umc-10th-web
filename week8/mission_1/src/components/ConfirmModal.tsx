import { useEffect } from "react";

interface Props {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  open,
  title,
  description,
  confirmLabel = "예",
  cancelLabel = "아니오",
  destructive = false,
  isLoading = false,
  onConfirm,
  onCancel,
}: Props) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={onCancel}
    >
      <div
        className="w-[90%] max-w-sm rounded-lg bg-[#1c1c1c] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-white">{title}</h2>
        {description && (
          <p className="mt-2 text-sm text-gray-300 whitespace-pre-line">
            {description}
          </p>
        )}
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 text-sm rounded border border-gray-600 text-gray-200 hover:bg-gray-800 disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`px-4 py-2 text-sm rounded font-bold disabled:opacity-50 ${
              destructive
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-[#b2dab1] text-black hover:bg-[#9bc99a]"
            }`}
          >
            {isLoading ? "처리 중..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
