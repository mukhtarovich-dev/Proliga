'use client'

import { useEffect, useState, useTransition, useMemo } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from 'components/ui/dialog'
import { Button } from 'components/ui/button'
import { PhoneInput } from 'components/PhoneInput'
import { Label } from 'components/ui/label'
import { Loader2, Mail } from 'lucide-react'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setPhoneModal } from 'lib/features/auth/auth.slice'
import {
  selectAgent,
  selectGeo,
  selectUser,
} from 'lib/features/auth/auth.selector'
import { toast } from 'sonner'
import { selectSystemConfig } from 'lib/features/systemConfig/systemConfig.selector'
import { CONFIG_KEY } from 'utils/config.util'
import { Input } from 'components/ui/input'
import { useSetUserCredentials } from 'hooks/auth/useSetUserCredentials'
import { useSession } from 'next-auth/react'

function SetUserCredentials() {
  const dispatch = useDispatch()
  const { phoneModal, fingerprint } = useSelector((store) => store.auth)
  const { t } = useTranslation()
  const { data: session } = useSession()
  const user = useSelector(selectUser)
  const agent = useSelector(selectAgent)
  const geo = useSelector(selectGeo)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const { setUserCredentials, isLoading: tableLoading } =
    useSetUserCredentials()
  const config = useSelector(selectSystemConfig)
  const app_version = config[CONFIG_KEY.app_version]?.value || ''
  const [isPending, startTransition] = useTransition()

  const isLoading = useMemo(
    () => isPending || tableLoading,
    [isPending, tableLoading]
  )

  const setModalOpen = () => {
    user?.phone && user?.email && dispatch(setPhoneModal(false))
  }

  useEffect(() => {
    if (session?.user) {
      setPhone(session?.user?.phone || '')
      setEmail(session?.user?.email || '')
    }
  }, [session?.user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !phone) {
      return toast.error(t("Barcha maydonlar to'ldirilishi shart"))
    }
    if (!user?.id) {
      return toast.warning(t('Please login first'))
    }
    startTransition(async () => {
      await setUserCredentials({
        email,
        phone,
        user,
        agent,
        geo,
        fingerprint,
        cb: () => {
          localStorage.removeItem('sign-in-method')
          localStorage.setItem('app_version', app_version)
          dispatch(setPhoneModal(false))
        },
      })
    })
  }

  return (
    <Dialog open={user?.id && phoneModal} onOpenChange={setModalOpen}>
      <DialogContent
        showCloseButton={false}
        className="bg-background text-foreground w-[98%] max-w-md rounded-xl p-5 sm:p-6"
      >
        <DialogTitle>{t('Enter your credentials.')}</DialogTitle>
        <DialogDescription>
          {t(
            'To complete your registration, please link your credentials with your account. This step is mandatory.'
          )}
        </DialogDescription>
        <form onSubmit={handleSubmit} className="space-y-4">
          <section className="space-y-2">
            <div className="relative space-y-1">
              <Label htmlFor="set-phone">{t('Telefon raqam')}:</Label>
              <PhoneInput
                id="set-phone"
                name="phone"
                placeholder={'99-999-99-99'}
                defaultCountry="UZ"
                className="bg-background text-foreground border-border placeholder:text-muted-foreground h-10"
                value={phone}
                onChange={setPhone}
              />
            </div>
            <div className="relative space-y-1">
              <Label htmlFor="email">{t('Elektron pochta')}:</Label>
              <Input
                type="email"
                name="email"
                id="email"
                className="bg-background text-foreground border-border placeholder:text-muted-foreground h-10 rounded-sm pl-10"
                placeholder="example@xyz.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="filter-neutral-400 absolute bottom-2.5 left-2 size-5" />
            </div>
          </section>
          <Button
            type="submit"
            className="border-primary text-foreground hover:bg-background bg-background h-10 w-full rounded-sm border transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="size-6 animate-spin" />
            ) : (
              t('Tasdiqlash')
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default memo(SetUserCredentials)
