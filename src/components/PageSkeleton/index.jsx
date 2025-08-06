import { Skeleton } from 'components/ui/skeleton'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/ui/table'

export function TableSkeleton({ cols = 4 }) {
  return (
    <Table className="overflow-hidden">
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          {[...Array(cols)].map((_, index) => (
            <TableHead key={index}>
              <Skeleton className="h-5 w-2/3 lg:w-24 xl:w-24" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {[...Array(6)].map((_, rowIndex) => (
          <TableRow
            key={rowIndex}
            className="border-border hover:bg-transparent"
          >
            {[...Array(cols)].map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className="h-6 w-full md:w-32 lg:w-40" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default function PageSkeleton() {
  return (
    <div className="bg-card/75 shadow-border mx-auto my-6 min-h-screen w-full max-w-4xl rounded-xl px-2 py-4 shadow-md sm:p-4 md:p-6">
      <Skeleton className="mx-auto mb-4 h-6 w-3/5 sm:w-1/2 xl:w-2/5" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-5/6" />

      <Skeleton className="mt-6 mb-4 h-6 w-2/3" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-4/5" />

      <Skeleton className="mt-6 mb-4 h-6 w-1/2" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-11/12" />
      <div className="border-border hidden overflow-hidden rounded-xl border md:block">
        <TableSkeleton cols={4} />
      </div>
      <div className="border-border block overflow-hidden rounded-xl border md:hidden">
        <TableSkeleton cols={3} />
      </div>
      <Skeleton className="mt-6 mb-4 h-6 w-1/2" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-11/12" />

      <Skeleton className="mt-6 mb-4 h-6 w-1/2" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="mb-4 h-4 w-11/12" />
    </div>
  )
}
