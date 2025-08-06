'use client'

import { useState, useEffect } from 'react'
import { Button } from 'components/ui/button'
import { useSendOTP } from 'hooks/auth/useSendOTP'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { cn } from 'lib/utils'
import { selectUser } from 'lib/features/auth/auth.selector'
import { RefreshCcw } from 'lucide-react'

export default function ResendOTP() {
  const { sendOTP } = useSendOTP()
  const { t } = useTranslation()
  const user = useSelector(selectUser)
  const [countdown, setCountdown] = useState(60)
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
    await sendOTP({ phone: user?.phone })
    setCountdown(60)
    setIsResendEnabled(false)
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        disabled={!isResendEnabled}
        type="button"
        onClick={handleClick}
        className={cn(
          'h-7 border bg-transparent px-2 text-xs',
          isResendEnabled
            ? 'text-primary hover:text-primary/70'
            : 'text-foreground'
        )}
      >
        <RefreshCcw
          className={cn(
            'mr-1.5 size-5',
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
