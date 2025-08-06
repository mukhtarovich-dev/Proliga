import { Skeleton } from 'components/ui/skeleton'
import { ChampionshipSkeleton } from './components/Skeleton'

export default function ChampionshipsLoading() {
  return (
    <>
      <Skeleton className="mb-6 h-7 w-48" />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <ChampionshipSkeleton key={index} />
        ))}
      </div>
    </>
  )
}
