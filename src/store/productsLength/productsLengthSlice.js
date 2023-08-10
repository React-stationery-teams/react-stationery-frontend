import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchItemsLength = createAsyncThunk(
    'products/fetchItemsLength', async(params) => {
        const {
            parameter,
            search
          } = params;
        const {data} = await axios.get(`http://192.168.0.104:3001/products?${parameter}&${search}`)
        return data;
    }
)

const initialState = {
    allProducts: [],
};

const productsLengthSlice = createSlice({
    name: "productsLength",
    initialState,
    extraReducers: {
        [fetchItemsLength.fulfilled]: (state, action) => {
            state.allProducts = action.payload;
        }
    },
});

export const selectAllProducts = (state) => state.productsLength

export default productsLengthSlice.reducer; 
