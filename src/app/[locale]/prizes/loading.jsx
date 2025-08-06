import { Skeleton } from 'components/ui/skeleton'
import { Card, CardContent, CardHeader } from 'components/ui/card'

export function PrizesSkeleton({ count = 4 }) {
  return (
    <>
      <Skeleton className="bg-muted mb-4 h-12 w-48" />
      <section className="flex w-full flex-col items-center justify-center gap-2">
        {[...Array(count)].map((_, index) => (
          <CompetitionSkeleton key={index} />
        ))}
      </section>
    </>
  )
}

export function PrizeSkeleton() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Skeleton className="bg-muted mb-2 h-4 w-24" />
      <Skeleton className="bg-muted h-full min-h-64 min-w-64 flex-1 rounded-xl lg:min-h-80 lg:min-w-80 xl:min-h-96 xl:min-w-96" />
      <Skeleton className="bg-muted mt-2 h-6 w-16" />
    </div>
  )
}

export function CompetitionSkeleton() {
  return (
    <Card className="border-border w-full">
      <CardHeader className="border-border mb-4 flex items-center gap-2 border-b">
        <Skeleton className="bg-muted h-10 w-10 rounded-full" />
        <Skeleton className="bg-muted h-6 w-32" />
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        <PrizeSkeleton />
        <PrizeSkeleton />
        <PrizeSkeleton />
      </CardContent>
    </Card>
  )
}

export default function PrizesLoading() {
  return <PrizesSkeleton />
}
