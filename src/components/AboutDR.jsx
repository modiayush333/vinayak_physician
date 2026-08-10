import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { aboutDrData } from '../assets/Data/AboutDR'

const EASE = [0.22, 1, 0.36, 1]

function RevealBlock({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.3, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ children }) {
  return <h3 className="type-subheading text-2xl text-brand">{children}</h3>
}

/**
 * AboutDR — left image sticky · right bio content scroll-reveal
 */
export default function AboutDR() {
  const {
    image,
    name,
    title,
    intro,
    education,
    experience,
    recognition,
    expertise,
  } = aboutDrData
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.04])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -12])

  return (
    <section
      ref={sectionRef}
      id="about-dr"
      className="relative overflow-x-clip bg-white py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28"
    >
      <div className="container mx-auto grid max-w-6xl items-start gap-8 px-4 sm:gap-10 sm:px-6 md:px-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)] lg:gap-14 lg:px-10 xl:gap-20 xl:px-12">
        {/* Image — after content on mobile/tablet, left on desktop */}
        <div className="relative order-2 mx-auto w-full max-w-md lg:order-1 lg:mx-0 lg:max-w-none lg:sticky lg:top-24 lg:self-start">
          <div
            className="pointer-events-none absolute -left-8 -top-8 h-40 w-40 rounded-full bg-brand-teal/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-6 -right-6 h-36 w-36 rounded-full bg-brand/15 blur-3xl"
            aria-hidden="true"
          />

          <motion.div
            style={{ scale: imageScale, y: imageY }}
            className="relative overflow-hidden rounded-[1.75rem] bg-brand-soft shadow-[0_24px_60px_rgba(40,80,120,0.14)] will-change-transform md:rounded-[2rem]"
          >
            <div className="aspect-[4/5] w-full lg:max-h-[calc(100dvh-7rem)]">
              <img
                src={image}
                alt={`${name}, ${title}`}
                className="h-full w-full object-cover object-top"
                draggable={false}
                loading="lazy"
                decoding="async"
                width={640}
                height={800}
              />
            </div>
          </motion.div>
        </div>

        {/* Content — first on mobile/tablet, right on desktop */}
        <div className="order-1 flex min-w-0 flex-col gap-8 pb-2 sm:gap-9 md:gap-10 lg:order-2 lg:gap-11">
          {/* Name + credentials */}
          <RevealBlock>
            <p className="type-eyebrow text-brand-teal">About the Doctor</p>
            <h2 className="type-section-title mt-2 text-[#292929]">{name}</h2>
            <p className="type-desc-sm mt-3 max-w-xl text-lg md:text-xl text-gray-700">{title}</p>
          </RevealBlock>

          {/* Intro */}
          <div className="space-y-4">
            {intro.map((paragraph, i) => (
              <RevealBlock key={paragraph.slice(0, 40)} delay={0.06 + i * 0.05}>
                <p className="type-desc text-lg md:text-xl text-gray-700">{paragraph}</p>
              </RevealBlock>
            ))}
          </div>

          {/* Education */}
          <RevealBlock delay={0.05}>
            <SectionHeading>{education.heading}</SectionHeading>
            <ul className="mt-4  space-y-3">
              {education.items.map((item) => (
                <li key={item.degree} className="flex  gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
                    aria-hidden="true"
                  />
                  <p className="type-desc-sm text-lg md:text-xl text-gray-700">
                    <span className="font-semibold text-brand">{item.degree}</span>
                    {' — '}
                    {item.place}
                  </p>
                </li>
              ))}
            </ul>
          </RevealBlock>

          {/* Experience */}
          <RevealBlock delay={0.05}>
            <SectionHeading>{experience.heading}</SectionHeading>
            <ul className="mt-4 space-y-3">
              {experience.items.map((item) => (
                <li key={item.role} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
                    aria-hidden="true"
                  />
                  <p className="type-desc-sm text-lg md:text-xl text-gray-700">
                    <span className="font-semibold text-brand">{item.role}</span>
                    {' — '}
                    {item.place}
                  </p>
                </li>
              ))}
              {experience.highlight ? (
                <li className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
                    aria-hidden="true"
                  />
                  <p className="type-desc-sm font-semibold text-lg md:text-xl text-brand">
                    {experience.highlight}
                  </p>
                </li>
              ) : null}
            </ul>
          </RevealBlock>

          {/* Recognition */}
          <RevealBlock delay={0.05}>
            <SectionHeading>{recognition.heading}</SectionHeading>
            <blockquote className="relative mt-4 rounded-xl bg-brand-teal-soft px-5 py-4 md:px-6 md:py-5">
              <span
                className="absolute -top-1 left-4 font-display text-[2.75rem] leading-none text-brand-orange md:left-5"
                aria-hidden="true"
              >
                “
              </span>
              <p className="type-desc pl-1 pt-4 text-lg md:text-xl text-brand-dark">{recognition.text}</p>
            </blockquote>
          </RevealBlock>

          {/* Expertise */}
          {/* <RevealBlock delay={0.05}>
            <SectionHeading>{expertise.heading}</SectionHeading>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3">
              {expertise.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal"
                    aria-hidden="true"
                  />
                  <p className="type-desc-sm text-brand-muted-dark">{item}</p>
                </li>
              ))}
            </ul>
          </RevealBlock> */}
        </div>
      </div>
    </section>
  )
}
