import TeamMaxTransfers from './TeamMaxTransfers'
import TeamPrice from './TeamPrice'
import TeamBalance from './TeamBalance'
import TeamMaxClubMembers from './TeamMaxClubMembers'
import { CardHeader } from 'components/ui/card'

const TeamOverview = () => {
  return (
    <CardHeader className="text-foreground h-full min-h-25 grid-cols-2 grid-rows-2 gap-1 px-4 lg:flex lg:min-h-14 lg:justify-between">
      <TeamPrice />
      <TeamBalance />
      <TeamMaxTransfers />
      <TeamMaxClubMembers />
    </CardHeader>
  )
}

export default TeamOverview
