import { cn } from 'lib/utils'

export function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = 'var(--color-chart-2)',
  colorVia = 'var(--color-chart-1)',
  colorTo = 'var(--color-chart-3)',
  ...props
}) {
  return (
    <span
      style={{
        '--bg-size': `${speed * 300}%`,
        '--color-from': colorFrom,
        '--color-via': colorVia,
        '--color-to': colorTo,
      }}
      className={cn(
        `animate-gradient inline bg-gradient-to-r from-[var(--color-from)] via-[var(--color-via)] to-[var(--color-to)] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export default AnimatedGradientText
