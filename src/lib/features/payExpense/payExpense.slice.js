import { createSlice } from '@reduxjs/toolkit'
import { payExpenseExtraReducer } from './payExpense.extraReducer'

const initialState = {
  expenses: [],
  teamPackages: {},
  isLoading: false,
  error: null,
}

const payExpenseSlice = createSlice({
  name: 'payExpense',
  initialState,
  extraReducers: payExpenseExtraReducer,
})

export default payExpenseSlice.reducer
