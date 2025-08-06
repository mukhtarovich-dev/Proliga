import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import { setCurrentTourTeamTransfersCount } from 'lib/features/tourTeam/tourTeam.slice'
import { fetchTourTeams } from 'lib/features/tourTeam/tourTeam.thunk'

export const useUpdateTourTeam = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const { t } = useTranslation()

  const updateTourTeam = useCallback(
    async ({ team_id, tour_id, count_of_transfers }) => {
      setIsLoading(false)
      setError(null)

      if (!team_id) {
        setError(t('Jamoa ID kiritilmagan!'))
        toast.error(t('Jamoa ID kiritilmagan!'))
        return
      }
      if (!tour_id) {
        setError(t('Turnir ID kiritilmagan!'))
        toast.error(t('Turnir ID kiritilmagan!'))
        return
      }
      if (count_of_transfers === null || count_of_transfers === undefined) {
        setError(t('Transfer soni kiritilmagan!'))
        toast.error(t('Transfer soni kiritilmagan!'))
        return
      }
      try {
        setIsLoading(true)

        const { data, error } = await supabase
          .from('tour_team')
          .update({ current_count_of_transfers: count_of_transfers })
          .eq('team_id', team_id)
          .eq('tour_id', tour_id)
          .is('deleted_at', null)
          .select('*')

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
          dispatch(setCurrentTourTeamTransfersCount(count_of_transfers))
          dispatch(fetchTourTeams({ team_id: team_id }))
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
  return { updateTourTeam, isLoading, error, data }
}
