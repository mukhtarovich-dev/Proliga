import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectTours = createDraftSafeSelector(
  (state) => state.tour,
  (tour) => tour.tours
)

export const selectCurrentTour = createDraftSafeSelector(
  (state) => state.tour,
  (tour) => tour.currentTour
)

export const selectRegisteredTour = createDraftSafeSelector(
  (state) => state.tour,
  (tour) => tour.registeredTour
)
