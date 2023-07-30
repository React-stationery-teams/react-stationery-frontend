import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchItems = createAsyncThunk(
    'items/fetchItems', async(params) => {
        const {
            parameter,
            search, 
            paginationValue
          } = params;
        const {data} = await axios.get(`http://192.168.0.104:3001/products?${parameter}&${search}&${paginationValue}`)
        return data;
    }
)

const initialState = {
    items: [],
    status: 'loading', //loading | error | success
};

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        setItems(state, action){
            state.items = action.payload.items
        },
    },
    extraReducers: {
        [fetchItems.pending]: (state, action) => {
            state.status = 'loading';
            state.items = []; 
        },
        [fetchItems.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.status = 'success'
        },
        [fetchItems.rejected]: (state, action) => {
            state.status = 'error';
            state.items = [];
        },
    },
});

export const {setItems} = itemsSlice.actions;

export default itemsSlice.reducer; 
