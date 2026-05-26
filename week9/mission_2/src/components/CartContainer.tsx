import { useAppDispatch, useAppSelector } from '../app/hooks';
import { openModal } from '../features/modal/modalSlice';
import CartItemCard from './CartItemCard';

const CartContainer = () => {
  const dispatch = useAppDispatch();
  const { cartItems, amount, total } = useAppSelector((state) => state.cart);

  if (amount < 1 || cartItems.length === 0) {
    return (
      <section className="mx-auto max-w-5xl px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-800">장바구니가 비었습니다</h2>
        <p className="mt-3 text-slate-500">담아둔 음반이 없어요.</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
          담은 음반
        </h2>
      </header>

      <ul className="space-y-3">
        {cartItems.map((item) => (
          <li key={item.id}>
            <CartItemCard item={item} />
          </li>
        ))}
      </ul>

      <hr className="my-8 border-slate-200" />

      <footer className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-slate-700">
          <p className="text-sm">
            총 수량 <span className="font-semibold">{amount}개</span>
          </p>
          <p className="mt-1 text-lg font-bold">
            총 금액 <span className="text-violet-700">{total.toLocaleString()}원</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => dispatch(openModal())}
          className="rounded-md border border-rose-400 px-4 py-2 text-sm font-semibold text-rose-500 transition hover:bg-rose-500 hover:text-white"
        >
          장바구니 비우기
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
