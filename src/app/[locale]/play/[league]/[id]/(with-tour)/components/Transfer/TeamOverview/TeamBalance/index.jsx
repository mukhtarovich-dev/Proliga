import MotionNumber from 'components/MotionNumber'
import TeamBalanceModal from './Modal'
import { MoveUp } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setBalanceModal } from 'lib/features/currentTeam/currentTeam.slice'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'

const TeamBalance = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { balanceModal, teamPrice } = useSelector((store) => store.teamPlayer)
  const currentTeam = useSelector(selectCurrentTeam)

  const teamBalance = +(currentTeam?.balance || 0) - +(teamPrice || 0)

  return (
    <>
      <div
        className="group w-full cursor-pointer capitalize lg:w-auto"
        onClick={() => dispatch(setBalanceModal(!balanceModal))}
      >
        <header className="text-muted-foreground group-hover:text-foreground flex cursor-pointer transition-all group-hover:underline">
          <h3
            title="Maksimum sotib olish mumkin bolgan o'yinchilar"
            className="text-xs sm:text-xs lg:text-xs 2xl:text-sm"
          >
            {t('Balans')}
          </h3>
          <MoveUp className="text-muted-foreground group-hover:text-foreground xs:size-4 size-3.5 translate-x-0 rotate-45 self-center transition-all group-hover:translate-x-1" />
        </header>
        <p className="text-foreground text-2xl font-bold xl:text-3xl">
          <MotionNumber value={teamBalance || 0} />
        </p>
      </div>
      <TeamBalanceModal />
    </>
  )
}

export default TeamBalance
