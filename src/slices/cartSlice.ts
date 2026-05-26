import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { cartItems } from "../constants/cartItems";
import type { Lp } from "../types/cart";

export interface CartState {
  cartItems: Lp[];
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id,
      );

      if (item) {
        item.amount += 1;
      }
    },

    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.id === action.payload.id,
      );

      if (item) {
        item.amount -= 1;
      }
    },

    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id,
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default cartReducer;
