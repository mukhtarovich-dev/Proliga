'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu'
import Image from 'next/image'
import { LANGUAGE } from 'utils/languages.util'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setLanguage } from 'lib/features/systemLanguage/systemLanguage.slice'
import { Globe } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { setLanguageCookie } from 'utils/setLanguageCookie'
import i18nConfig from 'lib/i18n.config'
import { useEffect } from 'react'

const ChangeLanguageDropdown = () => {
  const dispatch = useDispatch()
  const { lang } = useSelector((store) => store.systemLanguage)
  const { i18n } = useTranslation()
  const currentLocale = i18n.language
  const router = useRouter()
  const currentPathname = usePathname()

  useEffect(() => {
    if (i18n.language !== lang) {
      dispatch(setLanguage({ lang: i18n.language }))
    }
  }, [lang, i18n.language, dispatch])

  const handleChange = async (newLocale) => {
    setLanguageCookie(newLocale)
    dispatch(setLanguage({ lang: newLocale }))

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname)
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`))
    }

    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Change Language"
        className="hover:text-accent-foreground dark:hover:text-accent relative flex size-8 items-center justify-center bg-transparent p-0 hover:bg-transparent dark:hover:bg-transparent"
      >
        <Globe className="text-foreground hover:text-accent size-5" />
        <div className="absolute -top-1 -right-1 size-4">
          <Image
            src={
              lang === LANGUAGE.uz
                ? '/icons/uzbekistan.svg'
                : '/icons/russia.svg'
            }
            alt={lang === LANGUAGE.uz ? 'uzbekistan' : 'russia'}
            width={16}
            height={16}
            className="size-4"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        aria-label="Language Options: RU, UZ"
        className="text-foreground w-min min-w-24 rounded"
        align="end"
      >
        <DropdownMenuItem onClick={() => handleChange(LANGUAGE.uz)}>
          <div className="flex items-center justify-center gap-2">
            <Image
              src="/icons/uzbekistan.svg"
              alt="uzbekistan"
              width={24}
              height={24}
              className="size-6"
            />
            <p>UZ</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChange(LANGUAGE.ru)}>
          <div className="flex items-center justify-center gap-2">
            <Image
              src="/icons/russia.svg"
              alt="russia"
              width={24}
              className="size-6"
              height={24}
            />
            <p>РУ</p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ChangeLanguageDropdown
