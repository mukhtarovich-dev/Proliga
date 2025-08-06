import { fetchPayExpenses, fetchTeamPackages } from './payExpense.thunk'

export const payExpenseExtraReducer = (builder) => {
  builder
    .addCase(fetchPayExpenses.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchPayExpenses.fulfilled, (state, action) => {
      state.expenses = []
      if (action.payload.data?.length > 0) {
        state.expenses = action.payload.data
      }
      state.isLoading = false
    })
    .addCase(fetchPayExpenses.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
    .addCase(fetchTeamPackages.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchTeamPackages.fulfilled, (state, action) => {
      state.teamPackages = {}
      if (action.payload.data?.length > 0) {
        state.teamPackages = action.payload.data.reduce((acc, pkg) => {
          const currentType = pkg.pay_package_type
          if (
            !acc[currentType] ||
            pkg.pay_package.priority > acc[currentType].pay_package.priority
          ) {
            acc[currentType] = pkg
          }
          return acc
        }, {})
      }
      state.isLoading = false
    })
    .addCase(fetchTeamPackages.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
}
