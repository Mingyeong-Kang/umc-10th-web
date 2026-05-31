import { useEffect } from 'react';
import useCartStore from '../store/useCartStore';
import CartItem from '../components/CartItem';
import Modal from '../components/Modal';

const CartPage = () => {
  const { cartItems, amount, total, isOpen, openModal, calculateTotals } = useCartStore();

  useEffect(() => {
    calculateTotals();
  }, [cartItems]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {isOpen && <Modal />}

      {cartItems.length === 0 ? (
        <div className="text-center py-20 text-gray-400 text-lg">
          장바구니가 비어있어요 🛒
        </div>
      ) : (
        <>
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={openModal}
              className="px-8 py-3 border border-gray-500 rounded text-white hover:bg-gray-700 transition"
            >
              전체 삭제
            </button>
          </div>
        </>
      )}

      <div className="mt-8 border-t border-gray-700 pt-6 flex justify-between items-center">
        <p className="text-gray-300">
          총 수량: <span className="font-bold text-white">{amount}</span>개
        </p>
        <p className="text-white text-lg font-bold">
          총 금액: ₩{total.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default CartPage;