import { fetchCurrentTeam, fetchSelectedTeam } from './currentTeam.thunk'

export const currentTeamExtraReducer = (builder) => {
  builder
    .addCase(fetchCurrentTeam.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchCurrentTeam.fulfilled, (state, action) => {
      state.currentTeam = {}
      if (action.payload.data?.length > 0) {
        state.currentTeam = action.payload.data[0]
      }
      state.isLoading = false
    })
    .addCase(fetchCurrentTeam.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
    .addCase(fetchSelectedTeam.pending, (state) => {
      state.currentTeam = {}
      state.isLoading = true
    })
    .addCase(fetchSelectedTeam.fulfilled, (state, action) => {
      if (action.payload.data?.length > 0) {
        state.currentTeam = action.payload.data[0]
      }
      state.isLoading = false
    })
    .addCase(fetchSelectedTeam.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
}
