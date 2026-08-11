/**
 * Shared Framer Motion tokens — use across all sections for consistent motion.
 */
export const EASE = [0.22, 1, 0.36, 1]
export const EASE_OUT = [0.16, 1, 0.3, 1]

export const VIEWPORT = {
  once: true,
  amount: 0.25,
  margin: '0px 0px -8% 0px',
}

export const VIEWPORT_LOOSE = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -5% 0px',
}

/** Fade + rise — titles, paragraphs, blocks */
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

export const fadeUpSoft = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.55, ease: EASE },
  },
}

export const fadeLeft = {
  hidden: { opacity: 0, x: -32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: EASE },
  },
}

export const fadeRight = {
  hidden: { opacity: 0, x: 32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: EASE },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
}

/** Parent for staggered children */
export const staggerContainer = (stagger = 0.1, delayChildren = 0.08) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
})

export const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
}

export const staggerItemScale = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
}
