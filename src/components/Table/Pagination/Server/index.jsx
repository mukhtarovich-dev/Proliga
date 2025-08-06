import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { Button } from 'components/ui/button'
import { Skeleton } from 'components/ui/skeleton'
import { cn } from 'lib/utils'

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
  className,
  buttonClassName = '',
  iconClassName = '',
}) {
  const renderPageNumbers = () => {
    const pageNumbers = []
    const maxVisiblePages = 5

    let startPage = Math.max(
      1,
      currentPage + 1 - Math.floor(maxVisiblePages / 2)
    )
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      const isCurrentPage = i === currentPage + 1
      pageNumbers.push(
        <Button
          key={i}
          variant={isCurrentPage ? 'secondary' : 'outline-solid'}
          size="sm"
          aria-label={`Page ${i}`}
          aria-current={isCurrentPage ? 'page' : undefined}
          onClick={() => onPageChange(i - 1)}
          disabled={disabled || totalPages === 0}
          className={cn(
            'bg-background border-muted text-foreground hover:bg-accent hover:text-accent-foreground size-7 border p-0 md:size-8',
            isCurrentPage &&
              'bg-primary text-primary-foreground hover:bg-primary/90',
            buttonClassName
          )}
        >
          {i}
        </Button>
      )
    }

    return pageNumbers
  }

  return (
    <section
      className={cn('flex items-center justify-center space-x-2', className)}
    >
      <Button
        variant="outline"
        size="sm"
        className={cn(
          'bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-border size-7 p-0 md:size-8',
          buttonClassName
        )}
        onClick={() => onPageChange(0)}
        disabled={currentPage === 0 || disabled || totalPages === 0}
      >
        <ChevronsLeft className={cn('text-muted-foreground', iconClassName)} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          'bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-border size-7 p-0 md:size-8',
          buttonClassName
        )}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0 || disabled || totalPages === 0}
      >
        <ChevronLeft className={cn('text-muted-foreground', iconClassName)} />
      </Button>
      {renderPageNumbers()}
      <Button
        variant="outline"
        size="sm"
        className={cn(
          'bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-border size-7 p-0 md:size-8',
          buttonClassName
        )}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={
          currentPage === totalPages - 1 || disabled || totalPages === 0
        }
      >
        <ChevronRight className={cn('text-muted-foreground', iconClassName)} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={cn(
          'bg-background text-foreground hover:bg-accent hover:text-accent-foreground border-border size-7 p-0 md:size-8',
          buttonClassName
        )}
        onClick={() => onPageChange(totalPages - 1)}
        disabled={
          currentPage === totalPages - 1 || disabled || totalPages === 0
        }
      >
        <ChevronsRight className={cn('text-muted-foreground', iconClassName)} />
      </Button>
    </section>
  )
}

export const PaginationSkeleton = ({ count = 5, className }) => {
  return (
    <div className={cn('flex h-full justify-center space-x-2', className)}>
      <Button
        variant="outline"
        disabled
        className="bg-muted text-muted-foreground border-border size-7 animate-pulse cursor-pointer p-0 md:size-8"
      >
        <ChevronsLeft className="text-muted-foreground" />
      </Button>
      <Button
        variant="outline"
        disabled
        className="bg-muted text-muted-foreground border-border size-7 animate-pulse cursor-pointer p-0 md:size-8"
      >
        <ChevronLeft className="text-muted-foreground" />
      </Button>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="bg-muted size-7 md:size-8" />
      ))}
      <Button
        variant="outline"
        disabled
        className="bg-muted text-muted-foreground border-border size-7 animate-pulse cursor-pointer p-0 md:size-8"
      >
        <ChevronRight className="text-muted-foreground" />
      </Button>
      <Button
        variant="outline"
        disabled
        className="bg-muted text-muted-foreground border-border size-7 animate-pulse cursor-pointer p-0 md:size-8"
      >
        <ChevronsRight className="text-muted-foreground" />
      </Button>
    </div>
  )
}
