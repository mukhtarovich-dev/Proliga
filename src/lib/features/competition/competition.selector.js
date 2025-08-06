import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectCompetition = createDraftSafeSelector(
  (state) => state.competition,
  (competition) => competition.competitions
)

export const selectCurrentCompetition = createDraftSafeSelector(
  (state) => state.competition,
  (competition) => competition.currentCompetition
)
