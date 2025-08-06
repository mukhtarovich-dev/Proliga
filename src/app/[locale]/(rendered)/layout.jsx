import Gutter from 'components/Gutter'

export default function RenderedPageLayout({ children }) {
  return (
    <Gutter>
      <main className="min-h-screen pt-16">{children}</main>
    </Gutter>
  )
}
