import { useState, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Star,
  Sparkles,
  Calendar,
  MoveHorizontal,
} from 'lucide-react'
import { openBookingModal } from './BookingModal'

// Image assets
import step1Consultation from '../assets/Images/Process/step1.jpg'
import step4Recovery from '../assets/Images/Process/step4.jpg'
import patientDoctorHands from '../assets/Images/patient_doctor_hands.png'
import patientAmitAvatar from '../assets/Images/patient_amit_avatar.png'
import patientHeadlineAvatar from '../assets/Images/headline_patient_avatar.jpg'
import drRonakAvatar from '../assets/Images/drronak.webp'
import advancedTechImg from '../assets/Images/Facilites/ICU.webp'

// Images for Column 2 Card 2 (Tailored to your health - Continuous rotating wheel exact like Hero section)
import heartCareImg from '../assets/Images/Conditions/Heart Attack.webp'
import diabetesCareImg from '../assets/Images/Conditions/Diabetes.webp'
import ecgCareImg from '../assets/Images/Conditions/ECG.webp'
import generalConsultImg from '../assets/Images/Conditions/GeneralConsultaion.webp'
import bloodSugarCareImg from '../assets/Images/Conditions/Blood Sugar Management.webp'
import icuCareImg from '../assets/Images/Conditions/icu.webp'
import prevCardioImg from '../assets/Images/Conditions/Preventive Cardiology.webp'
import thyroidCareImg from '../assets/Images/Conditions/Thyroid Disorders.webp'

const ROTATING_CARE_SERVICES = [
  { id: 'cardiac', img: heartCareImg, label: 'Cardiac Care' },
  { id: 'diabetes', img: diabetesCareImg, label: 'Diabetes Care' },
  { id: 'ecg', img: ecgCareImg, label: 'ECG Diagnostics' },
  { id: 'sugar', img: bloodSugarCareImg, label: 'Sugar Control' },
  { id: 'consult', img: generalConsultImg, label: 'Consultation' },
  { id: 'icu', img: icuCareImg, label: 'Critical ICU' },
  { id: 'prev', img: prevCardioImg, label: 'Preventive Cardiology' },
  { id: 'thyroid', img: thyroidCareImg, label: 'Thyroid Care' },
]

const EASE = [0.22, 1, 0.36, 1]

// Real patient testimonials for the continuous vertical auto-scroll marquee
const TESTIMONIALS = [
  {
    id: 1,
    name: 'Amit Shah',
    role: 'Cardiac Recovery Patient',
    rating: 5,
    text: 'Dr. Ronak Modi is extremely knowledgeable and compassionate. His timely diagnosis and ICU care saved my father from a critical condition.',
    avatar: patientAmitAvatar,
  },
  {
    id: 2,
    name: 'Priya Patel',
    role: 'Diabetes Management',
    rating: 5,
    text: 'I was struggling with fluctuating sugar levels for years. Within 8 weeks of personalized medical care, my HbA1c is completely controlled.',
    avatar: patientHeadlineAvatar,
  },
  {
    id: 3,
    name: 'Rajesh Sharma',
    role: 'Hypertension & Heart Check',
    rating: 5,
    text: 'Professional, clean hospital with advanced ICU monitoring. Dr. Modi explained every step patiently and restored my confidence in recovery.',
    avatar: drRonakAvatar,
  },
  {
    id: 4,
    name: 'Meera Desai',
    role: 'Preventive Cardiology',
    rating: 5,
    text: 'Compassionate, thorough and attentive. The staff and doctor treat patients like family. Truly the best physician in Ahmedabad.',
    avatar: patientAmitAvatar,
  },
]

export default function WhyChooseUs() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.12 })

  // Interactive Before/After recovery slider state (0% to 100%)
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const sliderContainerRef = useRef(null)

  const handleSliderMove = useCallback((clientX) => {
    if (!sliderContainerRef.current) return
    const rect = sliderContainerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(10, Math.min(90, (x / rect.width) * 100))
    setSliderPos(percent)
  }, [])

  const handleMouseMove = (e) => {
    if (!isDragging) return
    handleSliderMove(e.clientX)
  }

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleSliderMove(e.touches[0].clientX)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative w-full bg-[#FAF7F2] py-16 sm:py-20 lg:pb-20 text-[#173653] overflow-hidden transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 2xl:px-0 relative z-10 max-w-[1440px]">
        {/* ============================================================== */}
        {/* SECTION HEADER: Pill Badge + Playfair Serif Two-Tone Heading   */}
        {/* ============================================================== */}
        <div className="text-center mx-auto mb-10 sm:mb-14 lg:mb-16">
          {/* Eyebrow Pill Badge (exact match to About Doctor) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE7DC] border border-[#E7DECE] text-xs sm:text-sm font-semibold text-[#795744] mb-4 sm:mb-6 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#A9C9E5]" />
            <span>Why Patients Choose Us</span>
          </motion.div>

          {/* Main Editorial Serif Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="font-serif text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] text-[#173653] font-normal tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6 sm:mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, Cambria, serif" }}
          >
            Care That Puts{' '}
            <span className="text-[#795744]">Your Health First.</span>
          </motion.h2>
        </div>

        {/* ============================================================== */}
        {/* BENTO GRID SHOWCASE (Exact 3-Column Layout from Reference)     */}
        {/* Middle column wider, 3rd column slightly narrower               */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.02fr_1.36fr_0.92fr] xl:grid-cols-[1.02fr_1.38fr_0.92fr] gap-5 lg:gap-6 items-stretch">

          {/* ============================================================ */}
          {/* COLUMN 1: Real Results Slider + Free Consultation Card       */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-5 lg:gap-6 h-full">

            {/* 1.1 BEFORE / AFTER RECOVERY SLIDER CARD */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: EASE }}
              ref={sliderContainerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative w-full h-[400px] sm:h-[420px] lg:h-[430px] rounded-3xl overflow-hidden bg-[#F2ECE3] border border-[#E7DECE] shadow-xs cursor-ew-resize select-none group shrink-0"
            >
              {/* "After" Layer (Base / Underneath Image - Smiling Recovered Patient) */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={step4Recovery}
                  alt="After Treatment - Healthy Patient Recovery"
                  className="w-full h-full object-cover object-center pointer-events-none"
                  loading="lazy"
                />
              </div>

              {/* "Before" Layer (Clipped Top Image - Initial Patient Consultation) */}
              <div
                className="absolute inset-0 h-full overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src={step1Consultation}
                  alt="Before Treatment - Initial Evaluation"
                  className="absolute inset-0 h-full object-cover object-center pointer-events-none"
                  style={{
                    width: sliderContainerRef.current
                      ? `${sliderContainerRef.current.clientWidth}px`
                      : '100%',
                    maxWidth: 'none',
                  }}
                  loading="lazy"
                />
              </div>

              {/* Subtle bottom shadow vignette for high text legibility */}
              <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none" />

              {/* Badges on Top Corners */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-[0.7rem] sm:text-xs font-semibold text-white border border-white/20 shadow-xs">
                  Before
                </span>
              </div>
              <div className="absolute top-4 right-4 z-20">
                <span className="px-3 py-1 rounded-full bg-white/75 backdrop-blur-md text-[0.7rem] sm:text-xs font-semibold text-[#173653] border border-white/80 shadow-xs">
                  After
                </span>
              </div>

              {/* Interactive Divider Line with Circular Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.35)] z-20 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-[#173653] shadow-lg flex items-center justify-center border border-[#E7DECE] cursor-ew-resize">
                  <MoveHorizontal className="w-4 h-4 text-[#173653]" />
                </div>
              </div>

              {/* Bottom Card Copy: Real results, real patients */}
              <div className="absolute bottom-5 left-5 right-5 z-20 text-white pointer-events-none">
                <h3
                  className="font-serif text-xl sm:text-2xl font-normal leading-tight drop-shadow-sm"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Real results, real patients
                </h3>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[0.68rem] sm:text-xs font-medium text-white border border-white/25">
                    <Calendar className="w-3 h-3" />
                    <span>12 Weeks</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[0.68rem] sm:text-xs font-medium text-white border border-white/25">
                    <Sparkles className="w-3 h-3" />
                    <span>Cardiac Rehabilitation</span>
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 1.2 COMPLIMENTARY EVALUATION CARD (Task 5: FREE badge and button are comfortably close, not far!) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
              className="relative p-6 sm:p-7 rounded-3xl bg-[#F5EFEB] border border-[#E7DECE] text-center flex flex-col items-center justify-center gap-3 sm:gap-3.5 shadow-xs flex-1 min-h-[220px]"
            >
              {/* Top FREE Tag Badge */}
              <span className="inline-block px-3.5 py-1 rounded-full bg-white border border-[#E7DECE] text-[0.68rem] sm:text-xs font-bold text-[#795744] uppercase tracking-wider shadow-xs">
                Free
              </span>

              {/* Subtitle & Title */}
              <div>
                <span className="block text-[0.72rem] sm:text-xs font-medium text-[#795744] uppercase tracking-widest mb-1">
                  Complimentary
                </span>
                <h3
                  className="font-serif text-xl sm:text-2xl text-[#173653] font-normal leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Cardiac &amp; Health Analysis
                </h3>
                <p className="text-xs sm:text-sm text-[#795744] mt-1 font-normal">
                  Expert physician evaluation at no cost
                </p>
              </div>

              {/* Book Now Button (Comfortably close to content) */}
              <button
                type="button"
                onClick={openBookingModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#795744] hover:bg-[#624433] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer mt-0.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Book now</span>
              </button>
            </motion.div>

          </div>

          {/* ============================================================ */}
          {/* COLUMN 2 (WIDER): Experience + Tailored to Health + Tech     */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-5 lg:gap-6 h-full">

            {/* 2.1 SEAMLESS CLIENT EXPERIENCE (Task 2: Hand image touches box edges from left to right, exact to 3rd ref image!) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.14, ease: EASE }}
              className="relative rounded-3xl bg-[#F5EFEB] border border-[#E7DECE] shadow-xs flex flex-col justify-between overflow-hidden min-h-[220px]"
            >
              <div className="p-6 sm:p-7 pb-1">
                <h3
                  className="font-serif text-2xl sm:text-[1.75rem] text-[#795744] font-normal leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Seamless client
                  <br />
                  experience
                </h3>
              </div>

              {/* Hand image touching edges of the box from left to right (exact to 3rd reference image!) */}
              <div className="relative w-full mt-auto overflow-hidden">
                <img
                  src={patientDoctorHands}
                  alt="Seamless client experience - Patient reaching to doctor"
                  className="w-full h-auto min-h-[115px] sm:min-h-[135px] max-h-[160px] object-cover sm:object-contain object-bottom pointer-events-none select-none transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* 2.2 TAILORED TO YOUR HEALTH (Continuous rotating wheel exact like Hero section - clockwise left-to-right, wider & lowered) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
              className="relative p-6 sm:p-7 rounded-3xl bg-[#F5EFEB] border border-[#E7DECE] shadow-xs flex flex-col justify-end items-center overflow-hidden min-h-[320px] sm:min-h-[350px] lg:min-h-[360px] group select-none"
            >
              {/* Continuous Rotating Wheel (Wider circle, shifted slightly lower, clockwise Left to Right) */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[35%] w-[460px] h-[460px] sm:w-[520px] sm:h-[520px] lg:w-[560px] lg:h-[560px] pointer-events-none z-10 origin-center"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.5) 60%, transparent 72%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, black 0%, black 50%, rgba(0,0,0,0.5) 60%, transparent 72%)',
                }}
              >
                <div
                  className="relative w-full h-full rounded-full animate-hero-spin group-hover:[animation-play-state:paused]"
                  style={{
                    transformOrigin: '50% 50%',
                    animationDuration: '28s',
                  }}
                >
                  {ROTATING_CARE_SERVICES.map((service, index) => {
                    const angle = index * (360 / ROTATING_CARE_SERVICES.length)

                    return (
                      <div
                        key={service.id}
                        className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center pointer-events-none"
                        style={{
                          transform: `rotate(${angle}deg)`,
                        }}
                      >
                        <div
                          className="absolute -translate-x-1/2 pointer-events-auto"
                          style={{
                            bottom: '155px',
                          }}
                        >
                          {/* Wrapper to offset the initial slot angle so thumbnail is upright */}
                          <div
                            style={{
                              transform: `rotate(-${angle}deg)`,
                            }}
                          >
                            {/* Counter-rotation to keep thumbnail 100% upright during continuous parent spin */}
                            <div
                              className="animate-orbit-counter group-hover:[animation-play-state:paused]"
                              style={{
                                animationDuration: '28s',
                              }}
                            >
                              <div className="w-14 h-14 min-[400px]:w-15 min-[400px]:h-15 sm:w-16 sm:h-16 lg:w-17 lg:h-17 rounded-2xl overflow-hidden shadow-md border-2 border-white bg-white hover:scale-110 transition-transform duration-300 cursor-pointer">
                                <img
                                  src={service.img}
                                  alt={service.label}
                                  title={service.label}
                                  className="w-full h-full object-cover object-center pointer-events-none"
                                  loading="lazy"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Center Content: Nestled inside the arch, clean & unobstructed */}
              <div className="relative z-20 text-center max-w-[260px] sm:max-w-[310px] mx-auto mt-auto pb-4 sm:pb-5 px-2 pointer-events-none">
                <h3
                  className="font-serif text-2xl sm:text-[1.8rem] text-[#795744] font-normal leading-snug tracking-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Tailored to your health
                </h3>
                <p className="text-xs sm:text-sm text-[#795744]/80 mt-1.5 font-normal leading-relaxed">
                  Customized treatment plans for every patient and condition
                </p>
              </div>
            </motion.div>

            {/* 2.3 ADVANCED TECHNOLOGY CARD */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.28, ease: EASE }}
              className="relative h-[180px] sm:h-[195px] rounded-3xl overflow-hidden bg-slate-900 border border-[#E7DECE] shadow-xs group"
            >
              <img
                src={advancedTechImg}
                alt="Advanced ICU and cardiac technology"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 z-10 text-white">
                <h3
                  className="font-serif text-xl sm:text-2xl font-normal leading-tight drop-shadow-sm"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Advanced technology
                </h3>
                <p className="text-xs text-white/80 mt-1 font-light">
                  Modern ICU &amp; high-precision diagnostics
                </p>
              </div>
            </motion.div>

          </div>

          {/* ============================================================ */}
          {/* COLUMN 3 (SLIGHTLY DECREASED WIDTH): Excellence + Reviews   */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-5 lg:gap-6 h-full">

            {/* 3.1 MEDICAL EXCELLENCE STAT CARD (Task 3: 2nd image on TOP of 1st and 3rd!) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.16, ease: EASE }}
              className="relative p-6 sm:p-7 rounded-3xl bg-[#F5EFEB] border border-[#E7DECE] shadow-xs flex items-center justify-between min-h-[220px] overflow-hidden"
            >
              {/* Left Stat & Badges */}
              <div className="z-10">
                <span
                  className="font-serif text-5xl sm:text-6xl text-[#795744] font-normal leading-none tracking-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  15+
                </span>
                <span className="block text-xs sm:text-sm text-[#795744] font-medium mt-2 mb-4 leading-snug">
                  Years of medical
                  <br />
                  excellence
                </span>
                <div className="flex flex-col gap-2">
                  <span className="inline-block px-3.5 py-1.5 rounded-full bg-white border border-[#E7DECE] text-[0.7rem] sm:text-xs font-semibold text-[#795744] shadow-2xs w-fit">
                    15,000+ Patients Treated
                  </span>
                  <span className="inline-block px-3.5 py-1.5 rounded-full bg-white border border-[#E7DECE] text-[0.7rem] sm:text-xs font-semibold text-[#795744] shadow-2xs w-fit">
                    24/7 Critical Care
                  </span>
                </div>
              </div>

              {/* Right: 3 OVERLAPPING Cascading Circular Avatars (2nd image ON TOP of 1st and 3rd!) */}
              <div className="relative flex flex-col items-center shrink-0 pr-1">
                {/* Circle 1 (Top) - z-10 */}
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 border-white shadow-md z-10 translate-x-1.5">
                  <img
                    src={patientHeadlineAvatar}
                    alt="Patient treatment"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Circle 2 (Middle - LARGEST & ON TOP OF BOTH 1st AND 3rd CIRCLE!) - z-30 */}
                <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full overflow-hidden border-2 border-white shadow-xl z-30 -mt-5 -translate-x-2.5">
                  <img
                    src={drRonakAvatar}
                    alt="Dr. Ronak Modi"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Circle 3 (Bottom) - under Circle 2 - z-10 */}
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 border-white shadow-md z-10 -mt-5 translate-x-1.5">
                  <img
                    src={patientAmitAvatar}
                    alt="Patient recovery"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </motion.div>

            {/* 3.2 AUTO-SCROLLING TESTIMONIAL FEED (Task 4: Centered Stars, 99%, and Subtitle!) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.24, ease: EASE }}
              className="relative p-6 sm:p-7 rounded-3xl bg-[#F5EFEB] border border-[#E7DECE] shadow-xs flex-1 flex flex-col justify-between overflow-hidden min-h-[380px]"
            >
              {/* Header: 5 Stars + 99% + Subtext (CENTERED as requested in Task 4!) */}
              <div className="mb-4 text-center flex flex-col items-center justify-center">
                <div className="flex items-center justify-center gap-1 text-[#795744] mb-1.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current text-[#795744]" />
                  ))}
                </div>
                <span
                  className="font-serif text-4xl sm:text-5xl text-[#173653] font-normal leading-none text-center"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  99%
                </span>
                <span className="block text-xs sm:text-sm text-[#795744] font-medium mt-1.5 text-center">
                  5,000+ Happy &amp; healthy patients
                </span>
              </div>

              {/* VERTICAL AUTO-SCROLLING TESTIMONIAL TICKER */}
              {/* Masked at top and bottom for smooth fade in/out */}
              <div
                className="relative h-[250px] sm:h-[350px] overflow-hidden group"
                style={{
                  maskImage:
                    'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                }}
              >
                {/* Continuous Infinite Upward Marquee */}
                <div className="flex flex-col gap-3 animate-scroll-up group-hover:[animation-play-state:paused]">
                  {/* Duplicated array for seamless 100% butter-smooth infinite loop */}
                  {[...TESTIMONIALS, ...TESTIMONIALS].map((review, idx) => (
                    <div
                      key={`${review.id}-${idx}`}
                      className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E7DECE]/80 shadow-2xs text-left"
                    >
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 text-[#795744] mb-1.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current text-[#795744]" />
                        ))}
                      </div>

                      {/* Review Quote */}
                      <p className="text-[0.72rem] sm:text-xs text-[#173653] leading-relaxed font-normal">
                        &ldquo;{review.text}&rdquo;
                      </p>

                      {/* Patient Info */}
                      <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#E7DECE]/50">
                        <div>
                          <span className="block text-xs font-semibold text-[#173653] leading-tight">
                            {review.name}
                          </span>
                          <span className="block text-[0.66rem] text-[#795744]">
                            {review.role}
                          </span>
                        </div>
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-7 h-7 rounded-full object-cover border border-[#E7DECE] shadow-2xs"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  )
}
