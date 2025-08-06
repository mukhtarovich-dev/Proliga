import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectCurrentTeam = createDraftSafeSelector(
  (state) => state.currentTeam,
  (team) => team.currentTeam
)
