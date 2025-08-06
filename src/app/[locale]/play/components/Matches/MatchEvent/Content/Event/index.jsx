import { MATCH_EVENTS } from 'utils/match.util'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { getCorrectName } from 'utils/getCorrectName.util'
import { eventVariants } from '../../animations.styles'
import { cn } from 'lib/utils'
import { selectCurrentMatch } from 'lib/features/match/match.selector'
import MatchEventIcon from './Icon'
import { memo } from 'react'

const MatchEvent = ({ event, index }) => {
  const { t } = useTranslation()
  const { lang } = useSelector((store) => store.systemLanguage)
  const currentMatch = useSelector(selectCurrentMatch)

  const hasSecondName = checkHasSecondName(event?.event_type)
  const hasName = checkHasName(event?.event_type)
  const isTextOnly = checkIsTextOnly(event?.event_type)
  let isHome = checkIsHome({
    event,
    isTextOnly,
    hasName,
    hasSecondName,
    currentMatch,
  })

  if (isTextOnly) {
    isHome = true
  }

  if (
    hasSecondName &&
    currentMatch?.home_club_id?.id === event.player_id?.club?.id &&
    currentMatch?.home_club_id?.id === event.second_player_id?.club?.id
  ) {
    isHome = true
  }
  if (hasName && event.player_id?.club?.id === currentMatch?.home_club_id?.id) {
    isHome = true
  }

  const renderHeader = (type) => {
    switch (type) {
      case MATCH_EVENTS.FIRST_TIME_START:
        return t('Match Start')
      case MATCH_EVENTS.FIRST_TIME_END:
        return t('Halftime')
      case MATCH_EVENTS.SECOND_TIME_START:
        return t('2nd Match Start')
      case MATCH_EVENTS.SECOND_TIME_END:
        return t('Game Ends')
      default:
        return null
    }
  }

  return (
    <motion.div
      variants={eventVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      className={cn(
        'flex items-center justify-center',
        isTextOnly ? 'flex-col' : isHome ? 'flex-row' : 'flex-row-reverse'
      )}
    >
      {isTextOnly ? (
        <div className="bg-background text-foreground shadow-border z-10 rounded-sm px-3 py-1.5 text-center text-sm shadow-sm">
          {renderHeader(event.event_type)}
        </div>
      ) : (
        <>
          <div
            className={cn(
              'w-5/12',
              isHome ? 'pr-4 text-right' : 'pl-4 text-left'
            )}
          >
            {hasName && (
              <div
                className={cn(
                  'text-foreground text-sm md:text-base',
                  event.event_type === MATCH_EVENTS.TRANSFER && 'text-success'
                )}
              >
                {getCorrectName({
                  lang,
                  uz: event?.player_id?.name,
                  ru: event?.player_id?.name_ru,
                })}
              </div>
            )}
            {event?.second_player_id && hasSecondName && (
              <div
                className={cn(
                  'text-muted-foreground text-xs md:text-sm',
                  event.event_type === MATCH_EVENTS.TRANSFER && 'text-error'
                )}
              >
                {getCorrectName({
                  lang,
                  uz: event?.second_player_id?.name,
                  ru: event?.second_player_id?.name_ru,
                })}
              </div>
            )}
          </div>
          <div className="flex w-2/12 items-center justify-center">
            <div className="bg-background shadow-border z-10 flex size-10 items-center justify-center rounded-full shadow-sm">
              <MatchEventIcon type={event.event_type} />
            </div>
          </div>
          <div
            className={cn(
              'w-5/12',
              isHome ? 'pl-4 text-left' : 'pr-4 text-right'
            )}
          >
            <div className="text-foreground/70 text-sm">{event.minute}`</div>
          </div>
        </>
      )}
    </motion.div>
  )
}

const checkIsTextOnly = (event_type) => {
  switch (event_type) {
    case MATCH_EVENTS.FIRST_TIME_START:
    case MATCH_EVENTS.FIRST_TIME_END:
    case MATCH_EVENTS.SECOND_TIME_START:
    case MATCH_EVENTS.SECOND_TIME_END:
      return true
    default:
      return false
  }
}

const checkHasName = (event_type) => {
  switch (event_type) {
    case MATCH_EVENTS.GOAL:
    case MATCH_EVENTS.TRANSFER:
    case MATCH_EVENTS.MISSED_PENALTY:
    case MATCH_EVENTS.HIT_PENALTY:
    case MATCH_EVENTS.RED_CARD:
    case MATCH_EVENTS.YELLOW_CARD:
      return true
    default:
      return false
  }
}
const checkHasSecondName = (event_type) => {
  switch (event_type) {
    case MATCH_EVENTS.TRANSFER:
    case MATCH_EVENTS.GOAL:
      return true
    default:
      return false
  }
}

const checkIsHome = ({
  event,
  isTextOnly,
  hasSecondName,
  hasName,
  currentMatch,
}) => {
  if (isTextOnly) return true
  if (
    hasSecondName &&
    currentMatch?.home_club_id?.id === event.player_id?.club?.id &&
    currentMatch?.home_club_id?.id === event.second_player_id?.club?.id
  ) {
    return true
  }
  if (hasName && event.player_id?.club?.id === currentMatch?.home_club_id?.id) {
    return true
  }
  return false
}

export default memo(MatchEvent)
