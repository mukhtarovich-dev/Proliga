import { supabase } from 'lib/supabaseClient'
import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

export const useResetUserThemes = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const { update } = useSession()

  const resetUserThemes = useCallback(
    async ({ user_id, cb = () => {} }) => {
      try {
        setIsLoading(true)
        setError('')

        const { data, error: userError } = await supabase
          .from('user')
          .update({
            user_theme_id: null,
            theme_id: null,
          })
          .eq('id', user_id)
          .select()
          .single()

        if (userError) {
          setError(userError.message)
          toast.error(userError.message)
          return
        }

        cb()
        await update({
          user_theme_id: data?.user_theme_id,
          theme_id: data?.theme_id,
        })
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
  return { resetUserThemes, isLoading, error }
}
