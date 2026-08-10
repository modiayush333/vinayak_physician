import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { facilitiesData } from '../assets/Data/Facilites'

/**
 * Facilities — title + showcase video only
 */
export default function Facilities() {
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
