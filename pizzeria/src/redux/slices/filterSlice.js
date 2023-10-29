import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
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
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.categoriesId = Number(action.payload.categoriesId);
    },
  },
});

export const { setCategoriesId, setSort, setFilters , setSearchValue} = filtesSlice.actions;

export default filtesSlice.reducer;
