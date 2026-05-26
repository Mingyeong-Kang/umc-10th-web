import { type Lp } from "../../types/cart";
import { useCartActions } from "../../hooks/useCartStore";
import type { JSX } from "react/jsx-runtime";

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps): JSX.Element => {
  const { increase, decrease, removeItem } = useCartActions();

  const handleDecreaseAmount = () => {
    if (lp.amount === 1) {
      removeItem(lp.id);
      return;
    }

    decrease(lp.id);
  };

  const handleIncreaseAmount = () => {
    increase(lp.id);
  };

  const handleRemoveItem = () => {
    removeItem(lp.id);
  };

  return (
    <div className="flex items-center gap-6 border-b border-gray-200 px-4 py-6">
      <img
        src={lp.img}
        alt={`${lp.title} LP 이미지`}
        className="h-24 w-24 rounded object-cover"
      />

      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-800">{lp.title}</h3>
        <p className="text-gray-500">{lp.singer}</p>
        <p className="font-bold text-gray-900">${lp.price.toLocaleString()}</p>

        <button
          onClick={handleRemoveItem}
          className="mt-2 text-sm text-red-500 hover:text-red-700"
        >
          삭제
        </button>
      </div>

      <div className="flex items-center">
        <button
          onClick={handleDecreaseAmount}
          className="rounded-l bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
        >
          -
        </button>

        <span className="min-w-12 border-y border-gray-300 px-5 py-2 text-center">
          {lp.amount}
        </span>

        <button
          onClick={handleIncreaseAmount}
          className="rounded-r bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
