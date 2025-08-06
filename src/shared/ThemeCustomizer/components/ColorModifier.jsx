'use client'

import React from 'react'
import { useTheme } from 'next-themes'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from 'components/ui/accordion'
import { colorKeys, toVarName } from 'utils/colors.util'
import { useDispatch, useSelector } from 'react-redux'
import { setLightTheme, setDarkTheme } from 'lib/features/theme/theme.slice'
import { useTranslation } from 'react-i18next'
import {
  selectDarkTheme,
  selectLightTheme,
} from 'lib/features/theme/theme.selector'

const ColorModifier = () => {
  const { resolvedTheme } = useTheme()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const darkTheme = useSelector(selectDarkTheme)
  const lightTheme = useSelector(selectLightTheme)

  const handleChange = (key, color) => {
    document.documentElement.style.setProperty(toVarName(key), color)
    resolvedTheme === 'dark'
      ? dispatch(
          setDarkTheme({
            type: 'colors',
            data: { ...darkTheme.colors, [key]: color },
          })
        )
      : dispatch(
          setLightTheme({
            type: 'colors',
            data: { ...lightTheme.colors, [key]: color },
          })
        )
  }

  const formatColor = (color) => {
    // If color is in shorthand format (e.g., #fd0), expand to full format
    if (/^#([0-9a-f]{3})$/i.test(color)) {
      return color
        .split('')
        .map((char) => char + char)
        .join('')
        .replace('##', '#')
    }
    return color || '#000000' // Ensure a default valid color string
  }

  const renderColorPicker = (key) => (
    <div
      key={key}
      className="flex items-center justify-between space-x-2 rounded-md bg-[#2D2D2D] p-2.5"
    >
      <label htmlFor={key} className="flex-1 text-xs text-[#B0B0B0] capitalize">
        {t(key.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()))}
      </label>
      <div className="flex items-center space-x-2">
        {(darkTheme?.colors && Object.keys(darkTheme?.colors).length > 0) ||
        (lightTheme?.colors && Object.keys(lightTheme?.colors).length > 0) ? (
          <>
            <input
              type="color"
              id={key}
              value={formatColor(
                resolvedTheme === 'dark'
                  ? darkTheme?.colors[key] || '#000000'
                  : lightTheme?.colors[key] || '#000000'
              )}
              onChange={(e) => handleChange(key, e.target.value)}
              className="h-7 w-7 cursor-pointer appearance-none rounded-[4px] border-none bg-transparent p-0"
            />
            <span className="w-20 rounded-[4px] bg-[#353535] p-1 text-center font-mono text-xs text-[#A0A0A0] select-all">
              {formatColor(
                resolvedTheme === 'dark'
                  ? darkTheme?.colors[key] || '#000000'
                  : lightTheme?.colors[key] || '#000000'
              )}
            </span>
          </>
        ) : (
          <span className="w-20 rounded-[4px] bg-[#353535] p-1 text-center font-mono text-xs text-[#A0A0A0] select-all">
            {t('No color found')}
          </span>
        )}
      </div>
    </div>
  )

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full" // Removed bg and text color here, will be handled by items
    >
      {Object.entries(colorKeys).map(([category, keys]) => (
        <AccordionItem
          value={category}
          key={category}
          className="mb-2 rounded-md border border-[#4A4A4A] bg-[#333333] last:mb-0"
        >
          <AccordionTrigger className="w-full rounded-t-md px-4 py-2.5 text-sm font-medium text-[#E0E0E0] hover:bg-[#3A3A3A] hover:no-underline data-[state=open]:rounded-b-none data-[state=open]:bg-[#3A3A3A]">
            {t(category.charAt(0).toUpperCase() + category.slice(1))}
          </AccordionTrigger>
          <AccordionContent className="border-t border-[#4A4A4A] bg-[#2D2D2D] p-3 data-[state=closed]:animate-none data-[state=open]:animate-none">
            {keys.map(renderColorPicker)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default ColorModifier
