import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectMatchEvents = createDraftSafeSelector(
  (state) => state.matchEvent,
  (event) => event.events
)
