'use client'

import { Separator } from 'components/ui/separator'
import { Button } from 'components/ui/button'
import { CONFIG_KEY } from 'utils/config.util'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Link } from 'next-view-transitions'
import { selectSystemConfig } from 'lib/features/systemConfig/systemConfig.selector'
import { FaTelegram, FaInstagram } from 'react-icons/fa'
import { Mail } from 'lucide-react'
import AnimatedGradientText from 'components/ui/animated-gradient-text'
import Gutter from 'components/Gutter'

const Footer = () => {
  const path = usePathname()
  const { t } = useTranslation()
  const config = useSelector(selectSystemConfig)

  const link_email = config[CONFIG_KEY.link_email]?.value ?? ''
  const link_instagram = config[CONFIG_KEY.link_instagram]?.value ?? ''
  const link_telegram = config[CONFIG_KEY.link_telegram]?.value ?? ''

  const navigation = [
    { href: '/about-us', label: t('Biz haqimizda') },
    { href: '/packages', label: t('Paketlar') },
  ]

  const legal = [
    { href: '/regulation', label: t('Qoidalar') },
    { href: '/user-agreement', label: t('Foydalanuvchi shartnomasi') },
  ]

  if (
    path.includes('auth') ||
    path.includes('reset-password') ||
    path.includes('confirm-otp') ||
    path.includes('offline')
  ) {
    return <></>
  }

  return (
    <footer className="border-border bg-background text-foreground w-full border-t">
      <Gutter className={'py-8'}>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{t('Navigatsiya')}</h3>
            <nav className="flex flex-col space-y-2">
              {navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{t('Huquqiy')}</h3>
            <nav className="flex flex-col space-y-2">
              {legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              {t('Bizning ijtimoiy tarmoqlarimiz')}
            </h3>
            <div className="flex space-x-4">
              <Link
                href={link_email}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:ring-offset-background focus:ring-primary transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
              >
                <Mail size={24} />
              </Link>
              <Link
                href={link_instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:ring-offset-background focus:ring-primary transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                href={link_telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:ring-offset-background focus:ring-primary transition-transform hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
              >
                <FaTelegram size={24} />
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 sm:items-start">
            <Button
              className={
                'text-background h-12 w-full max-w-64 font-bold hover:scale-105'
              }
              variant="gradient"
              style={{
                '--bg-size': `100%`,
              }}
            >
              <Link href="/prizes">{t("Sovgalarni ko'rish")}</Link>
            </Button>
            <Button
              variant="outline"
              className="gradient-x border-gradient h-12 w-full max-w-64 overflow-hidden border-2 font-bold text-transparent hover:scale-105"
            >
              <Link href="/championships">
                <AnimatedGradientText
                  colorFrom="var(--color-chart-2)"
                  colorVia="var(--color-chart-1)"
                  colorTo="var(--color-chart-3)"
                >
                  {t("Chempionatlarga o'tish")}
                </AnimatedGradientText>
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-muted-foreground text-center text-sm">
          © {new Date().getFullYear()} {t('Barcha huquqlar himoyalangan')}
        </div>
      </Gutter>
    </footer>
  )
}

export default Footer
