import { Skeleton } from 'components/ui/skeleton'
import { CalendarDays, Eye } from 'lucide-react'
import { PaginationSkeleton } from 'components/Table/Pagination/Server'
import { Card, CardContent, CardFooter, CardHeader } from 'components/ui/card'

function ArticleSkeleton() {
  return (
    <article className="group bg-background/50 flex h-[100px] w-auto overflow-hidden rounded hover:cursor-pointer">
      <section className="my-auto flex aspect-4/3 h-full w-24 shrink-0 items-center justify-center md:w-32">
        <Skeleton className="h-full w-full rounded-sm" />
      </section>
      <section className="flex h-full w-full flex-col space-y-1 px-2 py-1">
        <div className="space-y-1 flex-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
        <div className="flex w-full flex-wrap items-center justify-between">
          <div className="text-muted-foreground flex items-center space-x-1 text-xs">
            <div className="flex items-center gap-1">
              <CalendarDays className="size-4 animate-pulse" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex items-center gap-1">
              <Eye className="text-foreground size-4 animate-pulse" />
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

export function NewsSkeleton({ count = 5, paginationCount = 5 }) {
  return (
    <Card className="border-border relative mx-auto flex h-172 w-full max-w-lg flex-col gap-4 lg:mx-0 lg:min-w-72 lg:flex-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <Skeleton className="h-7 w-36" />
        <Skeleton className="size-9 rounded-md" />
      </CardHeader>
      <CardContent className="flex h-full w-full flex-1 flex-col gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <ArticleSkeleton key={index} />
        ))}
      </CardContent>
      <CardFooter>
        <PaginationSkeleton count={paginationCount} className="w-full" />
      </CardFooter>
    </Card>
  )
}
