import { useCartStore } from "../stores/useCartStore";
import CartItemCard from "./CartItemCard";

export default function CartList() {
  const cartItems = useCartStore((state) => state.cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-4 text-6xl">🎵</div>
        <p className="text-xl font-semibold text-gray-700">
          장바구니가 비어 있습니다.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          마음에 드는 트랙을 담아보세요!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {cartItems.map((item) => (
        <CartItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}
