'use server'

import { LANGUAGE } from 'utils/languages.util'
import { supabase } from 'lib/supabaseClient'
import { unstable_cache } from 'next/cache'

export const getTranslations = unstable_cache(async (locale) => {
    const supportedLocales = Object.keys(LANGUAGE)

    // If a specific locale is requested, check if it's supported
    if (!supportedLocales.includes(locale)) {
        return { error: 'Locale not supported', data: null }
    }

    try {
        const { data, error } = await supabase
            .from('system_language')
            .select('name, ru, uz')
            .filter('deleted_at', 'is', null)
            .not('ru', 'is', null)
            .not('uz', 'is', null)
            .or('is_exclude.is.null,is_exclude.eq.false')

        if (error) {
            throw error;
        }

        if (!data) {
            return { error: 'No translations found', data: null }
        }
        // Build translations for each locale
        const uz = {}
        const ru = {}
        data.forEach((item) => {
            if (!item?.is_exclude) {
                uz[item.name] = item.uz
                ru[item.name] = item.ru
            }
        })

        switch (locale) {
            case 'uz':
                return uz
            case 'ru':
                return ru
            default:
                return {}
        }
    } catch (error) {
        return { error: error.message || 'Unknown error', data: null }
    }
}, ['getTranslations'], {
    revalidate: 60 * 60 * 24 // 24 hours
})
