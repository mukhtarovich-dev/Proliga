import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectTourTeams = createDraftSafeSelector(
  (state) => state.tourTeam,
  (tourTeam) => tourTeam.tourTeams
)

export const selectCurrentTourTeam = createDraftSafeSelector(
  (state) => state.tourTeam,
  (tourTeam) => tourTeam.currentTourTeam
)
