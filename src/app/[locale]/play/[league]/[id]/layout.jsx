'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCompetition } from 'lib/features/competition/competition.thunk'
import { fetchSeason } from 'lib/features/season/season.thunk'
import { fetchPackages } from 'lib/features/package/package.thunk'
import { fetchBanners } from 'lib/features/banner/banner.thunk'
import { fetchClubs } from 'lib/features/club/club.thunk'
import { fetchPlayers } from 'lib/features/player/player.thunk'
import Image from 'next/image'
import ModalBanner from 'shared/Banners/Modal'
import { fetchTopPlayers } from 'lib/features/player/player.thunk'
import { fetchAdditionalPlayers } from 'lib/features/player/player.thunk'
import {
  selectCompetition,
  selectCurrentCompetition,
} from 'lib/features/competition/competition.selector'
import { fetchTopTeams } from 'lib/features/team/team.thunk'
import { selectUser } from 'lib/features/auth/auth.selector'
import { fetchCurrentTeam } from 'lib/features/currentTeam/currentTeam.thunk'
import { setLastVisitedTeam } from 'lib/features/currentTeam/currentTeam.slice'
import { setCurrentCompetition } from 'lib/features/competition/competition.slice'
import { fetchTours } from 'lib/features/tour/tour.thunk'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { usePathname } from 'next/navigation'
import Spinner from 'components/Spinner'
import { fetchTeamPackages } from 'lib/features/payExpense/payExpense.thunk'

export default function PlayLayout({ children }) {
  const path = usePathname()
  const [isModalOpen, setModalOpen] = useState(false)
  const { league, id } = useParams()
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const { count: playersCount, isLoading: isLoadingPlayer } = useSelector(
    (store) => store.player
  )
  const countOfPlayers = useMemo(
    () => [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000],
    []
  )
  const currentCompetition = useSelector(selectCurrentCompetition)
  const competitions = useSelector(selectCompetition)
  const currentTeam = useSelector(selectCurrentTeam)
  const { isLoading: isLoadingTeam } = useSelector((state) => state.team)
  const { isLoading: isLoadingTour } = useSelector((state) => state.tour)
  const { isLoading: isLoadingPackages } = useSelector((state) => state.package)
  const { isLoading: isLoadingBanners } = useSelector((state) => state.banner)
  const { isLoading: isLoadingSeason } = useSelector((state) => state.season)
  const { isLoading: isLoadingCompetition } = useSelector(
    (state) => state.competition
  )
  const { isLoading: isLoadingNews } = useSelector((state) => state.news)
  const { isLoading: isLoadingClub } = useSelector((state) => state.club)

  const isLoading =
    isLoadingPlayer ||
    isLoadingTeam ||
    isLoadingTour ||
    isLoadingPackages ||
    isLoadingBanners ||
    isLoadingSeason ||
    isLoadingCompetition ||
    isLoadingNews ||
    isLoadingClub

  useEffect(() => {
    dispatch(fetchCompetition())
    dispatch(fetchSeason())
    dispatch(fetchPackages())
    dispatch(fetchBanners())
  }, [dispatch])

  useEffect(() => {
    if (league) {
      Promise.all([
        dispatch(fetchClubs({ competition_id: league })),
        dispatch(
          fetchPlayers({
            competition_id: league,
          })
        ),
      ])
    }
  }, [dispatch, league])

  useEffect(() => {
    if (league && playersCount > 0) {
      dispatch(
        fetchTopPlayers({
          competition_id: league,
        })
      )
      countOfPlayers.map((pCount) => {
        if (playersCount > pCount) {
          dispatch(
            fetchAdditionalPlayers({
              competition_id: league,
              page: Math.ceil(pCount / 1000),
            })
          )
        }
      })
    }
  }, [dispatch, league, countOfPlayers, playersCount])

  useEffect(() => {
    if (currentCompetition?.id) {
      dispatch(
        fetchTopTeams({
          competition_id: currentCompetition?.id,
        })
      )
    }
  }, [currentCompetition?.id, dispatch])

  useEffect(() => {
    if (user?.id && id && league) {
      dispatch(fetchCurrentTeam({ id, user_id: user?.id }))
      if (path.includes('play')) {
        dispatch(setLastVisitedTeam(`${league}/${id}`))
      }
    }
  }, [id, league, dispatch, user?.id, path])

  useEffect(() => {
    if (user?.id && currentTeam?.id) {
      dispatch(fetchTeamPackages({ user_id: user.id, team_id: currentTeam.id }))
    }
  }, [currentTeam?.id, user?.id, dispatch])

  useEffect(() => {
    if (competitions?.length > 0 && league) {
      dispatch(setCurrentCompetition(league))
    }
  }, [dispatch, league, competitions?.length])

  useEffect(() => {
    if (league && currentTeam?.registered_tour_id) {
      dispatch(
        fetchTours({
          competition_id: league,
          registered_tour_id: currentTeam?.registered_tour_id,
        })
      )
    }
  }, [league, dispatch, currentTeam?.registered_tour_id])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <main className="text-foreground bg-background relative flex min-h-[80vh] flex-col gap-4 overflow-hidden pt-18 pb-2 2xl:min-h-[80vh]">
      <div aria-hidden="true" className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/images/Hero.webp"
          alt="Hero background"
          fill
          priority
          className="animate-in fade-in object-cover duration-500"
          quality={100}
        />
        <div className="animate-in fade-in absolute inset-0 bg-black/30 duration-500 dark:bg-black/60" />
      </div>
      {children}
      <ModalBanner isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    </main>
  )
}
