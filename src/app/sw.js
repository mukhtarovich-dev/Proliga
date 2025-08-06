import { Serwist, NetworkOnly, BackgroundSyncQueue } from 'serwist'
import { defaultCache } from '@serwist/next/worker'

const serwist = new Serwist({
  precacheEntries: [
    ...(self.__SW_MANIFEST || []),
    { url: '/uz/~offline', revision: null },
    { url: '/ru/~offline', revision: null },
  ],
  precacheOptions: {
    cleanupOutdatedCaches: true,
    matchOptions: {
      ignoreSearch: true,
    },
  },
  runtimeCaching: [
    ...defaultCache,
    {
      handler: new NetworkOnly(),
      method: 'POST',
      matcher: ({ request }) => request.method === 'POST',
    },
    {
      handler: new NetworkOnly(),
      method: 'PATCH',
      matcher: ({ request }) => request.method === 'PATCH',
    },
  ],
  skipWaiting: true,
  clientsClaim: true,
  offlineAnalyticsConfig: true,
  // disableDevLogs: true,
  importScripts: ['/firebase-messaging-sw.js'],
  fallbacks: {
    entries: [
      {
        url: '/~offline',
        matcher({ request }) {
          return request.destination === 'document'
        },
      },
    ],
  },
})

const queue = new BackgroundSyncQueue('sync-queue')
const backgroundSync = async (event) => {
  try {
    const response = await fetch(event.request.clone())
    return response
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    await queue.pushRequest({ request: event.request })
    return Response.error()
  }
}

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.headers.has('range')) return

  if (request.method === 'POST' || request.method === 'PATCH') {
    return event.respondWith(backgroundSync(event))
  }

  event.respondWith(
    (async function () {
      const cachedResponse = await caches.match(request)
      if (cachedResponse) return cachedResponse

      try {
        return await fetch(request)
      } catch (err) {
        if (request.mode === 'navigate') {
          const url = new URL(request.url)
          const locale = url.pathname.split('/')[1]
          const fallback = await caches.match(`/${locale}/~offline`)
          return fallback || caches.match('/uz/~offline')
        }

        throw err
      }
    })()
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((cacheName) =>
          caches.open(cacheName).then((cache) =>
            cache.keys().then((requests) =>
              Promise.all(
                requests.map((req) =>
                  cache.match(req).then((res) => {
                    if (res && !res.ok) {
                      return cache.delete(req)
                    }
                  })
                )
              )
            )
          )
        )
      )
    )
  )
})

serwist.addEventListeners()
