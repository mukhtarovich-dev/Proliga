'use client'

import { useState, useEffect } from 'react'
import { WifiOff, RefreshCw } from 'lucide-react'
import { Button } from 'components/ui/button'
import { cn } from 'lib/utils'
import { useTranslation } from 'react-i18next'

export default function OfflineClient() {
  const { t } = useTranslation()
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.documentElement.classList.add('dark')
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const attemptReconnect = () => {
    window.location.reload()
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-8 text-center">
      <div className="flex justify-center">
        <div
          className={cn('rounded-full bg-neutral-200 p-6 dark:bg-neutral-800')}
        >
          <WifiOff
            className={cn(
              'h-16 w-16',
              isOnline
                ? 'text-gray-400 dark:text-gray-600'
                : 'text-red-500 dark:text-red-400'
            )}
          />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {t("You're Offline")}
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        {t(
          "It seems you've lost your internet connection. Check your network and try again."
        )}
      </p>
      <div className="pt-4">
        <Button
          onClick={attemptReconnect}
          className={cn(
            'rounded-lg bg-red-500 px-6 py-2 font-medium text-white',
            'capitalize transition-all hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
          )}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          {t('try again')}
        </Button>
      </div>
    </div>
  )
}
