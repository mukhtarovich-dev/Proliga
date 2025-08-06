'use client'

import { toast } from 'sonner'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTransitionRouter } from 'next-view-transitions'
import { useSelector } from 'react-redux'
import { selectUser } from 'lib/features/auth/auth.selector'
import { useTranslation } from 'react-i18next'
import { useAuthStatus } from 'hooks/auth/useAuthStatus'
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'components/ui/tabs'
import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import SetUserCredentials from './components/SetUserCredentials'

const Auth = () => {
  const { t } = useTranslation()
  const router = useTransitionRouter()
  const user = useSelector(selectUser)
  const params = useSearchParams()
  const error = params.get('error')
  const [shouldRedirect, setShouldRedirect] = useState(true)
  const { setAuth } = useAuthStatus()
  const [tabValue, setTabValue] = useState('login')

  useEffect(() => {
    const SIGN_IN_METHOD =
      localStorage.getItem('sign-in-method') !== 'undefined' &&
      localStorage.getItem('sign-in-method')

    if (Boolean(user?.id) && shouldRedirect && !SIGN_IN_METHOD) {
      router.push('/championships')
    }
  }, [user?.id, router, shouldRedirect])

  useEffect(() => {
    if (error) {
      const errorMessages = {
        OAuthAccountNotLinked: t(
          'An email with this email has been opened, please try a different account'
        ),
        Configuration: t('An unknown error occurred'),
      }
      toast.error(errorMessages[error] || t('An unknown error occurred'))
      setAuth(false)
      localStorage.removeItem('sign-in-method')
      router.push('/auth')
    }
  }, [error, router, t, setAuth])

  // Sync tab with URL hash
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash === 'login' || hash === 'signup') {
      setTabValue(hash)
    }
  }, [])

  // Update hash when tab changes
  useEffect(() => {
    if (tabValue === 'login' || tabValue === 'signup') {
      window.location.hash = tabValue
    }
  }, [tabValue])

  return (
    <section className="bg-background mx-4 mt-24 mb-8 flex w-full max-w-md flex-col gap-4 sm:mx-0 2xl:mt-32">
      <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
        <TabsList className="bg-muted/50 mb-4 grid w-full grid-cols-2">
          <TabsTrigger
            value="login"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground text-sm font-bold capitalize data-[state=active]:shadow-sm"
          >
            {t('Tizimga kirish_1')}
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-background data-[state=active]:text-foreground text-sm font-bold capitalize data-[state=active]:shadow-sm"
          >
            {t("Ro'yxatdan o'tish")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm setShouldRedirect={setShouldRedirect} />
        </TabsContent>
        <TabsContent value="signup">
          <SignUpForm setShouldRedirect={setShouldRedirect} />
        </TabsContent>
      </Tabs>
      <SetUserCredentials />
    </section>
  )
}

export default Auth

// const errorMessages = {
//   OAuthSignin: 'Error occurred while signing in with OAuth provider.',
//   OAuthCallback: 'Error occurred during OAuth callback.',
//   OAuthCreateAccount: 'Error creating OAuth account.',
//   EmailCreateAccount: 'Error creating email account.',
//   Callback: 'Error during callback processing.',
//   OAuthAccountNotLinked:
//     'This email is already associated with another account.',
//   EmailSignin: 'Error sending sign in email.',
//   CredentialsSignin:
//     'Invalid credentials. Please check your phone number and password.',
//   SessionRequired: 'Please sign in to access this page.',
//   Default: 'An unexpected error occurred.',
// }
