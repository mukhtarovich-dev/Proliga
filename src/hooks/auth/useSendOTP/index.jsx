import { useState, useCallback } from 'react'
import { supabase } from 'lib/supabaseClient'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useTransitionRouter } from 'next-view-transitions'

export const useSendOTP = () => {
  const router = useTransitionRouter()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const { t } = useTranslation()

  const sendOTP = useCallback(
    async ({
      phone,
      shouldRedirect = false,
      redirectTo = '',
      is_update = false,
      cb = () => { },
    }) => {
      setIsLoading(false)
      setError(null)

      if (!phone) {
        toast.error(t('Telefon raqam kiritilmagan'))
        setError(t('Telefon raqam kiritilmagan'))
        return
      }

      try {
        setIsLoading(true)

        const { data, error } = await supabase.rpc('http__send__sms__phone', {
          phone_number: phone,
          is_update,
        })
        if (error) {
          setError(
            error instanceof Error
              ? error.message
              : t('An unknown error occurred'), { richColors: true }
          )
          toast.error(
            error instanceof Error
              ? error.message
              : t('An unknown error occurred'), { richColors: true }
          )
          return { error }
        }
        if (data?.status === 401) {
          setError(data?.message)
          toast.error(t('Authentication service is temporarily unavailable. Please try again later.'), { richColors: true })
          return
        }

        if (data?.status !== 200) {
          console.log("executed")
          setError(data?.message)
          toast.error(data?.message, { richColors: true })
          return { error }
        }
        if (data?.status === 200) {
          setData(data)
          toast.success(t('SMS muvaffaqiyatli yuborildi'), { richColors: true })
          if (shouldRedirect) {
            router.push(redirectTo)
          }
          cb()
          return
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : t('An unknown error occurred'), { richColors: true }
        )
        toast.error(
          t('Currenty SMS sending is not available, please try again later'), { richColors: true }
        )
      } finally {
        setIsLoading(false)
      }
    },
    [router, t]
  )
  return { sendOTP, isLoading, error, data }
}
