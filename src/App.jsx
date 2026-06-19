import React, { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useScroll,
  animate,
} from 'framer-motion'
import {
  Gem,
  ScanLine,
  Layers,
  ArrowUpRight,
  ArrowLeftRight,
  Sparkles,
  Plus,
  Star,
  ShieldCheck,
  Clock3,
  Phone,
  CalendarDays,
  HeartPulse,
  Microscope,
  BadgeCheck,
  CreditCard,
  Smile,
  Stethoscope,
  WandSparkles,
  ChevronDown,
  Quote,
} from 'lucide-react'
import StructuredData from './seo/StructuredData'
import Picture from './seo/Picture'
import { BookingProvider, useBooking } from './booking/Booking'

/* =================================================================== */
/*  VALOIS ORAL WELLNESS — a single, self-contained portfolio piece.   */
/*  Palette: Aqua Mist #F0FAFB · Teal Accent #1BA8B5                   */
/*           Deep Teal Ink #0E3B40                                     */
/* =================================================================== */

const EASE = [0.16, 1, 0.3, 1] // expensive, fluid cubic-bezier

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
}

function SectionHeading({ eyebrow, title, text, id, light = false, align = 'left' }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12 } },
      }}
      className={
        (align === 'center' ? 'mx-auto text-center' : '') +
        ' max-w-2xl'
      }
    >
      <motion.div variants={fadeUp}>
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
      </motion.div>
      <motion.h2
        id={id}
        variants={fadeUp}
        className={
          'font-display font-bold leading-[0.98] tracking-[-0.02em] ' +
          (light ? 'text-cream' : 'text-espresso')
        }
        style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
      >
        {title}
      </motion.h2>
      {text && (
        <motion.p
          variants={fadeUp}
          className={
            'mt-5 text-base font-light leading-relaxed ' +
            (light ? 'text-cream/[0.68]' : 'text-espresso/[0.65]')
          }
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Aqua gradient wash — soft pools of teal/cyan that breathe like     */
/*  water. Drop into any `relative isolate overflow-hidden` section.   */
/*  `intensity` scales the pool opacity so secondary sections (CTA /   */
/*  footer) can read softer than the hero.                             */
/* ------------------------------------------------------------------ */
function AquaWash({ intensity = 1 }) {
  const a = (v) => +(v * intensity).toFixed(3)
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.6, ease: EASE }}
      className="pointer-events-none absolute inset-0 -z-20"
      style={{
        backgroundImage:
          `linear-gradient(135deg, rgba(247,251,251,1) 0%, rgba(232,247,248,${a(0.92)}) 45%, rgba(255,246,241,${a(0.8)}) 100%),` +
          `linear-gradient(to right, rgba(20,52,59,${a(0.055)}) 1px, transparent 1px),` +
          `linear-gradient(to bottom, rgba(20,52,59,${a(0.045)}) 1px, transparent 1px)`,
        backgroundSize: 'auto, 72px 72px, 72px 72px',
      }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            `linear-gradient(115deg, transparent 0%, rgba(14,165,168,${a(0.16)}) 38%, transparent 58%),` +
            `linear-gradient(25deg, transparent 0%, rgba(217,131,95,${a(0.13)}) 55%, transparent 76%)`,
          backgroundSize: '180% 180%',
        }}
        animate={{ backgroundPosition: ['0% 40%', '100% 60%', '0% 40%'] }}
        transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity }}
      />
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Magnetic button — tracks the pointer and drifts toward it, with    */
/*  a continuous liquid-shimmer gold gradient sweeping across it.       */
/* ------------------------------------------------------------------ */
function MagneticButton({ children, className = '', strength = 0.4, ...rest }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.4 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * strength)
    y.set(relY * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={
        'group relative inline-flex items-center justify-center overflow-hidden rounded-full ' +
        'px-9 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-cream ' +
        'shadow-[0_16px_35px_-20px_rgba(20,52,59,0.6)] ' +
        className
      }
      {...rest}
    >
      {/* liquid shimmer gradient layer */}
      <motion.span
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(110deg, #14343b 0%, #0ea5a8 34%, #d9835f 68%, #14343b 100%)',
          backgroundSize: '250% 100%',
        }}
        animate={{ backgroundPositionX: ['0%', '250%'] }}
        transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
      />
      {/* soft sheen on hover */}
      <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-black/[0.18] to-white/[0.12] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="flex items-center gap-2">{children}</span>
    </motion.button>
  )
}

/* ------------------------------------------------------------------ */
/*  Section eyebrow label                                              */
/* ------------------------------------------------------------------ */
function Eyebrow({ children, light = false }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="h-px w-10 bg-champagne" />
      <span
        className={
          'text-[11px] font-semibold uppercase tracking-[0.35em] ' +
          (light ? 'text-champagne' : 'text-champagne')
        }
      >
        {children}
      </span>
    </div>
  )
}

/* ================================================================== */
/*  1 · CINEMATIC HERO REVEAL                                          */
/* ================================================================== */
function Hero() {
  const { open: openBooking } = useBooking()
  const lines = [['Healthy smiles,'], ['made simple.']]

  // word-level staggered clip-path / slide-up reveal
  const wordParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.55 } },
  }
  const word = {
    hidden: { y: '115%', clipPath: 'inset(0 0 100% 0)' },
    show: {
      y: '0%',
      clipPath: 'inset(0 0 -10% 0)',
      transition: { duration: 1.15, ease: EASE },
    },
  }

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pb-14 pt-28 sm:px-8 sm:pb-16 sm:pt-32 lg:px-12 xl:px-20">
      <AquaWash intensity={0.6} />

      {/* background grid — fades + scales into view */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.18 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(14,59,64,0.028) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(14,59,64,0.028) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 50% 45%, black 30%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 50% 45%, black 30%, transparent 80%)',
        }}
      />
      {/* warm radial glow */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.6, ease: EASE }}
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 30%, rgba(27,168,181,0.09), transparent 70%)',
        }}
      />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 md:gap-12 lg:grid-cols-[1.02fr_0.98fr] xl:gap-16">
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
            className="mb-6 flex max-w-full flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-champagne sm:mb-8 sm:gap-3 sm:text-[11px] sm:tracking-[0.28em]"
          >
            <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            Modern dental care for the whole family
          </motion.div>

          <motion.h1
            variants={wordParent}
            initial="hidden"
            animate="show"
            className="max-w-[11ch] font-display font-extrabold leading-[0.94] tracking-[-0.03em] text-espresso sm:max-w-[12ch] lg:max-w-none"
            style={{ fontSize: 'clamp(2.55rem, 11vw, 7.15rem)' }}
          >
            {lines.map((ln, li) => (
              <span key={li} className="block">
                {ln.map((w, wi) => (
                  <span
                    key={wi}
                    className="inline-block overflow-hidden align-bottom"
                    style={{ paddingRight: '0.18em' }}
                  >
                    <motion.span variants={word} className="inline-block">
                      {w}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.5 }}
            className="mt-6 max-w-2xl text-base font-light leading-relaxed text-espresso/70 sm:mt-8 sm:text-lg"
          >
            Checkups, emergency care, implants, aligners and cosmetic dentistry
            in a bright clinic that keeps treatment clear, calm and easy to plan.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 1.75 }}
            className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:items-center"
          >
            <MagneticButton
              aria-label="Book a dental appointment"
              onClick={openBooking}
              className="w-full sm:w-auto"
            >
              Book an Appointment
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
            <a
              href="tel:+41220000000"
              className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-espresso/10 bg-white/[0.62] px-4 text-sm font-semibold uppercase tracking-[0.12em] text-espresso transition-colors hover:text-champagne sm:justify-start sm:border-0 sm:bg-transparent sm:px-0 sm:tracking-[0.16em]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-full border border-espresso/15 bg-white/70">
                <Phone className="h-4 w-4" />
              </span>
              +41 22 000 00 00
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.95 }}
            className="-mx-4 mt-8 grid auto-cols-[minmax(11rem,1fr)] grid-flow-col gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:mt-10 sm:grid-flow-row sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0"
          >
            {[
              [Clock3, 'Open today', '09:00-18:00'],
              [ShieldCheck, 'Insurance help', 'Claims support'],
              [HeartPulse, 'Dental emergency', 'Same-day slots'],
            ].map(([Icon, title, detail]) => (
              <div
                key={title}
                className="rounded-2xl border border-espresso/10 bg-white/[0.55] p-4 shadow-[0_16px_35px_-32px_rgba(14,59,64,0.35)] backdrop-blur"
              >
                <Icon className="mb-3 h-5 w-5 text-[#D9835F]" strokeWidth={1.7} />
                <div className="text-sm font-bold text-espresso">{title}</div>
                <div className="mt-1 text-xs text-espresso/[0.55]">{detail}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
          className="relative min-h-0"
        >
          <motion.div
            className="absolute right-2 top-2 z-10 rounded-2xl border border-white/60 bg-white/[0.86] p-3 shadow-[0_22px_55px_-36px_rgba(14,59,64,0.45)] backdrop-blur sm:p-4"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5.5, ease: 'easeInOut', repeat: Infinity }}
          >
            <div className="flex items-center gap-3">
              <div className="hidden h-11 w-11 place-items-center rounded-full bg-[#EAF8F9] text-champagne sm:grid">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-espresso">4.9/5 rating</div>
                <div className="text-xs text-espresso/[0.55]">640 reviews</div>
              </div>
            </div>
          </motion.div>
          <div className="relative mt-2 aspect-[16/11] overflow-hidden rounded-[1.5rem] border border-espresso/10 bg-white shadow-[0_30px_90px_-60px_rgba(14,59,64,0.55)] sm:aspect-[16/9] sm:rounded-[2rem] lg:mt-0 lg:aspect-[4/5] xl:aspect-[5/4]">
            <Picture
              src="/images/suite.jpg"
              alt="Bright modern dental treatment room"
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/[0.62] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-cream sm:p-6">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/[0.16] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                <CalendarDays className="h-3.5 w-3.5" />
                New patients welcome
              </div>
              <div className="font-display text-xl font-bold sm:text-2xl">Calm treatment rooms</div>
              <p className="mt-2 max-w-sm text-sm font-light leading-relaxed text-cream/[0.78]">
                Bright, sterile and quiet spaces designed for focused,
                comfortable care.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-espresso/40 lg:block"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
          className="inline-block"
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  )
}

/* ================================================================== */
/*  2 · BEFORE / AFTER TRANSFORMATION SLIDER                           */
/*      Inertia-eased, draggable, custom pulsing handle.               */
/* ================================================================== */

// Two real macro photographs of the same smile case, framed identically on the
// mouth so the teeth line up across the divider. The "before" shows dull,
// yellow-stained, uneven teeth; the "after" shows the whitened, aligned result.
// Both are cropped to the smile, so the slider reveals a clear, honest teeth
// transformation — no whole-face colour grading.
function SmilePanel({ variant }) {
  const after = variant === 'after'
  return (
    <div className="relative h-full w-full overflow-hidden bg-espresso">
      <Picture
        src={after ? '/images/after.png' : '/images/before.png'}
        alt={
          after
            ? 'The same smile after professional whitening and alignment'
            : 'The smile before treatment — stained and uneven teeth'
        }
        sizes="(min-width: 1024px) 60vw, 100vw"
        draggable={false}
        className="pointer-events-none h-full w-full select-none object-cover"
        style={{ objectPosition: '50% 50%' }}
      />
    </div>
  )
}

function TrustBar() {
  const items = [
    [ShieldCheck, 'Sterilization-first rooms', 'Hospital-grade protocols after every visit'],
    [CreditCard, 'Transparent estimates', 'Payment plans and insurance paperwork support'],
    [Clock3, 'Flexible scheduling', 'Early appointments plus same-day urgent care'],
    [BadgeCheck, 'Licensed clinicians', 'Specialists for implants, orthodontics and cosmetics'],
  ]
  return (
    <section className="relative border-y border-espresso/10 bg-white/[0.55] px-6 py-8 backdrop-blur sm:px-10 lg:px-20">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([Icon, title, detail], i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            className="flex items-start gap-4 rounded-2xl px-2 py-3"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#EAF8F9] text-champagne">
              <Icon className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <span>
              <span className="block text-sm font-bold text-espresso">{title}</span>
              <span className="mt-1 block text-xs leading-relaxed text-espresso/[0.55]">
                {detail}
              </span>
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function BeforeAfterSlider() {
  const containerRef = useRef(null)
  const dragging = useRef(false)
  const [interacted, setInteracted] = useState(false)

  const pos = useMotionValue(50) // 0–100
  // inertia-based easing → weighted, fluid travel
  const smooth = useSpring(pos, { stiffness: 90, damping: 18, mass: 0.9 })

  const clip = useTransform(smooth, (v) => `inset(0 ${100 - v}% 0 0)`)
  const handleLeft = useTransform(smooth, (v) => `${v}%`)

  const setFromClientX = (clientX) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    pos.set(Math.max(0, Math.min(100, pct)))
  }

  useEffect(() => {
    const move = (e) => {
      if (!dragging.current) return
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      setFromClientX(clientX)
    }
    const up = () => (dragging.current = false)
    window.addEventListener('mousemove', move)
    window.addEventListener('touchmove', move, { passive: false })
    window.addEventListener('mouseup', up)
    window.addEventListener('touchend', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('touchmove', move)
      window.removeEventListener('mouseup', up)
      window.removeEventListener('touchend', up)
    }
  }, [])

  const start = (clientX) => {
    dragging.current = true
    setInteracted(true)
    setFromClientX(clientX)
  }

  return (
    <section
      id="transformation"
      aria-labelledby="transformation-title"
      className="relative px-6 py-36 sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 max-w-2xl">
          <Eyebrow>The Transformation</Eyebrow>
          <h2
            id="transformation-title"
            className="font-display font-bold leading-[0.95] tracking-[-0.02em] text-espresso"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
          >
            Drag to witness the artistry.
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-espresso/[0.65]">
            Every restoration is sculpted by hand and verified at the micron.
            Glide the handle to reveal a single Hollywood Smile Design case.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-3xl border border-espresso/10 shadow-[0_24px_70px_-55px_rgba(14,59,64,0.28)]"
          onMouseDown={(e) => start(e.clientX)}
          onTouchStart={(e) => start(e.touches[0].clientX)}
        >
          {/* AFTER (full, underneath) */}
          <div className="absolute inset-0">
            <SmilePanel variant="after" />
            <span className="absolute right-5 top-5 rounded-full bg-cream/80 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-espresso backdrop-blur">
              After
            </span>
          </div>

          {/* BEFORE (clipped on top) */}
          <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
            <SmilePanel variant="before" />
            <span className="absolute left-5 top-5 rounded-full bg-espresso/80 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-cream backdrop-blur">
              Before
            </span>
          </motion.div>

          {/* divider + handle */}
          <motion.div
            className="absolute inset-y-0 z-10 w-px bg-cream shadow-[0_0_12px_rgba(0,0,0,0.12)]"
            style={{ left: handleLeft, x: '-0.5px' }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-champagne/60 bg-cream/95 text-espresso shadow-[0_8px_20px_-10px_rgba(14,59,64,0.3)] backdrop-blur"
              animate={
                interacted
                  ? { scale: 1, boxShadow: '0 8px 20px -10px rgba(14,59,64,0.3)' }
                  : {
                      scale: [1, 1.12, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(27,168,181,0.5)',
                        '0 0 0 14px rgba(27,168,181,0)',
                        '0 0 0 0 rgba(27,168,181,0)',
                      ],
                    }
              }
              transition={
                interacted
                  ? { duration: 0.4, ease: EASE }
                  : { duration: 2.2, ease: 'easeInOut', repeat: Infinity }
              }
            >
              <ArrowLeftRight className="h-5 w-5" strokeWidth={1.6} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  3 · ADVANCED HOVER SERVICES GRID                                   */
/*      3D pointer tilt + self-drawing glowing SVG line art.           */
/* ================================================================== */

const SERVICES = [
  {
    title: 'General Dentistry',
    desc: 'Exams, cleanings, fillings and gum care focused on prevention and long-term comfort.',
    details: ['Digital X-rays', 'Hygiene therapy', 'Tooth-coloured fillings'],
    icon: Stethoscope,
    art: 'M20 60 Q60 20 100 60 T180 60',
  },
  {
    title: 'Cosmetic Smile Design',
    desc: 'Whitening, bonding and porcelain veneers planned around your facial proportions.',
    details: ['Mock-up preview', 'Shade matching', 'Minimal-prep ceramics'],
    icon: Gem,
    art: 'M20 70 C40 20 80 20 100 60 C120 100 160 100 180 50',
  },
  {
    title: 'Dental Implants',
    desc: 'Guided implant placement and restoration for a natural-looking replacement tooth.',
    details: ['CBCT planning', 'Surgical guides', 'Crown restoration'],
    icon: ScanLine,
    art: 'M25 80 L70 30 L100 75 L130 25 L175 70',
  },
  {
    title: 'Clear Aligners',
    desc: 'Discreet orthodontics with digital scans, progress checks and predictable staging.',
    details: ['3D smile scan', 'Removable trays', 'Retention plan'],
    icon: Smile,
    art: 'M18 62 C45 92 78 92 100 62 C122 92 155 92 182 62',
  },
  {
    title: 'Root Canal Therapy',
    desc: 'Microscope-assisted treatment designed to save infected teeth with less stress.',
    details: ['Local anaesthetic', 'Microscope care', 'Final crown options'],
    icon: Microscope,
    art: 'M35 20 L70 75 M70 75 Q100 95 130 75 M130 75 L165 20',
  },
  {
    title: 'Emergency Dentistry',
    desc: 'Fast help for toothache, broken teeth, swelling, lost fillings and dental trauma.',
    details: ['Same-day triage', 'Pain relief', 'Repair plan'],
    icon: Layers,
    art: 'M20 55 Q60 5 100 55 Q140 105 180 55',
  },
]

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const [hover, setHover] = useState(false)

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 18 })
  const sry = useSpring(ry, { stiffness: 150, damping: 18 })

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 16) // rotateY
    rx.set(-py * 16) // rotateX
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
    setHover(false)
  }

  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.12 }}
      style={{ perspective: 1000 }}
    >
      <motion.article
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={reset}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="group relative flex h-full min-h-[24rem] flex-col justify-between overflow-hidden rounded-2xl border border-espresso/10 bg-gradient-to-b from-white to-[#F3FBFC] p-7 transition-shadow duration-500 hover:shadow-[0_30px_70px_-55px_rgba(27,168,181,0.3)]"
      >
        {/* gold wash on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-champagne/0 via-champagne/0 to-champagne/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* self-drawing line art */}
        <div
          className="pointer-events-none absolute -right-4 -top-2 h-40 w-52 opacity-30 transition-opacity duration-500 group-hover:opacity-100"
          style={{ transform: 'translateZ(40px)' }}
        >
          <svg viewBox="0 0 200 100" className="h-full w-full">
            <motion.path
              d={service.art}
              fill="none"
              stroke="#1BA8B5"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: hover ? 1 : 0 }}
              transition={{ duration: 1.1, ease: EASE }}
              style={{
                filter: hover
                  ? 'drop-shadow(0 0 6px rgba(27,168,181,0.9))'
                  : 'none',
              }}
            />
          </svg>
        </div>

        <div style={{ transform: 'translateZ(50px)' }}>
          <span className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-champagne/40 bg-champagne/10 text-champagne">
            <Icon className="h-6 w-6" strokeWidth={1.5} />
          </span>
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-champagne">
            0{index + 1}
          </div>
          <h3 className="font-display text-2xl font-bold leading-tight tracking-[-0.01em] text-espresso">
            {service.title}
          </h3>
        </div>

        <div style={{ transform: 'translateZ(30px)' }}>
          <p className="mb-6 text-sm font-light leading-relaxed text-espresso/[0.65]">
            {service.desc}
          </p>
          <ul className="mb-7 space-y-2">
            {service.details.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-espresso/60">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D9835F]" />
                {item}
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-espresso transition-colors group-hover:text-champagne">
            Learn more
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </motion.article>
    </motion.div>
  )
}

function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="relative px-6 py-36 sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>The Practice</Eyebrow>
            <h2
              id="services-title"
              className="font-display font-bold leading-[0.95] tracking-[-0.02em] text-espresso"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
            >
              Care for every reason you visit the dentist.
            </h2>
          </div>
          <p className="max-w-sm text-base font-light leading-relaxed text-espresso/60">
            Routine care, urgent treatment and cosmetic planning live in one
            coordinated clinic so your dental history stays connected.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PatientJourney() {
  const steps = [
    ['01', 'Book online or call', 'Choose a time, tell us what hurts or what you want to improve, and we prepare the right room before you arrive.'],
    ['02', 'Exam and digital scan', 'Your dentist reviews photos, X-rays and a 3D scan with you so the diagnosis is visual and easy to understand.'],
    ['03', 'Clear treatment options', 'You receive priorities, timing and costs before treatment. No surprise procedures and no pressure.'],
    ['04', 'Comfort-led care', 'Noise reduction, local anaesthetic, sedation options and gentle pacing keep visits calm from start to finish.'],
  ]
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="relative overflow-hidden bg-white px-6 py-32 sm:px-10 lg:px-20"
    >
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Patient Journey"
          id="journey-title"
          title="A dental visit that feels organised from the first minute."
          text="Every touchpoint is built to reduce uncertainty: arrival, diagnosis, treatment choices, comfort, payment and follow-up."
        />
        <div className="relative">
          <motion.div
            aria-hidden
            className="absolute left-7 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-champagne via-[#D9835F] to-transparent sm:block"
            initial={{ scaleY: 0, transformOrigin: 'top' }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          <div className="space-y-5">
            {steps.map(([num, title, text], i) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
                className="relative rounded-2xl border border-espresso/10 bg-[#F7FCFC] p-6 pl-24 shadow-[0_18px_40px_-38px_rgba(14,59,64,0.34)]"
              >
                <span className="absolute left-5 top-6 grid h-12 w-12 place-items-center rounded-full bg-espresso font-display text-sm font-bold text-cream">
                  {num}
                </span>
                <h3 className="font-display text-xl font-bold text-espresso">{title}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-espresso/[0.62]">
                  {text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Technology() {
  const tech = [
    [ScanLine, '3D intraoral scanning', 'No goopy impressions for most restorative, aligner and whitening workflows.'],
    [Microscope, 'Microscope dentistry', 'Magnified diagnostics help preserve healthy enamel and refine margins.'],
    [WandSparkles, 'Guided whitening', 'Custom trays and in-office options selected for sensitivity and shade goals.'],
    [ShieldCheck, 'Sterile tracking', 'Instrument cycles and room turnover standards are documented every day.'],
  ]
  return (
    <section
      id="technology"
      aria-labelledby="technology-title"
      className="relative px-6 py-32 sm:px-10 lg:px-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE }}
          className="relative order-2 lg:order-1"
        >
          <ParallaxImage
            src="/images/scan.jpg"
            alt="Digital dental scanner and diagnostic equipment"
            className="aspect-[5/4] rounded-[2rem] border border-espresso/10 shadow-[0_30px_75px_-62px_rgba(14,59,64,0.5)]"
            sizes="(min-width: 1024px) 48vw, 100vw"
          />
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-espresso/[0.72] p-5 text-cream backdrop-blur">
            <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-champagne">
              Live diagnostic view
            </div>
            <div className="mt-2 font-display text-xl font-bold">Scan, explain, decide together.</div>
          </div>
        </motion.div>
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Technology"
            id="technology-title"
            title="Modern tools, explained in human language."
            text="Technology should make dentistry clearer, more conservative and more comfortable. We show you what we see and why it matters."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {tech.map(([Icon, title, text], i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: EASE, delay: i * 0.08 }}
                className="rounded-2xl border border-espresso/10 bg-white/70 p-5"
              >
                <Icon className="mb-4 h-6 w-6 text-[#D9835F]" strokeWidth={1.7} />
                <h3 className="font-display text-lg font-bold text-espresso">{title}</h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-espresso/60">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  4 · SCROLL-TRIGGERED STATS COUNTER                                 */
/* ================================================================== */

function StatItem({ value, suffix = '', decimals = 0, label, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 2.2,
      ease: EASE,
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, value])

  const formatted =
    decimals > 0
      ? display.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.round(display).toLocaleString('en-US')

  return (
    <div ref={ref} className="text-center">
      <div
        className="whitespace-nowrap font-display font-extrabold leading-none tracking-[-0.03em] text-cream tabular-nums"
        style={{ fontSize: 'clamp(2.4rem, 4.2vw, 3.5rem)' }}
      >
        {formatted}
        <span className="text-champagne">{suffix}</span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.5 + index * 0.15 }}
        className="mt-4 text-xs font-medium uppercase tracking-[0.28em] text-cream/[0.55]"
      >
        {label}
      </motion.div>
    </div>
  )
}

function Stats() {
  const stats = [
    { value: 98, suffix: '%', label: 'Patients Recommend Us' },
    { value: 14000, suffix: '+', label: 'Appointments Completed' },
    { value: 27, suffix: '', label: 'Clinical Team Members' },
    { value: 24, suffix: 'h', label: 'Urgent Care Response' },
  ]
  return (
    <section
      id="results"
      aria-labelledby="results-title"
      className="relative overflow-hidden bg-espresso px-6 py-36 sm:px-10 lg:px-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background:
            'radial-gradient(50% 60% at 20% 10%, rgba(27,168,181,0.18), transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-20 max-w-2xl">
          <Eyebrow light>By the Numbers</Eyebrow>
          <h2
            id="results-title"
            className="font-display font-bold leading-[0.95] tracking-[-0.02em] text-cream"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
          >
            Real clinic standards, measured every week.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <StatItem key={s.label} index={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Team() {
  const team = [
    ['Dr. Elise Valois', 'Cosmetic and restorative dentist', 'Veneers, bonding, smile design'],
    ['Dr. Karim Haddad', 'Implant and oral surgery lead', 'Guided implants, extractions, grafting'],
    ['Mira Chen, RDH', 'Preventive hygiene director', 'Gum therapy, whitening, prevention plans'],
  ]
  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="relative overflow-hidden bg-[#F9F4F1] px-6 py-32 sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Clinical Team"
            id="team-title"
            title="Dentists, hygienists and specialists in one coordinated team."
            text="You see the right clinician for each step, with shared notes and a treatment plan that stays consistent."
          />
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-espresso hover:text-champagne"
          >
            Visit the clinic
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {team.map(([name, role, focus], i) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, ease: EASE, delay: i * 0.1 }}
              className="group overflow-hidden rounded-2xl border border-espresso/10 bg-white"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-espresso/[0.08]">
                <Picture
                  src={i === 0 ? '/images/img3.png' : i === 1 ? '/images/img2.png' : '/images/smile-face.jpg'}
                  alt={`${name}, ${role}`}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/55 to-transparent opacity-70" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-espresso">{name}</h3>
                <p className="mt-1 text-sm text-champagne">{role}</p>
                <p className="mt-4 text-sm font-light leading-relaxed text-espresso/60">
                  Focus: {focus}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reviews() {
  const reviews = [
    ['I finally understood what was happening with my teeth. The scan, photos and cost plan were all clear before we started.', 'Maya R.'],
    ['They saw me the same day for a broken molar and handled the whole visit calmly. Best dental experience I have had.', 'Jonas K.'],
    ['My veneers look natural, not oversized or fake. The temporary mock-up made the decision very easy.', 'Leila S.'],
  ]
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="relative px-6 py-32 sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Patient Reviews"
            id="reviews-title"
            title="People notice the calm, the clarity and the follow-through."
          />
          <div className="flex items-center gap-2 text-champagne">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-5 w-5" fill="#1BA8B5" strokeWidth={0} />
            ))}
            <span className="ml-2 text-sm font-semibold text-espresso">4.9 average</span>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map(([text, name], i) => (
            <motion.figure
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.1 }}
              className="rounded-2xl border border-espresso/10 bg-white/75 p-7 shadow-[0_20px_45px_-42px_rgba(14,59,64,0.35)]"
            >
              <Quote className="mb-5 h-7 w-7 text-[#D9835F]" strokeWidth={1.5} />
              <blockquote className="text-base font-light leading-relaxed text-espresso/70">
                "{text}"
              </blockquote>
              <figcaption className="mt-6 text-sm font-bold text-espresso">
                {name}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    ['Do you accept dental emergencies?', 'Yes. Call the clinic and we will triage pain, swelling, broken teeth or lost restorations for the earliest available appointment.'],
    ['Can I get a treatment estimate first?', 'Yes. After the exam and diagnostics, we explain options, timing and fees before any non-urgent care begins.'],
    ['Do clear aligners hurt?', 'Most patients feel pressure for a day or two when trays change. We track fit and comfort at scheduled check-ins.'],
    ['Are whitening and veneers safe for enamel?', 'We recommend whitening or veneers only after checking gums, enamel, bite and sensitivity risk. Minimal tooth preparation is always preferred.'],
  ]
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative bg-white px-6 py-32 sm:px-10 lg:px-20"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Questions"
          id="faq-title"
          title="Common questions before a first visit."
          text="The booking form also lets you describe symptoms or goals so the team can prepare before you arrive."
        />
        <div className="space-y-4">
          {faqs.map(([q, a], i) => (
            <motion.details
              key={q}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              className="group rounded-2xl border border-espresso/10 bg-[#F7FCFC] p-6 open:bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold text-espresso">
                {q}
                <ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-4 text-sm font-light leading-relaxed text-espresso/[0.62]">
                {a}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  5 · INFINITE FLOATING TICKER MARQUEE                               */
/* ================================================================== */
function Marquee() {
  const items = [
    'PREVENTIVE CHECKUPS',
    'SAME-DAY EMERGENCY CARE',
    'CLEAR ALIGNERS',
    'IMPLANTS AND SMILE DESIGN',
  ]
  const Row = () => (
    <div className="flex shrink-0 items-center">
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          <span className="px-8 font-display text-2xl font-bold uppercase tracking-[0.1em] text-espresso/80 sm:text-4xl">
            {it}
          </span>
          <Star
            className="h-4 w-4 shrink-0 text-champagne sm:h-5 sm:w-5"
            fill="#0EA5A8"
            strokeWidth={0}
          />
        </span>
      ))}
    </div>
  )
  return (
    <section className="relative border-y border-espresso/10 bg-white py-8">
      <div className="flex overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
        >
          {/* duplicated for a seamless, jerk-free loop */}
          <Row />
          <Row />
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Parallax image — drifts + scales gently as it crosses the viewport */
/* ------------------------------------------------------------------ */
function ParallaxImage({
  src,
  alt,
  className = '',
  range = 50,
  sizes = '(min-width: 768px) 50vw, 100vw',
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [range, -range])
  return (
    <div ref={ref} className={'overflow-hidden ' + className}>
      <motion.div style={{ y, scale: 1.18 }} className="h-full w-full">
        <Picture
          src={src}
          alt={alt}
          sizes={sizes}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  )
}

/* ================================================================== */
/*  EDITORIAL · THE PHILOSOPHY (warm wellness photography)             */
/* ================================================================== */
function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-title"
      className="relative px-6 py-36 sm:px-10 lg:px-20"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        {/* text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <Eyebrow>The Philosophy</Eyebrow>
          <h2
            id="philosophy-title"
            className="font-display font-bold leading-[0.98] tracking-[-0.02em] text-espresso"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
          >
            Clean dentistry with time to listen.
          </h2>
          <p className="mt-6 max-w-md text-base font-light leading-relaxed text-espresso/[0.65]">
            We treat dental health as part of everyday wellbeing: stable gums,
            strong enamel, comfortable chewing and a smile that still feels
            like you.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8">
            {[
              ['Preventive', 'Risk-based cleanings and home-care coaching.'],
              ['Conservative', 'Repair first, preserve enamel whenever possible.'],
              ['Comfortable', 'Gentle anaesthetic and calm appointment pacing.'],
              ['Transparent', 'Photos, scans and options before treatment.'],
            ].map(([t, d], i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.1 }}
              >
                <div className="mb-1 font-display text-lg font-bold text-espresso">
                  {t}
                </div>
                <p className="text-sm font-light leading-snug text-espresso/[0.55]">
                  {d}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* overlapping image composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto"
        >
          <ParallaxImage
            src="/images/img3.png"
            alt="A patient with a radiant, healthy smile in the clinic"
            className="aspect-[4/5] w-full rounded-3xl border border-espresso/10 shadow-[0_24px_60px_-55px_rgba(14,59,64,0.26)]"
          />
          <div className="absolute -bottom-10 -left-6 w-44 overflow-hidden rounded-2xl border-2 border-cream shadow-[0_16px_40px_-38px_rgba(14,59,64,0.32)] sm:w-56">
            <ParallaxImage
              src="/images/img1.png"
              alt="A pristine tooth model beside precision dental instruments"
              className="aspect-[4/3] w-full"
              range={25}
              sizes="(min-width: 640px) 224px, 176px"
            />
          </div>
          <div className="absolute -right-4 -top-4 rounded-full bg-champagne px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-espresso shadow-sm">
            Calm Care
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  GALLERY · THE ATELIER (the real clinical environment)             */
/* ================================================================== */
function Atelier() {
  const shots = [
    {
      src: '/images/img2.png',
      label: 'The Consultation',
      note: 'Reading your case together, in full transparency.',
      alt: 'A VALOIS clinician examining a dental model during a patient consultation',
    },
    {
      src: '/images/img4.png',
      label: 'The Suite',
      note: 'Light-filled, sterile-grade, designed to soothe.',
      alt: 'A light-filled, sterile-grade VALOIS treatment suite',
    },
    {
      src: '/images/img1.png',
      label: 'Digital Diagnostics',
      note: 'Volumetric CBCT planning down to the micron.',
      alt: 'Precision dental instruments and a tooth model used for digital CBCT diagnostics',
    },
  ]
  return (
    <section
      id="atelier"
      aria-labelledby="atelier-title"
      className="relative px-6 py-36 sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 max-w-2xl">
          <Eyebrow>The Atelier</Eyebrow>
          <h2
            id="atelier-title"
            className="font-display font-bold leading-[0.95] tracking-[-0.02em] text-espresso"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
          >
            A real clinic, designed to feel calm and efficient.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {shots.map((s, i) => (
            <motion.figure
              key={s.label}
              initial={{ opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-2xl border border-espresso/10 shadow-[0_20px_55px_-55px_rgba(14,59,64,0.28)]"
            >
              <ParallaxImage
                src={s.src}
                alt={s.alt}
                className="aspect-[3/4] w-full transition-transform duration-700"
                range={40}
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/0 to-espresso/0" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-champagne">
                  0{i + 1}
                </div>
                <div className="font-display text-xl font-bold text-cream">
                  {s.label}
                </div>
                <p className="mt-1 max-h-0 overflow-hidden text-sm font-light leading-snug text-cream/75 opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                  {s.note}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================================================================== */
/*  Navigation + Footer (frame the experience)                         */
/* ================================================================== */
function Nav() {
  const { open: openBooking } = useBooking()
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-8 lg:px-10">
        <div className="rounded-[1.75rem] border border-espresso/10 bg-white/[0.86] px-4 py-3 shadow-[0_18px_45px_-36px_rgba(20,52,59,0.45)] backdrop-blur-xl sm:rounded-full sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <a
              href="#main"
              aria-label="VALOIS ORAL WELLNESS — home"
              className="flex min-w-0 items-center gap-2 font-display text-base font-extrabold tracking-[-0.01em] text-espresso sm:text-lg"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-espresso text-cream">
                <Plus className="h-4 w-4" />
              </span>
              <span className="truncate">VALOIS</span>
            </a>
            <nav
              aria-label="Primary"
              className="hidden items-center gap-7 text-xs font-medium uppercase tracking-[0.18em] text-espresso/70 lg:flex"
            >
              <a href="#services" className="transition-colors hover:text-champagne">
                Services
              </a>
              <a href="#journey" className="transition-colors hover:text-champagne">
                First Visit
              </a>
              <a href="#technology" className="transition-colors hover:text-champagne">
                Technology
              </a>
              <a href="#reviews" className="transition-colors hover:text-champagne">
                Reviews
              </a>
              <a href="#contact" className="transition-colors hover:text-champagne">
                Contact
              </a>
            </nav>
            <button
              type="button"
              onClick={openBooking}
              className="shrink-0 rounded-full bg-espresso px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-champagne sm:px-5 sm:tracking-[0.16em]"
            >
              Book
            </button>
          </div>
          <nav
            aria-label="Mobile quick links"
            className="mt-3 hidden gap-2 overflow-x-auto pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-espresso/65 sm:flex lg:hidden"
          >
            {[
              ['#services', 'Services'],
              ['#journey', 'First Visit'],
              ['#technology', 'Tech'],
              ['#contact', 'Contact'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="shrink-0 rounded-full bg-cream px-3 py-1.5"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  )
}

function Footer() {
  const { open: openBooking } = useBooking()
  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden px-6 py-24 sm:px-10 lg:px-20"
    >
      <AquaWash intensity={0.45} />
      <div className="mx-auto max-w-6xl text-center">
        <Sparkles className="mx-auto mb-8 h-7 w-7 text-champagne" strokeWidth={1.2} />
        <h2
          className="mx-auto max-w-3xl font-display font-extrabold leading-[0.95] tracking-[-0.03em] text-espresso"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}
        >
          Ready for a cleaner, healthier smile?
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-base font-light leading-relaxed text-espresso/[0.65]">
          New patients, emergency appointments and cosmetic consultations are
          available by appointment.
        </p>
        <div className="mt-10 flex justify-center">
          <MagneticButton
            aria-label="Request a private consultation invitation"
            onClick={openBooking}
          >
            Request an Appointment
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
        </div>

        <div className="mt-16 grid gap-4 text-left md:grid-cols-3">
          {[
            ['Call', '+41 22 000 00 00', 'For urgent dental pain, call before booking online.'],
            ['Visit', 'Rue du Rhône 1, Geneva', 'A short walk from public transit and city parking.'],
            ['Hours', 'Mon-Fri 09:00-18:00', 'Saturday appointments from 10:00-14:00.'],
          ].map(([title, value, note]) => (
            <div key={title} className="rounded-2xl border border-espresso/10 bg-white/50 p-6 backdrop-blur">
              <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-champagne">
                {title}
              </div>
              <div className="mt-2 font-display text-xl font-bold text-espresso">
                {value}
              </div>
              <p className="mt-2 text-sm font-light leading-relaxed text-espresso/[0.58]">
                {note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-espresso/10 pt-8 text-xs uppercase tracking-[0.2em] text-espresso/45 sm:flex-row">
          <span className="font-display font-bold text-espresso">
            VALOIS ORAL WELLNESS
          </span>
          <span>© 2026 · Crafted with precision · Photography via Unsplash</span>
          <span>Geneva · Dubai · New York</span>
        </div>
      </div>
    </footer>
  )
}

/* ================================================================== */
/*  ROOT                                                               */
/* ================================================================== */
export default function App() {
  return (
    <BookingProvider>
      <StructuredData />
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-espresso px-5 py-2 text-sm font-semibold text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <main
        id="main"
        className="min-h-screen bg-cream font-sans text-espresso antialiased"
      >
        <Nav />
        <Hero />
        <TrustBar />
        <Marquee />
        <Philosophy />
        <Services />
        <PatientJourney />
        <Technology />
        <BeforeAfterSlider />
        <Atelier />
        <Team />
        <Stats />
        <Reviews />
        <FAQ />
        <Footer />
      </main>
    </BookingProvider>
  )
}
