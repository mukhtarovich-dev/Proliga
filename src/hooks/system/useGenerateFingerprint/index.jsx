import { setFingerprint } from 'lib/features/auth/auth.slice'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { useDispatch } from 'react-redux'
import { useState, useCallback } from 'react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export function useGenerateFingerprint() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [error, setError] = useState(null)

  const generateFingerprint = useCallback(async () => {
    try {
      const fp = await FingerprintJS.load()
      const result = await fp.get()
      dispatch(setFingerprint(result.visitorId))
    } catch (error) {
      setError(
        error instanceof Error ? error.message : t('An unknown error occurred')
      )
      toast.error(
        error instanceof Error ? error.message : t('An unknown error occurred')
      )
    }
  }, [dispatch, t])

  return { generateFingerprint, error }
}
