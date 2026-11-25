import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  CalendarCheck,
  ClipboardCheck,
  HeartPulse,
  CheckCircle2,
  Plus,
  Minus,
} from 'lucide-react'
import { processData } from '../assets/Data/Process'
import { openBookingModal } from './BookingModal'

// Thematic clinical images for each expanded step's 3-photo showcase
import step1 from '../assets/Images/Process/step1.jpg'
import step2 from '../assets/Images/Process/step2.jpg'
import step3 from '../assets/Images/Process/step3.jpg'
import step4 from '../assets/Images/Process/step4.jpg'

import heroDoctorPatient from '../assets/Images/hero_doctor_patient.jpg'
import generalConsult from '../assets/Images/Conditions/GeneralConsultaion.webp'
import echoImg from '../assets/Images/Facilites/Echo.webp'
import ecgImg from '../assets/Images/Facilites/ECG.webp'
import monitorImg from '../assets/Images/Facilites/Monitor.webp'
import diabetesImg from '../assets/Images/Conditions/Diabetes.webp'
import icuImg from '../assets/Images/Facilites/ICU.webp'
import prevCardioImg from '../assets/Images/Conditions/Preventive Cardiology.webp'

const EASE = [0.22, 1, 0.36, 1]

// Step icons corresponding to the 4 stages of care
const STEP_ICONS = {
  '01': CalendarCheck,
  '02': ClipboardCheck,
  '03': HeartPulse,
  '04': CheckCircle2,
}

// 3 clinical showcase images for each step (exact to 2nd reference image layout)
const STEP_GALLERIES = {
  '01': [
    { img: step1, title: 'Initial Consultation' },
    { img: heroDoctorPatient, title: 'Personal Physician Discussion' },
    { img: generalConsult, title: 'Medical History Review' },
  ],
  '02': [
    { img: step2, title: 'Diagnostic Examination' },
    { img: echoImg, title: '2D Echocardiography' },
    { img: ecgImg, title: 'Digital ECG & Rhythm Analysis' },
  ],
  '03': [
    { img: step3, title: 'Clinical Treatment Session' },
    { img: monitorImg, title: 'Vitals & ICU Monitoring' },
    { img: diabetesImg, title: 'Personalized Lifestyle Protocol' },
  ],
  '04': [
    { img: step4, title: 'Full Patient Recovery' },
    { img: icuImg, title: 'Continuous Critical Support' },
    { img: prevCardioImg, title: 'Lifelong Preventive Guidance' },
  ],
}

export default function Process() {
  const { subtitle, steps = [] } = processData
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.12 })

  // Active expanded accordion step ('01' expanded initially, matching 2nd reference image)
  const [activeStepId, setActiveStepId] = useState('01')

  const toggleStep = (id) => {
    setActiveStepId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full bg-[#FAF7F2] py-16 sm:py-20 lg:pb-20 text-[#173653] overflow-hidden transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-[1300px] relative z-10">

        {/* ============================================================== */}
        {/* SECTION HEADER: Pill Badge + Playfair Serif Heading + Subtitle */}
        {/* ============================================================== */}
        <div className="text-center mx-auto mb-10 sm:mb-14 lg:mb-16">
          {/* Top Pill Badge matching website style */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE7DC] border border-[#E7DECE] text-xs sm:text-sm font-semibold text-[#795744] mb-4 sm:mb-6 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#A9C9E5]" />
            <span>Care Process</span>
          </motion.div>

          {/* Main Heading with Two-Tone Typography */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="font-serif text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] text-[#173653] font-normal tracking-tight leading-[1.15] max-w-4xl mx-auto mb-4 sm:mb-6"
            style={{ fontFamily: "'Playfair Display', Georgia, Cambria, serif" }}
          >
            Your Journey to{' '}
            <span className="text-[#795744]">Better Health.</span>
          </motion.h2>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
              className="mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#795744] font-normal leading-relaxed max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* ============================================================== */}
        {/* EXPANDABLE ACCORDION PROCESS LIST (Exact to 2nd Reference UI) */}
        {/* ============================================================== */}
        <div className="space-y-4 sm:space-y-5">
          {steps.map((step, idx) => {
            const Icon = STEP_ICONS[step.id] || CalendarCheck
            const isExpanded = activeStepId === step.id
            const gallery = STEP_GALLERIES[step.id] || []

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.1 * idx + 0.15,
                  ease: EASE,
                }}
                className={`w-full rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-[#F5EFEB] border-[#E7DECE] shadow-xs'
                    : 'bg-white hover:bg-[#F5EFEB]/50 border-[#E7DECE]'
                }`}
              >
                {/* Accordion Card Header Row (Clickable) */}
                <div
                  onClick={() => toggleStep(step.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      toggleStep(step.id)
                    }
                  }}
                  className={`w-full text-left p-6 sm:p-8 lg:p-9 cursor-pointer select-none transition-colors ${
                    isExpanded ? 'pb-4 sm:pb-6' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">

                    {/* Left: Step Icon + Title */}
                    <div className="flex items-center gap-3.5 sm:gap-4 shrink-0 min-w-0 md:min-w-[280px] lg:min-w-[340px]">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#EFE7DC] border border-[#E7DECE] flex items-center justify-center text-[#795744] shrink-0 shadow-2xs">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                      </div>
                      <h3
                        className="font-serif text-xl min-[420px]:text-2xl sm:text-[1.65rem] lg:text-[1.85rem] text-[#795744] font-normal leading-snug tracking-tight"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {step.title}
                      </h3>
                    </div>

                    {/* Middle: Description Text + "View Detail" Button (Exact to 2nd reference) */}
                    <div className="flex-1 min-w-0 md:px-4">
                      <p className="text-xs sm:text-sm lg:text-[15px] text-[#795744]/80 font-normal leading-relaxed">
                        {step.description}
                      </p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          openBookingModal()
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[#795744]/40 text-[#795744] hover:bg-[#795744] hover:text-white text-xs font-semibold tracking-wide transition-all duration-300 mt-2.5 cursor-pointer shadow-2xs"
                      >
                        <span>View Detail</span>
                      </button>
                    </div>

                    {/* Right: Expand / Collapse Button (Circle with Plus / Minus) */}
                    <div className="shrink-0 flex items-center justify-end self-end md:self-center">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#E7DECE] bg-white flex items-center justify-center text-[#795744] shadow-2xs transition-transform duration-300 hover:scale-105">
                        {isExpanded ? (
                          <Minus className="w-4 h-4 stroke-[2]" />
                        ) : (
                          <Plus className="w-4 h-4 stroke-[2]" />
                        )}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Expanded Content: 3-Photo Showcase Grid (Exact to 2nd reference image) */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key={`content-${step.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.42, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 lg:px-9 pb-6 sm:pb-8 lg:pb-9 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 pt-4 border-t border-[#E7DECE]/60">
                          {gallery.map((item, imgIdx) => (
                            <div
                              key={imgIdx}
                              className="relative h-48 min-[420px]:h-52 sm:h-56 md:h-60 rounded-2xl overflow-hidden shadow-xs border border-white/80 group"
                            >
                              <img
                                src={item.img}
                                alt={item.title}
                                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                              <div className="absolute bottom-3 left-3 right-3 z-10 text-white">
                                <span className="block text-xs sm:text-sm font-medium drop-shadow-sm line-clamp-1">
                                  {item.title}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
