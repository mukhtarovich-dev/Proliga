import Gutter from 'components/Gutter'
import Image from 'next/image'
import SettingsNavigation from './components/Navigation'
import { Card, CardContent } from 'components/ui/card'

export default function SettingsLayout({ children }) {
  return (
    <main className="relative min-h-svh overflow-hidden bg-linear-to-tr pt-18 pb-4 md:min-h-max">
      <div aria-hidden="true" className="absolute inset-0 z-0 h-full w-full">
        <Image
          src="/images/Hero.webp"
          alt="Hero background"
          fill
          priority
          className="animate-in fade-in object-cover duration-500"
          quality={100}
        />
        <div className="animate-in fade-in absolute inset-0 bg-black/30 duration-500 dark:bg-black/60" />
      </div>
      <Gutter mobileFriendly>
        <main className="flex h-full min-h-176 flex-col gap-2 lg:min-h-152 lg:flex-row">
          <SettingsNavigation />
          <Card className={'w-full'}>
            <CardContent className={'flex flex-col gap-2'}>
              {children}
            </CardContent>
          </Card>
        </main>
      </Gutter>
    </main>
  )
}
