import Player from './Player'
import { StadiumSpinner } from 'components/Game/Stadium'
import { useSelector } from 'react-redux'
import {
  selectDEF,
  selectGOA,
  selectMID,
  selectSTR,
} from 'lib/features/teamPlayer/teamPlayer.selector'
import {
  PlayersStructureContainer,
  GOAContainer,
  DEFContainer,
  MIDContainer,
  STRContainer,
} from 'components/Game/Player'

const ProfilePlayersStructure = () => {
  const { isLoading } = useSelector((state) => state.teamPlayer)
  const GOA = useSelector(selectGOA)
  const DEF = useSelector(selectDEF)
  const MID = useSelector(selectMID)
  const STR = useSelector(selectSTR)

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

export default ProfilePlayersStructure
