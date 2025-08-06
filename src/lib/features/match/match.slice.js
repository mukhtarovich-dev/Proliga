import { createSlice } from '@reduxjs/toolkit'
import { matchExtraReducer } from './match.extraReducer'

const initialState = {
  matches: [],
  isLoading: false,
  currentMatch: {},
  count: 0,
  isModalOpen: false,
  error: null,
}

const matchesSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setCurrentMatch: (state, action) => {
      state.currentMatch = action.payload
    },
    setMatchModalOpen: (state, action) => {
      state.isModalOpen = action.payload
    },
  },
  extraReducers: matchExtraReducer,
})

export const { setCurrentMatch, setMatchModalOpen } = matchesSlice.actions

export default matchesSlice.reducer
