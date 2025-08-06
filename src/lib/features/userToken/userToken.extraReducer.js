import { fetchUserTokens } from './userToken.thunk'

export const userTokenExtraReducer = (builder) => {
    builder
        .addCase(fetchUserTokens.pending, (state) => {
            state.isLoading = true
        })
        .addCase(fetchUserTokens.fulfilled, (state, action) => {
            state.isLoading = false
            state.tokens = action.payload?.data || []
        })
        .addCase(fetchUserTokens.rejected, (state, action) => {
            state.isLoading = false
            state.error = action?.error
        })
}
