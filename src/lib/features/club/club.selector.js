import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectClubs = createDraftSafeSelector(
  (state) => state.club,
  (club) => club.clubs
)
