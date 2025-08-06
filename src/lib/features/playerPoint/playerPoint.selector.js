import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectPlayerPoint = createDraftSafeSelector(
  (state) => state.playerPoint,
  (playerPoint) => playerPoint.playerPoint
)
