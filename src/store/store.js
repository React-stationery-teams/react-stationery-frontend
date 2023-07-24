import { configureStore } from "@reduxjs/toolkit";
import filter from "./filter/filterSlice";
import pagination from "./pagination/paginationSlice.js"
import search from "./search/searchSlice";

export const store = configureStore({
  reducer: { 
    filter,
    pagination,
    search 
  },
});
