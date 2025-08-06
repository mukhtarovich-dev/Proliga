import { Card, CardContent } from 'components/ui/card'
import { Skeleton } from 'components/ui/skeleton'

const MatchSkeleton = () => {
  return (
    <Card className="border-border h-12 space-y-0 overflow-hidden p-0">
      <CardContent className="xs:px-2 xs:py-3 flex h-12 items-center gap-1 px-1 py-2.5">
        <div className="xs:gap-2 flex w-full items-center gap-1">
          <Skeleton className="xs:size-8 size-7 rounded-full" />
          <Skeleton className="xs:h-5 h-4 w-16 md:w-24" />
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-0 rounded-xs md:w-40">
          <Skeleton className="h-7 w-16 md:w-20" />
        </div>
        <div className="xs:gap-2 flex w-full items-center justify-end gap-1">
          <Skeleton className="xs:h-5 h-4 w-16 md:w-24" />
          <Skeleton className="xs:size-8 size-7 rounded-full" />
        </div>
      </CardContent>
    </Card>
  )
}

export default MatchSkeleton
