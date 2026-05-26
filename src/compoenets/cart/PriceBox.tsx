import { useState, type JSX } from "react";
import { useCartActions, useCartInfo } from "../../hooks/useCartStore";

const PriceBox = (): JSX.Element => {
  const { total } = useCartInfo();
  const { clearCart } = useCartActions();

  const [isOpen, setIsOpen] = useState(false);

  const handleClearCart = () => {
    setIsOpen(true);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    clearCart();
    setIsOpen(false);
  };

  return (
    <>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-8">
        <div className="w-full text-right text-xl font-bold text-gray-900">
          총 가격: ${total.toLocaleString()}
        </div>

        <button
          onClick={handleClearCart}
          className="rounded border border-gray-400 px-6 py-3 hover:bg-gray-100"
        >
          전체 삭제
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
          <div className="rounded-lg bg-white p-8 text-center shadow-xl">
            <p className="mb-6 font-bold">정말 삭제하시겠습니까?</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancel}
                className="rounded bg-gray-200 px-5 py-2 hover:bg-gray-300"
              >
                아니요
              </button>

              <button
                onClick={handleConfirm}
                className="rounded bg-red-500 px-5 py-2 text-white hover:bg-red-600"
              >
                네
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PriceBox;
