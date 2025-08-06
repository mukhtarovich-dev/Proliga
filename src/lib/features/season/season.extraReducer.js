import { fetchSeason } from './season.thunk'

export const seasonExtraReducer = (builder) => {
  builder
    .addCase(fetchSeason.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchSeason.fulfilled, (state, action) => {
      if (action.payload.data?.length > 0) {
        state.season = action.payload.data[0]
      }
      state.isLoading = false
    })
    .addCase(fetchSeason.rejected, (state, action) => {
      state.isLoading = false
      state.error = action?.error ?? null
    })
}
