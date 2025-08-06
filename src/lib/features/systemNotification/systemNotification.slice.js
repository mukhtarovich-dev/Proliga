import { createSlice } from '@reduxjs/toolkit'
import { systemNotificationExtraReducer } from './systemNotification.extraReducer'

const initialState = {
  notifications: [],
  isLoading: false,
  error: null,
}

export const systemNotificationSlice = createSlice({
  name: 'systemNotification',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload)
      state.notifications.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })
    },
    updateNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== +action.payload?.id
      )
      if (action.payload?.deleted_at !== null) return state
      state.notifications.unshift(action.payload)
      state.notifications.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })
    },
    deleteNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== +action.payload?.id
      )
      state.notifications.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })
    },
    clearNotifications: (state) => {
      state.notifications = []
    },
  },
  extraReducers: systemNotificationExtraReducer,
})

export const {
  addNotification,
  updateNotification,
  deleteNotification,
  clearNotifications,
} = systemNotificationSlice.actions

export default systemNotificationSlice.reducer
