import { supabase } from 'lib/supabaseClient'
import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

export const useUpdateUserLocation = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const { update } = useSession()

  const updateLocation = useCallback(
    async ({ location, user, cb = () => {} }) => {
      if (!location) {
        setError(t('Location data is required'))
        return toast.warning(t('Location data is required'), {
          theme: 'dark',
        })
      }
      if (!user?.id) {
        setError('User not authenticated')
        return toast.error(t('Foydalanuvchi autentifikatsiya qilinmagan'))
      }

      try {
        setIsLoading(true)
        setError('')

        const { data, error } = await supabase
          .from('user')
          .update({ location })
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
        await update({ location })
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
  return { updateLocation, isLoading, error }
}
