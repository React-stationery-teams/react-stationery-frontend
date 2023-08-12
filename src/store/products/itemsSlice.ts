import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '../store';


export const fetchItems = createAsyncThunk<ItemProps[], Record<string, string>>(
    'items/fetchItems', async(params) => {
        const {
            parameter,
            search, 
            paginationValue
          } = params;
        const {data} = await axios.get<ItemProps[]>(`http://192.168.0.104:3001/products?${parameter}&${search}&${paginationValue}`)
        return data;
    }
)

type ItemProps = {
    id: string;
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
    status: "loading" | "success" | "error"
}


const initialState: ProductSliceState  = {
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
    extraReducers: (builder) => {
        builder.addCase(fetchItems.pending, (state) => {
            state.status = 'loading';
            state.items = [];
        });
        builder.addCase(fetchItems.fulfilled, (state, action) => {
            state.items = action.payload;
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
