'use client'

import { useState, useEffect } from 'react'
import { Button } from 'components/ui/button'
import { useSendOTP } from 'hooks/auth/useSendOTP'
import { useTranslation } from 'react-i18next'
import { cn } from 'lib/utils'
import { RefreshCcw } from 'lucide-react'

export default function ResendOTPBox({ phone, className }) {
  const { sendOTP } = useSendOTP()
  const { t } = useTranslation()
  const [countdown, setCountdown] = useState(45)
  const [isResendEnabled, setIsResendEnabled] = useState(false)

  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    } else {
      setIsResendEnabled(true)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  const handleClick = async () => {
    await sendOTP({ phone })
    setCountdown(60)
    setIsResendEnabled(false)
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        disabled={!isResendEnabled}
        type="button"
        onClick={handleClick}
        className={cn(
          'h-7 border bg-transparent px-2 text-xs',
          isResendEnabled
            ? 'text-primary hover:text-primary/70'
            : 'text-muted-foreground'
        )}
      >
        <RefreshCcw
          className={cn(
            'mr-1.5 size-4',
            isResendEnabled ? 'text-primary' : 'text-muted-foreground'
          )}
        />
        {t('Qayta jo‘natish')}
      </Button>
      {!isResendEnabled && (
        <div className="text-secondary-foreground text-sm">{countdown}s</div>
      )}
    </div>
  )
}
