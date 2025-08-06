'use client'

import { usePathname } from 'next/navigation'
import { cn } from 'lib/utils'
import { Link } from 'next-view-transitions'
import { ThemeSwitcherSkeleton } from '../SwitcherTheme'
import Gutter from '../../components/Gutter'
import PlayLinks from './Links'
import NavigationDropdown from './Dropdown'
import ChangeLanguageDropdown from '../SwitcherLanguage'
import Notification from '../Notification'
import dynamic from 'next/dynamic'
import MobileNavigation from './Mobile'
import { Skeleton } from 'components/ui/skeleton'
const NavbarLogo = dynamic(() => import('./Logo'), {
  ssr: false,
  loading: () => <Skeleton className="xs:w-32 h-7.5 w-28 md:w-36" />,
})
const ThemeSwitcher = dynamic(() => import('../SwitcherTheme'), {
  ssr: false,
  loading: () => <ThemeSwitcherSkeleton />,
})

const Navbar = () => {
  const path = usePathname()

  return (
    <nav
      className={cn(
        'bg-sidebar border-border fixed top-0 right-0 left-0 z-50 w-screen sm:w-[calc(100vw-1rem)] border-b h-14',
      )}
    >
      <Gutter className="text-foreground flex w-full h-full items-center justify-between">
        <Link
          href={
            path.split('/').includes('championships') ? '/' : '/championships'
          }
        >
          <NavbarLogo />
        </Link>
        <PlayLinks />
        <div className="flex w-max items-center justify-center gap-3 sm:gap-4">
          <ChangeLanguageDropdown />
          <Notification />
          <ThemeSwitcher />
          <NavigationDropdown />
        </div>
      </Gutter>
      <MobileNavigation />
    </nav>
  )
}

export default Navbar
