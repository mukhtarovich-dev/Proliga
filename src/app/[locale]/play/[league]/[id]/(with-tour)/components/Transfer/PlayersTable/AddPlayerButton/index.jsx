'use client'

import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setBalanceModal } from 'lib/features/currentTeam/currentTeam.slice'
import { CONFIG_KEY } from 'utils/config.util'
import { useTranslation } from 'react-i18next'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { cn } from 'lib/utils'
import { selectSystemConfig } from 'lib/features/systemConfig/systemConfig.selector'
import { Plus, Check, X } from 'lucide-react'

const AddPlayerButton = ({
  player,
  handleAddPlayer,
  teamBalance,
  teamConcat,
  totalPlayersCount,
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const condition = teamBalance >= player.price
  const isPlayerInTeam = teamConcat.find((p) => p.player_id == +player?.id)
  const currentTeam = useSelector(selectCurrentTeam)
  const config = useSelector(selectSystemConfig)

  const transfer_show_modals =
    config[CONFIG_KEY.transfer_show_modals]?.value?.toLowerCase() === 'true'
  const max_balance = +config[CONFIG_KEY.max_balance]?.value

  const handleClick = () => {
    if (condition) {
      handleAddPlayer(player)
    } else {
      if (currentTeam?.balance === max_balance) {
        toast.info(t('Max balance has been reached!'))
      } else {
        toast.info(t('Not enough balance.'))
        transfer_show_modals && dispatch(setBalanceModal(true))
      }
    }
  }

  if (isPlayerInTeam) {
    return (
      <button
        className="flex h-full w-full cursor-pointer items-center justify-center md:w-auto"
        key={player.id}
      >
        <Check className="border-foreground dark:border-success dark:bg-background dark:text-success bg-success text-foreground size-5 rounded border p-1 shadow-sm select-none sm:size-6" />
      </button>
    )
  } else if (!isPlayerInTeam && totalPlayersCount < 11) {
    return (
      <button
        className="flex h-full w-full cursor-pointer items-center justify-center md:w-auto"
        key={player.id}
        onClick={handleClick}
      >
        <Plus
          className={cn(
            'bg-background size-5 rounded border p-1 shadow-sm select-none sm:size-6 dark:bg-transparent',
            condition
              ? 'bg-primary text-primary-foreground border-foreground dark:text-primary dark:border-primary'
              : 'text-muted-foreground border-muted-foreground'
          )}
        />
      </button>
    )
  } else if (!isPlayerInTeam && totalPlayersCount >= 11) {
    return (
      <button
        className="flex h-full w-full cursor-pointer items-center justify-center md:w-auto"
        key={player.id}
      >
        <X className="border-muted-foreground text-muted-foreground size-5 rounded border p-1 shadow-sm select-none sm:size-6" />
      </button>
    )
  }
}

export default AddPlayerButton
