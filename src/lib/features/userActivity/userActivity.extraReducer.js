import { fetchUserActivity } from './userActivity.thunk'

export const userActivityExtraReducer = (builder) => {
  builder
    .addCase(fetchUserActivity.pending, (state) => {
      state.isLoading = true
      state.activities = []
    })
    .addCase(fetchUserActivity.fulfilled, (state, action) => {
      state.count = action.payload.count || 0
      if (action.payload.data?.length > 0) {
        state.activities = action.payload.data
      }
      state.isLoading = false
    })
    .addCase(fetchUserActivity.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
}
