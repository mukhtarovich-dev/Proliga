import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectBanners = createDraftSafeSelector(
  (state) => state.banner,
  (banner) => banner.banners
)
