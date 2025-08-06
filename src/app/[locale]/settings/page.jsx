'use client'

import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { selectUser } from 'lib/features/auth/auth.selector'
import { formatDate } from 'utils/formatDate.util'
import { Phone, CalendarDays, UsersRound } from 'lucide-react'
import RefillBalance from './components/RefillBalance'
import Avatar from 'shared/Avatar'
import { getUrl } from 'utils/static.util'
import { Copy } from 'lucide-react'
import NotificationToggle from './components/NotificationToggle'
import ThemeCustomizer from './components/ThemeCustomizer'
import DeleteUser from './components/DeleteUser'

const SettingsProfile = () => {
  const { t } = useTranslation()
  const user = useSelector(selectUser)

  const getCorrectGenderText = (gender) => {
    switch (gender) {
      case 'male':
        return t('Erkak')
      case 'female':
        return t('Ayol')
      default:
        return t('Belgilanmagan')
    }
  }

  const handleClick = (value) => {
    navigator.clipboard.writeText(value)
    toast.info(t('Buferga muvaffaqiyatli nusxalandi!'))
  }

  return (
    <>
      <h3 className="text-foreground text-xl font-bold tracking-tight">
        {t('Profil')}
      </h3>
      <div className="flex flex-wrap items-center gap-4">
        <Avatar
          src={getUrl(user?.image)}
          className={
            'size-24 rounded-xl border bg-transparent object-cover object-top transition-all duration-1000 ease-in-out hover:object-bottom'
          }
        />
        <div className="flex flex-col justify-center">
          <div className="text-foreground xs:max-w-64 flex gap-1 text-lg font-bold capitalize md:max-w-96">
            {user?.name && <p className="truncate">{user?.name}</p>}
            {user?.last_name && (
              <>
                <p className="truncate lg:hidden">
                  {user?.last_name.slice(0, 1) + '.'}
                </p>
                <p className="hidden truncate lg:block">{user?.last_name}</p>
              </>
            )}
            {user?.middle_name && (
              <>
                <p className="truncate lg:hidden">
                  {user?.middle_name.slice(0, 1) + '.'}
                </p>
                <p className="hidden truncate lg:block">{user?.middle_name}</p>
              </>
            )}
            {!user?.name && !user?.last_name && !user?.middle_name && (
              <p className="truncate">{t('Sizning Ismingiz')}</p>
            )}
          </div>
          <span className="text-muted-foreground text-sm">{user?.email}</span>
        </div>
        <div className="ml-auto flex items-center justify-center gap-2 px-0 py-0 text-sm">
          <p className="text-muted-foreground block">
            {t('Foydalanuvchi ID-si')}
          </p>
          <div
            className="bg-primary hover:bg-accent border-border text-accent-foreground flex cursor-pointer items-center justify-center gap-1 rounded-md border px-2 py-1 text-base font-medium transition-all"
            onClick={() => handleClick(user?.id)}
          >
            <Copy className="text-accent-foreground size-4" />
            {user?.id}
          </div>
        </div>
      </div>
      <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        <ProfileItem>
          <div className="flex items-center gap-2 capitalize">
            <Phone className="text-foreground size-5" />
            <p className="text-muted-foreground text-sm font-medium">
              {t('Telefon raqam')}:
            </p>
          </div>
          <p className="text-foreground text-sm">{user?.phone}</p>
        </ProfileItem>
        <ProfileItem>
          <div className="flex items-center gap-2 capitalize">
            <CalendarDays className="text-foreground size-5" />
            <p className="text-muted-foreground text-sm font-medium">
              {t("Tug'ilgan kuni")}:
            </p>
          </div>
          <p className="text-foreground text-sm">
            {user?.birth_date && formatDate(user?.birth_date, 'news')}
          </p>
        </ProfileItem>
        <ProfileItem>
          <div className="flex items-center gap-2 capitalize">
            <UsersRound className="text-foreground size-5" />
            <p className="text-muted-foreground text-sm font-medium">
              {t('Jins')}:
            </p>
          </div>
          <p className="text-foreground text-sm">
            {getCorrectGenderText(user?.gender)}
          </p>
        </ProfileItem>
      </section>
      <div className="bg-card border-border text-foreground/80 line-clamp-5 h-28 max-w-full overflow-y-scroll rounded-lg border p-2 text-sm text-wrap break-words shadow md:p-4">
        {user?.bio ? user?.bio : t("Ma'lumot yo'q")}
      </div>
      <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <RefillBalance />
        <NotificationToggle />
        <ThemeCustomizer />
        <DeleteUser />
      </section>
    </>
  )
}

const ProfileItem = ({ children }) => {
  return (
    <div className="bg-card border-border flex items-center gap-2 rounded-lg border p-2 shadow xl:p-4">
      {children}
    </div>
  )
}

export default SettingsProfile
