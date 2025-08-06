'use client'

import { useState } from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from 'components/ui/input-otp'
import ResendOTPBox from '../ResendOTPBox'
import { useTranslation } from 'react-i18next'
import { useConfirmOTP } from 'hooks/auth/useConfirmOTP'
import { Button } from 'components/ui/button'
import { Loader2, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { Label } from 'components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { Input } from 'components/ui/input'

const ConfirmOTPForm = ({ redirect, phone }) => {
  const { t } = useTranslation()
  const [code, setCode] = useState('')
  const { confirmOTP, isLoading } = useConfirmOTP()

  const handleConfirm = async (e) => {
    e.preventDefault()

    if (code.length !== 6) {
      toast.warning('Kod 6 ta harf bolishi shart!')
      return
    }

    await confirmOTP({
      code,
      phone,
      shouldRedirect: true,
      redirectTo: redirect + `?phone=${encodeURIComponent(phone)}&code=${code}`,
    })
    setCode('')
  }

  return (
    <Card className="mx-auto w-full max-w-md px-2 py-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="text-foreground dark:text-primary h-8 w-8" />
          <h1 className="text-2xl font-bold">{t('SMS Kod Tasdiqlash')}</h1>
        </CardTitle>
      </CardHeader>
      <CardContent className={'p-4'}>
        <form onSubmit={handleConfirm} className="flex flex-col gap-3">
          <div className="space-y-2">
            <Label htmlFor="phone">{t('Telefon raqam')}:</Label>
            <Input
              id="phone"
              className="h-10 border-border"
              value={phone}
              disabled
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="otp">{t('Tasdiqlash kodini kiriting.')}</Label>
            <InputOTP
              maxLength={6}
              value={code}
              onChange={(value) => setCode(value)}
              id="otp"
            >
              <InputOTPGroup className="w-full justify-between">
                <InputOTPSlot index={0} className="size-10 rounded-md border-border" />
                <InputOTPSlot index={1} className="size-10 rounded-md border-border" />
                <InputOTPSlot index={2} className="size-10 rounded-md border-border" />
                <InputOTPSlot index={3} className="size-10 rounded-md border-border" />
                <InputOTPSlot index={4} className="size-10 rounded-md border-border" />
                <InputOTPSlot index={5} className="size-10 rounded-md border-border" />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <ResendOTPBox phone={phone} />
          <Button type="submit" size={'lg'} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="text-primary-foreground size-8 animate-spin" />
            ) : (
              t('Tasdiqlash')
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ConfirmOTPForm
