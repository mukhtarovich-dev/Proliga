import { DEFAULT_SHADOWS } from './shadow.utils'

export const DEFAULT_LIGHT_THEME = {
  colors: {
    background: '#fafafa',
    foreground: '#1a1a1a',
    card: '#f5f5f5',
    'card-foreground': '#1a1a1a',
    popover: '#f5f5f5',
    'popover-foreground': '#0b0b09',
    primary: '#fff400',
    'primary-foreground': '#1a1a1a',
    secondary: '#e6e6e6',
    'secondary-foreground': '#f2f2f2',
    muted: '#f0f0f0',
    'muted-foreground': '#666666',
    accent: '#dddd00',
    'accent-foreground': '#1a1a1a',
    destructive: '#ef4343',
    border: '#e0e0e0',
    input: '#ededed',
    ring: '#ffdd00',
    'chart-1': '#b30000',
    'chart-2': '#0000b3',
    'chart-3': '#b39b00',
    'chart-4': '#8026d9',
    'chart-5': '#ff3333',
    sidebar: '#e0e0e0',
    'sidebar-foreground': '#1a1a1a',
    'sidebar-primary': '#dddd00',
    'sidebar-primary-foreground': '#1a1a1a',
    'sidebar-accent': '#fff400',
    'sidebar-accent-foreground': '#1a1a1a',
    'sidebar-border': '#c0c0c0',
    'sidebar-ring': '#999999',
    'destructive-foreground': '#ffffff',
    success: '#009938',
    'success-foreground': '#ffffff',
    warning: '#e6b800',
    'warning-foreground': '#1a1a1a',
    error: '#e60000',
    'error-foreground': '#ffffff',
    info: '#0077b3',
    'info-foreground': '#ffffff',
  },
  font: 'DM Sans',
  global: {
    borderRadius: 0.5,
    spacing: 0.25,
    letterSpacing: 0,
  },
  shadows: {
    'shadow-color': '0, 0%, 30%',
    'shadow-opacity': '0.08',
    'shadow-blur': '3px',
    'shadow-spread': '0px',
    'shadow-offset-x': '0px',
    'shadow-offset-y': '1px',
  },
}

export const DEFAULT_DARK_THEME = {
  colors: {
    background: '#0d0d0d',
    foreground: '#f2f2f2',
    card: '#262626',
    'card-foreground': '#f2f2f2',
    popover: '#1f1f1f',
    'popover-foreground': '#ffdd00',
    primary: '#fffd00',
    'primary-foreground': '#1a1a1a',
    secondary: '#333333',
    'secondary-foreground': '#f2f2f2',
    muted: '#333333',
    'muted-foreground': '#b3b3b3',
    accent: '#ebd547',
    'accent-foreground': '#000000',
    destructive: '#f37272',
    border: '#404040',
    input: '#333333',
    ring: '#ffe433',
    'chart-1': '#990000',
    'chart-2': '#000099',
    'chart-3': '#998500',
    'chart-4': '#8026d9',
    'chart-5': '#ff3333',
    sidebar: '#262626',
    'sidebar-foreground': '#f2f2f2',
    'sidebar-primary': '#ebd547',
    'sidebar-primary-foreground': '#000000',
    'sidebar-accent': '#fffd00',
    'sidebar-accent-foreground': '#1a1a1a',
    'sidebar-border': '#9a2323',
    'sidebar-ring': '#666666',
    'destructive-foreground': '#ffffff',
    success: '#1cce5e',
    'success-foreground': '#ffffff',
    warning: '#fbd746',
    'warning-foreground': '#1a1a1a',
    error: '#f37272',
    'error-foreground': '#ffffff',
    info: '#02a6f7',
    'info-foreground': '#ffffff',
  },
  font: 'DM Sans',
  global: {
    borderRadius: 0.5,
    spacing: 0.25,
    letterSpacing: 0,
  },
  shadows: DEFAULT_SHADOWS,
}

// const COLOR_VARS = [
//   '--background',
//   '--foreground',
//   '--card',
//   '--card-foreground',
//   '--popover',
//   '--popover-foreground',
//   '--primary',
//   '--primary-foreground',
//   '--secondary',
//   '--secondary-foreground',
//   '--muted',
//   '--muted-foreground',
//   '--accent',
//   '--accent-foreground',
//   '--destructive',
//   '--border',
//   '--input',
//   '--ring',
//   '--chart-1',
//   '--chart-2',
//   '--chart-3',
//   '--chart-4',
//   '--chart-5',
//   '--sidebar',
//   '--sidebar-foreground',
//   '--sidebar-primary',
//   '--sidebar-primary-foreground',
//   '--sidebar-accent',
//   '--sidebar-accent-foreground',
//   '--sidebar-border',
//   '--sidebar-ring',
//   '--destructive-foreground',
//   '--success',
//   '--success-foreground',
//   '--warning',
//   '--warning-foreground',
//   '--error',
//   '--error-foreground',
//   '--info',
//   '--info-foreground',
// ]
// const SHADOW_VARS = [
//   '--shadow',
//   'shadow-color',
//   'shadow-opacity',
//   'shadow-blur',
//   'shadow-spread',
//   'shadow-offset-x',
//   'shadow-offset-y',
// ]

// const extractShadowValues = (shadowobj) => {
//   const shadowString = shadowobj['shadow']

//   if (!shadowString) return {}

//   // Match pattern: <offset-x> <offset-y> <blur> <spread> hsla(<hue>, <saturation>%, <lightness>%, <opacity>)
//   const regex =
//     /^([-\d.]+)px\s+([-\d.]+)px\s+([-\d.]+)px\s+([-\d.]+)px\s+hsla\((\d+),\s*(\d+)%,\s*(\d+)%,\s*([\d.]+)\)$/
//   const matches = shadowString.match(regex)

//   if (!matches) return {}

//   const [
//     ,
//     offsetX,
//     offsetY,
//     blur,
//     spread,
//     hue,
//     saturation,
//     lightness,
//     opacity,
//   ] = matches

//   return {
//     'shadow-color': `${hue}, ${saturation}%, ${lightness}%`,
//     'shadow-opacity': opacity,
//     'shadow-blur': `${blur}px`,
//     'shadow-spread': `${spread}px`,
//     'shadow-offset-x': `${offsetX}px`,
//     'shadow-offset-y': `${offsetY}px`,
//   }
// }

// const GLOBAL_VARS = ['--spacing', '--letter-spacing', '--radius']
// const FONT_VARS = ['--font-sans']

// const extractStylesFromRootCSS = (variableNames) => {
//   if (typeof window === 'undefined') return {} // Guard for SSR environments
//   const computedStyles = getComputedStyle(document.documentElement)
//   const styles = {}
//   variableNames.forEach((varName) => {
//     const value = computedStyles.getPropertyValue(varName.trim()).trim()
//     if (value) {
//       styles[varName] = value // Remove '--' prefix for the key
//     }
//   })
//   return styles
// }
