import { fetchTeamPlayers } from './teamPlayer.thunk'

export const teamPlayerExtraReducer = (builder) => {
  builder
    .addCase(fetchTeamPlayers.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchTeamPlayers.fulfilled, (state, action) => {
      const team = action.payload.data || []

      const teamData = team.reduce(
        (acc, player) => {
          const { position, club, name, price } = player

          if (position && acc[position]) {
            acc[position].push(player)
            acc.teamPrice += price || 0

            if (name) {
              const clubSlug = club?.id ?? ''
              acc.playersCount[position]++
              acc.duplicatesMap[clubSlug] =
                (acc.duplicatesMap[clubSlug] || 0) + 1
            }
          }
          return acc
        },
        {
          GOA: [],
          DEF: [],
          MID: [],
          STR: [],
          playersCount: { GOA: 0, DEF: 0, MID: 0, STR: 0 },
          teamPrice: 0,
          duplicatesMap: {},
        }
      )

      state.GOA = teamData.GOA
      state.DEF = teamData.DEF
      state.MID = teamData.MID
      state.STR = teamData.STR
      state.playersCount = teamData.playersCount
      state.teamPrice = teamData.teamPrice
      state.duplicatesMap = teamData.duplicatesMap

      state.prevTeam = team
      state.transferModal = false
      state.infoModal = false
      state.isLoading = false
    })
    .addCase(fetchTeamPlayers.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
}
