import { cn } from 'lib/utils'
import { Skeleton } from 'components/ui/skeleton'
import { Card, CardContent } from 'components/ui/card'

export const GameBriefContainer = ({ children, isLoading, className }) => {
  return (
    <Card
      className={cn(
        'border-border relative mx-auto w-full max-w-lg gap-0 py-8 lg:mx-0 lg:w-[55%] lg:max-w-2xl xl:h-min',
        className
      )}
    >
      <CardContent
        className={cn(
          'animate-in fade-in flex h-full w-full flex-col justify-between gap-4 duration-300 lg:gap-5 xl:gap-6',
          isLoading ? 'justify-center' : 'justify-between'
        )}
      >
        {children}
      </CardContent>
    </Card>
  )
}

export const Section = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 pb-4 last:pb-0 lg:pb-5 xl:pb-6',
        className
      )}
    >
      {children}
    </div>
  )
}
export const Item = ({ children, className }) => {
  return (
    <div className={cn('flex items-center justify-between gap-2', className)}>
      {children}
    </div>
  )
}

export const Title = ({ children, className }) => {
  return (
    <h3 className={cn('text-foreground/80 text-base', className)}>
      {children}
    </h3>
  )
}

export const Content = ({ children, className, onClick }) => {
  return (
    <p
      onClick={onClick}
      className={cn(
        'text-foreground text-end text-sm uppercase xl:text-base',
        className
      )}
    >
      {children}
    </p>
  )
}

export const GameBriefSkeleton = () => {
  return (
    <>
      {/* 1 */}
      <Section className="border-border border-b">
        <Item>
          <Skeleton className="h-6 w-36" />
          <Skeleton className="bg-accent/50 h-6 w-16" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="bg-accent/50 h-6 w-32" />
        </Item>
      </Section>
      {/* 2 */}
      <Section className="border-border border-b">
        <Item>
          <Skeleton className="h-6 w-28" />
          <Skeleton className="bg-accent/50 h-6 w-24" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="bg-accent/50 h-6 w-36" />
        </Item>
      </Section>
      {/* 3 */}
      <Section className="border-border border-b">
        <Item>
          <Skeleton className="h-6 w-12" />
          <Skeleton className="bg-accent/50 h-6 w-24" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-40" />
          <Skeleton className="bg-accent/50 h-6 w-16" />
        </Item>
      </Section>
      {/* 4 */}
      <Section className="border-border border-b">
        <Item>
          <Skeleton className="h-6 w-44" />
          <Skeleton className="bg-accent/50 h-6 w-16" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="bg-accent/50 h-6 w-16" />
        </Item>
      </Section>
      {/* 5 */}
      <Section className="border-border border-b">
        <Item>
          <Skeleton className="xs:w-28 h-6 w-20" />
          <Skeleton className="bg-accent/50 xs:w-48 h-6 w-40" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-28" />
          <Skeleton className="bg-accent/50 h-6 w-16" />
        </Item>
      </Section>
      {/* 6 */}
      <Section>
        <Item>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="bg-accent/50 h-6 w-12" />
        </Item>
        <Item>
          <Skeleton className="h-6 w-16" />
          <Skeleton className="bg-accent/50 h-6 w-12" />
        </Item>
      </Section>
    </>
  )
}
