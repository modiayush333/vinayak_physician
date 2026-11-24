import { motion } from 'framer-motion'
import heroFamily from '../assets/Images/hero-family.jpg'
import { heroData } from '../assets/Data/Hero'

const EASE = [0.22, 1, 0.36, 1]

// 1. Cute Baby Face Outline Icon (Matching exact reference image)
function BabyIcon({ className = 'w-6 h-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Head circle */}
      <circle cx="12" cy="14" r="7.5" />
      {/* Hair swirl loop on top */}
      <path d="M12 6.5c-1.2-2.2-.4-3.5 1-3.5 1.5 0 1.8 1.8.8 3.5" />
      {/* Left and Right Ears */}
      <path d="M4.5 12a2 2 0 0 0 0 4" />
      <path d="M19.5 12a2 2 0 0 1 0 4" />
      {/* Eyes */}
      <circle cx="9.5" cy="13.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="13.5" r="1" fill="currentColor" stroke="none" />
      {/* Smile */}
      <path d="M10 16.5c.8 1 3.2 1 4 0" />
    </svg>
  )
}

// 2. Youth / Adult Outline Icon with Wavy Hair & V-Neck (Matching exact reference image)
function PersonIcon({ className = 'w-6 h-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Head oval */}
      <circle cx="12" cy="7.5" r="3.8" />
      {/* Wavy hair bangs across forehead */}
      <path d="M8.5 7c1-1.2 2.3-.8 3.5-1.2 1.2-.4 2.5 0 3.5 1.2" />
      {/* V-neck collar */}
      <path d="M10.5 14.5l1.5 2 1.5-2" />
      {/* Shoulders and torso */}
      <path d="M6 21.5v-2.2c0-2.4 2.2-4.3 4.8-4.8" />
      <path d="M18 21.5v-2.2c0-2.4-2.2-4.3-4.8-4.8" />
      {/* Arm creases */}
      <path d="M8.5 19v2.5M15.5 19v2.5" />
    </svg>
  )
}

// 3. Senior / Elderly with Walking Cane Outline Icon (Matching exact reference image)
function SeniorIcon({ className = 'w-6 h-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Head tilted forward */}
      <circle cx="17" cy="6" r="2.6" fill="currentColor" stroke="none" />
      {/* Hunched curved back */}
      <path d="M15.5 9c-2.8-.2-5.5 1.2-5.5 5 0 2.5 1 3.5 2 4.5" />
      {/* Arm reaching to cane */}
      <path d="M13.5 11.5l3.8 3" />
      {/* Walking cane from hand to ground */}
      <path d="M17.5 14.5v7" />
      {/* Walking legs */}
      <path d="M12 18.5l2 3M10.5 17.5l-2.2 4" />
    </svg>
  )
}

export default function Hero() {
  const { title, description, cta, cards } = heroData

  return (
    <section
      id="hero"
      className="relative w-full bg-white pt-24 sm:pt-28 lg:pt-50 lg:h-screen overflow-hidden"
    >
      {/* Section Container with max-w-7xl, xl:px-12, and lg:px-0 removed as requested */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg-px-0">

        {/* ============================================================== */}
        {/* 1. TOP HEADER ROW (Matching Reference Image 2)                 */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end justify-between pb-8 sm:pb-10 lg:pb-12">

          {/* LEFT: Main Bold Headline with Blue Italic Accent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <h1 className="font-display text-[2.4rem] sm:text-[3.25rem] md:text-[3.75rem] lg:text-[3.5rem] xl:text-[4rem] font-bold tracking-tight text-[#111827] leading-[1.08]">
              <span className="block">Expert Medical Care</span>
              <span className="block">
                for a{' '}
                <span className="font-serif italic font-normal text-[#0284c7]">
                  {title.accent || 'Healthier'}
                </span>
              </span>
              <span className="block">Tomorrow.</span>
            </h1>
          </motion.div>

          {/* RIGHT: Description Text + Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: EASE }}
            className="flex flex-col items-start gap-5 lg:pl-4 xl:pl-8"
          >
            <p className="text-lg sm:text-2xl lg:text-xl text-gray-600 leading-relaxed max-w-xl">
              {description}
            </p>

            {/* Action Buttons: Solid Blue Pill + Circular Arrow Button */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={cta.href}
                className="inline-flex items-center justify-center rounded-full bg-[#0077b6] px-7 py-3 text-base sm:text-lg lg:text-base font-semibold text-white shadow-sm hover:bg-[#006299] hover:shadow-md transition-all duration-200 active:scale-95"
              >
                {cta.label}
              </a>
              <a
                href={cta.href}
                className="group flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#e0f2fe] text-[#0077b6] hover:bg-[#bae6fd] hover:text-[#005f92] transition-all duration-200 active:scale-95 shadow-sm"
                aria-label="About Doctor profile"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path d="M7 17L17 7M17 7H9M17 7V15" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>

        {/* ============================================================== */}
        {/* 2. DESKTOP INTERCONNECTED BENTO CARDS (Exact Match - No Overlap) */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
          className="hidden lg:block relative w-full aspect-[1000/260] select-none"
        >
          {/* Vector Canvas: Distinct 20px S-Curve Gap Between Left Card & Clippath (Zero Overlap) */}
          <svg
            viewBox="0 0 1000 260"
            className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_10px_30px_rgba(2,64,109,0.06)]"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Center family photo complementary clip path with exact 20px gap */}
              <clipPath id="center-img-clip">
                <path d="
                  M 239 0
                  H 626
                  a 24 24 0 0 1 24 24
                  V 236
                  a 24 24 0 0 1 -24 24
                  H 359
                  a 24 24 0 0 1 -24 -24
                  V 144
                  a 20 20 0 0 0 -20 -20
                  H 235
                  a 20 20 0 0 1 -20 -20
                  V 24
                  a 24 24 0 0 1 24 -24
                  Z
                " />
              </clipPath>

              {/* Right card soft base gradient */}
              <linearGradient id="rightCardGrad" x1="0" y1="0" x2="0.3" y2="1">
                <stop offset="0%" stopColor="#edf5ff" />
                <stop offset="100%" stopColor="#ddedfc" />
              </linearGradient>

              {/* Wave 1: lighter cyan/blue wave */}
              <linearGradient id="wave1Grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.75" />
              </linearGradient>

              {/* Wave 2: darker vivid blue shade wave (as requested) */}
              <linearGradient id="wave2Grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#84d5f8ff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#9dcae0ff" stopOpacity="0.95" />
              </linearGradient>
            </defs>

            {/* Base White Canvas ensuring crisp white gaps */}
            <rect width="1000" height="260" fill="#ffffff" />

            {/* 1. Left Card Background Shape with matching S-Curve & 20px gap */}
            <path
              d="
                M 24 0
                H 175
                a 20 20 0 0 1 20 20
                V 124
                a 20 20 0 0 0 20 20
                H 295
                a 20 20 0 0 1 20 20
                V 236
                a 24 24 0 0 1 -24 24
                H 24
                a 24 24 0 0 1 -24 -24
                V 24
                a 24 24 0 0 1 24 -24
                Z
              "
              fill="#e2f0fb"
            />

            {/* 2. Family Photo Clipped with exact complementary S-Curve (Zero Overlap) */}
            <g clipPath="url(#center-img-clip)">
              <image
                href={heroFamily}
                x="180"
                y="-8"
                width="480"
                height="270"
                preserveAspectRatio="xMidYMid slice"
              />
            </g>

            {/* 3. Right Card Base */}
            <rect x="670" y="0" width="330" height="260" rx="24" ry="24" fill="url(#rightCardGrad)" />

            {/* Wave 1 (Upper lighter wave) */}
            <path
              d="
                M 770 260
                C 840 195, 915 185, 1000 210
                L 1000 260
                Z
              "
              fill="url(#wave1Grad)"
            />

            {/* Wave 2 (Lower darker blue wave requested) */}
            <path
              d="
                M 835 260
                C 895 210, 945 205, 1000 225
                L 1000 260
                Z
              "
              fill="url(#wave2Grad)"
            />

            {/* Decorative Medical Plus Cross (+) in requested darker blue shade */}
            <path
              d="
                M 935 80
                h 14 a 8 8 0 0 1 8 8
                v 14 h 14 a 8 8 0 0 1 8 8
                v 16 a 8 8 0 0 1 -8 8
                h -14 v 14 a 8 8 0 0 1 -8 8
                h -16 a 8 8 0 0 1 -8 -8
                v -14 h -14 a 8 8 0 0 1 -8 -8
                v -16 a 8 8 0 0 1 8 -8
                h 14 v -14 a 8 8 0 0 1 8 -8
                z
              "
              fill="none"
              stroke="#0284c7"
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.65"
            />
          </svg>

          {/* Interactive HTML Overlay positioned with exact proportions matching reference image */}
          <div className="absolute inset-0 pointer-events-none">

            {/* --- LEFT CARD TOP CONTENT --- */}
            <div
              className="absolute"
              style={{ left: '2.5%', top: '8.5%', width: '16.5%' }}
            >
              <h3 className="font-display font-semibold text-[#292929] text-lg lg:text-3xl leading-[1.25]">
                Caring for<br />All Ages
              </h3>

              {/* 3 Icons Row with subtle dividers matching reference image */}
              <div className="grid grid-cols-3 divide-x divide-gray-300/60 items-center text-[#0f172a] max-w-[170px] pt-3.5">
                <div className="flex justify-center pr-2" title="Infants & Babies">
                  <BabyIcon className="w-6 h-6 xl:w-15 xl:h-15 text-gray-500" />
                </div>
                <div className="flex justify-center px-2" title="Youth & Adults">
                  <PersonIcon className="w-6 h-6 xl:w-15 xl:h-15 text-gray-500" />
                </div>
                <div className="flex justify-center pl-2" title="Seniors & Elderly">
                  <SeniorIcon className="w-6 h-6 xl:w-15 xl:h-15 text-gray-500" />
                </div>
              </div>
            </div>

            {/* --- LEFT CARD BOTTOM CONTENT (Positioned inside the shelf with zero overlap) --- */}
            <div
              className="absolute flex items-center justify-between"
              style={{ left: '2.5%', bottom: '7%', width: '27.5%' }}
            >
              <p className="text-xs xl:text-xl font-medium text-gray-600 leading-snug max-w-[115px]">
                Comprehensive<br />Family Care
              </p>
              <a
                href="#services"
                className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-xs lg:text-lg font-semibold text-gray-900 shadow-sm hover:shadow-md hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200 active:scale-95"
              >
                Our Services
              </a>
            </div>

            {/* --- RIGHT CARD CONTENT --- */}
            <div
              className="absolute flex flex-col justify-between"
              style={{ left: '69.5%', top: '8.5%', width: '28%', height: '83%' }}
            >
              <div>
                <h3 className="font-display font-bold text-[#0f172a] text-lg xl:text-3xl leading-[1.18]">
                  Preventive &<br />Personalized Care
                </h3>
                <p className="text-xs lg:text-lg text-gray-600 leading-relaxed mt-2.5 max-w-[240px]">
                  {cards?.preventive?.description ||
                    'From routine checkups to long-term wellness, we focus on care that fits your needs.'}
                </p>
              </div>

              <div>
                <a
                  href="#services"
                  className="pointer-events-auto inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-xs lg:text-lg font-semibold text-gray-900 shadow-sm hover:shadow-md hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200 active:scale-95"
                >
                  Learn More
                </a>
              </div>
            </div>

          </div>
        </motion.div>

        {/* ============================================================== */}
        {/* 3. RESPONSIVE MOBILE & TABLET CARDS (< 1024px)                  */}
        {/* ============================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
          className="block lg:hidden space-y-4 sm:space-y-6"
        >
          {/* Mobile Card 1: Caring for All Ages */}
          <div className="rounded-[24px] sm:rounded-[28px] bg-[#e2f0fb] p-6 sm:p-7 flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="font-display font-bold text-[#0f172a] text-xl sm:text-2xl leading-tight">
                Caring for All Ages
              </h3>

              {/* 3 Icons Row with dividers */}
              <div className="grid grid-cols-3 divide-x divide-gray-300/60 items-center text-gray-600 max-w-xs py-4 my-1">
                <div className="flex flex-col items-center gap-1 pr-2">
                  <BabyIcon className="w-7 h-7 sm:w-10 sm:h-10 text-gray-600" />
                  <span className="text-base sm:text-xl text-gray-500 font-medium">Infants</span>
                </div>
                <div className="flex flex-col items-center gap-1 px-2">
                  <PersonIcon className="w-7 h-7 sm:w-10 sm:h-10 text-gray-600" />
                  <span className="text-base sm:text-xl text-gray-500 font-medium">Adults</span>
                </div>
                <div className="flex flex-col items-center gap-1 pl-2">
                  <SeniorIcon className="w-7 h-7 sm:w-10 sm:h-10 text-gray-600" />
                  <span className="text-base sm:text-xl text-gray-500 font-medium">Seniors</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-sky-200/60">
              <span className="text-base sm:text-xl font-medium text-gray-600">
                Comprehensive Family Care
              </span>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2 text-base sm:text-xl font-semibold text-gray-900 shadow-sm hover:shadow hover:bg-gray-50 transition active:scale-95"
              >
                Our Services
              </a>
            </div>
          </div>

          {/* Mobile Card 2: Family Photo */}
          <div className="rounded-[24px] sm:rounded-[28px] overflow-hidden aspect-[16/10] sm:aspect-[16/9] shadow-sm relative">
            <img
              src={heroFamily}
              alt="Happy family outdoor care Vinayak Heart Medicare"
              className="w-full h-full object-cover object-[center_25%]"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Mobile Card 3: Preventive & Personalized Care */}
          <div className="rounded-[24px] sm:rounded-[28px] bg-gradient-to-br from-[#ebf4ff] to-[#ddedfc] p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between shadow-sm">
            {/* Subtle Cross Watermark in Darker Blue Shade */}
            <div className="absolute -right-6 top-3 opacity-30 pointer-events-none">
              <svg width="76" height="76" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="3">
                <path d="M12 4v16m-8-8h16" />
              </svg>
            </div>

            {/* Decorative Darker Wave at Bottom Right */}
            <div className="absolute -bottom-2 -right-2 w-32 h-20 opacity-30 pointer-events-none">
              <svg viewBox="0 0 100 60" fill="none" className="w-full h-full">
                <path d="M0 60 Q 50 10 100 30 L 100 60 Z" fill="#0284c7" />
              </svg>
            </div>

            <div className="relative z-10">
              <h3 className="font-display font-bold text-[#0f172a] text-xl sm:text-2xl leading-tight">
                Preventive & Personalized Care
              </h3>
              <p className="text-base sm:text-xl lg:text-sm text-gray-600 leading-relaxed mt-2.5 max-w-md">
                {cards?.preventive?.description ||
                  'From routine checkups to long-term wellness, we focus on care that fits your needs.'}
              </p>
            </div>

            <div className="pt-5 relative z-10">
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-base sm:text-lg lg:text-sm font-semibold text-gray-900 shadow-sm hover:shadow hover:bg-gray-50 transition active:scale-95"
              >
                Learn More
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

/* ==========================================================================
   ORIGINAL HERO SECTION (COMMENTED OUT AS REQUESTED - DO NOT REMOVE)
   ==========================================================================

import { motion } from 'framer-motion'
import images from '../assets/Images'
import { heroData } from '../assets/Data/Hero'
const EASE = [0.22, 1, 0.36, 1]

function ArrowIconOriginal({ diagonal = false }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d={diagonal ? 'M5 15 15 5M7 5h8v8' : 'M4 10h12M11 5l5 5-5 5'}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function OriginalHero() {
  const { eyebrow, title, description, cta, secondary } = heroData

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden pt-16 sm:pt-[72px]"
    >
      <svg
        viewBox="0 0 210 160"
        className="pointer-events-none absolute -left-27 -top-27 h-40 w-52 sm:-left-12 sm:-top-27 sm:h-98 sm:w-114"
        aria-hidden="true"
      >
        <path
          d="M14 15C51-18 121-4 162 19c42 23 64 65 37 97-26 31-71 10-111 19-40 8-78 45-101 13-24-32-4-100 27-133Z"
          fill="#dff3f6"
        />
      </svg>

      <div className="site-shell relative z-10 flex min-h-[calc(100svh-4rem)] flex-col pt-8 sm:min-h-[calc(100svh-4.5rem)] sm:pt-10 lg:pt-12">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-5 xl:grid-cols-[0.84fr_1.16fr]">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="relative z-20 mx-auto w-full max-w-2xl pb-2 text-center lg:mx-0 lg:pb-10 lg:text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="type-eyebrow mb-4 text-brand-teal"
            >
              {eyebrow}
            </motion.p>

            <h1 className="font-display text-[2.65rem] font-medium leading-[0.98] tracking-[-0.045em] text-[#051d39] sm:text-[3.5rem] md:text-[4.35rem] lg:text-[4.15rem] xl:text-[4.45rem]">
              <span className="block">{title.first}</span>
              <span className="block">
                {title.second}{' '}
                <em className="font-serif font-normal tracking-[-0.03em]">{title.accent}</em>
              </span>
              <em className="block font-serif font-normal tracking-[-0.03em]">{title.last}</em>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="type-desc mx-auto mt-5 max-w-2xl text-gray-700 text-lg md:text-xl sm:mt-6 lg:mx-0"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.4 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <a
                href={cta.href}
                className="type-btn inline-flex min-h-12 items-center gap-2 rounded-full bg-brand py-1.5 pl-2 pr-5 text-white shadow-[0_10px_28px_rgba(23,61,68,0.18)] transition hover:-translate-y-0.5 hover:bg-[#003871]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#173d44]">
                  <ArrowIconOriginal />
                </span>
                {cta.label}
              </a>
            </motion.div>
          </motion.div>

          <div className="relative mx-auto flex min-h-[430px] w-full max-w-[760px] items-end justify-center sm:min-h-[540px] lg:min-h-[calc(100svh-7.5rem)]">
            <div className="pointer-events-none absolute bottom-[0%] left-1/2 h-[86%] w-[90%] -translate-x-1/2">
              <motion.svg
                initial={{ opacity: 0, scale: 0.82, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.1, delay: 0.05, ease: EASE }}
                viewBox="0 0 600 600"
                className="h-full w-full"
                aria-hidden="true"
              >
                <circle cx="300" cy="300" r="270" fill="#d9f1f4" />
                <circle cx="300" cy="300" r="189" fill="#f2fafb" />
                <circle cx="300" cy="300" r="116" fill="#9bd5de" opacity="0.72" />
              </motion.svg>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE }}
              className="relative z-10 flex h-[430px] w-full items-end justify-center sm:h-[540px] lg:h-[calc(100svh-7.5rem)] lg:max-h-[760px]"
            >
              <motion.img
                src={images.drimage}
                alt="Expert physician providing heart and medical care at Vinayak Heart Medicare"
                className="h-full w-auto max-w-full object-contain object-bottom"
                draggable={false}
                decoding="async"
                fetchPriority="high"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
========================================================================== */
