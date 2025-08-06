import { combineReducers } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import SystemNotificationSlice from './features/systemNotification/systemNotification.slice.js'
import AuthSlice from './features/auth/auth.slice.js'
import CompetitionSlice from './features/competition/competition.slice.js'
import PlayerSlice from './features/player/player.slice.js'
import TeamSlice from './features/team/team.slice.js'
import CurrentTeamSlice from './features/currentTeam/currentTeam.slice.js'
import ClubSlice from './features/club/club.slice.js'
import TeamPlayersSlice from './features/teamPlayer/teamPlayer.slice.js'
import TourSlice from './features/tour/tour.slice.js'
import TourTeamSlice from './features/tourTeam/tourTeam.slice.js'
import SeasonSlice from './features/season/season.slice.js'
import SystemLanguageSlice from './features/systemLanguage/systemLanguage.slice.js'
import PlayerPointSlice from './features/playerPoint/playerPoint.slice.js'
import MatchSlice from './features/match/match.slice.js'
import NewsSlice from './features/news/news.slice.js'
import UserActivitySlice from './features/userActivity/userActivity.slice.js'
import PackageSlice from './features/package/package.slice.js'
import PayBalanceSlice from './features/payBalance/payBalance.slice.js'
import PayExpenseSlice from './features/payExpense/payExpense.slice.js'
import BannerSlice from './features/banner/banner.slice.js'
import SystemConfigSlice from './features/systemConfig/systemConfig.slice.js'
import MatchEventSlice from './features/matchEvent/matchEvent.slice.js'
import ThemeSlice from './features/theme/theme.slice.js'
import UserTokenSlice from './features/userToken/userToken.slice.js'

export const combinedReducer = combineReducers({
  auth: AuthSlice,
  userToken: UserTokenSlice,
  competition: CompetitionSlice,
  player: PlayerSlice,
  team: TeamSlice,
  teamPlayer: TeamPlayersSlice,
  currentTeam: CurrentTeamSlice,
  club: ClubSlice,
  tour: TourSlice,
  season: SeasonSlice,
  tourTeam: TourTeamSlice,
  playerPoint: PlayerPointSlice,
  match: MatchSlice,
  matchEvent: MatchEventSlice,
  news: NewsSlice,
  userActivity: UserActivitySlice,
  package: PackageSlice,
  payBalance: PayBalanceSlice,
  payExpense: PayExpenseSlice,
  systemLanguage: SystemLanguageSlice,
  systemConfig: SystemConfigSlice,
  systemNotifications: SystemNotificationSlice,
  banner: BannerSlice,
  theme: ThemeSlice,
})

export const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}
