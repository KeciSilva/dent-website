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
} from 'lucide-react'

/* =================================================================== */
/*  VALOIS ORAL WELLNESS — a single, self-contained portfolio piece.   */
/*  Palette: Aqua Mist #F0FAFB · Teal Accent #1BA8B5                   */
/*           Deep Teal Ink #0E3B40                                     */
/* =================================================================== */

const EASE = [0.16, 1, 0.3, 1] // expensive, fluid cubic-bezier

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
        filter: 'blur(6px)',
        backgroundImage:
          `radial-gradient(58% 68% at 10% 16%, rgba(27,168,181,${a(0.42)}), transparent 72%),` +
          `radial-gradient(54% 64% at 90% 10%, rgba(96,206,219,${a(0.46)}), transparent 74%),` +
          `radial-gradient(68% 74% at 84% 90%, rgba(14,138,151,${a(0.4)}), transparent 76%),` +
          `radial-gradient(64% 70% at 12% 92%, rgba(120,214,224,${a(0.44)}), transparent 74%)`,
      }}
    >
      {/* slow breathing drift overlaid for a living, watery motion */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            `radial-gradient(40% 44% at 50% 40%, rgba(160,231,236,${a(0.45)}), transparent 60%),` +
            `radial-gradient(46% 50% at 30% 70%, rgba(27,168,181,${a(0.38)}), transparent 64%),` +
            `radial-gradient(46% 50% at 72% 30%, rgba(96,206,219,${a(0.4)}), transparent 64%)`,
        }}
        animate={{ scale: [1, 1.12, 1], x: ['-3%', '3%', '-3%'], y: ['2%', '-2%', '2%'] }}
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
        'px-9 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-espresso ' +
        'shadow-[0_18px_40px_-18px_rgba(27,168,181,0.8)] ' +
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
            'linear-gradient(110deg, #cfeff2 0%, #1ba8b5 25%, #e6f8fa 45%, #0e8a97 65%, #cfeff2 100%)',
          backgroundSize: '250% 100%',
        }}
        animate={{ backgroundPositionX: ['0%', '250%'] }}
        transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
      />
      {/* soft sheen on hover */}
      <span className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-black/5 to-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
  const lines = [['THE', 'ARCHITECTURE'], ['OF', 'A', 'SMILE']]

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
    <section className="relative isolate flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-20 pt-32 sm:px-10 lg:px-20">
      <AquaWash />

      {/* background grid — fades + scales into view */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.18 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, ease: EASE }}
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(14,59,64,0.05) 1px, transparent 1px),' +
            'linear-gradient(to bottom, rgba(14,59,64,0.05) 1px, transparent 1px)',
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
            'radial-gradient(60% 50% at 50% 30%, rgba(27,168,181,0.16), transparent 70%)',
        }}
      />

      <div className="mx-auto w-full max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          className="mb-8 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.4em] text-champagne"
        >
          <Sparkles className="h-4 w-4" strokeWidth={1.5} />
          Avant-Garde Oral Wellness
        </motion.div>

        <motion.h1
          variants={wordParent}
          initial="hidden"
          animate="show"
          className="font-display font-extrabold leading-[0.92] tracking-[-0.03em] text-espresso"
          style={{ fontSize: 'clamp(2.6rem, 9vw, 8.2rem)' }}
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
          className="mx-auto mt-9 max-w-xl text-base font-light leading-relaxed text-espresso/70 sm:text-lg"
        >
          Biomimetic dentistry as a fine art. We engineer extraordinary smiles
          through micro-precision craftsmanship and holistic, painless science.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.75 }}
          className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          <MagneticButton>
            Reserve a Consultation
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
          <a
            href="#transformation"
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-espresso/70 transition-colors hover:text-espresso"
          >
            View Transformations
            <span className="h-px w-7 bg-espresso/40 transition-all duration-300 group-hover:w-10 group-hover:bg-champagne" />
          </a>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-espresso/40"
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
      <img
        src={after ? '/images/after.png' : '/images/before.png'}
        alt={
          after
            ? 'The same smile after professional whitening and alignment'
            : 'The smile before treatment — stained and uneven teeth'
        }
        draggable={false}
        className="pointer-events-none h-full w-full select-none object-cover"
        style={{ objectPosition: '50% 50%' }}
      />
    </div>
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
      className="relative px-6 py-28 sm:px-10 lg:px-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 max-w-2xl">
          <Eyebrow>The Transformation</Eyebrow>
          <h2
            className="font-display font-bold leading-[0.95] tracking-[-0.02em] text-espresso"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
          >
            Drag to witness the artistry.
          </h2>
          <p className="mt-5 text-base font-light leading-relaxed text-espresso/65">
            Every restoration is sculpted by hand and verified at the micron.
            Glide the handle to reveal a single Hollywood Smile Design case.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative aspect-[16/10] w-full select-none overflow-hidden rounded-[2rem] border border-espresso/10 shadow-[0_40px_120px_-50px_rgba(14,59,64,0.55)]"
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
            className="absolute inset-y-0 z-10 w-px bg-cream shadow-[0_0_18px_rgba(0,0,0,0.25)]"
            style={{ left: handleLeft, x: '-0.5px' }}
          >
            <motion.div
              className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-champagne/60 bg-cream/95 text-espresso shadow-[0_10px_30px_-8px_rgba(14,59,64,0.5)] backdrop-blur"
              animate={
                interacted
                  ? { scale: 1, boxShadow: '0 10px 30px -8px rgba(14,59,64,0.5)' }
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
    title: 'Porcelain Veneers',
    desc: 'Ultra-thin, hand-layered ceramics that refract light like natural enamel.',
    icon: Gem,
    art: 'M20 70 C40 20 80 20 100 60 C120 100 160 100 180 50',
  },
  {
    title: '3D Digital Implantology',
    desc: 'Guided, sub-millimetre placement engineered from volumetric CBCT scans.',
    icon: ScanLine,
    art: 'M25 80 L70 30 L100 75 L130 25 L175 70',
  },
  {
    title: 'Full Mouth Reconstruction',
    desc: 'A complete biomimetic rebuild balancing function, occlusion and beauty.',
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
        className="group relative flex h-full min-h-[24rem] flex-col justify-between overflow-hidden rounded-3xl border border-espresso/10 bg-gradient-to-b from-white to-cream p-8 transition-shadow duration-500 hover:shadow-[0_50px_120px_-50px_rgba(27,168,181,0.7)]"
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
          <p className="mb-6 text-sm font-light leading-relaxed text-espresso/65">
            {service.desc}
          </p>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-espresso transition-colors group-hover:text-champagne">
            Explore
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </motion.article>
    </motion.div>
  )
}

function Services() {
  return (
    <section id="services" className="relative px-6 py-28 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Eyebrow>The Practice</Eyebrow>
            <h2
              className="font-display font-bold leading-[0.95] tracking-[-0.02em] text-espresso"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
            >
              Disciplines of the craft.
            </h2>
          </div>
          <p className="max-w-sm text-base font-light leading-relaxed text-espresso/60">
            Each treatment is a study in precision — where medical rigour meets
            the sensibilities of an atelier.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
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
        className="mt-4 text-xs font-medium uppercase tracking-[0.28em] text-cream/55"
      >
        {label}
      </motion.div>
    </div>
  )
}

function Stats() {
  const stats = [
    { value: 99.8, decimals: 1, suffix: '%', label: 'Precision Rate' },
    { value: 14000, suffix: '+', label: 'Smiles Perfected' },
    { value: 27, suffix: '', label: 'Master Clinicians' },
    { value: 100, suffix: '%', label: 'Painless Protocol' },
  ]
  return (
    <section className="relative overflow-hidden bg-espresso px-6 py-28 sm:px-10 lg:px-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(50% 60% at 20% 10%, rgba(27,168,181,0.18), transparent 70%)',
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl">
          <Eyebrow light>By the Numbers</Eyebrow>
          <h2
            className="font-display font-bold leading-[0.95] tracking-[-0.02em] text-cream"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
          >
            Measured in micro-perfection.
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

/* ================================================================== */
/*  5 · INFINITE FLOATING TICKER MARQUEE                               */
/* ================================================================== */
function Marquee() {
  const items = [
    'ADVANCED BIOMIMETIC DENTISTRY',
    'HOLLYWOOD SMILE DESIGN',
    'PAINLESS LASER TECHNOLOGY',
    'MICRON-PRECISION CRAFT',
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
            fill="#1BA8B5"
            strokeWidth={0}
          />
        </span>
      ))}
    </div>
  )
  return (
    <section className="relative border-y border-espresso/10 bg-cream py-10">
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
function ParallaxImage({ src, alt, className = '', range = 50 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [range, -range])
  return (
    <div ref={ref} className={'overflow-hidden ' + className}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y, scale: 1.18 }}
        className="h-full w-full object-cover"
      />
    </div>
  )
}

/* ================================================================== */
/*  EDITORIAL · THE PHILOSOPHY (warm wellness photography)             */
/* ================================================================== */
function Philosophy() {
  return (
    <section className="relative px-6 py-28 sm:px-10 lg:px-20">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        {/* text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE }}
        >
          <Eyebrow>The Philosophy</Eyebrow>
          <h2
            className="font-display font-bold leading-[0.98] tracking-[-0.02em] text-espresso"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
          >
            Wellness begins
            <br />
            at the mouth.
          </h2>
          <p className="mt-6 max-w-md text-base font-light leading-relaxed text-espresso/65">
            We treat the smile as an extension of total wellbeing — where
            biomimetic science, calm ritual and uncompromising craft converge.
            Every appointment unfolds like a spa, not a surgery.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8">
            {[
              ['Holistic', 'Whole-body protocols, not isolated fixes.'],
              ['Biomimetic', 'Materials that behave like living enamel.'],
              ['Painless', 'Laser-quiet, sedation-light, deeply calm.'],
              ['Bespoke', 'A smile engineered to your face alone.'],
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
                <p className="text-sm font-light leading-snug text-espresso/55">
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
            className="aspect-[4/5] w-full rounded-[2rem] border border-espresso/10 shadow-[0_40px_100px_-50px_rgba(14,59,64,0.5)]"
          />
          <div className="absolute -bottom-10 -left-6 w-44 overflow-hidden rounded-2xl border-4 border-cream shadow-[0_30px_60px_-30px_rgba(14,59,64,0.6)] sm:w-56">
            <ParallaxImage
              src="/images/img1.png"
              alt="A pristine tooth model beside precision dental instruments"
              className="aspect-[4/3] w-full"
              range={25}
            />
          </div>
          <div className="absolute -right-4 -top-4 rounded-full bg-champagne px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-espresso shadow-lg">
            Est. Wellbeing
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
    },
    {
      src: '/images/img4.png',
      label: 'The Suite',
      note: 'Light-filled, sterile-grade, designed to soothe.',
    },
    {
      src: '/images/img1.png',
      label: 'Digital Diagnostics',
      note: 'Volumetric CBCT planning down to the micron.',
    },
  ]
  return (
    <section className="relative px-6 py-28 sm:px-10 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl">
          <Eyebrow>The Atelier</Eyebrow>
          <h2
            className="font-display font-bold leading-[0.95] tracking-[-0.02em] text-espresso"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
          >
            Inside the practice.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {shots.map((s, i) => (
            <motion.figure
              key={s.label}
              initial={{ opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' }}
              whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-2xl border border-espresso/10 shadow-[0_30px_80px_-50px_rgba(14,59,64,0.5)]"
            >
              <ParallaxImage
                src={s.src}
                alt={s.label}
                className="aspect-[3/4] w-full transition-transform duration-700"
                range={40}
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
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-10 lg:px-20">
        <a
          href="#"
          className="flex items-center gap-2 font-display text-lg font-extrabold tracking-[-0.01em] text-espresso"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-espresso text-cream">
            <Plus className="h-4 w-4" />
          </span>
          VALOIS
        </a>
        <nav className="hidden items-center gap-9 text-xs font-medium uppercase tracking-[0.2em] text-espresso/70 md:flex">
          <a href="#transformation" className="transition-colors hover:text-champagne">
            Transformations
          </a>
          <a href="#services" className="transition-colors hover:text-champagne">
            Practice
          </a>
          <a href="#contact" className="transition-colors hover:text-champagne">
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="rounded-full border border-espresso/20 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-espresso transition-colors hover:border-champagne hover:text-champagne"
        >
          Book
        </a>
      </div>
    </motion.header>
  )
}

function Footer() {
  return (
    <footer
      id="contact"
      className="relative isolate overflow-hidden px-6 py-24 sm:px-10 lg:px-20"
    >
      <AquaWash intensity={0.7} />
      <div className="mx-auto max-w-6xl text-center">
        <Sparkles className="mx-auto mb-8 h-7 w-7 text-champagne" strokeWidth={1.2} />
        <h2
          className="mx-auto max-w-3xl font-display font-extrabold leading-[0.95] tracking-[-0.03em] text-espresso"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}
        >
          Begin the architecture of your smile.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-base font-light leading-relaxed text-espresso/65">
          Private consultations by appointment. A single smile, engineered to a
          standard the world has not yet seen.
        </p>
        <div className="mt-10 flex justify-center">
          <MagneticButton>
            Request Your Invitation
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
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
    <main className="min-h-screen bg-cream font-sans text-espresso antialiased">
      <Nav />
      <Hero />
      <Marquee />
      <Philosophy />
      <BeforeAfterSlider />
      <Services />
      <Atelier />
      <Stats />
      <Footer />
    </main>
  )
}
