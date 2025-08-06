'use client'

import { Link } from 'next-view-transitions'
import { useState, useTransition } from 'react'
import { useSelector } from 'react-redux'
import { PhoneInput } from 'components/PhoneInput'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { CONFIG_KEY } from 'utils/config.util'
import { Button } from 'components/ui/button'
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react'
import { selectAgent, selectGeo } from 'lib/features/auth/auth.selector'
import { isEmail } from 'validator'
import { cn } from 'lib/utils'
import { memo } from 'react'
import { selectSystemConfig } from 'lib/features/systemConfig/systemConfig.selector'
import SocialLogin from '../SocialLogin'
import { Input } from 'components/ui/input'
import { useSession } from 'next-auth/react'
import { useSendOTP } from 'hooks/auth/useSendOTP'
import { register } from 'actions/register.action'
import { Card, CardHeader, CardTitle, CardContent } from 'components/ui/card'
import { Label } from 'components/ui/label'
import { Checkbox } from 'components/ui/checkbox'

const SignUpForm = ({ setShouldRedirect }) => {
  const { t } = useTranslation()
  const { update } = useSession()
  const { fingerprint } = useSelector((store) => store.auth)
  const geo = useSelector(selectGeo)
  const agent = useSelector(selectAgent)
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [agreement, setAgreement] = useState(false)
  const config = useSelector(selectSystemConfig)
  const app_version = config[CONFIG_KEY.app_version]?.value ?? ''
  const { sendOTP } = useSendOTP()

  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!agreement) {
      return toast.error(t('Iltimos qoidalarga rozilik berin'))
    }
    if (!email || !password || !confirmPassword) {
      return toast.error(t("Barcha maydonlar to'ldirilishi shart"))
    }
    if (!isEmail(email)) {
      return toast.error(t('Your email is incorrect.'))
    }
    if (password !== confirmPassword) {
      return toast.error(t('Parollar mos kelmadi'))
    }
    if (password.length < 6) {
      return toast.error(t("Parol 6 ta belgidan kam bo'lmasligi kerak"))
    }
    if (phone.slice(0, 4) !== '+998') {
      return toast.error(t("Phone number must start with '+998'."))
    }
    if (phone.length !== 13) {
      return toast.error(t("Telefon raqam noto'g'ri"))
    }
    localStorage.setItem('sign-in-method', 'sign-up')
    startTransition(async () => {
      try {
        const res = await register({
          email,
          phone,
          password,
          passwordConfirmation: confirmPassword,
          data: {
            geo,
            agent,
            fingerprint,
          },
        })

        if (res?.error) {
          return toast.error(t(res.error))
        }
        const { phone_verified, success } = res

        if (success) {
          await update({ phone_verified })
          localStorage.setItem('app_version', app_version)

          if (!phone_verified && res?.phone) {
            toast.info(t('We are redirecting you to an sms confirmation page!'))
            await sendOTP({
              phone,
              shouldRedirect: true,
              redirectTo: `/confirm-otp?redirect=/championships&phone=${encodeURIComponent(res.phone)}`,
            })
          }
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error(t('An unknown error occurred'))
      }
    })
  }

  return (
    <Card className="dark:bg-card/70 border-foreground/50">
      <CardHeader>
        <CardTitle className="text-foreground text-xl font-bold md:text-2xl">
          {t("Ro'yxatdan o'tish")}
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
            />
          </div>
          <div className="relative flex flex-col gap-1">
            <Label htmlFor="email" className="text-xs md:text-base">
              {t('Elektron pochta')}:
            </Label>
            <div className="relative">
              <Input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="bg-input/80 text-foreground border-foreground/20 rounded pl-9"
                placeholder="example@xyz.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="text-muted-foreground absolute top-1/2 left-2 size-5 -translate-y-1/2" />
            </div>
          </div>
          <div className="relative flex flex-col gap-1">
            <Label htmlFor="confirmPassword" className="text-xs md:text-base">
              {t('Parol')}:
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                autoComplete="new-password"
                id="confirmPassword"
                placeholder="********"
                className="bg-input/80 text-foreground border-foreground/20 rounded pl-9"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          <div className="relative flex flex-col gap-1">
            <Label htmlFor="password" className="text-xs md:text-base">
              {t('Parol tasdiqlash')}:
            </Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                name="password"
                id="password"
                placeholder="********"
                autoComplete="new-password"
                className="bg-input/80 text-foreground border-foreground/20 rounded pl-9"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Lock className="text-muted-foreground absolute top-1/2 left-2 size-5 -translate-y-1/2" />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="hover:bg-foreground/10 dark:hover:bg-foreground/10 absolute top-0 right-0"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="text-muted-foreground hover:text-foreground size-6" />
                ) : (
                  <Eye className="text-muted-foreground hover:text-foreground size-6" />
                )}
              </Button>
            </div>
          </div>
          <div className="text-foreground my-2 flex items-center gap-2 text-xs sm:text-sm">
            <Checkbox
              id="agreement"
              checked={agreement}
              onCheckedChange={(checked) => setAgreement(checked)}
              className={'border-foreground/20 bg-background'}
            />
            <Label
              htmlFor="agreement"
              className="text-muted-foreground cursor-pointer select-none"
            >
              {t('Men')}{' '}
              <Link href="/user-agreement" className="underline">
                {t('qoidalar')}
              </Link>{' '}
              {t('bilan tanishib chiqdim va ularga roziman')}
            </Label>
          </div>
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
              t('Akkaunt Ochish')
            )}
          </Button>
        </form>
        <SocialLogin setShouldRedirect={setShouldRedirect} />
      </CardContent>
    </Card>
  )
}

export default memo(SignUpForm)
