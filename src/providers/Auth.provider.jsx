'use client'

import { useEffect, memo, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserTable } from '../lib/features/auth/auth.slice'
import { usePathname } from 'next/navigation'
import { CONFIG_KEY } from 'utils/config.util'
import { useLogOut } from 'hooks/auth/useLogOut'
import { toast } from 'sonner'
import { selectSystemConfig } from 'lib/features/systemConfig/systemConfig.selector'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import { useAuthStatus } from 'hooks/auth/useAuthStatus'

const AuthProvider = ({ children }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const path = usePathname()
  const config = useSelector(selectSystemConfig)
  const app_version = config[CONFIG_KEY.app_version]?.value ?? ''
  const { logOut } = useLogOut()
  const { data: session } = useSession()
  const [logoutInProgress, setLogoutInProgress] = useState(false)
  const { setAuth, isAuthenticated } = useAuthStatus()

  const performLogout = useCallback(
    async (message) => {
      if (logoutInProgress) return

      setLogoutInProgress(true)
      await logOut({
        showMessage: false,
        cb: () => {
          toast.warning(message)
          setLogoutInProgress(false)
        },
      })
    },
    [logOut, logoutInProgress]
  )

  useEffect(() => {
    if (session !== undefined) {
      dispatch(setUserTable(session?.user || {}))
      if (session?.user?.id) {
        setAuth(true)
      }
    }
  }, [session, dispatch, setAuth])

  useEffect(() => {
    if (path.includes('auth') || path.includes('confirm-otp')) {
      return
    }

    if (logoutInProgress || !session?.user?.id || !isAuthenticated) {
      return
    }
    if (!session?.user?.phone || !session?.user?.email) {
      performLogout(
        t(
          'Your registration was not successfully completed, so we are logging you out for security reasons.'
        )
      )
      return
    }

    if (session?.user?.id && !session?.user?.phone_verified) {
      performLogout(
        t('Phone not verified. Please complete the verification process.')
      )
      return
    }
  }, [
    path,
    session?.user?.id,
    session?.user?.phone,
    session?.user?.phone_verified,
    session?.user?.email,
    t,
    logOut,
    logoutInProgress,
    performLogout,
    isAuthenticated,
  ])

  useEffect(() => {
    const existing_app_version = localStorage.getItem('app_version') || null

    if (
      session?.user?.id &&
      app_version &&
      existing_app_version &&
      existing_app_version !== 'null' &&
      existing_app_version !== 'undefined' &&
      app_version !== existing_app_version &&
      !logoutInProgress
    ) {
      const performLogout = async () => {
        setLogoutInProgress(true)
        await logOut({
          showMessage: false,
          cb: () => setLogoutInProgress(false),
        })
      }

      toast.warning(
        t(
          'Ilova yangilandi. Iltimos, tizimga qayta kiring. Noqulayliklar uchun uzr soʻraymiz.'
        ),
        {
          autoClose: 5000,
        }
      )

      performLogout()
    }
  }, [app_version, session?.user?.id, logOut, t, logoutInProgress])

  return <>{children}</>
}

export default memo(AuthProvider)
