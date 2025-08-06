import { createSlice } from '@reduxjs/toolkit'
import { packageExtraReducer } from './package.extraReducer'

const initialState = {
  packages: [],
  currentPackage: {},
  isLoading: false,
  error: null,
}

const packageSlice = createSlice({
  name: 'package',
  initialState,
  reducers: {
    setCurrentPackage: (state, action) => {
      state.currentPackage = state.packages.find(
        (item) => item.id === action.payload
      )
    },
  },
  extraReducers: packageExtraReducer,
})

export const { setCurrentPackage } = packageSlice.actions

export default packageSlice.reducer
