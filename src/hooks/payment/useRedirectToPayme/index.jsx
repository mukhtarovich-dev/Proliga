/* eslint-disable no-undef */
import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { useTransitionRouter } from 'next-view-transitions'

export const useRedirectToPayme = () => {
  const { t } = useTranslation()
  const router = useTransitionRouter()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const redirectToPayme = useCallback(
    ({ amount, lang, user }) => {
      const RETURN_URL = process.env.NEXT_PUBLIC_URL
      setIsLoading(false)
      setError(null)

      if (!user?.id) {
        setError('User not found')
        toast.error('User not found')
        return
      }

      if (!amount) {
        setError('Amount is required')
        toast.error('Amount is required')
        return
      }

      try {
        setIsLoading(true)

        const url = new URL('https://checkout.paycom.uz')
        const m = process.env.NEXT_PUBLIC_PAYME_ID // merchant id
        const ac = user?.id // account
        const a = amount * 100 // amount
        const l = lang
        const cr = 4217 // UZS
        const ct = 15000 // Millinseconds to wait
        const encoded = btoa(
          `m=${m};ac.user_id=${ac};a=${a};l=${l};c=${RETURN_URL};ct=${ct};cr=${cr};`
        )
        router.push(url.href + encoded)
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
  return { redirectToPayme, isLoading, error }
}
