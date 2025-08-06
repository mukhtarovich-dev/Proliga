import { createDraftSafeSelector } from '@reduxjs/toolkit'

export const selectPackages = createDraftSafeSelector(
  (state) => state.package,
  (packages) => packages.packages
)

export const selectCurrentPackage = createDraftSafeSelector(
  (state) => state.package,
  (packages) => packages.currentPackage
)
