import { createSlice } from '@reduxjs/toolkit'
import { playerExtraReducer } from './player.extraReducer'

const initialState = {
  topPlayers: [],
  topPlayersLoading: false,
  topPlayersError: null,
  currentPlayer: {},
  players: [],
  isLoading: false,
  error: null,
  count: 0,
}

export const playersSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentPlayer: (state, action) => {
      state.currentPlayer =
        state.players.find((p) => p.id === action.payload) ?? {}
    },
  },
  extraReducers: playerExtraReducer,
})

export const { setCurrentPlayer } = playersSlice.actions

export default playersSlice.reducer
