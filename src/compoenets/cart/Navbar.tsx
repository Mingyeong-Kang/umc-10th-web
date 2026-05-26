import { useEffect, type JSX } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCartActions, useCartInfo } from "../../hooks/useCartStore";

const Navbar = (): JSX.Element => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <nav className="fixed z-10 w-full bg-white shadow-md dark:bg-gray-900">
      <div className="flex items-center justify-between p-4">
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          SpinningSpinning Dolimpan
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/search"
            className="text-gray-700 hover:text-blue-500 dark:text-gray-300"
          >
            검색
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-500 dark:text-gray-300"
          >
            <FaShoppingCart className="text-xl" />
            <span className="font-medium">{amount}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
