'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner } from 'sonner'

const Toaster = ({ ...props }) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      position="top-center"
      swipeDirections={['right', 'left']}
      style={{
        '--normal-bg': 'var(--popover)',
        '--normal-text': 'var(--popover-foreground)',
        '--normal-border': 'var(--border)',
      }}
      dir="ltr"
      closeButton
      {...props}
    />
  )
}

export { Toaster }
