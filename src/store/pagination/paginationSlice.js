import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paginationId: 0,
}

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        setPaginationId: (state, action) => {
            state.paginationId = action.payload
        },
    },
})

export const {setPaginationId} = paginationSlice.actions;

export default paginationSlice.reducer;
