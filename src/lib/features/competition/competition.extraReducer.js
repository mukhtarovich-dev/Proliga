import { fetchCompetition } from './competition.thunk'

export const competitionExtraReducer = (builder) => {
  builder
    .addCase(fetchCompetition.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchCompetition.fulfilled, (state, action) => {
      state.competitions = []
      if (action.payload.data?.length > 0) {
        state.competitions = action.payload.data
      }
      state.isLoading = false
    })
    .addCase(fetchCompetition.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
}
