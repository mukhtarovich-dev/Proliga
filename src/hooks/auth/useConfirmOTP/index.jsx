import { useState, useCallback } from 'react'
import { supabase } from 'lib/supabaseClient'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useTransitionRouter } from 'next-view-transitions'
import { useSession } from 'next-auth/react'

export const useConfirmOTP = () => {
  const router = useTransitionRouter()
  const { update } = useSession()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const { t } = useTranslation()

  const confirmOTP = useCallback(
    async ({
      code,
      phone,
      shouldRedirect = false,
      redirectTo = '',
      is_update = false,
      cb = () => {},
    }) => {
      setIsLoading(false)
      setError(null)

      if (!code) {
        toast.error(t('SMS kodingizni kiriting'))
        setError(t('SMS kodingizni kiriting'))
        return
      }

      if (code.length !== 6) {
        toast.error(t("SMS kodingiz 6 ta raqamdan iborat bo'lishi kerak"), {
          theme: 'dark',
        })
        setError(t("SMS kodingiz 6 ta raqamdan iborat bo'lishi kerak"))
        return
      }
      if (!phone) {
        toast.error(t('Telefon raqam kiritilmagan'))
        setError(t('Telefon raqam kiritilmagan'))
        return
      }

      try {
        setIsLoading(true)

        const { data, error } = await supabase.rpc('verify__sms_code', {
          phone_number: phone,
          confirm_code: code,
          is_update,
        })

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
        if (data?.status === 419) {
          toast.warning(t('Kod eskirib qolgan!'))
          setError(t('Kod eskirib qolgan!'))
          return
        }
        if (data?.status === 400 || data?.status === 404) {
          toast.error(t('SMS kodingiz xato'))
          setError(t('SMS kodingiz xato'))
          return
        }
        if (data?.status !== 200) {
          setError(data?.message)
          toast.error(data?.message)
          return
        }
        if (data?.status === 200) {
          setData(data)
          toast.success(t('SMS muvaffaqiyatli tasdiqlandi'))
          is_update
            ? await update({ phone, phone_verified: true })
            : await update({ phone_verified: true })
          cb()
          if (shouldRedirect) {
            router.push(redirectTo)
          }
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
    [router, t, update]
  )
  return { confirmOTP, isLoading, error, data }
}
