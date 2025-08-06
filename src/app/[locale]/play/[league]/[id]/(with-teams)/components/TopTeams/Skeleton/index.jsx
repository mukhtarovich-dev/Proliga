import { Skeleton } from 'components/ui/skeleton'
import { Card, CardContent, CardHeader } from 'components/ui/card'

const TopTeamsSkeleton = () => {
  return (
    <div className="flex h-min w-full flex-col gap-2 lg:w-1/3">
      <TopTeams />
      <TopPlayers />
    </div>
  )
}

const TopTeams = () => {
  return (
    <Card className="border-border w-full py-4">
      <CardHeader className="flex flex-row items-center justify-between px-4">
        <Skeleton className="bg-muted h-7 w-3/4" />
      </CardHeader>
      <CardContent className="xs:grid-cols-3 mt-4 grid h-auto min-h-32 grid-cols-2 gap-2">
        {[1, 2, 3].map((index) => (
          <TeamPlaceSkeleton key={index} />
        ))}
      </CardContent>
    </Card>
  )
}

const TeamPlaceSkeleton = () => {
  return (
    <div className="bg-secondary relative min-h-32 w-full rounded-sm p-2">
      <div className="flex items-center justify-between">
        <Skeleton className="size-8" />
        <Skeleton className="bg-accent h-5 w-3/5 rounded-full" />
      </div>
      <div className="mt-2 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="bg-accent absolute right-0 bottom-0 size-6 rounded-tl-lg rounded-br-lg" />
    </div>
  )
}

const TopPlayers = () => {
  return (
    <Card className="border-border w-full py-4">
      <CardHeader className="flex flex-row items-center justify-between px-4">
        <Skeleton className="bg-muted h-7 w-3/4" />
      </CardHeader>
      <CardContent className="xs:grid-cols-3 mt-4 grid grid-cols-2 gap-2">
        {[1, 2, 3].map((index) => (
          <PlayerPlaceSkeleton key={index} />
        ))}
      </CardContent>
    </Card>
  )
}

const PlayerPlaceSkeleton = () => {
  return (
    <div className="bg-secondary relative min-h-32 rounded-sm p-2">
      <div className="flex items-center justify-between">
        <Skeleton className="size-8 rounded-full" />
        <Skeleton className="bg-accent h-5 w-3/5 rounded-full" />
      </div>
      <div className="mt-2 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="bg-accent absolute right-0 bottom-0 size-6 rounded-tl-lg rounded-br-lg" />
    </div>
  )
}

export default TopTeamsSkeleton
