'use client'

import { useEffect } from 'react'
import { useLogOut } from 'hooks/auth/useLogOut'

function Clear() {
  const { logOut } = useLogOut()

  useEffect(() => {
    logOut()
  }, [logOut])

  return <div className="h-svh" />
}

export default Clear
