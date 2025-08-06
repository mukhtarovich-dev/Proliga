'use client'

import { cn } from 'lib/utils'
import { useTranslation } from 'react-i18next'
import ChangePasswordForm from './components/ChangePasswordForm'
import ChangePhoneForm from './components/ChangePhoneForm'
import { Separator } from 'components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'

export default function SettingsPage() {
  const { t } = useTranslation()

  return (
    <>
      <section className="flex flex-col gap-4 lg:flex-row">
        <Card className={'border-border w-full'}>
          <CardHeader>
            <CardTitle className={cn('mb-2 text-lg font-bold')}>
              {t('Parol Yangilash')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        </Card>
        <Separator className="my-4 lg:hidden" />
        <Card className={'border-border w-full'}>
          <CardHeader>
            <CardTitle className={cn('mb-2 text-lg font-bold')}>
              {t('Update Phone Number')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChangePhoneForm />
          </CardContent>
        </Card>
      </section>
    </>
  )
}
