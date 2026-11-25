import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  HeartPulse,
  Star,
  Calendar,
  Stethoscope,
  ShieldCheck,
  Droplet,
  Pill,
  Hospital,
  Activity,
  CheckCircle2,
  Droplets,
  Dna,
  Plus,
} from 'lucide-react'
import heroDoctorPatient from '../assets/Images/hero_doctor_patient.jpg'
import patientAvatar from '../assets/Images/patient_amit_avatar.png'
import { openBookingModal } from './BookingModal'

const EASE = [0.22, 1, 0.36, 1]

// 12 Service spokes for a seamless 360-degree rotating dial
const RADIAL_SERVICES = [
  { name: 'Consultation', icon: Stethoscope },
  { name: 'Preventive Care', icon: ShieldCheck },
  { name: 'Heart Checkup', icon: HeartPulse },
  { name: 'Diabetes Care', icon: Droplet },
  { name: 'General Medicine', icon: Pill },
  { name: 'ICU Support', icon: Hospital },
  { name: 'ECG', icon: Activity },
  { name: 'Follow-up Care', icon: CheckCircle2 },
  { name: 'Blood Sugar', icon: Droplets },
  { name: 'Kidney Care', icon: Activity },
  { name: 'Thyroid Check', icon: Dna },
  { name: 'Emergency Care', icon: Plus },
]

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section
      id="hero"
      className="relative w-full bg-[#FAF7F2] pt-24 sm:pt-28 lg:pt-32 pb-0 sm:pb-0 lg:pb-0 text-[#173653] overflow-hidden transition-colors duration-300"
    >
      {/* Section Container: Full width with exact reference side margins (px-4 sm:px-6 lg:px-8 xl:px-10, max-w-[1600px]) */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-10 relative z-10">

        {/* ============================================================== */}
        {/* 1. TOP HEADER: LEFT BADGE + CENTER TITLE + RIGHT REVIEW CARD   */}
        {/* ============================================================== */}
        <div className="relative flex flex-col lg:flex-row items-center lg:items-center justify-between gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-14">

          {/* LEFT: "Trusted Physician" Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: EASE }}
            className="w-full lg:w-auto flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-[#E7DECE]/80 shadow-[0_4px_20px_rgba(23,54,83,0.06)] text-left hover:shadow-[0_8px_25px_rgba(23,54,83,0.09)] transition-shadow">
              <div className="w-10 h-10 rounded-full bg-[#EAF2F9] border border-[#A9C9E5]/40 flex items-center justify-center text-[#2B6CB0] shrink-0">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-xs sm:text-sm font-bold text-[#173653] leading-tight">
                  Trusted Physician
                </span>
                <span className="block text-[0.68rem] sm:text-xs text-[#795744] font-normal tracking-tight mt-0.5 whitespace-nowrap">
                  Cardiology • Diabetes • General Medicine
                </span>
              </div>
            </div>
          </motion.div>

          {/* CENTER: Main Serif Editorial Headline + Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
            className="text-center max-w-2xl lg:max-w-3xl mx-auto order-1 lg:order-2 flex-1"
          >
            <h1
              className="font-serif text-3xl min-[420px]:text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] text-[#173653] font-normal tracking-tight leading-[1.14]"
              style={{ fontFamily: "'Playfair Display', Georgia, Cambria, serif" }}
            >
              Trusted care for{' '}
              <span className="block sm:inline">your heart, health &amp;</span>{' '}
              <span className="block">well-being</span>
            </h1>

            <p className="mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#795744] font-normal leading-relaxed max-w-xl mx-auto">
              Expert physician care for cardiology, diabetes, general medicine, and critical care.
            </p>
          </motion.div>

          {/* RIGHT: Patient Review Card with 5 Stars & Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
            className="w-full lg:w-auto flex justify-center lg:justify-end order-3"
          >
            <div className="flex flex-col gap-1.5 p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E7DECE]/80 shadow-[0_4px_20px_rgba(23,54,83,0.06)] text-left max-w-[260px] sm:max-w-[280px] hover:shadow-[0_8px_25px_rgba(23,54,83,0.09)] transition-shadow">
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-[#2B6CB0]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[0.72rem] sm:text-xs text-[#173653] leading-relaxed font-normal">
                Dr. Ronak Modi is extremely knowledgeable, compassionate and truly cares about his patients.
              </p>

              {/* Patient Details */}
              <div className="flex items-center justify-between pt-1.5 mt-0.5 border-t border-[#E7DECE]/50">
                <div>
                  <span className="block text-xs font-semibold text-[#173653] leading-tight">
                    Amit Shah
                  </span>
                  <span className="block text-[0.68rem] text-[#795744]">
                    Patient
                  </span>
                </div>
                <img
                  src={patientAvatar}
                  alt="Amit Shah - Patient"
                  className="w-8 h-8 rounded-full object-cover border border-[#E7DECE] shadow-xs"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* ============================================================== */}
        {/* 2. HERO IMAGE CARD WITH AUTOMATIC ROTATING SERVICE DIAL        */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.22, ease: EASE }}
          className="relative w-full rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] overflow-hidden border-t border-l border-r border-[#E7DECE]/80 h-[480px] sm:h-[560px] md:h-[620px] lg:h-[680px] xl:h-[740px] bg-slate-900 select-none"
        >
          {/* Main Doctor & Patient Photo */}
          <img
            src={heroDoctorPatient}
            alt="Dr. Ronak Modi - Consultant Physician & Cardiologist with Patient"
            className="w-full h-full object-cover object-[center_20%] sm:object-[center_25%] select-none pointer-events-none"
            loading="eager"
            decoding="async"
          />

          {/* Subtle Ambient Vignette at the bottom for smooth contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          {/* ============================================================ */}
          {/* 2.1 ROTATING SERVICE FAN (Butter-smooth continuous GPU spin) */}
          {/* ============================================================ */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[840px] h-[840px] sm:w-[980px] sm:h-[980px] lg:w-[1100px] lg:h-[1100px] xl:w-[1180px] xl:h-[1180px] pointer-events-none z-10 scale-80 min-[420px]:scale-90 sm:scale-95 lg:scale-100 origin-center"
            style={{
              maskImage: 'linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.7) 46%, transparent 50%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 40%, rgba(0,0,0,0.7) 46%, transparent 50%)',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
          >
            <div
              className="relative w-full h-full rounded-full animate-hero-spin"
              style={{
                transformOrigin: '50% 50%',
                animationPlayState: isHovered ? 'paused' : 'running',
              }}
            >
              {RADIAL_SERVICES.map((service, index) => {
                const angle = index * (360 / RADIAL_SERVICES.length)
                const Icon = service.icon

                return (
                  <div
                    key={service.name}
                    className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center pointer-events-none"
                    style={{
                      transform: `rotate(${angle}deg)`,
                    }}
                  >
                    {/* Radial Glassmorphism Pill Capsule (Comfortable Fit, No Text Overflow, Butter Smooth Entry/Exit) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        openBookingModal()
                      }}
                      title={`Book ${service.name} Consultation`}
                      className="absolute flex flex-col items-center justify-between py-3.5 px-2 rounded-full backdrop-blur-md bg-white/55 hover:bg-white border border-white/55 shadow-[0_8px_25px_rgba(23,54,83,0.14)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto group overflow-hidden"
                      style={{
                        bottom: '150px',
                        width: '66px',
                        height: '220px',
                        transform: 'translateX(-50%)',
                      }}
                    >
                      {/* Outer Tip: Icon inside little coffee transparent circle with blue icon */}
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#795744]/20 border border-[#795744]/30 flex items-center justify-center shrink-0 group-hover:bg-[#795744]/30 transition-colors shadow-2xs">
                        <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[#173653] stroke-[2] group-hover:scale-110 transition-transform" />
                      </div>

                      {/* Text along capsule length in rich blue font, perfectly fitted with zero overflow */}
                      <span
                        className="text-xs sm:text-[1rem] font-bold tracking-tight text-[#173653] select-none whitespace-nowrap drop-shadow-xs group-hover:text-[#11273C] transition-colors leading-none"
                        style={{
                          writingMode: 'vertical-rl',
                          transform: 'rotate(180deg)',
                          maxHeight: '145px',
                        }}
                      >
                        {service.name}
                      </span>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ============================================================ */}
          {/* 2.2 INVERTED CUTOUT ARCH (Seamless Inverted Arch in #FAF7F2) */}
          {/* ============================================================ */}
          {/* Bottom Card Border Left Wing (meets the arch seamlessly) */}
          <div className="absolute bottom-0 left-0 right-[calc(50%+160px)] min-[420px]:right-[calc(50%+180px)] sm:right-[calc(50%+220px)] lg:right-[calc(50%+255px)] xl:right-[calc(50%+275px)] border-b border-[#E7DECE]/80 pointer-events-none z-20" />

          {/* Bottom Card Border Right Wing (meets the arch seamlessly) */}
          <div className="absolute bottom-0 right-0 left-[calc(50%+160px)] min-[420px]:left-[calc(50%+180px)] sm:left-[calc(50%+220px)] lg:left-[calc(50%+255px)] xl:left-[calc(50%+275px)] border-b border-[#E7DECE]/80 pointer-events-none z-20" />

          {/* Smooth Continuous Arch Cutout in #FAF7F2 (Seamless blend into page background) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[340px] min-[420px]:w-[380px] sm:w-[450px] lg:w-[520px] xl:w-[560px] h-[88px] sm:h-[102px] lg:h-[118px] xl:h-[128px] z-20 pointer-events-none select-none">
            <svg
              viewBox="0 0 500 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-[#FAF7F2]"
              preserveAspectRatio="none"
            >
              {/* Seamless arch cutout fill matching #FAF7F2 section background */}
              <path
                d="M 0,120 C 100,120 160,14 250,14 C 340,14 400,120 500,120 L 500,126 L 0,126 Z"
                fill="currentColor"
              />
              {/* Continuous delicate stroke along the arch curve */}
              <path
                d="M 0,120 C 100,120 160,14 250,14 C 340,14 400,120 500,120"
                fill="none"
                stroke="rgba(231,222,206,0.9)"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* ============================================================ */}
          {/* 2.3 "BOOK CONSULTATION" BUTTON INSIDE CUTOUT ARCH            */}
          {/* ============================================================ */}
          <button
            type="button"
            onClick={openBookingModal}
            aria-label="Book doctor consultation"
            className="absolute bottom-3.5 sm:bottom-4.5 lg:bottom-6 xl:bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center justify-center cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EAF2F9] border border-[#A9C9E5]/50 flex items-center justify-center text-[#173653] group-hover:bg-[#173653] group-hover:text-white transition-all shadow-xs mb-1">
              <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2]" />
            </div>
            <span className="text-xs sm:text-sm lg:text-base font-bold text-[#173653] group-hover:text-[#795744] tracking-wide transition-colors whitespace-nowrap">
              Book Consultation
            </span>
          </button>
        </motion.div>

      </div>
    </section>
  )
}

/* ==========================================================================
   PREVIOUS HERO IMPLEMENTATION (COMMENTED OUT - PRESERVED AS REQUESTED)
   ==========================================================================

import { motion } from 'framer-motion'
import heroFamily from '../assets/Images/hero-family.jpg'
import { heroData } from '../assets/Data/Hero'

const EASE = [0.22, 1, 0.36, 1]

function BabyIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="14" r="7.5" />
      <path d="M12 6.5c-1.2-2.2-.4-3.5 1-3.5 1.5 0 1.8 1.8.8 3.5" />
      <path d="M4.5 12a2 2 0 0 0 0 4" />
      <path d="M19.5 12a2 2 0 0 1 0 4" />
      <circle cx="9.5" cy="13.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="13.5" r="1" fill="currentColor" stroke="none" />
      <path d="M10 16.5c.8 1 3.2 1 4 0" />
    </svg>
  )
}

function PersonIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="7.5" r="3.8" />
      <path d="M8.5 7c1-1.2 2.3-.8 3.5-1.2 1.2-.4 2.5 0 3.5 1.2" />
      <path d="M10.5 14.5l1.5 2 1.5-2" />
      <path d="M6 21.5v-2.2c0-2.4 2.2-4.3 4.8-4.8" />
      <path d="M18 21.5v-2.2c0-2.4-2.2-4.3-4.8-4.8" />
      <path d="M8.5 19v2.5M15.5 19v2.5" />
    </svg>
  )
}

function SeniorIcon({ className = 'w-6 h-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="17" cy="6" r="2.6" fill="currentColor" stroke="none" />
      <path d="M15.5 9c-2.8-.2-5.5 1.2-5.5 5 0 2.5 1 3.5 2 4.5" />
      <path d="M13.5 11.5l3.8 3" />
      <path d="M17.5 14.5v7" />
      <path d="M12 18.5l2 3M10.5 17.5l-2.2 4" />
    </svg>
  )
}

export function PreviousHero() {
  const { title, description, cta, cards } = heroData

  return (
    <section id="hero-prev" className="relative w-full bg-white pt-24 sm:pt-28 lg:pt-50 lg:h-screen overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg-px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end justify-between pb-8 sm:pb-10 lg:pb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: EASE }}>
            <h1 className="font-display text-[2.4rem] sm:text-[3.25rem] md:text-[3.75rem] lg:text-[3.5rem] xl:text-[4rem] font-bold tracking-tight text-[#173653] leading-[1.08]">
              <span className="block">Expert Medical Care</span>
              <span className="block">
                for a <span className="font-serif italic font-normal text-[#795744]">{title.accent || 'Healthier'}</span>
              </span>
              <span className="block">Tomorrow.</span>
            </h1>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.15, ease: EASE }} className="flex flex-col items-start gap-5 lg:pl-4 xl:pl-8">
            <p className="text-lg sm:text-2xl lg:text-xl text-[#795744] leading-relaxed max-w-xl">
              {description}
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href={cta.href} className="inline-flex items-center justify-center rounded-full bg-[#173653] px-7 py-3 text-base sm:text-lg lg:text-base font-semibold text-white shadow-sm hover:bg-[#11273C] transition-all">
                {cta.label}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
========================================================================== */
