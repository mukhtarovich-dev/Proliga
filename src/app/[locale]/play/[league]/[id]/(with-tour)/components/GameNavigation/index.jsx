'use client'

import {
  StyledTab,
  StyledTabs,
  GameTab,
  CustomBox,
} from 'components/StyledTabs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TOUR_STATUS } from 'utils/tour.util'
import { setCurrentTourIndex } from 'lib/features/tour/tour.slice'
import { setCurrentTourTeam } from 'lib/features/tourTeam/tourTeam.slice'
import {
  selectRegisteredTour,
  selectTours,
} from 'lib/features/tour/tour.selector'
import { emptyTeamPlayers } from 'lib/features/teamPlayer/teamPlayer.slice'
import { tabsClasses } from '@mui/material'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { useTransitionRouter } from 'next-view-transitions'
import { selectCurrentCompetition } from 'lib/features/competition/competition.selector'
import { TABS } from 'utils/tabs.util'
import { usePathname } from 'next/navigation'

export default function TourTabs() {
  const path = usePathname()
  const dispatch = useDispatch()
  const router = useTransitionRouter()
  const selectedTours = useSelector(selectTours)
  const currentCompetition = useSelector(selectCurrentCompetition)
  const { currentTourIndex } = useSelector((state) => state.tour)
  const registeredTour = useSelector(selectRegisteredTour)
  const currentTeam = useSelector(selectCurrentTeam)
  const [gameTab, setGameTab] = useState('')

  useEffect(() => {
    const pathLength = path.split('/').length

    if (path.includes('play') && pathLength === 6) {
      Object.keys(TABS).forEach((tab) => {
        if (path.includes(TABS[tab])) {
          setGameTab(TABS[tab])
        }
      })
    } else {
      setGameTab(TABS.GameProfile)
    }
  }, [path])

  const handleClick = (index, item) => {
    if (currentTourIndex !== index) {
      dispatch(emptyTeamPlayers())
    }
    if (
      gameTab === TABS.Transfer &&
      item.status !== TOUR_STATUS.notStartedTransfer
    ) {
      router.push(`/play/${currentCompetition?.id}/${currentTeam?.id}`)
    }
    dispatch(setCurrentTourTeam(index))
    dispatch(setCurrentTourIndex(index))
  }

  return (
    <CustomBox>
      <StyledTabs
        value={currentTourIndex}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        className="fade-in animate-in text-foreground disabled:text-muted-foreground m-0 snap-x snap-center rounded duration-500"
        aria-label="tour tabs"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.4 },
          },
        }}
      >
        {selectedTours?.map((item, index) => (
          <StyledTab
            key={item.id}
            onClick={() => handleClick(index, item)}
            className="m-0 w-32 space-y-0 disabled:cursor-default sm:w-40"
            disabled={
              currentTeam?.is_team_created
                ? item.status === TOUR_STATUS.notStarted ||
                  item.order < registeredTour?.order
                : item.status !== TOUR_STATUS.notStartedTransfer
            }
            label={<GameTab item={item} />}
          />
        ))}
      </StyledTabs>
    </CustomBox>
  )
}
