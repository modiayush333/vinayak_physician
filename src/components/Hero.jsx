import { motion } from 'framer-motion'
import images from '../assets/Images'
import { heroData } from '../assets/Data/Hero'
const EASE = [0.22, 1, 0.36, 1]

function ArrowIcon({ diagonal = false }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d={diagonal ? 'M5 15 15 5M7 5h8v8' : 'M4 10h12M11 5l5 5-5 5'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Hero() {
  const { eyebrow, title, description, cta, secondary } = heroData

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden pt-16 sm:pt-[72px]"
    >
      {/* Soft organic circle shape — top left */}
      <svg
        viewBox="0 0 210 160"
        className="pointer-events-none absolute -left-27 -top-27 h-40 w-52 sm:-left-12 sm:-top-27 sm:h-98 sm:w-114"
        aria-hidden="true"
      >
        <path
          d="M14 15C51-18 121-4 162 19c42 23 64 65 37 97-26 31-71 10-111 19-40 8-78 45-101 13-24-32-4-100 27-133Z"
          fill="#dff3f6"
        />
      </svg>

      {/* Dot texture — top right */}
      {/* <svg
        viewBox="0 0 132 110"
        className="pointer-events-none absolute right-2 top-24 h-24 w-28 opacity-75 sm:right-8 sm:top-28 sm:h-68 sm:w-52 lg:right-10"
        aria-hidden="true"
      >
        <defs>
          <pattern id="hero-dot-pattern" width="13" height="13" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1.7" fill="#69bdc9" />
          </pattern>
        </defs>
        <rect width="132" height="110" fill="url(#hero-dot-pattern)" />
      </svg> */}

      {/* Fading halftone dots — bottom left */}
      {/* <svg
        viewBox="0 0 320 240"
        className="pointer-events-none absolute -bottom-4 -left-3 h-52 w-64 sm:-bottom-3 sm:-left-3 sm:h-64 sm:w-80"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hero-halftone-glow" cx="0" cy="0" r="1">
            <stop offset="0" stopColor="#67c4d2" stopOpacity="0.12" />
            <stop offset="0.32" stopColor="#9ddce5" stopOpacity="0.2" />
            <stop offset="1" stopColor="#dff3f6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hero-halftone-fade" cx="0" cy="0" r="1">
            <stop offset="0" stopColor="white" />
            <stop offset="0.48" stopColor="white" stopOpacity="0.82" />
            <stop offset="1" stopColor="black" stopOpacity="0" />
          </radialGradient>
          <pattern id="hero-halftone-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="4.2" fill="#05899e" />
          </pattern>
          <mask id="hero-halftone-mask">
            <rect width="320" height="240" fill="url(#hero-halftone-fade)" />
          </mask>
        </defs>
        <rect width="320" height="240" fill="url(#hero-halftone-glow)" />
        <rect
          width="320"
          height="240"
          fill="url(#hero-halftone-dots)"
          mask="url(#hero-halftone-mask)"
          opacity="0.62"
        />
      </svg> */}

      <div className="site-shell relative z-10 flex min-h-[calc(100svh-4rem)] flex-col pt-8 sm:min-h-[calc(100svh-4.5rem)] sm:pt-10 lg:pt-12">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-5 xl:grid-cols-[0.84fr_1.16fr]">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative z-20 mx-auto w-full max-w-2xl pb-2 text-center lg:mx-0 lg:pb-10 lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="type-eyebrow mb-4 text-brand-teal"
            >
              {eyebrow}
            </motion.p>

            <h1 className="font-display text-[2.65rem] font-medium leading-[0.98] tracking-[-0.045em] text-[#051d39] sm:text-[3.5rem] md:text-[4.35rem] lg:text-[4.15rem] xl:text-[4.45rem]">
              <span className="block">{title.first}</span>
              <span className="block">
                {title.second}{' '}
                <em className="font-serif font-normal tracking-[-0.03em]">{title.accent}</em>
              </span>
              <em className="block font-serif font-normal tracking-[-0.03em]">{title.last}</em>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="type-desc mx-auto mt-5 max-w-2xl text-gray-700 text-lg md:text-xl sm:mt-6 lg:mx-0"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.4 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <a
                href={cta.href}
                className="type-btn inline-flex min-h-12 items-center gap-2 rounded-full bg-brand py-1.5 pl-2 pr-5 text-white shadow-[0_10px_28px_rgba(23,61,68,0.18)] transition hover:-translate-y-0.5 hover:bg-[#003871]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#173d44]">
                  <ArrowIcon />
                </span>
                {cta.label}
              </a>
              {/* <a
                href={secondary.href}
                className="type-btn inline-flex min-h-12 items-center gap-2 rounded-full border border-[#cbdadd] bg-white/75 px-5 text-[#173d44] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
              >
                <ArrowIcon diagonal />
                {secondary.label}
              </a> */}
            </motion.div>
          </motion.div>

          <div className="relative mx-auto flex min-h-[430px] w-full max-w-[760px] items-end justify-center sm:min-h-[540px] lg:min-h-[calc(100svh-7.5rem)]">
            {/* Bottom-right circle artwork moved behind the doctor */}
            <div className="pointer-events-none absolute bottom-[0%] left-1/2 h-[86%] w-[90%] -translate-x-1/2">
              <motion.svg
                initial={{ opacity: 0, scale: 0.82, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.1, delay: 0.05, ease: EASE }}
                viewBox="0 0 600 600"
                className="h-full w-full"
                aria-hidden="true"
              >
                <circle cx="300" cy="300" r="270" fill="#d9f1f4" />
                <circle cx="300" cy="300" r="189" fill="#f2fafb" />
                <circle cx="300" cy="300" r="116" fill="#9bd5de" opacity="0.72" />
              </motion.svg>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE }}
              className="relative z-10 flex h-[430px] w-full items-end justify-center sm:h-[540px] lg:h-[calc(100svh-7.5rem)] lg:max-h-[760px]"
            >
              <motion.img
                src={images.drimage}
                alt="Expert physician providing heart and medical care at Vinayak Heart Medicare"
                className="h-full w-auto max-w-full object-contain object-bottom"
                draggable={false}
                decoding="async"
                fetchPriority="high"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
