import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

// Medical equipment images matching reference composition
import Glucometer from '../assets/Images/Facilites/Glucometer.webp'
import Nebulizer from '../assets/Images/Facilites/Nebulizer.webp'
import PulseOximeter from '../assets/Images/Facilites/Pulse Oximeter.webp'
import Pump from '../assets/Images/Facilites/Pump.webp'
import Echo from '../assets/Images/Facilites/Echo.webp'
import ICU from '../assets/Images/Facilites/ICU.webp'
import Ventilator from '../assets/Images/Facilites/Ventilator.webp'
import Defibrillator from '../assets/Images/Facilites/Defibrillator.webp'
import Monitor from '../assets/Images/Facilites/Monitor.webp'
import ECG from '../assets/Images/Facilites/ECG.webp'
import OxygenMachine from '../assets/Images/Facilites/Oxygen Machine.webp'

const EASE = [0.22, 1, 0.36, 1]

// Equipment dictionary for modal previews and accessibility
const EQUIPMENT_DATA = {
  glucometer: {
    id: 'glucometer',
    title: 'Digital Glucometer',
    category: 'Lab & Diagnostic',
    description: 'Rapid, accurate point-of-care digital blood glucose analysis and glycemic tracking.',
    image: Glucometer,
  },
  nebulizer: {
    id: 'nebulizer',
    title: 'Medical Nebulizer',
    category: 'Pulmonary Care',
    description: 'High-efficiency medication aerosolization for acute and chronic respiratory management.',
    image: Nebulizer,
  },
  'pulse-oximeter': {
    id: 'pulse-oximeter',
    title: 'Pulse Oximeter',
    category: 'Pulmonary & Vitals',
    description: 'Accurate real-time blood oxygen saturation (SpO2) and continuous pulse rate monitoring.',
    image: PulseOximeter,
  },
  pump: {
    id: 'pump',
    title: 'Infusion Syringe Pump',
    category: 'Critical Care Infusion',
    description: 'Precision microprocessor-controlled intravenous infusion syringe delivery system.',
    image: Pump,
  },
  echo: {
    id: 'echo',
    title: 'Echocardiography (Echo)',
    category: 'Cardiac Imaging',
    description: 'Advanced cardiac ultrasound imaging for real-time valve and structural heart evaluation.',
    image: Echo,
  },
  icu: {
    id: 'icu',
    title: 'Intensive Care Unit (ICU)',
    category: 'Critical Care Facility',
    description: 'Fully equipped intensive care unit with advanced life-support systems for 24/7 critical management.',
    image: ICU,
  },
  ventilator: {
    id: 'ventilator',
    title: 'Mechanical Ventilator',
    category: 'Pulmonary Life Support',
    description: 'Comprehensive mechanical ventilation support with multi-mode respiratory monitoring.',
    image: Ventilator,
  },
  defibrillator: {
    id: 'defibrillator',
    title: 'Defibrillator',
    category: 'Cardiac Emergency',
    description: 'Emergency biphasic defibrillation and cardiac pacing system for critical life support.',
    image: Defibrillator,
  },
  monitor: {
    id: 'monitor',
    title: 'Multi-Parameter Monitor',
    category: 'Vitals Monitoring',
    description: 'Multi-parameter continuous monitoring of ECG, SpO2, NIBP, temperature, and core vitals.',
    image: Monitor,
  },
  ecg: {
    id: 'ecg',
    title: '12-Lead ECG System',
    category: 'Cardiac Diagnostic',
    description: 'High-precision 12-lead digital electrocardiogram for real-time cardiac rhythm diagnosis.',
    image: ECG,
  },
  oxygen: {
    id: 'oxygen',
    title: 'Oxygen Machine',
    category: 'Respiratory Support',
    description: 'Medical-grade continuous oxygen delivery system for therapeutic respiratory support.',
    image: OxygenMachine,
  },
}

export default function Facilities() {
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)
  const icuRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.12 })

  // Active item for modal popup (if clicked)
  const [activeModalItem, setActiveModalItem] = useState(null)

  // Auto-scroll on mobile/tablet to center the ICU hero card initially
  useEffect(() => {
    if (scrollRef.current && icuRef.current && typeof window !== 'undefined' && window.innerWidth < 1024) {
      const timer = setTimeout(() => {
        if (!scrollRef.current || !icuRef.current) return
        const container = scrollRef.current
        const card = icuRef.current
        const scrollTarget = card.offsetLeft - (container.clientWidth / 2) + (card.clientWidth / 2)
        container.scrollTo({ left: Math.max(0, scrollTarget), behavior: 'smooth' })
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [])

  const scrollByAmount = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={sectionRef}
      id="facilities"
      className="relative w-full overflow-hidden bg-[#FAF7F2] py-16 sm:py-20 lg:pb-20 text-[#173653] transition-colors duration-300"
    >
      {/* Container: container mx-auto px-5 sm:px-10 lg:px-10 2xl:px-0 (no max-w on section tag) */}
      <div className="container mx-auto px-5 sm:px-10 lg:px-10 2xl:px-0 relative z-10">

        {/* ============================================================== */}
        {/* SECTION HEADER: Pill Badge + Playfair Serif Two-Tone Heading   */}
        {/* ============================================================== */}
        <div className="text-center mx-auto mb-10 sm:mb-14 lg:mb-16">
          {/* Pill Badge: Our Facilities (Exact style as About Doctor) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE7DC] border border-[#E7DECE] text-xs sm:text-sm font-semibold text-[#795744] mb-4 sm:mb-6 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#A9C9E5]" />
            <span>Our Facilities</span>
          </motion.div>

          {/* Main Heading: Technology that supports better care. */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="font-serif text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] text-[#173653] font-normal tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6 sm:mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, Cambria, serif" }}
          >
            Technology That Supports{' '}
            <span className="text-[#795744]">Better Care.</span>
          </motion.h2>
        </div>

        {/* ============================================================== */}
        {/* 1. TOP CARDS SHOWCASE (WIDER CARDS, FULL-COVER VISUAL DISPLAY) */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative w-full"
        >
          {/* Scrollable Container on Mobile/Tablet (< lg), Natural Fit on Desktop (>= lg) */}
          <div
            ref={scrollRef}
            className="w-full overflow-x-auto pb-4 pt-1 lg:overflow-visible lg:pb-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
          >
            {/* 7-Column Flex Showcase matching reference image with wider card proportions */}
            <div className="flex items-stretch justify-start lg:justify-center gap-2 sm:gap-2.5 lg:gap-3 xl:gap-3.5 h-[340px] sm:h-[370px] lg:h-[390px] xl:h-[420px] min-w-[960px] sm:min-w-[1040px] lg:min-w-0 lg:w-full">

              {/* ======================================================== */}
              {/* COLUMN 1: Digital Glucometer (Single Tall Card)          */}
              {/* ======================================================== */}
              <div className="w-[125px] sm:w-[145px] lg:w-auto lg:flex-[1.2] xl:flex-[1.25] min-w-0 h-full snap-start">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(EQUIPMENT_DATA.glucometer)}
                  title={EQUIPMENT_DATA.glucometer.title}
                  className="w-full h-full bg-white border border-[#E7DECE]/80 rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_rgba(23,54,83,0.05)] hover:shadow-[0_8px_30px_rgba(23,54,83,0.1)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center p-1.5 sm:p-2 relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A9C9E5] overflow-hidden"
                >
                  <img
                    src={Glucometer}
                    alt={EQUIPMENT_DATA.glucometer.title}
                    className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
                    loading="lazy"
                  />
                </button>
              </div>

              {/* ======================================================== */}
              {/* COLUMN 2: Nebulizer + Pulse Oximeter + Pump (3 Stacked)  */}
              {/* ======================================================== */}
              <div className="w-[130px] sm:w-[150px] lg:w-auto lg:flex-[1.25] xl:flex-[1.3] min-w-0 h-full flex flex-col gap-2 sm:gap-2.5 snap-start">
                {/* 2.1 Medical Nebulizer */}
                <button
                  type="button"
                  onClick={() => setActiveModalItem(EQUIPMENT_DATA.nebulizer)}
                  title={EQUIPMENT_DATA.nebulizer.title}
                  className="w-full flex-1 bg-white border border-[#E7DECE]/80 rounded-xl sm:rounded-2xl shadow-[0_4px_16px_rgba(23,54,83,0.04)] hover:shadow-[0_6px_22px_rgba(23,54,83,0.09)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center p-1 sm:p-1.5 relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A9C9E5] overflow-hidden"
                >
                  <img
                    src={Nebulizer}
                    alt={EQUIPMENT_DATA.nebulizer.title}
                    className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
                    loading="lazy"
                  />
                </button>

                {/* 2.2 Pulse Oximeter */}
                <button
                  type="button"
                  onClick={() => setActiveModalItem(EQUIPMENT_DATA['pulse-oximeter'])}
                  title={EQUIPMENT_DATA['pulse-oximeter'].title}
                  className="w-full flex-1 bg-white border border-[#E7DECE]/80 rounded-xl sm:rounded-2xl shadow-[0_4px_16px_rgba(23,54,83,0.04)] hover:shadow-[0_6px_22px_rgba(23,54,83,0.09)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center p-1 sm:p-1.5 relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A9C9E5] overflow-hidden"
                >
                  <img
                    src={PulseOximeter}
                    alt={EQUIPMENT_DATA['pulse-oximeter'].title}
                    className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
                    loading="lazy"
                  />
                </button>

                {/* 2.3 Infusion Syringe Pump */}
                <button
                  type="button"
                  onClick={() => setActiveModalItem(EQUIPMENT_DATA.pump)}
                  title={EQUIPMENT_DATA.pump.title}
                  className="w-full flex-1 bg-white border border-[#E7DECE]/80 rounded-xl sm:rounded-2xl shadow-[0_4px_16px_rgba(23,54,83,0.04)] hover:shadow-[0_6px_22px_rgba(23,54,83,0.09)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center p-1 sm:p-1.5 relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A9C9E5] overflow-hidden"
                >
                  <img
                    src={Pump}
                    alt={EQUIPMENT_DATA.pump.title}
                    className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
                    loading="lazy"
                  />
                </button>
              </div>

              {/* ======================================================== */}
              {/* COLUMN 3: Echocardiography (Echo) (Single Tall Card)     */}
              {/* ======================================================== */}
              <div className="w-[125px] sm:w-[145px] lg:w-auto lg:flex-[1.2] xl:flex-[1.25] min-w-0 h-full snap-start">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(EQUIPMENT_DATA.echo)}
                  title={EQUIPMENT_DATA.echo.title}
                  className="w-full h-full bg-white border border-[#E7DECE]/80 rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_rgba(23,54,83,0.05)] hover:shadow-[0_8px_30px_rgba(23,54,83,0.1)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center p-1.5 sm:p-2 relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A9C9E5] overflow-hidden"
                >
                  <img
                    src={Echo}
                    alt={EQUIPMENT_DATA.echo.title}
                    className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
                    loading="lazy"
                  />
                </button>
              </div>

              {/* ======================================================== */}
              {/* COLUMN 4: Intensive Care Unit (ICU) (Center Hero Card)   */}
              {/* ======================================================== */}
              <div
                ref={icuRef}
                className="w-[280px] sm:w-[330px] lg:w-auto lg:flex-[2.6] xl:flex-[2.8] min-w-0 h-full snap-center"
              >
                <button
                  type="button"
                  onClick={() => setActiveModalItem(EQUIPMENT_DATA.icu)}
                  title={EQUIPMENT_DATA.icu.title}
                  className="w-full h-full bg-white border border-[#E7DECE]/80 rounded-2xl sm:rounded-3xl shadow-[0_6px_28px_rgba(23,54,83,0.08)] hover:shadow-[0_12px_36px_rgba(23,54,83,0.13)] hover:-translate-y-1 transition-all duration-300 overflow-hidden relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A9C9E5]"
                >
                  <img
                    src={ICU}
                    alt={EQUIPMENT_DATA.icu.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none pointer-events-none"
                    loading="lazy"
                  />
                </button>
              </div>

              {/* ======================================================== */}
              {/* COLUMN 5: Mechanical Ventilator (Single Tall Card)       */}
              {/* ======================================================== */}
              <div className="w-[125px] sm:w-[145px] lg:w-auto lg:flex-[1.2] xl:flex-[1.25] min-w-0 h-full snap-start">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(EQUIPMENT_DATA.ventilator)}
                  title={EQUIPMENT_DATA.ventilator.title}
                  className="w-full h-full bg-white border border-[#E7DECE]/80 rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_rgba(23,54,83,0.05)] hover:shadow-[0_8px_30px_rgba(23,54,83,0.1)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center p-1.5 sm:p-2 relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A9C9E5] overflow-hidden"
                >
                  <img
                    src={Ventilator}
                    alt={EQUIPMENT_DATA.ventilator.title}
                    className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
                    loading="lazy"
                  />
                </button>
              </div>

              {/* ======================================================== */}
              {/* COLUMN 6: Defibrillator + Monitor + ECG (3 Stacked)      */}
              {/* ======================================================== */}
              <div className="w-[130px] sm:w-[150px] lg:w-auto lg:flex-[1.25] xl:flex-[1.3] min-w-0 h-full flex flex-col gap-2 sm:gap-2.5 snap-start">
                {/* 6.1 Defibrillator */}
                <button
                  type="button"
                  onClick={() => setActiveModalItem(EQUIPMENT_DATA.defibrillator)}
                  title={EQUIPMENT_DATA.defibrillator.title}
                  className="w-full flex-1 bg-white border border-[#E7DECE]/80 rounded-xl sm:rounded-2xl shadow-[0_4px_16px_rgba(23,54,83,0.04)] hover:shadow-[0_6px_22px_rgba(23,54,83,0.09)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center p-1 sm:p-1.5 relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A9C9E5] overflow-hidden"
                >
                  <img
                    src={Defibrillator}
                    alt={EQUIPMENT_DATA.defibrillator.title}
                    className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
                    loading="lazy"
                  />
                </button>

                {/* 6.2 Monitor */}
                <button
                  type="button"
                  onClick={() => setActiveModalItem(EQUIPMENT_DATA.monitor)}
                  title={EQUIPMENT_DATA.monitor.title}
                  className="w-full flex-1 bg-white border border-[#E7DECE]/80 rounded-xl sm:rounded-2xl shadow-[0_4px_16px_rgba(23,54,83,0.04)] hover:shadow-[0_6px_22px_rgba(23,54,83,0.09)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center p-1 sm:p-1.5 relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A9C9E5] overflow-hidden"
                >
                  <img
                    src={Monitor}
                    alt={EQUIPMENT_DATA.monitor.title}
                    className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
                    loading="lazy"
                  />
                </button>

                {/* 6.3 ECG */}
                <button
                  type="button"
                  onClick={() => setActiveModalItem(EQUIPMENT_DATA.ecg)}
                  title={EQUIPMENT_DATA.ecg.title}
                  className="w-full flex-1 bg-white border border-[#E7DECE]/80 rounded-xl sm:rounded-2xl shadow-[0_4px_16px_rgba(23,54,83,0.04)] hover:shadow-[0_6px_22px_rgba(23,54,83,0.09)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center p-1 sm:p-1.5 relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A9C9E5] overflow-hidden"
                >
                  <img
                    src={ECG}
                    alt={EQUIPMENT_DATA.ecg.title}
                    className="w-full h-full object-contain p-0.5 group-hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
                    loading="lazy"
                  />
                </button>
              </div>

              {/* ======================================================== */}
              {/* COLUMN 7: Oxygen Machine (Single Tall Card)              */}
              {/* ======================================================== */}
              <div className="w-[125px] sm:w-[145px] lg:w-auto lg:flex-[1.2] xl:flex-[1.25] min-w-0 h-full snap-start">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(EQUIPMENT_DATA.oxygen)}
                  title={EQUIPMENT_DATA.oxygen.title}
                  className="w-full h-full bg-white border border-[#E7DECE]/80 rounded-2xl sm:rounded-3xl shadow-[0_4px_20px_rgba(23,54,83,0.05)] hover:shadow-[0_8px_30px_rgba(23,54,83,0.1)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center p-1.5 sm:p-2 relative group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#A9C9E5] overflow-hidden"
                >
                  <img
                    src={OxygenMachine}
                    alt={EQUIPMENT_DATA.oxygen.title}
                    className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300 select-none pointer-events-none"
                    loading="lazy"
                  />
                </button>
              </div>

            </div>
          </div>

          {/* Mobile/Tablet Swipe Hint & Quick Nav Buttons (< lg) */}
          <div className="lg:hidden mt-3 flex items-center justify-between text-[0.72rem] sm:text-xs text-[#795744]">
            <span className="flex items-center gap-1.5 opacity-85">
              <Sparkles className="w-3.5 h-3.5 text-[#A9C9E5]" />
              Swipe horizontally to explore all equipment
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollByAmount(-200)}
                aria-label="Scroll left"
                className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#E7DECE] text-[#173653] flex items-center justify-center active:scale-95 transition-transform"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByAmount(200)}
                aria-label="Scroll right"
                className="w-7 h-7 rounded-full bg-[#FAF7F2] border border-[#E7DECE] text-[#173653] flex items-center justify-center active:scale-95 transition-transform"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>


      {/* ============================================================== */}
      {/* FULL IMAGE LIGHTBOX MODAL (ON EQUIPMENT CARD CLICK)            */}
      {/* ============================================================== */}
      <AnimatePresence>
        {activeModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalItem(null)}
            className="fixed inset-0 z-50 bg-[#173653]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-[#FAF7F2] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/40 overflow-hidden"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#173653] hover:bg-[#11273C] text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-4 sm:mb-6 pr-12">
                <span className="inline-block px-3 py-1 rounded-full bg-[#EAF2F9] border border-[#A9C9E5]/50 text-[0.72rem] sm:text-xs font-semibold text-[#173653] uppercase tracking-wider mb-2">
                  {activeModalItem.category}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#173653]">
                  {activeModalItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#795744] mt-1 leading-relaxed">
                  {activeModalItem.description}
                </p>
              </div>

              {/* Full Image Preview Frame */}
              <div className="w-full h-[280px] min-[480px]:h-[340px] sm:h-[400px] bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 flex items-center justify-center border border-[#E7DECE] shadow-inner">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="max-h-full max-w-full object-contain select-none drop-shadow-lg"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ==========================================================================
   PREVIOUS FACILITIES IMPLEMENTATION (COMMENTED OUT - PRESERVED AS REQUESTED)
   ==========================================================================

import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowUpRight, X, Activity } from 'lucide-react'
import { facilitiesData, facilitiesList } from '../assets/Data/Facilites'

const EASE = [0.22, 1, 0.36, 1]

const CATEGORY_MAP = {
  ecg: 'Cardiac',
  defibrillator: 'Cardiac',
  echo: 'Imaging',
  ventilator: 'Pulmonary',
  oxygen: 'Pulmonary',
  nebulizer: 'Pulmonary',
  'pulse-oximeter': 'Pulmonary',
  monitor: 'Lab & General',
  icu: 'Lab & General',
  pump: 'Lab & General',
  glucometer: 'Lab & General',
}

export function PreviousFacilities() {
  const {
    eyebrow = 'CLINICAL FACILITIES',
    title = 'Technology that supports better care',
    subtitle = 'Advanced medical equipment for accurate diagnosis and effective treatment.',
  } = facilitiesData

  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.12 })

  const normalizedList = useMemo(() => {
    return facilitiesList.map((item) => ({
      ...item,
      category: item.category || CATEGORY_MAP[item.id] || 'Lab & General',
    }))
  }, [])

  const filteredList = normalizedList
  const [activeId, setActiveId] = useState(normalizedList[0]?.id || 'ecg')

  const activeItem = useMemo(() => {
    return (
      normalizedList.find((item) => item.id === activeId) ||
      normalizedList[0]
    )
  }, [normalizedList, activeId])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePrev = () => {
    const currentIdx = normalizedList.findIndex((item) => item.id === activeItem?.id)
    const prevIdx =
      currentIdx <= 0 ? normalizedList.length - 1 : currentIdx - 1
    if (normalizedList[prevIdx]) {
      setActiveId(normalizedList[prevIdx].id)
    }
  }

  const handleNext = () => {
    const currentIdx = normalizedList.findIndex((item) => item.id === activeItem?.id)
    const nextIdx =
      currentIdx >= normalizedList.length - 1 ? 0 : currentIdx + 1
    if (normalizedList[nextIdx]) {
      setActiveId(normalizedList[nextIdx].id)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="facilities-prev"
      className="relative w-full overflow-hidden bg-white py-14 sm:py-18 lg:py-24 text-[#173653] transition-colors duration-300"
    >
      <div className="container mx-auto px-5 sm:px-10 lg:px-10 2xl:px-0 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 pb-8 sm:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#795744]">
                {eyebrow || 'CLINICAL FACILITIES'} · {normalizedList.length} DIAGNOSTIC SYSTEMS
              </span>
            </div>

            <h2
              className="font-serif text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] text-[#173653] font-normal tracking-tight leading-[1.14] select-none"
              style={{ fontFamily: "'Playfair Display', Georgia, Cambria, serif" }}
            >
              {title.includes('better care') ? (
                <>
                  {title.replace('better care', '')}
                  <span className="italic font-normal">better care.</span>
                </>
              ) : (
                title
              )}
            </h2>

            {subtitle && (
              <p className="mt-2.5 sm:mt-3.5 text-sm sm:text-base lg:text-lg text-[#795744] font-normal leading-relaxed max-w-xl">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>

        <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 xl:gap-10 items-stretch">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:col-span-7 flex flex-col h-[400px] min-[420px]:h-[440px] sm:h-[480px] lg:h-[495px]"
          >
            <div className="relative w-full h-full rounded-2xl sm:rounded-3xl bg-white border border-[#E7DECE] shadow-[0_16px_40px_rgba(23,54,83,0.06)] p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
              <div className="relative w-full flex-1 rounded-xl sm:rounded-2xl bg-[#FAF7F2] border border-[#E7DECE]/50 flex items-center justify-center p-4 sm:p-6 min-h-0 overflow-hidden">
                <span className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 px-3 py-1 rounded-full bg-[#EFE7DC] border border-[#E7DECE] text-xs font-semibold text-[#173653] shadow-xs">
                  {activeItem.category}
                </span>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#173653]/90 hover:bg-[#173653] text-white text-xs sm:text-sm font-medium shadow-md transition-all duration-200 cursor-pointer active:scale-95"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#A9C9E5]" />
                  <span>View Full Image</span>
                </button>

                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeItem.id}
                    src={activeItem.image}
                    alt={activeItem.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className={`relative z-10 max-h-full max-w-full w-auto h-auto select-none pointer-events-none drop-shadow-md ${
                      activeItem.fit === 'cover'
                        ? 'w-full h-full object-cover rounded-xl'
                        : 'object-contain'
                    }`}
                    loading="eager"
                    decoding="async"
                  />
                </AnimatePresence>
              </div>

              <div className="mt-3.5 sm:mt-4 pt-3 sm:pt-3.5 border-t border-[#E7DECE]/60 flex items-center gap-3 sm:gap-4 shrink-0">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#EFE7DC] text-[#173653] flex items-center justify-center shrink-0 shadow-xs">
                  <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-[#173653]" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-bold text-base sm:text-lg lg:text-xl text-[#173653] tracking-tight truncate">
                    {activeItem.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#795744] mt-0.5 line-clamp-1 sm:line-clamp-2 leading-relaxed">
                    {activeItem.description || subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-center">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous equipment"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EFE7DC] text-[#173653] hover:bg-[#173653] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next equipment"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EFE7DC] text-[#173653] hover:bg-[#173653] hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="lg:col-span-5 flex flex-col h-[380px] sm:h-[430px] lg:h-[495px]"
          >
            <div className="w-full h-full rounded-2xl sm:rounded-3xl border border-[#E7DECE] p-3 sm:p-3.5 flex flex-col overflow-hidden">
              <div className="h-full overflow-y-auto space-y-1.5 sm:space-y-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pr-0.5">
                {filteredList.map((item) => {
                  const isSelected = item.id === activeItem.id
                  const globalIndex = normalizedList.findIndex((it) => it.id === item.id)
                  const displayNumber = String(globalIndex + 1).padStart(2, '0')

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className={`w-full text-left rounded-xl sm:rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                        isSelected
                          ? 'bg-[#173653] text-white px-4 py-3 sm:px-5 sm:py-3.5 shadow-md'
                          : 'px-4 py-2.5 sm:px-5 sm:py-3 hover:bg-[#EFE7DC] text-[#173653]'
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                        {isSelected ? (
                          <span className="shrink-0 bg-white/20 text-white font-bold text-xs sm:text-sm lg:text-base px-2.5 py-1 rounded-lg">
                            {displayNumber}
                          </span>
                        ) : (
                          <span className="shrink-0 text-xs sm:text-sm lg:text-base font-semibold text-[#795744] group-hover:text-[#173653] w-6 sm:w-7 text-center">
                            {displayNumber}
                          </span>
                        )}

                        <span
                          className={`truncate text-sm sm:text-base lg:text-lg font-semibold ${
                            isSelected ? 'text-white font-bold' : 'text-[#173653]'
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
========================================================================== */
