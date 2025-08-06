import { LANGUAGE } from './languages.util'
import { PLAYER_POSITION } from './player.util'

export const getCorrentPlayerPosition = (position, lang, type = 'short') => {
  if (type === 'short') {
    if (lang === LANGUAGE.uz) {
      switch (position) {
        case PLAYER_POSITION.GOA:
          return 'DR'
        case PLAYER_POSITION.DEF:
          return 'HM'
        case PLAYER_POSITION.MID:
          return 'YH'
        case PLAYER_POSITION.STR:
          return 'HJ'
        default:
          return position
      }
    }
    if (lang === LANGUAGE.ru) {
      switch (position) {
        case PLAYER_POSITION.GOA:
          return 'ВР'
        case PLAYER_POSITION.DEF:
          return 'ЗЩ'
        case PLAYER_POSITION.MID:
          return 'ПЗ'
        case PLAYER_POSITION.STR:
          return 'НП'
        default:
          return position
      }
    }
  }
  if (type === 'full') {
    if (lang === LANGUAGE.uz) {
      switch (position) {
        case PLAYER_POSITION.GOA:
          return 'Darvozabon'
        case PLAYER_POSITION.DEF:
          return 'Himoyachi'
        case PLAYER_POSITION.MID:
          return 'Yarim Himoyachi'
        case PLAYER_POSITION.STR:
          return 'Hujumchi'
        default:
          return position
      }
    }
    if (lang === LANGUAGE.ru) {
      switch (position) {
        case PLAYER_POSITION.GOA:
          return 'Вратарь'
        case PLAYER_POSITION.DEF:
          return 'Защитник'
        case PLAYER_POSITION.MID:
          return 'Полузащитник'
        case PLAYER_POSITION.STR:
          return 'Нападающий'
        default:
          return position
      }
    }
  }
}
