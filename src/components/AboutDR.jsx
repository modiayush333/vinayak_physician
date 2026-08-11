import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { aboutDrData } from '../assets/Data/AboutDR'
import { EASE, fadeLeft, fadeRight, VIEWPORT } from '../lib/motion'

function RevealBlock({ children, delay = 0, className = '' }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
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
  } = aboutDrData
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()

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
        <motion.div
          className="relative order-2 mx-auto w-full max-w-md lg:order-1 lg:mx-0 lg:max-w-none lg:sticky lg:top-24 lg:self-start"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={VIEWPORT}
          variants={fadeLeft}
        >
          <div
            className="pointer-events-none absolute -left-8 -top-8 h-40 w-40 rounded-full bg-brand-teal/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-6 -right-6 h-36 w-36 rounded-full bg-brand/15 blur-3xl"
            aria-hidden="true"
          />

          <motion.div
            style={reduce ? undefined : { scale: imageScale, y: imageY }}
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
        </motion.div>

        <motion.div
          className="order-1 flex min-w-0 flex-col gap-8 pb-2 sm:gap-9 md:gap-10 lg:order-2 lg:gap-11"
          initial={reduce ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={fadeRight}
        >
          <RevealBlock>
            <p className="type-eyebrow text-brand-teal">About the Doctor</p>
            <h2 className="type-section-title mt-2 text-[#292929]">{name}</h2>
            <p className="type-desc-sm mt-3 max-w-xl text-lg text-gray-700 md:text-xl">{title}</p>
          </RevealBlock>

          <div className="space-y-4">
            {intro.map((paragraph, i) => (
              <RevealBlock key={paragraph.slice(0, 40)} delay={0.06 + i * 0.06}>
                <p className="type-desc text-lg text-gray-700 md:text-xl">{paragraph}</p>
              </RevealBlock>
            ))}
          </div>

          <RevealBlock delay={0.05}>
            <SectionHeading>{education.heading}</SectionHeading>
            <ul className="mt-4 space-y-3">
              {education.items.map((item) => (
                <li key={item.degree} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
                    aria-hidden="true"
                  />
                  <p className="type-desc-sm text-lg text-gray-700 md:text-xl">
                    <span className="font-semibold text-brand">{item.degree}</span>
                    {' — '}
                    {item.place}
                  </p>
                </li>
              ))}
            </ul>
          </RevealBlock>

          <RevealBlock delay={0.05}>
            <SectionHeading>{experience.heading}</SectionHeading>
            <ul className="mt-4 space-y-3">
              {experience.items.map((item) => (
                <li key={item.role} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
                    aria-hidden="true"
                  />
                  <p className="type-desc-sm text-lg text-gray-700 md:text-xl">
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
                  <p className="type-desc-sm text-lg font-semibold text-brand md:text-xl">
                    {experience.highlight}
                  </p>
                </li>
              ) : null}
            </ul>
          </RevealBlock>

          <RevealBlock delay={0.05}>
            <SectionHeading>{recognition.heading}</SectionHeading>
            <blockquote className="relative mt-4 rounded-xl bg-brand-teal-soft px-5 py-4 md:px-6 md:py-5">
              <span
                className="absolute -top-1 left-4 font-display text-[2.75rem] leading-none text-brand-orange md:left-5"
                aria-hidden="true"
              >
                “
              </span>
              <p className="type-desc pl-1 pt-4 text-lg text-brand-dark md:text-xl">{recognition.text}</p>
            </blockquote>
          </RevealBlock>
        </motion.div>
      </div>
    </section>
  )
}
