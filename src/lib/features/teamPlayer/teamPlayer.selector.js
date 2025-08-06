import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectTeamConcat = createDraftSafeSelector(
  (state) => state.teamPlayer,
  (teamPlayer) =>
    teamPlayer.GOA.concat(teamPlayer.DEF, teamPlayer.MID, teamPlayer.STR)
)

export const selectTotalPlayersCount = createDraftSafeSelector(
  (state) => state.teamPlayer,
  (teamPlayer) =>
    teamPlayer.playersCount?.GOA +
    teamPlayer.playersCount?.DEF +
    teamPlayer.playersCount?.MID +
    teamPlayer.playersCount?.STR
)

export const selectPrevTeam = createDraftSafeSelector(
  (state) => state.teamPlayer,
  (teamPlayer) => teamPlayer.prevTeam
)

export const selectGOA = createDraftSafeSelector(
  (state) => state.teamPlayer,
  (teamPlayer) => teamPlayer.GOA
)

export const selectDEF = createDraftSafeSelector(
  (state) => state.teamPlayer,
  (teamPlayer) => teamPlayer.DEF
)

export const selectMID = createDraftSafeSelector(
  (state) => state.teamPlayer,
  (teamPlayer) => teamPlayer.MID
)

export const selectSTR = createDraftSafeSelector(
  (state) => state.teamPlayer,
  (teamPlayer) => teamPlayer.STR
)
