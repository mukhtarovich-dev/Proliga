'use client'

import { useTranslation } from 'react-i18next'
import { Input } from 'components/ui/input'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTransitionRouter } from 'next-view-transitions'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from 'components/ui/button'
import { Lock, Loader2 } from 'lucide-react'
import { resetPassword } from 'actions/resetPassword.action'
import { useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { Label } from 'components/ui/label'

const ResetPasswordForm = () => {
  const router = useTransitionRouter()
  const params = useSearchParams()
  const phone = decodeURIComponent(params.get('phone')) || ''
  const code = params.get('code') || ''
  const [isPending, startTransition] = useTransition()
  const { t } = useTranslation()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 6 || confirmPassword.length < 6) {
      return toast.warning(t("Parolar 6 ta belgidan kam bo'lmasligi kerak"))
    }
    if (password !== confirmPassword) {
      return toast.warning(t('Parollar mos kelmadi'))
    }

    startTransition(async () => {
      const res = await resetPassword({
        phone,
        code,
        password,
      })

      if (res?.error) {
        return toast.error(t(res.error))
      }
      if (res?.success) {
        toast.success(t("Parolingiz muvaffaqiyatli o'zgartirildi"))
        router.push('/auth')
      }
    })
  }

  useEffect(() => {
    if (!phone || !code) {
      router.push('/auth')
    }
  }, [phone, code, router])

  return (
    <Card className="mx-auto w-full max-w-md px-2 py-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="text-foreground dark:text-primary h-8 w-8" />
          <h1 className="text-2xl font-bold">{t('Parol Yangilash')}</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">{t('Yangi parol')}</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10 border-border bg-input"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="text-muted-foreground size-6" />
                ) : (
                  <Eye className="text-muted-foreground size-6" />
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {t('Yangi parolni qayta kiriting')}
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10 border-border bg-input"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="text-muted-foreground size-6" />
                ) : (
                  <Eye className="text-muted-foreground size-6" />
                )}
              </Button>
            </div>
          </div>
          <Button type="submit" size={'lg'} disabled={isPending}>
            {isPending ? (
              <Loader2 className="text-primary-foreground size-8 animate-spin" />
            ) : (
              t('Parol Yangilash')
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ResetPasswordForm
