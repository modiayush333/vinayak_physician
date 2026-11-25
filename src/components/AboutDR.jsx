import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import drCutout from '../assets/Images/dr_ronak_hero.png'

const EASE = [0.22, 1, 0.36, 1]

export default function AboutDR() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section
      ref={sectionRef}
      id="about-dr"
      className="relative w-full bg-[#FAF7F2] py-16 sm:py-20 lg:pt-24 text-[#173653] overflow-hidden transition-colors duration-300"
    >
      {/* Container: container mx-auto px-5 sm:px-10 lg:px-10 2xl:px-0 (no max-w on section tag) */}
      <div className="container mx-auto px-5 sm:px-10 lg:px-10 2xl:px-0 relative z-10 text-center">
        {/* ============================================================== */}
        {/* 1. TOP VERTICAL CONNECTOR LINE                                 */}
        {/* ============================================================== */}
        {/* <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={inView ? { opacity: 1, height: '2.5rem' } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="w-[1.5px] bg-[#E7DECE] mx-auto mb-4"
          aria-hidden="true"
        /> */}

        {/* ============================================================== */}
        {/* 2. TOP PILL BADGE: EXACT STYLE AS OUR SERVICES BADGE           */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE7DC] border border-[#E7DECE] text-xs sm:text-sm font-semibold text-[#795744] mb-4 sm:mb-6 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-[#A9C9E5]" />
          <span>About Doctor</span>
        </motion.div>

        {/* ============================================================== */}
        {/* 3. MAIN EDITORIAL HEADING: EXACT STYLE AS OUR SERVICES TITLE   */}
        {/* ============================================================== */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="font-serif text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] text-[#173653] font-normal tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6 sm:mb-8"
          style={{ fontFamily: "'Playfair Display', Georgia, Cambria, serif" }}
        >
          Built on Over a Decade of Clinical Excellence in{' '}
          <span className="text-[#795744]">Cardiology &amp; Critical Care.</span>
        </motion.h2>

        {/* ============================================================== */}
        {/* 4. DOCTOR NAME & CREDENTIALS (NO SIGNATURE, NAME IS BIG)       */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
          className="flex flex-col items-center justify-center mb-8 sm:mb-12"
        >
          {/* Big Doctor Name */}
          <h3
            className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#173653] font-normal tracking-tight leading-[1.15]"
            style={{ fontFamily: "'Playfair Display', Georgia, Cambria, serif" }}
          >
            Dr. Ronak Modi
          </h3>
          <p className="text-sm sm:text-base text-[#795744] font-medium tracking-wide mt-1">
            Consultant Physician &amp; Critical Care Specialist
          </p>
        </motion.div>

        {/* ============================================================== */}
        {/* 5. CAPSULE / STADIUM OVAL IMAGE CONTAINER (COLOR THEME: SOFT BLUE) */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="relative w-full max-w-[320px] min-[420px]:max-w-[380px] sm:max-w-xl md:max-w-2xl lg:max-w-3xl aspect-[1.8/1] sm:aspect-[2.05/1] lg:aspect-[2.2/1] mx-auto rounded-full overflow-hidden bg-[#A9C9E5] flex items-end justify-center shadow-xl border border-[#9BBEDC]/50 mb-8 sm:mb-10 lg:mb-12"
        >
          <img
            src={drCutout}
            alt="Dr. Ronak Modi - Consultant Physician & Cardiologist"
            className="h-[92%] sm:h-[94%] lg:h-[96%] w-auto object-contain object-bottom select-none pointer-events-none transition-transform duration-700 hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        {/* ============================================================== */}
        {/* 6. BOTTOM BIO DESCRIPTION (BLACK FONT + HIGHLIGHTED SENTENCE)   */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.32, ease: EASE }}
          className="max-w-3xl lg:max-w-4xl mx-auto"
        >
          <p className="text-sm sm:text-base lg:text-lg text-black font-normal leading-relaxed sm:leading-loose text-center">
            Dr. Ronak Modi (MBBS, M.D. Medicine) specializes in cardiology, diabetes, general medicine, and critical care, with experience treating 5,000+ ICU patients. Educated at B.J. Medical College and V.S. Hospital, he has served at Apollo, Civil, and Rajesh Hospitals and received{' '}
            <span
              className="inline rounded-full bg-[#795744]/80 text-white font-medium px-3 py-0.5 shadow-xs"
              style={{
                boxDecorationBreak: 'clone',
                WebkitBoxDecorationBreak: 'clone',
              }}
            >
              recognition from the District Tuberculosis Control Society.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ==========================================================================
   PREVIOUS ABOUT DR IMPLEMENTATION (COMMENTED OUT - PRESERVED AS REQUESTED)
   ==========================================================================

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { aboutDrData } from '../assets/Data/AboutDR'

function SectionHeading({ children }) {
  return <h3 className="type-subheading text-2xl text-[#173653] font-serif font-semibold">{children}</h3>
}

function RevealBlock({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
    >
      {children}
    </motion.div>
  )
}
========================================================================== */
