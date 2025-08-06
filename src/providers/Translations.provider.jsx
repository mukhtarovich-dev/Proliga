'use client'

import { I18nextProvider } from 'react-i18next'
import initTranslations from 'lib/i18n'
import { createInstance } from 'i18next'
import { memo } from 'react'

function TranslationsProvider({ children, locale, resources }) {
  const i18n = createInstance()

  initTranslations(locale, i18n, resources)

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

export default memo(TranslationsProvider)
