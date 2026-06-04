import useCartStore from '../store/useCartStore';

const Modal = () => {
  const { isModalOpen, clearCart, closeModal } = useCartStore();

  if (!isModalOpen) return null;

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-[90%] max-w-sm rounded-xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-center text-lg font-semibold text-slate-900">
          정말 전체 삭제하시겠습니까?
        </h3>
        <p className="mt-2 text-center text-sm text-slate-500">
          담은 음반이 모두 사라져요.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-md bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
          >
            네
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
