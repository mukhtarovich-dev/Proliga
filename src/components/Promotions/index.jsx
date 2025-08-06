import PromotionCompete from './Compete'
import PromotionCreateTeam from './CreateTeam'
import PromotionGatherPoints from './GatherPoints'
import PromotionMakeTransfers from './MakeTransfers'
import PromotionWinPrizes from './WinPrizes'
import Gutter from 'components/Gutter'
import initTranslations from 'lib/i18n'

const Promotions = async ({ params }) => {
  const { locale } = await params
  const { t } = await initTranslations(locale)

  return (
    <section className="bg-card">
      <Gutter className={'border-border'}>
        <PromotionCreateTeam t={t} />
        <PromotionGatherPoints t={t} />
        <PromotionMakeTransfers t={t} />
        <PromotionCompete t={t} />
        <PromotionWinPrizes t={t} locale={locale} />
      </Gutter>
    </section>
  )
}

export default Promotions
