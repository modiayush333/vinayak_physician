import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { processData } from '../assets/Data/Process'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/** Architectural smooth easing matching STILL / FORM */
const TRANSITION_EASE = [0.22, 1, 0.36, 1]
const TRANSITION_DURATION = 0.85

/** Safe initial slot dimensions before DOM measurement to prevent initial layout flash */
function getInitialSlots() {
  if (typeof window === 'undefined') return null
  const w = window.innerWidth
  const h = window.innerHeight
  const isMobile = w < 1024

  if (isMobile) {
    const isTablet = w >= 640
    const cardW = isTablet ? Math.min(w * 0.65, 540) : Math.min(w - 28, 440)
    const cardH = isTablet ? Math.min(h * 0.5, 480) : Math.min(h * 0.46, 380)
    const thumbW = isTablet ? 120 : 82
    const thumbH = isTablet ? 154 : 106
    const thumbOffset = isTablet ? 28 : 16
    return {
      topLeft: { x: thumbOffset, y: h - thumbH - thumbOffset, width: thumbW, height: thumbH, borderRadius: isTablet ? 22 : 18 },
      center: {
        x: (w - cardW) / 2,
        y: isTablet ? 64 : 50,
        width: cardW,
        height: cardH,
        borderRadius: isTablet ? 28 : 26,
      },
      bottomRight: { x: w - thumbW - thumbOffset, y: h - thumbH - thumbOffset, width: thumbW, height: thumbH, borderRadius: isTablet ? 22 : 18 },
    }
  }

  const heroW = Math.min(w * 0.36, 540)
  const heroH = Math.min(h * 0.8, 760)
  const heroX = (w - heroW) / 2 // Exactly dead center on desktop
  const heroY = Math.max(70, (h - heroH) / 2 + 8)

  return {
    topLeft: { x: heroX - 162, y: heroY + 8, width: 140, height: 200, borderRadius: 22 },
    center: { x: heroX, y: heroY, width: heroW, height: heroH, borderRadius: 32 },
    bottomRight: { x: heroX + heroW + 24, y: heroY + heroH - 208, width: 140, height: 200, borderRadius: 22 },
  }
}

export default function Process() {
  const { title, steps } = processData
  const [activeIndex, setActiveIndex] = useState(0)
  const [slots, setSlots] = useState(() => getInitialSlots())
  const isNavigatingRef = useRef(false)
  const navTimeoutRef = useRef(null)

  const wrapperRef = useRef(null)
  const containerRef = useRef(null)

  // Desktop slot anchors
  const tlSlotDesktopRef = useRef(null)
  const centerSlotDesktopRef = useRef(null)
  const brSlotDesktopRef = useRef(null)

  // Mobile slot anchors
  const tlSlotMobileRef = useRef(null)
  const centerSlotMobileRef = useRef(null)
  const brSlotMobileRef = useRef(null)

  // Measure DOM slot bounding rectangles relative to sticky container
  const updateSlots = useCallback(() => {
    if (!containerRef.current) return
    const isMobile = window.innerWidth < 1024

    const tlRef = isMobile ? tlSlotMobileRef.current : tlSlotDesktopRef.current
    const centerRef = isMobile ? centerSlotMobileRef.current : centerSlotDesktopRef.current
    const brRef = isMobile ? brSlotMobileRef.current : brSlotDesktopRef.current

    if (!tlRef || !centerRef || !brRef) return

    const cRect = containerRef.current.getBoundingClientRect()
    const tlRect = tlRef.getBoundingClientRect()
    const centerRect = centerRef.getBoundingClientRect()
    const brRect = brRef.getBoundingClientRect()

    const isTablet = isMobile && window.innerWidth >= 640

    setSlots({
      topLeft: {
        x: tlRect.left - cRect.left,
        y: tlRect.top - cRect.top,
        width: tlRect.width,
        height: tlRect.height,
        borderRadius: isMobile ? (isTablet ? 22 : 18) : 22,
      },
      center: {
        x: centerRect.left - cRect.left,
        y: centerRect.top - cRect.top,
        width: centerRect.width,
        height: centerRect.height,
        borderRadius: isMobile ? (isTablet ? 28 : 26) : 32,
      },
      bottomRight: {
        x: brRect.left - cRect.left,
        y: brRect.top - cRect.top,
        width: brRect.width,
        height: brRect.height,
        borderRadius: isMobile ? (isTablet ? 22 : 18) : 22,
      },
    })
  }, [])

  useLayoutEffect(() => {
    updateSlots()
    window.addEventListener('resize', updateSlots)

    let observer
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      observer = new ResizeObserver(() => updateSlots())
      observer.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener('resize', updateSlots)
      if (observer) observer.disconnect()
    }
  }, [updateSlots])

  // Native scroll tracking + progress calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current || isNavigatingRef.current) return
      const rect = wrapperRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalScrollable = rect.height - windowHeight
      if (totalScrollable <= 0) return

      // Progress through the sticky section (0 to 1)
      const scrolled = -rect.top
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable))

      const newIndex = Math.min(
        steps.length - 1,
        Math.max(0, Math.floor(progress * steps.length))
      )

      setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [steps.length])

  // GSAP ScrollTrigger snap for desktop for smooth magnetic settling
  useEffect(() => {
    if (typeof window === 'undefined' || !wrapperRef.current) return

    const mq = window.matchMedia('(min-width: 1024px)')
    if (!mq.matches) return

    const st = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top top',
      end: 'bottom bottom',
      snap: {
        snapTo: (value) => {
          const stepSize = 1 / steps.length
          const idx = Math.min(steps.length - 1, Math.floor(value / stepSize))
          return Math.min(1, Math.max(0, (idx + 0.5) * stepSize))
        },
        duration: { min: 0.22, max: 0.42 },
        delay: 0.08,
        ease: 'power2.out',
      },
    })

    return () => {
      st.kill()
    }
  }, [steps.length])

  // Smooth programmatic transition to step
  const goToStep = useCallback(
    (targetIndex) => {
      if (targetIndex < 0 || targetIndex >= steps.length) return
      setActiveIndex(targetIndex)

      if (!wrapperRef.current) return
      const rect = wrapperRef.current.getBoundingClientRect()
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const wrapperTop = rect.top + scrollTop
      const windowHeight = window.innerHeight
      const totalScrollable = rect.height - windowHeight

      const targetProgress = (targetIndex + 0.5) / steps.length
      const targetScrollY = wrapperTop + targetProgress * totalScrollable

      isNavigatingRef.current = true
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth',
      })

      if (navTimeoutRef.current) clearTimeout(navTimeoutRef.current)
      navTimeoutRef.current = setTimeout(() => {
        isNavigatingRef.current = false
      }, 700)
    },
    [steps.length]
  )

  // Touch swipe support for mobile
  const touchStartXRef = useRef(0)
  const touchStartYRef = useRef(0)

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX
    touchStartYRef.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current

    if (Math.abs(deltaX) > 44 && Math.abs(deltaX) > Math.abs(deltaY) * 1.4) {
      if (deltaX < 0 && activeIndex < steps.length - 1) {
        goToStep(activeIndex + 1)
      } else if (deltaX > 0 && activeIndex > 0) {
        goToStep(activeIndex - 1)
      }
    }
  }

  // Determine card role for each step index based on activeIndex
  const getCardRole = (k) => {
    if (k === activeIndex) return 'center'
    if (k === activeIndex - 1) return 'topLeft'
    if (k === activeIndex + 1) return 'bottomRight'
    if (k < activeIndex - 1) return 'exitTop'
    return 'exitBottom'
  }

  const currentStep = steps[activeIndex]

  return (
    <section
      ref={wrapperRef}
      id="process"
      style={{ height: `${steps.length * 90 + 30}vh` }}
      className="relative bg-white text-[#1A1A1A] select-none"
    >
      {/* Sticky Viewport Container */}
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between"
      >
        {/* =========================================================
            TOP SECTION HEADER
            - Matches Modern Facilities section title font & black color (#292929)
            - Shifted slightly higher on mobile
            ========================================================= */}
        <header className="relative z-40 w-full px-4 sm:px-6 lg:px-8 pt-10 sm:pt-10 lg:pt-10 flex items-center justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: TRANSITION_EASE }}
            className="type-section-title text-center text-[#292929]"
          >
            {title || 'Your Journey to Better Health'}
          </motion.h2>
        </header>

        {/* =========================================================
            MAIN STAGE AREA
            - Desktop: 3-column grid (1fr, auto, 1fr) with active card dead-center
            - Mobile: Active card shifted higher up, increased height, text below,
                     and taller vertical bottom-corner thumbnails
            ========================================================= */}
        <div className="relative z-30 flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-start lg:items-center justify-center pt-8 sm:pt-10 lg:pt-0">
          {/* Desktop Stage Layout: grid-cols-[1fr_auto_1fr] guarantees center card is dead-center */}
          <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center justify-center gap-6 xl:gap-8 2xl:gap-10 w-full">
            {/* Left Column: Aligns top-left thumbnail directly to the right edge, adjacent to center card */}
            <div className="flex flex-col items-end justify-start h-[76vh] lg:h-[78vh] xl:h-[82vh] max-h-[760px] pt-2">
              <div
                ref={tlSlotDesktopRef}
                aria-hidden="true"
                className="pointer-events-none opacity-0 invisible w-[136px] xl:w-[146px] 2xl:w-[154px] h-[194px] xl:h-[208px] 2xl:h-[220px] rounded-[22px]"
              />
            </div>

            {/* Center Big Hero Slot (Centered & Increased Height) */}
            <div
              ref={centerSlotDesktopRef}
              aria-hidden="true"
              className="pointer-events-none opacity-0 invisible w-[440px] lg:w-[490px] xl:w-[550px] 2xl:w-[590px] h-[76vh] lg:h-[78vh] xl:h-[82vh] max-h-[760px] rounded-[32px] 2xl:rounded-[36px] shrink-0"
            />

            {/* Right Column: Title + Description and Bottom-Right Thumbnail Slot */}
            <div className="flex flex-col justify-between h-[76vh] lg:h-[78vh] xl:h-[82vh] max-h-[760px] w-full max-w-[380px] xl:max-w-[440px] 2xl:max-w-[480px] py-4 pl-2">
              {/* Title & Description in the middle */}
              <div className="my-auto pr-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.45, ease: TRANSITION_EASE }}
                  >
                    <h3 className="font-display text-[26px] lg:text-[34px] xl:text-[42px] font-normal tracking-tight text-[#111111] leading-[1.15] mb-3">
                      {currentStep.title}
                    </h3>
                    <p className="text-[14px] lg:text-[15px] xl:text-[16px] text-neutral-600 leading-relaxed font-normal">
                      {currentStep.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom-Right Thumbnail Slot Placeholder (Positioned under description, bottom-aligned) */}
              <div className="self-start pt-2">
                <div
                  ref={brSlotDesktopRef}
                  aria-hidden="true"
                  className="pointer-events-none opacity-0 invisible w-[136px] xl:w-[146px] 2xl:w-[154px] h-[194px] xl:h-[208px] 2xl:h-[220px] rounded-[22px]"
                />
              </div>
            </div>
          </div>

          {/* Mobile / Tablet Stage Layout (Card shifted top, increased height) */}
          <div className="lg:hidden flex flex-col w-full max-w-[340px] min-[380px]:max-w-[360px] sm:max-w-[500px] md:max-w-[540px] mx-auto pt-0 sm:pt-1 pb-16 sm:pb-20">
            <div
              ref={centerSlotMobileRef}
              aria-hidden="true"
              className="pointer-events-none opacity-0 invisible w-full h-[660px] sm:h-[48vh]  max-h-[380px] sm:max-h-[660px] rounded-[24px] sm:rounded-[28px]"
            />
            <div className="pt-3.5 sm:pt-10 px-2 text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.4, ease: TRANSITION_EASE }}
                >
                  <h3 className="font-display text-xl sm:text-4xl font-normal tracking-tight text-[#111111] leading-snug mb-1.5 sm:mb-2">
                    {currentStep.title}
                  </h3>
                  <p className="text-lg sm:text-2xl text-neutral-600 leading-relaxed font-normal">
                    {currentStep.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Dual-Corner Bottom Slots (Taller vertical thumbnails matching reference) */}
        <div
          ref={tlSlotMobileRef}
          aria-hidden="true"
          className="lg:hidden pointer-events-none opacity-0 invisible absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 w-[82px] sm:w-[135px] sm:h-[148px] rounded-[18px] sm:rounded-[22px]"
        />
        <div
          ref={brSlotMobileRef}
          aria-hidden="true"
          className="lg:hidden pointer-events-none opacity-0 invisible absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 w-[82px] sm:w-[115px] md:w-[130px] h-[106px] sm:h-[148px] md:h-[168px] rounded-[18px] sm:rounded-[22px]"
        />


        {/* =========================================================
            ANIMATED IMAGE CARDS
            (Morphs smoothly between Top-Left, Center Big Hero, and Bottom-Right)
            ========================================================= */}
        {slots &&
          steps.map((step, idx) => {
            const role = getCardRole(idx)
            const isClickablePrev = role === 'topLeft'
            const isClickableNext = role === 'bottomRight'
            const isClickable = isClickablePrev || isClickableNext

            let target = {}
            if (role === 'center') {
              target = {
                x: slots.center.x,
                y: slots.center.y,
                width: slots.center.width,
                height: slots.center.height,
                borderRadius: slots.center.borderRadius,
                opacity: 1,
                scale: 1,
                zIndex: 35,
              }
            } else if (role === 'topLeft') {
              target = {
                x: slots.topLeft.x,
                y: slots.topLeft.y,
                width: slots.topLeft.width,
                height: slots.topLeft.height,
                borderRadius: slots.topLeft.borderRadius,
                opacity: 1,
                scale: 1,
                zIndex: 30,
              }
            } else if (role === 'bottomRight') {
              target = {
                x: slots.bottomRight.x,
                y: slots.bottomRight.y,
                width: slots.bottomRight.width,
                height: slots.bottomRight.height,
                borderRadius: slots.bottomRight.borderRadius,
                opacity: 1,
                scale: 1,
                zIndex: 30,
              }
            } else if (role === 'exitTop') {
              target = {
                x: slots.topLeft.x - 30,
                y: slots.topLeft.y - 30,
                width: slots.topLeft.width * 0.7,
                height: slots.topLeft.height * 0.7,
                borderRadius: 14,
                opacity: 0,
                scale: 0.75,
                zIndex: 10,
              }
            } else {
              target = {
                x: slots.bottomRight.x + 30,
                y: slots.bottomRight.y + 30,
                width: slots.bottomRight.width * 0.7,
                height: slots.bottomRight.height * 0.7,
                borderRadius: 14,
                opacity: 0,
                scale: 0.75,
                zIndex: 10,
              }
            }

            return (
              <motion.div
                key={step.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  pointerEvents: isClickable ? 'auto' : role === 'center' ? 'auto' : 'none',
                }}
                initial={false}
                animate={target}
                transition={{
                  duration: TRANSITION_DURATION,
                  ease: TRANSITION_EASE,
                }}
                onClick={isClickable ? () => goToStep(idx) : undefined}
                className={`
                  overflow-hidden will-change-transform shadow-2xl
                  ${isClickable ? 'cursor-pointer hover:ring-2 hover:ring-[#292929]/40 group' : ''}
                `}
                aria-label={`Process step ${step.id}: ${step.title}`}
                role={isClickable ? 'button' : undefined}
                tabIndex={isClickable ? 0 : undefined}
                onKeyDown={(e) => {
                  if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault()
                    goToStep(idx)
                  }
                }}
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    draggable={false}
                    className="w-full h-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            )
          })}
      </div>
    </section>
  )
}

/* ==========================================================================
   ORIGINAL PROCESS SECTION (COMMENTED OUT AS REQUESTED - DO NOT REMOVE)
   ==========================================================================

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { processData } from '../assets/Data/Process'

const BRAND = '#285078'
const ARC_IDLE = '#D0D5DA'
const NUM = '#93A4B3'

function StepImage({ src, alt, active, size = 46 }) {
  return (
    <img
      src={src}
      alt={alt || ''}
      width={size}
      height={size}
      draggable={false}
      loading="lazy"
      decoding="async"
      className="object-contain"
      style={{
        filter: active
          ? 'brightness(0) invert(1)'
          : 'brightness(0) saturate(100%) invert(27%) sepia(24%) saturate(900%) hue-rotate(173deg) brightness(92%) contrast(90%)',
      }}
    />
  )
}

const CX = 150
const CY = 155
const CIRCLE_R = 56
const ARC_R = 118
const VB_W = 300
const VB_H = 260
const ARC_IDLE_D = `M ${CX - ARC_R} ${CY} A ${ARC_R} ${ARC_R} 0 0 1 ${CX + ARC_R} ${CY}`

function taperedArcPath(cx, cy, r, maxHalfW, minHalfW = 0.2) {
  const N = 64
  const outer = []
  const inner = []

  for (let i = 0; i <= N; i += 1) {
    const t = i / N
    const ang = Math.PI * (1 - t)
    const halfW = minHalfW + (maxHalfW - minHalfW) * Math.sin(t * Math.PI)
    const cos = Math.cos(ang)
    const sin = Math.sin(ang)
    outer.push([cx + (r + halfW) * cos, cy - (r + halfW) * sin])
    inner.push([cx + (r - halfW) * cos, cy - (r - halfW) * sin])
  }

  let d = `M ${outer[0][0].toFixed(2)} ${outer[0][1].toFixed(2)}`
  for (let i = 1; i < outer.length; i += 1) {
    d += ` L ${outer[i][0].toFixed(2)} ${outer[i][1].toFixed(2)}`
  }
  for (let i = inner.length - 1; i >= 0; i -= 1) {
    d += ` L ${inner[i][0].toFixed(2)} ${inner[i][1].toFixed(2)}`
  }
  return `${d} Z`
}

const TAPERED_ARC_D = taperedArcPath(CX, CY, ARC_R, 1.5, 0.1)

const EASE = [0.25, 0.1, 0.25, 1]
const EASE_OUT = [0.16, 1, 0.3, 1]
const TEXT_LIFT = 36
const CIRCLE_LIFT = 6

function StepGraphic({ step, isActive, liftEnabled }) {
  const maskId = `arc-reveal-${step.id}`
  const iconTop = `${((CY / VB_H) * 100).toFixed(2)}%`
  const label = step.title.replace(/\n/g, ' ')

  return (
    <div className="relative mx-auto w-full max-w-[220px] sm:max-w-[260px] xl:max-w-[300px]">
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className="relative z-0 h-auto w-full"
        aria-hidden="true"
        fill="none"
      >
        <defs>
          <mask id={maskId}>
            <motion.path
              d={ARC_IDLE_D}
              stroke="white"
              strokeWidth="22"
              strokeLinecap="butt"
              fill="none"
              pathLength={1}
              initial={false}
              animate={{ strokeDashoffset: isActive ? 0 : 1.05 }}
              transition={{
                duration: isActive ? 0.75 : 0.5,
                ease: EASE_OUT,
              }}
              style={{ strokeDasharray: 1 }}
            />
          </mask>
        </defs>

        <motion.path
          d={TAPERED_ARC_D}
          fill={ARC_IDLE}
          initial={false}
          animate={{ opacity: isActive ? 0 : 1 }}
          transition={{ duration: 0.4, ease: EASE }}
        />

        <motion.path
          d={TAPERED_ARC_D}
          fill={BRAND}
          mask={`url(#${maskId})`}
          initial={false}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{
            duration: isActive ? 0.12 : 0.35,
            delay: isActive ? 0 : 0.12,
            ease: EASE,
          }}
        />
      </svg>

      <motion.span
        initial={false}
        animate={{ opacity: isActive ? 0 : 1 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="
          pointer-events-none absolute left-1/2 z-10 -translate-x-1/2
          font-body text-[14px] font-normal sm:text-[16px] md:text-[17px]
        "
        style={{
          color: NUM,
          top: `${(((CY - ARC_R + 16) / VB_H) * 100).toFixed(2)}%`,
        }}
        aria-hidden={isActive}
      >
        {step.id}
      </motion.span>

      <motion.div
        initial={false}
        animate={{ y: liftEnabled && isActive ? -CIRCLE_LIFT : 0 }}
        transition={{ duration: 0.65, ease: EASE_OUT }}
        className="pointer-events-none absolute inset-0 z-[1] will-change-transform"
      >
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="h-auto w-full"
          aria-hidden="true"
          fill="none"
        >
          <motion.circle
            cx={CX}
            cy={CY}
            fill={BRAND}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              r: isActive ? CIRCLE_R : CIRCLE_R * 0.78,
            }}
            transition={{
              opacity: { duration: 0.5, ease: EASE },
              r: { duration: 0.6, ease: EASE_OUT },
            }}
          />
        </svg>

        <div
          className="absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          style={{ top: iconTop }}
        >
          <motion.div
            initial={false}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.9 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="absolute"
            aria-hidden={!isActive}
          >
            <StepImage
              src={step.image}
              alt={`${label} process step icon at Vinayak Heart Medicare`}
              active
              size={liftEnabled ? 72 : 52}
            />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ opacity: isActive ? 0 : 1, scale: isActive ? 1.05 : 1 }}
            transition={{ duration: 0.35, ease: EASE }}
            aria-hidden={isActive}
          >
            <StepImage
              src={step.image}
              alt=""
              active={false}
              size={liftEnabled ? 68 : 48}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function ProcessStep({ step, isActive, onActivate, index, inView, liftEnabled }) {
  const label = step.title.replace(/\n/g, ' ')

  return (
    <motion.button
      type="button"
      aria-label={`Process step ${step.id}: ${label}`}
      aria-pressed={isActive}
      onClick={onActivate}
      onMouseEnter={liftEnabled ? onActivate : undefined}
      onFocus={onActivate}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{
        duration: 0.65,
        delay: 0.12 + index * 0.1,
        ease: EASE_OUT,
      }}
      className="
        relative mx-auto flex w-full max-w-[320px] cursor-pointer flex-col items-center
        border-0 bg-transparent p-0 text-center outline-none
        focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2
        xl:max-w-none
      "
      style={{ paddingTop: liftEnabled ? TEXT_LIFT : 0 }}
    >
      <StepGraphic step={step} isActive={isActive} liftEnabled={liftEnabled} />

      <motion.div
        initial={false}
        animate={{ y: liftEnabled && isActive ? -TEXT_LIFT : 0 }}
        transition={{ duration: 0.65, ease: EASE_OUT }}
        className="flex w-full flex-col items-center"
      >
        <h3
          className="
            mx-auto mt-1 w-full max-w-[280px] whitespace-pre-line
            font-body text-[18px] font-medium leading-[1.35] text-brand
            sm:max-w-[300px] sm:text-[19px] md:text-[20px]
            xl:max-w-none xl:px-1 xl:text-[21px]
          "
        >
          {step.title}
        </h3>

        <div
          className={`
            mx-auto w-full max-w-[280px] overflow-hidden transition-[max-height,opacity,margin] duration-500 ease-out
            sm:max-w-[300px] xl:max-w-none xl:px-1
            ${isActive ? 'mt-2.5 max-h-40 opacity-100 sm:mt-3' : 'mt-0 max-h-0 opacity-0'}
          `}
          aria-hidden={!isActive}
        >
          <p className="font-body text-[15px] font-normal leading-[1.65] text-gray-700 sm:text-[16px] md:text-[16px]">
            {step.description}
          </p>
        </div>
      </motion.div>
    </motion.button>
  )
}

function OriginalProcess() {
  const { title, steps } = processData
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [liftEnabled, setLiftEnabled] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1280px)')
    const sync = () => setLiftEnabled(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative overflow-x-clip bg-[#eef1f4] py-14 sm:py-16 md:py-20 lg:h-screen lg:py-24 xl:py-28"
    >
      <div className="site-shell">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="type-section-title mx-auto mb-8 max-w-3xl text-center text-[#292929] sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16"
        >
          {title}
        </motion.h2>

        <div
          className="
            grid grid-cols-1 gap-10
            sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12
            xl:grid-cols-4 xl:gap-x-4 xl:gap-y-0
            2xl:gap-x-6
          "
        >
          {steps.map((step, index) => (
            <ProcessStep
              key={step.id}
              step={step}
              index={index}
              inView={inView}
              liftEnabled={liftEnabled}
              isActive={index === activeIndex}
              onActivate={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
========================================================================== */
