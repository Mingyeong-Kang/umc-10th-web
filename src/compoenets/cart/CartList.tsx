import CartItem from "./CartItem";
import { useAppSelector } from "../../hooks/useCustonRedux";

const CartList = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <div className="flex flex-col justify-center">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;
