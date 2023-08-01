import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDishWithQuantity } from "../../interfaces/IDish";
import ICartItem from "../../interfaces/ICartItem";


interface CartState {
  items: ICartItem[];
  totalPrice: number;
  deliveryPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  deliveryPrice: 1000,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const dish = action.payload;
      const existingItem = state.items.find((item) => item.id === dish.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.itemTotalPrice = dish.price * existingItem.quantity;
      } else {
        state.items.push({ ...dish, quantity: 1, itemTotalPrice: dish.price });
      }
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.totalPrice += state.deliveryPrice;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const itemToRemove = state.items.find((item) => item.id === itemId);
      if (itemToRemove) {
        const removedItemTotalPrice =
          itemToRemove.price * itemToRemove.quantity;
        state.items = state.items.filter((item) => item.id !== itemId);
        state.totalPrice -= removedItemTotalPrice;
        if (state.items.length === 0) {
          state.totalPrice = 0;
        }
      }
    },
    clearCart: () => {
      return initialState;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
