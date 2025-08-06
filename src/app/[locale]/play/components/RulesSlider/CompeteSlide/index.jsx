import { useTranslation } from 'react-i18next'
import { CompeteTable } from 'components/Promotions/Compete/CompeteTable'
const CompeteSlide = () => {
  const { t } = useTranslation()

  return (
    <section className="flex w-full flex-col-reverse justify-start gap-8 md:flex-row md:items-center md:justify-between md:gap-4">
      <div className="w-full flex-1 items-center justify-center self-center">
        <CompeteTable className={'md:size-80 xl:size-120'} />
      </div>
      <div className="text-muted-foreground flex flex-1 flex-col items-start gap-4 md:gap-8">
        <h2 className="carousel-header font-bold uppercase">
          {t('Raqobatlashing')}
        </h2>
        <p className="xs:text-sm text-muted-foreground max-w-lg text-xs lg:text-base xl:text-lg">
          {t('Boshqa foydalanuvchilar')}
        </p>
      </div>
    </section>
  )
}

export default CompeteSlide
