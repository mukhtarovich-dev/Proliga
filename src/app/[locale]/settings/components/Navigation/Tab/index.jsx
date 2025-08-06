'use client'

import { useTranslation } from 'react-i18next'
import { cn } from 'lib/utils'
import { Shield, User, Cog, Banknote } from 'lucide-react'
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation'

const SettingsNavigationTab = ({ tab }) => {
  const pathname = usePathname()

  const { t } = useTranslation()
  const active = 'text-foreground dark:text-primary'
  const passive = 'text-muted-foreground'
  const containerActive = 'bg-accent/75 dark:bg-secondary'
  const containerPassive =
    'bg-transparent hover:bg-accent/50 dark:hover:bg-secondary/50'
  const isActive = pathname.endsWith(tab.href)

  const renderIcon = (type) => {
    switch (type) {
      case 'User':
        return <User className={cn('size-6', isActive ? active : passive)} />
      case 'Cog':
        return <Cog className={cn('size-6', isActive ? active : passive)} />
      case 'Banknote':
        return (
          <Banknote className={cn('size-6', isActive ? active : passive)} />
        )
      case 'Shield':
        return <Shield className={cn('size-6', isActive ? active : passive)} />
      default:
        return null
    }
  }

  return (
    <Link
      href={tab.href}
      className={cn(
        'flex w-full cursor-pointer items-center justify-center gap-2 lg:justify-start',
        'hover:bg-card rounded-md p-2 transition-all lg:w-auto',
        isActive ? containerActive : containerPassive
      )}
    >
      {renderIcon(tab.icon)}
      <div
        className={cn(
          'hidden select-none md:block lg:text-sm',
          isActive ? active : passive
        )}
      >
        {t(tab.title)}
      </div>
    </Link>
  )
}

export default SettingsNavigationTab
