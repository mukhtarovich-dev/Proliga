'use client'

import { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTheme } from 'next-themes'
import { colorKeys, toVarName } from 'utils/colors.util'
import { SHADOW_KEYS, updateShadows } from 'utils/shadow.utils'
import { selectUser } from 'lib/features/auth/auth.selector'
import {
  selectDarkTheme,
  selectLightTheme,
} from 'lib/features/theme/theme.selector'
import {
  fetchUserThemes,
  fetchThemes,
} from 'lib/features/theme/theme.thunk'
import { selectThemes } from 'lib/features/theme/theme.selector'
import { setTheme, setDefaultTheme } from 'lib/features/theme/theme.slice'

const CustomThemeProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { resolvedTheme } = useTheme()
  const darkTheme = useSelector(selectDarkTheme)
  const lightTheme = useSelector(selectLightTheme)
  const user = useSelector(selectUser)
  const themes = useSelector(selectThemes)

  // 1. the user is not logged in set default
  // 2. the user is logged in but there is no theme_id or user_theme_id set default
  // 3. the user is logged in and there is a theme_id set the theme_id
  // 4. the user is logged in and there is a user_theme_id set the user_theme_id
  // 5. the user is logged in and there is a theme_id and user_theme_id set the user_theme_id

  useEffect(() => {
    dispatch(fetchThemes())
    if (user?.id) {
      dispatch(fetchUserThemes(user?.id))
      return
    }
  }, [dispatch, user?.id])

  useEffect(() => {
    if (!themes?.length) return

    const handleThemeSelection = () => {
      if (!user?.id || (!user?.theme_id && !user?.user_theme_id)) {
        dispatch(setDefaultTheme())
        return
      }

      const themeId = user.user_theme_id || user.theme_id
      if (themeId) {
        dispatch(setTheme(themeId))
        return
      }
    }

    handleThemeSelection()
  }, [dispatch, user?.id, themes?.length, user?.theme_id, user?.user_theme_id])

  // Apply colors from Redux store to DOM
  useEffect(() => {
    const currentColors =
      resolvedTheme === 'dark' ? darkTheme?.colors : lightTheme?.colors
    const allColorVars = Object.values(colorKeys).flat().map(toVarName)

    if (!currentColors || !Object.keys(currentColors).length) {
      allColorVars.forEach((varName) => {
        document.documentElement.style.removeProperty(varName)
      })
      return
    }

    allColorVars.forEach((varName) => {
      const originalKey = Object.values(colorKeys)
        .flat()
        .find((key) => toVarName(key) === varName)

      if (originalKey && currentColors[originalKey]) {
        document.documentElement.style.setProperty(
          varName,
          currentColors[originalKey]
        )
      } else {
        document.documentElement.style.removeProperty(varName)
      }
    })
  }, [resolvedTheme, darkTheme?.colors, lightTheme?.colors])

  // Apply fonts from Redux store to DOM
  useEffect(() => {
    const font = resolvedTheme === 'dark' ? darkTheme?.font : lightTheme?.font

    document.documentElement.style[font ? 'setProperty' : 'removeProperty'](
      '--font-sans',
      font
    )
    document.body.style.fontFamily = font || ''
  }, [resolvedTheme, darkTheme?.font, lightTheme?.font])

  // Apply shadows from Redux store to DOM
  useEffect(() => {
    const currentShadows =
      resolvedTheme === 'dark' ? darkTheme?.shadows : lightTheme?.shadows
    const shadowVars = SHADOW_KEYS.map((key) => `--${key}`)

    if (!currentShadows || !Object.keys(currentShadows).length) {
      shadowVars.forEach((varName) => {
        document.documentElement.style.removeProperty(varName)
      })
      updateShadows({})
      return
    }

    shadowVars.forEach((varName) => {
      const key = varName.substring(2)
      const value = currentShadows[key]

      if (value != null) {
        document.documentElement.style.setProperty(varName, String(value))
      } else {
        document.documentElement.style.removeProperty(varName)
      }
    })

    updateShadows(currentShadows)
  }, [resolvedTheme, darkTheme?.shadows, lightTheme?.shadows])

  // Apply global styles from Redux store to DOM
  useEffect(() => {
    const globalStyles =
      resolvedTheme === 'dark' ? darkTheme?.global : lightTheme?.global
    const vars = {
      spacing: { var: '--spacing', unit: 'rem' },
      letterSpacing: { var: '--letter-spacing', unit: 'em' },
      borderRadius: { var: '--radius', unit: 'rem' },
    }

    if (!globalStyles || !Object.keys(globalStyles).length) {
      Object.values(vars).forEach(({ var: varName }) => {
        document.documentElement.style.removeProperty(varName)
      })
      return
    }

    Object.entries(vars).forEach(([key, { var: varName, unit }]) => {
      const value = globalStyles[key]
      if (value != null) {
        document.documentElement.style.setProperty(varName, `${value}${unit}`)
      } else {
        document.documentElement.style.removeProperty(varName)
      }
    })
  }, [resolvedTheme, darkTheme?.global, lightTheme?.global])

  return children
}

export default memo(CustomThemeProvider)
