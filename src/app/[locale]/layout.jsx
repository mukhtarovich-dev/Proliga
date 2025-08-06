import '../globals.css'
import 'react-phone-number-input/style.css'
import { cn } from 'lib/utils'
import { ViewTransitions } from 'next-view-transitions'
import { Toaster } from 'components/ui/sonner'
import { fontVariables } from '../fonts'
import { auth } from 'app/api/auth/[...nextauth]/route'
import Navbar from 'shared/Navbar'
import Footer from 'shared/Footer'
import initTranslations from 'lib/i18n'
import RootProvider from 'providers/Root.provider'
import TranslationsProvider from 'providers/Translations.provider'
import { generateMetadata } from './metadata'

export { generateMetadata }

export default async function RootLayout({ children, params }) {
  const session = await auth()
  const { locale } = await params
  const { resources } = await initTranslations(locale)
  const userId = session?.user?.id

  // eslint-disable-next-line no-undef
  const staticBaseUrl = process.env.NEXT_PUBLIC_STATIC_URL
  let themePath

  if (session?.user?.user_theme_id && userId) {
    themePath = `/user/${userId}/user.css`
  } else if (session?.user?.theme_id) {
    themePath = `/theme/${session.user.theme_id}.css`
  } else {
    themePath = `/theme/ALL.css`
  }
  const themeURL = `${staticBaseUrl}${themePath}`

  return (
    <>
      <Toaster />
      <ViewTransitions>
        <html lang={locale} dir={'ltr'} suppressHydrationWarning>
          <head>
            <link rel="stylesheet" href={themeURL} />
          </head>
          <body
            className={cn(
              'bg-background text-foreground min-h-svh scroll-smooth font-sans antialiased lg:min-h-screen',
              fontVariables
            )}
          >
            <TranslationsProvider locale={locale} resources={resources}>
              <RootProvider>
                <Navbar />
                {children}
                <Footer />
              </RootProvider>
            </TranslationsProvider>
          </body>
        </html>
      </ViewTransitions>
    </>
  )
}
