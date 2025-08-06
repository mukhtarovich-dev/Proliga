import { fetchSystemConfig } from './systemConfig.thunk'

export const systemConfigExtraReducer = (builder) => {
  builder
    .addCase(fetchSystemConfig.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchSystemConfig.fulfilled, (state, action) => {
      state.config = {}
      if (action.payload.data?.length > 0) {
        action.payload.data.forEach((item) => {
          if (item?.type) {
            state.config[item.key] = item
          }
        })
      }
      localStorage.setItem('config', JSON.stringify(state.config))
      state.isLoading = false
    })
    .addCase(fetchSystemConfig.rejected, (state, action) => {
      state.isLoading = false
      state.error = action?.error ?? null
    })
}
