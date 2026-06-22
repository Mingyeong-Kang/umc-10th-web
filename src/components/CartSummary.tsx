import { useCartStore } from "../stores/useCartStore";

export default function CartSummary() {
  const amount = useCartStore((state) => state.amount);
  const total = useCartStore((state) => state.total);
  const openModal = useCartStore((state) => state.openModal);
  const cartItems = useCartStore((state) => state.cartItems);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-bold text-gray-900">주문 요약</h2>

      <div className="space-y-3 border-b border-gray-100 pb-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>총 트랙 수</span>
          <span className="font-medium text-gray-900">{amount}곡</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>아이템 수</span>
          <span className="font-medium text-gray-900">{cartItems.length}종</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-base font-semibold text-gray-900">총 금액</span>
        <span className="text-xl font-bold text-pink-600">
          ₩{total.toLocaleString()}
        </span>
      </div>

      <button
        onClick={openModal}
        disabled={cartItems.length === 0}
        className="mt-5 w-full rounded-lg bg-red-50 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        전체 삭제
      </button>
    </div>
  );
}
