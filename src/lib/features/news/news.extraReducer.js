import { fetchNews } from './news.thunk'

export const newsExtraReducer = (builder) => {
  builder
    .addCase(fetchNews.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchNews.fulfilled, (state, action) => {
      state.news = []
      state.count = action.payload.count || 0
      if (action.payload.data?.length > 0) {
        state.news = action.payload.data
      }
      state.isLoading = false
    })
    .addCase(fetchNews.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
}
