import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import drPortrait from '../assets/Images/drronak.webp'

const EASE = [0.22, 1, 0.36, 1]

export default function AboutDROption2() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.12 })

  return (
    <section
      ref={sectionRef}
      id="about-dr-option-2"
      className="relative w-full bg-[#FAF7F2] py-16 sm:py-20 lg:py-24 text-[#173653] overflow-hidden transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">

        {/* ============================================================== */}
        {/* TOP HEADER: Eyebrow + Playfair Serif Two-Tone Heading          */}
        {/* ============================================================== */}
        <div className="max-w-4xl mb-10 sm:mb-14 lg:mb-16">
          {/* Eyebrow Pill Badge (exact style as About Doctor Option 1) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE7DC] border border-[#E7DECE] text-xs sm:text-sm font-semibold text-[#795744] mb-4 sm:mb-6 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#A9C9E5]" />
            <span>About Doctor</span>
          </motion.div>

          {/* Heading matching Option 1 editorial style */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="font-serif text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] text-[#173653] font-normal tracking-tight leading-[1.15] max-w-4xl mb-6 sm:mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, Cambria, serif" }}
          >
            Dedicated to Providing You with{' '}
            <span className="text-[#795744]">Skilled Clinical Expertise.</span>
          </motion.h2>
        </div>

        {/* ============================================================== */}
        {/* 3-COLUMN DOCTOR SHOWCASE GRID (Exact to Reference Image 2)     */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.1fr_1.35fr_1.25fr] gap-8 lg:gap-10 items-stretch">

          {/* ------------------------------------------------------------ */}
          {/* COLUMN 1: Doctor Credentials & Specialization Tags           */}
          {/* ------------------------------------------------------------ */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="flex flex-col justify-between order-2 md:order-1"
          >
            <div>
              {/* "Dr." in elegant italic serif script */}
              <span
                className="font-serif italic text-3xl sm:text-4xl text-[#795744] block mb-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Dr.
              </span>

              {/* Doctor Full Name */}
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] text-[#173653] italic tracking-tight leading-none">
                Ronak Modi
              </h3>

              {/* Subtitle */}
              <p className="text-sm sm:text-lg text-[#795744] font-medium mt-2.5">
                Consultant Physician &amp; Critical Care Specialist
              </p>
              <p className="text-xs sm:text-lg text-[#173653]/70 font-medium mt-1">
                MBBS, M.D. Medicine • 10+ Years Experience
              </p>
            </div>

            {/* Bottom Specialization List */}
            <div className="mt-8 lg:mt-0 ">
              <span className="block text-xs sm:text-lg font-semibold text-[#795744]/70 uppercase tracking-wider mb-2">
                (Specialization)
              </span>
              <div className="flex flex-wrap gap-2 text-xs sm:text-base text-[#173653] font-medium">
                <span className="px-2.5 py-1 rounded-full bg-[#F5EFEB] border border-[#E7DECE]">
                  Cardiology
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#F5EFEB] border border-[#E7DECE]">
                  Diabetes Care
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#F5EFEB] border border-[#E7DECE]">
                  Critical Care &amp; ICU
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#F5EFEB] border border-[#E7DECE]">
                  Preventive Health
                </span>
              </div>
            </div>
          </motion.div>

          {/* ------------------------------------------------------------ */}
          {/* COLUMN 2: Center Doctor Portrait Image                       */}
          {/* ------------------------------------------------------------ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.22, ease: EASE }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-md border-2 border-white bg-[#EAF2F9] group">
              <img
                src={drPortrait}
                alt="Dr. Ronak Modi - Consultant Physician"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* ------------------------------------------------------------ */}
          {/* COLUMN 3: Right Bio & Pagination / Action Button             */}
          {/* ------------------------------------------------------------ */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            className="flex flex-col justify-between order-3 md:col-span-2 lg:col-span-1"
          >
            {/* Bio Paragraph */}
            <div>
              <p className="text-xs sm:text-sm lg:text-xl text-[#795744] font-normal leading-relaxed">
                Dr. Ronak Modi has over a decade of clinical experience, specializing in cardiology, diabetes, general medicine, and critical care. He focuses on individualized patient treatment in an attentive, calm environment and emphasizes thorough clinical evaluation, early preventive diagnostics, and continuous patient recovery.
              </p>
              <p className="text-xs sm:text-sm lg:text-lg text-[#795744]/80 font-normal leading-relaxed mt-3.5">
                Educated at B.J. Medical College &amp; V.S. Hospital, with extensive experience at Apollo and Civil Hospitals treating over 5,000+ ICU patients.
              </p>
            </div>


          </motion.div>

        </div>

      </div>
    </section>
  )
}

