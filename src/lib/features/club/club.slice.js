import { createSlice } from '@reduxjs/toolkit'
import { clubExtraReducer } from './club.extraReducer'

const initialState = {
  clubs: [],
  isLoading: false,
  error: null,
}

const clubSlice = createSlice({
  name: 'club',
  initialState,
  reducers: {},
  extraReducers: clubExtraReducer,
})

export default clubSlice.reducer
