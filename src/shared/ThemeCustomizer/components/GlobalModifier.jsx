'use client'

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from 'components/ui/card'
import { useTheme } from 'next-themes'
import { useSelector, useDispatch } from 'react-redux'
import { setDarkTheme, setLightTheme } from 'lib/features/theme/theme.slice'
import { useTranslation } from 'react-i18next'
import {
  selectDarkTheme,
  selectLightTheme,
} from 'lib/features/theme/theme.selector'

const GlobalModifier = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { resolvedTheme } = useTheme()
  const darkTheme = useSelector(selectDarkTheme)
  const lightTheme = useSelector(selectLightTheme)

  const currentGlobalConfig =
    resolvedTheme === 'dark' ? darkTheme.global : lightTheme.global

  const handleChange = (cssVarName, value, configKey) => {
    const numericValue = parseFloat(value)
    if (isNaN(numericValue)) return

    const updatedValue = numericValue // Store as number in Redux
    const cssValue = `${numericValue}rem` // Apply with 'rem' unit to CSS

    if (resolvedTheme === 'dark') {
      dispatch(
        setDarkTheme({
          type: 'global',
          data: { ...darkTheme.global, [configKey]: updatedValue },
        })
      )
    } else {
      dispatch(
        setLightTheme({
          type: 'global',
          data: { ...lightTheme.global, [configKey]: updatedValue },
        })
      )
    }
    document.documentElement.style.setProperty(`--${cssVarName}`, cssValue)
  }

  const renderSlider = ({
    id,
    labelKey,
    configKey,
    cssVarName,
    min,
    max,
    step,
    unit = 'rem',
  }) => {
    const value =
      currentGlobalConfig?.[configKey] !== undefined
        ? currentGlobalConfig[configKey]
        : (min + max) / 2

    const getDisplayValue = () => {
      if (configKey === 'spacing') {
        return `${Math.round(value * 400)}%`
      }
      if (configKey === 'letterSpacing') {
        return `${(value * 1000).toFixed(1)}%`
      }
      if (configKey === 'borderRadius') {
        return `${Math.round(value * 100)}%`
      }
      return `${parseFloat(value).toFixed(configKey === 'letterSpacing' ? 3 : 2)}${unit}`
    }

    const rangeBaseClass =
      'w-full h-2 bg-[#4A4A4A] rounded-lg appearance-none cursor-pointer range-sm accent-[#ffdd00]'
    const inputBaseClass =
      'h-8 rounded-md border border-[#4A4A4A] bg-[#2D2D2D] text-xs text-[#E0E0E0] focus:border-[#ffdd00] focus:ring-1 focus:ring-[#ffdd00] focus:outline-none w-24 px-2 text-center'

    return (
      <div
        key={id}
        className="mb-3 flex flex-col space-y-1.5 rounded-md bg-[#2D2D2D] p-2.5"
      >
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="text-xs text-[#B0B0B0] capitalize">
            {t(labelKey)}
          </label>
          <span className="rounded bg-[#353535] p-1 px-2 text-center font-mono text-xs text-[#A0A0A0] select-all">
            {getDisplayValue()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            id={id}
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) =>
              handleChange(cssVarName, e.target.value, configKey)
            }
            className={rangeBaseClass}
          />
          <input
            type="number"
            value={parseFloat(value).toFixed(
              configKey === 'letterSpacing' ? 3 : 2
            )}
            min={min}
            max={max}
            step={step}
            onChange={(e) =>
              handleChange(cssVarName, e.target.value, configKey)
            }
            className={inputBaseClass}
          />
        </div>
      </div>
    )
  }

  const globalControls = [
    {
      id: 'global-spacing-slider',
      labelKey: 'Spacing Size',
      configKey: 'spacing',
      cssVarName: 'spacing',
      min: 0.2,
      max: 0.3,
      step: 0.01,
    },
    {
      id: 'global-letter-spacing-slider',
      labelKey: 'Letter Spacing',
      configKey: 'letterSpacing',
      cssVarName: 'letter-spacing',
      min: -0.05,
      max: 0.1,
      step: 0.001,
    },
    {
      id: 'global-radius-slider',
      labelKey: 'Border Radius',
      configKey: 'borderRadius',
      cssVarName: 'radius',
      min: 0,
      max: 2,
      step: 0.05,
    },
    // Add other global controls here if needed
  ]

  return (
    <Card className="w-full rounded-md border border-[#4A4A4A] bg-[#333333] text-[#E0E0E0]">
      <CardHeader className="border-b border-[#4A4A4A] px-4 py-2.5">
        <CardTitle className="text-sm font-medium">
          {t('Global Style Modifiers')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {globalControls.map(renderSlider)}
      </CardContent>
    </Card>
  )
}

export default GlobalModifier
