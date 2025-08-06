import TeamMaxClubMembersModal from './Modal'
import { MoveUp } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setClubModal } from 'lib/features/teamPlayer/teamPlayer.slice'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import MotionNumber from 'components/MotionNumber'

export default function TeamMaxClubMembers() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const currentTeam = useSelector(selectCurrentTeam)
  const { clubModal } = useSelector((state) => state.teamPlayer)

  return (
    <>
      <div
        className="group w-full cursor-pointer capitalize lg:w-auto"
        onClick={() => dispatch(setClubModal(!clubModal))}
      >
        <header className="text-muted-foreground group-hover:text-foreground flex transition-all group-hover:underline">
          <h3
            title="Maksimum sotib olish mumkin bolgan o'yinchilar"
            className="text-xs sm:text-xs lg:text-xs 2xl:text-sm"
          >
            {t('Bir jamoadan')}
          </h3>
          <MoveUp className="text-muted-foreground group-hover:text-foreground xs:size-4 size-3.5 translate-x-0 rotate-45 self-center transition-all group-hover:translate-x-1" />
        </header>
        <p className="text-foreground text-2xl font-bold xl:text-3xl">
          <MotionNumber value={currentTeam?.transfers_from_one_team ?? 0} />
        </p>
      </div>
      <TeamMaxClubMembersModal />
    </>
  )
}
