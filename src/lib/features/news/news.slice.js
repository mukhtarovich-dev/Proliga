import { createSlice } from '@reduxjs/toolkit'
import { newsExtraReducer } from './news.extraReducer'

const initialState = {
  news: [],
  currentNews: {},
  isModalOpen: false,
  isLoading: false,
  error: null,
  count: 0,
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    incrementNewsView: (state, action) => {
      const { news_id } = action.payload
      const news = state.news.find((news) => news.id === news_id)
      if (news) {
        news.view_count++
      }
    },
    setNewsModal: (state, action) => {
      state.isModalOpen = action.payload
    },
    setCurrentNews: (state, action) => {
      state.currentNews = action.payload
    },
  },
  extraReducers: newsExtraReducer,
})

export const { incrementNewsView, setNewsModal, setCurrentNews } =
  newsSlice.actions

export default newsSlice.reducer
