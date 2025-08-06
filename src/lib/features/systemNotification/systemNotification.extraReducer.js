import {
  fetchBroadcastNotifications,
  fetchPersonalNotifications,
} from './systemNotification.thunk'

export const systemNotificationExtraReducer = (builder) => {
  builder
    .addCase(fetchBroadcastNotifications.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchBroadcastNotifications.fulfilled, (state, action) => {
      if (action.payload.data?.length > 0) {
        // Add new notifications, but avoid duplicates by id
        const existingIds = new Set(state.notifications.map((n) => n.id))
        action.payload.data.forEach((item) => {
          if (!existingIds.has(item.id)) {
            state.notifications.unshift(item)
            existingIds.add(item.id)
          }
        })
      }

      // Remove any duplicates by id, just in case
      const seen = new Set()
      state.notifications = state.notifications.filter((item) => {
        if (seen.has(item.id)) return false
        seen.add(item.id)
        return true
      })

      state.notifications.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })

      state.isLoading = false
    })
    .addCase(fetchBroadcastNotifications.rejected, (state, action) => {
      state.isLoading = false
      state.error = action?.error ?? null
    })
    .addCase(fetchPersonalNotifications.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchPersonalNotifications.fulfilled, (state, action) => {
      if (action.payload.data?.length > 0) {
        // Add new notifications, but avoid duplicates by id
        const existingIds = new Set(state.notifications.map((n) => n.id))
        action.payload.data.forEach((item) => {
          if (!existingIds.has(item.id)) {
            state.notifications.unshift(item)
            existingIds.add(item.id)
          }
        })
      }

      // Remove any duplicates by id, just in case
      const seen = new Set()
      state.notifications = state.notifications.filter((item) => {
        if (seen.has(item.id)) return false
        seen.add(item.id)
        return true
      })

      state.notifications.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })

      state.isLoading = false
    })
    .addCase(fetchPersonalNotifications.rejected, (state, action) => {
      state.isLoading = false
      state.error = action?.error ?? null
    })
}
