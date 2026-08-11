import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { footerData } from '../assets/Data/Footer'
import BookingModal, { OPEN_BOOKING_EVENT } from './BookingModal'

const ease = [0.22, 1, 0.36, 1]

function IconPin() {
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

function IconClock() {
  return (
    <svg width="22" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="#0888A0" strokeWidth="1.7" />
      <path d="M12 8v5l3 2" stroke="#0888A0" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function IconCall() {
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

/**
 * Footer — 3 columns:
 * 1) Logo + quote + Book Online
 * 2) Explore links (vertical)
 * 3) Hospital info
 */
export default function Footer() {
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
              {/* Col 1 — Logo + quote + Book Online */}
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

                <motion.button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    type-btn mt-6 inline-flex cursor-pointer items-center justify-center rounded-full bg-brand 
                    px-7 py-3 text-[16px] text-white transition hover:bg-[#003871] md:text-md
                    sm:mt-7 sm:px-8 sm:py-3.5
                  "
                >
                  {bookOnline.label}
                </motion.button>
              </motion.div>

              {/* Col 2 — Explore (vertical) */}
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

              {/* Col 3 — Hospital info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease }}
                className="min-w-0 md:col-span-2 lg:col-span-1"
              >
                <p className="type-eyebrow text-[17px] md:text-lg text-brand-teal">Hospital info</p>

                <div className="mt-4 space-y-5 sm:mt-5 sm:space-y-6">
                  <div className="flex items-start gap-3">
                    {/* <span className="mt-0.5 shrink-0">
                      <IconPin />
                    </span> */}
                    <div className="min-w-0 ">
                      <p className="type-card-title  text-brand">Address</p>
                      <p className="type-desc-sm mt-1 text-[15px] md:text-md max-w-sm text-gray-700">
                        {hospital.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    {/* <span className="mt-0.5 shrink-0">
                      <IconClock />
                    </span> */}
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
                    {/* <span className="mt-0.5 shrink-0">
                      <IconCall />
                    </span> */}
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
