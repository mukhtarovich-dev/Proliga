import PlayersStructure from './PlayersStructure'
import PlayersTable from './PlayersTable'
import TransferStadiumForm from './TransferStadiumForm'
import PlayerTransfer from './PlayerTransfer'
import { memo } from 'react'
import { GameWrapper } from 'components/Game/Wrapper'
import {
  StadiumContainer,
  StadiumSectionWrapper,
} from 'components/Game/Stadium'

const Transfer = () => {
  return (
    <>
      <GameWrapper>
        <StadiumSectionWrapper>
          <StadiumContainer hideShareButton>
            <PlayersStructure />
          </StadiumContainer>
          <TransferStadiumForm />
        </StadiumSectionWrapper>
        <PlayersTable />
      </GameWrapper>
      <PlayerTransfer />
    </>
  )
}

export default memo(Transfer)
