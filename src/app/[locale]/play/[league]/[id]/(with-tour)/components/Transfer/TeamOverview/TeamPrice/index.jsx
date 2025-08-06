import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import MotionNumber from 'components/MotionNumber'

const TeamPrice = () => {
  const { t } = useTranslation()
  const { teamPrice } = useSelector((store) => store.teamPlayer)

  return (
    <div className="w-full lg:w-auto">
      <h3
        title="Maksimum sotib olish mumkin bolgan o'yinchilar"
        className="text-muted-foreground cursor-default text-start text-xs capitalize sm:text-xs lg:text-xs 2xl:text-sm"
      >
        {t('Jamoa narxi')}
      </h3>
      <p className="text-foreground text-2xl font-bold xl:text-3xl">
        <MotionNumber value={teamPrice} />
      </p>
    </div>
  )
}

export default TeamPrice
