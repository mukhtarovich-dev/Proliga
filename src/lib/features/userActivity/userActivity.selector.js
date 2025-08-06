import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectUserActivities = createDraftSafeSelector(
  (state) => state.userActivity,
  (userActivity) => userActivity.activities
)
