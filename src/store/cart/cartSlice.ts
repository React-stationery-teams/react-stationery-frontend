import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "../store";

export const fetchCart = createAsyncThunk(
    'cart/fetchCart', async() => {
        const {data} = await axios.get<ItemProps[]>("http://192.168.0.102:3001/cart")
        return data;
    }
)

export type ItemProps = {
    id: string;
    mainPhoto: string;
    name: string;
    price: number;
    count: number
}


interface CartSliceState {
    totalPrice: number,
    cartItems: ItemProps[],
    cartStatus: "loading" | "success" | "error"
}

const initialState: CartSliceState = {
    totalPrice: 0,
    cartItems: [],
    cartStatus: 'loading' // loading | success | error
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action: PayloadAction<ItemProps>) =>{
            const findItem = state.cartItems.find((obj) => obj.id === action.payload.id)

            if(findItem){
                findItem.count++;
            }else{
                state.cartItems.push({
                    ...action.payload,
                });
            }
            state.totalPrice = state.cartItems.reduce((sum, obj) => {return obj.price * obj.count + sum}, 0);
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter((obj) => obj.id !== action.payload)
            state.totalPrice = state.cartItems.reduce((sum, obj) => {return obj.price * obj.count + sum}, 0);
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalPrice = 0;
        },
        minusItem: (state, action: PayloadAction<string>) => {
            const findItem = state.cartItems.find((obj) => obj.id === action.payload)
            if(findItem){
                findItem.count--;
                state.totalPrice -= findItem.price;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCart.pending, (state) => {
            state.cartStatus = 'loading';
            state.cartItems = [];
        });
        builder.addCase(fetchCart.fulfilled, (state, action) => {
            state.cartItems = action.payload;
            state.cartStatus = 'success'
            state.totalPrice = state.cartItems.reduce((sum, obj) => {return obj.price * obj.count + sum}, 0);
        });
        builder.addCase(fetchCart.rejected, (state) => {
            state.cartStatus = 'error';
            state.cartItems = [];
        });

    }
})

export const selectCart = (state: RootState) => state.cart

export const {setCartItems, minusItem, removeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;