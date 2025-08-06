import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useTransitionRouter } from 'next-view-transitions'

export const useBuyPackageWithClick = () => {
  const { t } = useTranslation()
  const router = useTransitionRouter()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const buyPackageWithClick = useCallback(
    ({ user, currentPackage, currentTeam }) => {
      // eslint-disable-next-line no-undef
      const SERVICE_ID = process.env.NEXT_PUBLIC_CLICK_EXPENSE_SERVICE_ID
      // eslint-disable-next-line no-undef
      const MERCHANT_ID = process.env.NEXT_PUBLIC_CLICK_MERCHANT_ID
      // eslint-disable-next-line no-undef
      const RETURN_URL = process.env.NEXT_PUBLIC_URL
      setIsLoading(false)
      setError(null)

      if (!user?.id) {
        setError('User not found')
        toast.error('User not found')
        return
      }
      if (!currentTeam?.id) {
        setError(t('Jamoa ID kiritilmagan!'))
        toast.error(t('Jamoa ID kiritilmagan!'))
      }
      if (!currentPackage || !currentPackage?.price) {
        setError(t('Joriy paket yo‘q!'))
        toast.error(t('Joriy paket yo‘q!'))
        return
      }

      try {
        setIsLoading(true)

        const url = new URL('https://my.click.uz/services/pay')
        url.searchParams.append('service_id', SERVICE_ID)
        url.searchParams.append('merchant_id', MERCHANT_ID)
        url.searchParams.append('amount', Number(currentPackage.price / 100))
        url.searchParams.append('transaction_param', currentTeam?.id)
        url.searchParams.append('return_url', RETURN_URL)
        url.searchParams.append('additional_param3', currentPackage?.id)
        url.searchParams.append('communal_param', currentPackage?.id)

        router.push(url.href)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred')
        )
        toast.error(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred')
        )
      } finally {
        setIsLoading(false)
      }
    },
    [router, t]
  )
  return { buyPackageWithClick, isLoading, error }
}
