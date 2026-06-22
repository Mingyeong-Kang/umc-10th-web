import { create } from "zustand";
import type { CartItem } from "../types/cart";
import { initialCartItems } from "../constants/cartItems";

interface CartState {
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

const calcTotals = (items: CartItem[]) => ({
  amount: items.reduce((sum, item) => sum + item.amount, 0),
  total: items.reduce((sum, item) => sum + item.price * item.amount, 0),
});

export const useCartStore = create<CartState>((set) => ({
  cartItems: initialCartItems,
  ...calcTotals(initialCartItems),
  isModalOpen: false,

  increase: (id) =>
    set((state) => {
      const updated = state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      );
      return { cartItems: updated, ...calcTotals(updated) };
    }),

  decrease: (id) =>
    set((state) => {
      const updated = state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0);
      return { cartItems: updated, ...calcTotals(updated) };
    }),

  removeItem: (id) =>
    set((state) => {
      const updated = state.cartItems.filter((item) => item.id !== id);
      return { cartItems: updated, ...calcTotals(updated) };
    }),

  clearCart: () => set({ cartItems: [], amount: 0, total: 0 }),

  calculateTotals: () =>
    set((state) => calcTotals(state.cartItems)),

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));
