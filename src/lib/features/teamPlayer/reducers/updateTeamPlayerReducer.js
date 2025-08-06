import { PLAYER_POSITION } from 'utils/player.util';
import { toast } from 'sonner';
import { DEFAULT_SAME_TEAM_PLAYERS } from 'utils/config.global';

export const updateTeamPlayerReducer = (state, action) => {
  const {
    player,
    team,
    teamConcat, // Assuming this is the flattened array of all players in the team
    t, // Translation function
    max_same_team_players,
    transfer_show_modals,
  } = action.payload;

  const maxPlayersFromOneTeam =
    team.transfers_from_one_team ?? DEFAULT_SAME_TEAM_PLAYERS;

  // Helper function to calculate the total price of the team
  const calculateTeamPrice = (currentState) => {
    const totalPrice =
      currentState.GOA.reduce((acc, p) => acc + p.price, 0) +
      currentState.DEF.reduce((acc, p) => acc + p.price, 0) +
      currentState.MID.reduce((acc, p) => acc + p.price, 0) +
      currentState.STR.reduce((acc, p) => acc + p.price, 0);
    return totalPrice;
  };

  // Helper function to evaluate and update the count of players from each club
  const evaluateTeamClubId = (currentState) => {
    const duplicatesMap = {};
    const allPlayers = [
      ...currentState.GOA,
      ...currentState.DEF,
      ...currentState.MID,
      ...currentState.STR,
    ];

    allPlayers.forEach((p) => {
      const clubId = p?.club?.id ?? '';
      if (p.name) {
        duplicatesMap[clubId] = (duplicatesMap[clubId] || 0) + 1;
      }
    });
    return duplicatesMap;
  };

  // Helper function to create an updated player object
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
    percentage: player.percentage ?? null,
    image: player.image,
    player: {
      name: player.name,
      name_ru: player.name_ru,
    },
  });

  // --- Start of Validation and Logic ---

  // 1. Check if the player is already in the team
  const isPlayerAlreadyInTeam = teamConcat.some((p) => p.player_id === player.id);
  if (isPlayerAlreadyInTeam) {
    toast.warning(t('Ushbu oyinchi allaqachon oyinda!'));
    return state;
  }

  const newPlayerClubId = player?.club?.id;

  // Re-evaluate duplicates map based on the current state before attempting to add
  const currentDuplicatesMap = evaluateTeamClubId(state);

  // 2. Check if adding this player exceeds the max players from the same club
  if (currentDuplicatesMap[newPlayerClubId] === max_same_team_players) {
    toast.warning(t('Max players count reached from the same club!'));
    return { ...state, transferModal: false };
  }

  if (currentDuplicatesMap[newPlayerClubId] >= maxPlayersFromOneTeam) {
    toast.warning(
      t("Ushbu klubdan $ ta oyinchi qo'shib bo'lmaydi!").replace(
        '$',
        maxPlayersFromOneTeam
      )
    );
    return {
      ...state,
      transferModal: false,
      clubModal: transfer_show_modals,
    };
  }

  // Determine the target player array based on the new player's position
  let updatedState = { ...state };
  let targetPositionArrayName;

  switch (player.position) {
    case PLAYER_POSITION.GOA:
      targetPositionArrayName = 'GOA';
      break;
    case PLAYER_POSITION.DEF:
      targetPositionArrayName = 'DEF';
      break;
    case PLAYER_POSITION.MID:
      targetPositionArrayName = 'MID';
      break;
    case PLAYER_POSITION.STR:
      targetPositionArrayName = 'STR';
      break;
    default:
      // Should not happen if PLAYER_POSITION is exhaustive
      return state;
  }

  const currentPlayersInPosition = updatedState[targetPositionArrayName];
  const emptyPlayerInPosition = currentPlayersInPosition.find((p) => !p.name);
  const playersCountInPosition = updatedState.playersCount[targetPositionArrayName];

  // Logic for adding a player to an empty slot
  // Ensure there's an empty slot and the position's capacity isn't exceeded
  if (
    emptyPlayerInPosition &&
    playersCountInPosition < currentPlayersInPosition.length
  ) {
    const newPlayer = createUpdatedPlayer(emptyPlayerInPosition);

    // Create a new array for the specific position to maintain immutability
    const updatedPositionArray = currentPlayersInPosition
      .filter((p) => p.id !== emptyPlayerInPosition.id)
      .concat(newPlayer);

    updatedState = {
      ...updatedState,
      [targetPositionArrayName]: updatedPositionArray,
      playersCount: {
        ...updatedState.playersCount,
        [targetPositionArrayName]: playersCountInPosition + 1,
      },
    };

    // Recalculate team price and duplicates map after the update
    updatedState.teamPrice = calculateTeamPrice(updatedState);
    updatedState.duplicatesMap = evaluateTeamClubId(updatedState);

    return updatedState;
  }

  // If no empty slot or other conditions met, return the original state
  return state;
};