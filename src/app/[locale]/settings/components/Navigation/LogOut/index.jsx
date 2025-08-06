'use client'

import { LogOut } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLogOut } from 'hooks/auth/useLogOut'
import { Button } from 'components/ui/button'

const SettingsSidebarLogOut = () => {
  const { logOut } = useLogOut()
  const { t } = useTranslation()

  return (
    <Button
      onClick={logOut}
      variant={'destructive'}
      className="hidden h-10 cursor-pointer lg:mt-auto lg:flex lg:justify-start"
    >
      <LogOut className="size-5" />
      <p className="hidden text-nowrap md:block lg:text-sm">
        {t('Tizimdan chiqish')}
      </p>
    </Button>
  )
}

export default SettingsSidebarLogOut
