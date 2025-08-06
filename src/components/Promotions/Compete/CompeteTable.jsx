'use client'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Table } from 'components/ui/table'
import { FaArrowUp, FaArrowDown } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import Head from 'components/Table/Head'
import Body from 'components/Table/Body'
import { useTranslation } from 'react-i18next'
import { cn } from 'lib/utils'

const data = [
  { id: 1, order: 1, team: 'Algoritmskiy10', score: 1500, status: 'up' },
  { id: 2, order: 2, team: 'Tohir_Mancity', score: 1450, status: 'down' },
  { id: 3, order: 3, team: 'HeadCoach_MY', score: 1400, status: 'same' },
  { id: 4, order: 4, team: 'Bahodir7778', score: 1350, status: 'up' },
  { id: 5, order: 5, team: 'Laziz_Neymar', score: 1300, status: 'down' },
  { id: 6, order: 6, team: 'SalgadoReal', score: 1250, status: 'same' },
  { id: 7, order: 7, team: 'Shuhrat_Bavariya', score: 1200, status: 'up' },
  { id: 8, order: 8, team: 'Mukhtarovich-Madrid', score: 1100, status: 'up' },
  { id: 9, order: 9, team: 'Karim_Juventus', score: 950, status: 'up' },
]

export function CompeteTable({ className }) {
  const { t } = useTranslation()
  const columns = [
    {
      accessorKey: 'order',
      header: '',
      enableSorting: false,
      cell: ({ row }) => {
        const status = row.original.status
        const order = row.getValue('order')
        return (
          <div className="flex items-center justify-center gap-2">
            <span>{order}</span>
            {status === 'up' && <FaArrowUp className="text-green-500" />}
            {status === 'down' && <FaArrowDown className="text-red-500" />}
            {status === 'same' && <GoDotFill className="text-gray-500" />}
          </div>
        )
      },
    },
    {
      enableSorting: false,

      accessorKey: 'team',
      header: t('Jamoa'),
      cell: ({ row }) => <div>{row.getValue('team')}</div>,
    },
    {
      accessorKey: 'score',
      enableSorting: false,
      header: t('Ochko'),
      cell: ({ row }) => <div>{row.getValue('score')}</div>,
    },
  ]
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Table
      className={cn(
        'bg-background mx-auto w-full max-w-80 rounded-lg p-2 md:mx-0 xl:max-w-102',
        className
      )}
    >
      <Head table={table} />
      <Body table={table} flexRender={flexRender} />
    </Table>
  )
}
