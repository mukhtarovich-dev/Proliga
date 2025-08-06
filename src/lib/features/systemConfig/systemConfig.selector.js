import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectSystemConfig = createDraftSafeSelector(
  (state) => state.systemConfig,
  (systemConfig) => systemConfig.config
)
