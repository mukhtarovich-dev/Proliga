import { DialogTitle } from '@radix-ui/react-dialog'
import { getUrl } from 'utils/static.util'
import { User, DollarSign, Percent } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getCorrectName } from 'utils/getCorrectName.util'
import { useSelector } from 'react-redux'

const PlayerPhoto = ({ currentPlayer, position }) => {
  const { t } = useTranslation()
  const { lang } = useSelector((store) => store.systemLanguage)

  return (
    <section className="flex gap-2">
      <div className="size-24 shrink-0 sm:size-32 lg:size-36">
        <img
          src={getUrl(currentPlayer?.image) || ''}
          alt="player image"
          loading="lazy"
          onError={(e) =>
            (e.currentTarget.src = '/images/placeholder-user.webp')
          }
          className="h-full w-full rounded-lg object-cover object-center shadow-md"
        />
      </div>
      <section className="flex flex-1 flex-col justify-between gap-2">
        <div>
          <DialogTitle className="text-accent mb-1 truncate text-lg font-bold sm:text-xl md:text-2xl">
            {getCorrectName({
              lang,
              uz: currentPlayer?.name,
              ru: currentPlayer?.name_ru,
            })}
          </DialogTitle>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <img
              src={getUrl(currentPlayer?.club?.logo_img) || ''}
              alt="home club"
              width={20}
              height={20}
              draggable={false}
              loading="lazy"
              onError={(e) => (e.currentTarget.src = '/icons/football.svg')}
              className="bg-secondary size-5 rounded-full md:size-6 lg:size-7"
            />
            <p className="text-foreground text-sm font-medium md:text-base">
              {getCorrectName({
                lang,
                uz: currentPlayer?.club?.name,
                ru: currentPlayer?.club?.name_ru,
              })}
            </p>
            <span className="text-muted-foreground/80">|</span>
            <p className="text-muted-foreground text-sm md:text-base">
              {position}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1 sm:hidden">
          <SmallerStat
            icon={<DollarSign className="size-4" />}
            value={currentPlayer?.price}
            label={t('Narx')}
          />
          <SmallerStat
            icn={<User className="size-4" />}
            value={currentPlayer?.point}
            label={t('Ochko')}
          />
          <SmallerStat
            icon={<Percent className="size-4" />}
            value={`${currentPlayer?.percentage}%`}
            label={t('Sotib Olgan')}
          />
        </div>
        <div className="hidden grid-cols-3 gap-2 sm:grid">
          <Stat
            icon={<DollarSign className="size-4" />}
            value={currentPlayer?.price}
            label={t('Narx')}
          />
          <Stat
            icon={<User className="size-4" />}
            value={currentPlayer?.point}
            label={t('Ochko')}
          />
          <Stat
            icon={<Percent className="size-4" />}
            value={`${currentPlayer?.percentage}%`}
            label={t('Sotib Olgan')}
          />
        </div>
      </section>
    </section>
  )
}

const Stat = ({ icon, value, label }) => (
  <div className="bg-card flex items-center gap-1.5 rounded-md p-1.5 text-xs sm:p-2 sm:text-sm">
    <div className="bg-secondary flex h-6 w-6 items-center justify-center rounded-full sm:h-7 sm:w-7">
      {icon}
    </div>
    <div>
      <p className="text-foreground font-semibold">{value ?? 0}</p>
      <p className="text-muted-foreground text-xs">{label}</p>
    </div>
  </div>
)

const SmallerStat = ({ value, label }) => (
  <div className="bg-cardy-1 xs:py-2 flex items-center justify-between gap-1 rounded-md text-xs">
    <p className="text-3xs text-muted-foreground leading-tight">{label}</p>
    <p className="text-foreground leading-tight font-semibold">{value ?? 0}</p>
  </div>
)

export default PlayerPhoto
