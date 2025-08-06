import { createSlice } from '@reduxjs/toolkit'
import { tourTeamExtraReducer } from './tourTeam.extraReducer'

const initialState = {
  tourTeams: [],
  currentTourTeam: {},
  isLoading: false,
  error: null,
}

const tourTeamSlice = createSlice({
  name: 'tourTeam',
  initialState,
  reducers: {
    setCurrentTourTeam: (state, action) => {
      const tour = action.payload
      if (action.payload?.id) {
        state.currentTourTeam = state.tourTeams.find(
          (t) => +t.tour_id === +tour.id
        )
      }
    },
    setCurrentTourTeamTransfersCount: (state, action) => {
      state.currentTourTeam.current_count_of_transfers = action.payload
    },
  },
  extraReducers: tourTeamExtraReducer,
})

export const { setCurrentTourTeam, setCurrentTourTeamTransfersCount } =
  tourTeamSlice.actions

export default tourTeamSlice.reducer
