'use client'

import ForgotPassword from '../ForgotPassword'
import SocialLogin from '../SocialLogin'
import { toast } from 'sonner'
import { useState, memo, useTransition } from 'react'
import { useSelector } from 'react-redux'
import { PhoneInput } from 'components/PhoneInput'
import { useTranslation } from 'react-i18next'
import { CONFIG_KEY } from 'utils/config.util'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { Button } from 'components/ui/button'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { cn } from 'lib/utils'
import { selectSystemConfig } from 'lib/features/systemConfig/systemConfig.selector'
import { selectAgent, selectGeo } from 'lib/features/auth/auth.selector'
import { login } from 'actions/login.action'
import { useSession } from 'next-auth/react'
import { useSendOTP } from 'hooks/auth/useSendOTP'
import { Loader2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from 'components/ui/card'

const LoginForm = ({ setShouldRedirect }) => {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const config = useSelector(selectSystemConfig)
  const { fingerprint } = useSelector((store) => store.auth)
  const agent = useSelector(selectAgent)
  const geo = useSelector(selectGeo)
  const { sendOTP } = useSendOTP()
  const [isPending, startTransition] = useTransition()
  const { update } = useSession()

  const can_send_sms =
    config[CONFIG_KEY.can_send_sms]?.value.toLowerCase() === 'true' || false
  const app_version = config[CONFIG_KEY.app_version]?.value || ''

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!phone || !password) {
      toast.error(t("Barcha maydonlar to'ldirilishi shart"))
      return
    }

    if (password.length < 6) {
      toast.error(t("Parol 6 ta belgidan kam bo'lmasligi kerak"))
      return
    }
    startTransition(async () => {
      try {
        localStorage.setItem('sign-in-method', 'credentials')

        const res = await login({
          phone,
          password,
          data: {
            geo,
            agent,
            fingerprint,
          },
        })

        if (res?.error) {
          toast.error(t(res.error))
          return
        }

        const { phone_verified, success, user, phone: phone_number } = res

        if (success) {
          await update({
            ...user,
          })

          localStorage.setItem('app_version', app_version)

          if (!phone_verified && !!phone_number) {
            return await sendOTP({
              phone,
              shouldRedirect: true,
              redirectTo: `/confirm-otp?redirect=/championships&phone=${encodeURIComponent(phone_number)}`,
              cb: () =>
                toast.info(
                  t('We are redirecting you to an sms confirmation page!')
                ),
            })
          }
          localStorage.removeItem('sign-in-method')
          toast.success(t('Tizimga muvaffaqiyatli kirdingiz'))
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error(t('An unknown error occurred'))
      }
    })
  }

  const handleForgotPasword = () => {
    if (can_send_sms) {
      setModalOpen(true)
    } else {
      toast.warning(
        'SMS Services have been turned off! Sorry for inconvenience'
      )
    }
  }

  return (
    <Card className={'dark:bg-card/70 border-foreground/50'}>
      <CardHeader>
        <CardTitle className="text-foreground text-xl font-bold md:text-2xl">
          {t('Tizimga kirish_1')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2">
          <div className="relative flex flex-col gap-1">
            <Label htmlFor="phone" className="text-xs md:text-base">
              {t('Telefon raqam')}:
            </Label>
            <PhoneInput
              id="phone"
              name="phone"
              placeholder={t('99-999-99-99')}
              defaultCountry="UZ"
              className="text-foreground border-foreground/20 placeholder:text-muted h-10 rounded border"
              value={phone}
              onChange={setPhone}
              autoComplete="tel"
            />
          </div>
          <div className="relative flex flex-col gap-1">
            <Label htmlFor="password" className="text-xs md:text-base">
              {t('Parol')}:
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="********"
                className="bg-input/80 text-foreground border-foreground/20 rounded pl-9"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <Lock className="text-muted-foreground absolute top-1/2 left-2 size-5 -translate-y-1/2" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="hover:bg-foreground/10 dark:hover:bg-foreground/10 absolute top-0 right-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="text-muted-foreground hover:text-foreground size-6" />
                ) : (
                  <Eye className="text-muted-foreground hover:text-foreground size-6" />
                )}
              </Button>
            </div>
          </div>
          <Button
            type="button"
            variant="link"
            className="hover:text-foreground text-muted-foreground self-start p-0"
            onClick={handleForgotPasword}
          >
            {t('Parolingizni unutingizmi?')}
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            variant="outline"
            className={cn(
              'text-foreground dark:border-accent/80 dark:hover:border-accent border-accent hover:bg-accent dark:hover:text-accent',
              'h-12 w-full font-bold transition-all duration-300',
              isPending && 'bg-accent text-accent-foreground'
            )}
          >
            {isPending ? (
              <Loader2 className="text-foreground mx-auto size-6 animate-spin" />
            ) : (
              t('Tizimga kirish_2')
            )}
          </Button>
        </form>
        <SocialLogin setShouldRedirect={setShouldRedirect} />
        <ForgotPassword isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
      </CardContent>
    </Card>
  )
}

export default memo(LoginForm)
