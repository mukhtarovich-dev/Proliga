'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { createColumnHelper } from '@tanstack/react-table'
import { selectPlayers } from 'lib/features/player/player.selector'
import { getCorrentPlayerPosition } from 'utils/getCorrectPlayerPosition.utils'
import Head from 'components/Table/Head'
import Body from 'components/Table/Body'
import { Table } from 'components/ui/table'
import StatisticsTableFilters from './components/Filters'
import TanStackPagination from 'components/Table/Pagination/Client'
import { getCorrectName } from 'utils/getCorrectName.util'

const columnHelper = createColumnHelper()

function StatisticsTable() {
  const { t } = useTranslation()
  const { lang } = useSelector((state) => state.systemLanguage)
  const players = useSelector(selectPlayers)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 15,
  })

  const columns = [
    columnHelper.accessor('player_id.position', {
      accessorFn: (row) => getCorrentPlayerPosition(row?.position, lang),
      id: 'player-position',
      header: t('POZ'),
      meta: {
        title: t('O‘yinchining pozitsiyasi'),
      },
    }),
    columnHelper.accessor('player_id.name', {
      accessorFn: (row) =>
        getCorrectName({ lang, uz: row?.name, ru: row?.name_ru }),
      header: t("O'yinchi ismi"),
      id: 'player-name',
      meta: {
        title: t("O'yinchini toliq ismi"),
        filterVariant: 'name',
      },
    }),
    columnHelper.accessor('club.name', {
      accessorFn: (row) =>
        getCorrectName({ lang, uz: row?.club?.name, ru: row?.club?.name_ru }),
      header: t('Klub'),
      filterFn: (row, columnId, filterValue) => {
        // Early return: show all if no filter or empty array
        if (
          !filterValue ||
          !Array.isArray(filterValue) ||
          filterValue.length === 0
        )
          return true
        // Compare by club id as string for robustness
        const clubId = String(row.original?.club?.id)
        return filterValue.includes(clubId)
      },
      meta: {
        filterVariant: 'club',
      },
    }),
    columnHelper.accessor('ochko', {
      accessorFn: (row) => row?.point,
      id: 'ochko',
      header: t('O'),
      meta: {
        title: t('Ochko'),
      },
    }),
    columnHelper.accessor((row) => row.goal, {
      accessorFn: (row) => row?.goal,
      id: 'gol',
      cell: (info) => info.getValue(),
      header: t('G') + ' ',
      meta: {
        title: t('Gol'),
      },
    }),
    columnHelper.accessor('GA', {
      accessorFn: (row) => row?.goal_asist,
      id: 'gol assist',
      header: t('GA'),
      meta: {
        title: t('Assist'),
      },
    }),
    columnHelper.accessor((row) => row?.missed_penalty, {
      accessorFn: (row) => row?.missed_penalty,
      id: 'returned penalty',
      header: t('QP'),
      meta: {
        title: t('Qaytarilgan penalti'),
      },
    }),
    columnHelper.accessor('yellow_card', {
      accessorFn: (row) => row?.yellow_card,
      id: 'Yellow Card',
      header: t('SK'),
      meta: {
        title: t('Sariq kartochka'),
      },
    }),
    columnHelper.accessor('red_card', {
      accessorFn: (row) => row?.red_card,
      id: 'Red Card',
      header: t('QZ'),
      meta: {
        title: t('Qizil kartochka'),
      },
    }),
    columnHelper.accessor((row) => row.played_min, {
      accessorFn: (row) => row?.played_min,
      id: 'played-min',
      header: t('MIN'),
      meta: {
        title: t('O‘ynagan vaqti'),
      },
    }),
  ]

  const table = useReactTable({
    columns,
    data: players || [],
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
      <section className="flex gap-1">
        {table
          .getHeaderGroups()
          .map((headerGroup) =>
            headerGroup.headers.map((header) => (
              <StatisticsTableFilters key={header.id} column={header.column} />
            ))
          )}
      </section>
      <Table className="text-2xs text-foreground xs:text-xs min-w-88 md:text-sm">
        <Head table={table} />
        <Body table={table} flexRender={flexRender} />
      </Table>
      <TanStackPagination
        table={table}
        active="bg-muted text-muted-foreground"
        className={'mt-auto'}
      />
    </>
  )
}

export default StatisticsTable
