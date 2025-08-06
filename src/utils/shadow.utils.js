export const SHADOW_KEYS = [
  'shadow-color',
  'shadow-opacity',
  'shadow-blur',
  'shadow-spread',
  'shadow-offset-x',
  'shadow-offset-y',
]

export const DEFAULT_SHADOWS = {
  'shadow-color': '0, 0%, 30%',
  'shadow-opacity': '0.08',
  'shadow-blur': '3px',
  'shadow-spread': '0px',
  'shadow-offset-x': '0px',
  'shadow-offset-y': '1px',
}

export const UNITS = {
  'shadow-blur': 'px',
  'shadow-spread': 'px',
  'shadow-offset-x': 'px',
  'shadow-offset-y': 'px',
}

export const SHADOW_VARIANTS = [
  { name: '2xs', multiplier: 0.5 },
  { name: 'xs', multiplier: 0.75 },
  { name: 'sm', multiplier: 1 },
  { name: '', multiplier: 1.25 },
  { name: 'md', multiplier: 1.5 },
  { name: 'lg', multiplier: 2 },
  { name: 'xl', multiplier: 2.5 },
  { name: '2xl', multiplier: 3 },
]

export const hexToHsl = (hex) => {
  const [r, g, b] =
    hex.length === 4
      ? [hex[1] + hex[1], hex[2] + hex[2], hex[3] + hex[3]].map(
          (x) => parseInt(x, 16) / 255
        )
      : [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map(
          (x) => parseInt(x, 16) / 255
        )
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  const l = (max + min) / 2
  const s =
    max === min
      ? 0
      : l > 0.5
        ? (max - min) / (2 - max - min)
        : (max - min) / (max + min)
  const h =
    max === min
      ? 0
      : max === r
        ? ((g - b) / (max - min) + (g < b ? 6 : 0)) * 60
        : max === g
          ? ((b - r) / (max - min) + 2) * 60
          : ((r - g) / (max - min) + 4) * 60
  return `${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`
}

export const hslStringToHex = (hslString) => {
  if (!hslString || typeof hslString !== 'string') return '#000000'
  const parts = hslString.split(',').map((s) => s.trim())
  if (parts.length !== 3) return '#000000'

  const h = parseInt(parts[0])
  const s = parseInt(parts[1].replace('%', '')) / 100
  const l = parseInt(parts[2].replace('%', '')) / 100

  if (isNaN(h) || isNaN(s) || isNaN(l)) return '#000000'

  const k = (n) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))

  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`
}

export const updateShadows = (values) => {
  const {
    'shadow-offset-x': x,
    'shadow-offset-y': y,
    'shadow-blur': blur,
    'shadow-spread': spread,
    'shadow-color': color,
    'shadow-opacity': opacity,
  } = Object.fromEntries(
    Object.entries(DEFAULT_SHADOWS).map(([k, v]) => [k, values[k] || v])
  )

  SHADOW_VARIANTS.forEach(({ name, multiplier }) => {
    const varName = `--shadow${name ? '-' + name : ''}`

    const xNum = parseFloat(x)
    const yNum = parseFloat(y)
    const blurNum = parseFloat(blur)
    const spreadNum = parseFloat(spread)
    const opacityNum = parseFloat(opacity)

    const roundToTwo = (num) => Math.round(num * 100) / 100

    const finalX = `${roundToTwo(xNum * multiplier)}px`
    const finalY = `${roundToTwo(yNum * multiplier)}px`
    const finalBlur = `${roundToTwo(blurNum * multiplier)}px`
    const finalSpread = `${roundToTwo(spreadNum * multiplier)}px`
    const finalOpacity = Math.max(0, Math.min(1, opacityNum * multiplier))

    const base = `${finalX} ${finalY} ${finalBlur} ${finalSpread}`

    document.documentElement.style.setProperty(
      varName,
      `${base} hsla(${color}, ${finalOpacity})`
    )
  })
}
