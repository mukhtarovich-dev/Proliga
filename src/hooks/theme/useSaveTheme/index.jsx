import { supabase } from 'lib/supabaseClient'
import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'

export const useSaveTheme = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const { update } = useSession()

  const saveTheme = useCallback(
    async ({ theme, user_id, cb = () => {} }) => {
      try {
        setError('')
        if (!theme?.id || !theme?.is_global) {
          setError(t('Invalid theme'))
          toast.error(t('Invalid theme'))
          return
        }

        const { error: themeError } = await supabase
          .from('user')
          .update({
            theme_id: theme.id,
            user_theme_id: null,
          })
          .eq('id', user_id)
          .select()
          .single()

        if (themeError) {
          setError(themeError.message)
          toast.error(themeError.message)
          return
        }
        await update({
          theme_id: theme.id,
          user_theme_id: null,
        })
        cb()
      } catch (error) {
        setError(error.message)
        toast.error(error.message)
      } finally {
        setIsLoading(true)
      }
    },
    [t, update]
  )

  const saveUserTheme = useCallback(
    async ({ user_id, theme, cb = () => {} }) => {
      try {
        setIsLoading(true)
        setError('')

        if (!theme?.user_id || theme.user_id !== user_id || !theme?.id) {
          setError(t('Invalid theme'))
          toast.error(t('Invalid theme'))
          return
        }
        const { data, error: userError } = await supabase
          .from('user')
          .update({
            user_theme_id: +theme.id,
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
  return { saveUserTheme, saveTheme, isLoading, error }
}
