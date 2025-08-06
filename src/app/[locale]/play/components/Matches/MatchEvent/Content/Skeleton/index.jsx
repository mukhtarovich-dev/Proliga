import { cn } from 'lib/utils'

export default function MatchEventSkeleton() {
  return (
    <section className="relative flex h-full max-h-[calc(90vh-320px)] flex-col gap-4 overflow-y-auto px-4 py-4">
      {/* Center line */}
      <span className="bg-muted absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 transform" />

      <SkeletonEventHeader />
      <SkeletonEvent />
      <SkeletonEvent isReversed />
      <SkeletonEvent eventType="transfer" />
      <SkeletonEvent isReversed eventType="card" />
      <SkeletonEventHeader />
      <SkeletonEventHeader />
      <SkeletonEvent />
      <SkeletonEvent isReversed />
      <SkeletonEvent />
      <SkeletonEvent />

      <SkeletonEventHeader />
    </section>
  )
}

const SkeletonEventHeader = () => (
  <div className="flex items-center justify-center">
    <div className="bg-muted-foreground z-10 h-6 w-24 animate-pulse rounded-sm px-3 py-1.5 text-center text-sm" />
  </div>
)

const SkeletonEvent = ({ isReversed = false, eventType = 'default' }) => (
  <div
    className={cn(
      'flex items-center justify-center',
      isReversed && 'flex-row-reverse'
    )}
  >
    <SkeletonEventSide isReversed={isReversed} eventType={eventType} />
    <SkeletonEventIcon eventType={eventType} />
    <SkeletonEventTime isReversed={isReversed} />
  </div>
)

const SkeletonEventSide = ({ isReversed, eventType }) => (
  <div
    className={cn('w-5/12', isReversed ? 'pl-4 text-left' : 'pr-4 text-right')}
  >
    <SkeletonBar
      className={cn(
        'mb-1',
        isReversed ? 'mr-auto' : 'ml-auto',
        eventType === 'transfer' && 'bg-success/50',
        'h-4 w-24'
      )}
    />
    {eventType !== 'card' && (
      <SkeletonBar
        className={cn(
          isReversed ? 'mr-auto' : 'ml-auto',
          eventType === 'transfer' && 'bg-destructive/50',
          'h-3 w-16'
        )}
      />
    )}
  </div>
)

const SkeletonEventIcon = ({ eventType }) => (
  <div className="flex w-2/12 items-center justify-center">
    <div
      className={cn(
        'bg-muted z-10 flex size-10 animate-pulse items-center justify-center rounded-full'
      )}
    >
      {eventType === 'transfer' && (
        <SkeletonBar className="bg-foreground/30 h-4 w-4 rounded-sm" />
      )}
      {eventType === 'card' && (
        <SkeletonBar className="h-6 w-4 rounded-xs bg-yellow-500/50" />
      )}
    </div>
  </div>
)

const SkeletonEventTime = ({ isReversed }) => (
  <div
    className={cn('w-5/12', isReversed ? 'pr-4 text-right' : 'pl-4 text-left')}
  >
    <SkeletonBar className={cn('h-4 w-12', isReversed ? 'ml-auto' : '')} />
  </div>
)

const SkeletonBar = ({ className }) => (
  <div
    className={cn('bg-muted-foreground animate-pulse rounded-sm', className)}
  />
)
