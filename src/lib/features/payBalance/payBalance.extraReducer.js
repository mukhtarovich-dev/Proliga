import { fetchPayBalance } from './payBalance.thunk'

export const payBalanceExtraReducer = (builder) => {
  builder
    .addCase(fetchPayBalance.pending, (state) => {
      state.isLoading = true
      state.balances = []
    })
    .addCase(fetchPayBalance.fulfilled, (state, action) => {
      if (action.payload.data?.length > 0) {
        state.balances = action.payload.data
      }
      state.isLoading = false
    })
    .addCase(fetchPayBalance.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
}
