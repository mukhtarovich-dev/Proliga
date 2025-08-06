'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react'
import { Button } from 'components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select'
import { fetchMatches } from 'lib/features/match/match.thunk'
import Match from './Match'
import MatchSkeleton from './Match/Skeleton'
import MatchEvent from './MatchEvent'
import { Pagination } from 'components/Table/Pagination/Server'
import { getCorrectName } from 'utils/getCorrectName.util'
import { selectMatches } from 'lib/features/match/match.selector'
import { selectTours } from 'lib/features/tour/tour.selector'
import { usePathname } from 'next/navigation'
import { Card, CardContent, CardHeader, CardFooter } from 'components/ui/card'

const Matches = () => {
  const path = usePathname()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { currentTourIndex, isLoading: toursLoading } = useSelector(
    (state) => state.tour
  )
  const { isLoading: teamLoading } = useSelector((store) => store.currentTeam)
  const tours = useSelector(selectTours)
  const { season } = useSelector((store) => store.season)
  const { isLoading, count } = useSelector((state) => state.match)
  const matches = useSelector(selectMatches)
  const { lang } = useSelector((store) => store.systemLanguage)
  const [tourIndex, setTourIndex] = useState(currentTourIndex || 0)
  const [currentTour, setCurrentTour] = useState(
    tours[currentTourIndex] || null
  )
  const [page, setPage] = useState(0)
  const perPage = 10
  const pages = useMemo(() => Math.ceil(count / perPage), [count, perPage])
  const competition_id = +path.split('/')[3] || 0

  const handleChangeTour = (value) => {
    const newIndex = tours.findIndex((tour) => tour.id === value)
    if (newIndex !== -1) {
      setTourIndex(newIndex)
      setCurrentTour(tours[newIndex])
    }
  }

  const handleIncrementTourIndex = () => {
    if (tourIndex < tours.length - 1) {
      setTourIndex(tourIndex + 1)
      setCurrentTour(tours[tourIndex + 1])
    }
  }

  const handleDecrementTourIndex = () => {
    if (tourIndex > 0) {
      setTourIndex(tourIndex - 1)
      setCurrentTour(tours[tourIndex - 1])
    }
  }

  const refreshData = useCallback(() => {
    if (season?.id && competition_id && currentTour?.id) {
      dispatch(
        fetchMatches({
          season_id: season?.id,
          competition_id,
          tour_id: currentTour?.id,
          page,
          perPage,
        })
      )
    }
  }, [dispatch, season?.id, competition_id, currentTour?.id, page, perPage])

  useEffect(() => {
    if (currentTourIndex > -1) {
      setCurrentTour(tours[currentTourIndex])
      setTourIndex(currentTourIndex)
    }
  }, [tours, currentTourIndex])

  useEffect(() => {
    if (
      season?.id &&
      competition_id &&
      currentTour?.id &&
      !toursLoading &&
      !teamLoading
    ) {
      dispatch(
        fetchMatches({
          season_id: season?.id,
          competition_id,
          tour_id: currentTour?.id,
          page,
          perPage,
        })
      )
    }
  }, [
    competition_id,
    currentTour?.id,
    season?.id,
    page,
    dispatch,
    teamLoading,
    toursLoading,
  ])

  return (
    <Card className="border-border relative mx-auto h-172 w-full max-w-lg justify-between lg:mx-0 lg:min-w-72 2xl:max-w-lg">
      <CardHeader className="flex w-full items-center gap-0 justify-center">
        <div className="mx-auto ml-9 flex flex-1 items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-border size-9"
            onClick={handleDecrementTourIndex}
            disabled={tourIndex === 0}
          >
            <ChevronLeft className="text-foreground size-5" />
          </Button>
          <Select
            value={currentTour?.id || ''}
            onValueChange={handleChangeTour}
            defaultValue=""
          >
            <SelectTrigger
              showIcon={false}
              className="border-muted h-9 w-24 rounded-xs border-2 border-x-0 border-t-0 text-center text-base ring-0 ring-offset-0 outline-hidden hover:outline-hidden justify-center items-center placeholder:text-center"
            >
              <SelectValue placeholder={t('Tur')} />
            </SelectTrigger>
            <SelectContent align="center">
              {tours.map((tour) => (
                <SelectItem key={tour.id} value={tour.id}>
                  {getCorrectName({
                    lang,
                    uz: tour?.name,
                    ru: tour?.name_ru,
                  })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            className="border-muted size-9"
            onClick={handleIncrementTourIndex}
            disabled={tourIndex === tours.length - 1}
          >
            <ChevronRight className="text-foreground size-5" />
          </Button>
        </div>
        <Button
          onClick={refreshData}
          disabled={isLoading}
          variant="outline"
          size="icon"
          className="border-muted size-9"
        >
          <RefreshCcw className="text-foreground size-5" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 space-y-1">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <MatchSkeleton key={index} />
          ))
        ) : matches?.length === 0 ? (
          <p className="text-muted-foreground text-center">
            {t('Matchlar topilmadi!')}
          </p>
        ) : (
          matches?.map((match, index) => <Match key={index} match={match} />)
        )}
      </CardContent>
      <CardFooter>
        <Pagination
          onPageChange={setPage}
          currentPage={page}
          totalPages={pages}
          className={'w-full'}
        />
      </CardFooter>
      <MatchEvent />
    </Card>
  )
}

export default Matches
