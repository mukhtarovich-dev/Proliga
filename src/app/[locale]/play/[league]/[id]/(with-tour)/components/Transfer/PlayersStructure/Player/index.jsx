'use client'

import Confirmation from 'components/ConfirmationModal'
import Image from 'next/image'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteTeamPlayer,
  setPlayerTransferModal,
} from 'lib/features/teamPlayer/teamPlayer.slice'
import { selectCurrentTeam } from 'lib/features/currentTeam/currentTeam.selector'
import { useTranslation } from 'react-i18next'
import { setCurrentPlayer } from 'lib/features/player/player.slice'
import { getCorrectName } from 'utils/getCorrectName.util'
import { memo } from 'react'
import { ArrowUpDown, X } from 'lucide-react'
import {
  PlayerContainer,
  PlayerImage,
  PlayerName,
  PlayerButtonsContainer,
  PlayerButton,
} from 'components/Game/Player'

const Player = ({ player }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const currentTeam = useSelector(selectCurrentTeam)
  const { lang } = useSelector((store) => store.systemLanguage)

  const name = getCorrectName({
    lang,
    uz: player?.player?.name,
    ru: player?.player?.name_ru,
  })

  const lastName = name?.split(' ')[1] ?? ''

  const imageErr = (e) => {
    e.target.src = '/icons/player.svg'
  }

  const handleDeletePlayer = () => {
    dispatch(
      deleteTeamPlayer({
        player,
        t,
        is_team_created: currentTeam?.is_team_created,
      })
    )
    toggleDeleteModal()
  }

  const handleTransfer = () => {
    dispatch(setCurrentPlayer(player?.player_id))
    dispatch(setPlayerTransferModal(true))
  }

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen)
  }

  if (!player.name) {
    return (
      <PlayerContainer>
        <Image
          src="/icons/player-tshirt.svg"
          alt="player tshirt"
          width={48}
          height={48}
          draggable={false}
          className="xs:size-8 size-6 md:size-10 lg:size-8 xl:size-10"
        />
      </PlayerContainer>
    )
  }

  return (
    <>
      <PlayerContainer>
        <PlayerImage
          tShirt={player?.club?.form_img}
          handleInfoModal={handleTransfer}
          imageErr={imageErr}
          player={player}
        />
        <PlayerName>{lastName === '' ? name : lastName}</PlayerName>
        <PlayerButtonsContainer>
          <PlayerButton onClick={handleTransfer}>
            <ArrowUpDown className="text-foreground group-hover:text-accent-foreground size-4 sm:size-5" />
          </PlayerButton>
          <div className="border-foreground bg-background text-foreground flex h-4 w-6 cursor-default items-center justify-center rounded-sm border text-center text-xs font-bold sm:h-5 sm:w-8 md:text-sm">
            {player.price ?? '00'}
          </div>
          <PlayerButton
            onClick={toggleDeleteModal}
            className={'bg-destructive'}
          >
            <X className="text-foreground group-hover:text-accent-foreground size-4 sm:size-5" />
          </PlayerButton>
        </PlayerButtonsContainer>
      </PlayerContainer>
      <Confirmation
        onConfirm={handleDeletePlayer}
        onCancel={toggleDeleteModal}
        isModalOpen={isDeleteModalOpen}
        setModalOpen={setDeleteModalOpen}
      />
    </>
  )
}

export default memo(Player)
