import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoriesId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

const filtesSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoriesId(state, action) {
      state.categoriesId = action.payload;
    },
  },
});

export const { setCategoriesId } = filtesSlice.actions;

export default filtesSlice.reducer;
