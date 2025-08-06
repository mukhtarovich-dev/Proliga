import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { PACKAGE_TYPE } from 'utils/packages.util'
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
import { setTransferModal } from 'lib/features/currentTeam/currentTeam.slice'
import { Badge } from 'components/ui/badge'
import { Zap, InfoIcon } from 'lucide-react'
import { selectPackages } from 'lib/features/package/package.selector'
import { DEFAULT_TRANSFERS } from 'utils/config.global'
import PackageModalLink from '../../PackageModalLink'

const TeamMaxTransfersModal = () => {
  const dispatch = useDispatch()
  const { transferModal } = useSelector((store) => store.currentTeam)
  const packages = useSelector(selectPackages)
  const { t } = useTranslation()

  return (
    <Dialog
      onOpenChange={() => dispatch(setTransferModal(!transferModal))}
      open={transferModal}
    >
      <DialogContent className="max-h-[92%] w-full max-w-full overflow-auto rounded-lg p-4 sm:max-w-md xl:max-w-lg xl:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold lg:text-2xl">
            {t('Boost Your Transfer Limit!')}
          </DialogTitle>
          <HoverCard>
            <HoverCardTrigger asChild>
              <DialogDescription className="flex cursor-help items-center text-sm lg:text-base">
                {t('Upgrade your game strategy with more transfers')}
                <InfoIcon className="ml-1 h-4 w-4" />
              </DialogDescription>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <p className="text-sm">{t('transfer modal info')}</p>
            </HoverCardContent>
          </HoverCard>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          {packages.map(
            (item) =>
              item.type === PACKAGE_TYPE.transfer_count && (
                <PackageModalLink
                  key={item?.id}
                  item={item}
                  onClick={() => dispatch(setTransferModal(false))}
                >
                  <Badge variant="secondary" className="text-foreground mb-2">
                    +{item.amount - DEFAULT_TRANSFERS} {t('Transfers')}
                  </Badge>
                  <h3 className="text-foreground text-lg font-semibold">
                    {t('Expand your options')}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('Increase limit by').replace('$', item.amount)}
                  </p>
                </PackageModalLink>
              )
          )}
        </div>
        <div className="mt-6 flex items-center justify-center space-x-2 text-sm">
          <Zap className="text-foreground dark:text-accent h-4 w-4" />
          <p className="text-muted-foreground font-medium">
            {t('Upgrade now for instant access!')}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TeamMaxTransfersModal
