import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import axios from 'axios';
import { RootState } from "../store";

export const fetchFavorite = createAsyncThunk<FavoriteItem[]>(
    'favorite/fetchFavorite', async() => {
        const {data} = await axios.get<FavoriteItem[]>("http://192.168.0.104:3001/favorite")
        return data;
    }
)

type FavoriteItem = {
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

interface FavoriteSliceState {
    favoriteItems: FavoriteItem[],
    favoriteStatus: "loading" | "success" | "error"
}

const initialState: FavoriteSliceState = {
    favoriteItems: [],
    favoriteStatus: 'loading' // loading | success | error
}

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<FavoriteItem>){
            state.favoriteItems.push(action.payload)
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.favoriteItems = state.favoriteItems.filter((obj) => obj.id !== action.payload)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFavorite.pending, (state) => {
            state.favoriteStatus = 'loading';
            state.favoriteItems = [];
        });
        builder.addCase(fetchFavorite.fulfilled, (state, action) => {
            state.favoriteItems = action.payload;
            state.favoriteStatus = 'success';
        });
        builder.addCase(fetchFavorite.rejected, (state) => {
            state.favoriteStatus = 'error';
            state.favoriteItems = [];
        });
    },
})

export const selectFavorite = (state: RootState) => state.favorite

export const {setItems, removeItem} = favoriteSlice.actions;

export default favoriteSlice.reducer;