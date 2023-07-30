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
        setCartItems(state, action){
            state.cartItems.push(action.payload)
        },
        removeItem: (state, action) => {
            state.cartItems = state.cartItems.filter((obj) => obj.id !== action.payload)
        },
        clearCart: (state) => {
            state.cartItems = []
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
        },
        [fetchCart.rejected]: (state) => {
            state.cartStatus = 'error';
            state.cartItems = [];
        },
    },
})

export const {setCartItems, removeItem, clearCart} = cartSlice.actions;

export default cartSlice.reducer;