import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { useEffect, useMemo } from 'react'
import { useUpdateTeamPlayers } from 'hooks/transfer/useUpdateTeamPlayers'
import { setCaptain } from 'lib/features/teamPlayer/teamPlayer.slice'
import { useState } from 'react'
import { useUpdateTeam } from 'hooks/transfer/useUpdateTeam'
import { setTab } from 'lib/features/tour/tour.slice'
import { TABS } from 'utils/tabs.util'
import { revertTeamPlayers } from 'lib/features/teamPlayer/teamPlayer.slice'
import { useTranslation } from 'react-i18next'
import { useUpdateTourTeam } from 'hooks/transfer/useUpdateTourTeam'
import { useAutoGenerateTeamPlayers } from 'hooks/transfer/useAutoGenerateTeamPlayers'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from 'components/ui/select'
import { Button } from 'components/ui/button'
import { setTransferModal } from 'lib/features/currentTeam/currentTeam.slice'
import { CONFIG_KEY } from 'utils/config.util'
import {
  selectPrevTeam,
  selectTeamConcat,
} from 'lib/features/teamPlayer/teamPlayer.selector'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { selectCurrentTourTeam } from 'lib/features/tourTeam/tourTeam.selector'
import { selectCurrentTour } from 'lib/features/tour/tour.selector'
import { selectCurrentCompetition } from 'lib/features/competition/competition.selector'
import { selectUser } from 'lib/features/auth/auth.selector'
import { selectPlayers } from 'lib/features/player/player.selector'
import { getCorrectName } from 'utils/getCorrectName.util'
import { selectSystemConfig } from 'lib/features/systemConfig/systemConfig.selector'
import { Loader2, Undo2, Compass } from 'lucide-react'
import { TOUR_STATUS } from 'utils/tour.util'
import {
  StadiumSelectTrigger,
  StadiumSaveButton,
} from 'components/Game/Stadium'

const TransferStadiumForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const teamConcat = useSelector(selectTeamConcat)
  const currentCompetition = useSelector(selectCurrentCompetition)
  const user = useSelector(selectUser)
  const currentTeam = useSelector(selectCurrentTeam)
  const currentTour = useSelector(selectCurrentTour)
  const players = useSelector(selectPlayers)
  const currentTourTeam = useSelector(selectCurrentTourTeam)
  const { playersCount, teamPrice } = useSelector((state) => state.teamPlayer)
  const prevTeam = useSelector(selectPrevTeam)
  const { lang } = useSelector((state) => state.systemLanguage)
  const config = useSelector(selectSystemConfig)

  const [teamCreateBtns, toggleTeamCreateBtns] = useState(false)

  const transfer_show_modals =
    config[CONFIG_KEY.transfer_show_modals]?.value?.toLowerCase() === 'true'
  const {
    updateTeamPlayers,
    isLoading: playersLoading,
    error: playersError,
  } = useUpdateTeamPlayers()
  const {
    updateTourTeam,
    isLoading: tourTeamLoading,
    error: tourTeamError,
  } = useUpdateTourTeam()
  const {
    generateTeamPlayers,
    isLoading: teamPlayersLoading,
    error: teamPlayersError,
  } = useAutoGenerateTeamPlayers()
  const {
    updateTeam,
    isLoading: teamLoading,
    error: teamError,
  } = useUpdateTeam()

  const isLoading = useMemo(
    () =>
      playersLoading || tourTeamLoading || teamPlayersLoading || teamLoading,
    [playersLoading, tourTeamLoading, teamPlayersLoading, teamLoading]
  )

  const error = useMemo(
    () => playersError || tourTeamError || teamPlayersError || teamError,
    [playersError, tourTeamError, teamPlayersError, teamError]
  )

  const handleAutoGenerateTeamPlayers = async () => {
    await generateTeamPlayers({ team_id: currentTeam.id, players, currentTeam })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const prevTeamPlayersId = []
    const curTeamPlayersId = []
    const captains = []

    if (!validPlayers()) return

    prevTeam.forEach((p) => p.name && prevTeamPlayersId.push(p.player_id))

    teamConcat.forEach((player) => {
      player.is_captain && captains.push(player.player_id)
      player.name && curTeamPlayersId.push(player.player_id)
    })

    if (captains.length !== 1) {
      toast.warning(t('Kapitan tanlanmagan'))
      return
    }

    if ((currentTeam?.balance || 0) < teamPrice) {
      toast.error(t('Balansingiz yetarli emas'))
      return
    }

    if (!validTeamStructure()) return

    let difference = curTeamPlayersId.filter(
      (x) => !prevTeamPlayersId.includes(x)
    )
    const countOfTransfers =
      (difference.length || 0) + currentTourTeam?.current_count_of_transfers

    if (
      currentTeam?.is_team_created &&
      currentTeam?.count_of_transfers < countOfTransfers
    ) {
      toast.error(t('Siz limitdan oshiq transfer amalga oshiraolmaysiz'))
      dispatch(revertTeamPlayers())
      transfer_show_modals && dispatch(setTransferModal(true))
      return
    }

    if (!currentTeam?.is_team_created) {
      await updateTeam({
        team_id: currentTeam.id,
        is_team_created: currentTeam?.is_team_created,
      })
    } else {
      await updateTourTeam({
        team_id: currentTeam.id,
        tour_id: currentTour.id,
        count_of_transfers: countOfTransfers,
      })
    }

    await updateTeamPlayers({
      team: teamConcat,
      team_id: currentTeam.id,
      tour_id: currentTour.id,
      user,
      currentCompetition,
    })

    if (!error && !isLoading) {
      dispatch(setTab(TABS.GameProfile))
      toast.success(t('Jamoa muvaffaqiyatli yangilandi'))
    }
  }

  useEffect(() => {
    if (currentTeam?.is_team_created === false) {
      toggleTeamCreateBtns(true)
    }
  }, [currentTeam])

  const validPlayers = () => {
    let valid = true

    teamConcat.forEach((player) => {
      if (!player.name || !player.price) {
        // toast.warning(
        //   t('identifikatori bolgan va holatida bolgan oyinchi yaroqsiz')
        //     .replace('$', player?.id)
        //     .replace('*', getCorrentPlayerPosition(player?.position, lang))
        // )
        return (valid = false)
      }
    })
    !valid &&
      toast.warning(
        t(
          'Jamoa to‘liq tuzilmagan. Jamoani saqlash uchun barcha pozitsiyalarni to‘ldiring.'
        ),
        { richColors: true }
      )
    return valid
  }

  const validTeamStructure = () => {
    if (
      playersCount.GOA !== 1 ||
      playersCount.DEF < 3 ||
      playersCount.DEF > 5 ||
      playersCount.MID < 3 ||
      playersCount.MID > 5 ||
      playersCount.STR < 2 ||
      playersCount.STR > 3
    ) {
      toast.error(t('Jamoa formatsiyasi notogri'))
      return false
    }
    return true
  }

  if (currentTour?.status !== TOUR_STATUS.notStartedTransfer) {
    return null
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="text-accent-foreground xs:gap-x-0.5 mt-2 flex justify-between gap-x-0 sm:gap-x-1"
    >
      <Select
        name="formation"
        id="formation"
        value={teamConcat.find((player) => player.is_captain)?.player_id ?? ''}
        onValueChange={(value) => dispatch(setCaptain(value))}
      >
        <StadiumSelectTrigger>
          <SelectValue placeholder={t('Kapitan tanlang')} />
        </StadiumSelectTrigger>
        <SelectContent>
          {teamConcat.map(
            (player) =>
              player.name && (
                <SelectItem
                  value={player.player_id}
                  key={player.id}
                  selected={player.is_captain}
                >
                  {getCorrectName({
                    lang,
                    uz: player?.player?.name,
                    ru: player?.player?.name_ru,
                  })}
                </SelectItem>
              )
          )}
        </SelectContent>
      </Select>
      <div className="xs:gap-1 flex justify-center gap-0.5">
        {teamCreateBtns && (
          <Button
            onClick={handleAutoGenerateTeamPlayers}
            type="button"
            variant="default"
            title="Avto jamoa yigish"
            className="bg-card text-foreground hover:border-primary border-border hover:text-accent-foreground flex size-10 items-center justify-center gap-1 border transition-all"
          >
            <Compass className="size-6" />
          </Button>
        )}
        <Button
          type="button"
          variant="default"
          size="icon"
          onClick={() => dispatch(revertTeamPlayers())}
          title={t('orqaga qaytish')}
          className="bg-card text-foreground hover:border-primary border-border hover:text-accent-foreground flex size-10 items-center justify-center gap-1 border transition-all"
        >
          <Undo2 className="size-6" />
        </Button>
      </div>
      <StadiumSaveButton type="submit" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="text-foreground mx-auto size-6 animate-spin" />
        ) : (
          t('Saqlash')
        )}
      </StadiumSaveButton>
    </form>
  )
}

export default TransferStadiumForm
