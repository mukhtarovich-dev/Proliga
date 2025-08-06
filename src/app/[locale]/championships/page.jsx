'use client'

const Championship = dynamic(() => import('./components/Championship'), {
  ssr: false,
  loading: () => <ChampionshipSkeleton />,
})
const ChampionshipsTitle = dynamic(() => import('./components/Title'), {
  ssr: false,
  loading: () => <Skeleton className="mb-6 h-7 w-48" />,
})
import dynamic from 'next/dynamic'
import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserTeams } from 'lib/features/team/team.thunk'
import { fetchCompetition } from 'lib/features/competition/competition.thunk'
import { selectCompetition } from 'lib/features/competition/competition.selector'
import { fetchSeason } from 'lib/features/season/season.thunk'
import { ChampionshipSkeleton } from './components/Skeleton'
import { Skeleton } from 'components/ui/skeleton'
import { selectUser } from 'lib/features/auth/auth.selector'

const Championships = () => {
  const dispatch = useDispatch()
  const competitions = useSelector(selectCompetition)
  const { isLoading: competitionLoading } = useSelector(
    (state) => state.competition
  )
  const user = useSelector(selectUser)
  const { season, isLoading: seasonLoading } = useSelector(
    (state) => state.season
  )
  const { isLoading: teamsLoading } = useSelector((state) => state.team)

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
    if (user?.id && season?.id) {
      dispatch(
        fetchUserTeams({
          user_id: user.id,
          season_id: season.id,
        })
      )
    }
  }, [dispatch, user?.id, season?.id])

  const isLoading = useMemo(
    () => competitionLoading || seasonLoading || teamsLoading,
    [competitionLoading, seasonLoading, teamsLoading]
  )

  return (
    <>
      {isLoading ? (
        <Skeleton className="mb-6 h-7 w-48" />
      ) : (
        <ChampionshipsTitle />
      )}
      <section className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {isLoading
          ? [...Array(4)].map((_, index) => (
              <ChampionshipSkeleton key={index} />
            ))
          : competitions.map((game, index) => (
              <Championship key={index} game={game} />
            ))}
      </section>
    </>
  )
}

export default Championships
