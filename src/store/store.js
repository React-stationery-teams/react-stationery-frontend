import { configureStore } from "@reduxjs/toolkit";
import filter from "./filter/filterSlice";
import pagination from "./pagination/paginationSlice.js"
import search from "./search/searchSlice";
import cart from "./cart/cartSlice";
import items from "./products/itemsSlice";
import productsLength from "./productsLength/productsLengthSlice";
import favorite from "./favorite/favoriteSlice";

export const store = configureStore({
  reducer: { 
    filter,
    pagination,
    search,
    cart,
    items,
    productsLength,
    favorite,
  },
});
