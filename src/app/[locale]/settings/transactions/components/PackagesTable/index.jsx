'use client'

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table'
import { Table } from 'components/ui/table'
import Head from 'components/Table/Head'
import Body from 'components/Table/Body'
import { createColumnHelper } from '@tanstack/react-table'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import TanStackPagination from 'components/Table/Pagination/Client'
import { getCorrectName } from 'utils/getCorrectName.util'
import { formatDate } from 'utils/formatDate.util'
import { formatCurrency } from 'utils/formatCurrency'
import { Zap, Users, Coins, Wallet } from 'lucide-react'
import { PACKAGE_TYPE } from 'utils/packages.util'
import { PAYMENT_OPTIONS } from 'utils/paymentOptions.util'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'components/ui/popover'

const columnHelper = createColumnHelper()

function TransactionsPackagesTable() {
  const { t } = useTranslation()
  const { expenses } = useSelector((store) => store.payExpense)
  const { lang } = useSelector((store) => store.systemLanguage)
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
      id: 'code',
      header: t('Code'),
    }),
    columnHelper.accessor('Team', {
      accessorFn: (row) => row?.team_id?.name,
      id: 'team',
      header: t('Jamoa'),
    }),
    columnHelper.accessor('Title', {
      accessorFn: (row) => row?.pay_package_id,
      cell: (info) => (
        <PackageIcon
          type={info.getValue()?.type ?? null}
          amount={info.getValue()?.amount ?? 0}
          name={getCorrectName({
            lang,
            uz: info.getValue()?.name_uz,
            ru: info.getValue()?.name_ru,
          })}
        />
      ),
      id: 'title',
      header: t('Paketlar'),
    }),
    columnHelper.accessor('System', {
      accessorFn: (row) => row?.system,
      cell: (info) => <PaymentOptionIcon system={info.getValue()} />,
      id: 'title2',
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
    data: expenses ?? [],
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
      <Table>
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

const PackageIcon = ({ type, amount, name }) => {
  const renderIcons = () => {
    switch (type) {
      case PACKAGE_TYPE.single_club_count:
        return <Users className="size-3.5 md:size-5" />
      case PACKAGE_TYPE.team_balance:
        return <Coins className="size-3.5 md:size-5" />
      case PACKAGE_TYPE.transfer_count:
        return <Zap className="size-3.5 md:size-5" />
      default:
        return
    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <span className="dark:text-primary flex cursor-pointer items-center gap-0.5 text-sm font-bold md:text-base">
          {renderIcons()} {amount}
        </span>
      </PopoverTrigger>
      <PopoverContent align="center" className="w-auto text-sm md:text-base">
        {name}
      </PopoverContent>
    </Popover>
  )
}

export const PaymentOptionIcon = ({ system }) => {
  const { t } = useTranslation()
  const { resolvedTheme } = useTheme()

  switch (system) {
    case PAYMENT_OPTIONS.CLICKUP:
      return (
        <span>
          <Image
            src={
              resolvedTheme === 'dark'
                ? '/icons/click-up.svg'
                : '/icons/click-up-dark.svg'
            }
            alt="click up"
            width={20}
            className="xs:w-16 h-7 w-16 md:h-8 md:w-20"
            height={20}
          />
        </span>
      )
    case PAYMENT_OPTIONS.PAYME:
      return (
        <span>
          <Image
            src="/icons/payme.svg"
            alt="payme"
            width={20}
            height={20}
            className="xs:w-16 h-7 w-16 md:h-8 md:w-20"
          />
        </span>
      )
    case PAYMENT_OPTIONS.WALLET:
      return (
        <span className="xs:text-sm flex items-center gap-0.5 text-xs md:gap-1 md:text-base">
          <Wallet className="xs:size-5 size-4" />
          {t('Balans')}
        </span>
      )
    default:
      return null
  }
}

export default TransactionsPackagesTable
