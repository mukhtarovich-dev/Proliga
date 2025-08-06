import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import { PAYMENT_OPTIONS } from 'utils/paymentOptions.util'
import { useTransitionRouter } from 'next-view-transitions'

export const useBuyPackageWithWallet = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const { t } = useTranslation()
  const router = useTransitionRouter()

  const buyPackageWithWallet = useCallback(
    async ({ team_id, package_id }) => {
      setIsLoading(false)
      setError(null)

      if (!team_id) {
        setError(t('Jamoa ID kiritilmagan!'))
        toast.error(t('Jamoa ID kiritilmagan!'))
      }
      if (!package_id) {
        setError('Package not found')
        toast.error(t('Paket topilmadi'))
        return
      }

      try {
        setIsLoading(true)

        const { data, error } = await supabase
          .from('pay_expense')
          .insert({
            team_id,
            pay_package_id: package_id,
            system: PAYMENT_OPTIONS.WALLET,
            status: 1,
            transaction_id: btoa(Date.now() + team_id + PAYMENT_OPTIONS.WALLET),
          })
          .select()
          .is('deleted_at', null)
          .single()

        if (error) {
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
          return
        }
        if (data) {
          setData(data)
          toast.success(t('Siz mufaqiyatli paket sotib olindigiz'), {
            theme: 'dark',
          })
          router.push('/championships')
        }
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
  return { buyPackageWithWallet, isLoading, error, data }
}
