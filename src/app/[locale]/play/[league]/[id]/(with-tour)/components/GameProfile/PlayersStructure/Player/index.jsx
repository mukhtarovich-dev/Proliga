'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { selectPlayerPoint } from 'lib/features/playerPoint/playerPoint.selector'
import { setPlayerInfoModal } from 'lib/features/teamPlayer/teamPlayer.slice'
import { setCurrentPlayer } from 'lib/features/player/player.slice'
import { getCorrectName } from 'utils/getCorrectName.util'
import { memo } from 'react'
import { Info } from 'lucide-react'
import {
  PlayerContainer,
  PlayerImage,
  PlayerName,
  PlayerButtonsContainer,
  PlayerButton,
  PlayerPoint,
} from 'components/Game/Player'

const Player = ({ player }) => {
  const dispatch = useDispatch()
  const playerPoint = useSelector(selectPlayerPoint)
  const [currentPlayerPoint, setCurrentPlayerPoint] = useState(null)
  const { lang } = useSelector((store) => store.systemLanguage)

  useEffect(() => {
    if (playerPoint?.length > 0) {
      setCurrentPlayerPoint(
        playerPoint.find((item) => item.player_id === player.player_id)
      )
    } else {
      setCurrentPlayerPoint(null)
    }
  }, [playerPoint, player])

  const imageErr = (e) => {
    e.target.src = '/icons/player.svg'
  }

  const handleInfoModal = () => {
    dispatch(setCurrentPlayer(player?.player_id))
    dispatch(setPlayerInfoModal(true))
  }

  const name = getCorrectName({
    lang,
    uz: player?.player?.name,
    ru: player?.player?.name_ru,
  })

  const lastName = name?.split(' ')[1] ?? ''

  return (
    <PlayerContainer>
      {!player.name && (
        <>
          <Image
            src="/icons/player-tshirt.svg"
            alt="player tshirt"
            width={48}
            height={48}
            draggable={false}
            className="xs:size-8 size-6 md:size-10 lg:size-8 xl:size-10"
          />
        </>
      )}
      {player.name && (
        <>
          <PlayerImage
            tShirt={player?.club?.form_img}
            handleInfoModal={handleInfoModal}
            imageErr={imageErr}
            player={player}
          />
          <PlayerName>{lastName === '' ? name : lastName}</PlayerName>
          <PlayerButtonsContainer>
            <PlayerButton
              onClick={handleInfoModal}
              className={'rounded-full p-0'}
            >
              <Info className="text-foreground group-hover:text-accent-foreground size-4 sm:size-5" />
            </PlayerButton>
            <PlayerPoint>
              {player.is_captain
                ? (currentPlayerPoint?.point ?? 0) * 2
                : (currentPlayerPoint?.point ?? 0)}
            </PlayerPoint>
          </PlayerButtonsContainer>
        </>
      )}
    </PlayerContainer>
  )
}

export default memo(Player)
