import { Skeleton } from 'components/ui/skeleton'
import { Card, CardHeader, CardTitle, CardContent } from 'components/ui/card'

const AuthSkeleton = () => {
  return (
    <section className="mx-4 mt-24 mb-8 flex w-full max-w-md flex-col gap-4 sm:mx-0 2xl:mt-32">
      <AuthTabsSkeleton />
      <LoginFormSkeleton />
    </section>
  )
}

export const LoginFormSkeleton = () => {
  return (
    <Card className="dark:bg-card/70 border-foreground/50">
      <CardHeader>
        <CardTitle className="text-foreground mb-4 text-xl font-bold md:mb-4 md:text-2xl">
          <Skeleton className="h-8 w-3/4" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex w-full flex-col gap-2">
          <div className="relative flex flex-col gap-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full rounded" />
          </div>
          <div className="relative flex flex-col gap-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full rounded" />
          </div>
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-12 w-full rounded" />
        </div>
        <div className="space-y-4">
          <Skeleton className="mx-auto h-5 w-1/2" />
          <div className="flex justify-between gap-2">
            <Skeleton className="h-10 w-1/2 rounded" />
            <Skeleton className="h-10 w-1/2 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const SignUpFormSkeleton = () => {
  return (
    <Card className="dark:bg-card/70 border-foreground/50">
      <CardHeader>
        <CardTitle className="text-foreground mb-4 text-xl font-bold md:mb-4 md:text-2xl">
          <Skeleton className="h-8 w-3/4" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex w-full flex-col gap-2">
          <div className="relative flex flex-col gap-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full rounded" />
          </div>
          <div className="relative flex flex-col gap-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full rounded" />
          </div>
          <div className="relative flex flex-col gap-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full rounded" />
          </div>
          <div className="relative flex flex-col gap-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-10 w-full rounded" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-5/6" />
          </div>
          <Skeleton className="h-12 w-full rounded" />
        </div>
        <div className="space-y-4">
          <Skeleton className="mx-auto h-5 w-1/2" />
          <div className="flex justify-between gap-2">
            <Skeleton className="h-10 w-1/2 rounded" />
            <Skeleton className="h-10 w-1/2 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export const AuthTabsSkeleton = () => {
  return (
    <div className="bg-card/50 flex gap-1 rounded p-1">
      <Skeleton className="h-8 flex-1 rounded" />
      <Skeleton className="h-8 flex-1 rounded" />
    </div>
  )
}

export default AuthSkeleton
