import { useEffect } from 'react';
import useCartStore from './store/useCartStore';
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
import Modal from './components/Modal';

const App = () => {
  const { cartItems, calculateTotals } = useCartStore();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Modal />
      <Navbar />
      <main>
        <CartContainer />
      </main>
    </div>
  );
};

export default App;
