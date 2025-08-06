import { fetchTours, fetchTeamViewTours } from './tour.thunk'
import { TOUR_STATUS } from 'utils/tour.util'

export const toursExtraReducer = (builder) => {
  builder
    .addCase(fetchTours.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchTours.fulfilled, (state, action) => {
      state.tours = action?.payload?.data ?? []
      let tour = state.tours.find(
        (tour) => tour.status === TOUR_STATUS.notStartedTransfer
      )
      let registeredTour = state.tours.find(
        (tour) => tour.id === action.payload.registered_tour_id
      )
      if (registeredTour) {
        state.registeredTour = registeredTour
      }
      if (!tour) {
        tour = state.tours.find(
          (tour) => tour.id === action.payload.registered_tour_id
        )
      }
      if (!tour) {
        state.currentTour = state.tours[0]
      }
      if (tour) {
        state.currentTour = tour
        state.registeredTour = registeredTour ?? tour
        state.currentTourIndex = state.tours.indexOf(tour)
      }
      state.isLoading = false
    })
    .addCase(fetchTours.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
    .addCase(fetchTeamViewTours.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchTeamViewTours.fulfilled, (state, action) => {
      state.tours = action.payload?.data
      let registeredTour = state.tours.find(
        (tour) => tour.id === action.payload.registered_tour_id
      )
      let tour
      if (registeredTour) {
        state.registeredTour = registeredTour
      }
      if (!tour) {
        tour = state.tours.find(
          (tour) =>
            tour.status === TOUR_STATUS.inProcess &&
            tour.order >= registeredTour?.order
        )
      }
      if (!tour) {
        const tempTours = [...state.tours].reverse()
        tour = tempTours.find(
          (tour) =>
            tour.status === TOUR_STATUS.completed &&
            tour.order >= registeredTour?.order
        )
      }
      if (!tour) {
        state.currentTour = {}
      }
      if (tour) {
        state.currentTour = tour
        state.registeredTour = registeredTour ?? tour
        state.currentTourIndex = state.tours.indexOf(tour)
      }
      state.isLoading = false
    })
    .addCase(fetchTeamViewTours.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
}
