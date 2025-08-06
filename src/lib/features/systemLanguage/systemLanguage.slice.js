import { createSlice } from '@reduxjs/toolkit'
import { LANGUAGE } from 'utils/languages.util'

const initialState = {
  lang: LANGUAGE.uz,
}

export const systemLanguageSlice = createSlice({
  name: 'systemLanguage',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      const { lang, cb } = action.payload
      if (lang === LANGUAGE.uz || lang === LANGUAGE.ru) {
        state.lang = lang
        if (cb) {
          cb(lang)
        }
      }
    },
  },
})

export const { setLanguage } = systemLanguageSlice.actions

export default systemLanguageSlice.reducer
