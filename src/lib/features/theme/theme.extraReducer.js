import { fetchThemes, fetchUserThemes } from './theme.thunk'

export const themeExtraReducer = (builder) => {
  builder
    .addCase(fetchThemes.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchThemes.fulfilled, (state, action) => {
      state.themes = action.payload?.data || []
      state.isModified = false
      state.isLoading = false
    })
    .addCase(fetchThemes.rejected, (state, action) => {
      state.error = action?.error
      state.isLoading = false
    })
    .addCase(fetchUserThemes.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchUserThemes.fulfilled, (state, action) => {
      state.themes = [...state.themes, ...(action.payload?.data || [])]
      state.isModified = false
      state.isLoading = false
    })
    .addCase(fetchUserThemes.rejected, (state, action) => {
      state.error = action?.error
      state.isLoading = false
    })
}
