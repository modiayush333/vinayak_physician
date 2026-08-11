import { useEffect, useId, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { processData } from '../assets/Data/Process'
import { EASE_OUT } from '../lib/motion'

const STEP_COLORS = ['#1A354F', '#285078', '#0888A0', '#5EC4D4']
const ICON_COLOR = '#5dc2d2'
const LINE_SETTLE_MS = 400

function buildGeometry(count) {
  const circleR = 72
  const arcR = 84
  const gap = 32
  const padX = 30
  const centers = []

  for (let i = 0; i < count; i += 1) {
    centers.push(padX + arcR + i * (2 * arcR + gap))
  }

  const width = centers[count - 1] + arcR + padX + 20
  const midY = arcR + 20
  const height = midY * 2 + 10

  return { circleR, arcR, gap, centers, width, height, midY }
}

function pt(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy - r * Math.sin(rad),
  }
}

function buildSegments(geo, colors) {
  const { centers, arcR, midY, gap } = geo
  const segments = []

  centers.forEach((cx, i) => {
    const color = colors[i % colors.length]
    const start = pt(cx, midY, arcR, 215)
    const end = pt(cx, midY, arcR, -35)

    segments.push({
      type: 'solid',
      color,
      d: `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${arcR} ${arcR} 0 1 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`,
      showStartDot: i === 0,
      startDot: start,
      showArrow: i === centers.length - 1,
      arrowAt: end,
      arrowAngle: -35,
    })

    if (i < centers.length - 1) {
      const nextCx = centers[i + 1]
      const nextStart = pt(nextCx, midY, arcR, 215)
      const midX = (end.x + nextStart.x) / 2
      const dip = midY + arcR * 0.52 + Math.min(gap * 0.12, 6)
      const c1x = end.x + (midX - end.x) * 0.55
      const c2x = nextStart.x - (nextStart.x - midX) * 0.55

      segments.push({
        type: 'dotted',
        color: colors[(i + 1) % colors.length],
        d: `M ${end.x.toFixed(2)} ${end.y.toFixed(2)} C ${c1x.toFixed(2)} ${dip.toFixed(2)}, ${c2x.toFixed(2)} ${dip.toFixed(2)}, ${nextStart.x.toFixed(2)} ${nextStart.y.toFixed(2)}`,
      })
    }
  })

  return segments
}

function TintedIcon({ src, alt, color, size = 36 }) {
  return (
    <span
      className="inline-block shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    />
  )
}

function ArrowHead({ x, y, angleDeg, color }) {
  const rad = (angleDeg * Math.PI) / 180
  const tx = Math.sin(rad)
  const ty = Math.cos(rad)
  const size = 11
  const px = -ty
  const py = tx

  const tip = { x: x + tx * size, y: y + ty * size }
  const left = { x: x - px * size * 0.55 - tx * 2, y: y - py * size * 0.55 - ty * 2 }
  const right = { x: x + px * size * 0.55 - tx * 2, y: y + py * size * 0.55 - ty * 2 }

  return (
    <polygon
      points={`${tip.x},${tip.y} ${left.x},${left.y} ${right.x},${right.y}`}
      fill={color}
    />
  )
}

/** Desktop / large laptop / Mac — horizontal wave */
function WaveDesktop({ steps, activeIndex, onActivate, lineInView }) {
  const uid = useId().replace(/:/g, '')
  const geo = buildGeometry(steps.length)
  const { centers, width, height, midY, circleR } = geo
  const segments = buildSegments(geo, STEP_COLORS)

  return (
    <div className="mx-auto hidden w-full max-w-6xl xl:max-w-7xl lg:block">
      <div className="relative w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="block h-auto w-full overflow-visible"
          aria-hidden="true"
          fill="none"
        >
          <defs>
            <filter id={`soft-shadow-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#1A354F" floodOpacity="0.12" />
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.05" />
            </filter>
          </defs>

          {segments.map((seg, i) => (
            <motion.path
              key={`seg-${i}`}
              d={seg.d}
              stroke={seg.color}
              strokeWidth={seg.type === 'dotted' ? 2.5 : 3.25}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={seg.type === 'dotted' ? '0.01 9' : undefined}
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                lineInView
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 0.85, delay: lineInView ? 0.07 * i : 0, ease: EASE_OUT }}
            />
          ))}

          {segments.map((seg, i) =>
            seg.showStartDot && seg.startDot ? (
              <motion.circle
                key={`dot-${i}`}
                cx={seg.startDot.x}
                cy={seg.startDot.y}
                r={4.5}
                fill={seg.color}
                initial={{ scale: 0, opacity: 0 }}
                animate={lineInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.35, delay: lineInView ? 0.45 : 0, ease: EASE_OUT }}
              />
            ) : null,
          )}

          {segments.map((seg, i) =>
            seg.showArrow && seg.arrowAt ? (
              <motion.g
                key={`arrow-${i}`}
                initial={{ opacity: 0 }}
                animate={lineInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.35, delay: lineInView ? 0.95 : 0, ease: EASE_OUT }}
              >
                <ArrowHead
                  x={seg.arrowAt.x}
                  y={seg.arrowAt.y}
                  angleDeg={seg.arrowAngle}
                  color={seg.color}
                />
              </motion.g>
            ) : null,
          )}

          {centers.map((cx, index) => (
            <circle
              key={`disc-${steps[index].id}`}
              cx={cx}
              cy={midY}
              r={circleR}
              fill="#ffffff"
              filter={`url(#soft-shadow-${uid})`}
            />
          ))}
        </svg>

        {steps.map((step, index) => {
          const cx = centers[index]
          const isActive = index === activeIndex
          const leftPct = (cx / width) * 100
          const topPct = (midY / height) * 100
          const sizeW = ((circleR * 2) / width) * 100
          const sizeH = ((circleR * 2) / height) * 100
          const label = step.title.replace(/\n/g, ' ')

          return (
            <div
              key={step.id}
              className="absolute z-10"
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                width: `${sizeW}%`,
                height: `${sizeH}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <motion.button
                type="button"
                aria-label={`Process step ${step.id}: ${label}`}
                aria-pressed={isActive}
                onClick={() => onActivate(index)}
                onMouseEnter={() => onActivate(index)}
                onFocus={() => onActivate(index)}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={
                  lineInView
                    ? { opacity: 1, scale: isActive ? 1.04 : 1 }
                    : { opacity: 0, scale: 0.88 }
                }
                transition={{
                  duration: 0.5,
                  delay: lineInView ? 0.12 + index * 0.08 : 0,
                  ease: EASE_OUT,
                }}
                className="
                  flex h-full w-full cursor-pointer flex-col items-center justify-center
                  gap-1 rounded-full border-0 bg-transparent px-2 text-center outline-none
                  focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-2
                  xl:gap-1.5 xl:px-3
                "
              >
                <TintedIcon
                  src={step.image}
                  alt={`${label} process step icon at Vinayak Heart Medicare`}
                  color={ICON_COLOR}
                  size={65}
                />
                <span className="max-w-[92%] text-center font-display text-[14px] font-semibold leading-[1.2] tracking-tight text-[#3A4A58] xl:text-[20px] 2xl:text-[23px]">
                  {step.title}
                </span>
              </motion.button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/** Phone + tablet — vertical timeline */
function WaveMobile({ steps, activeIndex, onActivate, lineInView }) {
  return (
    <div className="relative mx-auto flex w-full max-w-[20rem] flex-col items-center gap-1 sm:max-w-[22rem] md:max-w-[24rem] lg:hidden">
      {steps.map((step, index) => {
        const color = STEP_COLORS[index % STEP_COLORS.length]
        const isActive = index === activeIndex
        const label = step.title.replace(/\n/g, ' ')
        const isLast = index === steps.length - 1

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 18 }}
            animate={lineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{
              duration: 0.5,
              delay: lineInView ? index * 0.07 : 0,
              ease: EASE_OUT,
            }}
            className="relative flex w-full flex-col items-center"
          >
            <button
              type="button"
              aria-label={`Process step ${step.id}: ${label}`}
              aria-pressed={isActive}
              onClick={() => onActivate(index)}
              className="
                relative z-10 flex h-[9rem] w-[9rem] shrink-0 flex-col
                items-center justify-center gap-1.5 rounded-full border-0 bg-white
                px-3 text-center outline-none
                focus-visible:ring-2 focus-visible:ring-brand/30
                sm:h-[10rem] sm:w-[10rem]
                md:h-[11rem] md:w-[11rem]
              "
              style={{
                boxShadow: '0 8px 22px rgba(26,53,79,0.12), 0 2px 6px rgba(0,0,0,0.05)',
                outline: `2.5px solid ${color}`,
                outlineOffset: '3px',
                transform: isActive ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform 0.3s ease',
              }}
            >
              <TintedIcon
                src={step.image}
                alt={`${label} process step icon at Vinayak Heart Medicare`}
                color={ICON_COLOR}
                size={60}
              />
              <span className="max-w-[90%] text-center font-display text-[15px] font-semibold leading-[1.2] tracking-tight text-[#3A4A58] sm:text-[12px] md:text-[20px]">
                {step.title}
              </span>
            </button>

            {!isLast && (
              <motion.div
                className="mt-3 w-0 origin-top border-l-[3px] border-dotted md:mt-4"
                style={{ borderColor: STEP_COLORS[(index + 1) % STEP_COLORS.length] }}
                initial={{ scaleY: 0, height: 28 }}
                animate={lineInView ? { scaleY: 1, height: 32 } : { scaleY: 0 }}
                transition={{
                  duration: 0.45,
                  delay: lineInView ? 0.2 + index * 0.12 : 0,
                  ease: EASE_OUT,
                }}
                aria-hidden
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

export default function Process() {
  const { title, steps } = processData
  const sectionRef = useRef(null)
  const lineRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })
  const lineInView = useInView(lineRef, {
    once: true,
    amount: 0.4,
    margin: '0px 0px -12% 0px',
  })
  const [lineReady, setLineReady] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (!lineInView) return undefined
    const timer = window.setTimeout(() => setLineReady(true), LINE_SETTLE_MS)
    return () => window.clearTimeout(timer)
  }, [lineInView])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative overflow-x-clip bg-[#F4F7FA] py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24"
    >
      <div className="site-shell">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
          className="mb-8 flex flex-col items-center text-center sm:mb-10 md:mb-12 lg:mb-14"
        >
          <h2 className="type-section-title max-w-3xl px-1 text-[#1A354F]">{title}</h2>
        </motion.div>

        <motion.div
          ref={lineRef}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
        >
          <WaveDesktop
            steps={steps}
            activeIndex={activeIndex}
            onActivate={setActiveIndex}
            lineInView={lineReady}
          />
          <WaveMobile
            steps={steps}
            activeIndex={activeIndex}
            onActivate={setActiveIndex}
            lineInView={lineReady}
          />
        </motion.div>
      </div>
    </section>
  )
}
