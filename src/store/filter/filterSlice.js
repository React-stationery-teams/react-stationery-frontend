import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    parameterId: 0,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setParametersId: (state, action) => {
        state.parameterId = action.payload
    },
  },
})


export const {setParametersId } = filterSlice.actions

export default filterSlice.reducer