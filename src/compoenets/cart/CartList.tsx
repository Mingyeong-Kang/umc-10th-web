import CartItem from "./CartItem";
import { useCartInfo } from "../../hooks/useCartStore";
import type { JSX } from "react/jsx-runtime";

const CartList = (): JSX.Element => {
  const { cartItems } = useCartInfo();

  return (
    <div className="mx-auto flex max-w-5xl flex-col pt-24">
      {cartItems.map((item) => (
        <CartItem key={item.id} lp={item} />
      ))}
    </div>
  );
};

export default CartList;
