import { createSlice } from '@reduxjs/toolkit'
import { competitionExtraReducer } from './competition.extraReducer'

const initialState = {
  competitions: [],
  currentCompetition: {},
  error: null,
  isLoading: false,
}

export const competitionSlice = createSlice({
  name: 'competition',
  initialState,
  reducers: {
    setCompetition: (state, action) => {
      state.competitions = action.payload
    },
    setCurrentCompetition: (state, action) => {
      state.currentCompetition =
        state.competitions.find((item) => +item.id === +action.payload) ?? {}
    },
  },
  extraReducers: competitionExtraReducer,
})

export const { setCompetition, setCurrentCompetition } =
  competitionSlice.actions

export default competitionSlice.reducer
