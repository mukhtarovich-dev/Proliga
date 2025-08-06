import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectBalances = createDraftSafeSelector(
  (state) => state.payBalance,
  (payBalance) => payBalance.balances
)
