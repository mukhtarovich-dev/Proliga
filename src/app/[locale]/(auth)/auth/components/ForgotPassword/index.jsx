'use client'

import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogDescription,
} from 'components/ui/dialog'
import { PhoneInput } from 'components/PhoneInput'
import { useSendOTP } from 'hooks/auth/useSendOTP'
import { useGetUserPhone } from 'hooks/user/useGetUserPhone'
import { memo } from 'react'
import { Button } from 'components/ui/button'
import { Label } from 'components/ui/label'
import { Loader } from 'lucide-react'

const ForgotPassword = ({ isModalOpen, setModalOpen }) => {
  const { t } = useTranslation()
  const [phone, setPhone] = useState('')
  const { isLoading: sendLoading } = useSendOTP()
  const { getUserPhone, isLoading: tableLoading } = useGetUserPhone()

  const isLoading = useMemo(
    () => sendLoading || tableLoading,
    [sendLoading, tableLoading]
  )

  const handleConfirm = async (e) => {
    e.preventDefault()

    if (!phone) {
      return toast.error(t('Telefon raqam kiritilmagan'))
    }

    await getUserPhone({
      phone,
    })
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="bg-background text-foreground w-[98%] max-w-md rounded-xl px-4 py-6 sm:p-6">
        <DialogTitle>{t('Parolingizni unutingizmi?')}</DialogTitle>
        <DialogDescription>
          {t(
            'To reset your password, please enter the OTP sent to your mobile phone. This step is required for security verification.'
          )}
        </DialogDescription>
        <form onSubmit={handleConfirm} className="space-y-4">
          <div className="relative space-y-1">
            <Label htmlFor="enter-phone">{t('Telefon raqam')}:</Label>
            <PhoneInput
              id="enter-phone"
              name="phone"
              placeholder={t('Telefon raqam')}
              defaultCountry="UZ"
              className="placeholder:text-muted-foreground h-10"
              value={phone}
              onChange={setPhone}
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="border-primary hover:bg-background bg-background text-foreground h-10 w-full rounded-sm border transition-all"
          >
            {isLoading ? (
              <Loader className="mx-auto size-5 animate-spin" />
            ) : (
              t('Parolni tiklash')
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default memo(ForgotPassword)
