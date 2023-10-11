import { configureStore } from "@reduxjs/toolkit";
import filter from "./filter/filterSlice";
import pagination from "./pagination/paginationSlice"
import search from "./search/searchSlice";
import cart from "./cart/cartSlice";
import items from "./products/itemsSlice";
import favorite from "./favorite/favoriteSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { 
    filter,
    pagination,
    search,
    cart,
    items,
    favorite,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
