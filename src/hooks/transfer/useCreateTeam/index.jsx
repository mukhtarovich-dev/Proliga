import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { supabase } from '../../../lib/supabaseClient'
import { addGameToTeam } from 'lib/features/team/team.slice'
import { useTranslation } from 'react-i18next'
import { useTransitionRouter } from 'next-view-transitions'

export const useCreateTeam = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const router = useTransitionRouter()
  const { t } = useTranslation()

  const createTeam = useCallback(
    async ({ title, formation, competition_id, user, cb = () => {} }) => {
      setIsLoading(false)
      setError(null)

      if (!user?.id) {
        setError('"Jamoa tuzish uchun tizimga kirishingiz kerak')
        toast.warning(t('Jamoa tuzish uchun tizimga kirishingiz kerak'), {
          theme: 'dark',
        })
        router.push('/auth')
        return
      }

      if (!title) {
        setError('Ism bolishi shart')
        toast.warning(t('Ism bolishi shart'))
        return
      }

      if (!formation) {
        setError('Taktika bolishi shart')
        toast.warning(t('Taktika bolishi shart'))
        return
      }

      try {
        setIsLoading(true)

        const { data, error } = await supabase
          .from('team')
          .insert({
            name: title,
            formation,
            competition_id,
            user_id: user.id,
          })
          .is('deleted_at', null)
          .select()
          .single()

        if (error) {
          setError(
            error instanceof Error
              ? error.message
              : t('An unknown error occurred')
          )
          if (error?.code === '23505') {
            return toast.error(t('Ushbu jamoa allaqachon yaratilgan'))
          } else {
            return toast.error(
              error instanceof Error
                ? error.message
                : t('An unknown error occurred')
            )
          }
        }
        if (data) {
          setData(data)
          dispatch(addGameToTeam(data))
          toast.success(t('Jamoa muvaffaqiyatli yaratildi'))
          cb(data)
        }
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
    [dispatch, router, t]
  )
  return { createTeam, isLoading, error, data }
}
