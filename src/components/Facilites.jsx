import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { facilitiesData } from '../assets/Data/Facilites'
import { EASE } from '../lib/motion'

const SMOOTH = { duration: 0.65, ease: EASE }
const AUTOPLAY_MS = 1300
const SIDE_SCALE = 0.82
const SIDE_OPACITY = 0.65
const COPIES = 3

/**
 * Responsive card metrics:
 * - phone: single card
 * - tablet: 3-up peek, smaller cards
 * - laptop / Mac: larger cards that still fit 3 fully
 */
function useCarouselMetrics() {
  const [metrics, setMetrics] = useState({
    cardW: 360,
    step: 400,
    mode: 'desktop',
    trackH: 520,
  })

  useEffect(() => {
    const sync = () => {
      const w = window.innerWidth

      // Phone — single focus card
      if (w < 640) {
        const cardW = Math.min(300, w - 48)
        setMetrics({
          cardW,
          step: 0,
          mode: 'mobile',
          trackH: Math.round(cardW * 1.35 + 56),
        })
        return
      }

      // Available content width (site-shell padding approx)
      const pad = w >= 1280 ? 96 : w >= 768 ? 64 : 48
      const avail = Math.min(w - pad, 1280)

      let cardW
      let gapRatio = 0.08

      if (w >= 1440) {
        // Large Mac
        cardW = 420
        gapRatio = 0.07
      } else if (w >= 1280) {
        cardW = 380
        gapRatio = 0.08
      } else if (w >= 1024) {
        // Laptop
        cardW = 320
        gapRatio = 0.09
      } else if (w >= 768) {
        // Tablet landscape / large tablet
        cardW = 260
        gapRatio = 0.1
      } else {
        // Tablet portrait / large phone landscape
        cardW = 210
        gapRatio = 0.1
      }

      let gap = Math.max(16, Math.round(cardW * gapRatio))
      let step = cardW + gap
      const needed = 2 * step + cardW * SIDE_SCALE

      if (needed > avail) {
        const scale = avail / needed
        cardW = Math.max(180, Math.floor(cardW * scale))
        gap = Math.max(14, Math.round(cardW * gapRatio))
        step = cardW + gap
      }

      // Image aspect 4/5 + title row
      const trackH = Math.round(cardW * 1.25 + 64)

      setMetrics({
        cardW,
        step,
        mode: 'desktop',
        trackH,
      })
    }

    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  return metrics
}

export default function Facilities() {
  const { title, items } = facilitiesData
  const count = items.length
  const sectionRef = useRef(null)
  const carouselRef = useRef(null)
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const carouselInView = useInView(carouselRef, {
    once: false,
    amount: 0.45,
    margin: '-8% 0px -8% 0px',
  })
  const [index, setIndex] = useState(count)
  const [instant, setInstant] = useState(false)
  const [paused, setPaused] = useState(false)
  const [autoplayReady, setAutoplayReady] = useState(false)
  const { cardW, step, mode, trackH } = useCarouselMetrics()
  const isMobile = mode === 'mobile'
  const realIndex = ((index % count) + count) % count

  const loopItems = Array.from({ length: COPIES }, (_, copy) =>
    items.map((item) => ({
      ...item,
      key: `${copy}-${item.id}`,
    })),
  ).flat()

  useEffect(() => {
    if (!carouselInView) {
      setAutoplayReady(false)
      return undefined
    }
    const id = window.setTimeout(() => setAutoplayReady(true), 400)
    return () => window.clearTimeout(id)
  }, [carouselInView])

  useEffect(() => {
    if (!autoplayReady || paused || count < 2) return undefined
    const id = window.setInterval(() => {
      setInstant(false)
      setIndex((prev) => prev + 1)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [autoplayReady, paused, count])

  const normalizeLoop = () => {
    if (count < 2) return
    if (index >= count * 2) {
      setInstant(true)
      setIndex(index - count)
    } else if (index < count) {
      setInstant(true)
      setIndex(index + count)
    }
  }

  const goToReal = (targetReal) => {
    setInstant(false)
    setIndex(count + targetReal)
  }

  const slideTransition = instant ? { duration: 0 } : SMOOTH

  return (
    <section
      ref={sectionRef}
      id="facilities"
      className="relative overflow-x-clip bg-[#ebedee] py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="site-shell">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: EASE }}
          className="type-section-title mx-auto max-w-3xl px-1 text-center text-[#292929]"
        >
          {title}
        </motion.h2>

        <motion.div
          ref={carouselRef}
          initial={{ opacity: 0, y: 40 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
          className="relative mt-7 sm:mt-9 md:mt-10 lg:mt-12"
        >
          {!isMobile ? (
            <div
              className="relative mx-auto w-full max-w-[1280px]"
              style={{ height: trackH }}
            >
              <motion.div
                className="absolute inset-y-0 left-1/2 will-change-transform"
                style={{ marginLeft: -cardW / 2, width: 0 }}
                animate={{ x: -index * step }}
                transition={slideTransition}
                onAnimationComplete={() => {
                  if (instant) {
                    setInstant(false)
                    return
                  }
                  normalizeLoop()
                }}
              >
                {loopItems.map((item, loopIndex) => {
                  const isActive = loopIndex === index
                  const abs = Math.abs(loopIndex - index)
                  if (abs > 2) return null
                  const visible = abs <= 1

                  return (
                    <motion.button
                      key={item.key}
                      type="button"
                      aria-label={item.title}
                      aria-pressed={isActive}
                      tabIndex={visible ? 0 : -1}
                      onClick={() => {
                        if (!visible) return
                        setInstant(false)
                        setIndex(loopIndex)
                      }}
                      className="origin-bottom border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                      style={{
                        width: cardW,
                        position: 'absolute',
                        left: loopIndex * step,
                        bottom: 0,
                        zIndex: isActive ? 20 : Math.max(1, 12 - abs),
                        pointerEvents: visible ? 'auto' : 'none',
                      }}
                      initial={false}
                      animate={{
                        scale: isActive ? 1 : SIDE_SCALE,
                        opacity: isActive ? 1 : abs === 1 ? SIDE_OPACITY : 0,
                        y: isActive ? 0 : 8,
                      }}
                      transition={slideTransition}
                    >
                      <motion.article
                        className="overflow-hidden rounded-2xl bg-white sm:rounded-[1.25rem] md:rounded-3xl"
                        animate={{
                          boxShadow: isActive
                            ? '0 22px 50px rgba(26,53,79,0.18)'
                            : '0 10px 28px rgba(26,53,79,0.08)',
                        }}
                        transition={slideTransition}
                      >
                        <div className="aspect-[4/5] w-full overflow-hidden">
                          <motion.img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            animate={{ scale: isActive ? 1 : 1.04 }}
                            transition={slideTransition}
                          />
                        </div>
                        <div className="px-3 py-2.5 text-center sm:px-4 sm:py-3 md:px-5 md:py-4">
                          <h3 className="font-display text-[13px] font-semibold leading-snug tracking-tight text-[#1A354F] sm:text-[14px] md:text-[15px] lg:text-[16px] xl:text-[27px]">
                            {item.title}
                          </h3>
                        </div>
                      </motion.article>
                    </motion.button>
                  )
                })}
              </motion.div>
            </div>
          ) : (
            <div className="relative mx-auto w-full max-w-[300px] px-1">
              <AnimatePresence mode="wait">
                {items.map((item, i) => {
                  if (i !== realIndex) return null
                  return (
                    <motion.article
                      key={`${item.id}-${realIndex}`}
                      initial={{ opacity: 0, x: 24, scale: 0.97 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -24, scale: 0.97 }}
                      transition={SMOOTH}
                      className="overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_rgba(26,53,79,0.14)]"
                    >
                      <div className="aspect-[4/5] w-full overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                          draggable={false}
                        />
                      </div>
                      <div className="px-4 py-3 text-center">
                        <h3 className="font-display text-[15px] font-semibold leading-snug text-[#1A354F] sm:text-[16px]">
                          {item.title}
                        </h3>
                      </div>
                    </motion.article>
                  )
                })}
              </AnimatePresence>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {items.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Show ${item.title}`}
                    aria-pressed={i === realIndex}
                    onClick={() => goToReal(i)}
                    className={`h-2 rounded-full border-0 transition-all duration-500 ease-out ${
                      i === realIndex ? 'w-6 bg-[#285078]' : 'w-2 bg-[#285078]/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
