import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchCart = createAsyncThunk(
    'cart/fetchCart', async() => {
        const {data} = await axios.get("http://192.168.0.104:3001/cart")
        return data;
    }
)

const initialState = {
    totalPrice: 0,
    cartItems: [],
    cartStatus: 'loading' // loading | success | error
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems: (state, action) =>{
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
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter((obj) => obj.id !== action.payload)
            state.totalPrice = state.cartItems.reduce((sum, obj) => {return obj.price * obj.count + sum}, 0);
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalPrice = 0;
        },
        minusItem: (state, action) => {
            const findItem = state.cartItems.find((obj) => obj.id === action.payload)
            if(findItem){
                findItem.count--;
                state.totalPrice -= findItem.price;
            }
        }
    },
    extraReducers: {
        [fetchCart.pending]: (state) => {
            state.cartStatus = 'loading';
            state.cartItems = []; 
        },
        [fetchCart.fulfilled]: (state, action) => {
            state.cartItems = action.payload;
            state.cartStatus = 'success'
            state.totalPrice = state.cartItems.reduce((sum, obj) => {return obj.price * obj.count + sum}, 0);
        },
        [fetchCart.rejected]: (state) => {
            state.cartStatus = 'error';
            state.cartItems = [];
        },
    },
})

export const {setCartItems, minusItem, removeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;