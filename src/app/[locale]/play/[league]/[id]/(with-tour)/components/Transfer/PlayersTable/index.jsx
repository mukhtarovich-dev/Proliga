'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useState, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { createColumnHelper } from '@tanstack/react-table'
import { selectPlayers } from 'lib/features/player/player.selector'
import { getCorrentPlayerPosition } from 'utils/getCorrectPlayerPosition.utils'
import TableHead from 'components/Table/Head'
import TeamOverview from '../TeamOverview'
import TransferTableFilters from './Filters'
import PlayersTableSkeleton from './Skeleton'
import TanStackPagination from 'components/Table/Pagination/Client'
import { getCorrectName } from 'utils/getCorrectName.util'
import AddPlayerButton from './AddPlayerButton'
import { useDispatch } from 'react-redux'
import {
  addTeamPlayer,
  updateTeamPlayer,
} from 'lib/features/teamPlayer/teamPlayer.slice'
import { CONFIG_KEY } from 'utils/config.util'
import {
  selectTotalPlayersCount,
  selectTeamConcat,
} from 'lib/features/teamPlayer/teamPlayer.selector'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { selectSystemConfig } from 'lib/features/systemConfig/systemConfig.selector'
import { Card, CardContent, CardFooter } from 'components/ui/card'
import { Table } from 'components/ui/table'
import Body from 'components/Table/Body'

const columnHelper = createColumnHelper()

function PlayersTable() {
  const dispatch = useDispatch()
  const { lang } = useSelector((state) => state.systemLanguage)
  const { t } = useTranslation()

  const [sorting, setSorting] = useState([
    {
      id: 'price',
      desc: true,
    },
  ])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 13,
  })
  const { isLoading } = useSelector((state) => state.player)
  const players = useSelector(selectPlayers)
  const [windowWidth, setWindowWidth] = useState(0)

  const totalPlayersCount = useSelector(selectTotalPlayersCount)
  const teamConcat = useSelector(selectTeamConcat)
  const currentTeam = useSelector(selectCurrentTeam)
  const config = useSelector(selectSystemConfig)
  const { teamPrice } = useSelector((store) => store.teamPlayer)
  const max_same_team_players = +config[CONFIG_KEY.max_same_team_players]?.value
  const transfer_show_modals =
    config[CONFIG_KEY.transfer_show_modals]?.value?.toLowerCase() === 'true'

  const teamBalance = +(currentTeam?.balance || 0) - +(teamPrice || 0)

  const handleAddPlayer = (player) => {
    if (currentTeam?.is_team_created) {
      dispatch(
        addTeamPlayer({
          player,
          team: currentTeam,
          teamConcat,
          t,
          max_same_team_players,
          transfer_show_modals,
        })
      )
    } else {
      dispatch(
        updateTeamPlayer({
          player,
          team: currentTeam,
          teamConcat,
          t,
          max_same_team_players,
          transfer_show_modals,
        })
      )
    }
  }

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (windowWidth <= 1024) {
      setPagination({
        pageIndex: 0,
        pageSize: 10,
      })
    } else if (windowWidth > 1024 && windowWidth <= 1280) {
      setPagination({
        pageIndex: 0,
        pageSize: 8,
      })
    } else if (windowWidth > 1280 && windowWidth <= 1536) {
      setPagination({
        pageIndex: 0,
        pageSize: 10,
      })
    } else {
      setPagination({
        pageIndex: 0,
        pageSize: 11,
      })
    }
  }, [windowWidth])

  const columns = [
    columnHelper.accessor('name', {
      accessorFn: (row) =>
        getCorrectName({ lang, uz: row?.name, ru: row?.name_ru }),
      id: 'name',
      header: t('Ism'),
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
      accessorFn: (row) => row.position,
      id: 'position',
      header: t('Poz'),
      cell: (info) => <>{getCorrentPlayerPosition(info.getValue(), lang)}</>,
      meta: {
        filterVariant: 'position',
      },
    }),
    columnHelper.display({
      id: 'action',
      header: '',
      enableSorting: false,
      cell: ({ row }) => {
        const rowId = row.original.id
        const rowData = row.original
        return (
          <AddPlayerButton
            teamBalance={teamBalance}
            key={rowId}
            player={rowData}
            teamConcat={teamConcat}
            handleAddPlayer={handleAddPlayer}
            totalPlayersCount={totalPlayersCount}
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
  })

  if (isLoading) {
    return <PlayersTableSkeleton />
  }

  return (
    <Card
      className={
        'border-border mx-auto h-min w-full max-w-lg gap-2 py-4 lg:w-[55%] lg:max-w-2xl xl:gap-0.5'
      }
    >
      <TeamOverview />
      <CardContent className="space-y-2 px-4">
        <div className="grid grid-cols-2 grid-rows-2 gap-1 lg:grid-cols-4 lg:grid-rows-1">
          {table
            .getHeaderGroups()
            .map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <TransferTableFilters key={header.id} column={header.column} />
              ))
            )}
        </div>
        <Table className="w-full min-w-80 table-auto text-xs xl:text-sm">
          <TableHead table={table} />
          <Body table={table} flexRender={flexRender} />
        </Table>
      </CardContent>
      <CardFooter>
        <TanStackPagination
          table={table}
          active="bg-primary text-primary-foreground"
          className={'w-full'}
        />
      </CardFooter>
    </Card>
  )
}

export default memo(PlayersTable)
