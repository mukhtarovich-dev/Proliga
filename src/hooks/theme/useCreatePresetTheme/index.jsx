import { supabase } from 'lib/supabaseClient'
import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useSession } from 'next-auth/react'
import axios from 'axios'

export const useCreatePresetTheme = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const { update } = useSession()

  const createPresetTheme = useCallback(
    async ({
      user_id,
      name,
      name_ru,
      dark_theme,
      light_theme,
      cb = () => { },
    }) => {
      try {
        setIsLoading(true)
        setError('')

        const { data, error } = await supabase
          .from('theme')
          .insert({
            name,
            name_ru,
            dark_theme,
            light_theme,
            is_global: true,
          })
          .select()
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
          return
        }

        const res = await axios.post(
          // eslint-disable-next-line no-undef
          process.env.NEXT_PUBLIC_URL + '/api/theme/set-preset',
          {
            preset_id: data?.id,
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

        const { error: userError } = await supabase
          .from('user')
          .update({
            theme_id: data?.id,
          })
          .eq('id', user_id)

        if (userError) {
          setError(userError.message)
          toast.error(userError.message)
          return
        }
        cb()
        await update({
          theme_id: data?.id,
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
  return { createPresetTheme, isLoading, error }
}
