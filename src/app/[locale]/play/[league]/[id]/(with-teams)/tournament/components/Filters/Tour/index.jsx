import { useSelector } from 'react-redux'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select'
import { selectTours } from 'lib/features/tour/tour.selector'
import { getCorrectName } from 'utils/getCorrectName.util'
import { memo } from 'react'

const TourFilter = memo(({ tour, setTour }) => {
  const tours = useSelector(selectTours)
  const { teamsLoading } = useSelector((state) => state.team)
  const { lang } = useSelector((store) => store.systemLanguage)

  return (
    <Select
      disabled={teamsLoading}
      value={tour}
      onValueChange={(value) => setTour(value)}
    >
      <SelectTrigger className="border-border w-1/3 max-w-36 truncate rounded-sm px-2 shadow-sm data-[size=default]:h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {tours?.map((t) => (
          <SelectItem key={t.id} defaultChecked={t.id === tour} value={t.id}>
            {getCorrectName({ lang, uz: t.name, ru: t.name_ru })}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
})

TourFilter.displayName = 'TourFilter'

export default TourFilter
