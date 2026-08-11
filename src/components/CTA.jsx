import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ctaData } from '../assets/Data/CTA'
import { openBookingModal } from './BookingModal'
import { EASE, staggerContainer, staggerItem } from '../lib/motion'

/**
 * CTA — centered conversion block with staggered reveal
 */
export default function CTA() {
  const { title, description, primary } = ctaData
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.4 })
  const reduce = useReducedMotion()

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative overflow-hidden py-14 sm:py-16 md:py-20 lg:py-24 xl:py-12 2xl:py-13"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#051d39]" />

      <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <motion.div
          className="mx-auto max-w-xl text-center sm:max-w-2xl lg:max-w-3xl"
          variants={staggerContainer(0.12, 0.05)}
          initial={reduce ? false : 'hidden'}
          animate={inView ? 'show' : 'hidden'}
        >
          <motion.h2
            variants={staggerItem}
            className="type-section-title text-white md:text-4xl"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="type-desc mx-auto mt-4 max-w-md text-[17px] text-white/80 sm:mt-5 sm:max-w-lg md:max-w-2xl md:text-lg xl:mt-6"
          >
            {description}
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="
              mt-7 flex flex-col items-stretch justify-center gap-3
              sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center
              md:mt-9 xl:mt-10
            "
          >
            <motion.button
              type="button"
              onClick={openBookingModal}
              whileHover={reduce ? undefined : { y: -2, scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="type-btn inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-6 py-3 text-[17px] text-brand-dark transition hover:bg-white/70 sm:px-7 md:py-3.5 md:text-lg"
            >
              {primary.label}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
