import { cn } from 'lib/utils'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { Button } from 'components/ui/button'

const TanStackPagination = ({ table, active, className, buttonClassName }) => {
  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()

  const getPageRange = () => {
    const start = Math.max(1, currentPage - 2)
    const end = Math.min(totalPages, start + 4)
    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }

  return (
    <section
      className={cn(
        'flex items-center justify-center gap-2 overflow-x-auto py-0.5',
        className
      )}
    >
      <PaginationButton
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
        icon={'double-left'}
        className={cn(buttonClassName)}
      />
      <PaginationButton
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        icon={'left'}
        className={cn(buttonClassName)}
      />
      {getPageRange().map((page) => (
        <Button
          key={page}
          size={'sm'}
          onClick={() => table.setPageIndex(page - 1)}
          className={cn(
            'bg-background border-muted text-foreground hover:bg-accent hover:text-accent-foreground size-7 border p-0 select-none md:size-8',
            buttonClassName,
            currentPage === page
              ? cn('bg-primary text-primary-foreground', active)
              : ''
          )}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </Button>
      ))}
      <PaginationButton
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        icon={'right'}
        className={cn(buttonClassName)}
      />
      <PaginationButton
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
        icon={'double-right'}
        className={cn(buttonClassName)}
      />
    </section>
  )
}

const PaginationButton = ({ onClick, disabled, icon, className }) => {
  const render = () => {
    switch (icon) {
      case 'left':
        return <ChevronLeft className="h-full w-full" />
      case 'right':
        return <ChevronRight className="h-full w-full" />
      case 'double-left':
        return <ChevronsLeft className="h-full w-full" />
      case 'double-right':
        return <ChevronsRight className="h-full w-full" />
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant={'outline'}
      className={cn(
        'bg-background text-foreground hover:text-foreground hover:bg-secondary dark:hover:bg-secondary border-border size-7 cursor-pointer p-0 md:size-8',
        className
      )}
      size={'sm'}
    >
      {render()}
    </Button>
  )
}

export default TanStackPagination
