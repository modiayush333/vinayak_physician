import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { footerData } from '../assets/Data/Footer'

const NAVY = '#173653'
const MUTED = '#795744'
const BROWN = '#795744'
const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

function IconCalendar({ color = BROWN }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke={color} strokeWidth="1.6" />
      <path d="M3 10h18M8 3v4M16 3v4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function IconPhone({ color = BROWN }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3h3l2 5-2 1a12 12 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 5 5a2 2 0 0 1 2-2Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3 5 6v5c0 4.5 3 8 7 9 4-1 7-4.5 7-9V6l-7-3Z"
        stroke={BROWN}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="m9 12 2 2 4-4" stroke={BROWN} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconClock({ color = MUTED }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.6" />
      <path d="M12 8v5l3 2" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke={MUTED} strokeWidth="1.6" />
      <path d="M5 19c1.5-3.5 4-5 7-5s5.5 1.5 7 5" stroke={MUTED} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function IconMsg() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 6h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"
        stroke={MUTED}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StepIcon({ type }) {
  if (type === 'phone') return <IconPhone />
  if (type === 'shield') return <IconShield />
  return <IconCalendar />
}

const fieldClass = `
  w-full rounded-xl border border-[#E7DECE] bg-[#FAF7F2]
  font-body text-[14px] text-[#173653] outline-none
  transition focus:border-[#795744]/60 focus:bg-white
  placeholder:text-[#795744]/45
`

const fieldErrorClass = 'border-red-400 focus:border-red-400'

const bookingSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, 'Only letters are allowed (no numbers or special characters)'),
  age: Yup.number()
    .transform((value, originalValue) =>
      originalValue === '' || originalValue === null || originalValue === undefined ? undefined : value,
    )
    .typeError('Age is required')
    .required('Age is required')
    .integer('Age must be a whole number')
    .min(1, 'Age must be at least 1')
    .max(120, 'Age must be 120 or less'),
  gender: Yup.string().trim().required('Please select gender'),
  phone: Yup.string()
    .trim()
    .required('Phone number is required')
    .matches(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number (digits only)'),
  date: Yup.mixed()
    .nullable()
    .test(
      'required-date',
      'Please select preferred date',
      (value) => value instanceof Date && !Number.isNaN(value.getTime()),
    ),
  time: Yup.string().trim().required('Please select preferred time'),
  service: Yup.string().trim().required('Please select a service'),
  message: Yup.string().trim().max(500, 'Message must be under 500 characters'),
})

const bookingDefaultValues = {
  name: '',
  age: '',
  gender: '',
  phone: '',
  date: null,
  time: '',
  service: '',
  message: '',
}

function FieldError({ message }) {
  if (!message) return null
  return <p className="mt-1.5 font-body text-[12px] text-red-500">{message}</p>
}

function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function sameDay(a, b) {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function formatDateLabel(date) {
  if (!date) return ''
  return `${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}, ${date.getFullYear()}`
}

function formatDateValue(date) {
  if (!date) return ''
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function buildTimeSlots() {
  const slots = []
  for (let minutes = 9 * 60; minutes <= 20 * 60; minutes += 30) {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    slots.push({ hour: h, minute: m, value: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` })
  }
  return slots
}

const TIME_SLOTS = buildTimeSlots()

function formatSlotLabel(slot, mode12) {
  if (!mode12) return slot.value
  const period = slot.hour >= 12 ? 'pm' : 'am'
  const h12 = slot.hour % 12 || 12
  return `${h12}:${String(slot.minute).padStart(2, '0')}${period}`
}

function useOutsideClose(refs, open, onClose) {
  useEffect(() => {
    if (!open) return undefined
    const onPointer = (e) => {
      const hit = refs.some((r) => r.current && r.current.contains(e.target))
      if (!hit) onClose()
    }
    document.addEventListener('mousedown', onPointer)
    return () => document.removeEventListener('mousedown', onPointer)
  }, [open, onClose, refs])
}

/** Fixed popover coords so panels are never clipped by the modal overflow */
function usePopoverPosition(anchorRef, open, panelHeight = 320) {
  const [style, setStyle] = useState({ top: 0, left: 0, width: 280, maxHeight: panelHeight })

  useLayoutEffect(() => {
    if (!open || !anchorRef.current) return undefined

    const update = () => {
      const rect = anchorRef.current.getBoundingClientRect()
      const gap = 8
      const width = Math.min(Math.max(rect.width, 240), 320)
      const spaceBelow = window.innerHeight - rect.bottom - gap
      const spaceAbove = rect.top - gap
      const placeBelow = spaceBelow >= 260 || spaceBelow >= spaceAbove

      let top
      let maxHeight
      if (placeBelow) {
        top = rect.bottom + gap
        maxHeight = Math.min(panelHeight, Math.max(180, spaceBelow - 8))
      } else {
        maxHeight = Math.min(panelHeight, Math.max(180, spaceAbove - 8))
        top = Math.max(8, rect.top - gap - maxHeight)
      }

      let left = rect.left
      if (left + width > window.innerWidth - 8) left = window.innerWidth - width - 8
      if (left < 8) left = 8

      setStyle({ top, left, width, maxHeight })
    }

    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [open, anchorRef, panelHeight])

  return style
}

function DatePickerField({ value, onChange, error }) {
  const today = useMemo(() => startOfDay(new Date()), [])
  const [open, setOpen] = useState(false)
  const [view, setView] = useState(() => value || today)
  const rootRef = useRef(null)
  const panelRef = useRef(null)
  const buttonRef = useRef(null)
  const refs = useMemo(() => [rootRef, panelRef], [])
  useOutsideClose(refs, open, () => setOpen(false))
  const pos = usePopoverPosition(buttonRef, open, 340)

  useEffect(() => {
    if (open) setView(value || today)
  }, [open, value, today])

  const cells = useMemo(() => {
    const year = view.getFullYear()
    const month = view.getMonth()
    const firstDow = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const prevDays = new Date(year, month, 0).getDate()
    const list = []

    for (let i = firstDow - 1; i >= 0; i -= 1) {
      list.push({ date: new Date(year, month - 1, prevDays - i), outside: true })
    }
    for (let d = 1; d <= daysInMonth; d += 1) {
      list.push({ date: new Date(year, month, d), outside: false })
    }
    let next = 1
    while (list.length < 42) {
      list.push({ date: new Date(year, month + 1, next), outside: true })
      next += 1
    }
    return list
  }, [view])

  return (
    <div ref={rootRef} className="relative">
      <p className="mb-1.5 font-body text-[14px] font-medium text-gray-600 sm:text-[15px]">Preferred Date</p>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${fieldClass} ${error ? fieldErrorClass : ''} relative flex w-full cursor-pointer items-center justify-between py-3.5 pl-4 pr-11 text-left`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={Boolean(error)}
      >
        <span className={value ? 'text-[#173653]' : 'text-[#795744]/50'}>
          {value ? formatDateLabel(value) : 'Select preferred date'}
        </span>
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
          <IconCalendar color={MUTED} />
        </span>
      </button>
      <input type="hidden" name="date" value={formatDateValue(value)} />
      <FieldError message={error} />

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={panelRef}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.18 }}
                style={{
                  position: 'fixed',
                  top: pos.top,
                  left: pos.left,
                  width: pos.width,
                  maxHeight: pos.maxHeight,
                  zIndex: 200,
                  overflowY: 'auto',
                }}
                className="rounded-2xl border border-[#E7DECE] bg-white p-4 shadow-[0_18px_48px_rgba(23,54,83,0.14)]"
                role="dialog"
                aria-label="Choose preferred date"
              >
                <div className="mb-3 flex items-center justify-between">
                  <p className="font-body text-[15px] font-semibold text-[#173653]">
                    {MONTHS[view.getMonth()]} {view.getFullYear()}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Previous month"
                      onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#795744] transition hover:bg-[#FAF7F2]"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      aria-label="Next month"
                      onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#795744] transition hover:bg-[#FAF7F2]"
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div className="mb-2 grid grid-cols-7 gap-1">
                  {WEEKDAYS.map((day) => (
                    <span
                      key={day}
                      className="py-1 text-center font-body text-[10px] font-semibold tracking-wide text-[#795744]/60"
                    >
                      {day}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {cells.map(({ date, outside }) => {
                    const disabled = startOfDay(date) < today
                    const selected = sameDay(date, value)
                    return (
                      <button
                        key={date.toISOString()}
                        type="button"
                        disabled={disabled}
                        onClick={() => {
                          onChange(startOfDay(date))
                          setOpen(false)
                        }}
                        className={`
                          relative flex h-11 min-h-11 cursor-pointer items-center justify-center rounded-full font-body text-[13px]
                          transition
                          ${outside ? 'text-[#795744]/35' : 'text-[#173653]'}
                          ${disabled ? 'cursor-not-allowed opacity-35' : 'hover:bg-[#F5EFEB]'}
                          ${selected ? 'bg-[#795744] font-semibold text-white hover:bg-[#634534] shadow-xs' : ''}
                        `}
                      >
                        {date.getDate()}
                        {selected ? (
                          <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/90" />
                        ) : null}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  )
}

function GenderPickerField({ value, onChange, error }) {
  const options = ['Male', 'Female', 'Other']
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const panelRef = useRef(null)
  const buttonRef = useRef(null)
  const refs = useMemo(() => [rootRef, panelRef], [])
  useOutsideClose(refs, open, () => setOpen(false))
  const pos = usePopoverPosition(buttonRef, open, 220)

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${fieldClass} ${error ? fieldErrorClass : ''} relative flex w-full cursor-pointer items-center justify-between rounded-xl py-3.5 pl-4 pr-10 text-left`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={Boolean(error)}
      >
        <span className={value ? 'text-[#173653]' : 'text-[#795744]/50'}>{value || 'Gender'}</span>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9AA3AD]">
          ▾
        </span>
      </button>
      <input type="hidden" name="gender" value={value || ''} />
      <FieldError message={error} />

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={panelRef}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.18 }}
                style={{
                  position: 'fixed',
                  top: pos.top,
                  left: pos.left,
                  width: pos.width,
                  maxHeight: pos.maxHeight,
                  zIndex: 200,
                }}
                className="overflow-hidden rounded-2xl border border-[#E7DECE] bg-white p-3 shadow-[0_18px_48px_rgba(23,54,83,0.14)]"
                role="listbox"
                aria-label="Choose gender"
              >
                <div className="space-y-2">
                  {options.map((option) => {
                    const active = value === option
                    return (
                      <button
                        key={option}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => {
                          onChange(option)
                          setOpen(false)
                        }}
                        className={`
                          flex w-full cursor-pointer items-center justify-center rounded-full border px-3 py-2.5
                          font-body text-[14px] font-medium transition
                          ${
                            active
                              ? 'border-[#795744] bg-[#795744] text-white shadow-xs'
                              : 'border-[#E7DECE] bg-[#FAF7F2] text-[#173653] hover:border-[#795744]/40 hover:bg-[#F5EFEB]'
                          }
                        `}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  )
}

function ServicePickerField({ value, onChange, options = [], error }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const panelRef = useRef(null)
  const buttonRef = useRef(null)
  const refs = useMemo(() => [rootRef, panelRef], [])
  useOutsideClose(refs, open, () => setOpen(false))
  const pos = usePopoverPosition(buttonRef, open, 320)

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${fieldClass} ${error ? fieldErrorClass : ''} relative flex w-full cursor-pointer items-center justify-between rounded-xl py-3.5 pl-4 pr-10 text-left`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={Boolean(error)}
      >
        <span className={`truncate ${value ? 'text-[#173653]' : 'text-[#795744]/50'}`}>
          {value || 'Select a service'}
        </span>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9AA3AD]">
          ▾
        </span>
      </button>
      <input type="hidden" name="service" value={value || ''} />
      <FieldError message={error} />

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={panelRef}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.18 }}
                style={{
                  position: 'fixed',
                  top: pos.top,
                  left: pos.left,
                  width: pos.width,
                  maxHeight: pos.maxHeight,
                  zIndex: 200,
                }}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#E7DECE] bg-white shadow-[0_18px_48px_rgba(23,54,83,0.14)]"
                role="listbox"
                aria-label="Choose a service"
              >
                <div className="min-h-0 flex-1 space-y-2 overflow-y-auto p-3">
                  {options.map((option) => {
                    const active = value === option
                    return (
                      <button
                        key={option}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => {
                          onChange(option)
                          setOpen(false)
                        }}
                        className={`
                          flex w-full cursor-pointer items-center justify-center rounded-full border px-3 py-2.5
                          text-center font-body text-[14px] font-medium transition
                          ${
                            active
                              ? 'border-[#795744] bg-[#795744] text-white shadow-xs'
                              : 'border-[#E7DECE] bg-[#FAF7F2] text-[#173653] hover:border-[#795744]/40 hover:bg-[#F5EFEB]'
                          }
                        `}
                      >
                        {option}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  )
}

function TimePickerField({ value, onChange, selectedDate, error }) {
  const [open, setOpen] = useState(false)
  const [mode12, setMode12] = useState(false)
  const rootRef = useRef(null)
  const panelRef = useRef(null)
  const buttonRef = useRef(null)
  const refs = useMemo(() => [rootRef, panelRef], [])
  useOutsideClose(refs, open, () => setOpen(false))
  const pos = usePopoverPosition(buttonRef, open, 300)

  const dayLabel = selectedDate
    ? `${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][selectedDate.getDay()]} ${selectedDate.getDate()}`
    : 'Pick a day'

  const display = value
    ? formatSlotLabel(
        TIME_SLOTS.find((s) => s.value === value) || { hour: 0, minute: 0, value },
        mode12,
      )
    : ''

  return (
    <div ref={rootRef} className="relative">
      <p className="mb-1.5 font-body text-[14px] font-medium text-gray-600 sm:text-[15px]">Preferred Time</p>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${fieldClass} ${error ? fieldErrorClass : ''} relative flex w-full cursor-pointer items-center justify-between py-3.5 pl-4 pr-11 text-left`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={Boolean(error)}
      >
        <span className={value ? 'text-[#173653]' : 'text-[#795744]/50'}>
          {display || 'Select preferred time'}
        </span>
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
          <IconClock color={MUTED} />
        </span>
      </button>
      <input type="hidden" name="time" value={value || ''} />
      <FieldError message={error} />

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                ref={panelRef}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.18 }}
                style={{
                  position: 'fixed',
                  top: pos.top,
                  left: pos.left,
                  width: pos.width,
                  maxHeight: pos.maxHeight,
                  zIndex: 200,
                }}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#E7DECE] bg-white shadow-[0_18px_48px_rgba(23,54,83,0.14)]"
                role="listbox"
                aria-label="Choose preferred time"
              >
                <div className="flex shrink-0 items-center justify-between border-b border-[#E7DECE] px-3.5 py-3">
                  <p className="font-body text-[14px] font-semibold text-[#173653]">{dayLabel}</p>
                  <div className="flex rounded-full bg-[#FAF7F2] border border-[#E7DECE] p-0.5">
                    <button
                      type="button"
                      onClick={() => setMode12(true)}
                      className={`cursor-pointer rounded-full px-2.5 py-1 font-body text-[11px] font-semibold transition ${
                        mode12 ? 'bg-white text-[#795744] shadow-xs' : 'text-[#795744]/70'
                      }`}
                    >
                      12h
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode12(false)}
                      className={`cursor-pointer rounded-full px-2.5 py-1 font-body text-[11px] font-semibold transition ${
                        !mode12 ? 'bg-white text-[#795744] shadow-xs' : 'text-[#795744]/70'
                      }`}
                    >
                      24h
                    </button>
                  </div>
                </div>

                <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-3 py-3">
                  {TIME_SLOTS.map((slot) => {
                    const active = value === slot.value
                    return (
                      <button
                        key={slot.value}
                        type="button"
                        role="option"
                        aria-selected={active}
                        onClick={() => {
                          onChange(slot.value)
                          setOpen(false)
                        }}
                        className={`
                          flex w-full cursor-pointer items-center justify-center rounded-full border px-3 py-2.5
                          font-body text-[14px] font-medium transition
                          ${
                            active
                              ? 'border-[#795744] bg-[#795744] text-white shadow-xs'
                              : 'border-[#E7DECE] bg-[#FAF7F2] text-[#173653] hover:border-[#795744]/40 hover:bg-[#F5EFEB]'
                          }
                        `}
                      >
                        {formatSlotLabel(slot, mode12)}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  )
}

/**
 * Book Online popup — calendar date + 30-min time slots
 */
export default function BookingModal({ open, onClose }) {
  const { booking } = footerData

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    setError,
    clearErrors,
    trigger,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(bookingSchema),
    defaultValues: bookingDefaultValues,
    mode: 'onSubmit',
  })

  const selectedDate = watch('date')

  useEffect(() => {
    if (!open) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  useEffect(() => {
    if (!open) reset(bookingDefaultValues)
  }, [open, reset])

  const onValid = () => {
    Swal.fire({
      icon: 'success',
      title: booking.successTitle,
      text: booking.successText,
      confirmButtonColor: NAVY,
    })
    reset(bookingDefaultValues)
    onClose()
  }

  const onInvalid = (formErrors) => {
    const firstMessage =
      Object.values(formErrors).find((err) => err?.message)?.message || booking.errorText
    Swal.fire({
      icon: 'error',
      title: booking.errorTitle,
      text: firstMessage,
      confirmButtonColor: NAVY,
    })
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-5 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close booking overlay"
            className="absolute inset-0 cursor-pointer bg-black/45 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="
              relative z-10 grid w-full max-w-5xl rounded-t-[1.25rem] bg-white border border-[#E7DECE]
              shadow-[0_30px_80px_rgba(23,54,83,0.2)]
              max-h-[96dvh] overflow-y-auto overscroll-contain
              grid-cols-1
              sm:max-h-[min(92svh,880px)] sm:rounded-[1.35rem]
              lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)] lg:overflow-hidden
            "
          >
            <aside
              className="
                hidden h-full min-h-0 flex-col overflow-y-auto bg-[#F5EFEB] border-r border-[#E7DECE]
                lg:flex
                px-5 py-6
                sm:px-7 sm:py-8
                lg:px-9 lg:py-10
              "
            >
              <div className="shrink-0">
                <p className="type-eyebrow text-[#795744] font-semibold">{booking.eyebrow}</p>
                <h2 className="font-serif text-2xl lg:text-[1.75rem] text-[#173653] font-normal mt-3 leading-snug">
                  {booking.sidebarTitle}
                </h2>
              </div>

              <ul className="mt-8 flex flex-1 flex-col justify-between gap-4 sm:mt-9 sm:gap-5 lg:mt-11 lg:gap-6">
                {booking.steps.map((step) => (
                  <li
                    key={step.title}
                    className="
                      flex flex-1 items-start rounded-2xl bg-white border border-[#E7DECE]
                      px-4 py-4
                      shadow-2xs
                      sm:px-5 sm:py-5
                      lg:px-6 lg:py-6
                    "
                  >
                    <div className="flex w-full items-start gap-3.5 sm:gap-4">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FAF7F2] border border-[#E7DECE] text-[#795744] sm:h-11 sm:w-11">
                        <StepIcon type={step.icon} />
                      </span>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <h3 className="font-display text-[15px] font-semibold tracking-tight text-[#173653] sm:text-[16px]">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 font-body text-[13px] leading-relaxed text-[#795744]/80 sm:mt-2 sm:text-[14px]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="relative flex min-h-0 flex-col overflow-visible bg-white px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 sm:px-7 sm:py-8 md:px-8 md:py-9 lg:overflow-y-auto lg:px-9 lg:py-10">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="
                  absolute right-3 top-3 z-20 flex h-9 w-9 cursor-pointer items-center justify-center
                  rounded-full bg-[#FAF7F2] border border-[#E7DECE] text-[#795744] transition hover:bg-[#795744] hover:text-white
                  sm:right-5 sm:top-5 shadow-2xs
                "
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 2l10 10M12 2 2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>

              <h3 id="booking-title" className="font-serif text-2xl lg:text-[1.85rem] text-[#173653] font-normal pr-10">
                {booking.formTitle}
              </h3>

              <form
                onSubmit={handleSubmit(onValid, onInvalid)}
                className="mt-5 flex flex-1 flex-col gap-3.5 sm:mt-6 sm:gap-4"
                noValidate
              >
                <label className="block">
                  <span className="relative block">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                      <IconUser />
                    </span>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          inputMode="text"
                          autoComplete="name"
                          placeholder="Full Name"
                          aria-invalid={Boolean(errors.name)}
                          className={`${fieldClass} ${errors.name ? fieldErrorClass : ''} py-3.5 pl-11 pr-4`}
                          value={field.value}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          onChange={(e) => {
                            const lettersOnly = e.target.value
                              .replace(/[^A-Za-z\s]/g, '')
                              .replace(/\s{2,}/g, ' ')
                            field.onChange(lettersOnly)

                            if (lettersOnly.trim() === '') {
                              clearErrors('name')
                            } else {
                              void trigger('name')
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.ctrlKey || e.metaKey || e.altKey) return
                            if (e.key.length === 1 && /[^A-Za-z\s]/.test(e.key)) {
                              e.preventDefault()
                            }
                          }}
                        />
                      )}
                    />
                  </span>
                  <FieldError message={errors.name?.message} />
                </label>

                <div className="grid grid-cols-1 gap-3.5 min-[380px]:grid-cols-2 sm:gap-4">
                  <label className="relative block">
                    <Controller
                      name="age"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="text"
                          inputMode="numeric"
                          maxLength={3}
                          placeholder="Age"
                          aria-invalid={Boolean(errors.age)}
                          className={`${fieldClass} ${errors.age ? fieldErrorClass : ''} rounded-xl py-3.5 px-4`}
                          value={field.value}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          onChange={(e) => {
                            const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 3)
                            field.onChange(digitsOnly)

                            if (digitsOnly !== '' && Number(digitsOnly) > 120) {
                              setError('age', {
                                type: 'max',
                                message: 'Age must be 120 or less',
                              })
                            } else {
                              clearErrors('age')
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.ctrlKey || e.metaKey || e.altKey) return
                            if (e.key.length === 1 && /\D/.test(e.key)) {
                              e.preventDefault()
                            }
                          }}
                        />
                      )}
                    />
                    <FieldError message={errors.age?.message} />
                  </label>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <GenderPickerField
                        value={field.value}
                        error={errors.gender?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>

                <label className="block">
                  <span className="relative block">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
                      <IconPhone color={MUTED} />
                    </span>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="tel"
                          inputMode="numeric"
                          maxLength={10}
                          autoComplete="tel"
                          placeholder="Phone Number"
                          aria-invalid={Boolean(errors.phone)}
                          className={`${fieldClass} ${errors.phone ? fieldErrorClass : ''} py-3.5 pl-11 pr-4`}
                          value={field.value}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          onChange={(e) => {
                            const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10)
                            field.onChange(digitsOnly)

                            if (digitsOnly === '') {
                              clearErrors('phone')
                            } else if (!/^[6-9]/.test(digitsOnly)) {
                              setError('phone', {
                                type: 'matches',
                                message: 'Enter a valid 10-digit mobile number (digits only)',
                              })
                            } else if (digitsOnly.length === 10) {
                              void trigger('phone')
                            } else {
                              clearErrors('phone')
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.ctrlKey || e.metaKey || e.altKey) return
                            if (e.key.length === 1 && /\D/.test(e.key)) {
                              e.preventDefault()
                            }
                          }}
                        />
                      )}
                    />
                  </span>
                  <FieldError message={errors.phone?.message} />
                </label>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
                  <Controller
                    name="date"
                    control={control}
                    render={({ field }) => (
                      <DatePickerField
                        value={field.value}
                        error={errors.date?.message}
                        onChange={(value) => {
                          field.onChange(value)
                          setValue('time', '')
                        }}
                      />
                    )}
                  />
                  <Controller
                    name="time"
                    control={control}
                    render={({ field }) => (
                      <TimePickerField
                        value={field.value}
                        selectedDate={selectedDate}
                        error={errors.time?.message}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>

                <Controller
                  name="service"
                  control={control}
                  render={({ field }) => (
                    <ServicePickerField
                      value={field.value}
                      options={booking.services}
                      error={errors.service?.message}
                      onChange={field.onChange}
                    />
                  )}
                />

                <label className="block">
                  <span className="relative block">
                    <span className="pointer-events-none absolute left-3.5 top-3.5">
                      <IconMsg />
                    </span>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your concern..."
                      aria-invalid={Boolean(errors.message)}
                      className={`${fieldClass} ${errors.message ? fieldErrorClass : ''} resize-none py-3.5 pl-11 pr-4`}
                      {...register('message')}
                    />
                  </span>
                  <FieldError message={errors.message?.message} />
                </label>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    type-btn mt-1 w-full cursor-pointer rounded-xl bg-[#A9C9E5] hover:bg-[#96BEDF] active:bg-[#85AFCF] py-3.5 text-[#173653] font-bold text-sm sm:text-base
                    border border-[#92B8D9]/60 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 shadow-sm
                    sm:mt-2 sm:py-4
                  "
                >
                  {isSubmitting ? 'Validating...' : booking.submitLabel}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const OPEN_BOOKING_EVENT = 'vinayak:open-booking'

export function openBookingModal() {
  window.dispatchEvent(new CustomEvent(OPEN_BOOKING_EVENT))
}
