import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectExpenses = createDraftSafeSelector(
  (state) => state.payExpense,
  (payExpense) => payExpense.expenses
)
