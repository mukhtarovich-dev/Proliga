'use client'

import { useSelector } from 'react-redux'
import { useState, useEffect, useMemo } from 'react'
import { fetchAllTeams } from 'lib/features/team/team.thunk'
import { useDispatch } from 'react-redux'
import { Pagination } from 'components/Table/Pagination/Server'
import {
  selectCurrentTour,
  selectTours,
} from 'lib/features/tour/tour.selector'
import { selectAllTeams } from 'lib/features/team/team.selector'
import { selectCurrentTourTeam } from 'lib/features/tourTeam/tourTeam.selector'
import { selectCurrentCompetition } from 'lib/features/competition/competition.selector'
import TournamentTable from './components/Table'
import TeamFilter from './components/Filters/Team'
import TourFilter from './components/Filters/Tour'
import { searchAllTeams } from 'lib/features/team/team.thunk'
import { memo } from 'react'
import TournamentTableSkeleton from './loading'

const Tournament = () => {
  const dispatch = useDispatch()
  const { teamsLoading, teamsCount } = useSelector((store) => store.team)
  const { season, isLoading: seasonLoading } = useSelector(
    (state) => state.season
  )
  const tours = useSelector(selectTours)
  const allTeams = useSelector(selectAllTeams)
  const { isLoading: tourLoading } = useSelector((state) => state.tour)
  const currentCompetition = useSelector(selectCurrentCompetition)
  const currentTour = useSelector(selectCurrentTour)
  const currentTourTeam = useSelector(selectCurrentTourTeam)

  const { isLoading: competitionLoading } = useSelector(
    (store) => store.competition
  )
  const [tour, setTour] = useState(currentTour?.id || 0)
  const [page, setPage] = useState(0)
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const registeredTour = useMemo(
    () => tours.find((t) => t.id === currentTourTeam?.tour_id),
    [tours, currentTourTeam?.tour_id]
  )
  const curTour = useMemo(() => tours.find((t) => t.id === tour), [tour, tours])
  const curTourTeam = useMemo(
    () =>
      Boolean(
        allTeams.find((team) => team?.team?.id === currentTourTeam?.team?.id)
      ),
    [allTeams, currentTourTeam]
  )

  const toursCondition = useMemo(
    () => registeredTour?.order <= curTour?.order,
    [curTour?.order, registeredTour?.order]
  )

  const showUserTourTeam =
    !curTourTeam && toursCondition && allTeams?.length !== 0

  const perPage = 15
  const pages = useMemo(
    () => Math.ceil(teamsCount / perPage),
    [teamsCount, perPage]
  )

  const isLoading = useMemo(
    () => teamsLoading || tourLoading || competitionLoading || seasonLoading,
    [teamsLoading, tourLoading, competitionLoading, seasonLoading]
  )

  useEffect(() => {
    if (currentCompetition?.id && season?.id && tour) {
      if (isSearchMode) {
        dispatch(
          searchAllTeams({
            season_id: season.id,
            competition_id: currentCompetition.id,
            page,
            perPage,
            tour_id: tour,
            searchTerm,
          })
        )
      } else {
        dispatch(
          fetchAllTeams({
            team_count: currentCompetition?.team_count,
            competition_id: currentCompetition.id,
            season_id: season.id,
            tour_id: tour,
            perPage,
            page,
          })
        )
      }
    }
  }, [
    dispatch,
    season,
    page,
    perPage,
    tour,
    currentCompetition,
    isSearchMode,
    searchTerm,
  ])

  return (
    <>
      <div className="flex w-full items-center gap-1">
        <TeamFilter
          page={page}
          perPage={perPage}
          tour_id={tour}
          setPage={setPage}
          setIsSearchMode={setIsSearchMode}
          setSearchTerm={setSearchTerm}
        />
        <TourFilter setTour={setTour} tour={tour} />
      </div>
      {isLoading ? (
        <TournamentTableSkeleton paginationCount={5} rows={10} />
      ) : (
        <>
          <TournamentTable showUserTourTeam={showUserTourTeam} />
          <Pagination
            onPageChange={setPage}
            currentPage={page}
            totalPages={pages || 100}
            className={'mt-auto'}
            buttonClassName="text-xs"
          />
        </>
      )}
    </>
  )
}

export default memo(Tournament)
