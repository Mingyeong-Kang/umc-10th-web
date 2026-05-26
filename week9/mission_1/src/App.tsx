import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { calculateTotals } from './features/cart/cartSlice';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';

const App = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        <CartContainer />
      </main>
    </div>
  );
};

export default App;
