import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectTeams = createDraftSafeSelector(
  (state) => state.team,
  (team) => team.teams
)

export const selectTopTeams = createDraftSafeSelector(
  (state) => state.team,
  (team) => team.topTeams
)

export const selectAllTeams = createDraftSafeSelector(
  (state) => state.team,
  (team) => team.allTeams
)
