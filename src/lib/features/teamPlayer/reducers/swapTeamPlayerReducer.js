import { PLAYER_POSITION } from 'utils/player.util'
import { toast } from 'sonner'
import { DEFAULT_SAME_TEAM_PLAYERS } from 'utils/config.global'

// Position configuration mapping
const POSITION_CONFIG = {
  [PLAYER_POSITION.GOA]: { key: 'GOA' },
  [PLAYER_POSITION.DEF]: { key: 'DEF' },
  [PLAYER_POSITION.MID]: { key: 'MID' },
  [PLAYER_POSITION.STR]: { key: 'STR' }
}

export const swapTeamPlayerReducer = (state, action) => {
  const {
    player,
    team,
    previousPlayer,
    t,
    transfer_show_modals,
    max_same_team_players,
  } = action.payload
  
  const maxTeamPlayers = team.transfers_from_one_team ?? DEFAULT_SAME_TEAM_PLAYERS

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

  const createUpdatedPlayer = (basePlayer, newPlayer) => ({
    ...basePlayer,
    id: basePlayer.id,
    club: {
      slug: player.club.slug,
      id: player.club.id,
      form_img: player.club?.form_img,
      logo_img: player.club?.logo_img,
    },
    name: newPlayer.name,
    position: newPlayer.position,
    player_id: newPlayer.id,
    price: newPlayer.price,
    competition_id: team.competition_id.id,
    user_id: team.user_id,
    image: newPlayer.image,
    percentage: newPlayer.percentage ?? null,
    player: {
      name: newPlayer.name,
      name_ru: newPlayer.name_ru,
    },
  })

  const updateStateAfterSwap = () => {
    updateDuplicatesMap()
    calculateTeamPrice()
    state.transferModal = false
    toast.success(t("Oyinchi muvaffaqiyatli o'zgartirildi!"))
  }

  const showMaxPlayersWarning = () => {
    toast.warning(t('Max players count reached from the same club!'))
    state.transferModal = false
  }

  const showClubLimitWarning = () => {
    toast.warning(
      t("Ushbu klubdan $ ta oyinchi qo'shib bo'lmaydi!").replace('$', maxTeamPlayers)
    )
    state.transferModal = false
    state.clubModal = transfer_show_modals
  }

  const swapPlayerInPosition = (positionKey) => {
    const positionPlayers = state[positionKey]
    
    if (positionPlayers.length === 0) {
      return false
    }

    const prevPlayer = positionPlayers.find(p => previousPlayer.id === p.player_id)
    if (!prevPlayer) {
      return false
    }

    const prevPlayerIndex = positionPlayers.findIndex(p => previousPlayer.id === p.player_id)
    if (prevPlayerIndex === -1) {
      return false
    }

    // Perform the swap
    state[positionKey][prevPlayerIndex] = createUpdatedPlayer(prevPlayer, player)
    updateStateAfterSwap()
    return true
  }

  // Validation: Check club limits
  const clubId = player.club.id || player.club.id

  if (state.duplicatesMap[clubId] === max_same_team_players) {
    showMaxPlayersWarning()
    return state
  }

  if (state.duplicatesMap[clubId] > maxTeamPlayers) {
    showClubLimitWarning()
    return state
  }

  // Main swap logic
  const positionConfig = POSITION_CONFIG[player.position]
  if (!positionConfig) {
    return state // Unknown position
  }

  const { key: positionKey } = positionConfig
  const swapSuccessful = swapPlayerInPosition(positionKey)

  if (!swapSuccessful) {
    // Could add error handling here if needed
    return state
  }

  return state
}