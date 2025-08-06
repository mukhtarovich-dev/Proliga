import {
  StyledTab,
  StyledTabs,
  GameTab,
  CustomBox,
} from 'components/StyledTabs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TOUR_STATUS } from 'utils/tour.util'
import { setCurrentTourIndex } from 'lib/features/tour/tour.slice'
import { setCurrentTourTeam } from 'lib/features/tourTeam/tourTeam.slice'
import {
  selectCurrentTour,
  selectRegisteredTour,
  selectTours,
} from 'lib/features/tour/tour.selector'
import { emptyTeamPlayers } from 'lib/features/teamPlayer/teamPlayer.slice'
import { tabsClasses } from '@mui/material'
import {
  selectCurrentTourTeam,
  selectTourTeams,
} from 'lib/features/tourTeam/tourTeam.selector'

export default function TourTabs() {
  const dispatch = useDispatch()
  const { currentTourIndex } = useSelector((store) => store.tour)
  const registeredTour = useSelector(selectRegisteredTour)
  const currentTourTeam = useSelector(selectCurrentTourTeam)
  const currentTour = useSelector(selectCurrentTour)
  const tourTeams = useSelector(selectTourTeams)
  const tours = useSelector(selectTours)

  useEffect(() => {
    if (selectTours?.length > 0 && tourTeams?.length > 0) {
      if (currentTour?.id !== currentTourTeam?.tour_id) {
        dispatch(setCurrentTourTeam(currentTour))
      }
    }
  }, [dispatch, currentTourIndex, currentTourTeam, tourTeams, currentTour])

  const handleClick = (index, item) => {
    if (currentTourIndex !== index) {
      dispatch(emptyTeamPlayers())
    }
    dispatch(setCurrentTourTeam(item))
    dispatch(setCurrentTourIndex(index))
  }

  return (
    <CustomBox>
      <StyledTabs
        value={currentTourIndex}
        variant="scrollable"
        scrollButtons="auto"
        className="text-foreground disabled:text-muted-foreground roundeds snap-x snap-center"
        aria-label="tour tabs"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.4 },
          },
        }}
      >
        {tours?.map((item, index) => (
          <StyledTab
            key={item.id}
            onClick={() => handleClick(index, item)}
            className="w-32 snap-center space-y-0 disabled:cursor-default sm:w-48"
            disabled={
              item.status === TOUR_STATUS.notStarted ||
              item.status === TOUR_STATUS.notStartedTransfer ||
              item.order < registeredTour?.order
            }
            label={<GameTab item={item} />}
          />
        ))}
      </StyledTabs>
    </CustomBox>
  )
}
