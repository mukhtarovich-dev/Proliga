import initTranslations from 'lib/i18n'
import { unstable_cache } from 'next/cache'
import PrizeContainer from './components/PrizeContainer'
import { supabase } from 'lib/supabaseClient'
import {
  FETCH_REVALIDATE
} from 'utils/config.global'

const fetchCompetitions = unstable_cache(
  async () => {
    const { data: competitions, error } = await supabase
      .from('competition')
      .select('*')
      .is('deleted_at', null)
      .eq('is_active', true)

    if (error) {
      return { error: error?.message }
    }

    return { data: competitions, error: null }
  },
  ['prizes-competitions'],
  {
    tags: ['prizes-competitions'],
    revalidate: FETCH_REVALIDATE,
  }
)

const Prizes = async ({ params }) => {
  const { locale } = await params
  const { t } = await initTranslations(locale)

  const { data: competitions, error } = await fetchCompetitions()

  if (error || competitions.length === 0) {
    return (
      <h1 className="text-foreground text-center text-2xl">
        {t('Hozircha yutuqlar yoq')}
      </h1>
    )
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-white">
        <span className="text-primary mr-2">{t('Available')}</span>
        {t('Yutuqlar')}
      </h1>
      <section className="flex flex-col items-center justify-center gap-2">
        {competitions.map((competition) => (
          <PrizeContainer
            competition={competition}
            locale={locale}
            key={competition.id}
            t={t}
          />
        ))}
      </section>
    </>
  )
}

export default Prizes
