import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { openBookingModal } from './BookingModal'

// Clinical imagery
import featuredPatientImg from '../assets/Images/hero_doctor_patient.jpg'
import chestCareImg from '../assets/Images/Process/step2.jpg'
import diabetesImg from '../assets/Images/Conditions/Diabetes.webp'
import healthRecoveryImg from '../assets/Images/Process/step4.jpg'

const EASE = [0.22, 1, 0.36, 1]

const FEATURED_ARTICLE = {
  id: 'featured',
  image: featuredPatientImg,
  date: 'January 28, 2026',
  category: 'Heart & General Health',
  title: 'Appoitment & Consultation',
  excerpt:
    'Understanding proactive screenings, baseline ECG evaluations, and metabolic risk assessments to safeguard long-term vitality.',
}

const SIDE_ARTICLES = [
  {
    id: 'side-1',
    image: chestCareImg,
    date: 'January 28, 2026',
    category: 'Cardiac Care',
    title: 'Diagnosis & Evaluation',
  },
  {
    id: 'side-2',
    image: diabetesImg,
    date: 'January 28, 2026',
    category: 'Personalized Treatment Plant',
    title: 'Personalized Treatment Plant',
  },
  {
    id: 'side-3',
    image: healthRecoveryImg,
    date: 'January 26, 2026',
    category: 'Preventive Care',
    title: 'Follow-up & Ongoing Care',
  },
]

export default function HealthInsights() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.12 })

  return (
    <section
      ref={sectionRef}
      id="insights"
      className="relative w-full bg-[#FAF7F2] py-16 sm:py-20 lg:pb-20 text-[#173653] overflow-hidden transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 max-w-[1300px] relative z-10">

        {/* ============================================================== */}
        {/* SECTION HEADER: Pill Badge + Playfair Serif Title (Exact Ref)  */}
        {/* ============================================================== */}
        <div className="text-center mx-auto mb-10 sm:mb-14 lg:mb-16">
          {/* Top Pill Badge matching About Doctor Option 1 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE7DC] border border-[#E7DECE] text-xs sm:text-sm font-semibold text-[#795744] mb-4 sm:mb-6 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#A9C9E5]" />
            <span>Care Process</span>
          </motion.div>

          {/* Main Editorial Headline matching reference typography */}
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
            className="font-serif text-2xl min-[400px]:text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-[3.25rem] text-[#173653] font-normal tracking-tight leading-[1.15] max-w-4xl mx-auto mb-6 sm:mb-8"
            style={{ fontFamily: "'Playfair Display', Georgia, Cambria, serif" }}
          >
            Your Journey to{' '}
            <span className="text-[#795744]">Better Health</span>
          </motion.h2>
        </div>

        {/* ============================================================== */}
        {/* 2-COLUMN INSIGHTS LAYOUT (Exact to Reference Image 3)          */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_1fr] gap-6 lg:gap-8 items-stretch">

          {/* ------------------------------------------------------------ */}
          {/* LEFT COLUMN: Large Featured Article Card                     */}
          {/* ------------------------------------------------------------ */}
          <motion.article
            initial={{ opacity: 0, y: 25 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
            onClick={openBookingModal}
            className="group relative p-5 sm:p-6 lg:p-7 rounded-3xl bg-[#F5EFEB] border border-[#E7DECE] shadow-xs flex flex-col justify-between cursor-pointer hover:shadow-md hover:border-[#795744]/40 transition-all duration-300"
          >
            {/* Top Large Hero Image */}
            <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-xs bg-slate-100">
              <img
                src={FEATURED_ARTICLE.image}
                alt={FEATURED_ARTICLE.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

              {/* Floating Action Arrow */}
              <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#795744] shadow-xs group-hover:bg-[#795744] group-hover:text-white transition-all duration-300">
                <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
              </div>
            </div>

            {/* Bottom Meta & Title matching Reference Image */}
            <div className="mt-5 sm:mt-6">

              <h3
                className="font-serif text-xl sm:text-2xl lg:text-[1.7rem] text-[#795744] font-normal mt-2 leading-snug group-hover:text-[#173653] transition-colors"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {FEATURED_ARTICLE.title}
              </h3>
            </div>
          </motion.article>

          {/* ------------------------------------------------------------ */}
          {/* RIGHT COLUMN: 3 Stacked Horizontal Cards                     */}
          {/* ------------------------------------------------------------ */}
          <div className="flex flex-col gap-4 sm:gap-5 justify-between">
            {SIDE_ARTICLES.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.1 * idx + 0.2,
                  ease: EASE,
                }}
                onClick={openBookingModal}
                className="group relative p-4 sm:p-5 rounded-3xl bg-[#F5EFEB] border border-[#E7DECE] shadow-xs flex items-center gap-4 sm:gap-5 cursor-pointer hover:bg-white hover:shadow-md hover:border-[#795744]/40 transition-all duration-300 flex-1"
              >
                {/* Left Thumbnail Image */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-28 rounded-2xl overflow-hidden shadow-xs shrink-0 bg-slate-100">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                    loading="lazy"
                  />
                </div>

                {/* Right Meta & Title */}
                <div className="flex-1 min-w-0 pr-1">

                  <h4
                    className="font-serif text-xl sm:text-2xl lg:text-[1.7rem] text-[#795744] font-normal leading-snug line-clamp-2 group-hover:text-[#173653] transition-colors"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {article.title}
                  </h4>
                </div>
              </motion.article>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

