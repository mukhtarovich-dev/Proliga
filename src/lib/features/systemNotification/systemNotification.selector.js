import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectNotifications = createDraftSafeSelector(
  (state) => state.systemNotifications,
  (systemNotifications) => systemNotifications.notifications
)
