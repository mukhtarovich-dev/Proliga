import { useTranslation } from 'react-i18next'
import { ArrowRightLeft } from 'lucide-react'

const MakeTransfersSlide = () => {
  const { t } = useTranslation()
  return (
    <article className="align-center flex flex-col gap-4">
      <h2 className="carousel-header xs:justify-start xs:text-start self-center text-center font-bold uppercase">
        {t('Transferlarni amalga oshiring')}
      </h2>
      <p className="xs:text-sm text-muted-foreground self-center text-center text-xs md:w-3/4 lg:text-base xl:mt-8 xl:text-lg">
        {t('Agar sizning jamoangizdagi')}
      </p>
      <div className="mx-auto flex w-full flex-1 items-center justify-center gap-6 md:w-auto md:flex-row">
        <img
          src="/images/transfer-from.webp"
          alt="transfer field"
          className="sm:size-40 size-30 rounded-full md:size-48"
        />
        <ArrowRightLeft className="text-foreground size-6 md:size-12" />
        <img
          src="/images/transfer-to.webp"
          alt="transfer field"
          className="sm:size-40 size-30 rounded-full md:size-48"
        />
      </div>
    </article>
  )
}

export default MakeTransfersSlide
