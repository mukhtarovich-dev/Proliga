import { DialogTitle } from 'components/ui/dialog'
import { getCorrectName } from 'utils/getCorrectName.util'
import { formatDate } from 'utils/formatDate.util'
import { useSelector } from 'react-redux'
import { selectCurrentCompetition } from 'lib/features/competition/competition.selector'

const MatchEventHeader = ({ started_date }) => {
  const { lang } = useSelector((store) => store.systemLanguage)
  const currentCompetition = useSelector(selectCurrentCompetition)

  return (
    <section className="border-border relative h-min border-b p-4">
      <DialogTitle className="text-center text-xl font-semibold">
        {getCorrectName({
          lang,
          uz: currentCompetition?.name,
          ru: currentCompetition?.name_ru,
        })}
      </DialogTitle>
      <div className="text-muted-foreground mt-1 flex justify-center gap-2 text-center text-sm">
        <time>{formatDate(started_date, 'notifications')}</time>
      </div>
    </section>
  )
}

export default MatchEventHeader
