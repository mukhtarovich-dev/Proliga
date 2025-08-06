import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectThemes = createDraftSafeSelector(
  (state) => state.theme,
  (theme) => theme.themes
)

export const selectDarkTheme = createDraftSafeSelector(
  (state) => state.theme,
  (theme) => theme.darkTheme
)

export const selectLightTheme = createDraftSafeSelector(
  (state) => state.theme,
  (theme) => theme.lightTheme
)
