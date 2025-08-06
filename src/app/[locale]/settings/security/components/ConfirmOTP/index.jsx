'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InputOTP, InputOTPGroup, InputOTPSlot } from 'components/ui/input-otp'
import {
  DialogContent,
  DialogTitle,
  Dialog,
  DialogDescription,
} from 'components/ui/dialog'
import { useConfirmOTP } from 'hooks/auth/useConfirmOTP'
import { useSelector } from 'react-redux'
import ResendOTP from './ResendOTP'
import { useSendOTP } from 'hooks/auth/useSendOTP'
import { Button } from 'components/ui/button'
import { toast } from 'sonner'
import { selectUser } from 'lib/features/auth/auth.selector'
import { Loader2 } from 'lucide-react'

const ConfirmOTPModal = ({
  isModalOpen,
  setModalOpen,
  cb = () => {},
  defaultHook = true,
  phone,
  is_update = false,
}) => {
  const [code, setCode] = useState('')
  const { t } = useTranslation()
  const { confirmOTP, isLoading: confirmLoading } = useConfirmOTP()
  const { isLoading: sendLoading } = useSendOTP()
  const user = useSelector(selectUser)

  const isLoading = confirmLoading || sendLoading

  const handleConfirm = async (e) => {
    e.preventDefault()

    if (code.length !== 6) {
      toast.warning('Kod 6 ta harf bolishi shart!')
      return
    }
    if (defaultHook) {
      await confirmOTP({
        code,
        guid: user?.guid,
        phone,
        is_update,
        cb: () => {
          setCode('')
          setModalOpen(false)
          cb(true)
        },
      })
    } else {
      cb(code)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="bg-background text-foreground w-[90vw] max-w-sm rounded-2xl p-6 shadow-lg">
        <form
          onSubmit={handleConfirm}
          className="flex flex-col items-stretch gap-6"
        >
          <div>
            <DialogTitle className="text-lg font-semibold tracking-tight">
              {t('SMS Kod Tasdiqlash')}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-1 text-sm">
              {t('Telefon raqamingizga yuborilgan 6 xonali kodni kiriting.')}
            </DialogDescription>
          </div>

          <InputOTP
            maxLength={6}
            value={code}
            onChange={(value) => setCode(value)}
            className="flex items-center gap-2"
          >
            <InputOTPGroup className="w-full gap-2 lg:justify-between">
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="border-border focus:ring-primary h-12 w-10 rounded-md border text-center text-lg font-medium focus:ring-2"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>

          <ResendOTP />

          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 w-full rounded-md font-medium transition"
          >
            {isLoading ? (
              <Loader2 className="text-primary-foreground size-5 animate-spin" />
            ) : (
              t('Tasdiqlash')
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmOTPModal
