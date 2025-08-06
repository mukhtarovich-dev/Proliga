import { useDispatch, useSelector } from 'react-redux'
import { setBalanceModal } from 'lib/features/currentTeam/currentTeam.slice'
import { setPlayerTransferModal } from 'lib/features/teamPlayer/teamPlayer.slice'
import { CONFIG_KEY } from 'utils/config.util'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { selectTeamConcat } from 'lib/features/teamPlayer/teamPlayer.selector'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { selectCurrentPlayer } from 'lib/features/player/player.selector'
import { cn } from 'lib/utils'
import { selectSystemConfig } from 'lib/features/systemConfig/systemConfig.selector'
import { ArrowUpDown, Check } from 'lucide-react'

const SwapPlayerButton = ({ player, handleSwapPlayer, teamBalance }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const teamConcat = useSelector(selectTeamConcat)
  const currentTeam = useSelector(selectCurrentTeam)
  const currentPlayer = useSelector(selectCurrentPlayer)
  const config = useSelector(selectSystemConfig)

  const max_balance = +config[CONFIG_KEY.max_balance]?.value
  const transfer_show_modals =
    config[CONFIG_KEY.transfer_show_modals]?.value?.toLowerCase() === 'true'

  const condition = teamBalance + currentPlayer.price >= player.price

  const toggleModal = () => {
    dispatch(setPlayerTransferModal(false))
  }

  const handleClick = () => {
    if (condition) {
      handleSwapPlayer(player)
    } else {
      if (currentTeam?.balance === max_balance) {
        toggleModal()
        toast.info(t('Max balance has been reached!'))
      } else {
        toast.info(t('Not enough balance.'))
        toggleModal()
        transfer_show_modals && dispatch(setBalanceModal(true))
      }
    }
  }

  const isPlayerInTeam = teamConcat.find((p) => p.player_id == +player?.id)

  if (isPlayerInTeam) {
    return (
      <button
        className="fade-in animate-in flex w-full cursor-pointer items-center justify-center duration-300"
        key={player.id}
      >
        <Check className="border-foreground dark:border-success dark:bg-background dark:text-success bg-success text-foreground size-5 rounded border p-1 shadow-sm select-none sm:size-6" />
      </button>
    )
  } else {
    return (
      <button
        className="fade-in animate-in flex h-full w-full cursor-pointer items-center justify-center duration-300"
        key={player.id}
        onClick={handleClick}
      >
        <ArrowUpDown
          className={cn(
            'size-5 rounded border p-1 shadow-sm select-none sm:size-6',
            condition
              ? 'bg-primary text-primary-foreground border-foreground dark:text-primary dark:bg-background dark:border-primary'
              : 'text-muted-foreground border-muted-foreground'
          )}
        />
      </button>
    )
  }
}

export default SwapPlayerButton
