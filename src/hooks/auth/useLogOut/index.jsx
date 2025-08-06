import { toast } from 'sonner'
import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setUserTable } from '../../../lib/features/auth/auth.slice'
import { clearNotifications } from 'lib/features/systemNotification/systemNotification.slice'
import {
  resetCurrentTeam,
  setLastVisitedTeam,
} from 'lib/features/currentTeam/currentTeam.slice'
import { resetTeams } from 'lib/features/team/team.slice'
import { signOut } from 'next-auth/react'
import { useTransitionRouter } from 'next-view-transitions'
import { deleteToken } from 'firebase/messaging'
import { messaging } from 'lib/firebase/firebase'

export const useLogOut = () => {
  const router = useTransitionRouter()
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const { t } = useTranslation()

  const clearState = useCallback(() => {
    dispatch(setUserTable(null))
    dispatch(clearNotifications())
    dispatch(resetCurrentTeam())
    dispatch(resetTeams())
    dispatch(setLastVisitedTeam(''))
  }, [dispatch])

  const logOut = useCallback(
    async ({ showMessage = true, cb = () => { } } = {}) => {
      try {
        await signOut({
          redirect: false,
        })
        clearState()
        localStorage.clear()

        if (showMessage) {
          toast.success(t('Tizimdan chiqdingiz'))
        }
        const fcmMessaging = await messaging()
        if (fcmMessaging) {
          await deleteToken(fcmMessaging)
        }
        cb()
        router.push('/')
      } catch (error) {
        setError(error)
        toast.error(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred')
        )
      }
    },
    [clearState, t, router]
  )

  return { logOut, error }
}
