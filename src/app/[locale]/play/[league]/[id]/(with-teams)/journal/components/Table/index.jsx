'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Body from 'components/Table/Body'
import Head from 'components/Table/Head'
import { useSelector } from 'react-redux'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { getCorrectName } from 'utils/getCorrectName.util'
import { formatDate } from 'utils/formatDate.util'
import { selectUserActivities } from 'lib/features/userActivity/userActivity.selector'
import { Table } from 'components/ui/table'

const columnHelper = createColumnHelper()

function JournalTable() {
  const { t } = useTranslation()
  const activities = useSelector(selectUserActivities)
  const { lang } = useSelector((state) => state.systemLanguage)

  const columns = [
    columnHelper.accessor('created_at', {
      id: 'date',
      header: t('Sana'),
      accessorFn: (row) => formatDate(row?.created_at),
    }),
    columnHelper.accessor('name', {
      accessorKey: 'name',
      header: t('Message'),
      id: 'name',
      accessorFn: (row) =>
        getCorrectName({ lang, uz: row?.name_uz, ru: row?.name_ru }),
    }),
  ]

  const table = useReactTable({
    columns,
    data: activities || [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  return (
    <Table className="text-foreground h-auto w-full text-start text-xs md:text-sm">
      <Head table={table} />
      <Body table={table} flexRender={flexRender} rowClassName={'text-start'} />
    </Table>
  )
}

export default JournalTable
