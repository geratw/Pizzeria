import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const axiosPizza = createAsyncThunk(
  "pizza/axiosPizzaStatus",

  async (param) => {
    const { category, sortBy } = param;

    const { data } = await axios.get(
      `https://6536cc68bb226bb85dd2a293.mockapi.io/items?${category}&sortBy=${sortBy}&order=desc`
    );

    return data;
  }
);

const initialState = {
  item: [],
  status: "",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPuzzaItem(state, action) {
      state.item = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(axiosPizza.pending, (state, action) => {
        state.status = "loading";
        state.item = [];
      })
      .addCase(axiosPizza.fulfilled, (state, action) => {
        state.item = action.payload;
        state.status = "success";
      })
      .addCase(axiosPizza.rejected, (state, action) => {
        state.status = "error";
        state.item = [];
      });
  },
});

export const { setPuzzaItem } = pizzaSlice.actions;

export default pizzaSlice.reducer;

// setIsLoading(true);
// dispatch(
//   axiosPizza({
//     category,
//     sortBy,
//   })
// );
