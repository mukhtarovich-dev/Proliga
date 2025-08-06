'use client'

import { selectCurrentCompetition } from 'lib/features/competition/competition.selector'
import { resetSearchResults } from 'lib/features/team/team.slice'
import { searchAllTeams } from 'lib/features/team/team.thunk'
import { useState, useCallback, useEffect, useRef, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Input } from 'components/ui/input'
import { Search } from 'lucide-react'
import debounce from 'lodash/debounce'
import { DEBOUNCE_TIMING } from 'utils/config.global'

const TeamFilter = memo(
  ({ page, perPage, tour_id, setPage, setIsSearchMode, setSearchTerm }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [localSearchTerm, setLocalSearchTerm] = useState('')
    const { season } = useSelector((state) => state.season)
    const { teamsLoading } = useSelector((state) => state.team)
    const currentCompetition = useSelector(selectCurrentCompetition)
    const debouncedSearchRef = useRef(null)

    const performSearch = useCallback(
      (term) => {
        if (season?.id && currentCompetition?.id && page >= 0) {
          setIsSearchMode(!!term)
          setSearchTerm(term)
          if (term) {
            dispatch(
              searchAllTeams({
                season_id: season.id,
                competition_id: currentCompetition?.id,
                page,
                perPage,
                tour_id,
                searchTerm: term,
              })
            )
          } else {
            dispatch(resetSearchResults())
          }
        }
      },
      [
        dispatch,
        season,
        currentCompetition,
        page,
        perPage,
        tour_id,
        setIsSearchMode,
        setSearchTerm,
      ]
    )

    useEffect(() => {
      const debouncedSearch = debounce(performSearch, DEBOUNCE_TIMING)
      debouncedSearchRef.current = debouncedSearch

      return () => {
        if (debouncedSearchRef.current) {
          debouncedSearchRef.current.cancel()
        }
      }
    }, [performSearch])

    useEffect(() => {
      if (debouncedSearchRef.current) {
        debouncedSearchRef.current(localSearchTerm)
      }
    }, [localSearchTerm])

    const handleSearchChange = useCallback(
      (e) => {
        setLocalSearchTerm(e.target.value)
        setPage(0)
      },
      [setPage]
    )

    useEffect(() => {
      return () => {
        dispatch(resetSearchResults())
      }
    }, [dispatch])

    return (
      <div className="relative w-full max-w-64">
        <Input
          aria-label="team search"
          id="team-search"
          placeholder={t('Enter team name...')}
          value={localSearchTerm}
          onChange={handleSearchChange}
          className="border-border h-8 w-full rounded pr-7 pl-2 text-sm"
          disabled={teamsLoading}
        />
        <Search className="xs:block text-muted-foreground absolute top-1/2 right-2 hidden size-5 -translate-y-1/2" />
      </div>
    )
  }
)

TeamFilter.displayName = 'TeamFilter'

export default TeamFilter
