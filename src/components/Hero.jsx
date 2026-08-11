import { motion, useReducedMotion } from 'framer-motion'
import images from '../assets/Images'
import { heroData } from '../assets/Data/Hero'
import { EASE, staggerContainer, staggerItem } from '../lib/motion'

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Hero() {
  const { eyebrow, title, description, cta } = heroData
  const reduce = useReducedMotion()

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden pt-16 sm:pt-[72px]"
    >
      <motion.svg
        viewBox="0 0 210 160"
        className="pointer-events-none absolute -left-27 -top-27 h-40 w-52 sm:-left-12 sm:-top-27 sm:h-98 sm:w-114"
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <path
          d="M14 15C51-18 121-4 162 19c42 23 64 65 37 97-26 31-71 10-111 19-40 8-78 45-101 13-24-32-4-100 27-133Z"
          fill="#dff3f6"
        />
      </motion.svg>

      <div className="site-shell relative z-10 flex min-h-[calc(100svh-4rem)] flex-col pt-8 sm:min-h-[calc(100svh-4.5rem)] sm:pt-10 lg:pt-12">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-5 xl:grid-cols-[0.84fr_1.16fr]">
          <motion.div
            variants={staggerContainer(0.12, 0.05)}
            initial={reduce ? false : 'hidden'}
            animate="show"
            className="relative z-20 mx-auto w-full max-w-2xl pb-2 text-center lg:mx-0 lg:pb-10 lg:text-left"
          >
            <motion.p
              variants={staggerItem}
              className="type-eyebrow mb-4 text-brand-teal"
            >
              {eyebrow}
            </motion.p>

            <motion.h1
              variants={staggerItem}
              className="font-display text-[2.65rem] font-medium leading-[0.98] tracking-[-0.045em] text-[#051d39] sm:text-[3.5rem] md:text-[4.35rem] lg:text-[4.15rem] xl:text-[4.45rem]"
            >
              <span className="block">{title.first}</span>
              <span className="block">
                {title.second}{' '}
                <em className="font-serif font-normal tracking-[-0.03em]">{title.accent}</em>
              </span>
              <em className="block font-serif font-normal tracking-[-0.03em]">{title.last}</em>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="type-desc mx-auto mt-5 max-w-2xl text-lg text-gray-700 sm:mt-6 md:text-xl lg:mx-0"
            >
              {description}
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <motion.a
                href={cta.href}
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                className="type-btn inline-flex min-h-12 items-center gap-2 rounded-full bg-brand py-1.5 pl-2 pr-5 text-white shadow-[0_10px_28px_rgba(23,61,68,0.18)] transition hover:bg-[#003871]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#173d44]">
                  <ArrowIcon />
                </span>
                {cta.label}
              </motion.a>
            </motion.div>
          </motion.div>

          <div className="relative mx-auto flex min-h-[430px] w-full max-w-[760px] items-end justify-center sm:min-h-[540px] lg:min-h-[calc(100svh-7.5rem)]">
            <div className="pointer-events-none absolute bottom-[0%] left-1/2 h-[86%] w-[90%] -translate-x-1/2">
              <motion.svg
                initial={reduce ? false : { opacity: 0, scale: 0.82, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.1, delay: 0.12, ease: EASE }}
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
              initial={reduce ? false : { opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="relative z-10 flex h-[430px] w-full items-end justify-center sm:h-[540px] lg:h-[calc(100svh-7.5rem)] lg:max-h-[760px]"
            >
              <img
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
