import { CONFIG_KEY } from 'utils/config.util'
import { supabase } from 'lib/supabaseClient'
import { unstable_cache } from 'next/cache'

const { seo_title, seo_description } = CONFIG_KEY

const getSystemConfig = unstable_cache(
  async () => {
    const { data, error } = await supabase
      .from('system_config')
      .select('key, value')
      .in('key', [seo_title, seo_description])

    if (error) {
      throw error
    }

    const config = data.reduce((acc, item) => {
      acc[item.key] = item.value
      return acc
    }, {})

    return {
      title: config[seo_title] || 'Proliga - Fantaziya Futbol Platformasi',
      description:
        config[seo_description] ||
        "O'zbekiston Fantaziya Futbol Ligasi - haqiqiy futbol ligalari o'yinchilariga asoslangan virtual futbol o'yini",
    }
  },
  ['system-config'],
  { revalidate: 3600 } // Cache for 1 day
)

export async function generateMetadata() {
  const { title: APP_NAME, description: APP_DESCRIPTION } =
    await getSystemConfig()

  return {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    keywords:
      "proliga, O'zbekiston futboli, professional liga, futbol, superliga, pro liga, proliga.uz, Proliga.uz, fantasy futbol, fantasy futbol uz",
    authors: [{ name: 'Ramz001' }],
    creator: 'Ramz001',
    publisher: 'Ramz001',
    robots: 'index, follow',
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon.svg' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.jpg', sizes: '16x16', type: 'image/jpeg' },
      ],
      apple: [{ url: '/favicon.webp', sizes: '512x512', type: 'image/webp' }],
    },
    manifest: '/manifest.json',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: APP_NAME,
      themeColor: '#000000',
    },
    openGraph: {
      type: 'website',
      locale: 'uz_UZ',
      url: 'https://proliga.uz',
      title: APP_NAME,
      description: APP_DESCRIPTION,
      siteName: 'proliga.uz',
      images: [
        {
          src: '/screenshots/home-desktop.webp',
          sizes: '1920x1080',
          type: 'image/webp',
        },
        {
          src: '/screenshots/home-mobile.webp',
          sizes: '425x1080',
          type: 'image/webp',
        },
        {
          src: '/screenshots/transfer-desktop.webp',
          sizes: '1920x1080',
          type: 'image/webp',
        },
        {
          src: '/screenshots/transfer-mobile.webp',
          sizes: '425x1080',
          type: 'image/webp',
        },
      ],
    },
    // eslint-disable-next-line no-undef
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
    twitter: {
      card: 'summary_large_image',
      title: APP_DESCRIPTION,
      description: APP_DESCRIPTION,
      images: ['/Screenshot.png'],
    },
  }
}
