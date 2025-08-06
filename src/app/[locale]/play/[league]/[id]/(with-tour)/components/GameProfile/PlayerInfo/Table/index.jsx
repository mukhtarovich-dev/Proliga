'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Table } from 'components/ui/table'
// import Head from './Head'
// import Body from './Body'
import Head from 'components/Table/Head'
import Body from 'components/Table/Body'
import TanStackPagination from 'components/Table/Pagination/Client'
import { createColumnHelper } from '@tanstack/react-table'
import { selectClubs } from 'lib/features/club/club.selector'
import { selectCurrentPlayer } from 'lib/features/player/player.selector'
import { getCorrectName } from 'utils/getCorrectName.util'

const columnHelper = createColumnHelper()

function PlayerStatisticsTable({ matches }) {
  const { t } = useTranslation()
  const { lang } = useSelector((store) => store.systemLanguage)
  const clubs = useSelector(selectClubs)
  const currentPlayer = useSelector(selectCurrentPlayer)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const getClubInfoById = (id) => {
    return clubs.find((c) => c.id === id)
  }

  const getCorrectCompetitor = (match) => {
    if (match.home_club_id === currentPlayer?.club?.id) {
      return getCorrectName({
        lang,
        ru: getClubInfoById(match.away_club_id)?.name_ru,
        uz: getClubInfoById(match.away_club_id)?.name,
      })
    } else if (match.away_club_id === currentPlayer?.club?.id) {
      return getCorrectName({
        lang,
        uz: getClubInfoById(match.home_club_id)?.name,
        ru: getClubInfoById(match.home_club_id)?.name_ru,
      })
    }
  }

  const getCorrectScore = (match) => {
    if (match.home_club_id === currentPlayer?.club?.id) {
      return `${match.home_club_result ?? 0} : ${match.away_club_result ?? 0}`
    } else if (match.away_club_id === currentPlayer?.club?.id) {
      return `${match.away_club_result ?? 0} : ${match.home_club_result ?? 0}`
    }
  }

  const columns = [
    columnHelper.accessor('', {
      accessorFn: (row) =>
        getCorrectName({
          lang,
          uz: row?.tour_id?.name,
          ru: row?.tour_id?.name_ru,
        }),
      id: 'sana',
      header: t('Tur'),
    }),
    columnHelper.accessor('Competititor', {
      accessorFn: (row) => getCorrectCompetitor(row.match_id),
      header: t('Raqib'),
      id: 'competitor',
    }),
    columnHelper.accessor('Score', {
      accessorFn: (row) => getCorrectScore(row.match_id) ?? '0 : 0',
      header: t('Hisob'),
      id: 'score',
    }),
    columnHelper.accessor('Quriq Oyin', {
      accessorFn: (row) =>
        row?.player_result_id?.is_shutout ? t('Ha') : t('Yoq'),
      header: t('QO’'),
      id: 'QO’',
      meta: {
        title: 'quriq oyin',
      },
    }),
    columnHelper.accessor('Qaytarilagian Penalti', {
      accessorFn: (row) => row?.player_result_id?.blocked_penalty ?? 0,
      header: t('QP'),
      id: 'QP',
    }),
    columnHelper.accessor('Avto Gol', {
      accessorFn: (row) => row?.player_result_id?.autogoal ?? 0,
      header: t('AG'),
      id: 'AG',
    }),
    columnHelper.accessor('Otkazib yuborilgan har 2 top farqi', {
      accessorFn: (row) => row?.player_result_id?.every_2_missed_goals ?? 0,
      header: t('O’2'),
      id: 'O’2',
    }),
    columnHelper.accessor('G', {
      accessorFn: (row) => row?.player_result_id?.goal ?? 0,
      id: 'gol',
      cell: (info) => info.getValue(),
      header: t('G'),
    }),
    columnHelper.accessor('GA', {
      accessorFn: (row) => row?.player_result_id?.goal_asist ?? 0,
      id: 'gol assist',
      cell: (info) => info.getValue(),
      header: t('GA'),
    }),
    columnHelper.accessor('Yellow Card', {
      accessorFn: (row) => row?.player_result_id?.yellow_card ?? 0,
      id: 'Yellow Card',
      header: t('SK'),
    }),
    columnHelper.accessor('Red Card', {
      accessorFn: (row) => (row?.player_result_id?.is_red_card ? 1 : 0),
      id: 'Red Card',
      cell: (info) => info.getValue(),
      header: t('QZ'),
    }),
    columnHelper.accessor('Played min', {
      accessorFn: (row) => row?.player_result_id?.played_min ?? '00',
      id: 'played-min',
      cell: (info) => info.getValue(),
      header: t('MIN'),
    }),
    columnHelper.accessor('ochko', {
      accessorFn: (row) => row?.point ?? 0,
      id: 'ochko',
      cell: (info) => info.getValue(),
      header: t('O'),
    }),
  ]

  const table = useReactTable({
    columns,
    data: matches || [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  return (
    <>
      <Table className="text-3xs xs:text-3xs text-foreground h-full w-full min-w-80 table-auto md:text-xs xl:text-sm">
        <Head
          table={table}
          className={'text-3xs sm:text-2xs lg:text-xs xl:text-sm'}
        />
        <Body table={table} flexRender={flexRender} />
      </Table>
      {matches?.length > 9 && <TanStackPagination table={table} />}
    </>
  )
}

export default PlayerStatisticsTable
