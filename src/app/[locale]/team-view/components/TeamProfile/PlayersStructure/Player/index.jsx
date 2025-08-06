'use client'

import { selectPlayerPoint } from 'lib/features/playerPoint/playerPoint.selector'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getCorrectName } from 'utils/getCorrectName.util'
import { memo } from 'react'
import {
  PlayerContainer,
  PlayerImage,
  PlayerName,
  PlayerPoint,
} from 'components/Game/Player'

const Player = ({ player }) => {
  const { lang } = useSelector((store) => store.systemLanguage)
  const playerPoint = useSelector(selectPlayerPoint)
  const [currentPlayerPoint, setCurrentPlayerPoint] = useState(null)

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
            handleInfoModal={() => { }}
            imageErr={imageErr}
            player={player}
          />
          <PlayerName>{lastName === '' ? name : lastName}</PlayerName>
          <PlayerPoint>
            {player.is_captain
              ? (currentPlayerPoint?.point ?? 0) * 2
              : (currentPlayerPoint?.point ?? 0)}
          </PlayerPoint>
        </>
      )}
    </PlayerContainer>
  )
}

export default memo(Player)
