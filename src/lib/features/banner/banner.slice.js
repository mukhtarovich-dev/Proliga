import { createSlice } from '@reduxjs/toolkit'
import { bannerExtraReducer } from './banner.extraReducer'

const initialState = {
  banners: [],
  isLoading: false,
  error: null,
}

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {},
  extraReducers: bannerExtraReducer,
})

export default bannerSlice.reducer
