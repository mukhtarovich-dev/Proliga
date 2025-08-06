'use client'

import JournalTable from './components/Table'
import { JournalSkeleton } from './loading'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserActivity } from 'lib/features/userActivity/userActivity.thunk'
import { useState, useEffect, useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { selectUser } from 'lib/features/auth/auth.selector'
import { Pagination } from 'components/Table/Pagination/Server'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { memo } from 'react'

function Journal() {
  const path = usePathname()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const { season } = useSelector((state) => state.season)
  const { isLoading, count } = useSelector((state) => state.userActivity)
  const currentTeam = useSelector(selectCurrentTeam)
  const [page, setPage] = useState(0)
  const perPage = 15
  const pages = useMemo(() => {
    return Math.ceil(count / perPage)
  }, [count, perPage])
  const competition_id = +path.split('/')[3] || 0

  useEffect(() => {
    if (competition_id && season?.id && currentTeam?.id) {
      dispatch(
        fetchUserActivity({
          competition_id,
          user_id: user?.id,
          team_id: currentTeam?.id,
          page,
          perPage,
        })
      )
    }
  }, [dispatch, competition_id, season, page, perPage, user?.id, currentTeam])

  if (isLoading)
    return <JournalSkeleton/>

  return (
    <>
      <JournalTable />
      <Pagination
        onPageChange={setPage}
        currentPage={page}
        totalPages={pages}
        className={'mt-auto pt-1'}
      />
    </>
  )
}

export default memo(Journal)
