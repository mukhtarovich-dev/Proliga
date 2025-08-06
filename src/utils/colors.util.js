export const colorKeys = {
  base: [
    'background',
    'foreground',
    'card',
    'card-foreground',
    'popover',
    'popover-foreground',
  ],
  primary: [
    'primary',
    'primary-foreground',
    'secondary',
    'secondary-foreground',
  ],
  states: [
    'muted',
    'muted-foreground',
    'accent',
    'accent-foreground',
    'destructive',
    'border',
    'input',
    'ring',
  ],
  charts: ['chart-1', 'chart-2', 'chart-3'],
  sidebar: [
    'sidebar',
    'sidebar-foreground',
    'sidebar-primary',
    'sidebar-primary-foreground',
    'sidebar-accent',
    'sidebar-accent-foreground',
    'sidebar-border',
    'sidebar-ring',
  ],
}

export const toVarName = (key) => `--${key}`
