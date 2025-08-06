import { getCorrectName } from 'utils/getCorrectName.util'
import Prize from '../Prize'
import { getUrl } from 'utils/static.util'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { supabase } from 'lib/supabaseClient'
import { unstable_cache } from 'next/cache'
import { FETCH_REVALIDATE } from 'utils/config.global'

const fetchPrizesByCompetition = unstable_cache(
  async (competitionId) => {
    try {
      const { data: prizes, error } = await supabase
        .from('prize')
        .select('*')
        .eq('is_active', true)
        .eq('competition_id', competitionId)
        .is('deleted_at', null)
        .order('order', { ascending: true })

      return { data: prizes, error }
    } catch (error) {
      return { error: error.message }
    }
  },
  ['fetchPrizesByCompetition'],
  {
    tags: ['fetchPrizesByCompetition'],
    revalidate: FETCH_REVALIDATE,
  }
)

const PrizeContainer = async ({ competition, locale, t }) => {
  const { data: prizes, error } = await fetchPrizesByCompetition(competition.id)
  if (error || prizes.length === 0) return <></>

  const orderedPrizes = [prizes[1], prizes[0], prizes[2]]

  return (
    <Card className="border-border w-full">
      <CardHeader className="border-border mb-4 flex items-center gap-2 border-b">
        <img
          src={getUrl(competition.flag)}
          loading="lazy"
          alt={competition.title}
          className="z-10 size-10 rounded-full bg-white p-1 select-none"
          draggable={false}
        />
        <CardTitle>
          {getCorrectName({
            lang: locale,
            uz: competition?.name,
            ru: competition?.name_ru,
          })}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="hidden grid-cols-1 grid-rows-3 gap-2 lg:grid lg:grid-cols-3 lg:grid-rows-1">
          {orderedPrizes.map((prize) => (
            <Prize prize={prize} key={prize.id} locale={locale} t={t} />
          ))}
        </div>
        <div className="grid grid-cols-1 grid-rows-3 gap-2 lg:hidden lg:grid-cols-3 lg:grid-rows-1">
          {prizes.map((prize) => (
            <Prize prize={prize} key={prize.id} locale={locale} t={t} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default PrizeContainer
