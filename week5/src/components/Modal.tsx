import useCartStore from '../store/useCartStore';

const Modal = () => {
  const { closeModal, clearCart } = useCartStore();

  const handleNo = () => {
    closeModal();
  };

  const handleYes = () => {
    clearCart();
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 flex flex-col items-center gap-6 shadow-xl">
        <p className="text-gray-800 text-lg font-semibold">
          정말 삭제하시겠습니까?
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleNo}
            className="px-6 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            아니요
          </button>
          <button
            onClick={handleYes}
            className="px-6 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;