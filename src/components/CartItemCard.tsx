import type { CartItem } from "../types/cart";
import { useCartStore } from "../stores/useCartStore";

interface Props {
  item: CartItem;
}

export default function CartItemCard({ item }: Props) {
  const increase = useCartStore((state) => state.increase);
  const decrease = useCartStore((state) => state.decrease);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md">
      {/* 앨범 이미지 */}
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://picsum.photos/seed/default/80/80";
          }}
        />
      </div>

      {/* 곡 정보 */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-gray-900">{item.title}</p>
        <p className="truncate text-sm text-gray-500">{item.artist}</p>
        <p className="mt-1 text-sm font-medium text-pink-600">
          ₩{item.price.toLocaleString()}
        </p>
      </div>

      {/* 수량 조절 */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => decrease(item.id)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-pink-400 hover:text-pink-500 active:scale-95"
          aria-label="수량 감소"
        >
          −
        </button>
        <span className="w-6 text-center font-semibold text-gray-800">
          {item.amount}
        </span>
        <button
          onClick={() => increase(item.id)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition hover:border-pink-400 hover:text-pink-500 active:scale-95"
          aria-label="수량 증가"
        >
          +
        </button>
      </div>

      {/* 소계 */}
      <div className="w-20 text-right">
        <p className="font-semibold text-gray-800">
          ₩{(item.price * item.amount).toLocaleString()}
        </p>
      </div>

      {/* 개별 삭제 */}
      <button
        onClick={() => removeItem(item.id)}
        className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-red-50 hover:text-red-500"
        aria-label="아이템 삭제"
      >
        ✕
      </button>
    </div>
  );
}
