import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ctaData } from '../assets/Data/CTA'
import { openBookingModal } from './BookingModal'

/**
 * CTA — centered conversion block
 * Responsive: mobile / tablet / MacBook Air (xl) / desktop (2xl)
 */
export default function CTA() {
  const { title, description, primary, secondary } = ctaData
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.35 })

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative overflow-hidden py-14 sm:py-16 md:py-20 lg:py-24 xl:py-12 2xl:py-13"
    >
      <div className="pointer-events-none absolute inset-0 bg-[#051d39]" />

      <div className="container relative mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="mx-auto max-w-xl text-center sm:max-w-2xl lg:max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="type-section-title text:3xl md:text-4xl text-white"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="type-desc mx-auto mt-4 max-w-md text-[17px] md:text-lg text-white/80 sm:mt-5 sm:max-w-lg md:max-w-2xl xl:mt-6"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="
              mt-7 flex flex-col items-stretch justify-center gap-3
              sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center
              md:mt-9
              xl:mt-10
            "
          >
            <button
              type="button"
              onClick={openBookingModal}
              className="type-btn inline-flex cursor-pointer items-center justify-center rounded-full text-lg md:text-lg bg-white px-6 py-3 text-brand-dark transition hover:bg-white/70 sm:px-7 md:py-3.5 text-[17px] md:text-lg"
            >
              {primary.label}
            </button>
            
          </motion.div>
        </div>
      </div>
    </section>
  )
}
