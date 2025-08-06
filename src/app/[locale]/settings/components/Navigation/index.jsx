import SettingsNavigationTab from './Tab'
import SettingsSidebarLogOut from './LogOut'
import { Card, CardContent } from 'components/ui/card'

const SettingsNavigation = ({ setTab, currentTab }) => {
  return (
    <Card className="fade-in animate-in w-full flex-row p-4 backdrop-blur-sm duration-300 lg:w-80 lg:flex-col lg:justify-between">
      <CardContent
        className={'flex h-full w-full flex-row px-0 lg:flex-col lg:gap-1'}
      >
        {SETTINGS_TABS.map((tab) => (
          <SettingsNavigationTab
            key={tab.href}
            setTab={setTab}
            tab={tab}
            currentTab={currentTab}
          />
        ))}
        <SettingsSidebarLogOut />
      </CardContent>
    </Card>
  )
}

const SETTINGS_TABS = [
  {
    title: 'Profil',
    icon: 'User',
    href: '/settings',
  },
  {
    title: 'Sozlamalar',
    icon: 'Cog',
    href: '/settings/general',
  },

  {
    title: 'Xarajatlar',
    icon: 'Banknote',
    href: '/settings/transactions',
  },
  {
    title: 'Security',
    icon: 'Shield',
    href: '/settings/security',
  },
]

export default SettingsNavigation
