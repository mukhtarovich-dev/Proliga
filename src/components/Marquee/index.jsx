import { cn } from 'lib/utils'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from 'framer-motion'
import { useRef, useEffect } from 'react'

const Marquee = ({ text, className, textClassName }) => {
  const baseVelocity = -100 // pixels per second
  const baseX = useMotionValue(-1000)
  const x = useTransform(baseX, (value) => `${value}px`)

  const containerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current && textRef.current) {
        baseX.set(containerRef.current.offsetWidth)
      }
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [baseX])

  useAnimationFrame((_, delta) => {
    if (!containerRef.current || !textRef.current) return

    const containerWidth = containerRef.current.offsetWidth
    const textWidth = textRef.current.offsetWidth

    let moveBy = baseVelocity * (delta / 1000)

    if (baseX.get() < -textWidth) {
      baseX.set(containerWidth)
    }

    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div
      ref={containerRef}
      className={cn(
        'border-primary/50 text-secondary-foreground overflow-hidden border-y text-xs',
        className
      )}
    >
      <motion.p
        ref={textRef}
        style={{ x }}
        className={cn(
          'inline-flex font-bold tracking-wider whitespace-nowrap uppercase',
          textClassName
        )}
      >
        {text}
      </motion.p>
    </div>
  )
}

export default Marquee
