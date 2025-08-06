'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Head from 'components/Table/Head'

import { useSelector } from 'react-redux'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { selectAllTeams } from 'lib/features/team/team.selector'
import capitalize from 'lodash/capitalize'
import { Table } from 'components/ui/table'
import Body from 'components/Table/Body'
import { Link } from 'next-view-transitions'

const columnHelper = createColumnHelper()
import { selectCurrentCompetition } from 'lib/features/competition/competition.selector'

function TournamentTable({ showUserTourTeam }) {
  const { t } = useTranslation()

  const allTeams = useSelector(selectAllTeams)

  const currentCompetition = useSelector(selectCurrentCompetition)

  const columns = [
    columnHelper.accessor('', {
      accessorFn: (row) => row?.team?.order ?? '',
      header: capitalize(t("O'RIN")),
      id: 'Id',
    }),
    columnHelper.accessor('name', {
      accessorFn: (row) => row?.team?.name ?? '',
      cell: (info) => (
        <Link
          href={`/team-view/${currentCompetition?.id}/${info?.row?.original?.team?.id ?? 0}`}
        >
          {info.getValue()}
        </Link>
      ),
      header: t('Jamoa'),
    }),
    columnHelper.accessor('user', {
      accessorFn: (row) => row?.user_id?.name ?? '',
      header: t('Foydalanuvchi'),
    }),
    columnHelper.accessor('point', {
      accessorFn: (row) => row?.point,
      id: 'point',
      cell: (info) => info.getValue(),
      header: t('Tur'),
    }),
    columnHelper.accessor('team-point', {
      accessorFn: (row) => row?.team?.point,
      id: 'hammasi',
      header: t('Hammasi'),
    }),
  ]

  const table = useReactTable({
    columns,
    data: allTeams ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <Table className="text-foreground h-auto w-full min-w-72 table-auto text-xs sm:text-sm">
      <Head table={table} />
      <Body
        table={table}
        flexRender={flexRender}
        showUserTourTeam={showUserTourTeam}
      />
    </Table>
  )
}

export default TournamentTable
