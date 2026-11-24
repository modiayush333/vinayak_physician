import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import images from '../assets/Images'
import { openBookingModal } from './BookingModal'

const NAV_LINKS = [
  { label: 'About Us', href: '#about-dr' },
  { label: 'Facilities', href: '#facilities' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  // { label: 'Contact Us', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false)
    }
    window.addEventListener('resize', closeOnDesktop)
    return () => window.removeEventListener('resize', closeOnDesktop)
  }, [])

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? ' bg-white/85 shadow-[0_10px_40px_rgba(23,61,68,0.1)] backdrop-blur-2xl backdrop-saturate-150 border-b border-gray-100/60'
            : ' bg-white/65 shadow-[0_4px_24px_rgba(23,61,68,0.06)] backdrop-blur-xl backdrop-saturate-150 border-b border-white/40'
        }`}
      >
        <div className="container mx-auto flex min-h-16 items-center justify-between gap-2 px-4 py-2.5 sm:min-h-[72px] sm:gap-3 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <a href="#hero" className="flex min-w-0 shrink items-center">
            <img
              src={images.logo}
              alt="Vinayak Heart Medicare logo — cardiologist and physician clinic"
              className="h-9 w-auto max-w-[220px] object-contain min-[380px]:h-10 sm:h-12 sm:max-w-none md:h-14"
              width={180}
              height={56}
              decoding="async"
              fetchPriority="high"
            />
          </a>

          {/* Desktop / Mac — full links from lg up */}
          <ul className="hidden items-center gap-0.5 lg:flex xl:gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="type-nav group relative px-2.5 py-2 text-[#294f56] transition-colors hover:text-brand-teal xl:px-4"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[1.5px] origin-left scale-x-0 rounded-full bg-brand-teal transition-transform duration-300 group-hover:scale-x-100 xl:left-4 xl:right-4" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              type="button"
              onClick={openBookingModal}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="type-btn hidden cursor-pointer rounded-full bg-brand px-5 py-2.5 text-white shadow-[0_6px_20px_rgba(23,61,68,0.18)] transition-colors hover:bg-[#003871] lg:inline-flex"
            >
              Book Online
            </motion.button>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[5px] rounded-full border border-[#173d44]/20 bg-white/60 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-[1.5px] w-5 bg-[#173d44]"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-[1.5px] w-5 bg-[#173d44]"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-[1.5px] w-5 bg-[#173d44]"
              />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-white/85 shadow-[0_20px_50px_rgba(23,61,68,0.12)] backdrop-blur-2xl backdrop-saturate-150 border-b border-gray-100/80 px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-4 sm:top-[72px] sm:px-6 lg:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="type-nav block min-h-12 rounded-xl px-4 py-3 font-semibold text-[#1A354F] transition-colors hover:bg-[#EAF7F9] hover:text-brand-teal active:bg-[#EAF7F9]"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                openBookingModal()
              }}
              className="type-btn mt-4 block w-full cursor-pointer rounded-full bg-brand-teal px-5 py-3 text-center uppercase tracking-[0.14em] text-white shadow-md transition-all hover:bg-brand-teal-dark active:scale-98"
            >
              Book Online
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
