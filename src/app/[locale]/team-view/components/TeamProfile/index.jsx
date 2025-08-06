import ProfilePlayersStructure from './PlayersStructure'
import GameBrief from './GameBrief'
import LeftSideBanner from 'shared/Banners/LeftSide'
import RightSideBanner from 'shared/Banners/RightSide'
import {
  StadiumContainer,
  StadiumSectionWrapper,
} from 'components/Game/Stadium'
import { GameWrapper } from 'components/Game/Wrapper'

const TeamProfile = () => {
  return (
    <GameWrapper>
      <LeftSideBanner />
      <StadiumSectionWrapper>
        <StadiumContainer hideShareButton>
          <ProfilePlayersStructure />
        </StadiumContainer>
      </StadiumSectionWrapper>
      <GameBrief />
      <RightSideBanner />
    </GameWrapper>
  )
}

export default TeamProfile
