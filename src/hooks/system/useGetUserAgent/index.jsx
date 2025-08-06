import { toast } from 'sonner'
import { useState, useCallback } from 'react'
import { setAgent } from 'lib/features/auth/auth.slice'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

export function useGetUserAgent() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [data, setData] = useState()
  const [error, setError] = useState(null)

  const getUserAgent = useCallback(async () => {
    try {
      const ua = navigator.userAgent
      const browserRegex =
        /(chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      const match = ua.match(browserRegex) || []
      const browser = match[1] || ''
      const browserVersion = match[2] || ''

      const osRegex = /(mac|win|linux|android|ios|iphone|ipad)/i
      const osMatch = ua.match(osRegex) || []
      const os = osMatch[1] || ''
      const deviceType = /Mobi|Tablet|Android|iOS/.test(ua)
        ? 'Mobile'
        : 'Desktop'

      const info = {
        userAgent: ua,
        platform: navigator.platform,
        language: navigator.language,
        cookiesEnabled: navigator.cookieEnabled,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        colorDepth: window.screen.colorDepth,
        pixelRatio: window.devicePixelRatio,
        browser,
        browserVersion,
        os,
        deviceType,
        orientation: window.screen.orientation.type,
        connectionType: navigator.connection?.effectiveType,
        memoryUsage: performance.memory?.usedJSHeapSize,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        touchSupport: 'ontouchstart',
        hardwareConcurrency: navigator.hardwareConcurrency,
      }

      dispatch(setAgent(info))
      setData(info)
    } catch (error) {
      setError(
        error instanceof Error ? error.message : t('An unknown error occurred')
      )
      toast.error(
        error instanceof Error ? error.message : t('An unknown error occurred')
      )
    }
  }, [dispatch, t])

  return { getUserAgent, data, error }
}
