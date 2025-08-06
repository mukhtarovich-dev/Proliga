import { createSlice } from '@reduxjs/toolkit'
import { userTokenExtraReducer } from './userToken.extraReducer'

const initialState = {
    tokens: [],
    userToken: null,
    error: null,
    isLoading: false,
}

const userTokenSlice = createSlice({
    name: 'userToken',
    initialState,
    reducers: {
        setUserToken: (state, action) => {
            state.userToken = action.payload
        },
    },
    extraReducers: userTokenExtraReducer,
})

export const {
    setUserToken,
} = userTokenSlice.actions

export default userTokenSlice.reducer
