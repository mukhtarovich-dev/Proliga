import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectMatches = createDraftSafeSelector(
  (state) => state.match,
  (match) => match.matches
)

export const selectCurrentMatch = createDraftSafeSelector(
  (state) => state.match,
  (match) => match.currentMatch
)
