import { Badge } from 'components/ui/badge'
import { useTranslation } from 'react-i18next'
import { MATCH_STATUS } from 'utils/match.util'

const MatchStatus = ({ status, homeScore, awayScore }) => {
  const { t } = useTranslation()

  switch (status) {
    case MATCH_STATUS.NOT_STARTED:
      return (
        <Badge
          variant="secondary"
          className="bg-card text-2xs text-foreground py-px font-normal sm:text-xs"
        >
          {t('Boshlanmagan')}
        </Badge>
      )
    case MATCH_STATUS.INPROCESS:
      return (
        <Badge
          variant="default"
          className="text-2xs text-foreground animate-pulse py-px font-normal sm:text-xs"
        >
          {homeScore} - {awayScore}
        </Badge>
      )
    case MATCH_STATUS.FINISHED:
      return (
        <Badge
          variant="outline"
          className="text-2xs text-foreground py-px font-normal sm:text-xs"
        >
          {homeScore} - {awayScore}
        </Badge>
      )
    default:
      return null
  }
}
export default MatchStatus
