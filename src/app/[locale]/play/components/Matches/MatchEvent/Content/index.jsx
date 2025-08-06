import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectMatchEvents } from 'lib/features/matchEvent/matchEvent.selector'
import MatchEvent from './Event'
import MatchEventSkeleton from './Skeleton'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { MATCH_STATUS } from 'utils/match.util'
import { selectCurrentMatch } from 'lib/features/match/match.selector'

const MatchEventContent = () => {
  const { t } = useTranslation()
  const events = useSelector(selectMatchEvents)
  const currentMatch = useSelector(selectCurrentMatch)
  const { isLoading } = useSelector((store) => store.matchEvent)

  if (isLoading) {
    return <MatchEventSkeleton />
  }

  return (
    <motion.section className="relative flex h-full max-h-[calc(90vh-300px)] flex-col gap-4 overflow-y-auto px-4 py-4">
      {/* Center line */}
      <span
        style={{
          height: events?.length ? `${events?.length * 3.6 || 0}rem` : '100%',
        }}
        className="bg-muted-foreground absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 transform"
      />
      {events?.length > 0 ? (
        events.map((event, index) => (
          <MatchEvent key={index} index={index} event={event} />
        ))
      ) : (
        <div className="bg-background text-foreground shadow-border z-10 rounded-sm px-3 py-1.5 text-center text-sm shadow-sm">
          {currentMatch?.status === MATCH_STATUS.NOT_STARTED
            ? t("The match hasn't started yet. Stay tuned for updates!")
            : t(
                'No match events are currently available. Please stay tuned as they will be updated soon!'
              )}
        </div>
      )}
    </motion.section>
  )
}

export default memo(MatchEventContent)
