import { fetchClubs } from './club.thunk'

export const clubExtraReducer = (builder) => {
  builder
    .addCase(fetchClubs.pending, (state) => {
      state.isLoading = true
      state.clubs = []
    })
    .addCase(fetchClubs.fulfilled, (state, action) => {
      state.clubs = action.payload.data
      state.isLoading = false
    })
    .addCase(fetchClubs.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
}
