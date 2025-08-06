'use client'

import { Link } from 'next-view-transitions'
import { useSelector } from 'react-redux'
import { TABS } from 'utils/tabs.util'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { TOUR_STATUS } from 'utils/tour.util'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { selectCurrentTour } from 'lib/features/tour/tour.selector'
import { cn } from 'lib/utils'
import { useEffect, useState } from 'react'

const PlayLinks = () => {
  const path = usePathname()
  const { t } = useTranslation()
  const currentTour = useSelector(selectCurrentTour)
  const currentTeam = useSelector(selectCurrentTeam)
  const { lastVisitedTeam } = useSelector((store) => store.currentTeam)
  const isPlayRoute = path.includes('play')
  const isTeamViewRoute = path.includes('team-view')
  const [gameTab, setGameTab] = useState('')

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

  return (
    <section className="text-foreground hidden items-center gap-4 sm:text-sm lg:flex xl:text-base 2xl:gap-6">
      {lastVisitedTeam && (
        <>
          <TabLink
            title={'Profil'}
            styling={
              isPlayRoute
                ? gameTab === TABS.GameProfile
                  ? ACTIVE
                  : PASSIVE
                : PASSIVE
            }
            disabled={!isTeamViewRoute && !currentTeam?.is_team_created}
            tab={TABS.GameProfile}
            setTab={setGameTab}
          />
          <TabLink
            title={'Transferlar'}
            tab={TABS.Transfer}
            disabled={
              currentTour?.status !== TOUR_STATUS.notStartedTransfer ||
              !currentTeam?.is_team_created ||
              isTeamViewRoute
            }
            styling={
              isPlayRoute
                ? gameTab === TABS.Transfer
                  ? ACTIVE
                  : PASSIVE
                : PASSIVE
            }
            setTab={setGameTab}
          />
          <TabLink
            title={'Turnir'}
            disabled={!currentTeam?.is_team_created || isTeamViewRoute}
            styling={
              isPlayRoute
                ? gameTab === TABS.Tournament
                  ? ACTIVE
                  : PASSIVE
                : PASSIVE
            }
            tab={TABS.Tournament}
            setTab={setGameTab}
          />
          <TabLink
            title={'Jurnal'}
            disabled={!currentTeam?.is_team_created || isTeamViewRoute}
            tab={TABS.Journal}
            styling={
              isPlayRoute
                ? gameTab === TABS.Journal
                  ? ACTIVE
                  : PASSIVE
                : PASSIVE
            }
            setTab={setGameTab}
          />
          <TabLink
            title={'Statistika'}
            tab={TABS.Statistics}
            styling={
              isPlayRoute
                ? gameTab === TABS.Statistics
                  ? ACTIVE
                  : PASSIVE
                : PASSIVE
            }
            disabled={!currentTeam?.is_team_created || isTeamViewRoute}
            setTab={setGameTab}
          />
        </>
      )}
      <Link
        className={cn(
          'hover:text-foreground relative transition-all before:absolute before:-bottom-4',
          'before:bg-accent before:hidden before:h-1 before:w-full before:rounded-md',
          path.includes('championships') ? ACTIVE : PASSIVE
        )}
        href="/championships"
      >
        {t('Chempionatlar')}
      </Link>
      <Link
        className={cn(
          'hover:text-foreground relative transition-all before:absolute before:-bottom-4',
          'before:bg-accent before:hidden before:h-1 before:w-full before:rounded-md',
          path.includes('prizes') ? ACTIVE : PASSIVE
        )}
        href="/prizes"
      >
        {t('Yutuqlar')}
      </Link>
      <Link
        className={cn(
          'hover:text-foreground relative transition-all before:absolute before:-bottom-4',
          'before:bg-accent before:hidden before:h-1 before:w-full before:rounded-md',
          path.includes('regulation') ? ACTIVE : PASSIVE
        )}
        href="/regulation"
      >
        {t('Qoidalar')}
      </Link>
    </section>
  )
}

const TabLink = ({ title, tab, styling, disabled }) => {
  const { lastVisitedTeam } = useSelector((store) => store.currentTeam)
  const { t } = useTranslation()
  const correctTab = tab !== TABS.GameProfile ? tab : ''

  return (
    <Link
      className={cn(
        'relative transition-all before:absolute before:-bottom-4 before:hidden before:h-1',
        'before:bg-accent hover:text-foreground before:w-full before:rounded-md',
        styling,
        disabled && 'pointer-events-none opacity-50'
      )}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault()
        }
      }}
      href={`/play/${lastVisitedTeam}/${correctTab}`}
    >
      {t(title)}
    </Link>
  )
}

const ACTIVE = 'before:block before:bg-primary'
const PASSIVE = 'hover:before:block'

export default PlayLinks
