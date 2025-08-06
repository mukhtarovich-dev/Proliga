import { Button } from 'components/ui/button'
import { signIn } from 'next-auth/react'
import { SUPABASE_PROVIDERS } from 'lib/supabaseClient'
import { selectUser } from 'lib/features/auth/auth.selector'
import { useSelector } from 'react-redux'
import { FaYandex } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const YandexSignIn = () => {
  const { t } = useTranslation()
  const user = useSelector(selectUser)

  const handleYandexSignIn = async () => {
    if (!user?.id) {
      localStorage.setItem('sign-in-method', SUPABASE_PROVIDERS.YANDEX)
      await signIn('yandex', {
        redirect: true,
        // eslint-disable-next-line no-undef
        redirectTo: process.env.NEXT_PUBLIC_URL + '/auth?success=true',
      })
    }
  }

  return (
    <Button
      onClick={handleYandexSignIn}
      variant="outline"
      className="text-foreground dark:hover:text-accent w-1/2 p-0"
    >
      <FaYandex className="mr-2 size-4 text-[#FC3F1D]" />
      {t('Yandex')}
    </Button>
  )
}

export default YandexSignIn
