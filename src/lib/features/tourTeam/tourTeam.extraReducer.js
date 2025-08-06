import { fetchTourTeams } from './tourTeam.thunk'

export const tourTeamExtraReducer = (builder) => {
  builder
    .addCase(fetchTourTeams.pending, (state) => {
      state.isLoading = true
      state.tourTeams = []
    })
    .addCase(fetchTourTeams.fulfilled, (state, action) => {
      const tour = action.payload.currentTour || null
      if (action.payload?.data?.length > 0) {
        state.tourTeams = action.payload.data
        if (tour?.id) {
          state.currentTourTeam = state.tourTeams.find(
            (t) => +t.tour_id === +tour.id
          )
        }
      }
      state.isLoading = false
    })
    .addCase(fetchTourTeams.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
}
