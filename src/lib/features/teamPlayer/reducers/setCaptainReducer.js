export const setCaptainReducer = (state, action) => {
  const playerIdToSetCaptain = action.payload;

  // If no player ID is provided, return the current state unchanged.
  if (!playerIdToSetCaptain) {
    return state;
  }

  // Define a helper function to update the captain status for a single player.
  const updatePlayerCaptainStatus = (player) => ({
    ...player,
    is_captain: player.player_id === +playerIdToSetCaptain,
  });

  // Create a new state object to ensure immutability.
  // Iterate over each player category (GOA, DEF, MID, STR) and
  // map over the players within each category to update their captain status.
  return {
    ...state,
    GOA: state.GOA.map(updatePlayerCaptainStatus),
    DEF: state.DEF.map(updatePlayerCaptainStatus),
    MID: state.MID.map(updatePlayerCaptainStatus),
    STR: state.STR.map(updatePlayerCaptainStatus),
  };
};