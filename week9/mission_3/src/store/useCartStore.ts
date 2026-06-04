import { create } from 'zustand';
import initialCartItems, { type CartItem } from '../constants/cartItems';

interface CartStore {
  cartItems: CartItem[];
  amount: number;
  total: number;
  isModalOpen: boolean;

  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
  openModal: () => void;
  closeModal: () => void;
}

const useCartStore = create<CartStore>((set, get) => ({
  cartItems: initialCartItems,
  amount: 0,
  total: 0,
  isModalOpen: false,

  increase: (id) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item,
      ),
    }));
    get().calculateTotals();
  },

  decrease: (id) => {
    set((state) => {
      const next = state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item,
        )
        .filter((item) => item.amount >= 1);
      return { cartItems: next };
    });
    get().calculateTotals();
  },

  removeItem: (id) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    }));
    get().calculateTotals();
  },

  clearCart: () => {
    set({ cartItems: [] });
    get().calculateTotals();
  },

  calculateTotals: () => {
    let amount = 0;
    let total = 0;
    get().cartItems.forEach((item) => {
      amount += item.amount;
      total += item.amount * Number(item.price);
    });
    set({ amount, total });
  },

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));

export default useCartStore;
