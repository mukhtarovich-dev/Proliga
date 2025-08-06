import { fetchMatchEvents } from './matchEvent.thunk'

export const matchEventExtraReducer = (builder) => {
  builder
    .addCase(fetchMatchEvents.pending, (state) => {
      state.isLoading = true
      state.events = []
    })
    .addCase(fetchMatchEvents.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.events = action.payload.data
      }
      state.isLoading = false
    })
    .addCase(fetchMatchEvents.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
}
