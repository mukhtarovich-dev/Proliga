import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import { setIsTeamCreated } from 'lib/features/currentTeam/currentTeam.slice'

export const useUpdateTeam = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const { t } = useTranslation()

  const updateTeam = useCallback(
    async ({ team_id, is_team_created }) => {
      setIsLoading(false)
      setError(null)

      if (is_team_created) {
        return
      }
      if (!team_id) {
        setError(t('Jamoa ID kiritilmagan!'))
        toast.error(t('Jamoa ID kiritilmagan!'))
      }

      try {
        setIsLoading(true)

        const { data, error } = await supabase
          .from('team')
          .update({ is_team_created: true })
          .eq('id', team_id)
          .select('*')
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
          return
        }
        if (data) {
          setData(data)
          dispatch(setIsTeamCreated(data?.is_team_created ?? true))
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
    [dispatch, t]
  )
  return { updateTeam, isLoading, error, data }
}
