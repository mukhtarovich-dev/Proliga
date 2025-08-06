'use client'

import TeamProfile from '../../components/TeamProfile'
import TeamTabs from '../../components/GameNavigation'
import { useEffect, useMemo } from 'react'
import { TOUR_STATUS } from 'utils/tour.util'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSeason } from 'lib/features/season/season.thunk'
import { fetchBanners } from 'lib/features/banner/banner.thunk'
import { fetchTeamViewTours } from 'lib/features/tour/tour.thunk'
import { fetchTourTeams } from 'lib/features/tourTeam/tourTeam.thunk'
import { emptyTeamPlayers } from 'lib/features/teamPlayer/teamPlayer.slice'
import { fetchTeamPlayers } from 'lib/features/teamPlayer/teamPlayer.thunk'
import { fetchPlayerPoint } from 'lib/features/playerPoint/playerPoint.thunk'
import { fetchCompetition } from 'lib/features/competition/competition.thunk'
import { fetchSelectedTeam } from 'lib/features/currentTeam/currentTeam.thunk'
import { selectTeamConcat } from 'lib/features/teamPlayer/teamPlayer.selector'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { selectCompetition } from 'lib/features/competition/competition.selector'
import { setCurrentCompetition } from 'lib/features/competition/competition.slice'
import { selectCurrentTour } from 'lib/features/tour/tour.selector'
import { selectBanners } from 'lib/features/banner/banner.selector'
import Spinner from 'components/Spinner'
import { use } from 'react'

const TeamView = ({ params }) => {
  const { id, league } = use(params)
  const dispatch = useDispatch()
  const currentTeam = useSelector(selectCurrentTeam)
  const competitions = useSelector(selectCompetition)
  const currentTour = useSelector(selectCurrentTour)
  const teamConcat = useSelector(selectTeamConcat)
  const { season, isLoading: seasonLoading } = useSelector(
    (store) => store.season
  )
  const banners = useSelector(selectBanners)
  const { isLoading: toursLoading } = useSelector((state) => state.tour)
  const { isLoading: bannersLoading } = useSelector((store) => store.banner)
  const { isLoading: teamLoading } = useSelector((state) => state.currentTeam)
  const { isLoading: competitionsLoading } = useSelector(
    (state) => state.competition
  )

  const isLoading = useMemo(
    () =>
      toursLoading ||
      teamLoading ||
      competitionsLoading ||
      seasonLoading ||
      bannersLoading,
    [
      toursLoading,
      teamLoading,
      competitionsLoading,
      seasonLoading,
      bannersLoading,
    ]
  )

  useEffect(() => {
    if (competitions?.length === 0) {
      dispatch(fetchCompetition())
    }
  }, [dispatch, competitions?.length])

  useEffect(() => {
    if (!season?.id) {
      dispatch(fetchSeason())
    }
  }, [dispatch, season?.id])

  useEffect(() => {
    if (banners?.length === 0) {
      dispatch(fetchBanners())
    }
  }, [dispatch, banners?.length])

  useEffect(() => {
    if (id) {
      dispatch(fetchSelectedTeam({ id }))
    }
  }, [dispatch, id])

  useEffect(() => {
    if (league && currentTeam?.registered_tour_id) {
      dispatch(
        fetchTeamViewTours({
          competition_id: league,
          registered_tour_id: currentTeam?.registered_tour_id,
        })
      )
    }
  }, [currentTeam, dispatch, league, currentTeam?.registered_tour_id])

  useEffect(() => {
    if (
      id &&
      league &&
      currentTour?.id &&
      currentTour?.status !== TOUR_STATUS.notStartedTransfer
    ) {
      dispatch(
        fetchTeamPlayers({
          team_id: id,
          competition_id: league,
          tour_id: currentTour.id,
        })
      )
    }
  }, [id, league, currentTour, dispatch])

  useEffect(() => {
    if (currentTour?.id && league && teamConcat?.length > 0) {
      dispatch(
        fetchPlayerPoint({
          competition_id: league,
          tour_id: currentTour.id,
          teamConcat: teamConcat,
        })
      )
    }
  }, [teamConcat, dispatch, currentTour?.id, league])

  useEffect(() => {
    if (competitions?.length > 0 && league) {
      dispatch(setCurrentCompetition(league))
    }
  }, [dispatch, league, competitions?.length])

  useEffect(() => {
    if (id && currentTour?.id) {
      dispatch(
        fetchTourTeams({
          team_id: id,
          currentTour,
        })
      )
    }
  }, [id, dispatch, currentTour])

  useEffect(() => {
    if (currentTour?.status === TOUR_STATUS.notStartedTransfer) {
      dispatch(emptyTeamPlayers())
    }
  }, [dispatch, currentTour?.status])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <section className="flex flex-col gap-4 overflow-hidden pt-4">
      <TeamTabs />
      <TeamProfile />
    </section>
  )
}

export default TeamView
