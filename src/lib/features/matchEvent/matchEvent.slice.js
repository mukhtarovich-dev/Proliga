import { createSlice } from '@reduxjs/toolkit'
import { matchEventExtraReducer } from './matchEvent.extraReducer'

const initialState = {
  events: [],
  isLoading: false,
  error: null,
}

const matchEventSlice = createSlice({
  name: 'matchEvent',
  initialState,
  reducers: {},
  extraReducers: matchEventExtraReducer,
})

export default matchEventSlice.reducer
