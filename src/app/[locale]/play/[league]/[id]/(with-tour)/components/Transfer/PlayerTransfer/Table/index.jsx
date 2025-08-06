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
import {
  selectCurrentPlayer,
  selectPlayers,
} from 'lib/features/player/player.selector'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import Body from 'components/Table/Body'
import TransferTableFilters from './Filters'
import TanStackPagination from 'components/Table/Pagination/Client'
import { getCorrentPlayerPosition } from 'utils/getCorrectPlayerPosition.utils'
import { getCorrectName } from 'utils/getCorrectName.util'
import { useDispatch } from 'react-redux'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { selectSystemConfig } from 'lib/features/systemConfig/systemConfig.selector'
import { CONFIG_KEY } from 'utils/config.util'
import { swapTeamPlayer } from 'lib/features/teamPlayer/teamPlayer.slice'
import SwapPlayerButton from './SwapPlayerButton'
import Head from 'components/Table/Head'
import { Table } from 'components/ui/table'
const columnHelper = createColumnHelper()

function PlayerTable() {
  const { t } = useTranslation()
  const { lang } = useSelector((state) => state.systemLanguage)
  const players = useSelector(selectPlayers)
  const currentPlayer = useSelector(selectCurrentPlayer)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const dispatch = useDispatch()
  const currentTeam = useSelector(selectCurrentTeam)
  const { teamPrice } = useSelector((store) => store.teamPlayer)
  const teamBalance = +(currentTeam?.balance || 0) - +(teamPrice || 0)
  const config = useSelector(selectSystemConfig)

  const max_same_team_players = +config[CONFIG_KEY.max_same_team_players]?.value
  const transfer_show_modals =
    config[CONFIG_KEY.transfer_show_modals]?.value?.toLowerCase() === 'true'

  const handleSwapPlayer = (player) => {
    dispatch(
      swapTeamPlayer({
        player,
        previousPlayer: currentPlayer,
        team: currentTeam,
        t,
        transfer_show_modals,
        max_same_team_players,
      })
    )
  }

  const [sorting, setSorting] = useState([
    {
      id: 'price',
      desc: true,
    },
  ])

  const columns = [
    columnHelper.accessor('name', {
      accessorFn: (row) =>
        getCorrectName({ lang, uz: row?.name, ru: row?.name_ru }),
      header: t('Ism'),
      id: 'name',
      meta: {
        filterVariant: 'name',
      },
    }),
    columnHelper.accessor('club.name', {
      id: 'club',
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
    columnHelper.accessor('price', {
      accessorKey: 'price',
      header: t('Narx'),
      cell: (info) => info.renderValue(),
      filterFn: (row, id, filterValue) => {
        // Early return if filterValue is not a valid range array
        if (
          !Array.isArray(filterValue) ||
          filterValue.length !== 2 ||
          typeof filterValue[0] !== 'number' ||
          typeof filterValue[1] !== 'number'
        ) {
          return true
        }

        const [min, max] = filterValue
        const price = row.getValue(id)

        if (typeof price !== 'number') return false
        if (min !== undefined && price < min) return false
        if (max !== undefined && price > max) return false

        return true
      },
      meta: {
        filterVariant: 'price',
      },
    }),
    columnHelper.accessor((row) => row.point, {
      accessorFn: (row) => row.point,
      id: 'point',
      cell: (info) => info.getValue(),
      header: t('Ochko'),
    }),
    columnHelper.accessor('position', {
      accessorFn: (row) => getCorrentPlayerPosition(row?.position, lang),
      id: 'position',
      header: t('Poz'),
    }),
    columnHelper.display({
      id: 'action',
      header: '',
      enableSorting: false,
      cell: ({ row }) => {
        const rowId = row.original.id
        const rowData = row.original
        return (
          <SwapPlayerButton
            teamBalance={teamBalance}
            key={rowId}
            player={rowData}
            handleSwapPlayer={handleSwapPlayer}
          />
        )
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
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
    },
    initialState: {
      columnFilters: [
        {
          id: 'position',
          value: getCorrentPlayerPosition(currentPlayer?.position || '', lang),
        },
      ],
    },
  })

  return (
    <main className="text-foreground flex flex-1 flex-col gap-2 md:text-sm">
      <div className="xs:text-xs grid grid-cols-2 grid-rows-2 gap-x-1 gap-y-2 text-sm sm:grid-cols-4 sm:grid-rows-1 md:gap-1 md:text-sm lg:text-base">
        {table
          .getHeaderGroups()
          .map((headerGroup) =>
            headerGroup.headers.map((header) => (
              <TransferTableFilters key={header.id} column={header.column} />
            ))
          )}
      </div>
      <Table className="text-foreground w-full min-w-80 table-auto text-sm">
        <Head table={table} />
        <Body table={table} flexRender={flexRender} />
      </Table>
      <TanStackPagination
        table={table}
        active="bg-primary text-primary-foreground"
        className={'mt-auto pt-2'}
      />
    </main>
  )
}

export default PlayerTable
