import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { facilitiesData, facilitiesList } from '../assets/Data/Facilites'

const EASE = [0.22, 1, 0.36, 1]

// Quick lookup helper for facilities
const getFacility = (id) => facilitiesList.find((f) => f.id === id) || {}

export default function Facilities() {
  const {
    eyebrow = 'OUR FACILITIES',
    title = 'Technology that supports better care',
    subtitle = 'Advanced medical equipment for accurate diagnosis and effective treatment.',
    _cta = 'Explore equipment',
  } = facilitiesData

  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.12 })

  // Find all 11 facilities by their IDs
  const icu = getFacility('icu')
  const ventilator = getFacility('ventilator')
  const defibrillator = getFacility('defibrillator')
  const monitor = getFacility('monitor')
  const echo = getFacility('echo')
  const ecg = getFacility('ecg')
  const oxygen = getFacility('oxygen')
  const nebulizer = getFacility('nebulizer')
  const pulseOximeter = getFacility('pulse-oximeter')
  const pump = getFacility('pump')
  const glucometer = getFacility('glucometer')

  const _scrollToGrid = (e) => {
    e.preventDefault()
    const target = document.getElementById('facilities-grid')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="facilities"
      className="relative overflow-hidden bg-[#f6f9fc] py-16 sm:py-20 md:py-24"
    >
      {/* ============================================================== */}
      {/* TOP RIGHT DECORATIVE ELEMENTS (EXACT MATCH TO REFERENCE IMAGE) */}
      {/* ============================================================== */}
      <div className="absolute top-0 right-0 pointer-events-none select-none z-0 overflow-hidden w-full max-w-[550px] lg:max-w-[650px] h-[340px] hidden md:block">
        {/* Animated Half Circle Arc / Wide Ring Band */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: EASE }}
          className="absolute top-[-170px] right-[40px] lg:right-[90px] w-[340px] h-[340px]"
        >
          <svg
            width="340"
            height="340"
            viewBox="0 0 340 340"
            fill="none"
            className="w-full h-full"
          >
            {/* Outer Faint Guide Circle */}
            <circle
              cx="170"
              cy="170"
              r="160"
              stroke="#e2edfa"
              strokeWidth="1.5"
              opacity="0.4"
            />
            {/* Main Wide Translucent Ring Band (Exact match to reference) */}
            <circle
              cx="170"
              cy="170"
              r="125"
              stroke="#e3eefa"
              strokeWidth="32"
              opacity="0.7"
            />
            {/* Inner Faint Guide Circle */}
            <circle
              cx="170"
              cy="170"
              r="90"
              stroke="#dbe8f7"
              strokeWidth="1.5"
              opacity="0.6"
            />
          </svg>

          {/* Medical Cross (+) Positioned in Center of the Arc */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
            className="absolute top-[170px] left-[170px] -translate-x-1/2 -translate-y-1/2"
          >
            <svg
              className="w-16 h-16 sm:w-[92px] sm:h-[92px] drop-shadow-sm"
              viewBox="0 0 64 64"
              fill="none"
            >
              {/* Vertical bar */}
              <rect
                x="23"
                y="6"
                width="18"
                height="52"
                rx="5"
                fill="#cadff7"
              />
              {/* Horizontal bar */}
              <rect
                x="6"
                y="23"
                width="52"
                height="18"
                rx="5"
                fill="#cadff7"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Animated Heartbeat Line (ECG Waveform running across top right) */}
        <div className="absolute top-[198px] right-0 w-[380px] lg:w-[440px] h-[70px]">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 440 70"
            fill="none"
          >
            {/* Base static ECG rhythm path */}
            <path
              d="M0 35 L120 35 L140 35 L152 18 L164 54 L178 8 L194 62 L206 35 L224 35 L238 24 L250 44 L262 35 L440 35"
              stroke="#93c5fd"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.35"
            />

            {/* Glowing animated pulse wave that traces continuously */}
            <motion.path
              d="M0 35 L120 35 L140 35 L152 18 L164 54 L178 8 L194 62 L206 35 L224 35 L238 24 L250 44 L262 35 L440 35"
              stroke="#0284c7"
              strokeWidth="2.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{
                pathLength: [0, 0.3, 0.3, 0],
                pathOffset: [0, 0.25, 0.75, 1],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Subtle glow filter */}
            <motion.path
              d="M0 35 L120 35 L140 35 L152 18 L164 54 L178 8 L194 62 L206 35 L224 35 L238 24 L250 44 L262 35 L440 35"
              stroke="#38bdf8"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.25"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={{
                pathLength: [0, 0.25, 0.25, 0],
                pathOffset: [0, 0.25, 0.75, 1],
              }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </svg>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BOTTOM RIGHT CONCENTRIC HALF CIRCLE LINES                      */}
      {/* ============================================================== */}
      <div className="absolute -bottom-8 -right-8 pointer-events-none select-none z-0 overflow-hidden w-[260px] h-[260px] hidden sm:block">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.35, ease: EASE }}
          className="relative w-full h-full"
        >
          <svg
            width="260"
            height="260"
            viewBox="0 0 260 260"
            fill="none"
            className="w-full h-full"
          >
            {/* Outer Arc Line */}
            <circle
              cx="260"
              cy="260"
              r="210"
              stroke="#cadff7"
              strokeWidth="1.5"
              strokeOpacity="0.75"
            />
            {/* Middle Arc Line (Cyan/Teal Accent) */}
            <circle
              cx="260"
              cy="260"
              r="150"
              stroke="#5EC4D4"
              strokeWidth="2"
              strokeOpacity="0.85"
            />
            {/* Pulsing Accent Dot on the Middle Arc (Exact match) */}
            <motion.circle
              cx="154"
              cy="154"
              r="4.5"
              fill="#0888A0"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.75, 1, 0.75],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            {/* Inner Arc Line */}
            <circle
              cx="260"
              cy="260"
              r="95"
              stroke="#cadff7"
              strokeWidth="1.5"
              strokeOpacity="0.7"
            />
          </svg>
        </motion.div>
      </div>

      {/* Container with the EXACT same padding as About Doctor section: container mx-auto px-5 sm:px-10 lg:px-10 2xl:px-0 */}
      <div className="container mx-auto px-5 sm:px-10 lg:px-10 2xl:px-0 relative z-10">
        {/* ============================================================== */}
        {/* SECTION HEADER (MATCHING EXACT REFERENCE IMAGE)               */}
        {/* ============================================================== */}
        <div className="mb-10 sm:mb-14 md:mb-16 max-w-3xl">
          {/* Eyebrow Pill with Pulse Icon */}
          {/* <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF7F9] border border-[#5EC4D4]/40 text-[#0888A0] text-xs font-bold uppercase tracking-wider mb-4"
          > */}
          {/* Heartbeat pulse wave icon */}
          {/* <svg
              className="w-4 h-4 stroke-[#0888A0] fill-none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <span>{eyebrow}</span>
          </motion.div> */}

          <div className="flex items-center gap-3 py-3">
            <span className="text-xs sm:text-base lg:text-sm font-bold tracking-[0.2em] uppercase text-[#0888A0]">
              {eyebrow || 'OUR FACILITIES'}
            </span>
            <span className="w-12 sm:w-16 h-[1.5px] bg-[#5EC4D4]/50 inline-block" />
          </div>

          {/* Main Title: "Technology that supports better care" */}
          <header className="relative z-40 w-full flex items-start">
            <motion.h2
              className="type-section-title  text-[#292929]"
            >
              {title || 'Your Journey to Better Health'}
            </motion.h2>
          </header>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              className="mt-3 sm:mt-4 text-base sm:text-xl lg:text-lg text-gray-600 max-w-xl font-normal leading-relaxed"
            >
              {subtitle}
            </motion.p>
          )}

          {/* CTA Link: "Explore equipment →" */}
          {/* <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28, ease: EASE }}
            className="mt-4"
          >
            <a
              href="#facilities-grid"
              onClick={scrollToGrid}
              className="group inline-flex items-center gap-2 text-base sm:text-xl font-bold text-[#1A354F] hover:text-[#0888A0] transition-colors"
            >
              <span>{cta}</span>
              <span className="text-lg sm:text-3xl lg:text-xl transition-transform duration-300 group-hover:translate-x-1.5 text-[#0888A0]">
                →
              </span>
            </a>
          </motion.div> */}
        </div>

        {/* ============================================================== */}
        {/* 3-ROW BENTO SHOWCASE (WITH ENTRANCE ANIMATIONS)               */}
        {/* ============================================================== */}
        <div id="facilities-grid" className="w-full space-y-4 sm:space-y-5 lg:space-y-6">
          {/* ------------------------------------------------------------ */}
          {/* ROW 1: ICU (Wide) | Ventilator | Defibrillator | Monitor     */}
          {/* ------------------------------------------------------------ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.38fr_1.06fr_1fr_1.06fr] gap-4 sm:gap-5 lg:gap-6">
            {/* Card 1: ICU (Wide card with top-left dark navy badge - NOT zoomed) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2, ease: EASE }}
              className="group relative rounded-[24px] sm:rounded-[28px] overflow-hidden bg-white shadow-[0_4px_20px_rgba(10,47,80,0.03)] border border-slate-200/70 hover:shadow-xl hover:border-[#5EC4D4]/50 transition-all duration-300 min-h-[260px] sm:min-h-[290px] flex flex-col justify-between"
            >
              <img
                src={icu.image}
                alt={icu.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Top-Left Dark Navy Badge matching reference image */}
              <div className="relative z-10 self-start m-4 sm:m-5 bg-[#0b2942]/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-md flex items-center gap-2">
                <span className="w-4 h-1 rounded-full bg-[#10b981]" />
                <span className="font-display text-sm sm:text-lg lg:text-base font-bold text-white tracking-wider">
                  {icu.title}
                </span>
              </div>
            </motion.div>

            {/* Card 2: Ventilator (Zoomed image) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
              className="group relative rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(10,47,80,0.03)] border border-slate-200/70 hover:shadow-xl hover:border-[#5EC4D4]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between p-4 sm:p-5 min-h-[260px] sm:min-h-[290px]"
            >
              <div className="w-full flex-1 flex items-center justify-center p-1 sm:p-2 overflow-hidden">
                <img
                  src={ventilator.image}
                  alt={ventilator.title}
                  loading="lazy"
                  className="w-full h-48 sm:h-56 md:h-60 object-contain scale-110 sm:scale-115 group-hover:scale-120 transition-transform duration-500 ease-out"
                />
              </div>
              <h3 className="font-display text-lg sm:text-2xl lg:text-lg font-bold text-[#1A354F] group-hover:text-[#0888A0] transition-colors mt-2 text-left">
                {ventilator.title}
              </h3>
            </motion.div>

            {/* Card 3: Defibrillator (Zoomed image) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.3, ease: EASE }}
              className="group relative rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(10,47,80,0.03)] border border-slate-200/70 hover:shadow-xl hover:border-[#5EC4D4]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between p-4 sm:p-5 min-h-[260px] sm:min-h-[290px]"
            >
              <div className="w-full flex-1 flex items-center justify-center p-1 sm:p-2 overflow-hidden">
                <img
                  src={defibrillator.image}
                  alt={defibrillator.title}
                  loading="lazy"
                  className="w-full h-48 sm:h-56 md:h-60 object-contain scale-110 sm:scale-115 group-hover:scale-120 transition-transform duration-500 ease-out"
                />
              </div>
              <h3 className="font-display text-lg sm:text-2xl lg:text-lg font-bold text-[#1A354F] group-hover:text-[#0888A0] transition-colors mt-2 text-left">
                {defibrillator.title}
              </h3>
            </motion.div>

            {/* Card 4: Monitor (Zoomed image) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.35, ease: EASE }}
              className="group relative rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(10,47,80,0.03)] border border-slate-200/70 hover:shadow-xl hover:border-[#5EC4D4]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between p-4 sm:p-5 min-h-[260px] sm:min-h-[290px]"
            >
              <div className="w-full flex-1 flex items-center justify-center p-1 sm:p-2 overflow-hidden">
                <img
                  src={monitor.image}
                  alt={monitor.title}
                  loading="lazy"
                  className="w-full h-48 sm:h-56 md:h-60 object-contain scale-110 sm:scale-115 group-hover:scale-120 transition-transform duration-500 ease-out"
                />
              </div>
              <h3 className="font-display text-lg sm:text-2xl lg:text-lg font-bold text-[#1A354F] group-hover:text-[#0888A0] transition-colors mt-2 text-left">
                {monitor.title}
              </h3>
            </motion.div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* ROW 2: Echo | ECG (Wide) | Oxygen Machine | Medical Nebulizer*/}
          {/* ------------------------------------------------------------ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1.44fr_1.03fr_1.03fr] gap-4 sm:gap-5 lg:gap-6">
            {/* Card 5: Echocardiography (Echo) (Zoomed image) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.4, ease: EASE }}
              className="group relative rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(10,47,80,0.03)] border border-slate-200/70 hover:shadow-xl hover:border-[#5EC4D4]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between p-4 sm:p-5 min-h-[260px] sm:min-h-[290px]"
            >
              <div className="w-full flex-1 flex items-center justify-center p-1 sm:p-2 overflow-hidden">
                <img
                  src={echo.image}
                  alt={echo.title}
                  loading="lazy"
                  className="w-full h-48 sm:h-56 md:h-60 object-contain scale-110 sm:scale-115 group-hover:scale-120 transition-transform duration-500 ease-out"
                />
              </div>
              <h3 className="font-display text-lg sm:text-2xl lg:text-lg font-bold text-[#1A354F] group-hover:text-[#0888A0] transition-colors mt-2 text-left">
                {echo.title}
              </h3>
            </motion.div>

            {/* Card 6: ECG (Wide card - Zoomed image) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.45, ease: EASE }}
              className="group relative rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(10,47,80,0.03)] border border-slate-200/70 hover:shadow-xl hover:border-[#5EC4D4]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between p-4 sm:p-5 min-h-[260px] sm:min-h-[290px]"
            >
              <div className="w-full flex-1 flex items-center justify-center p-1 sm:p-2 overflow-hidden">
                <img
                  src={ecg.image}
                  alt={ecg.title}
                  loading="lazy"
                  className="w-full h-48 sm:h-56 md:h-60 object-contain scale-110 sm:scale-115 group-hover:scale-120 transition-transform duration-500 ease-out"
                />
              </div>
              <h3 className="font-display text-lg sm:text-2xl lg:text-lg font-bold text-[#1A354F] group-hover:text-[#0888A0] transition-colors mt-2 text-left">
                {ecg.title}
              </h3>
            </motion.div>

            {/* Card 7: Oxygen Machine (Zoomed image) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.5, ease: EASE }}
              className="group relative rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(10,47,80,0.03)] border border-slate-200/70 hover:shadow-xl hover:border-[#5EC4D4]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between p-4 sm:p-5 min-h-[260px] sm:min-h-[290px]"
            >
              <div className="w-full flex-1 flex items-center justify-center p-1 sm:p-2 overflow-hidden">
                <img
                  src={oxygen.image}
                  alt={oxygen.title}
                  loading="lazy"
                  className="w-full h-48 sm:h-56 md:h-60 object-contain scale-110 sm:scale-115 group-hover:scale-120 transition-transform duration-500 ease-out"
                />
              </div>
              <h3 className="font-display text-lg sm:text-2xl lg:text-lg font-bold text-[#1A354F] group-hover:text-[#0888A0] transition-colors mt-2 text-left">
                {oxygen.title}
              </h3>
            </motion.div>

            {/* Card 8: Medical Nebulizer (Zoomed image) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.55, ease: EASE }}
              className="group relative rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(10,47,80,0.03)] border border-slate-200/70 hover:shadow-xl hover:border-[#5EC4D4]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between p-4 sm:p-5 min-h-[260px] sm:min-h-[290px]"
            >
              <div className="w-full flex-1 flex items-center justify-center p-1 sm:p-2 overflow-hidden">
                <img
                  src={nebulizer.image}
                  alt={nebulizer.title}
                  loading="lazy"
                  className="w-full h-48 sm:h-56 md:h-60 object-contain scale-110 sm:scale-115 group-hover:scale-120 transition-transform duration-500 ease-out"
                />
              </div>
              <h3 className="font-display text-lg sm:text-2xl lg:text-lg font-bold text-[#1A354F] group-hover:text-[#0888A0] transition-colors mt-2 text-left">
                {nebulizer.title}
              </h3>
            </motion.div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* ROW 3: Pulse Oximeter | Pump (Wide) | Digital Glucometer     */}
          {/* ------------------------------------------------------------ */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.5fr_1.1fr] gap-4 sm:gap-5 lg:gap-6">
            {/* Card 9: Pulse Oximeter (Zoomed image) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.6, ease: EASE }}
              className="group relative rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(10,47,80,0.03)] border border-slate-200/70 hover:shadow-xl hover:border-[#5EC4D4]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between p-4 sm:p-5 min-h-[260px] sm:min-h-[290px]"
            >
              <div className="w-full flex-1 flex items-center justify-center p-1 sm:p-2 overflow-hidden">
                <img
                  src={pulseOximeter.image}
                  alt={pulseOximeter.title}
                  loading="lazy"
                  className="w-full h-48 sm:h-56 md:h-60 object-contain scale-110 sm:scale-115 group-hover:scale-120 transition-transform duration-500 ease-out"
                />
              </div>
              <h3 className="font-display text-lg sm:text-2xl lg:text-lg font-bold text-[#1A354F] group-hover:text-[#0888A0] transition-colors mt-2 text-left">
                {pulseOximeter.title}
              </h3>
            </motion.div>

            {/* Card 10: Infusion Syringe Pump (Wide card - Zoomed image) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.65, ease: EASE }}
              className="group relative rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(10,47,80,0.03)] border border-slate-200/70 hover:shadow-xl hover:border-[#5EC4D4]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between p-4 sm:p-5 min-h-[260px] sm:min-h-[290px]"
            >
              <div className="w-full flex-1 flex items-center justify-center p-1 sm:p-2 overflow-hidden">
                <img
                  src={pump.image}
                  alt={pump.title}
                  loading="lazy"
                  className="w-full h-48 sm:h-56 md:h-60 object-contain scale-110 sm:scale-115 group-hover:scale-120 transition-transform duration-500 ease-out"
                />
              </div>
              <h3 className="font-display text-lg sm:text-2xl lg:text-lg font-bold text-[#1A354F] group-hover:text-[#0888A0] transition-colors mt-2 text-left">
                {pump.title}
              </h3>
            </motion.div>

            {/* Card 11: Digital Glucometer (Zoomed image) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.7, ease: EASE }}
              className="group relative rounded-[24px] sm:rounded-[28px] bg-white shadow-[0_4px_20px_rgba(10,47,80,0.03)] border border-slate-200/70 hover:shadow-xl hover:border-[#5EC4D4]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between p-4 sm:p-5 min-h-[260px] sm:min-h-[290px]"
            >
              <div className="w-full flex-1 flex items-center justify-center p-1 sm:p-2 overflow-hidden">
                <img
                  src={glucometer.image}
                  alt={glucometer.title}
                  loading="lazy"
                  className="w-full h-48 sm:h-56 md:h-60 object-contain scale-110 sm:scale-115 group-hover:scale-120 transition-transform duration-500 ease-out"
                />
              </div>
              <h3 className="font-display text-lg sm:text-2xl lg:text-lg font-bold text-[#1A354F] group-hover:text-[#0888A0] transition-colors mt-2 text-left">
                {glucometer.title}
              </h3>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==========================================================================
   ORIGINAL FACILITIES SECTION (COMMENTED OUT AS REQUESTED - DO NOT REMOVE)
   ==========================================================================

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { facilitiesData } from '../assets/Data/Facilites'

export function OriginalFacilities() {
  const { title, video, videoAriaLabel } = facilitiesData
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section
      ref={sectionRef}
      id="facilities"
      className="relative overflow-hidden bg-[#ebedee] py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="type-section-title mx-auto max-w-3xl text-center text-[#292929]"
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-6xl sm:mt-10 md:mt-12"
        >
          <div className="overflow-hidden rounded-[1.25rem] bg-black/5 sm:rounded-[1.5rem] md:rounded-[1.75rem]">
            <video
              src={video}
              className="block aspect-video h-auto max-h-[70vh] w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={videoAriaLabel}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
========================================================================== */
