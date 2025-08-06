import { supabase } from 'lib/supabaseClient'
import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

export const useSetThemeDefault = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()

  const setThemeDefault = useCallback(
    async ({ theme_id, dark_theme, light_theme, cb = () => { } }) => {
      try {
        setIsLoading(true)
        setError('')

        const res = await axios.post(
          // eslint-disable-next-line no-undef
          process.env.NEXT_PUBLIC_URL + '/api/theme/set-default',
          {
            theme_id,
            dark_theme,
            light_theme,
          }
        )

        if (res.status !== 200) {
          setError(
            res.error instanceof Error
              ? res.error.message
              : t('An unknown error occurred')
          )
          toast.error(
            res.error instanceof Error
              ? res.error.message
              : t('An unknown error occurred')
          )
          return
        }

        const { error } = await supabase
          .from('theme')
          .update({
            is_default: true,
            dark_theme,
            light_theme,
            is_global: true,
            user_id: null,
          })
          .eq('id', theme_id)

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
          return
        }

        cb()
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
    [t]
  )
  return { setThemeDefault, isLoading, error }
}
