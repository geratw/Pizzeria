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
        state.countItems--;

        state.totalPrice -= findItem.price;
        if (findItem.count <= 0) {
          const removedItem = state.items.find(
            (item) => item.id === action.payload.id
          );
          if (removedItem) {
            state.items = state.items.filter(
              (obj) => obj.id !== action.payload.id
            );
          }
        }
      }
    },
    removeItem(state, action) {
      const removedItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (removedItem) {
        state.totalPrice -= removedItem.price * removedItem.count;
        state.countItems -= removedItem.count;
        state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      }
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
      state.countItems = 0;
    },
  },
});

export const selectCart = (state) => state.cart;
export const selectFilter = (state) => state.filter;
export const selectCartItemById = (id) => (state) =>
  state.cart.items.find((item) => item.id === id);

export const { addItem, removeItem, minusItem, clearItem } = cartSlice.actions;

export default cartSlice.reducer;
