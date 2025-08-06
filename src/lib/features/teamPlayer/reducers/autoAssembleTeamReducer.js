import { PLAYER_POSITION } from 'utils/player.util'

// Position configuration mapping
const POSITION_CONFIG = {
  [PLAYER_POSITION.GOA]: { key: 'GOA', hasSpecialLogic: true },
  [PLAYER_POSITION.DEF]: { key: 'DEF', hasSpecialLogic: false },
  [PLAYER_POSITION.MID]: { key: 'MID', hasSpecialLogic: false },
  [PLAYER_POSITION.STR]: { key: 'STR', hasSpecialLogic: false }
}

export const autoAssembleTeamReducer = (state, action) => {
  const { allPlayers, playerIds, team } = action.payload

  // Helper functions
  const calculateTeamPrice = () => {
    const positions = [state.GOA, state.DEF, state.MID, state.STR]
    state.teamPrice = positions.reduce(
      (total, positionPlayers) => 
        total + positionPlayers.reduce((acc, player) => acc + player.price, 0),
      0
    )
  }

  const updateDuplicatesMap = () => {
    state.duplicatesMap = {}
    const allTeamPlayers = [...state.GOA, ...state.DEF, ...state.MID, ...state.STR]

    allTeamPlayers.forEach((player) => {
      const clubId = player?.club?.id ?? ''
      if (player.name) {
        state.duplicatesMap[clubId] = (state.duplicatesMap[clubId] || 0) + 1
      }
    })
  }

  const createUpdatedPlayer = (basePlayer, player) => ({
    ...basePlayer,
    player_id: player.id,
    name: player.name,
    club: {
      slug: player.club.slug,
      id: player.club.id,
      form_img: player.club?.form_img,
      logo_img: player.club?.logo_img,
    },
    price: player.price,
    competition_id: team.competition_id.id,
    user_id: team.user_id,
    percentage: player.percentage ?? null,
    image: player.image,
    player: {
      name: player.name,
      name_ru: player.name_ru,
    },
  })

  const updateStateAfterPlayerAdd = () => {
    calculateTeamPrice()
    updateDuplicatesMap()
  }

  const canAddPlayerToPosition = (player, positionKey) => {
    const currentCount = state.playersCount[positionKey]
    const positionPlayers = state[positionKey]
    
    // Special logic for goalkeeper - only 1 allowed and must have existing slots
    if (player.position === PLAYER_POSITION.GOA) {
      return positionPlayers.length > 0 && currentCount < 1
    }
    
    // For other positions - can add if under the current array length
    return currentCount < positionPlayers.length
  }

  const addPlayerToPosition = (player, positionKey) => {
    const positionPlayers = state[positionKey]
    const emptyPlayer = positionPlayers.find(p => !p.name)
    
    if (!emptyPlayer) {
      return // No empty slot available
    }

    const newPlayer = createUpdatedPlayer(emptyPlayer, player)
    
    // Remove empty player and add new player
    state[positionKey] = positionPlayers.filter(p => p.id !== emptyPlayer.id)
    state[positionKey].push(newPlayer)
    state.playersCount[positionKey]++
    
    updateStateAfterPlayerAdd()
  }

  const processPlayer = (player) => {
    if (!playerIds.includes(player.id)) {
      return
    }

    const positionConfig = POSITION_CONFIG[player.position]
    if (!positionConfig) {
      return
    }

    const { key: positionKey } = positionConfig
    
    if (canAddPlayerToPosition(player, positionKey)) {
      addPlayerToPosition(player, positionKey)
    }
  }

  // Process all players to assemble the complete team
  allPlayers.forEach(player => {
    processPlayer(player)
  })

  return state
}