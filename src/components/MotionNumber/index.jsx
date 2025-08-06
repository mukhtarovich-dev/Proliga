'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from 'lib/utils'

export default function MotionNumber({
  value,
  duration = 1000,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) {
  const [displayValue, setDisplayValue] = useState(value)
  const animationFrameId = useRef(null)
  const startTime = useRef(null)
  const startValue = useRef(value)

  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

  useEffect(() => {
    // Clean up previous animation
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current)
    }

    startValue.current = displayValue
    startTime.current = performance.now()

    const animateValue = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp

      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)

      const currentValue =
        startValue.current + (value - startValue.current) * easedProgress
      setDisplayValue(currentValue)

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(animateValue)
      }
    }

    animationFrameId.current = requestAnimationFrame(animateValue)

    // Cleanup animation on unmount or value change
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  const formattedValue = `${prefix}${displayValue.toFixed(decimals)}${suffix}`

  return (
    <span className={cn('tabular-nums', className)} aria-live="polite">
      {formattedValue}
    </span>
  )
}
