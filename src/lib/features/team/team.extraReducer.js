import {
  fetchUserTeams,
  fetchAllTeams,
  fetchTopTeams,
  searchAllTeams,
} from './team.thunk'

export const teamsExtraReducer = (builder) => {
  builder
    .addCase(fetchUserTeams.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchUserTeams.fulfilled, (state, action) => {
      state.teams = action.payload.data
      state.isLoading = false
    })
    .addCase(fetchUserTeams.rejected, (state, action) => {
      state.error = action?.error ?? null
      state.isLoading = false
    })
    // top teams
    .addCase(fetchTopTeams.pending, (state) => {
      state.topTeams = []
      state.topTeamsLoading = true
    })
    .addCase(fetchTopTeams.fulfilled, (state, action) => {
      if (action.payload.data?.length > 0) {
        state.topTeams = action.payload.data
      }
      state.topTeamsLoading = false
    })
    .addCase(fetchTopTeams.rejected, (state, action) => {
      state.topTeamsError = action?.error ?? null
      state.topTeamsLoading = false
    })
    // fetch all teams
    .addCase(fetchAllTeams.pending, (state) => {
      state.allTeams = []
      state.teamsLoading = true
    })
    .addCase(fetchAllTeams.fulfilled, (state, action) => {
      state.teamsCount = action.payload?.count || 0
      state.allTeams = action.payload?.data || []
      state.teamsLoading = false
    })
    .addCase(fetchAllTeams.rejected, (state, action) => {
      state.teamsError = action?.error ?? null
      state.teamsLoading = false
    })
    // search all teams
    .addCase(searchAllTeams.pending, (state) => {
      state.allTeams = []
      state.teamsLoading = true
    })
    .addCase(searchAllTeams.fulfilled, (state, action) => {
      state.teamsCount = action.payload?.count || 0
      state.allTeams = action.payload?.data || []
      state.teamsLoading = false
    })
    .addCase(searchAllTeams.rejected, (state, action) => {
      state.teamsError = action?.error ?? null
      state.teamsLoading = false
    })
}
