import { Skeleton } from 'components/ui/skeleton'

export function ChampionshipSkeleton() {
  return (
    <div className="border-border bg-card/10 flex h-32 items-center justify-center space-x-4 rounded-lg border-2 px-4">
      <Skeleton className="size-14 min-w-14 rounded-xl" />
      <div className="w-full space-y-2">
        <Skeleton className="h-6 w-full md:h-7 xl:h-8" />
        <Skeleton className="h-4 w-full sm:h-5" />
      </div>
    </div>
  )
}
