'use client'
import { Link, useTransitionRouter } from 'next-view-transitions'
import { Button } from 'components/ui/button'
import { Card } from 'components/ui/card'
import { useEffect } from 'react'
import './globals.css'

export default function Error({ reset }) {
  const router = useTransitionRouter()

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof navigator === 'undefined' ||
      !router
    ) {
      console.warn(
        'Required objects (window, navigator, or router) are not available'
      )
      return
    }

    const handleOffline = () => {
      if (typeof navigator.onLine === 'undefined') {
        console.warn('navigator.onLine is not available')
        return
      }

      if (!navigator.onLine) {
        router.push('/offline')
      }
    }

    handleOffline()

    window.addEventListener('online', handleOffline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOffline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [router])

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-neutral-900">
      <Card className="w-full max-w-md border border-gray-200 bg-white shadow-lg dark:border-red-500 dark:bg-neutral-800">
        <div className="p-6 text-center">
          <h1 className="mb-4 text-6xl font-bold text-gray-800 dark:text-red-500">
            500
          </h1>
          <div className="relative mx-auto mb-6 h-24 w-24">
            <div className="absolute inset-0 rounded-full bg-gray-200 dark:bg-neutral-700"></div>
            <div className="absolute inset-2 rounded-full bg-white dark:bg-neutral-800"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-700 dark:text-red-500">
                STOP
              </span>
            </div>
          </div>
          <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-red-500">
            O&apos;yinda texnik to&apos;xtash!
          </h2>
          <p className="mb-6 text-gray-600 dark:text-red-500">
            Afsuski, serverda xatolik yuz berdi. Jamoamiz bu muammoni hal qilish
            ustida ishlamoqda.
          </p>
          <div className="space-y-2">
            <Button
              onClick={reset}
              className="w-full bg-gray-800 text-white hover:bg-gray-700 dark:bg-red-500 dark:text-white dark:hover:bg-red-600"
            >
              Qayta urinish
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-50"
            >
              <Link href="/">Asosiy maydonga qaytish</Link>
            </Button>
          </div>
        </div>
      </Card>
    </main>
  )
}
