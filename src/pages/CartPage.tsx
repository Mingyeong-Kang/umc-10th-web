import { Provider } from "react-redux";
import store from "../store/store";
import Navbar from "../compoenets/cart/Navbar";
import CartList from "../compoenets/cart/CartList";
import PriceBox from "../compoenets/cart/PriceBox";

const CartPageContent = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <CartList />
      <PriceBox />
    </div>
  );
};

const CartPage = () => {
  return (
    <Provider store={store}>
      <CartPageContent />
    </Provider>
  );
};

export default CartPage;
