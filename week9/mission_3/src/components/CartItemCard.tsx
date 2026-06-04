import useCartStore from '../store/useCartStore';
import type { CartItem } from '../constants/cartItems';

interface Props {
  item: CartItem;
}

const CartItemCard = ({ item }: Props) => {
  const { increase, decrease, removeItem } = useCartStore();
  const { id, title, singer, price, img, amount } = item;

  return (
    <article className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <img
        src={img}
        alt={title}
        className="h-24 w-24 flex-shrink-0 rounded-md object-cover"
      />

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h2 className="line-clamp-1 text-base font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{singer}</p>
          <p className="mt-2 text-sm font-bold text-violet-700">
            {Number(price).toLocaleString()}원
          </p>
        </div>

        <button
          type="button"
          onClick={() => removeItem(id)}
          className="mt-2 self-start text-xs font-medium text-rose-500 hover:text-rose-700"
        >
          삭제
        </button>
      </div>

      <div className="flex flex-col items-center justify-center gap-1">
        <button
          type="button"
          onClick={() => increase(id)}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-700 hover:bg-violet-200"
          aria-label="수량 증가"
        >
          +
        </button>
        <span className="min-w-[1.5rem] text-center text-sm font-semibold text-slate-800">
          {amount}
        </span>
        <button
          type="button"
          onClick={() => decrease(id)}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 text-violet-700 hover:bg-violet-200"
          aria-label="수량 감소"
        >
          −
        </button>
      </div>
    </article>
  );
};

export default CartItemCard;
