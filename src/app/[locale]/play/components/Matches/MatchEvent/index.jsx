'use client'

import { Dialog, DialogContent } from 'components/ui/dialog'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useDispatch, useSelector } from 'react-redux'
import { setMatchModalOpen } from 'lib/features/match/match.slice'
import { selectCurrentMatch } from 'lib/features/match/match.selector'
import MatchEventHeader from './Header'
import MatchEventScore from './Score'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCcw } from 'lucide-react'
import { refreshButtonVariants } from './animations.styles'
import { useEffect } from 'react'
import { fetchMatchEvents } from 'lib/features/matchEvent/matchEvent.thunk'
import MatchEventContent from './Content'
import { memo } from 'react'

function MatchEventModal() {
  const dispatch = useDispatch()
  const { isModalOpen } = useSelector((store) => store.match)
  const currentMatch = useSelector(selectCurrentMatch)

  const setModalOpen = () => {
    dispatch(setMatchModalOpen(false))
  }

  useEffect(() => {
    if (isModalOpen && currentMatch?.id) {
      dispatch(fetchMatchEvents({ match_id: currentMatch?.id }))
    }
  }, [dispatch, isModalOpen, currentMatch])

  const handleRefresh = () => {
    if (isModalOpen && currentMatch?.id) {
      dispatch(fetchMatchEvents({ match_id: currentMatch?.id }))
    }
  }

  return (
    <Dialog open={isModalOpen && currentMatch?.id} onOpenChange={setModalOpen}>
      <DialogContent className="text-foreground border-muted-foreground from-sidebar via-sidebar to-sidebar flex h-[75vh] w-[98%] max-w-2xl flex-col gap-0 rounded-xl border bg-linear-to-b p-0">
        <MatchEventHeader
          started_date={currentMatch?.started_date}
          finished_date={currentMatch?.finished_date}
        />
        <DialogDescription className="hidden"></DialogDescription>
        <MatchEventScore />
        <MatchEventContent />
        <AnimatePresence>
          {isModalOpen && (
            <motion.button
              className="shadow-border bg-secondary absolute right-6 bottom-4 rounded-full p-2 shadow-sm"
              variants={refreshButtonVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="hover"
              whileTap="tap"
              onClick={handleRefresh}
            >
              <RefreshCcw className="text-foreground size-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

export default memo(MatchEventModal)
