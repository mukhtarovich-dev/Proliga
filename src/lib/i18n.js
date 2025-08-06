import { createInstance } from 'i18next'
import { initReactI18next } from 'react-i18next/initReactI18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import i18nConfig from './i18n.config'
import { getTranslations } from 'actions/getTranslations.action'
import { LANGUAGE } from 'utils/languages.util'

export default async function initTranslations(
  locale,
  i18nInstance,
  resources
) {
  i18nInstance = i18nInstance || createInstance()

  i18nInstance.use(initReactI18next)

  if (!resources) {
    const ru = await getTranslations(LANGUAGE.ru)
    const uz = await getTranslations(LANGUAGE.uz)

    i18nInstance.use(
      resourcesToBackend(
        (language) => {
          switch (language) {
            case LANGUAGE.ru:
              return ru
            case LANGUAGE.uz:
              return uz
          }
        }
      )
    )
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    preload: resources ? [] : i18nConfig.locales,
  })

  return {
    i18n: i18nInstance,
    resources: { [locale]: i18nInstance.services.resourceStore.data[locale] },
    t: i18nInstance.t,
  }
}
