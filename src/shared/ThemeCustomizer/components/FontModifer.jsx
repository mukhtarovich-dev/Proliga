import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { fonts } from 'utils/fonts.util'
import { useSelector, useDispatch } from 'react-redux'
import { useTheme } from 'next-themes'
import { setDarkTheme, setLightTheme } from 'lib/features/theme/theme.slice'
import { useTranslation } from 'react-i18next'
import {
  selectDarkTheme,
  selectLightTheme,
} from 'lib/features/theme/theme.selector'

const FontModifier = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { resolvedTheme } = useTheme()
  const darkTheme = useSelector(selectDarkTheme)
  const lightTheme = useSelector(selectLightTheme)

  const currentFont =
    resolvedTheme === 'dark' ? darkTheme.font : lightTheme.font

  const handleFontChange = (font) => {
    if (resolvedTheme === 'dark') {
      dispatch(setDarkTheme({ type: 'font', data: font }))
    } else {
      dispatch(setLightTheme({ type: 'font', data: font }))
    }
  }

  return (
    <Card className="w-full rounded-md border border-[#4A4A4A] bg-[#333333] text-[#E0E0E0]">
      <CardHeader className="border-b border-[#4A4A4A] px-4 py-2.5">
        <CardTitle className="text-sm font-medium">
          {t('Font Family')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-1.5">
          <label
            htmlFor="font-select"
            className="text-xs font-medium text-[#B0B0B0]"
          >
            {t('Select Font')}
          </label>
          <select
            id="font-select"
            value={currentFont || ''}
            onChange={(e) => handleFontChange(e.target.value)}
            className="w-full rounded-md border border-[#4A4A4A] bg-[#2D2D2D] px-3 py-2 text-sm text-[#E0E0E0] focus:border-[#ffdd00] focus:ring-1 focus:ring-[#ffdd00] focus:outline-none"
          >
            {Object.keys(fonts).map((fontName) => (
              <option
                key={fontName}
                value={fontName}
                className="bg-[#2D2D2D] text-[#E0E0E0]"
              >
                {fontName}
              </option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  )
}

export default FontModifier
