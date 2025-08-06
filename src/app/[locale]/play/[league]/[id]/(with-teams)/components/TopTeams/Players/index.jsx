import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectTopPlayers } from 'lib/features/player/player.selector'
import { getUrl } from 'utils/static.util'
import { getCorrectName } from 'utils/getCorrectName.util'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'

const RankingPlayers = () => {
  const { t } = useTranslation()
  const topPlayers = useSelector(selectTopPlayers)

  return (
    <Card className="border-border w-full gap-2 py-4">
      <CardHeader className="flex flex-row items-center justify-between px-4">
        <CardTitle className="text-xl font-bold">
          {t('Eng kuchli top 3 - futbolchilar')}
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-4 grid grid-cols-2 gap-2 px-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
        {topPlayers?.length > 0 ? (
          topPlayers?.map((player, index) => (
            <PlayerPlace
              key={player?.id || index}
              player={player}
              index={index}
            />
          ))
        ) : (
          <div>{t('Oyinchilar yoq')}</div>
        )}
      </CardContent>
    </Card>
  )
}

const PlayerPlace = ({ player, index }) => {
  const { lang } = useSelector((store) => store.systemLanguage)

  return (
    <div className="bg-secondary relative min-h-32 rounded-sm p-2">
      <div className="flex items-center justify-between">
        <img
          src={getUrl(player?.image)}
          alt="player"
          width={24}
          height={24}
          onError={(e) => (e.target.src = '/images/placeholder-user.webp')}
          className="size-6 rounded-full object-cover md:size-8"
        />
        <span className="bg-primary text-primary-foreground flex h-6 w-12 items-center justify-center rounded-full text-xs font-bold sm:text-sm">
          {player?.point ?? 0}
        </span>
      </div>
      <h4 className="text-card-foreground line-clamp-2 max-w-28 text-sm font-bold break-words">
        {getCorrectName({ lang, uz: player?.name, ru: player?.name_ru })}
      </h4>
      <p className="text-card-foreground line-clamp-2 max-w-28 text-sm font-medium break-words">
        {getCorrectName({
          lang,
          uz: player?.club?.name,
          ru: player?.club?.name_ru,
        })}
      </p>
      <span className="bg-primary text-primary-foreground absolute right-0 bottom-0 flex size-6 items-center justify-center rounded-tl-lg rounded-br-lg text-sm font-extrabold">
        {index + 1}
      </span>
    </div>
  )
}

export default RankingPlayers
