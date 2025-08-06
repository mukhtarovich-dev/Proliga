import AuthSkeleton from './components/Skeleton'

export default function Loading() {
  return (
    <main className="flex min-h-screen w-full justify-center">
      <AuthSkeleton />
    </main>
  )
}
