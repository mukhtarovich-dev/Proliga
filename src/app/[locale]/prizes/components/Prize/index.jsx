import { getCorrectName } from 'utils/getCorrectName.util'
import { getUrl } from 'utils/static.util'
import { cn } from 'lib/utils'

const Prize = ({ prize, locale, t }) => {
  return (
    <div className={cn('flex min-h-96 flex-col items-center transition-all')}>
      <p className="text-lg">
        <span className="font-bold">{prize.order + ' '}</span>
        {t("O'RIN")}
      </p>
      <img
        src={getUrl(prize?.image)}
        loading="lazy"
        alt={prize?.name}
        className={cn(
          'aspect-square object-contain p-2 md:p-4 bg-white rounded-xl',
          prize.order === 1 && 'scale-100',
          prize.order === 2 && 'scale-100 lg:scale-90',
          prize.order === 3 && 'scale-100 lg:scale-80'
        )}
      />
      <p className="text-xl lg:text-lg">
        {getCorrectName({ lang: locale, uz: prize?.name, ru: prize?.name_ru })}
      </p>
    </div>
  )
}

export default Prize
