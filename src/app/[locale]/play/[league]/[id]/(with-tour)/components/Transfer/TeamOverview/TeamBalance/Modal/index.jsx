'use client'

import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { PACKAGE_TYPE } from 'utils/packages.util'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog'
import { setBalanceModal } from 'lib/features/currentTeam/currentTeam.slice'
import { Badge } from 'components/ui/badge'
import { Coins, InfoIcon } from 'lucide-react'
import {
  HoverCardTrigger,
  HoverCard,
  HoverCardContent,
} from 'components/ui/hover-card'
import { selectPackages } from 'lib/features/package/package.selector'
import { DEFAULT_BALANCE } from 'utils/config.global'
import PackageModalLink from '../../PackageModalLink'

const TeamBalanceModal = () => {
  const dispatch = useDispatch()
  const packages = useSelector(selectPackages)
  const { t } = useTranslation()
  const { balanceModal } = useSelector((store) => store.currentTeam)

  return (
    <Dialog
      onOpenChange={() => dispatch(setBalanceModal(!balanceModal))}
      open={balanceModal}
    >
      <DialogContent className="max-h-[92%] w-full max-w-full overflow-auto rounded-lg p-4 sm:max-w-md xl:max-w-lg xl:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold lg:text-2xl">
            {t('Boost Your Team Balance!')}
          </DialogTitle>
          <HoverCard>
            <HoverCardTrigger asChild>
              <DialogDescription className="flex cursor-help items-center text-sm lg:text-base">
                {t(
                  'Increase your spending power for better players and strategies'
                )}
                <InfoIcon className="ml-1 h-4 w-4" />
              </DialogDescription>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <p className="text-sm">{t('balance modal info')}</p>
            </HoverCardContent>
          </HoverCard>
        </DialogHeader>
        <div className="mt-4 space-y-2">
          {packages.map(
            (item) =>
              item.type === PACKAGE_TYPE.team_balance && (
                <PackageModalLink
                  key={item.id}
                  item={item}
                  onClick={() => dispatch(setBalanceModal(false))}
                >
                  <Badge variant="secondary" className="text-foreground mb-2">
                    +{item.amount - DEFAULT_BALANCE} {t('Coins')}
                  </Badge>
                  <h3 className="text-foreground text-lg font-semibold">
                    {t('Increase your balance!')}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('Add coins to your balance').replace('$', item.amount)}
                  </p>
                </PackageModalLink>
              )
          )}
        </div>
        <div className="mt-6 flex items-center justify-center space-x-2 text-sm">
          <Coins className="text-foreground dark:text-primary h-4 w-4" />
          <p className="text-muted-foreground font-medium">
            {t("invest in your team's success")}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TeamBalanceModal
