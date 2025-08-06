'use client'

import ProfileStadiumForm from './ProfileStadiumForm'
import ProfilePlayersStructure from './PlayersStructure'
import GameBrief from './GameBrief'
import PlayerInfo from './PlayerInfo'
import { memo } from 'react'
import { GameWrapper } from 'components/Game/Wrapper'
import {
  StadiumContainer,
  StadiumSectionWrapper,
} from 'components/Game/Stadium'

const GameProfile = () => {
  return (
    <>
      <GameWrapper>
        <StadiumSectionWrapper>
          <StadiumContainer>
            <ProfilePlayersStructure />
          </StadiumContainer>
          <ProfileStadiumForm />
        </StadiumSectionWrapper>
        <GameBrief />
      </GameWrapper>
      <PlayerInfo />
    </>
  )
}

export default memo(GameProfile)
