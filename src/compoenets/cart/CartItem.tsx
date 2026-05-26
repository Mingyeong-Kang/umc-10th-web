import type { Lp } from "../../types/cart";
import { useAppDispatch } from "../../hooks/useCustonRedux";
import { decrease, increase, removeItem } from "../../slices/cartSlice";

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  const dispatch = useAppDispatch();

  const handleIncreaseCount = () => {
    dispatch(increase({ id: lp.id }));
  };

  const handleDecreaseCount = () => {
    if (lp.amount === 1) {
      dispatch(removeItem({ id: lp.id }));
      return;
    }

    dispatch(decrease({ id: lp.id }));
  };

  return (
    <div className="flex items-center border-b border-gray-200 p-4">
      <img
        src={lp.img}
        alt={`${lp.title}의 LP 이미지`}
        className="mr-4 h-20 w-20 rounded object-cover"
      />

      <div className="flex-1">
        <h3 className="text-xl font-semibold">{lp.title}</h3>
        <p className="text-sm text-gray-600">{lp.singer}</p>
        <p className="text-sm font-bold text-gray-600">{lp.price} 원</p>
      </div>

      <div className="flex items-center">
        <button
          onClick={handleDecreaseCount}
          className="rounded-l bg-gray-300 px-3 py-1 text-gray-800 hover:bg-gray-400"
        >
          -
        </button>

        <span className="border-y border-gray-300 px-4 py-[3px]">
          {lp.amount}
        </span>

        <button
          onClick={handleIncreaseCount}
          className="rounded-r bg-gray-300 px-3 py-1 text-gray-800 hover:bg-gray-400"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
