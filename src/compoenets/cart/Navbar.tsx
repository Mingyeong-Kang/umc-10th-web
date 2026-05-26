import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useCustonRedux";
import { calculateTotals } from "../../slices/cartSlice";

const Navbar = () => {
  const { amount, cartItems } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);

  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <h1
        onClick={() => {
          window.location.href = "/";
        }}
        className="cursor-pointer text-2xl font-semibold"
      >
        Ohthani Ahn
      </h1>

      <div className="flex items-center space-x-2">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;
