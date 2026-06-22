import { useCartStore } from "../stores/useCartStore";

export default function CartConfirmModal() {
  const isModalOpen = useCartStore((state) => state.isModalOpen);
  const closeModal = useCartStore((state) => state.closeModal);
  const clearCart = useCartStore((state) => state.clearCart);

  if (!isModalOpen) return null;

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeModal}
    >
      <div
        className="w-[90%] max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 text-4xl">🗑️</div>
        <h3 className="mb-2 text-lg font-bold text-gray-900">
          장바구니를 비울까요?
        </h3>
        <p className="mb-6 text-sm text-gray-500">
          정말 삭제하시겠습니까?
          <br />
          담아둔 트랙이 모두 사라집니다.
        </p>

        <div className="flex gap-3">
          <button
            onClick={closeModal}
            className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 active:scale-95"
          >
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 rounded-lg bg-pink-500 py-2.5 text-sm font-medium text-white transition hover:bg-pink-600 active:scale-95"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
