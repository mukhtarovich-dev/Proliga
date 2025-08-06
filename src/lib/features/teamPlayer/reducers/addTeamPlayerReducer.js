import { PLAYER_POSITION } from 'utils/player.util'
import { toast } from 'sonner'
import { DEFAULT_SAME_TEAM_PLAYERS } from 'utils/config.global'
import { CORRECT_GOA_VALUE, MAX_DEF_VALUE, MAX_MID_VALUE, MAX_STR_VALUE } from 'utils/config.global'

// Position configuration with max limits
const POSITION_CONFIG = {
  [PLAYER_POSITION.GOA]: { key: 'GOA', maxPlayers: CORRECT_GOA_VALUE },
  [PLAYER_POSITION.DEF]: { key: 'DEF', maxPlayers: MAX_DEF_VALUE },
  [PLAYER_POSITION.MID]: { key: 'MID', maxPlayers: MAX_MID_VALUE },
  [PLAYER_POSITION.STR]: { key: 'STR', maxPlayers: MAX_STR_VALUE }
}

export const addTeamPlayerReducer = (state, action) => {
  const {
    player,
    team,
    teamConcat,
    t,
    max_same_team_players,
    transfer_show_modals,
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

  const createUpdatedPlayer = (basePlayer) => ({
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
    image: player.image,
    percentage: player.percentage ?? null,
    player: {
      name: player.name,
      name_ru: player.name_ru,
    },
  })

  const removeEmptyPlayerFromPosition = (emptyPlayer) => {
    Object.values(PLAYER_POSITION).forEach(position => {
      if (emptyPlayer.position === position) {
        const positionKey = POSITION_CONFIG[position].key
        state[positionKey] = state[positionKey].filter(p => p.id !== emptyPlayer.id)
      }
    })
  }

  const showClubLimitWarning = () => {
    toast.warning(
      t("Ushbu klubdan $ ta oyinchi qo'shib bo'lmaydi!").replace('$', maxTeamPlayers)
    )
    state.transferModal = false
    state.clubModal = transfer_show_modals
  }

  const showMaxPlayersWarning = () => {
    toast.warning(t('Max players count reached from the same club!'))
    state.transferModal = false
  }

  const addPlayerToPosition = (positionKey, newPlayer) => {
    state[positionKey].push(newPlayer)
    state.playersCount[positionKey]++
    calculateTeamPrice()
    updateDuplicatesMap()
  }

  const replaceEmptyPlayer = (positionKey, emptyPlayer) => {
    const newPlayer = createUpdatedPlayer(emptyPlayer)
    state[positionKey] = state[positionKey].filter(p => p.id !== emptyPlayer.id)
    state[positionKey].push(newPlayer)
    state.playersCount[positionKey]++
    calculateTeamPrice()
    updateDuplicatesMap()
  }

  const addNewPlayerSlot = (positionKey, emptyPlayer) => {
    removeEmptyPlayerFromPosition(emptyPlayer)
    const newPlayer = createUpdatedPlayer(player)
    addPlayerToPosition(positionKey, { ...newPlayer, id: emptyPlayer.id })
  }

  // Validation checks
  const emptyPlayer = teamConcat.find(player => !player.name)
  if (!emptyPlayer) {
    toast.warning(t('Boshqa oyinchi qoshish mumkin emas!'))
    return state
  }

  const existingPlayer = teamConcat.find(p => p.player_id === player.id)
  if (existingPlayer) {
    toast.warning(t('Ushbu oyinchi allaqachon oyinda!'))
    return state
  }

  const clubId = player?.club?.id || player.club?.id

  // Club limit validations
  if (state.duplicatesMap[clubId] === max_same_team_players) {
    showMaxPlayersWarning()
    return state
  }

  if (state.duplicatesMap[clubId] > maxTeamPlayers - 1) {
    showClubLimitWarning()
    return state
  }

  // Position-specific logic
  const positionConfig = POSITION_CONFIG[player.position]
  if (!positionConfig) {
    return state
  }

  const { key: positionKey, maxPlayers } = positionConfig
  const currentPositionPlayers = state[positionKey]
  const currentCount = state.playersCount[positionKey]

  // Handle goalkeeper special case (only 1 allowed)
  if (player.position === PLAYER_POSITION.GOA) {
    if (currentCount >= 1) {
      return state // Already have a goalkeeper
    }

    if (currentPositionPlayers.length > 0) {
      const emptyGOAPlayer = currentPositionPlayers.find(p => !p.name)
      if (emptyGOAPlayer) {
        replaceEmptyPlayer(positionKey, emptyGOAPlayer)
      }
    } else {
      addNewPlayerSlot(positionKey, emptyPlayer)
    }
    return state
  }

  // Handle other positions (DEF, MID, STR)
  // First, try to fill existing empty slots
  if (currentCount < currentPositionPlayers.length) {
    const emptyPositionPlayer = currentPositionPlayers.find(p => !p.name)
    if (emptyPositionPlayer) {
      replaceEmptyPlayer(positionKey, emptyPositionPlayer)
      return state
    }
  }

  // If no empty slots and under max limit, create new slot
  if (currentCount >= currentPositionPlayers.length && currentPositionPlayers.length < maxPlayers) {
    addNewPlayerSlot(positionKey, emptyPlayer)
    return state
  }

  return state
}