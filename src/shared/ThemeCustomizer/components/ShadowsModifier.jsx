'use client'

import { Card, CardHeader, CardTitle, CardContent } from 'components/ui/card'
import {
  hexToHsl,
  hslStringToHex,
  DEFAULT_SHADOWS,
  UNITS,
  SHADOW_KEYS,
  updateShadows,
} from 'utils/shadow.utils'
import { useSelector, useDispatch } from 'react-redux'
import { setDarkTheme, setLightTheme } from 'lib/features/theme/theme.slice'
import { useTheme } from 'next-themes'
import { useTranslation } from 'react-i18next'
import {
  selectDarkTheme,
  selectLightTheme,
} from 'lib/features/theme/theme.selector'

const ShadowModifier = () => {
  const { resolvedTheme } = useTheme()
  const darkTheme = useSelector(selectDarkTheme)
  const lightTheme = useSelector(selectLightTheme)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const currentShadows =
    resolvedTheme === 'dark' ? darkTheme.shadows : lightTheme.shadows

  const handleChange = (key, value) => {
    if (
      key in UNITS &&
      value &&
      !isNaN(Number(value)) &&
      !value.endsWith(UNITS[key])
    ) {
      value = `${value}${UNITS[key]}`
    } else if (key === 'shadow-opacity' && value) {
      value = parseFloat(value).toFixed(2).toString() // Ensure opacity is string like "0.50"
    }

    document.documentElement.style.setProperty(`--${key}`, value)
    const newShadowData = {
      ...(currentShadows || DEFAULT_SHADOWS),
      [key]: value,
    }

    if (resolvedTheme === 'dark') {
      dispatch(setDarkTheme({ type: 'shadows', data: newShadowData }))
    } else {
      dispatch(setLightTheme({ type: 'shadows', data: newShadowData }))
    }
    updateShadows({ [key]: value }) // This likely updates CSS variables for the main page
  }

  const renderInput = (key) => {
    const label = key.replace('shadow-', '').replace(/-/g, ' ')
    const unit = UNITS[key] || ''
    // Ensure currentShadows and DEFAULT_SHADOWS are properly providing fallbacks
    const shadowSource = currentShadows || DEFAULT_SHADOWS
    let value = shadowSource[key] || DEFAULT_SHADOWS[key] || ''

    if (key === 'shadow-color' && !value) {
      value = DEFAULT_SHADOWS['shadow-color'] // Ensure fallback for shadow-color
    }

    const numericValue =
      typeof value === 'string'
        ? value.replace(unit, '').replace(/[^\d.-]/g, '')
        : ''
    const inputBaseClass =
      'h-8 rounded-md border border-[#4A4A4A] bg-[#2D2D2D] text-xs text-[#E0E0E0] focus:border-[#ffdd00] focus:ring-1 focus:ring-[#ffdd00] focus:outline-none'
    const rangeBaseClass =
      'w-full h-2 bg-[#4A4A4A] rounded-lg appearance-none cursor-pointer range-sm accent-[#ffdd00]'

    return (
      <div
        key={key}
        className="mb-3 flex flex-col space-y-1.5 rounded-md bg-[#2D2D2D] p-2.5"
      >
        <label htmlFor={key} className="text-xs text-[#B0B0B0] capitalize">
          {t(label.charAt(0).toUpperCase() + label.slice(1))}{' '}
          {unit && `(${unit})`}
        </label>
        {key === 'shadow-color' ? (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              id={key}
              value={hslStringToHex(value || 'hsl(0 0% 0%)')} // Provide fallback for hslStringToHex
              onChange={(e) => handleChange(key, hexToHsl(e.target.value))}
              className="h-7 w-7 cursor-pointer appearance-none rounded border-none bg-transparent p-0"
            />
            <span className="flex-1 rounded bg-[#353535] p-1 text-center font-mono text-xs text-[#A0A0A0] select-all">
              {value || 'N/A'}
            </span>
          </div>
        ) : key === 'shadow-opacity' ? (
          <div className="flex items-center space-x-2">
            <input
              type="range"
              id={key}
              value={parseFloat(value) || 0}
              min={0}
              max={1}
              step={0.01}
              onChange={(e) => handleChange(key, e.target.value)}
              className={rangeBaseClass}
            />
            <input
              type="number"
              value={parseFloat(value).toFixed(2) || '0.00'}
              onChange={(e) => handleChange(key, e.target.value)}
              min={0}
              max={1}
              step={0.01}
              className={`${inputBaseClass} w-20 px-2 text-center`}
            />
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <input
              type="range"
              id={key}
              min={UNITS_MIN_MAX[key]?.min || 0}
              max={UNITS_MIN_MAX[key]?.max || 10}
              step={UNITS_MIN_MAX[key]?.step || 0.1}
              value={numericValue}
              onChange={(e) => handleChange(key, e.target.value)}
              className={rangeBaseClass}
            />
            <input
              type="number"
              value={numericValue}
              onChange={(e) => handleChange(key, e.target.value)}
              min={UNITS_MIN_MAX[key]?.min || 0}
              max={UNITS_MIN_MAX[key]?.max || 10}
              step={UNITS_MIN_MAX[key]?.step || 0.1}
              className={`${inputBaseClass} w-20 px-2 text-center`}
            />
          </div>
        )}
      </div>
    )
  }

  // Define min/max/step for range inputs based on typical shadow property values
  const UNITS_MIN_MAX = {
    'shadow-offset-x': { min: -20, max: 20, step: 0.2 },
    'shadow-offset-y': { min: -20, max: 20, step: 0.2 },
    'shadow-blur-radius': { min: 0, max: 50, step: 0.2 },
    'shadow-spread-radius': { min: -20, max: 20, step: 0.2 },
  }

  const previewShadows = (
    <div className="mt-4 space-y-3">
      <h4 className="text-xs font-medium text-[#B0B0B0]">
        {t('Shadow Previews')}
      </h4>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {['xs', 'sm', '', 'md', 'lg', 'xl'].map((size) => (
          <div
            key={size || 'base'}
            className={`flex h-16 w-full items-center justify-center rounded-md border border-[#4A4A4A] bg-[#383838] p-2 text-xs text-[#E0E0E0] ${size ? `shadow-${size}` : 'shadow'}`}
          >
            {size || 'base'}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <Card className="w-full rounded-md border border-[#4A4A4A] bg-[#333333] text-[#E0E0E0]">
      <CardHeader className="border-b border-[#4A4A4A] px-4 py-2.5">
        <CardTitle className="text-sm font-medium">
          {t('Shadow Properties')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {SHADOW_KEYS.map(renderInput)}
        {previewShadows}
      </CardContent>
    </Card>
  )
}

export default ShadowModifier
