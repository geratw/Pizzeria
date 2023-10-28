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
    setSort(state, action) {
      state.sort = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.categoriesId = Number(action.payload.categoriesId);
    },
  },
});

export const { setCategoriesId, setSort, setFilters } = filtesSlice.actions;

export default filtesSlice.reducer;
