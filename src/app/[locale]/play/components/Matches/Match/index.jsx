import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'components/ui/tooltip'
import { useTranslation } from 'react-i18next'
import { formatDate } from 'utils/formatDate.util'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCurrentMatch,
  setMatchModalOpen,
} from 'lib/features/match/match.slice'
import { getCorrectName } from 'utils/getCorrectName.util'
import { memo } from 'react'
import MatchStatus from './Status'
import MatchTeamDisplay from './TeamDisplay'

const Match = ({ match }) => {
  const dispatch = useDispatch()
  const { lang } = useSelector((store) => store.systemLanguage)
  const { t } = useTranslation()
  const homeClub = match?.home_club_id ?? null
  const awayClub = match?.away_club_id ?? null
  const date = formatDate(match?.started_date, 'matches')

  const homeScore = parseInt(match?.home_club_result) || 0
  const awayScore = parseInt(match?.away_club_result) || 0
  const isHomeWinner = homeScore > awayScore
  const isAwayWinner = awayScore > homeScore
  const isDraw = match?.status === 'finished' && homeScore === awayScore

  const handleClick = () => {
    dispatch(setCurrentMatch(match))
    dispatch(setMatchModalOpen(true))
  }

  return (
    <article
      onClick={handleClick}
      className="xs:px-2 border-border bg-card/80 flex h-12 w-full cursor-pointer items-center rounded-lg border px-1 select-none"
    >
      <MatchTeamDisplay
        name={getCorrectName({
          lang,
          uz: homeClub?.name,
          ru: homeClub?.name_ru,
        })}
        logo={homeClub?.logo_img}
        isWinner={isHomeWinner}
        isDraw={isDraw}
        alignment="left"
      />
      <div className="flex w-[30%] flex-col items-center justify-center gap-0.5">
        <MatchStatus
          status={match?.status}
          homeScore={homeScore}
          awayScore={awayScore}
        />
        <TooltipProvider>
          <Tooltip className="m-0 p-0">
            <TooltipTrigger className="text-muted-foreground text-xs leading-3 font-medium tracking-wider">
              <time>{date}</time>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('Match start time')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <MatchTeamDisplay
        name={getCorrectName({
          lang,
          uz: awayClub?.name,
          ru: awayClub?.name_ru,
        })}
        logo={awayClub?.logo_img}
        isWinner={isAwayWinner}
        isDraw={isDraw}
        alignment="right"
        match={match}
      />
    </article>
  )
}

export default memo(Match)
