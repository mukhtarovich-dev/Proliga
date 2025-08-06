import { Skeleton } from 'components/ui/skeleton'
import { Card, CardContent, CardFooter } from 'components/ui/card'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from 'components/ui/table'

const PlayersTableSkeleton = () => {
  return (
    <Card
      className={
        'border-border mx-auto h-min w-full max-w-lg gap-2 py-4 lg:w-[55%] lg:max-w-2xl xl:gap-0.5'
      }
    >
      <TeamOverviewSkeleton />
      <CardContent className="space-y-2 px-4">
        <TransferTableFiltersSkeleton />
        <Table>
          <TransferTableHeadSkeleton />
          <TransferTableBodySkeleton />
        </Table>
      </CardContent>
      <CardFooter>
        <TransferTablePaginationSkeleton />
      </CardFooter>
    </Card>
  )
}

const TeamOverviewSkeleton = () => {
  return (
    <div className="mb-4 flex flex-col gap-2 px-4">
      <Skeleton className="h-6 w-3/4" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  )
}

const TransferTableBodySkeleton = () => {
  return (
    <TableBody>
      {[...Array(10)].map((_, rowIndex) => (
        <TableRow
          key={rowIndex}
          className="border-border odd:bg-secondary w-full border-b"
        >
          {[...Array(5)].map((_, cellIndex) => (
            <TableCell key={cellIndex} className="p-1">
              <Skeleton className="h-4 w-full min-w-8 2xl:min-w-10" />
            </TableCell>
          ))}
          <TableCell className="p-2">
            <Skeleton className="h-6 w-6 rounded-full" />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

const TransferTableFiltersSkeleton = () => {
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-1 lg:grid-cols-4 lg:grid-rows-1">
      {[...Array(4)].map((_, index) => (
        <Skeleton key={index} className="h-8 w-full" />
      ))}
    </div>
  )
}

const TransferTableHeadSkeleton = () => {
  return (
    <TableHeader>
      <TableRow>
        {[...Array(6)].map((_, index) => (
          <TableHead key={index} className="p-2">
            <Skeleton className="h-6 w-full" />
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}

const TransferTablePaginationSkeleton = () => {
  return (
    <div className="flex w-full items-center justify-center gap-2 overflow-x-auto px-4">
      {[...Array(7)].map((_, index) => (
        <Skeleton key={index} className="h-8 w-8 rounded-sm" />
      ))}
    </div>
  )
}

export default PlayersTableSkeleton
