import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { useMemo } from 'react'
import { setCaptain } from 'lib/features/teamPlayer/teamPlayer.slice'
import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from 'components/ui/select'
import { useUpdateTeamCaptains } from 'hooks/transfer/useUpdateTeamCaptains'
import { selectTeamConcat } from 'lib/features/teamPlayer/teamPlayer.selector'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { selectUser } from 'lib/features/auth/auth.selector'
import { selectCurrentCompetition } from 'lib/features/competition/competition.selector'
import { getCorrectName } from 'utils/getCorrectName.util'
import { TOUR_STATUS } from 'utils/tour.util'
import { Loader2 } from 'lucide-react'
import {
  StadiumSelectTrigger,
  StadiumSaveButton,
} from 'components/Game/Stadium'

const ProfileStadiumForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const currentTeam = useSelector(selectCurrentTeam)
  const user = useSelector(selectUser)
  const currentCompetition = useSelector(selectCurrentCompetition)
  const teamConcat = useSelector(selectTeamConcat)
  const { playersCount } = useSelector((state) => state.teamPlayer)
  const { lang } = useSelector((store) => store.systemLanguage)
  const { isLoading: teamLoading } = useSelector((state) => state.currentTeam)
  const { currentTour, isLoading: tourLoading } = useSelector(
    (state) => state.tour
  )
  const { updateTeamCaptains, isLoading: captainsLoading } =
    useUpdateTeamCaptains()

  const isLoading = useMemo(
    () => teamLoading || tourLoading || captainsLoading,
    [captainsLoading, teamLoading, tourLoading]
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    const captains = []
    if (!validPlayers()) return

    teamConcat.forEach((player) => {
      if (player.is_captain) {
        captains.push(player.player_id)
      }
    })

    if (captains.length !== 1) {
      toast.warning(t('Kapitan tanlanmagan'))
      return
    }

    if (!validTeamStructure()) return

    await updateTeamCaptains({
      team: teamConcat,
      team_id: currentTeam.id,
      tour_id: currentTour.id,
      user,
      currentCompetition,
    })
  }

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
      className="text-accent-foreground mt-2 flex justify-between gap-x-1"
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
      <StadiumSaveButton type="submit" disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="mx-auto size-6 animate-spin" />
        ) : (
          t('Saqlash')
        )}
      </StadiumSaveButton>
    </form>
  )
}

export default ProfileStadiumForm
