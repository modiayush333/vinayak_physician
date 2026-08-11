import { motion, useReducedMotion } from 'framer-motion'
import {
  EASE,
  VIEWPORT,
  VIEWPORT_LOOSE,
  fadeUp,
  staggerContainer,
  staggerItem,
} from '../lib/motion'

/**
 * SectionReveal — wrap a section block; animates when scrolled into view.
 */
export function SectionReveal({
  children,
  className = '',
  variants = fadeUp,
  delay = 0,
  loose = false,
  as = 'div',
}) {
  const reduce = useReducedMotion()
  const Comp = motion[as] || motion.div

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={loose ? VIEWPORT_LOOSE : VIEWPORT}
      transition={{ delay }}
    >
      {children}
    </Comp>
  )
}

/**
 * StaggerReveal — parent that staggers child SectionItems / motion children.
 */
export function StaggerReveal({
  children,
  className = '',
  stagger = 0.1,
  delayChildren = 0.06,
  loose = false,
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={loose ? VIEWPORT_LOOSE : VIEWPORT}
    >
      {children}
    </motion.div>
  )
}

/** Child of StaggerReveal */
export function StaggerItem({ children, className = '', variants = staggerItem }) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  )
}

/** Animated section title helper */
export function MotionTitle({ children, className = '', as = 'h2' }) {
  const reduce = useReducedMotion()
  const Comp = motion[as] || motion.h2

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE }}
    >
      {children}
    </Comp>
  )
}
