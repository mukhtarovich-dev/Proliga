import { fetchPlayerPoint } from './playerPoint.thunk'

export const playerPointExtraReducer = (builder) => {
  builder
    .addCase(fetchPlayerPoint.pending, (state) => {
      state.isLoading = true
      state.playerPoint = []
    })
    .addCase(fetchPlayerPoint.fulfilled, (state, action) => {
      if (action.payload?.data?.length > 0) {
        state.playerPoint = action.payload.data
      }
      state.isLoading = false
    })
    .addCase(fetchPlayerPoint.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
}
