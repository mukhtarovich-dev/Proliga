'use client'

import { Home, Repeat, Users, Notebook, BarChart2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { TABS } from 'utils/tabs.util'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { selectCurrentTour } from 'lib/features/tour/tour.selector'
import { TOUR_STATUS } from 'utils/tour.util'
import { cn } from 'lib/utils'
import { Link } from 'next-view-transitions'
import { memo, useEffect, useState } from 'react'

const NavLink = ({
  href,
  iconName,
  label,
  className,
  isDisabled,
  isActive,
}) => {
  let IconComponent
  switch (iconName) {
    case TABS.GameProfile:
      IconComponent = Home
      break
    case TABS.Transfer:
      IconComponent = Repeat
      break
    case TABS.Tournament:
      IconComponent = Users
      break
    case TABS.Journal:
      IconComponent = Notebook
      break
    case TABS.Statistics:
      IconComponent = BarChart2
      break
    default:
      IconComponent = Home
  }

  let iconClass = 'size-4.5'
  if (isDisabled) {
    iconClass += ' text-muted-foreground'
  } else if (isActive) {
    iconClass += ' text-sidebar-accent-foreground'
  } else {
    iconClass +=
      ' text-sidebar-foreground  group-hover:text-sidebar-accent-foreground'
  }

  return (
    <Link
      href={isDisabled ? '#' : href}
      onClick={
        isDisabled
          ? (e) => {
              e.preventDefault()
            }
          : undefined
      }
      className={cn(
        'group flex-1 cursor-pointer p-0 text-center no-underline',
        className,
        {
          'pointer-events-none opacity-50': isDisabled,
          'hover:bg-sidebar-accent transition-all hover:rounded-md':
            !isDisabled,
        }
      )}
      aria-disabled={isDisabled}
      aria-label={label}
      tabIndex={isDisabled ? -1 : 0}
    >
      <div
        className={cn(
          'text-sidebar-foreground group-hover:text-sidebar-accent-foreground flex h-16 w-full flex-col items-center justify-center rounded-md p-1',
          className,
          {
            'bg-sidebar-accent text-sidebar-accent-foreground':
              isActive && !isDisabled,
          }
        )}
      >
        <IconComponent className={iconClass} />
        <span className="mt-0.5 text-xs">{label}</span>
      </div>
    </Link>
  )
}

function MobileNavigation() {
  const path = usePathname()
  const { t } = useTranslation()
  const currentTeam = useSelector(selectCurrentTeam)
  const currentTour = useSelector(selectCurrentTour)
  const { lastVisitedTeam } = useSelector((store) => store.currentTeam)
  const [gameTab, setGameTab] = useState('')
  const isTeamViewRoute = path.includes('team-view')

  useEffect(() => {
    const pathLength = path.split('/').length

    if (path.includes('play') && pathLength === 6) {
      Object.keys(TABS).forEach((tab) => {
        if (path.includes(TABS[tab])) {
          setGameTab(TABS[tab])
        }
      })
    } else {
      setGameTab(TABS.GameProfile)
    }
  }, [path])

  const navItems = [
    {
      id: TABS.GameProfile,
      iconName: TABS.GameProfile,
      labelKey: 'Profil',
      tab: TABS.GameProfile,
      disabled: !isTeamViewRoute && !currentTeam?.is_team_created,
    },
    {
      id: TABS.Transfer,
      iconName: TABS.Transfer,
      labelKey: 'Transferlar',
      tab: TABS.Transfer,
      disabled:
        currentTour?.status !== TOUR_STATUS.notStartedTransfer ||
        !currentTeam?.is_team_created ||
        isTeamViewRoute,
    },
    {
      id: TABS.Tournament,
      iconName: TABS.Tournament,
      labelKey: 'Turnir',
      tab: TABS.Tournament,
      disabled: !currentTeam?.is_team_created || isTeamViewRoute,
    },
    {
      id: TABS.Journal,
      iconName: TABS.Journal,
      labelKey: 'Jurnal',
      tab: TABS.Journal,
      disabled: !currentTeam?.is_team_created || isTeamViewRoute,
    },
    {
      id: TABS.Statistics,
      iconName: TABS.Statistics,
      labelKey: 'Statistika',
      tab: TABS.Statistics,
      disabled: !currentTeam?.is_team_created || isTeamViewRoute,
    },
  ]

  return (
    <nav
      className={cn(
        'border-sidebar-border bg-sidebar text-sidebar-foreground fixed inset-x-0 bottom-0 z-50 mx-2 mb-2 flex h-16 items-center justify-between gap-0 overflow-hidden rounded-lg border-t shadow backdrop-blur lg:hidden',
        !lastVisitedTeam && 'hidden'
      )}
    >
      {navItems.map((item) => {
        const correctTab = item.tab !== TABS.GameProfile ? item.tab : ''
        const href = lastVisitedTeam
          ? `/play/${lastVisitedTeam}/${correctTab}`
          : '#'

        return (
          <NavLink
            key={item.id}
            iconName={item.iconName}
            label={t(item.labelKey)}
            href={href}
            isDisabled={item.disabled}
            isActive={gameTab === item.tab}
          />
        )
      })}
    </nav>
  )
}

export default memo(MobileNavigation)
