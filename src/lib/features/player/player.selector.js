import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectPlayers = createDraftSafeSelector(
  (store) => store.player,
  (player) => player.players
)

export const selectTopPlayers = createDraftSafeSelector(
  (store) => store.player,
  (player) => player.topPlayers
)

export const selectCurrentPlayer = createDraftSafeSelector(
  (store) => store.player,
  (player) => player.currentPlayer
)
