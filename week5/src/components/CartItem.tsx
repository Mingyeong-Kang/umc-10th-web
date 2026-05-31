import useCartStore from '../store/useCartStore';
import type { CartItem as CartItemType } from '../constants/cartItems';

interface Props {
  item: CartItemType;
}

const CartItem = ({ item }: Props) => {
  const { increase, decrease, removeItem, calculateTotals } = useCartStore();

  const handleIncrease = () => {
    increase(item.id);
    calculateTotals();
  };

  const handleDecrease = () => {
    decrease(item.id);
    calculateTotals();
  };

  const handleRemove = () => {
    removeItem(item.id);
    calculateTotals();
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-700">
      <div className="flex items-center gap-4">
        <img
          src={item.img}
          alt={item.title}
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <p className="font-semibold text-white">{item.title}</p>
          <p className="text-sm text-gray-400">{item.singer}</p>
          <p className="text-sm font-medium text-gray-300">${item.price}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded hover:bg-gray-700 text-white"
        >
          -
        </button>
        <span className="w-6 text-center font-medium text-white">{item.amount}</span>
        <button
          onClick={handleIncrease}
          className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded hover:bg-gray-700 text-white"
        >
          +
        </button>
        <button
          onClick={handleRemove}
          className="ml-4 text-red-400 hover:text-red-500"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CartItem;