import { useTransitionRouter } from 'next-view-transitions'
import { useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { formatDate } from 'utils/formatDate.util'
import { cn } from 'lib/utils'
import { getCorrectName } from 'utils/getCorrectName.util'
import CompetitionModal from '../Modal/index'
import { selectTeams } from 'lib/features/team/team.selector'
import { getUrl } from 'utils/static.util'
import { Card, CardContent, CardTitle } from 'components/ui/card'
import { Badge } from 'components/ui/badge'

const Championship = ({ game }) => {
  const { t } = useTranslation()
  const router = useTransitionRouter()
  const teams = useSelector(selectTeams)
  const { lang } = useSelector((state) => state.systemLanguage)
  const [isModalOpen, setModalOpen] = useState(false)
  const currentGame = useMemo(
    () => teams?.find((team) => team.competition_id === game.id),
    [game?.id, teams]
  )

  const handleClick = () => {
    if (!game?.is_active) {
      return toast.info(t('This league is not active.'))
    }
    if (!currentGame) {
      switch (game?.can_register) {
        case true:
          return setModalOpen(true)
        case false:
          return toast.info(t('You cannot register in this league'))
        default:
          return null
      }
    }

    if (!game?.is_team_created) {
      return router.push(`/play/${game.id}/${currentGame.id}/transfer`)
    }

    return router.push(`/play/${game.id}/${currentGame.id}`)
  }

  const cardVariants = useMemo(() => {
    if (!game?.is_active) return 'border-muted-foreground/40 cursor-default'
    if (currentGame)
      return 'border-foreground/70 dark:border-accent/70 hover:border-primary cursor-pointer'
    return game.can_register
      ? 'border-accent/50 hover:border-primary cursor-pointer '
      : 'border-muted-foreground/40 cursor-default'
  }, [currentGame, game?.can_register, game?.is_active])

  return (
    <>
      <Card
        className={cn(
          'bg-card relative flex h-32 items-start overflow-hidden rounded-lg border shadow',
          'justify-center border-2 px-4 transition-all',
          cardVariants
        )}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick()
          }
        }}
        aria-label={`View details for ${getCorrectName({ lang, uz: game?.name, ru: game?.name_ru })}`}
      >
        <CardContent className="flex items-start justify-center gap-4 p-0">
          <img
            src={getUrl(game.flag)}
            alt={game.title}
            className="z-10 size-14 rounded-xl bg-white p-1 select-none"
            draggable={false}
            loading="lazy"
          />
          <div>
            <CardTitle className="text-foreground text-base font-bold capitalize select-none md:text-lg">
              {getCorrectName({ lang, uz: game?.name, ru: game?.name_ru })}
            </CardTitle>
            <div>{renderGameStatus(game, currentGame, t)}</div>
          </div>
        </CardContent>
      </Card>
      {game.can_register && (
        <CompetitionModal
          toggleModal={setModalOpen}
          isModalOpen={isModalOpen}
          competition={game}
        />
      )}
    </>
  )
}

const renderGameStatus = (game, currentGame, t) => {
  if (!game?.is_active) {
    return (
      <div className="mt-1 flex items-center gap-2 text-xs select-none sm:text-sm">
        <Badge variant="destructive" className="text-destructive-foreground">
          {t('Inactive')}
        </Badge>
        <p className="text-secondary-foreground/70">{t('Tez Kunda')}</p>
      </div>
    )
  }

  if (currentGame || game?.can_register) {
    return (
      <div className="text-secondary-foreground flex gap-1 text-xs select-none sm:text-sm">
        <p>{t('Deadline')}: </p>
        <span className="text-foreground font-semibold">
          {formatDate(game?.deadline)}
        </span>
      </div>
    )
  }

  return (
    <div className="mt-1 flex items-center gap-2 text-xs select-none sm:text-sm">
      <Badge className="bg-muted/80 text-muted-foreground font-medium capitalize">
        {t('closed')}
      </Badge>
      <p className="text-secondary-foreground/70">{t('Registration Ended')}</p>
    </div>
  )
}

export default Championship
