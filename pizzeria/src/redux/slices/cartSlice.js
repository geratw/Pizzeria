import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countItems: 0,
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      findItem
        ? findItem.count++
        : state.items.push({ ...action.payload, count: 1 });

      state.totalPrice = state.items.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0
      );
      state.countItems++;
    },
    minusItem(state, action) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (findItem) {
        findItem.count--;
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id === action.payload);
    },
    clearItem(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem,minusItem,  clearItem } = cartSlice.actions;

export default cartSlice.reducer;
