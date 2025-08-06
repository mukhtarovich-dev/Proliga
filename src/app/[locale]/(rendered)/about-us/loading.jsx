import { Skeleton } from 'components/ui/skeleton'

const Loading = () => {
  return (
    <div className="html-page bg-opacity-50 shadow-muted-foreground/50 bg-card my-6 min-h-[40vh] w-full rounded-xl px-2 py-4 text-sm shadow-lg sm:p-4 md:p-6 xl:text-base">
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
    </div>
  )
}

export default Loading
