import { PLAYER_POSITION } from 'utils/player.util'
import { toast } from 'sonner'
import { CORRECT_GOA_VALUE, MIN_DEF_VALUE, MIN_MID_VALUE, MIN_STR_VALUE } from 'utils/config.global'
// Position configuration with minimum limits and validation messages
const POSITION_CONFIG = {
  [PLAYER_POSITION.GOA]: {
    key: 'GOA',
    minPlayers: CORRECT_GOA_VALUE,
    warningMessage: null, // Goalkeepers don't have a minimum validation
    hasMinimumValidation: false
  },
  [PLAYER_POSITION.DEF]: {
    key: 'DEF',
    minPlayers: MIN_DEF_VALUE,
    warningMessage: 'Sizda kamida 3 himoyachi bolishi shart!',
    hasMinimumValidation: true
  },
  [PLAYER_POSITION.MID]: {
    key: 'MID',
    minPlayers: MIN_MID_VALUE,
    warningMessage: 'Sizda kamida 3 yarim himoyachi bolishi shart!',
    hasMinimumValidation: true
  },
  [PLAYER_POSITION.STR]: {
    key: 'STR',
    minPlayers: MIN_STR_VALUE,
    warningMessage: 'Sizda kamida 2 hujumchi bolishi shart!',
    hasMinimumValidation: true
  }
}

export const deleteTeamPlayerReducer = (state, action) => {
  const { player, is_team_created, t } = action.payload

  // Helper functions
  const updateDuplicatesMap = () => {
    state.duplicatesMap = {}
    const allPlayers = [...state.GOA, ...state.DEF, ...state.MID, ...state.STR]

    allPlayers.forEach((player) => {
      const clubId = player?.club?.id ?? ''
      if (player.name) {
        state.duplicatesMap[clubId] = (state.duplicatesMap[clubId] || 0) + 1
      }
    })
  }

  const calculateTeamPrice = () => {
    const positions = [state.GOA, state.DEF, state.MID, state.STR]
    state.teamPrice = positions.reduce(
      (total, positionPlayers) => 
        total + positionPlayers.reduce((acc, player) => acc + player.price, 0),
      0
    )
  }

  const createDeletedPlayerObject = (playerToDelete) => ({
    ...playerToDelete,
    player_id: null,
    name: null,
    club: null,
    price: null,
    percentage: null,
    image: null,
  })

  const updateStateAfterDeletion = () => {
    calculateTeamPrice()
    updateDuplicatesMap()
  }

  const canDeletePlayer = (positionKey, positionConfig) => {
    if (!is_team_created || !positionConfig.hasMinimumValidation) {
      return true
    }

    const currentCount = state.playersCount[positionKey]
    const minRequired = positionConfig.minPlayers + 1 // +1 because we check before decrementing

    if (currentCount < minRequired) {
      toast.warning(t(positionConfig.warningMessage))
      return false
    }

    return true
  }

  const deletePlayerFromPosition = (positionKey, playerToDelete) => {
    // Remove player from position array
    state[positionKey] = state[positionKey].filter(p => p.id !== playerToDelete.id)
    
    // Add deleted player object back to maintain array structure
    state[positionKey].push(createDeletedPlayerObject(playerToDelete))
    
    // Decrement count
    state.playersCount[positionKey]--
    
    // Update calculated values
    updateStateAfterDeletion()
  }

  // Main deletion logic
  const positionConfig = POSITION_CONFIG[player.position]
  
  if (!positionConfig) {
    return state // Unknown position
  }

  const { key: positionKey } = positionConfig

  // Check if deletion is allowed
  if (!canDeletePlayer(positionKey, positionConfig)) {
    return state
  }

  // Perform deletion
  deletePlayerFromPosition(positionKey, player)
  
  return state
}