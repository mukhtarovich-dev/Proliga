import { supabase } from 'lib/supabaseClient'
import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

export const useUpdateUserNotificationInfo = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const { update } = useSession()

  const updateNotificationToken = useCallback(
    async ({ notification_token, user, cb = () => {} }) => {
      if (!user?.id) {
        setError('User not authenticated')
        return toast.error(t('Foydalanuvchi autentifikatsiya qilinmagan'))
      }

      try {
        setIsLoading(true)
        setError('')
        const obj = {
          ntf_token: notification_token,
          ntf_token_created_at: new Date(),
        }

        const { data, error } = await supabase
          .from('user')
          .update(obj)
          .eq('id', user?.id)
          .is('deleted_at', null)
          .single()

        if (error) {
          setError(
            error instanceof Error
              ? error.message
              : t('An unknown error occurred')
          )
          toast.error(
            error instanceof Error
              ? error.message
              : t('An unknown error occurred')
          )
          return { error, data }
        }

        cb()
        await update(obj)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred')
        )
        toast.error(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred')
        )
      } finally {
        setIsLoading(false)
      }
    },
    [t, update]
  )
  return { updateNotificationToken, isLoading, error }
}
