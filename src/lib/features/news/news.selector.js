import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectNews = createDraftSafeSelector(
  (state) => state.news,
  (news) => news.news
)

export const selectCurrentNews = createDraftSafeSelector(
  (state) => state.news,
  (news) => news.currentNews
)
