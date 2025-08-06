import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import { useUpdateSearchParams } from 'hooks/system/useUpdateSearchParams'
import { useSendOTP } from 'hooks/auth/useSendOTP'

export const useGetUserPhone = () => {
  const { t } = useTranslation()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const setParams = useUpdateSearchParams()
  const { sendOTP } = useSendOTP()

  const getUserPhone = useCallback(
    async ({ phone }) => {
      setIsLoading(false)
      setError(null)

      if (!phone) {
        setError('Telefon raqam kiritilmagan')
        toast.error(t('Telefon raqam kiritilmagan'))
        return
      }

      try {
        setIsLoading(true)

        const { data, error } = await supabase
          .from('user')
          .select('phone')
          .is('deleted_at', null)
          .eq('phone', phone)
          .single()

        if (error?.code === 'PGRST116') {
          setError(
            error instanceof Error
              ? error.message
              : t('An unknown error occurred')
          )
          toast.error(t('Bunaqa raqamli foydalanuvchi yoq'))
          return
        }
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
        if (data?.phone) {
          setData(data?.phone)
          setParams({ phone: data?.phone })
          await sendOTP({
            phone,
            shouldRedirect: true,
            redirectTo: `/confirm-otp?redirect=/reset-password&phone=${encodeURIComponent(data?.phone)}`,
          })
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
    [t, setParams, sendOTP]
  )
  return { getUserPhone, isLoading, error, data }
}
