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
    items: [],
};

const productsLengthSlice = createSlice({
    name: "productsLength",
    initialState,
    extraReducers: {
        [fetchItemsLength.fulfilled]: (state, action) => {
            state.items = action.payload;
        }
    },
});

export default productsLengthSlice.reducer; 
