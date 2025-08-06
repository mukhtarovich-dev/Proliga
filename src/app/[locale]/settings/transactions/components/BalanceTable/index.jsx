'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table'
import { formatCurrency } from 'utils/formatCurrency'
import Head from 'components/Table/Head'
import Body from 'components/Table/Body'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import TanStackPagination from 'components/Table/Pagination/Client'
import { formatDate } from 'utils/formatDate.util'
import { selectBalances } from 'lib/features/payBalance/payBalance.selector'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'components/ui/popover'
import { PaymentOptionIcon } from '../PackagesTable'
import { Table } from 'components/ui/table'

const columnHelper = createColumnHelper()

function BalanceTable() {
  const { t } = useTranslation()
  const balances = useSelector(selectBalances)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 9,
  })

  const columns = [
    columnHelper.accessor('Date', {
      accessorFn: (row) => formatDate(row?.created_at),
      id: 'date',
      cell: (info) => (
        <time className="tracking-tighter">{info.getValue()}</time>
      ),
      header: t('Sana'),
    }),
    columnHelper.accessor('Kod', {
      accessorFn: (row) => row?.transaction_id ?? '',
      id: 'code',
      cell: (info) => (
        <Popover>
          <PopoverTrigger className="cursor-pointer text-sm font-bold select-none md:text-base">
            ******
          </PopoverTrigger>
          <PopoverContent
            className="w-auto text-sm md:text-base"
            align="center"
          >
            {info.getValue()}
          </PopoverContent>
        </Popover>
      ),
      header: t('Code'),
    }),
    columnHelper.accessor('System', {
      accessorFn: (row) => row?.system,
      id: 'title',
      cell: (info) => <PaymentOptionIcon system={info.getValue()} />,
      header: t('System'),
    }),
    columnHelper.accessor('sum', {
      accessorFn: (row) => formatCurrency({ value: row?.price || 0, t }),
      id: 'sum',
      cell: (info) => <span className="text-success">{info.getValue()}</span>,
      header: t('Narx'),
    }),
  ]

  const table = useReactTable({
    columns,
    data: balances ?? [],
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
      <Table className="text-2xs xs:text-xs w-full table-fixed rounded-sm md:text-sm">
        <Head table={table} />
        <Body table={table} flexRender={flexRender} />
      </Table>
      <TanStackPagination
        table={table}
        className={'mt-auto items-end self-center'}
      />
    </>
  )
}

export default BalanceTable
