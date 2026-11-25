import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Activity, ShieldCheck, HeartPulse, Sparkles } from 'lucide-react'
import drPhoto from '../assets/Images/dr_ronak_option3.jpg'
import { openBookingModal } from './BookingModal'

const EASE = [0.22, 1, 0.36, 1]

// 5-Petal Flower Emblem (Exact to Reference Image 1)
function FlowerEmblem({ className = 'w-5 h-5 sm:w-6 sm:h-6 text-white' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="7.5" r="3.2" />
      <circle cx="16.3" cy="10.6" r="3.2" />
      <circle cx="14.7" cy="15.6" r="3.2" />
      <circle cx="9.3" cy="15.6" r="3.2" />
      <circle cx="7.7" cy="10.6" r="3.2" />
      <circle cx="12" cy="12" r="2.2" fill="#8E6342" />
    </svg>
  )
}

export default function AboutDROption3() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.12 })

  return (
    <section
      ref={sectionRef}
      id="about-dr-option-3"
      className="relative w-full bg-[#FAF7F2] py-16 sm:py-20 lg:pt-20 text-[#173653] overflow-hidden transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 relative z-10">

        {/* ============================================================== */}
        {/* SECTION HEADER: Pill Badge + Playfair Serif Two-Tone Heading   */}
        {/* ============================================================== */}
        <div className="text-center mx-auto mb-10 sm:mb-14 lg:mb-16">
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
            className="font-serif text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] text-[#173653] font-normal tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6 sm:mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, Cambria, serif" }}
          >
            Compassionate Care Guided by{' '}
            <span className="text-[#795744]">Decades of Experience.</span>
          </motion.h2>
        </div>

        {/* Large Outer Container Card (Exact to Reference Image 3) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="rounded-3xl bg-[#F5EFEB] border border-[#E7DECE] p-6 sm:p-10 lg:p-14 shadow-xs"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.25fr] gap-8 lg:gap-14 items-center">

            {/* ============================================================ */}
            {/* LEFT COLUMN: Doctor Portrait with Bottom Glassmorphism Card  */}
            {/* ============================================================ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
              className="relative w-full max-w-[440px] mx-auto lg:max-w-none aspect-[4/4.8] sm:aspect-[4/4.5] rounded-3xl overflow-hidden shadow-md bg-white border border-[#E7DECE] group"
            >
              {/* Doctor Photo (Replaced with uploaded Dr. Ronak Modi portrait) */}
              <img
                src={drPhoto}
                alt="Dr. Ronak Modi - Consultant Physician & Critical Care Specialist"
                className="w-full h-full object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Half-Image Warm Caramel Gradient Opacity Effect (Exact to Reference Image 1) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to top, rgba(142, 99, 66, 0.75) 0%, rgba(160, 116, 80, 0.45) 30%, rgba(160, 116, 80, 0.18) 55%, transparent 75%)',
                }}
              />

              {/* Bottom Caramel Name Badge (Exact to Reference Image 1) */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 rounded-2xl sm:rounded-3xl bg-[#8E6342]/90 backdrop-blur-md border border-white/15 p-4 sm:p-5 lg:p-6 flex items-center justify-between text-white shadow-xl">
                <div className="pr-3">
                  <h3
                    className="font-serif text-xl sm:text-2xl lg:text-[1.65rem] font-normal leading-tight drop-shadow-xs tracking-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Dr. Ronak Modi
                  </h3>
                  <p className="text-xs sm:text-[13px] text-white/90 font-normal mt-1.5 tracking-wide">
                    Consultant Physician &amp; Critical Care Specialist
                  </p>
                </div>

                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <FlowerEmblem className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </motion.div>

            {/* ============================================================ */}
            {/* RIGHT COLUMN: Eyebrow + Headline + 3 Features + Action Button */}
            {/* ============================================================ */}
            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.22, ease: EASE }}
              className="flex flex-col justify-center"
            >
              {/* Eyebrow Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E7DECE] text-xs sm:text-sm font-semibold text-[#795744] mb-4 sm:mb-5 shadow-2xs w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#795744]" />
                <span className="uppercase tracking-wider">About Doctor • Option 3</span>
              </div>

              {/* Headline */}
              <h2
                className="font-serif text-3xl sm:text-4xl lg:text-[2.85rem] text-[#795744] font-normal tracking-tight leading-[1.18] mb-4 sm:mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                A clinic committed to your health
              </h2>

              {/* Subtitle Description */}
              <p className="text-xs sm:text-sm lg:text-[15px] text-[#795744]/80 font-normal leading-relaxed mb-6 sm:mb-8">
                We believe lasting health starts with thorough understanding. Every consultation begins with a detailed evaluation, an accurate diagnosis, and personalized, science-backed care tailored to your unique condition.
              </p>

              {/* 3 Checklist Features with Outline Circle Icons (Exact to Reference 3) */}
              <div className="space-y-4 sm:space-y-4.5 mb-7 sm:mb-9">
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#795744]/40 bg-white flex items-center justify-center text-[#795744] shrink-0 shadow-2xs">
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                  </div>
                  <span className="text-xs sm:text-sm lg:text-[15px] text-[#173653] font-medium">
                    Advanced Science-Backed Treatment Methods
                  </span>
                </div>

                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#795744]/40 bg-white flex items-center justify-center text-[#795744] shrink-0 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                  </div>
                  <span className="text-xs sm:text-sm lg:text-[15px] text-[#173653] font-medium">
                    A highly skilled and certified critical care expert team
                  </span>
                </div>

                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#795744]/40 bg-white flex items-center justify-center text-[#795744] shrink-0 shadow-2xs">
                    <HeartPulse className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.8]" />
                  </div>
                  <span className="text-xs sm:text-sm lg:text-[15px] text-[#173653] font-medium">
                    Personalized care plans tailored to your specific health needs
                  </span>
                </div>
              </div>

              {/* Pill Button: "Our Approach" / "Book Consultation" */}
              <div>
                <button
                  type="button"
                  onClick={openBookingModal}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#795744] hover:bg-[#634534] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-xs transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Our Approach &amp; Consultation</span>
                </button>
              </div>

            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}

