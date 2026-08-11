import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import gsap from 'gsap'
import { servicesData } from '../assets/Data/Services'

const EASE = [0.22, 1, 0.36, 1]

const SPEED = {
  desktop: 180,
  tablet: 240,
  mobile: 200,
}

const GAP = {
  desktop: 28,
  tablet: 24,
  mobile: 16,
}

function getBp(width) {
  if (width >= 1024) return 'desktop'
  if (width >= 768) return 'tablet'
  return 'mobile'
}

function ServiceSlide({ item, index, gap, decorative = false }) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <article
      className="
        group relative h-[min(62svh,420px)] w-[min(76vw,280px)] shrink-0 overflow-hidden
        rounded-[1.35rem] border border-white/25
        sm:h-[460px] sm:w-[300px] sm:rounded-[1.5rem]
        md:h-[500px] md:w-[340px] md:rounded-[1.6rem]
        lg:h-[560px] lg:w-[400px]
        xl:h-[620px] xl:w-[460px]
        2xl:h-[660px] 2xl:w-[500px]
      "
      style={{ marginRight: gap }}
    >
      <img
        src={item.image}
        alt={
          decorative
            ? ''
            : `${item.title} — specialized medical care at Vinayak Heart Medicare`
        }
        className="absolute inset-0 h-full w-full object-cover transition duration-700 motion-reduce:transition-none lg:group-hover:scale-105"
        draggable={false}
        loading={decorative || index > 0 ? 'lazy' : 'eager'}
        decoding="async"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(15,36,56,0.55) 10%, rgba(15,36,56,0.15) 38%, rgba(15,36,56,0.25) 58%, rgba(8,24,36,0.88) 80%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-3 flex items-start gap-3 border-b border-white/40 px-3 pb-3 pt-5 sm:mx-4 sm:px-4 sm:pt-6">
        <span className="font-display text-[2.35rem] font-medium leading-none tracking-tight text-white/95 sm:text-[2.6rem] md:text-[2.85rem]">
          {num}
        </span>
        <span className="mt-2 h-8 w-px shrink-0 bg-white/55" aria-hidden="true" />
        <h3 className="mt-2 min-w-0 font-display text-[0.95rem] font-semibold leading-snug tracking-tight text-white sm:text-[1.05rem] md:text-[1.35rem] lg:text-[1.5rem]">
          {item.title}
        </h3>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-5 sm:px-5 sm:pb-6 md:pb-7">
        <p className="font-body text-[13px] leading-relaxed text-white/90 text-lg md:text-xl">
          {item.description}
        </p>
      </div>
    </article>
  )
}

function CardGroup({ items, gap, decorative = false, groupRef }) {
  return (
    <div
      ref={groupRef}
      className="flex shrink-0"
      aria-hidden={decorative ? true : undefined}
    >
      {items.map((item, index) => (
        <ServiceSlide
          key={`${decorative ? 'b' : 'a'}-${item.id}`}
          item={item}
          index={index}
          gap={gap}
          decorative={decorative}
        />
      ))}
    </div>
  )
}

/**
 * Services — infinite loop starts only after section is settled on screen
 */
export default function Services() {
  const { title, items } = servicesData
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const trackRef = useRef(null)
  const groupARef = useRef(null)
  const tweenRef = useRef(null)
  const startedRef = useRef(false)
  const loopReadyRef = useRef(false)

  const inView = useInView(sectionRef, { once: true, amount: 0.12 })
  const prefersReducedMotion = useReducedMotion()

  const [bp, setBp] = useState(() =>
    typeof window !== 'undefined' ? getBp(window.innerWidth) : 'desktop',
  )
  const [loopReady, setLoopReady] = useState(false)

  const gap = GAP[bp]

  useEffect(() => {
    loopReadyRef.current = loopReady
  }, [loopReady])

  useEffect(() => {
    const onResize = () => setBp(getBp(window.innerWidth))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Wait until Services section is properly set in the viewport, then start loop
  useEffect(() => {
    if (prefersReducedMotion) {
      setLoopReady(false)
      startedRef.current = false
      return undefined
    }

    const el = sectionRef.current
    if (!el) return undefined

    let settleTimer = 0

    const isSectionSettled = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1

      // Section top near top of viewport (user arrived at this section)
      const topSettled = rect.top <= vh * 0.2 && rect.top >= -vh * 0.2
      // Enough of the section is on screen
      const mostlyVisible = rect.bottom >= vh * 0.55 && rect.top < vh * 0.45

      return topSettled && mostlyVisible
    }

    const isSectionAway = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      return rect.bottom < vh * 0.12 || rect.top > vh * 0.88
    }

    const check = () => {
      if (isSectionSettled()) {
        if (startedRef.current) return
        startedRef.current = true
        // Short settle so layout is fully painted before motion starts
        window.clearTimeout(settleTimer)
        settleTimer = window.setTimeout(() => setLoopReady(true), 300)
        return
      }

      if (startedRef.current && isSectionAway()) {
        window.clearTimeout(settleTimer)
        settleTimer = 0
        startedRef.current = false
        setLoopReady(false)
      }
    }

    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)

    return () => {
      window.clearTimeout(settleTimer)
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [prefersReducedMotion])

  useLayoutEffect(() => {
    const stage = stageRef.current
    const track = trackRef.current
    const groupA = groupARef.current
    if (!stage || !track || !groupA) return undefined

    if (prefersReducedMotion) {
      tweenRef.current?.kill()
      tweenRef.current = null
      gsap.set(track, { x: 0, clearProps: 'transform' })
      return undefined
    }

    const setup = () => {
      const progress = tweenRef.current?.progress?.() ?? 0

      tweenRef.current?.kill()
      tweenRef.current = null
      gsap.set(track, { x: 0, force3D: true })

      const groupWidth = Math.ceil(groupA.getBoundingClientRect().width)
      if (groupWidth < 40) return

      tweenRef.current = gsap.to(track, {
        x: -groupWidth,
        duration: groupWidth / SPEED[bp],
        ease: 'none',
        repeat: -1,
        force3D: true,
        paused: true,
      })

      // Keep position if loop already running; otherwise wait for settle
      if (loopReadyRef.current) {
        tweenRef.current.progress(progress)
        tweenRef.current.play()
      }
    }

    const ctx = gsap.context(setup, stage)
    const raf = requestAnimationFrame(() => requestAnimationFrame(setup))
    const ro = new ResizeObserver(setup)
    ro.observe(groupA)
    ro.observe(stage)

    const imgs = [...groupA.querySelectorAll('img')]
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener('load', setup)
    })

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      imgs.forEach((img) => img.removeEventListener('load', setup))
      tweenRef.current?.kill()
      ctx.revert()
    }
  }, [bp, items.length, gap, prefersReducedMotion])

  // Play / pause only after section is settled on screen
  useEffect(() => {
    const tw = tweenRef.current
    const track = trackRef.current
    if (!tw) return
    if (loopReady && !prefersReducedMotion) {
      tw.play()
    } else {
      tw.pause()
      tw.progress(0)
      if (track) gsap.set(track, { x: 0 })
    }
  }, [loopReady, prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28"
    >
      <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="type-section-title mx-auto text-center text-[#292929]"
        >
          {title}
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
        className="relative mt-8 sm:mt-10 md:mt-12"
      >
        <div
          ref={stageRef}
          className="relative overflow-hidden pl-4 pr-4 sm:pl-6 sm:pr-6 md:pl-8 md:pr-8 lg:pl-10 lg:pr-10 xl:pl-12 xl:pr-12"
        >
          <div
            ref={trackRef}
            className="flex w-max will-change-transform"
            style={{ transform: 'translate3d(0,0,0)' }}
          >
            {/* Set A — cards 1 → 14 */}
            <CardGroup items={items} gap={gap} groupRef={groupARef} />
            {/* Set B — duplicate so after 14, card 1 continues seamlessly */}
            <CardGroup items={items} gap={gap} decorative />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
