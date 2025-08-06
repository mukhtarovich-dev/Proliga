import {
  fetchPlayers,
  fetchTopPlayers,
  fetchAdditionalPlayers,
} from './player.thunk'

export const playerExtraReducer = (builder) => {
  builder
    .addCase(fetchPlayers.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchPlayers.fulfilled, (state, action) => {
      state.count = action.payload?.count ?? 0
      state.players = action.payload?.data || []
      state.isLoading = false
    })
    .addCase(fetchPlayers.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
    .addCase(fetchAdditionalPlayers.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchAdditionalPlayers.fulfilled, (state, action) => {
      const threshold = action?.payload?.page ?? 1000

      if (state.players?.length > threshold - 1) {
        state.players = [...state.players, ...(action.payload?.data || [])]
      }
      state.isLoading = false
    })
    .addCase(fetchAdditionalPlayers.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
    .addCase(fetchTopPlayers.pending, (state) => {
      state.topPlayersLoading = true
    })
    .addCase(fetchTopPlayers.fulfilled, (state, action) => {
      state.topPlayers = []

      const players = action.payload?.data ?? []
      players.map((pl) => {
        let player = state.players.find((p) => p.id === pl)
        state.topPlayers.push(player)
      })
      state.topPlayersLoading = false
    })
    .addCase(fetchTopPlayers.rejected, (state, action) => {
      state.topPlayersError = action?.error ?? null
      state.topPlayersLoading = false
    })
}
