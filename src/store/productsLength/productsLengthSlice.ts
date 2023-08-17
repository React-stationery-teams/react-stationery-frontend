import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { RootState } from '../store';

export const fetchItemsLength = createAsyncThunk<Item[], Record<string, string>>(
    'products/fetchItemsLength', async(params) => {
        const {
            parameter,
            search
          } = params;
        const {data} = await axios.get<Item[]>(`http://192.168.0.102:3001/products?${parameter}&${search}`)
        return data;
    }
)

type Item = {
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

interface LengthAllItems {
    allItems: Item[]
}

const initialState: LengthAllItems = {
    allItems: [],
};

const productsLengthSlice = createSlice({
    name: "productsLength",
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchItemsLength.fulfilled, (state, action) => {
            state.allItems = action.payload;
        });
        builder.addCase(fetchItemsLength.rejected, (state) => {
            state.allItems = [];
        });
    },
});

export const selectAllProducts = (state: RootState) => state.productsLength

export default productsLengthSlice.reducer; 
