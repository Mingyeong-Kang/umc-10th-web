import { useAppDispatch, useAppSelector } from "../../hooks/useCustonRedux";
import { clearCart } from "../../slices/cartSlice";

const PriceBox = () => {
  const { total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleInitializeCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex justify-between p-12">
      <button
        onClick={handleInitializeCart}
        className="cursor-pointer rounded-md border p-4"
      >
        장바구니 초기화
      </button>

      <div>총 가격: {total}원</div>
    </div>
  );
};

export default PriceBox;
