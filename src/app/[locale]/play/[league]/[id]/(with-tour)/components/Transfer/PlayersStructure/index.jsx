import Player from './Player'
import { StadiumSpinner } from 'components/Game/Stadium'
import { useSelector } from 'react-redux'
import {
  selectDEF,
  selectGOA,
  selectMID,
  selectSTR,
} from 'lib/features/teamPlayer/teamPlayer.selector'
import { TOUR_STATUS } from 'utils/tour.util'
import { selectCurrentTour } from 'lib/features/tour/tour.selector'
// import { PlayersStructureContainer, MIDContainer, DEFContainer, STRContainer, GOAContainer } from 'components/Game/Player'
import {
  PlayersStructureContainer,
  MIDContainer,
  DEFContainer,
  STRContainer,
  GOAContainer,
} from 'components/Game/Player'
import { memo } from 'react'

const TransferPlayersStructure = () => {
  const currentTour = useSelector(selectCurrentTour)

  const { isLoading } = useSelector((state) => state.teamPlayer)
  const GOA = useSelector(selectGOA)
  const DEF = useSelector(selectDEF)
  const MID = useSelector(selectMID)
  const STR = useSelector(selectSTR)

  if (currentTour?.status !== TOUR_STATUS.notStartedTransfer) {
    return null
  }

  return (
    <PlayersStructureContainer>
      {isLoading ? (
        <StadiumSpinner />
      ) : (
        <>
          <GOAContainer>
            {GOA.map((player) => (
              <Player key={player.id} player={player} />
            ))}
          </GOAContainer>
          <DEFContainer>
            {DEF.map((player) => (
              <Player key={player.id} player={player} />
            ))}
          </DEFContainer>
          <MIDContainer>
            {MID.map((player) => (
              <Player key={player.id} player={player} />
            ))}
          </MIDContainer>
          <STRContainer>
            {STR.map((player) => (
              <Player key={player.id} player={player} />
            ))}
          </STRContainer>
        </>
      )}
    </PlayersStructureContainer>
  )
}

export default memo(TransferPlayersStructure)
