export function GameWrapper({ children }) {
  return (
    <main className="flex w-full flex-col justify-between gap-2 lg:flex-row">
      {children}
    </main>
  )
}
