import { Skeleton } from 'components/ui/skeleton'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from 'components/ui/table'

const CabinetTransactionsSkeleton = ({ rows = 10, cols = 4 }) => {
  return (
    <div className="flex h-full flex-col justify-between gap-1">
      <Table className="h-auto w-full">
        <CabinetTransactionsSkeletonHead cols={cols} />
        <CabinetTransactionsSkeletonBody cols={cols} rows={rows} />
      </Table>
      <CabinetTransactionsSkeletonPagination />
    </div>
  )
}

const CabinetTransactionsSkeletonBody = ({ cols = 5, rows = 9 }) => {
  return (
    <TableBody>
      {[...Array(rows)].map((_, rowIndex) => (
        <TableRow
          key={rowIndex}
          className="border-border hover:bg-background mx-auto w-full border-b"
        >
          {[...Array(cols)].map((_, cellIndex) => (
            <TableCell
              key={cellIndex}
              className="h-14 w-min px-0.5 py-1 text-center sm:min-w-8 md:h-11 md:text-start"
            >
              <Skeleton className="h-5 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}

const CabinetTransactionsSkeletonHead = ({ cols = 5 }) => {
  return (
    <TableHeader>
      <TableRow className="relative rounded-md">
        {[...Array(cols)].map((_, index) => (
          <TableHead
            key={index}
            className="min-w-5 p-0.5 text-center md:p-1 md:text-start"
          >
            <Skeleton className="h-6 w-full" />
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}

const CabinetTransactionsSkeletonPagination = () => {
  return (
    <section className="mt-1 flex items-center justify-center gap-2 overflow-x-auto">
      {[...Array(5)].map((_, index) => (
        <Skeleton key={index} className="size-6 rounded-sm md:size-8" />
      ))}
    </section>
  )
}

export default CabinetTransactionsSkeleton
