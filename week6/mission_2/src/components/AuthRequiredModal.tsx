interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AuthRequiredModal = ({ open, onConfirm, onCancel }: Props) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="w-[90%] max-w-sm rounded-lg bg-[#1c1c1c] p-6 shadow-xl">
        <h2 className="text-lg font-bold text-white">로그인이 필요합니다</h2>
        <p className="mt-2 text-sm text-gray-300">
          이 페이지를 보려면 로그인 후 이용해 주세요.
        </p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded border border-gray-600 text-gray-200 hover:bg-gray-800"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded bg-[#b2dab1] text-black font-bold hover:bg-[#9bc99a]"
          >
            로그인 하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};
