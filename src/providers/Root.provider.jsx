'use client'

import '../auth.config'
import { memo } from 'react'
import ReduxProvider from './Store.provider'
import AuthProvider from './Auth.provider'
import InitialStateProvider from './InitialState.provider'
import SessionProvider from './Session.provider'
import FirebaseProvider from './Firebase.provider'
import ThemesProviders from './Theme.provider'
import ThemeCustomizationProvider from './ThemeCustomization.provider'

const RootProvider = ({ children }) => {
  return (
    <ThemesProviders>
      <SessionProvider>
        <ReduxProvider>
          <AuthProvider>
            <InitialStateProvider>
              <FirebaseProvider>
                <ThemeCustomizationProvider>
                  {children}
                </ThemeCustomizationProvider>
              </FirebaseProvider>
            </InitialStateProvider>
          </AuthProvider>
        </ReduxProvider>
      </SessionProvider>
    </ThemesProviders>
  )
}

export default memo(RootProvider)
