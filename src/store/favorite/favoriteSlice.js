import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchFavorite = createAsyncThunk(
    'favorite/fetchFavorite', async() => {
        const {data} = await axios.get("http://192.168.0.104:3001/favorite")
        return data;
    }
)

const initialState = {
    favoriteItems: [],
    favoriteStatus: 'loading' // loading | success | error
}

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        setItems(state, action){
            state.favoriteItems.push(action.payload)
        },
        removeItem: (state, action) => {
            state.favoriteItems = state.favoriteItems.filter((obj) => obj.id !== action.payload)
        },
    },
    extraReducers: {
        [fetchFavorite.pending]: (state) => {
            state.favoriteStatus = 'loading';
            state.favoriteItems = []; 
        },
        [fetchFavorite.fulfilled]: (state, action) => {
            state.favoriteItems = action.payload;
            state.favoriteStatus = 'success'
        },
        [fetchFavorite.rejected]: (state) => {
            state.favoriteStatus = 'error';
            state.favoriteItems = [];
        },
    },
})

export const {setItems, removeItem} = favoriteSlice.actions;

export default favoriteSlice.reducer;