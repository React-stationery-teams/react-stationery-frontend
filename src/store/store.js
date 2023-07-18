import { configureStore } from "@reduxjs/toolkit";
import filter from "./filter/filterSlice";
import pagination from "./pagination/paginationSlice.js"

export const store = configureStore({
  reducer: { 
    filter,
    pagination, 
  },
});
