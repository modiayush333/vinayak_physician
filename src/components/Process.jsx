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

/**
 * Reference-scale geometry — large circle filling most of the arc
 * (matches Labozen / reference screenshot proportions).
 */
const CX = 150
const CY = 155
const CIRCLE_R = 56
const ARC_R = 118
const VB_W = 300
const VB_H = 260
const ARC_IDLE_D = `M ${CX - ARC_R} ${CY} A ${ARC_R} ${ARC_R} 0 0 1 ${CX + ARC_R} ${CY}`

/** Tapered semicircle — thickest at apex, pointed at ends */
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

/** Heltro-style soft ease */
const EASE = [0.25, 0.1, 0.25, 1]
const EASE_OUT = [0.16, 1, 0.3, 1]
/** Title + description lift (px) — desktop hover only */
const TEXT_LIFT = 36
/** Circle lifts less so a clear gap stays under the fixed arc */
const CIRCLE_LIFT = 6

function StepGraphic({ step, isActive, liftEnabled }) {
  const maskId = `arc-reveal-${step.id}`
  const iconTop = `${((CY / VB_H) * 100).toFixed(2)}%`
  const label = step.title.replace(/\n/g, ' ')

  return (
    <div className="relative mx-auto w-full max-w-[220px] sm:max-w-[260px] xl:max-w-[300px]">
      {/* Fixed arc layer — does not move on hover */}
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

      {/* Step number — stays with the fixed arc */}
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

      {/* Circle + images — slight lift on desktop only */}
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

/**
 * Process — large reference-scale arcs (4 equal columns on desktop)
 */
export default function Process() {
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
