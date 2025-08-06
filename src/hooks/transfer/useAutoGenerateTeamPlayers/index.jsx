import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import { autoAssembleTeam } from 'lib/features/teamPlayer/teamPlayer.slice'
import { revertTeamPlayers } from 'lib/features/teamPlayer/teamPlayer.slice'

export const useAutoGenerateTeamPlayers = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const { t } = useTranslation()

  const generateTeamPlayers = useCallback(
    async ({ team_id, players, currentTeam }) => {
      setIsLoading(false)
      setError(null)

      if (!team_id) {
        setError(t('Jamoa ID kiritilmagan!'))
        toast.error(t('Jamoa ID kiritilmagan!'))
      }

      try {
        setIsLoading(true)

        let { data, error } = await supabase.rpc(
          'get__auto_added_player_by_team_id',
          {
            i_team_id: team_id,
          }
        )
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
          dispatch(revertTeamPlayers())
          dispatch(
            autoAssembleTeam({
              allPlayers: players,
              playerIds: data,
              team: currentTeam,
            })
          )
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
  return { generateTeamPlayers, isLoading, error, data }
}
