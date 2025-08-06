import { fetchPackages } from './package.thunk'

export const packageExtraReducer = (builder) => {
  builder
    .addCase(fetchPackages.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchPackages.fulfilled, (state, action) => {
      state.packages = []
      if (action.payload.data?.length > 0) {
        state.packages = action.payload.data
        state.packages.sort((a, b) => a?.id - b?.id)
      }
      state.isLoading = false
    })
    .addCase(fetchPackages.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
}
