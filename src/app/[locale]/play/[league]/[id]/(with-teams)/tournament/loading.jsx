import { Skeleton } from 'components/ui/skeleton'
import { PaginationSkeleton } from 'components/Table/Pagination/Server'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from 'components/ui/table'

const TournamentTableSkeleton = ({ rows = 10, cols = 5, paginationCount }) => {
  return (
    <>
      <Table className="h-full min-w-72 table-auto text-xs sm:text-sm">
        <TableHeader>
          <TableRow>
            {[...Array(cols)].map((_, index) => (
              <TableHead
                key={index}
                className="p-0.5 text-center sm:min-w-16 md:p-1 md:text-start"
              >
                <Skeleton className="h-6 w-full" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(rows)].map((_, rowIndex) => (
            <TableRow
              key={rowIndex}
              className="hover:bg-card border-border bg-background text-foreground odd:bg-secondary mx-auto border-b text-center md:text-start"
            >
              {[...Array(cols)].map((_, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className="h-8 w-min px-0.5 capitalize md:w-auto"
                >
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationSkeleton
        count={paginationCount}
        className={'mt-auto h-min w-full'}
      />
    </>
  )
}

export default function Loading() {
  return <TournamentTableSkeleton rows={10} cols={5} paginationCount={5} />
}
