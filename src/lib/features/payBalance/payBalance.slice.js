import { createSlice } from '@reduxjs/toolkit'
import { payBalanceExtraReducer } from './payBalance.extraReducer'

const initialState = {
  balances: [],
  isLoading: false,
  error: null,
}

const payBalanceSlice = createSlice({
  name: 'payBalance',
  initialState,
  extraReducers: payBalanceExtraReducer,
})

export default payBalanceSlice.reducer
