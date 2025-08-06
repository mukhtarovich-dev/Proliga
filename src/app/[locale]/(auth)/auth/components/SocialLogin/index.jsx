import { memo } from 'react'
import GoogleSignIn from './Google'
import YandexSignIn from './Yandex'
import { useTranslation } from 'react-i18next'
function SocialLogin() {
  return (
    <>
      <SocialText />
      <div className="flex gap-1">
        <GoogleSignIn />
        <YandexSignIn />
      </div>
    </>
  )
}

function SocialText() {
  const { t } = useTranslation()
  return (
    <div className="flex items-center py-0.5">
      <span className="border-border grow border-t" />
      <p className="text-muted-foreground px-2 text-sm">
        {t('Or continue with')}
      </p>
      <span className="border-border grow border-t" />
    </div>
  )
}

export default memo(SocialLogin)
