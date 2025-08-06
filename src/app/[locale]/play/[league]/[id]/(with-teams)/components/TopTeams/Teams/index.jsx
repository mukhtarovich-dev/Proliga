import { selectTopTeams } from 'lib/features/team/team.selector'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { cn } from 'lib/utils'
import Image from 'next/image'
import { Card, CardContent, CardTitle, CardHeader } from 'components/ui/card'

const RankingTeams = () => {
  const { t } = useTranslation()
  const topTeams = useSelector(selectTopTeams)

  return (
    <Card className="border-border w-full gap-2 py-4">
      <CardHeader className="flex flex-row items-center justify-between px-4">
        <CardTitle className="text-xl font-bold">
          {t('Eng kuchli top 3 jamoalar')}
        </CardTitle>
      </CardHeader>
      <CardContent
        className={cn(
          'mt-4 h-auto min-h-32 grid-cols-2 gap-2 px-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3',
          topTeams?.length > 0 && 'grid'
        )}
      >
        {topTeams?.length > 0 ? (
          topTeams?.map((team, index) => (
            <TeamPlace team={team} index={index} key={team?.id || index} />
          ))
        ) : (
          <div className="text-center">Yuqori ochkolik jamoalar yoq</div>
        )}
      </CardContent>
    </Card>
  )
}

const TeamPlace = ({ team, index }) => {
  return (
    <div className="bg-secondary relative min-h-32 rounded-sm p-2">
      <div className="flex items-center justify-between">
        <Image
          src={`/icons/${index + 1}-place.svg`}
          alt="top team place"
          width={24}
          height={24}
          className="size-6 md:size-8"
        />
        <span className="bg-primary text-primary-foreground flex h-6 w-12 items-center justify-center rounded-full text-xs font-bold sm:text-sm">
          {team?.team_point ?? '00'}
        </span>
      </div>
      <h4 className="text-card-foreground line-clamp-2 max-w-28 text-sm font-bold break-words">
        {team?.team_name ?? 'team'}
      </h4>
      <p className="text-card-foreground line-clamp-2 max-w-28 text-sm font-medium break-words">
        {team?.user_name}
      </p>
      <span className="bg-primary text-primary-foreground absolute right-0 bottom-0 flex size-6 items-center justify-center rounded-tl-lg rounded-br-lg text-sm font-extrabold">
        {index + 1}
      </span>
    </div>
  )
}

export default RankingTeams
