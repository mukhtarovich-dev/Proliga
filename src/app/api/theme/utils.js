import kebabCase from 'lodash/kebabCase'
import isEmpty from 'lodash/isEmpty'

export function convertToKebabCase(key) {
  if (key.includes('-') && key.toLowerCase() === key) {
    return key
  }
  return kebabCase(key)
}

export function generateThemeCssVariables(themeConfigPart, themeType) {
  let cssString = ''

  if (!isEmpty(themeConfigPart?.colors)) {
    for (const [key, value] of Object.entries(themeConfigPart.colors)) {
      cssString += `  --${convertToKebabCase(key)}: ${value};\n`
    }
  }

  if (!isEmpty(themeConfigPart?.global)) {
    const { borderRadius, letterSpacing, spacing } = themeConfigPart.global
    if (borderRadius !== undefined) {
      cssString += `  --radius: ${borderRadius}rem;\n`
    }
    if (letterSpacing !== undefined) {
      cssString += `  --letter-spacing: ${letterSpacing}em;\n`
    }
    if (spacing !== undefined) {
      cssString += `  --spacing: ${spacing}rem;\n`
    }
  }
  if (!isEmpty(themeConfigPart?.shadows)) {
    cssString += `  --shadow-blur: ${themeConfigPart.shadows['shadow-blur']};\n`
    cssString += `  --shadow-color: ${themeConfigPart.shadows['shadow-color']};\n`
    cssString += `  --shadow-spread: ${themeConfigPart.shadows['shadow-spread']};\n`
    cssString += `  --shadow-opacity: ${themeConfigPart.shadows['shadow-opacity']};\n`
    cssString += `  --shadow-offset-x: ${themeConfigPart.shadows['shadow-offset-x']};\n`
    cssString += `  --shadow-offset-y: ${themeConfigPart.shadows['shadow-offset-y']};\n`
  }

  if (!isEmpty(themeConfigPart?.font)) {
    cssString += `  --font-sans: ${themeConfigPart.font};\n`
  }

  if (isEmpty(cssString)) return ''

  const selector = themeType === 'dark' ? ':root.dark' : ':root'
  return `${selector} {\n${cssString}}\n`
}
