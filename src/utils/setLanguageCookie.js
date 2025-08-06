export const setLanguageCookie = (newLocale) => {
  const days = 30
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = date.toUTCString()
  document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`
}
