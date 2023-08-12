import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState = {
    value:  '',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue: (state, action) => {
            state.value = action.payload
        }
    }
})

export const selectSearch = (state: RootState) => state.search

export const {setSearchValue} = searchSlice.actions;

export default searchSlice.reducer;