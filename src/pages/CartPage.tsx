import CartList from "../compoenets/cart/CartList";
import PriceBox from "../compoenets/cart/PriceBox";
import type { JSX } from "react/jsx-runtime";

const CartPage = (): JSX.Element => {
  return (
    <main className="min-h-screen bg-white text-gray-900 pt-20">
      <CartList />
      <PriceBox />
    </main>
  );
};

export default CartPage;
