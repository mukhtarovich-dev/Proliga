import { createDraftSafeSelector } from "@reduxjs/toolkit";


export const selectUserTokens = createDraftSafeSelector(
    (state) => state.userToken,
    (userToken) => userToken.tokens
)
