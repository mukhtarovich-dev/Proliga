import { PLAYER_POSITION } from 'utils/player.util'

// Position configuration mapping
const POSITION_CONFIG = {
  [PLAYER_POSITION.GOA]: { key: 'GOA' },
  [PLAYER_POSITION.DEF]: { key: 'DEF' },
  [PLAYER_POSITION.MID]: { key: 'MID' },
  [PLAYER_POSITION.STR]: { key: 'STR' }
}

export const revertTeamPlayersReducer = (state) => {
  // Helper functions
  const resetTeamState = () => {
    // Clear all position arrays
    Object.values(POSITION_CONFIG).forEach(({ key }) => {
      state[key] = []
    })

    // Reset players count
    state.playersCount = {
      GOA: 0,
      DEF: 0,
      MID: 0,
      STR: 0,
    }

    // Reset team price and duplicates map
    state.teamPrice = 0
    state.duplicatesMap = {}
  }

  const calculateTeamPrice = () => {
    const positions = [state.GOA, state.DEF, state.MID, state.STR]
    state.teamPrice = positions.reduce(
      (total, positionPlayers) =>
        total + positionPlayers.reduce((acc, player) => acc + (player.price || 0), 0),
      0
    )
  }

  const addPlayerToPosition = (player, positionKey) => {
    // Add player to position array
    state[positionKey].push(player)

    // Update count and duplicates map if player has a name
    if (player.name) {
      state.playersCount[positionKey]++

      const clubId = player?.club?.id ?? ''
      if (clubId) {
        state.duplicatesMap[clubId] = (state.duplicatesMap[clubId] || 0) + 1
      }
    }
  }

  const restorePlayersFromPrevTeam = () => {
    const team = state.prevTeam

    if (!team || team.length === 0) {
      return
    }

    team.forEach((player) => {
      const positionConfig = POSITION_CONFIG[player.position]

      if (positionConfig) {
        addPlayerToPosition(player, positionConfig.key)
      }
    })
  }

  // Main revert logic
  resetTeamState()
  restorePlayersFromPrevTeam()
  calculateTeamPrice()
}