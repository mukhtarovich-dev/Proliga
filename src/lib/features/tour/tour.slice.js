import { createSlice } from '@reduxjs/toolkit'
import { toursExtraReducer } from './tour.extraReducer'
import { TABS } from 'utils/tabs.util'
import { TOUR_STATUS } from 'utils/tour.util'

const initialState = {
  tours: [],
  currentTour: {},
  currentTourIndex: 0,
  gameTab: TABS.GameProfile,
  registeredTour: {},
  error: null,
  isLoading: false,
}

export const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setCurrentTourIndex: (state, action) => {
      state.currentTour = state.tours[action.payload]
      state.currentTourIndex = action.payload
      if (
        state.gameTab === TABS.Transfer &&
        state.currentTour.status !== TOUR_STATUS.notStartedTransfer
      ) {
        state.gameTab = TABS.GameProfile
      }
    },
    setTab: (state, action) => {
      state.gameTab = action.payload
    },
    clearTours: (state) => {
      state.tours = []
      state.currentTour = {}
      state.registeredTour = {}
      state.currentTourIndex = 0
      state.gameTab = TABS.GameProfile
      state.error = null
      state.isLoading = false
    },
  },
  extraReducers: toursExtraReducer,
})

export const { setCurrentTourIndex, setTab, clearTours } = tourSlice.actions

export default tourSlice.reducer
