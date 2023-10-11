import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '../store';


export const fetchItems = createAsyncThunk<ItemData, Record<string, string>>(
    'items/fetchItems', async(params) => {
        const {
            parameter,
            search, 
            paginationValue
          } = params;
        const {data} = await axios.get<ItemData>(`https://e864ead0a6a97fd9.mokky.dev/products?${search}&${parameter}&${paginationValue}`)
        return data;
    }
)

type ItemMeta = {
    current_page: number,
    per_page: number,
    remaining_count: number,
    total_items: number,
    total_pages: number
}

type ItemData = {
    items: ItemProps[],
    meta: ItemMeta,
}

export type ItemProps = {
    id: number,
    itemId: string;
    mainPhoto: string;
    name: string;
    price: number;
    count: number;
    type: number,
    weight: number,
    photos: string[],
    description: string,
    property: string,
}

interface ProductSliceState {
    items: ItemProps[],
    status: "loading" | "success" | "error",
    paginationCount: number
}


const initialState: ProductSliceState  = {
    items: [],
    status: 'loading', //loading | error | success
    paginationCount: 0
};

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        setItems(state, action){
            state.items = action.payload.items
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.status = 'loading';
            state.items = [];
        });
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.items = action.payload.items;
            state.paginationCount = action.payload.meta.total_pages;
            state.status = 'success'
        });
        builder.addCase(fetchItems.rejected, (state) => {
            state.status = 'error';
            state.items = [];
        })
    },
});

export const selectItems = (state: RootState) => state.items

export const {setItems} = itemsSlice.actions;

export default itemsSlice.reducer; 
