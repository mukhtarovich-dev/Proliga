import { selectCurrentMatch } from 'lib/features/match/match.selector'
import { Timer } from 'lucide-react'
import { useSelector } from 'react-redux'
import { getUrl } from 'utils/static.util'
import { MATCH_STATUS } from 'utils/match.util'
import { getCorrectName } from 'utils/getCorrectName.util'
import { useTranslation } from 'react-i18next'
import { cn } from 'lib/utils'

const MatchEventScore = () => {
  const currentMatch = useSelector(selectCurrentMatch)
  const { lang } = useSelector((store) => store.systemLanguage)

  return (
    <section className="from-chart-1/20 via-chart-3/20 to-chart-2/20 h-min bg-linear-to-r py-3">
      <div className="flex items-center justify-center gap-4">
        <div className="flex w-1/3 flex-col items-center justify-center gap-2 text-center sm:w-[40%]">
          <img
            src={getUrl(currentMatch?.home_club_id?.logo_img)}
            alt="Arsenal"
            onError={(e) => (e.currentTarget.src = '/icons/football.svg')}
            className="shadow-border size-10 rounded-full shadow-sm sm:size-16"
          />
          <h3 className="text-sm font-bold sm:text-base">
            {getCorrectName({
              lang,
              uz: currentMatch?.home_club_id?.name,
              ru: currentMatch?.home_club_id?.name_ru,
            })}
          </h3>
        </div>
        <div className="flex w-1/3 flex-col items-center justify-center gap-2 text-center sm:w-[20%]">
          <section className="flex items-center justify-center gap-3">
            <span className="text-foreground text-3xl font-bold sm:text-4xl">
              {currentMatch?.home_club_result || 0}
            </span>
            <span className="text-muted-foreground text-3xl font-light sm:text-4xl">
              :
            </span>
            <span className="text-foreground text-3xl font-bold sm:text-4xl">
              {currentMatch?.away_club_result || 0}
            </span>
          </section>
          <ScoreBoard match={currentMatch} />
        </div>
        <div className="flex w-1/3 flex-col items-center justify-center gap-2 text-center sm:w-[40%]">
          <img
            src={getUrl(currentMatch?.away_club_id?.logo_img)}
            alt="Manchester City"
            onError={(e) => (e.currentTarget.src = '/icons/football.svg')}
            className="shadow-border size-10 rounded-full shadow-sm sm:size-16"
          />
          <h3 className="text-sm font-bold sm:text-base">
            {getCorrectName({
              lang,
              uz: currentMatch?.away_club_id?.name,
              ru: currentMatch?.away_club_id?.name_ru,
            })}
          </h3>
        </div>
      </div>
    </section>
  )
}

const ScoreBoard = () => {
  const { t } = useTranslation()
  const match = useSelector(selectCurrentMatch)

  switch (match?.status) {
    case MATCH_STATUS.NOT_STARTED:
      return (
        <div
          className={cn(
            'flex w-full items-center justify-center gap-1 rounded-full px-2 py-1 text-xs sm:w-auto sm:text-sm',
            'bg-background text-foreground'
          )}
        >
          {t('Boshlanmagan')}
        </div>
      )
    case MATCH_STATUS.INPROCESS:
      return (
        <div
          className={cn(
            'flex w-full items-center justify-center gap-1 rounded-full px-2 py-1 text-xs sm:w-auto sm:text-sm',
            'bg-background text-foreground animate-pulse'
          )}
        >
          {t('Jarayonda')}
        </div>
      )
    case MATCH_STATUS.FINISHED:
      return (
        <div
          className={cn(
            'flex w-full items-center justify-center gap-1 rounded-full px-2 py-1 text-xs sm:w-auto sm:text-sm',
            'bg-green-500/20 text-green-400'
          )}
        >
          <Timer className="h-4 w-4" />
          <span>
            {match?.match_min}`
            {match?.additional_min && `+ ${match?.additional_min}`}
          </span>
        </div>
      )
    default:
      return null
  }
}

export default MatchEventScore
