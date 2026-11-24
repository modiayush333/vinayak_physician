import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { footerData } from '../assets/Data/Footer'
import { ctaData } from '../assets/Data/CTA'
import BookingModal, { OPEN_BOOKING_EVENT } from './BookingModal'

const ease = [0.22, 1, 0.36, 1]

// Medical Icons for Address, Clock, and Phone
function IconPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
        stroke="#5EC4D4"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="#5EC4D4" strokeWidth="2" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="#5EC4D4" strokeWidth="2" />
      <path d="M12 8v5l3 2" stroke="#5EC4D4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconCall() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3h3l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 5 5a2 2 0 0 1 2-2Z"
        stroke="#5EC4D4"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Footer() {
  const { brand, hospital, navLinks, copyright } = footerData
  const { title: ctaTitle, description: ctaDesc, primary: ctaPrimary } = ctaData
  const footerRef = useRef(null)
  const inView = useInView(footerRef, { once: true, amount: 0.15 })
  const [bookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    const open = () => setBookingOpen(true)
    window.addEventListener(OPEN_BOOKING_EVENT, open)
    return () => window.removeEventListener(OPEN_BOOKING_EVENT, open)
  }, [])

  return (
    <>
      {/* Footer & CTA Section: Full viewport height (h-screen) on desktop view */}
      <footer
        ref={footerRef}
        id="contact"
        className="relative w-full h-auto lg:h-screen lg:max-h-screen flex flex-col justify-between overflow-hidden"
      >
        {/* ============================================================== */}
        {/* 1. TOP CTA SECTION (CURVED BLUE THEME BANNER)                  */}
        {/* ============================================================== */}
        <div className="relative w-full bg-gradient-to-br from-[#1b436c] via-[#204e7c] to-[#15385b] flex-1 flex flex-col justify-center py-12 sm:py-16 lg:py-0 text-white overflow-hidden">
          {/* Organic Flowing Ribbon Waves in Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-25">
            <svg
              className="w-full h-full"
              viewBox="0 0 1440 380"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M-80,180 C320,-60 620,420 1100,80 C1300,-70 1520,180 1600,80 L1600,380 L-80,380 Z"
                fill="rgba(255, 255, 255, 0.08)"
              />
              <path
                d="M0,80 C380,240 780,-10 1180,260 C1340,360 1480,130 1600,180"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="56"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Content Container: container mx-auto px-5 sm:px-10 lg:px-0 */}
          <div className="container mx-auto px-5 sm:px-10 lg:px-0 relative z-10 text-center">
            {/* CTA Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease }}
              className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-[2.85rem] font-extrabold tracking-tight text-white leading-[1.16] max-w-3xl mx-auto"
            >
              {ctaTitle || 'Take the First Step Towards Better Health'}
            </motion.h2>

            {/* CTA Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="mt-2.5 sm:mt-3 text-base sm:text-xl lg:text-[15px] xl:text-base text-white/85 max-w-xl mx-auto font-normal leading-relaxed"
            >
              {ctaDesc ||
                'Get expert care for heart health, diabetes, general medicine, and critical conditions with personalised guidance from an experienced physician.'}
            </motion.p>

            {/* CTA Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2, ease }}
              className="mt-5 sm:mt-6 flex justify-center"
            >
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="inline-flex items-center justify-center rounded-full bg-white text-[#1A354F] hover:bg-white/90 active:scale-95 px-7 sm:px-8 py-2.5 sm:py-3 text-base sm:text-xl lg:text-base font-bold transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                {ctaPrimary?.label || 'Book an Appointment'}
              </button>
            </motion.div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. CONCAVE SCOOP DIVIDER (MATCHING REFERENCE IMAGE CURVE)      */}
        {/* ============================================================== */}
        <div className="relative w-full overflow-hidden leading-none -mt-px select-none pointer-events-none bg-[#051d39] shrink-0">
          <svg
            viewBox="0 0 1440 90"
            fill="none"
            className="w-full h-8 sm:h-12 lg:h-14 block"
            preserveAspectRatio="none"
          >
            {/* Downward curving blue scoop */}
            <path d="M0,0 L1440,0 L1440,25 Q720,88 0,25 Z" fill="#1b436c" />
          </svg>
        </div>

        {/* ============================================================== */}
        {/* 3. MAIN DARK FOOTER (DEEP BLUE THEME + 3 COLUMNS)             */}
        {/* ============================================================== */}
        <div className="relative w-full bg-[#051d39] flex-1 flex flex-col justify-between pt-6 sm:pt-8 lg:pt-5 pb-5 sm:pb-6 text-white overflow-hidden">
          {/* Subtle Bottom Organic Wave Graphic */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden leading-none opacity-20">
            <svg
              viewBox="0 0 1440 80"
              fill="none"
              className="w-full h-10 sm:h-14 block"
              preserveAspectRatio="none"
            >
              <path
                d="M0,50 Q400,10 800,45 T1440,25 L1440,80 L0,80 Z"
                fill="rgba(255,255,255,0.06)"
              />
            </svg>
          </div>

          {/* Main Footer Container: container mx-auto px-5 sm:px-10 lg:px-0 */}
          <div className="container mx-auto px-5 sm:px-10 lg:px-0 relative z-10 flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 items-start my-auto">
              {/* -------------------------------------------------------- */}
              {/* COLUMN 1: Logo (Without bg), Description & Book Online   */}
              {/* -------------------------------------------------------- */}
              <div className="lg:col-span-5 flex flex-col items-start">
                <a href="#hero" className="inline-block group mb-2.5">
                  {/* Vinayak Logo directly rendered WITHOUT background image/container */}
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="h-20 sm:h-25 lg:h-20 w-auto object-contain brightness-0 invert opacity-95 transition-opacity group-hover:opacity-100"
                    loading="lazy"
                  />
                </a>

                <p className="text-white/75 text-base sm:text-xl lg:text-base lg:max-w-sm leading-relaxed mt-1 font-normal">
                  {brand.quote}
                </p>

                <div className="mt-4 sm:mt-5">
                  <button
                    type="button"
                    onClick={() => setBookingOpen(true)}
                    className="inline-flex items-center justify-center rounded-full bg-[#285078] hover:bg-[#1A354F] border border-white/20 active:scale-95 px-6 sm:px-7 py-2 sm:py-2.5 text-base sm:text-xl lg:text-base font-semibold text-white transition-all shadow-md cursor-pointer"
                  >
                    Book Online
                  </button>
                </div>
              </div>

              {/* -------------------------------------------------------- */}
              {/* COLUMN 2: EXPLORE (Vertical links)                       */}
              {/* -------------------------------------------------------- */}
              <div className="lg:col-span-3">
                <h4 className="text-lg sm:text-2xl lg:text-xl font-bold uppercase tracking-[0.18em] text-[#5EC4D4] mb-3">
                  EXPLORE
                </h4>
                <ul className="space-y-2 sm:space-y-2.5 text-base sm:text-xl lg:text-base text-white/80">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="hover:text-white transition-colors block py-0.5"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* -------------------------------------------------------- */}
              {/* COLUMN 3: HOSPITAL INFO (Address, Hours, Contact)        */}
              {/* -------------------------------------------------------- */}
              <div className="lg:col-span-4">
                <h4 className="text-lg sm:text-2xl lg:text-xl font-bold uppercase tracking-[0.18em] text-[#5EC4D4] mb-3">
                  HOSPITAL INFO
                </h4>

                <div className="space-y-3.5 sm:space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span className="mt-1 shrink-0">
                      <IconPin />
                    </span>
                    <div>
                      <p className="text-base sm:text-xl lg:text-lg font-bold text-white">Address</p>
                      <p className="text-base sm:text-xl lg:text-base text-white/75 mt-0.5 leading-relaxed max-w-xs">
                        {hospital.address}
                      </p>
                    </div>
                  </div>

                  {/* Opening hours */}
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span className="mt-1 shrink-0">
                      <IconClock />
                    </span>
                    <div>
                      <p className="text-base sm:text-xl lg:text-lg font-bold text-white">Opening hours</p>
                      <ul className="mt-1 space-y-0.5 text-base sm:text-xl lg:text-base text-white/75">
                        {hospital.openingHours.map((row) => (
                          <li key={row.label}>
                            <span className="text-white/90 font-medium">
                              {row.label}:
                            </span>{' '}
                            {row.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <span className="mt-0.5 shrink-0">
                      <IconCall />
                    </span>
                    <div>
                      <p className="text-base sm:text-xl lg:text-lg font-bold text-white">Contact</p>
                      <a
                        href={hospital.phoneHref}
                        className="text-base sm:text-xl lg:text-base text-white/75 hover:text-white transition-colors block mt-0.5"
                      >
                        {hospital.phone}
                      </a>
                      <a
                        href={hospital.emailHref}
                        className="text-base sm:text-xl lg:text-base text-white/75 hover:text-white transition-colors block mt-0.5 break-words"
                      >
                        {hospital.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Copyright Line */}
            <div className="mt-6 sm:mt-8 pt-4 border-t border-white/10 text-center relative z-10">
              <p className="text-base sm:text-xl lg:text-base text-white/50">
                {copyright}
              </p>
            </div>
          </div>
        </div>
      </footer>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}

/* ==========================================================================
   ORIGINAL FOOTER UI (COMMENTED OUT AS REQUESTED - DO NOT REMOVE)
   ==========================================================================

function OriginalIconPin() {
  return (
    <svg width="22" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z"
        stroke="#0888A0"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.5" stroke="#0888A0" strokeWidth="1.7" />
    </svg>
  )
}

function OriginalIconClock() {
  return (
    <svg width="22" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="#0888A0" strokeWidth="1.7" />
      <path d="M12 8v5l3 2" stroke="#0888A0" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function OriginalIconCall() {
  return (
    <svg width="22" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3h3l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 5 5a2 2 0 0 1 2-2Z"
        stroke="#0888A0"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function OriginalFooter() {
  const { brand, hospital, navLinks, bookOnline, copyright } = footerData
  const footerRef = useRef(null)
  const inView = useInView(footerRef, { once: true, amount: 0.2 })
  const [bookingOpen, setBookingOpen] = useState(false)

  useEffect(() => {
    const open = () => setBookingOpen(true)
    window.addEventListener(OPEN_BOOKING_EVENT, open)
    return () => window.removeEventListener(OPEN_BOOKING_EVENT, open)
  }, [])

  return (
    <>
      <footer ref={footerRef} id="contact" className=" pb-4 sm:pb-5 md:pb-6 lg:pb-8">
        <div className="container mx-auto px-3 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease }}
            className="
              overflow-hidden bg-white
              rounded-[1.25rem] px-5 pb-7 pt-8
              sm:rounded-[1.85rem] sm:px-8 sm:pb-8 sm:pt-9
              md:rounded-[2.25rem] md:px-10 md:pb-9 md:pt-10
              lg:rounded-[2.5rem] lg:px-12 lg:pb-10 lg:pt-12
            "
          >
            <div
              className="
                grid gap-10
                sm:gap-11
                md:grid-cols-2 md:gap-12
                lg:grid-cols-3 lg:gap-14
                xl:gap-16
              "
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.08, ease }}
                className="min-w-0"
              >
                <a href="#hero" className="inline-block">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo — physician and cardiology hospital`}
                    className="h-11 w-auto max-w-full object-contain sm:h-12 md:h-14 lg:h-16"
                    loading="lazy"
                    decoding="async"
                    width={180}
                    height={64}
                  />
                </a>

                <p className="type-desc mt-5 max-w-xl text-[17px] md:text-lg text-gray-700 sm:mt-6">
                  {brand.quote}
                </p>

                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="
                    type-btn mt-6 inline-flex items-center justify-center rounded-full bg-brand 
                    px-7 py-3 text-white text-[16px] md:text-md transition hover:bg-[#003871] cursor-pointer
                    sm:mt-7 sm:px-8 sm:py-3.5
                  "
                >
                  {bookOnline.label}
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.14, ease }}
                className="min-w-0 md:pl-24 lg:pl-8 xl:pl-32"
              >
                <p className="type-eyebrow text-[17px] md:text-lg text-brand-teal">Explore</p>
                <ul className="mt-4 flex flex-col gap-2.5 sm:mt-5 sm:gap-3">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="type-desc-sm font-medium text-gray-700 text-[15px] md:text-md transition hover:text-brand"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease }}
                className="min-w-0 md:col-span-2 lg:col-span-1"
              >
                <p className="type-eyebrow text-[17px] md:text-lg text-brand-teal">Hospital info</p>

                <div className="mt-4 space-y-5 sm:mt-5 sm:space-y-6">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0">
                      <IconPin />
                    </span>
                    <div className="min-w-0 ">
                      <p className="type-card-title  text-brand">Address</p>
                      <p className="type-desc-sm mt-1 text-[15px] md:text-md max-w-sm text-gray-700">
                        {hospital.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0">
                      <IconClock />
                    </span>
                    <div className="min-w-0">
                      <p className="type-card-title  text-brand">Opening hours</p>
                      <ul className="mt-1.5  space-y-1">
                        {hospital.openingHours.map((row) => (
                          <li key={row.label} className="type-desc-sm  text-gray-700 text-[15px] md:text-md">
                            <span className="font-medium  text-brand">{row.label}:</span>{' '}
                            {row.value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0">
                      <IconCall />
                    </span>
                    <div className="min-w-0">
                      <p className="type-card-title text-brand">Contact</p>
                      <a
                        href={hospital.phoneHref}
                        className="type-desc-sm mt-1 block text-[15px] md:text-md text-gray-700 transition hover:text-brand-teal"
                      >
                        {hospital.phone}
                      </a>
                      <a
                        href={hospital.emailHref}
                        className="type-desc-sm mt-0.5 block break-words text-[15px] md:text-md text-gray-700 transition hover:text-brand-teal"
                      >
                        {hospital.email}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="type-caption mt-10 border-t border-gray-400 pt-5 text-center text-gray-500 text-[15px] md:text-lg sm:mt-12 sm:pt-6"
            >
              {copyright}
            </motion.p>
          </motion.div>
        </div>
      </footer>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
========================================================================== */
