interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-6">{title}</p>
        <div className="flex justify-center gap-3">
          <button onClick={onConfirm} className="px-4 py-2 border rounded">
            예
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-pink-500 text-white rounded"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}