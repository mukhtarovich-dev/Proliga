'use client'

import { SessionProvider } from 'next-auth/react'
import { memo } from 'react'
const AuthSessionProvider = ({ children }) => {
  return (
    <SessionProvider
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
      refetchInterval={1000 * 60 * 5}
    >
      {children}
    </SessionProvider>
  )
}

export default memo(AuthSessionProvider)
