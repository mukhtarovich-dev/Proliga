import { LANGUAGE } from './languages.util'

export const getCorrectName = ({ lang, ru, uz }) => {
  switch (lang) {
    case LANGUAGE.uz:
      return uz
    case LANGUAGE.ru:
      return ru
    default:
      return null
  }
}
