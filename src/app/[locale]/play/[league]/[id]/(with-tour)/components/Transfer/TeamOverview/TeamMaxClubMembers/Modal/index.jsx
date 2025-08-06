import { useTranslation } from 'react-i18next'
import { PACKAGE_TYPE } from 'utils/packages.util'
import { useSelector, useDispatch } from 'react-redux'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from 'components/ui/hover-card'
import { setClubModal } from 'lib/features/teamPlayer/teamPlayer.slice'
import { Badge } from 'components/ui/badge'
import { Users, InfoIcon } from 'lucide-react'
import { selectPackages } from 'lib/features/package/package.selector'
import { DEFAULT_SAME_TEAM_PLAYERS } from 'utils/config.global'
import PackageModalLink from '../../PackageModalLink'

const TeamMaxClubMembersModal = () => {
  const dispatch = useDispatch()
  const { clubModal } = useSelector((store) => store.teamPlayer)
  const packages = useSelector(selectPackages)
  const { t } = useTranslation()

  return (
    <Dialog
      onOpenChange={() => dispatch(setClubModal(!clubModal))}
      open={clubModal}
    >
      <DialogContent className="max-h-[92%] w-full max-w-full overflow-auto rounded-lg p-4 sm:max-w-md xl:max-w-lg xl:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold lg:text-2xl">
            {t('Expand Your Club Roster!')}
          </DialogTitle>
          <HoverCard>
            <HoverCardTrigger asChild>
              <DialogDescription className="flex cursor-help items-center text-sm lg:text-base">
                {t(
                  "Boost your team's potential with more players from a single club."
                )}
                <InfoIcon className="ml-1 h-4 w-4" />
              </DialogDescription>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <p className="text-sm">{t('single club player modal info')}</p>
            </HoverCardContent>
          </HoverCard>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          {packages.map(
            (item) =>
              item.type === PACKAGE_TYPE.single_club_count && (
                <PackageModalLink
                  key={item.id}
                  item={item}
                  onClick={() => dispatch(setClubModal(false))}
                >
                  <Badge variant="secondary" className="text-foreground mb-2">
                    +{item.amount - DEFAULT_SAME_TEAM_PLAYERS} {t('Players')}
                  </Badge>
                  <h3 className="text-foreground text-lg font-semibold">
                    {t('strengthen your squad')}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('Add players from one club!').replace('$', item.amount)}
                  </p>
                </PackageModalLink>
              )
          )}
        </div>
        <div className="mt-6 flex items-center justify-center space-x-2 text-sm">
          <Users className="text-foreground dark:text-primary h-4 w-4" />
          <p className="text-muted-foreground font-medium">
            {t('Build a stronger team for victory! ')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TeamMaxClubMembersModal
