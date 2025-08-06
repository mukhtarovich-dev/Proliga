import { useTranslation } from 'react-i18next'

const RulesSliderTitle = () => {
  const { t } = useTranslation()

  return (
    <div className="bg-primary mb-4 w-full max-w-64 -skew-x-12 self-start rounded-xs md:mb-6 md:max-w-96">
      <h3 className="carousel-header text-primary-foreground text-center font-bold capitalize">
        {t('Umumiy qoidalar')}
      </h3>
    </div>
  )
}

export default RulesSliderTitle
