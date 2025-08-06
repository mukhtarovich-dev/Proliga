import Gutter from 'components/Gutter'

export default function PackagesLayout({ children }) {
  return (
    <main className="h-full min-h-screen pt-20 pb-4">
      <Gutter>{children}</Gutter>
    </main>
  )
}
